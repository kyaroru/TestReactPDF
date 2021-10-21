import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "./App.css";
import React, { useState } from "react";
import { useViewport } from "./viewport";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.bootcss.com/pdf.js/${pdfjs.version}/pdf.worker.js`;

function App() {
  const { width, height } = useViewport();
  const sampleURL =
    "https://juventudedesporto.cplp.org/files/sample-pdf_9359.pdf";
  const localURL = "./assets/veranda.pdf";
  const [file, setFile] = useState(localURL);
  const [numPages, setNumPages] = useState(null);

  const [page, setPage] = useState(1);

  const onFileChange = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    setPage(1);
  };
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  console.log(width);

  return (
    <div className="App">
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px 10px",
        }}
      >
        <label htmlFor="file">Load from file:</label>
        <div style={{ width: 10 }} />
        <input onChange={onFileChange} type="file" />
      </div>
      <div
        style={{
          border: "1px solid #23feab",
          margin: 10,
          width: width > 650 ? 650 : width - 22,
        }}
      >
        <Document
          file={file}
          onLoadSuccess={onDocumentLoadSuccess}
          renderMode="svg"
        >
          <Page pageNumber={page} width={width > 650 ? 650 : width - 22} />
        </Document>
      </div>
      <div
        style={{
          marginTop: 10,
          marginBottom: 30,
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {numPages > 1 && (
          <div
            onClick={() => {
              if (page <= 1) return;
              setPage(page - 1);
            }}
            style={{
              backgroundColor: "#33adf4",
              padding: 10,
              borderRadius: 5,
              color: page <= 1 ? "gray" : "white",
            }}
          >
            {"Previous"}
          </div>
        )}

        <p style={{ margin: "0px 10px" }}>
          Page {page} of {numPages}
        </p>
        {numPages > 1 && (
          <div
            style={{
              backgroundColor: "#33adf4",
              padding: 10,
              borderRadius: 5,
              color: page >= numPages ? "gray" : "white",
            }}
            onClick={() => {
              if (page >= numPages) return;
              setPage(page + 1);
            }}
          >
            {"Next"}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
