import * as XLSX from 'xlsx';
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

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

const handleImport = async (f: any) => {
  // Chọn tệp
  try {
    console.log("duong");
    const res = await DocumentPicker.getDocumentAsync({
      type: [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ],
    });
    if (res.type === "success") {
      // Đọc tệp
      const fileUri = res.uri;
      const fileContent = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      const workbook = XLSX.read(fileContent, { type: "base64" });

      // Chuyển đổi dữ liệu từ Sheet đầu tiên thành JSON
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Cập nhật state
      f(jsonData);
      console.log(jsonData)
    } else if (res.type === "cancel") {
      console.log("User cancelled the picker");
    }
    console.log("res: ", res);
  } catch (e) {
    console.log(e);
  }

export default readExcelFile;