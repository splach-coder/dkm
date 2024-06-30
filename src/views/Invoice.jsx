import React, { useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Upload from "../components/Upload";
import PdfList from "../components/PdfList";
import ErrorToast from "../components/Toasts/ErrorToast";

function App() {
  const [files, setFiles] = useState([]);
  const [errorToast, setErrorToast] = useState(false);
  const [jsonData, setJsonData] = useState([]);

  const handleFileUpload = (fileList) => {
    const updatedFiles = [];

    fileList.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        updatedFiles.push({ name: file.name, url: reader.result });

        // When all files are read, update the state
        if (updatedFiles.length === fileList.length) {
          setFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUploadFile = async (file) => {
    const formData = new FormData();

    // Convert data URL to Blob
    const blob = await fetch(file.url).then((res) => res.blob());
    formData.append("file", blob, file.name);

    try {
      const response = await axios.post(
        "https://jobhub.ma/dkm/api/invoice/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data[0].data);

      setJsonData(JSON.parse(response.data[0].data));
      
      const workbook = XLSX.utils.book_new();
      const worksheet = {};

      // Place each value in the specified cell
      const cellMapping = [
        { cell: "A1", value: "VAT" },
        { cell: "B1", value: jsonData.VAT },
        { cell: "A2", value: "Inv date" },
        { cell: "B2", value: jsonData["Inv date"] },
        { cell: "A3", value: "Inv Reference" },
        { cell: "B3", value: jsonData["Inv Reference"] },
        { cell: "A4", value: "Cnee" },
        { cell: "B4", value: jsonData.Cnee },
        { cell: "A5", value: "VAT Cnee" },
        { cell: "B5", value: jsonData["VAT Cnee"] },
        { cell: "A6", value: "Reference1" },
        { cell: "B6", value: jsonData.Reference1 },
        { cell: "A7", value: "Reference2" },
        { cell: "B7", value: jsonData.Reference2 },
        { cell: "A8", value: "Customs authorisation" },
        { cell: "B8", value: jsonData["Customs authorisation"] },
        { cell: "A9", value: "Collis" },
        { cell: "B9", value: jsonData.Collis },
        { cell: "A10", value: "Weight" },
        { cell: "B10", value: jsonData.Weight },
        { cell: "A11", value: "INCO" },
        { cell: "B11", value: jsonData.INCO },
        { cell: "A12", value: "Invoiceamount" },
        { cell: "B12", value: jsonData.Invoiceamount },
      ];

      cellMapping.forEach((item) => {
        worksheet[item.cell] = { v: item.value };
      });

      worksheet["A14"] = { v: "Items" };
      worksheet["A15"] = { v: "Commodity" };
      worksheet["B15"] = { v: "Origin" };
      worksheet["C15"] = { v: "Netweight" };
      worksheet["D15"] = { v: "Quantity" };
      worksheet["E15"] = { v: "Value" };

      // Apply basic styles: font size and bold
      const styles = {
        font: { bold: true, sz: 12 },
      };

      worksheet["A14"].s = { font: { bold: true, sz: 14 } };
      worksheet["A15"].s = styles;
      worksheet["B15"].s = styles;
      worksheet["C15"].s = styles;
      worksheet["D15"].s = styles;
      worksheet["E15"].s = styles;

      // Add Items to the worksheet
      jsonData.Items.forEach((item, index) => {
        const row = 16 + index; // Start from row 16
        worksheet[`A${row}`] = { v: item.Commodity };
        worksheet[`B${row}`] = { v: item.Origin };
        worksheet[`C${row}`] = { v: item.Netweight };
        worksheet[`D${row}`] = { v: item.Quantity };
        worksheet[`E${row}`] = { v: item.Value };
      });

      // Calculate the range of the worksheet
      const range = {
        s: { c: 0, r: 0 },
        e: { c: 4, r: 15 + jsonData.Items.length },
      };
      worksheet["!ref"] = XLSX.utils.encode_range(range);

      // Append the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      // Write to Excel file
      XLSX.writeFile(workbook, "output.xlsx");
    } catch (error) {
      console.log(error);
    }
  };

  /* bulking the files */
  const handleUploadFiles = async () => {
    if (files.length == 0) {
      setErrorToast(true);
      return;
    }

    const formData = new FormData();

    // Loop through all files and convert each to Blob, then append to formData
    for (const file of files) {
      const blob = await fetch(file.url).then((res) => res.blob());
      formData.append("files", blob, file.name); // Use "files" as the key
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/invoice/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setJsonData(response.data);
      console.log(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container p-4 mx-auto App">
      {errorToast && (
        <ErrorToast text={"There is no uploaded file please some files"} />
      )}
      <header className="">
        <span className="font-extrabold ">Invoice</span> Extractor
      </header>
      <div>
        <Upload onFileUpload={handleFileUpload} />
        <button
          disabled
          className="flex px-5 py-2 my-3 text-white rounded-sm bg-slate-950 ms-auto">
          Bulk files
        </button>
        <PdfList
          files={files}
          onRemove={handleRemoveFile}
          onUpload={handleUploadFile}
        />
      </div>
    </div>
  );
}

export default App;
