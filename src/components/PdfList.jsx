// src/components/PdfList.js
import React from "react";
import PdfIcon from "../assets/svg/PdfIcon";

const PdfList = ({ files, onRemove, onUpload }) => {
  return (
    <div>
      {files.map((file, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-2 border-b">
          <div className="flex gap-4 cursor-pointer">
            <span>
              <PdfIcon />
            </span>
            <span>{file.name}</span>
          </div>
          <div>
            <button
              onClick={() => onUpload(file)}
              className="mx-2 text-blue-500">
              Upload
            </button>
            <button
              onClick={() => onRemove(index)}
              className="mx-2 text-red-500">
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PdfList;
