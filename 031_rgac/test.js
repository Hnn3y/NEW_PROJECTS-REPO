import { google } from "googleapis";
import fs from "fs";

// Load credentials
const credentials = JSON.parse(fs.readFileSync("./config/google.json", "utf-8"));

async function main() {
  try {
    // Authenticate using service account
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive"
      ]
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Replace with your actual spreadsheet ID & sheet name
    const spreadsheetId = "1eiAgXnIcpnvENFDMkrbJfV3HCb1cz568uLN_NzkZtEE";
    const range = "Sheet1!A1:H5"; 

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range
    });

    console.log("✅ Successfully read data from Google Sheet:");
    console.log(res.data.values || "No data found.");
  } catch (err) {
    console.error("❌ Error accessing Google Sheet:", err.message);
  }
}

main();
