import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ceTable1: any[] = []
  ceTable2: any[] = []
  enablersAverages: any = {}
  challengesAverages: any = {}

  enablerScore: any[] = []
  challengesScore: any[] = []
  projectData!: any
  cols!: Column[];
  exportColumns!: ExportColumn[];

  constructor(private dbService: DbService) { }

  ngOnInit(): void {

    this.projectData = this.dbService.projectData
    this.enablerScore = JSON.parse(sessionStorage.getItem('enablers')!)
    this.challengesScore = JSON.parse(sessionStorage.getItem('challenges')!)

    console.log('enable score', this.enablerScore);
    console.log('challenge score', this.challengesScore);

    // this.sideBarOpen = this.dbService.isSidebarOpen ? true : false
    this.cols = [
      { field: 'id', header: 'Id', customExportHeader: 'Id' },
      { field: 'theme', header: 'Theme', customExportHeader: 'Theme' },
      { field: 'enabler', header: 'Enabler', customExportHeader: 'Enabler' },
      { field: 'someOfTheThingsYouMightSee', header: 'Some Of The Things You Might See', customExportHeader: 'Some Of The Things You Might See' },
      { field: 'selectedOption', header: 'Selected Option', customExportHeader: 'Selected Option' },

    ];
    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));


    this.ceTable1 = [
      { theme: 'Inter-Team Collaboration & Communication', challengeAverage: 0, enablersAverage: 0 },
      { theme: 'Cross-Functional Knowledge', challengeAverage: 0, enablersAverage: 0 },
      { theme: 'Organizational Culture', challengeAverage: 0, enablersAverage: 0 },
      { theme: 'Tooling', challengeAverage: 0, enablersAverage: 0 },
      { theme: 'Organizational Processes', challengeAverage: 0, enablersAverage: 0 },
    ]

    this.ceTable2 = [
      { status: 'Not Ready', description: 'There are many more challenges to the adoption of DevOps than enablers.',avg:'-4 to -2' },
      { status: 'Early Days', description: 'There are indications of changes being planned/discussed that will promote enablers and reduce challenges.',avg:'-2 to -0.5' },
      { status: 'Cancelling', description: 'The challenges present in the organization are cancelling the positive impact from enablers.' ,avg:'-0.5 to 0.5'},
      { status: 'Moving in Right Direction', description: 'Enabling initiatives are slightly outweighing the challenges.' ,avg:'0.5 to 1.5'},
      { status: 'Gaining Momentum', description: 'Planned initiatives are close to completion, and in fact, some have already yielded positive results with enablers overcoming challenges.' ,avg:'1.5 to 2.5'},
      { status: 'Strong', description: 'There is a culture, an attitude, and an understanding of good practices that can propel DevOps introduction in the organization.',avg:'2.5 above' },
    ]
    this.enablersAverages = JSON.parse(sessionStorage.getItem('enablersAverage')!)
    this.challengesAverages = JSON.parse(sessionStorage.getItem('challengesAverage')!)
    console.log('ea', this.enablersAverages);
    console.log('ca', this.challengesAverages);
    this.assignAverages();

  }

  assignAverages() {
    //enabler averages
    this.ceTable1.forEach(element => {
      const theme = element.theme;
      const matchingAverage = this.enablersAverages?.[theme]; // Access average using theme as property

      if (matchingAverage) {
        element.enablersAverage = matchingAverage; // Assuming average is in a property named "average"
      } else {
        element.enablersAverage = 0; // Or set a default value if no matching average is found
      }
    });

    console.log('enabler avg', this.ceTable1); // This will still log the original averages

    //challenges averages
    this.ceTable1.forEach(element => {
      const theme = element.theme;
      const matchingAverage = this.challengesAverages?.[theme]; // Access average using theme as property

      if (matchingAverage ) {
        element.challengeAverage = matchingAverage; // Assuming average is in a property named "average"
      } else {
        element.challengeAverage = 0; // Or set a default value if no matching average is found
      }
    });

    console.log('challenges avg', this.ceTable1); // This will still log the original averages
  }

  exportPdf() {
    // if (this.mergedArray.length == 0) {
    //   this.dbService.showWarn('Please choose scores');
    //   return
    // }
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
          // const achievedScoreWidth = doc.getStringUnitWidth(this.achievedScore.toString()) * 3;
          // const maturityLevelWidth = doc.getStringUnitWidth(this.devOpsPracticeMaturity.toString()) * 3;
          const dateWidth = doc.getStringUnitWidth(Date.now().toString()) * 3;
          const achievedScoreX = 10;
          // const maturityLevelX = (contentWidth - maturityLevelWidth) / 2;
          const dateX = contentWidth - dateWidth - 10;
          doc.setTextColor(headerColor[0], headerColor[1], 0);
          // doc.text(`Maturity Level : ${this.devOpsPracticeMaturity.toString()}`, maturityLevelX, headerY, { align: 'center' });
          // doc.text(`Achieved Score : ${this.achievedScore.toString()}`, achievedScoreX, headerY, { align: 'left' });
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


            // Add the first table
            doc.setFontSize(14);
            doc.setFont('', '', 'bold'); // Set font style to bold
            doc.text(`DevOps Assessment Score`, doc.internal.pageSize.getWidth() / 2, currentY, { align: 'center' });
            currentY += 10; // Add some space below the title
            if (this.ceTable1 && this.ceTable1.length) {
              (doc as any).autoTable({
                head: [['Theme', 'Challenges', 'Enablers', 'Readiness Score', 'Maturity Level']],
                body: this.ceTable1.map(row => [row.theme, row.challengeAverage, row.enablersAverage, (row.enablersAverage-row.challengeAverage).toFixed(2), this.assignStatus(row.enablersAverage-row.challengeAverage)]),
                startY: currentY,
                styles: defaultStyles,
                headStyles: headerStyles,
              });
              currentY = (doc as any).lastAutoTable.finalY + 15; // update position
            }
  
            // Add the second table
  
           
            doc.setFontSize(14);
            doc.setFont('', '', 'bold'); // Set font style to bold
            doc.text(`Maturity Levels Definition`, doc.internal.pageSize.getWidth() / 2, currentY, { align: 'center' });
            currentY += 10; // Add some space below the title
  
            //const columnWidths = [100, 200, 100]; // Adjust widths as needed
            const avgColumnStyle = { ...defaultStyles, innerWidth:100 };

            if (this.ceTable2 && this.ceTable2.length) {
              (doc as any).autoTable({
                head: [['Legend','Range','Description']],
                body: this.ceTable2.map(row => [row.status, row.avg,row.description]),
                startY: currentY,
                styles: defaultStyles,
                headStyles: headerStyles,
                columnStyles: avgColumnStyle, // Add column width definition

              });
              currentY = (doc as any).lastAutoTable.finalY + 140; // Update position
            }

            // Check if currentY exceeds page height and add new page if necessary
           // Check if there's enough space for the fourth table on the current page
          const availableHeight1 = doc.internal.pageSize.getHeight() - currentY - 30; // Account for margins and footer
          const estimatedSecondTableHeight1 = calculateThirdTableHeight(this.enablerScore); // Call a function to estimate the height
          function calculateThirdTableHeight(data: any[]) {
            // Implement logic to estimate the height of the second table based on data length, font size, etc.
            // This is a placeholder, replace with your actual calculation
            return data.length * 15 + 50; // Adjust the formula as needed
          }
          if (estimatedSecondTableHeight1 > availableHeight1) {
            // Second table won't fit, move to next page
            doc.addPage();
            currentY = 30; // Reset position for new page
          }
          // Add the third table
          doc.setFontSize(14);
          doc.setFont('', '', 'bold'); // Set font style to bold
          doc.text(`Challenges Report`, doc.internal.pageSize.getWidth() / 2, currentY, { align: 'center' });
          currentY += 10; // Add some space below the title

          const challengesBody: any = [];
          let previousSection = '';
          this.challengesScore.forEach((row) => {
            const { theme, challenge, someOfTheThingsYouMightHaveSee, selectedOption } = row;
            const currentSection = theme;
            if (currentSection !== previousSection && previousSection !== '') {
              challengesBody.push([{ content: '', colSpan: 5, styles: { fillColor: [173, 216, 230], cellPadding: -1 } }]);
            }
            challengesBody.push([theme, challenge, someOfTheThingsYouMightHaveSee, selectedOption]);
            previousSection = currentSection;
          });
          if (this.challengesScore && this.challengesScore.length) {
            (doc as any).autoTable({
              head: [['Theme', 'Challenge', 'Some of the things you might see', 'Selected']],
              //body: this.challengesScore.map((row: { theme: any; challenge: any; someOfTheThingsYouMightHaveSee: any; selectedOption: any; }) => [row.theme, row.challenge, row.someOfTheThingsYouMightHaveSee, row.selectedOption]),
              body: challengesBody,
              startY: currentY,
              styles: defaultStyles,
              headStyles: headerStyles,
            });
            currentY = (doc as any).lastAutoTable.finalY + 15; // update position
          }

          // Add the fourth table

          // Check if there's enough space for the fourth table on the current page
          const availableHeight = doc.internal.pageSize.getHeight() - currentY - 30; // Account for margins and footer
          const estimatedSecondTableHeight = calculateSecondTableHeight(this.enablerScore); // Call a function to estimate the height
          function calculateSecondTableHeight(data: any[]) {
            // Implement logic to estimate the height of the second table based on data length, font size, etc.
            // This is a placeholder, replace with your actual calculation
            return data.length * 15 + 50; // Adjust the formula as needed
          }
          if (estimatedSecondTableHeight > availableHeight) {
            // Second table won't fit, move to next page
            doc.addPage();
            currentY = 30; // Reset position for new page
          }
          doc.setFontSize(14);
          doc.setFont('', '', 'bold'); // Set font style to bold
          doc.text(`Enablers Report`, doc.internal.pageSize.getWidth() / 2, currentY, { align: 'center' });
          currentY += 20; // Add some space below the title

          const enablersBody: any = [];
          let previousSection1 = '';
          this.enablerScore.forEach((row) => {
            const { theme, challenge, someOfTheThingsYouMightSee, selectedOption } = row;
            const currentSection = theme;
            if (currentSection !== previousSection1 && previousSection1 !== '') {
              enablersBody.push([{ content: '', colSpan: 5, styles: { fillColor: [173, 216, 230], cellPadding: -1 } }]);
            }
            enablersBody.push([theme, challenge, someOfTheThingsYouMightSee, selectedOption]);
            previousSection1 = currentSection;
          });

          if (this.enablerScore && this.enablerScore.length) {
            (doc as any).autoTable({
              head: [['Theme', 'Challenge', 'Some of the things you might see', 'Selected']],
              //body: this.enablerScore.map((row: { theme: any; enabler: any; someOfTheThingsYouMightSee: any; selectedOption: any; }) => [row.theme, row.enabler, row.someOfTheThingsYouMightSee, row.selectedOption]),
              body:enablersBody,
              startY: currentY,
              styles: defaultStyles,
              headStyles: headerStyles,
            });
            currentY = (doc as any).lastAutoTable.finalY + 120; // Update position
          }

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
        addTables(marginLineY);
        const totalPages = doc.internal.pages.length - 1; // Correct way to get total pages

        // Add footers after determining total page count
        addFooter(totalPages);




        doc.save(`${this.projectData.buName}_Survey_Report.pdf`);
      });
    });
  }

assignStatus(score:number):string{
  if(score < -2 ){
    return 'Not Ready'
  }
  else if(score >= -2 && score < -0.5){
    return 'Early Days'
  }
  else if(score >= -0.5 && score < 0.5){
    return 'Cancelling'
  }
  else if(score >= 0.5 && score < 1.5){
    return 'Moving in Right Direction'
  }
  else if(score >= 1.5 && score < 2.5){
    return 'Gaining Momentum'
  }
  else {
    return 'Strong'
  }
}
}
