import ExcelJS from 'exceljs';
import { DateTime } from 'luxon';

/**
 * Read the company master Excel file and extract the required columns.
 * Expects the master file to contain headers (case-insensitive matching).
 */
export async function syncExcelToReminders(masterPath, remindersPath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(masterPath);
  const sheet = workbook.worksheets[0]; // first sheet by default

  // Build array of records, detect header indexes
  const headerRow = sheet.getRow(1).values.map(v => (v || '').toString().trim().toLowerCase());

  const mapIndex = (label) => {
    const idx = headerRow.findIndex(h => h === label.toLowerCase());
    return idx; // note: headerRow includes empty first value due to library indexing
  };

  // Normalize expected header keys
  const keys = {
    plate: ['plate', 'plate number', 'plate_no', 'plate_number'],
    name: ['name', 'customer name', 'full name'],
    phone: ['phone', 'phone number', 'mobile'],
    email: ['email', 'email address'],
    lastService: ['last service date', 'last_service_date', 'last serviced'],
    plan: ['plan', 'plan type', 'service plan']
  };

  const findIndexFor = (variants) => {
    for (const v of variants) {
      const idx = headerRow.findIndex(h => h === v.toLowerCase());
      if (idx >= 0) return idx;
    }
    return -1;
  };

  const indices = {
    plate: findIndexFor(keys.plate),
    name: findIndexFor(keys.name),
    phone: findIndexFor(keys.phone),
    email: findIndexFor(keys.email),
    lastService: findIndexFor(keys.lastService),
    plan: findIndexFor(keys.plan)
  };

  const outRows = [];

  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // skip header
    const cells = row.values; // numeric indexed array

    const record = {
      plate: cells[indices.plate] || '',
      name: cells[indices.name] || '',
      phone: cells[indices.phone] || '',
      email: cells[indices.email] || '',
      lastService: null,
      plan: (cells[indices.plan] || '').toString().toLowerCase()
    };

    const rawDate = cells[indices.lastService];
    if (rawDate) {
      // ExcelJS may give a JS Date or string depending on original file
      if (rawDate instanceof Date) record.lastService = DateTime.fromJSDate(rawDate).toISODate();
      else record.lastService = DateTime.fromISO(new Date(rawDate).toISOString()).toISODate();
    }

    outRows.push(record);
  });

  // Write to remindersPath with normalized headers
  const outWb = new ExcelJS.Workbook();
  const outSheet = outWb.addWorksheet('Reminders');
  outSheet.addRow(['Plate', 'Name', 'Phone', 'Email', 'LastServiceDate', 'Plan', 'NextReminderDate', 'Status']);

  outRows.forEach(r => {
    outSheet.addRow([
      r.plate || '',
      r.name || '',
      r.phone || '',
      r.email || '',
      r.lastService || '',
      r.plan || '',
      '', // NextReminderDate (calculated later)
      'pending'
    ]);
  });

  await outWb.xlsx.writeFile(remindersPath);
  return true;
}

/**
 * Read local reminders.xlsx into JS array
 */
export async function loadLocalReminders(remindersPath) {
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(remindersPath);
  const sheet = wb.getWorksheet('Reminders');
  if (!sheet) throw new Error('Reminders sheet missing in file');

  const rows = [];
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const v = row.values;
    rows.push({
      plate: v[1] || '',
      name: v[2] || '',
      phone: v[3] || '',
      email: v[4] || '',
      lastServiceDate: v[5] || '',
      plan: (v[6] || '').toString().toLowerCase(),
      nextReminderDate: v[7] || '',
      status: v[8] || 'pending'
    });
  });
  return rows;
}

/**
 * Save updated reminders back to local file (overwrites Reminders tab)
 */
export async function saveLocalReminders(remindersPath, rows) {
  const wb = new ExcelJS.Workbook();
  const sheet = wb.addWorksheet('Reminders');
  sheet.addRow(['Plate', 'Name', 'Phone', 'Email', 'LastServiceDate', 'Plan', 'NextReminderDate', 'Status']);

  rows.forEach(r => {
    sheet.addRow([
      r.plate || '',
      r.name || '',
      r.phone || '',
      r.email || '',
      r.lastServiceDate || '',
      r.plan || '',
      r.nextReminderDate || '',
      r.status || 'pending'
    ]);
  });

  await wb.xlsx.writeFile(remindersPath);
}