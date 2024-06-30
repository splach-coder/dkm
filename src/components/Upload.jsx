// src/components/Upload.js
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const Upload = ({ onFileUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      onFileUpload(acceptedFiles); // Now passing an array of files
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "application/pdf",
    multiple: true, // Allow multiple files
  });

  return (
    <div
      {...getRootProps()}
      className="p-4 text-center border-2 border-gray-400 border-dashed h-[250px] flex justify-center items-center">
      <input {...getInputProps()} />
      <p>Drag & drop PDF files here, or click to select files</p>
    </div>
  );
};

export default Upload;
