import React, { useState } from "react";
import axios from "axios";
import Upload from "../components/Upload";
import PdfList from "../components/PdfList";
import ErrorToast from "../components/Toasts/ErrorToast";

function App() {
  const [files, setFiles] = useState([]);
  const [errorToast, setErrorToast] = useState(false);

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
        "http://127.0.0.1:5000/api/msc/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
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
        "http://127.0.0.1:5000/api/msc/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
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
        <span className="font-extrabold ">MSC</span> Arrival Notice Extractor
      </header>
      <div>
        <Upload onFileUpload={handleFileUpload} />
        <button
          onClick={handleUploadFiles}
          className="py-2 px-5 rounded-sm bg-slate-950 text-white my-3 flex ms-auto">
          Bulk them
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
