import { Component, Input, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
// import * as jsPDF from 'jspdf';
import 'jspdf-autotable'; // Optional for table formatting
import jsPDF from 'jspdf';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../confirmation/confirmation.component';
import { fontVariant } from 'html2canvas/dist/types/css/property-descriptors/font-variant';
import { fontWeight } from 'html2canvas/dist/types/css/property-descriptors/font-weight';
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

  table1: any[] = [];
  table2: any[] = [];
  devOpsPracticeMaturity!: string;
  data: any[] = []
  cols!: Column[];

  exportColumns!: ExportColumn[];
  mergedArray: any[] = []
  projectData: any;
  achievedScore!: number
  constructor(private dbService: DbService, private router: Router, private dialog: MatDialog) { }
  //data$ = this.dbService.getAllData(); // Observable returned from service
  ngOnInit(): void {
    
    this.projectData = this.dbService.projectData
    debugger
    this.table1 = this.dbService.getTable1();
    this.table2 = this.dbService.getTable2();
    console.log('tbl', this.table1);

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
    sessionStorage.setItem('mergedArray', JSON.stringify(this.mergedArray))

    // this.mergedArray = JSON.parse(sessionStorage.getItem('mergedArray')!)
    console.log('merged array', this.mergedArray);
    this.achievedScore = this.mergedArray.reduce((accumulator, currentItem) => accumulator + currentItem.value, 0);
    console.log('achievedScore', this.achievedScore); // Output the sum of all values

    this.devOpsPracticeMaturity = this.assignLabel(this.achievedScore)
    console.log('maturity level', this.devOpsPracticeMaturity);

    this.cols = [
      { field: 'item', header: 'Practice', customExportHeader: 'Practice' },
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

  image() {
    const doc = new jsPDF();
    const imageData = this.dbService.getImageData();

    if (imageData) {
      doc.addImage(imageData, 'PNG', 10, 10, 200, 200); // Adjust coordinates and dimensions as needed
    }

    doc.save('image.pdf')
  }
  exportPdf() {
    if (this.mergedArray.length == 0) {
      this.dbService.showWarn('Please choose scores');
      return
    }
    if(!this.dbService.imageCaptured){
      this.dbService.showWarn('Please visit dashboad page after saving data')
      return;
    }
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then(() => {
        const doc = new jsPDF.default('p', 'px', 'a4');
        const headerText = `${this.projectData.buName}`;
        const headerHeight = 30;
        const headerColor = [0, 0, 255];

        const addHeader = () => {
          // Add header
          doc.setFontSize(16);
          doc.setTextColor(headerColor[0], headerColor[1], headerColor[2]);
          doc.text(headerText, doc.internal.pageSize.getWidth() / 2, headerHeight, { align: 'center' });

          const subHeaderText = `${this.projectData.projectName}`;
          const subHeaderFontSize = 12;
          doc.setFontSize(subHeaderFontSize);
          doc.setTextColor(0, 0, 0);
          const subHeaderTextY = headerHeight + subHeaderFontSize + 5;
          const subHeaderTextWidth = doc.getTextWidth(subHeaderText);
          const startX = (doc.internal.pageSize.getWidth() - subHeaderTextWidth) / 2;
          const startY = subHeaderTextY + 2;
          const endX = startX + subHeaderTextWidth;
          const lineHeight = 1;
          doc.setLineWidth(lineHeight);
          doc.setDrawColor(headerColor[0], headerColor[1], 0);
          doc.line(startX, startY, endX, startY);
          doc.text(subHeaderText, doc.internal.pageSize.getWidth() / 2, subHeaderTextY, { align: 'center' });

          const headerY = subHeaderTextY + 30;
          const marginLineY = headerY + 10;
          const marginLineXStart = 10;
          const marginLineXEnd = doc.internal.pageSize.getWidth() - 10;
          doc.setLineWidth(0.5);
          doc.setDrawColor(0);
          doc.line(marginLineXStart, marginLineY, marginLineXEnd, marginLineY);

          const contentWidth = doc.internal.pageSize.getWidth();
          doc.setFontSize(11);
          const achievedScoreWidth = doc.getStringUnitWidth(this.achievedScore.toString()) * 3;
          const maturityLevelWidth = doc.getStringUnitWidth(this.devOpsPracticeMaturity.toString()) * 3;
          const dateWidth = doc.getStringUnitWidth(Date.now().toString()) * 3;
          const achievedScoreX = 10;
          const maturityLevelX = (contentWidth - maturityLevelWidth) / 2;
          const dateX = contentWidth - dateWidth - 10;
          doc.setTextColor(headerColor[0], headerColor[1], 0);
          //doc.text(`Maturity Level : ${this.devOpsPracticeMaturity.toString()}`, maturityLevelX, headerY, { align: 'center' });
          doc.text(`Achieved Score : ${this.achievedScore.toString()}`, achievedScoreX, headerY, { align: 'left' });
          doc.text(`Date : ${new Date().toLocaleDateString()}`, dateX, headerY, { align: 'right' });

          return marginLineY + 15;
        };

        const addTables = (startY: any) => {
          let currentY = startY;

          const defaultStyles = {
            font: 'Arial',
            fontSize: 12,
            fontStyle: 'normal',
            textColor: [0, 0, 0],
            overflow: 'linebreak',
            cellPadding: 5,
            valign: 'middle',
            halign: 'left',
            fillColor: [255, 255, 255],
            lineWidth: 0.1,
            lineColor: [0, 0, 0]
          };

          const scoreColumnStyle = { ...defaultStyles, halign: 'center' };
          const headerStyles = {
            fillColor: [200, 200, 200],
            textColor: [0, 0, 0],
            fontStyle: 'bold',
            halign: 'center'
          };
          const maturityColor = {
            font: 'Arial',
            fontSize: 12,
            fontStyle: 'bold',
            textColor: [0, 0, 255],
            overflow: 'linebreak',
            cellPadding: 5,
            valign: 'middle',
            halign: 'left',
            fillColor: [255, 255, 255],
            lineWidth: 0.1,
            lineColor: [0, 0, 0]
          };

          // Add the first table
          // doc.setFontSize(14);
          // doc.setFont('', '', 'bold'); // Set font style to bold
          // doc.text(`DevOps Maturity Score`, doc.internal.pageSize.getWidth() / 2, currentY, { align: 'center' });
          // currentY += 10; // Add some space below the title

          // if (this.table1 && this.table1.length) {
          //   (doc as any).autoTable({
          //     head: [['DevOps Pipeline Practice', 'Score', 'Total Achievable Score']],
          //     body: this.table1.map(row => [row.dpp, row.achievedScore, row.totalScore]),
          //     startY: currentY,
          //     styles: defaultStyles,
          //     headStyles: headerStyles,
          //   });


          //   // Add the new row with totals
          //   const maturityRow = ['DevOps Practice Maturity', `${this.devOpsPracticeMaturity.toString()}`]; // Replace with your actual totals
          //   (doc as any).autoTable({
          //     startY: (doc as any).lastAutoTable.finalY + 10, // Adjust vertical spacing as needed
          //     body: [maturityRow],
          //     styles: maturityColor,
          //     // columnStyles: ['20', '50', ], // Optional: Set column widths if needed
          //   });
          //   currentY = (doc as any).lastAutoTable.finalY + 15; // update position
          // }

          // // Add the second table

          // const defaultStylesTable2 = {
          //   font: 'Arial',
          //   fontSize: 12,
          //   fontStyle: 'normal',
          //   textColor: [0, 0, 0],
          //   overflow: 'linebreak',
          //   cellPadding: 5,
          //   valign: 'middle',
          //   halign: 'left',
          //   lineWidth: 0.1,
          //   lineColor: [0, 0, 0],
          //   fillColor: (columnIndex: number) => { // Dynamic function for background color
          //     return columnIndex === 0 ? [255, 0, 0] : null; // Red for first column, null for others
          //   },
          // };
          // doc.setFontSize(14);
          // doc.setFont('', '', 'bold'); // Set font style to bold
          // doc.text(`Maturity Levels Definition`, doc.internal.pageSize.getWidth() / 2, currentY, { align: 'center' });
          // currentY += 10; // Add some space below the title


          // if (this.table2 && this.table2.length) {
          //   (doc as any).autoTable({
          //     head: [['Maturity Level', 'Description', 'Score']],
          //     body: this.table2.map(row => [row.ml, row.description, row.score]),
          //     startY: currentY,
          //     styles: defaultStylesTable2,
          //     headStyles: headerStyles,
          //   });
          //   currentY = (doc as any).lastAutoTable.finalY + 120; // Update position
          // }

          // // Check if currentY exceeds page height and add new page if necessary
          // if (currentY > doc.internal.pageSize.getHeight() - 30) {
          //   doc.addPage();
          //   currentY = 30; // reset position for new page
          // }

          // Add the merged array content after the tables
          const body: any = [];
          let previousSection = '';
          this.mergedArray.forEach((row) => {
            const { item, identifier, practiceStage, description, value } = row;
            const currentSection = item;
            if (currentSection !== previousSection && previousSection !== '') {
              body.push([{ content: '', colSpan: 5, styles: { fillColor: [173, 216, 230], cellPadding: -1 } }]);
            }
            body.push([item, identifier, practiceStage, description, value]);
            previousSection = currentSection;
          });

          // Add the third table
          doc.setFontSize(14);
          doc.setFont('', '', 'bold'); // Set font style to bold
          doc.text(`Practice Scores`, doc.internal.pageSize.getWidth() / 2, currentY, { align: 'center' });
          currentY += 10; // Add some space below the title

          (doc as any).autoTable({
            head: [this.exportColumns],
            body: body,
            startY: currentY,
            styles: defaultStyles,
            columnStyles: {
              4: scoreColumnStyle,
            },
            headStyles: headerStyles,
          });

          return currentY;
        };

        const addFooter = (totalPages: number) => {
          const marginLineXStart = 10;
          const marginLineXEnd = doc.internal.pageSize.getWidth() - 10;

          for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            const pageWidth = doc.internal.pageSize.getWidth();
            const pageHeight = doc.internal.pageSize.getHeight();
            const xOffset = 10;
            const yOffset = pageHeight - 10;
            doc.setFontSize(10);
            doc.setTextColor(0);
            doc.text(`Page ${i} of ${totalPages}`, pageWidth - xOffset, yOffset, { align: 'right' });
            doc.setLineWidth(0.5);
            doc.setDrawColor(0);
            doc.line(marginLineXStart, pageHeight - 20, marginLineXEnd, pageHeight - 20);
          }
        };

        // Render content to determine total page count
        const marginLineY = addHeader();
        const imageData = this.dbService.getImageData();

        if (imageData) {
        
         // doc.addImage(imageData, 'PNG', 30, 30, 400, 400); // Adjust coordinates and dimensions as needed

          const imgX = (doc.internal.pageSize.getWidth() - 500) / 2;
          const imgY = (doc.internal.pageSize.getHeight() - 400) / 2;
          doc.addImage(imageData, 'PNG', imgX, imgY, 500, 400);
          doc.addPage();


        }
        addTables(marginLineY);
        const totalPages = doc.internal.pages.length - 1; // Correct way to get total pages

        // Add footers after determining total page count
        addFooter(totalPages);




        doc.save(`${this.projectData.buName}_DevOps_Maturity_Report.pdf`);
      });
    });
  }







  Exit() {
    // alert('You will lose entire data')
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Alert !',
        message: 'Please download the PDF before exiting. All data, including saved data, will be lost.',
        imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxYzKaHgJ41PfwP9Yt6nBjxMAWLcSinuBbZJYaF-u8RA&s'
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
    //Total score = 380
    if (sum >= 22 && sum <= 55) {
      return 'Basic';
    } else if (sum > 55 && sum <= 110) {
      return 'Initial';
    } else if (sum > 110 && sum <= 164) {
      return 'Developing';
    } else if (sum > 164 && sum <= 219) {
      return 'Mature';
    } else if (sum >= 220) {
      return 'Optimized';
    } else {
      return 'Unknown';
    }
  }






}
