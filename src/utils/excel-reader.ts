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
    const res:DocumentPicker.DocumentPickerResult = await DocumentPicker.getDocumentAsync({
      type: [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ],
    });
      const uri = res.assets[0].uri
  

        const fileContent = await FileSystem.readAsStringAsync(uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        const workbook = XLSX.read(fileContent, { type: "base64" });

        // Chuyển đổi dữ liệu từ Sheet đầu tiên thành JSON
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        return jsonData;

    } catch (e) {
    console.log(e);
    
  }
}

export  {readExcelFile, handleImport};