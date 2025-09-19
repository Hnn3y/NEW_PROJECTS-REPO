import ExcelJS from "exceljs";

export async function loadReminders(filePath) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const sheet = workbook.getWorksheet("Reminders");
  
  const data = [];
  sheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) { // skip header
      data.push({
        name: row.getCell(1).value,
        email: row.getCell(2).value,
        phone: row.getCell(3).value,
        plate: row.getCell(4).value,
        renewalDate: row.getCell(5).value
      });
    }
  });
  return data;
}

export async function saveReminders(filePath, data) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Reminders");

  sheet.addRow(["Name", "Email", "Phone", "Plate Number", "Renewal Date"]);

  data.forEach(item => {
    sheet.addRow([item.name, item.email, item.phone, item.plate, item.renewalDate]);
  });

  await workbook.xlsx.writeFile(filePath);
}
