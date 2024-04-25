import { Component, ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import { image } from 'html2canvas/dist/types/css/types/image';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-pdf-download',
  templateUrl: './pdf-download.component.html',
  styleUrls: ['./pdf-download.component.scss']
})
export class PdfDownloadComponent {
  @ViewChild('pdfPages') pdfPages: ElementRef<HTMLDivElement> | undefined;
  showFooter: boolean = false

  // downloadPdf() {
  //   if (!this.pdfPages) {
  //     console.error('PDF pages container reference is undefined.');
  //     return;
  //   }

  //   const pagesContainer = this.pdfPages.nativeElement;
  //   const pdf = new jsPDF('p', 'mm', 'a4');

  //   // Iterate over each viewport element
  //   for (let i = 0; i < pagesContainer.children.length; i++) {
  //     const viewport = pagesContainer.children[i] as HTMLElement;
  //     html2canvas(viewport, { scrollY: -window.scrollY, scale: 1 }).then(canvas => {
  //       const imgData = canvas.toDataURL('image/png');
  //       if (i > 0) {
  //         pdf.addPage(); // Add new page for each viewport except the first one
  //       }
  //       pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());

  //       // Save PDF after capturing all viewports
  //       if (i === pagesContainer.children.length - 1) {
  //         pdf.save('downloaded-pdf.pdf');
  //       }
  //     }).catch(error => {
  //       console.error('Error generating PDF:', error);
  //     });
  //   }
  // }

  // downloadPDF() {
  //   const container = this.pdfPages!.nativeElement;

  //   // Ensure all content is rendered before capturing (optional)
  //   container.style.height = container.scrollHeight + 'px'; // Adjust if needed

  //   html2canvas(container).then(canvas => {
  //     const imgData = canvas.toDataURL('image/png');

  //     // Reset container height (optional)
  //     container.style.height = '';

  //     const doc = new jsPDF();
  //     const imgWidth = doc.internal.pageSize.getWidth() - 20; // Adjust for margins
  //     const imgHeight = canvas.height * imgWidth / canvas.width;

  //     doc.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
  //     doc.save('multiple_tables.pdf'); // Download PDF
  //   });
  // }
 

downloadScreenshots() {
  const container = this.pdfPages!.nativeElement;

  // Ensure all content is rendered before capturing (optional)
  container.style.height = container.scrollHeight + 'px'; // Adjust if needed

  html2canvas(container).then(canvas => {
    const imgData = canvas.toDataURL('image/png');

    // Reset container height (optional)
    container.style.height = '';

    const link = document.createElement('a');
    link.href = imgData;
    link.download = 'multiple_tables_screenshot.png';
    link.click();
  });
}

  
}
