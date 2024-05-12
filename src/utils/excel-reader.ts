import * as XLSX from 'xlsx';

function readExcelFile(filePath) {
  // Read the file
  const workbook = XLSX.readFile(filePath);

  // Get the first worksheet
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // Convert the worksheet to JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet);

  return jsonData;
}

export default readExcelFile;