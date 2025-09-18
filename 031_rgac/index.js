import { google } from "googleapis";
import cron from "node-cron";
import twilio from "twilio";
import nodemailer from "nodemailer";


// === CONFIGURATION ===
const SPREADSHEET_ID = "YOUR_SHEET_ID";
const CUSTOMER_RANGE = "Customers!A2:E"; // Name | Phone | Email | Car | Next Service Date
const LOG_RANGE = "Reminders!A:E";       // Name | Phone | Email | Car | Reminder Sent | Date

// Twilio
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH);
const TWILIO_NUMBER = process.env.TWILIO_NUMBER;

// Nodemailer
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",  // change if using another SMTP
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// === GOOGLE AUTH ===
async function getSheets() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json", // download from Google Cloud Console
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
}

// === SEND REMINDER ===
async function sendReminder(customer) {
  const { name, phone, email, car, nextServiceDate } = customer;
  const message = `Hello ${name}, your ${car} is due for service on ${nextServiceDate}. Please book your appointment with Your Auto Shop.`;

  try {
    if (phone) {
      await twilioClient.messages.create({
        body: message,
        from: TWILIO_NUMBER,
        to: phone,
      });
      console.log(`📱 SMS sent to ${name}`);
    } else if (email) {
      await transporter.sendMail({
        from: `"Your Auto Shop" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Service Reminder for your ${car}`,
        text: `Dear ${name},\n\nThis is a reminder that your ${car} is due for maintenance on ${nextServiceDate}.\n\nKindly book your appointment to avoid delays.\n\nRegards,\nYour Auto Shop`,
      });
      console.log(`📧 Email sent to ${name}`);
    }
  } catch (err) {
    console.error("❌ Error sending reminder:", err.message);
  }
}

// === MAIN LOGIC ===
async function checkAndSendReminders() {
  const sheets = await getSheets();

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: CUSTOMER_RANGE,
  });

  const rows = res.data.values || [];
  if (!rows.length) return;

  const today = new Date();
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + 7);

  for (const row of rows) {
    const [name, phone, email, car, nextServiceDate] = row;
    if (!nextServiceDate) continue;

    const nsd = new Date(nextServiceDate);
    if (nsd.toDateString() === targetDate.toDateString()) {
      await sendReminder({ name, phone, email, car, nextServiceDate });

      // Log reminder
      await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: LOG_RANGE,
        valueInputOption: "RAW",
        requestBody: {
          values: [[name, phone, email, car, "YES", today.toISOString()]],
        },
      });
    }
  }
}

// === CRON JOB (runs daily at 9 AM) ===
cron.schedule("0 9 * * *", () => {
  console.log("⏰ Running service reminder job...");
  checkAndSendReminders();
});

