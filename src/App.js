import logo from "./logo.svg";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "./App.css";
import { useState } from "react";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.bootcss.com/pdf.js/${pdfjs.version}/pdf.worker.js`;

function App() {
  const sampleURL =
    "https://juventudedesporto.cplp.org/files/sample-pdf_9359.pdf";
  const localURL = "./assets/sample.pdf";
  const [file, setFile] = useState(localURL);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  return (
    <div className="App">
      <header className="App-header">
        <div>
          <label htmlFor="file">Load from file:</label>{" "}
          <input onChange={onFileChange} type="file" />
        </div>
        <div
          style={{ border: "1px solid #23feab", marginTop: 20, padding: 10 }}
        >
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
        <div
          style={{
            marginTop: 20,
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            onClick={() => {
              if (pageNumber <= 1) return;
              setPageNumber(pageNumber - 1);
            }}
            style={{
              backgroundColor: "#233e2b",
              padding: 10,
              borderRadius: 5,
              color: pageNumber <= 1 ? "gray" : "white",
            }}
          >
            {"<"}
          </div>

          <p style={{ margin: "0px 10px" }}>
            Page {pageNumber} of {numPages}
          </p>
          <div
            style={{
              backgroundColor: "#233e2b",
              padding: 10,
              borderRadius: 5,
              color: pageNumber >= numPages ? "gray" : "white",
            }}
            onClick={() => {
              if (pageNumber >= numPages) return;
              setPageNumber(pageNumber + 1);
            }}
          >
            {">"}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
