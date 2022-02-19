import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = () => (
  <Document file={"../../public/TechBinder.pdf"}>
    <Page pageNumber={1} width={400} />
  </Document>
);

export default PdfViewer;
