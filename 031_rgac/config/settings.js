export default {
  // Local Excel files
  local: {
    customersFile: "./data/customers.xlsx",
    remindersFile: "./data/reminders.xlsx"
  },

  // Google Sheets configuration
  google: {
   credentialsPath: "./config/google.json",
    spreadsheetId: "1eiAgXnIcpnvENFDMkrbJfV3HCb1cz568uLN_NzkZtEE", // from Google Sheets URL
    remindersSheet: "Reminders" // tab name in the sheet
  },

  // Notifications
  notifications: {
    email: {
      service: "gmail",
      user: "yourcompany@gmail.com",
      pass: "your-app-password" // use App Password, not your real password
    },
    sms: {
      accountSid: "your_twilio_account_sid",
      authToken: "your_twilio_auth_token",
      fromNumber: "+1234567890"
    }
  },

  // Cron job schedule (every day at 9 AM)
  schedule: "0 6 * * *"
};
