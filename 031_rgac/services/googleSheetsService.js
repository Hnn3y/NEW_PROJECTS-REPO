import fs from 'fs';
import { google } from 'googleapis';

function getAuth(credentialsPath) {
  const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });
}

/**
 * Push local reminders.xlsx data into Google Sheets (Reminders tab).
 * Clears the destination range and writes fresh rows.
 */
export async function syncRemindersToGoogle(remindersPath, spreadsheetId, sheetName, credentialsPath) {
  const auth = getAuth(credentialsPath);
  const sheets = google.sheets({ version: 'v4', auth });

  // Read local reminders using exceljs (lazy import to avoid circulars)
  const ExcelJS = await import('exceljs');
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(remindersPath);
  const sheet = wb.getWorksheet('Reminders');
  if (!sheet) throw new Error('Reminders sheet missing locally');

  const values = [];
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // skip header
    const v = row.values;
    values.push([
      v[1] || '',
      v[2] || '',
      v[3] || '',
      v[4] || '',
      v[5] ? new Date(v[5]).toISOString().split('T')[0] : '',
      v[6] || '',
      v[7] || '',
      v[8] || ''
    ]);
  });

  // Clear existing rows (A2:H)
  await sheets.spreadsheets.values.clear({ spreadsheetId, range: `${sheetName}!A2:H` });

  // Write header row if needed (we assume header already exists in sheet)
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${sheetName}!A2`,
    valueInputOption: 'RAW',
    requestBody: { values }
  });

  return true;
}

/**
 * Fetch reminders from Google Sheets into JS array. Use as source of truth when online.
 */
export async function fetchRemindersFromGoogle(spreadsheetId, sheetName, credentialsPath) {
  const auth = getAuth(credentialsPath);
  const sheets = google.sheets({ version: 'v4', auth });

  const res = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${sheetName}` });
  const rows = res.data.values || [];
  if (rows.length < 2) return [];