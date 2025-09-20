import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import settings from '../config/settings.js';
import { syncExcelToReminders } from './services/excelService.js';
import { syncRemindersToGoogle, fetchRemindersFromGoogle } from './services/googleSheetsService.js';
import { scheduleReminders } from './services/scheduler.js';

async function bootstrap() {
  try {
    console.log('Starting reminder-service...');

    // Step 1: sync local master Excel -> local reminders.xlsx
    console.log('Syncing local Excel master -> reminders.xlsx');
    await syncExcelToReminders(settings.local.customersFile, settings.local.remindersFile);

    // Step 2: Try to sync local reminders -> Google Sheets (if online)
    try {
      console.log('Attempting to sync local reminders -> Google Sheets');
      await syncRemindersToGoogle(settings.local.remindersFile, settings.google.spreadsheetId, settings.google.remindersSheet, settings.google.credentialsPath);
    } catch (err) {
      console.warn('Google sync failed (continuing offline):', err.message);
    }

    // Step 3: Start the scheduler (will read from Google if available, else local reminders file)
    scheduleReminders({
      localRemindersFile: settings.local.remindersFile,
      spreadsheetId: settings.google.spreadsheetId,
      sheetName: settings.google.remindersSheet,
      googleCredentialsPath: settings.google.credentialsPath
    });

  } catch (err) {
    console.error('Bootstrap error:', err);
    process.exit(1);
  }
}

bootstrap();