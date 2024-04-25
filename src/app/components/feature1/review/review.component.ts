import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
// import * as jsPDF from 'jspdf';
import 'jspdf-autotable'; // Optional for table formatting
import jsPDF from 'jspdf';
import { Router } from '@angular/router';
interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  data: any[] = []
  cols!: Column[];

  exportColumns!: ExportColumn[];
  mergedArray: any[] = []
  projectData: any;
  achievedScore!: number
  maturityLevel!: string
  constructor(private dbService: DbService, private router: Router) { }
  data$ = this.dbService.getAllData(); // Observable returned from service
  ngOnInit(): void {
    this.projectData = this.dbService.projectData
    this.mergedArray = JSON.parse(sessionStorage.getItem('mergedArray')!)
    console.log('merged array', this.mergedArray);
    this.achievedScore = this.mergedArray.reduce((accumulator, currentItem) => accumulator + currentItem.value, 0);
    console.log('achievedScore', this.achievedScore); // Output the sum of all values

    this.maturityLevel = this.assignLabel(this.achievedScore)
    console.log('maturity level', this.maturityLevel);

    this.cols = [
      { field: 'practiceStage', header: 'Stage', customExportHeader: 'Stage' },
      { field: 'item', header: 'Name', customExportHeader: 'Name' },
      { field: 'identifier', header: 'Info', customExportHeader: 'Info' },
      { field: 'value', header: 'Score', customExportHeader: 'Score' },

    ];

    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));


  }

  // exportPdf() {
  //   import('jspdf').then((jsPDF) => {
  //     import('jspdf-autotable').then((x) => {
  //       const doc = new jsPDF.default('p', 'px', 'a4');
  //       (doc as any).autoTable(this.exportColumns, this.data);
  //       doc.save('products.pdf');
  //     });
  //   });
  // }


  exportPdf() {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then(() => {
        var doc = new jsPDF.default('p', 'px', 'a4');
        var page = 1
        // Add header
        const headerText = `${this.projectData.buName} - ${this.projectData.projectName}`;
        const headerHeight = 30; // Increased header height
        const headerColor = [0, 0, 255]; // Blue color for header
        doc.setFontSize(16);
        doc.setTextColor(headerColor[0], headerColor[1], headerColor[2]); // Set header text color

        // doc.setTextColor(...headerColor); // Set header text color
        doc.text(headerText, doc.internal.pageSize.getWidth() / 2, headerHeight, { align: 'center' });


        const headerY = headerHeight + 30; // Y position below the header

        // Add margin line
        const marginLineY = headerY + 10; // Adjust the Y position as needed
        const marginLineXStart = 10;
        const marginLineXEnd = doc.internal.pageSize.getWidth() - 10;
        doc.setLineWidth(0.5); // Set line width
        doc.setDrawColor(0); // Set line color to black
        doc.line(marginLineXStart, marginLineY, marginLineXEnd, marginLineY); // Draw line

        const contentWidth = doc.internal.pageSize.getWidth();

        // Calculate the width of each text element
        const achievedScoreWidth = doc.getStringUnitWidth(this.achievedScore.toString()) * 3;
        const maturityLevelWidth = doc.getStringUnitWidth(this.maturityLevel.toString()) * 3;
        const dateWidth = doc.getStringUnitWidth(Date.now().toString()) * 3;

        // Calculate the starting X position for each text element
        const achievedScoreX = 10; // Left aligned
        const maturityLevelX = (contentWidth - maturityLevelWidth) / 2; // Center aligned
        const dateX = contentWidth - dateWidth - 10; // Right aligned
        doc.setTextColor(headerColor[0], headerColor[1], 0); // Set header text color

        // Add achieved score, maturity level, and date below the header with left, center, and right alignment
        doc.text(`Maturity Level : ${this.maturityLevel.toString()}`, maturityLevelX, headerY, { align: 'center' });
        doc.text(`Achieved Score : ${this.achievedScore.toString()}`, achievedScoreX, headerY, { align: 'left' });
        doc.text(`Date : ${new Date().toLocaleDateString()}`, dateX, headerY, { align: 'right' });

        // Set styles for the table
        const styles = {
          font: 'Arial',
          fontSize: 12,
          fontStyle: 'normal',
          textColor: [0, 0, 0], // black text color
          overflow: 'linebreak', // overflow method
          cellPadding: 5, // cell padding (space between content and cell border)
          valign: 'middle', // vertical alignment
          halign: 'center', // horizontal alignment
          fillColor: [255, 255, 255], // background color for the table cells
          lineWidth: 0.1, // width of table borders
          lineColor: [0, 0, 0] // color of table borders (black)
        };

        // Set styles for the header row
        const headerStyles = {
          fillColor: [200, 200, 200], // background color for the header row
          textColor: [0, 0, 0], // black text color for header row
          fontStyle: 'bold', // bold font style for header row
        };


        // Mapping over the data array to exclude the 'id' field
        const body = this.mergedArray.map(({ id, ...rest }) => Object.values(rest));
        const addFooter = () => {
          const totalPages = 2; // Hardcoded total number of pages
          const footerHeight = 20; // Height of the footer
          for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i); // Set current page
            doc.setFontSize(10);
            // Calculate the position for page number based on page width and height
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const xOffset = 10;
            const yOffset = pageHeight - 10;

            // Set text color to black for page numbers
            doc.setTextColor(0);

            doc.text(`Page ${i} of ${totalPages}`, pageWidth - xOffset, pageHeight - footerHeight / 2, { align: 'right' });

            // Add line to footer
            doc.setLineWidth(0.5); // Set line width
            doc.setDrawColor(0); // Set line color to black
            doc.line(marginLineXStart, pageHeight - footerHeight, marginLineXEnd, pageHeight - footerHeight); // Draw line
          }
        };

        (doc as any).autoTable({
          head: [this.exportColumns], // Header row
          body: body, // Table data
          startY: marginLineY + 5, // Y position to start the table (below the margin line)
          styles: styles, // Table styles
          headStyles: headerStyles, // Header row styles
          // addPageContent: addFooter // Add footer with page numbers
        });

        doc.save('products.pdf'); // Save the PDF
      });
    });
  }
  Exit() {
    alert('You will lose entire data')
    sessionStorage.clear();
    this.router.navigate(['/home'])

  }

  assignLabel(sum: number) {
    if (sum >= 22 && sum <= 55) {
      return 'Basic';
    } else if (sum >= 56 && sum <= 110) {
      return 'Initial';
    } else if (sum >= 111 && sum <= 164) {
      return 'Developing';
    } else if (sum >= 165 && sum <= 219) {
      return 'Mature';
    } else if (sum >= 220) {
      return 'Optimized';
    } else {
      return 'Unknown';
    }
  }






}
