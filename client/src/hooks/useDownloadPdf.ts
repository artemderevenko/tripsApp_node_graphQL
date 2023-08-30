import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { IDownloadPdfResult } from '../types/downloadPdfResult';

export const useDownloadPdf = (
  elementId: string,
  filename: string,
  margin?: number,
  hiddenElements?: string[],
): IDownloadPdfResult => {
  const downloadAsPdf = (): void => {
    const pdfMargin = margin || 0;
    const hiddenElementsList = hiddenElements || [];

    // Hiding elements before creating a PDF
    hiddenElementsList.forEach((elementId) => {
      const hiddenElement = document.getElementById(elementId);
      if (hiddenElement) {
        hiddenElement.style.opacity = '0';
      }
    });

    const element = document.getElementById(elementId);

    if (element) {
      html2canvas(element).then((canvas) => {
        const imgData: string = canvas.toDataURL('image/png');
        const pdf: jsPDF = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth: number = pdf.internal.pageSize.getWidth();
        const pdfHeight: number = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', pdfMargin, pdfMargin, pdfWidth - 2 * pdfMargin, pdfHeight - 2 * pdfMargin);
        pdf.save(filename);

        // Restoring visibility of hidden elements after PDF generation
        hiddenElementsList.forEach((elementId) => {
          const hiddenElement = document.getElementById(elementId);
          if (hiddenElement) {
            hiddenElement.style.opacity = '1';
          }
        });
      });
    }
  };

  return {
    downloadAsPdf,
  };
};
