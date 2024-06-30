// src/components/PdfViewer.js
import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const PdfViewer = ({ file }) => {
  return (
    <Worker
      workerUrl={`https://unpkg.com/pdfjs-dist@latest/build/pdf.worker.min.js`}>
      <div style={{ height: "750px" }}>
        <Viewer fileUrl={file.url} />
      </div>
    </Worker>
  );
};

export default PdfViewer;
