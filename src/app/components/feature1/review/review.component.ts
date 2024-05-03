import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
// import * as jsPDF from 'jspdf';
import 'jspdf-autotable'; // Optional for table formatting
import jsPDF from 'jspdf';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';
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
  constructor(private dbService: DbService, private router: Router, private dialog: MatDialog) { }
  data$ = this.dbService.getAllData(); // Observable returned from service
  ngOnInit(): void {
    this.projectData = this.dbService.projectData

    const { buName, projectName } = this.projectData;

    const array1 = JSON.parse(sessionStorage.getItem(`${buName}|${projectName}|config`)!) || [];
    const array2 = JSON.parse(sessionStorage.getItem(`${buName}|${projectName}|ci`)!) || [];
    const array3 = JSON.parse(sessionStorage.getItem(`${buName}|${projectName}|cat`)!) || [];
    const array4 = JSON.parse(sessionStorage.getItem(`${buName}|${projectName}|iac`)!) || [];
    const array5 = JSON.parse(sessionStorage.getItem(`${buName}|${projectName}|cdd`)!) || [];
    const array6 = JSON.parse(sessionStorage.getItem(`${buName}|${projectName}|cm`)!) || [];
    const array7 = JSON.parse(sessionStorage.getItem(`${buName}|${projectName}|cs`)!) || [];

    // Merge the arrays into a single array
    this.mergedArray = [...array1, ...array2, ...array3, ...array4, ...array5, ...array6, ...array7];
    sessionStorage.setItem('mergedArray',JSON.stringify( this.mergedArray))
   
   // this.mergedArray = JSON.parse(sessionStorage.getItem('mergedArray')!)
    console.log('merged array', this.mergedArray);
    this.achievedScore = this.mergedArray.reduce((accumulator, currentItem) => accumulator + currentItem.value, 0);
    console.log('achievedScore', this.achievedScore); // Output the sum of all values

    this.maturityLevel = this.assignLabel(this.achievedScore)
    console.log('maturity level', this.maturityLevel);

    this.cols = [
      { field: 'item', header: 'Page', customExportHeader: 'Page' },
      { field: 'identifier', header: 'Stage Definition', customExportHeader: 'Stage Definition' },
      { field: 'practiceStage', header: 'Practice Stage', customExportHeader: 'Practice Stage' },
      { field: 'description', header: 'Stage Info', customExportHeader: 'Stage Info' },
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
        const headerText = `${this.projectData.buName}`;
        const headerHeight = 30; // Increased header height
        const headerColor = [0, 0, 255]; // Blue color for header
        doc.setFontSize(16);
        doc.setTextColor(headerColor[0], headerColor[1], headerColor[2]); // Set header text color

        // doc.setTextColor(...headerColor); // Set header text color
        doc.text(headerText, doc.internal.pageSize.getWidth() / 2, headerHeight, { align: 'center' });

        // Main header text with larger font and blue color
        doc.setFontSize(16);
        doc.setTextColor(headerColor[0], headerColor[1], headerColor[2]);
        doc.text(headerText, doc.internal.pageSize.getWidth() / 2, headerHeight, { align: 'center' });

        // Sub-header text with smaller font and black color
        const subHeaderText = `${this.projectData.projectName}`; // Assuming sub-header content
        const subHeaderFontSize = 12;
        doc.setFontSize(subHeaderFontSize);
        doc.setTextColor(0, 0, 0); // Black color for sub-header
        const subHeaderTextY = headerHeight + subHeaderFontSize + 5; // Adjust vertical spacing

        // Get sub-header text width
        const subHeaderTextWidth = doc.getTextWidth(subHeaderText); // Measure text width

        // Calculate decoration line coordinates
        const startX = (doc.internal.pageSize.getWidth() - subHeaderTextWidth) / 2; // Centered alignment
        const startY = subHeaderTextY + 2; // Adjust spacing between sub-header and line
        const endX = startX + subHeaderTextWidth;
        const lineHeight = 1; // Line thickness

        // Draw the decoration line
        doc.setLineWidth(lineHeight);
        doc.setDrawColor(headerColor[0], headerColor[1], 0); // Same color as header
        doc.line(startX, startY, endX, startY);

        doc.text(subHeaderText, doc.internal.pageSize.getWidth() / 2, subHeaderTextY, { align: 'center' });


        const headerY = subHeaderTextY + 30; // Y position below the header

        // Add margin line
        const marginLineY = headerY + 10; // Adjust the Y position as needed
        const marginLineXStart = 10;
        const marginLineXEnd = doc.internal.pageSize.getWidth() - 10;
        doc.setLineWidth(0.5); // Set line width
        doc.setDrawColor(0); // Set line color to black
        doc.line(marginLineXStart, marginLineY, marginLineXEnd, marginLineY); // Draw line

        const contentWidth = doc.internal.pageSize.getWidth();
        doc.setFontSize(11);

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
        const defaultStyles = {
          font: 'Arial',
          fontSize: 12,
          fontStyle: 'normal',
          textColor: [0, 0, 0], // black text color
          overflow: 'linebreak', // overflow method
          cellPadding: 5, // cell padding (space between content and cell border)
          valign: 'middle', // vertical alignment
          halign: 'left', // horizontal alignment
          fillColor: [255, 255, 255], // background color for the table cells
          lineWidth: 0.1, // width of table borders
          lineColor: [0, 0, 0] // color of table borders (black)
        };

        // Override alignment for "Score" column to be centered
        const scoreColumnStyle = { ...defaultStyles, halign: 'center' };

        // Set styles for the header row
        const headerStyles = {
          fillColor: [200, 200, 200], // background color for the header row
          textColor: [0, 0, 0], // black text color for header row
          fontStyle: 'bold', // bold font style for header row
        };
        const tableStyles = {
          // Apply default styles to most columns
          styles: defaultStyles,
          // Override styles for "Score" column (index 4)
          columnStyles: {
            4: scoreColumnStyle,
          }
        };

        // Mapping over the data array to exclude the 'id' field
        const body = this.mergedArray.map(({ id, item, identifier, practiceStage, description, value }) => Object.values({ item, identifier, practiceStage, description, value }));
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
          styles: defaultStyles,
          columnStyles: {
            4: scoreColumnStyle,
          }, // Table styles
          headStyles: headerStyles, // Header row styles
          // addPageContent: addFooter // Add footer with page numbers
        });

        doc.save('DevOps_Scores.pdf'); // Save the PDF
      });
    });
  }
  Exit() {
    // alert('You will lose entire data')
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Alert !',
        message: 'Please download pdf before exit, You will lose entire data',
        imageSrc : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxYzKaHgJ41PfwP9Yt6nBjxMAWLcSinuBbZJYaF-u8RA&s'
      }
    })
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        sessionStorage.clear();
        this.router.navigate(['/home'])

      }
      else {

      }
    })

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
