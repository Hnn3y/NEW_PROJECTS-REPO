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
    twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    from: process.env.TWILIO_FROM_NUMBER
    },
    email: {
    service: process.env.EMAIL_SERVICE || 'gmail',
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
    }
    },
    schedule: {
    dailyCron: '0 9 * * *' // every day at 9:00 server local time
    },
    plans: {
    monthly: 30,
    quarterly: 90,
    yearly: 365
    },
    hr: {
    email: process.env.HR_EMAIL
    }
    };