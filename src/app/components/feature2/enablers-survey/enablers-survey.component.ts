import { Component, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import 'jspdf-autotable'; // Optional for table formatting

interface Question {
  id: number;
  theme: string;
  enabler: string;
  someOfTheThingsYouMightSee: string | string[];
  progress: string[];
  selectedOption: string; // To store the selected option for each question
  score: number
}
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
  selector: 'app-enablers-survey',
  templateUrl: './enablers-survey.component.html',
  styleUrls: ['./enablers-survey.component.scss']
})
export class EnablersSurveyComponent implements OnInit {
  currentQuestionIndex = 0; // To track the currently displayed question
  SOTIsArray: boolean = false
  reasonsArray: string[] = []
  selectedData: Question[] = []
  projectData: any;

  cols!: Column[];
  exportColumns!: ExportColumn[];


  constructor(private dbService: DbService) { }

  ngOnInit(): void {
    this.projectData = this.dbService.projectData
    // this.sideBarOpen = this.dbService.isSidebarOpen ? true : false
    this.cols = [
      { field: 'id', header: 'Id', customExportHeader: 'Id' },
      { field: 'theme', header: 'Theme', customExportHeader: 'Theme' },
      { field: 'enabler', header: 'Enabler', customExportHeader: 'Enabler' },
      { field: 'someOfTheThingsYouMightSee', header: 'Some Of The Things You Might See', customExportHeader: 'Some Of The Things You Might See' },
      { field: 'selectedOption', header: 'Selected Option', customExportHeader: 'Selected Option' },

    ];
    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));

    const savedEnablers = JSON.parse(sessionStorage.getItem('enablers')!);
    console.log('saved enablers', savedEnablers);

    savedEnablers?.forEach((enabler: Question) => {
      const currenQuestionIndex = enabler.id - 1
      if (enabler.id == this.table[currenQuestionIndex].id) {
        this.table[currenQuestionIndex].selectedOption = enabler.selectedOption
      }
    });

    const arr = this.table[this.currentQuestionIndex].someOfTheThingsYouMightSee;
    if (Array.isArray(arr)) {
      this.SOTIsArray = true

      arr.forEach((element: string) => {
        this.reasonsArray.push(element)
      });
    }
    else {
      this.SOTIsArray = false
    }
  }

  download(table: Question[]) {
    this.save(table, false) //save data even if user directly downloads pdf
    console.log('selected options', table);
    this.selectedData = table
    console.log('selected data', this.selectedData);

    this.dbService.showSuccess('Update Successful')
    //this.exportPdf()
  }
  save(table: Question[], clickOnSave: boolean) {

    sessionStorage.setItem('enablerScores', JSON.stringify(table))
    const progressScoreMap: { [progressOption: string]: number } = {
      'Yes': 4,
      'Close to completion': 3,
      'Work is underway': 2,
      'Being planned': 1,
      'No': 0
    };
    const newTable: any = {};
    let themeCount: any = {}; // Object to track the number of elements per theme

    table.forEach(element => {
      const theme = element.theme;
      const progressOption = element.selectedOption;
      const score = progressScoreMap[progressOption] || 0; // Default score to 0 if undefined
      element.score = score
      // Initialize the sum for the theme if it doesn't exist yet
      if (!newTable[theme]) {
        newTable[theme] = 0;
      }

      // Add the score to the corresponding theme in the new table
      newTable[theme] += score;

      // Initialize count for the theme if it doesn't exist yet
      if (!themeCount[theme]) {
        themeCount[theme] = 0;
      }

      // Increment count for the current theme
      themeCount[theme]++;
    });

    // Calculate average for each theme
    for (const theme in newTable) {
      if (themeCount[theme] > 0) { // Avoid division by zero
        newTable[theme] /= themeCount[theme];
        newTable[theme] = newTable[theme].toFixed(2); // Limit to 2 decimal places

      } else {
        newTable[theme] = 0; // No elements for theme, set average to 0
      }
    }
    console.log('new table enablers', newTable);
    sessionStorage.setItem('enablersAverage', JSON.stringify(newTable))

    console.log('save enablers questions', table);
    sessionStorage.setItem('enablers', JSON.stringify(table))
    if (clickOnSave) {
      this.dbService.showSuccess('Data saved succesfully')
    }
  }
  nextQuestion() {
    this.reasonsArray = []
    if (this.currentQuestionIndex < this.table.length - 1) {
      this.currentQuestionIndex++;

      const arr = this.table[this.currentQuestionIndex].someOfTheThingsYouMightSee;
      if (Array.isArray(arr)) {
        this.SOTIsArray = true

        arr.forEach((element: string) => {
          this.reasonsArray.push(element)
        });
      }
      else {
        this.SOTIsArray = false
      }

    }
  }

  previousQuestion() {
    this.reasonsArray = []
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;


      const arr = this.table[this.currentQuestionIndex].someOfTheThingsYouMightSee;
      if (Array.isArray(arr)) {
        this.SOTIsArray = true

        arr.forEach((element: string) => {
          this.reasonsArray.push(element)
        });
      }
      else {
        this.SOTIsArray = false
      }
    }
  }
  table: Question[] = [
    {
      id: 1,
      theme: 'Inter-Team Collaboration & Communication',
      enabler: `Organization has strategies for standardized approaches to inter-team communication`,
      someOfTheThingsYouMightSee: `Every team knows who the stakeholders are, what their core interest is, and when and for what they should be contacted.
      A template, developed collaboratively, is used for sending out all delivery-related communications.
      Set-up of feedback mechanisms that allow proactive improvement of communication standards.
      `.trim().split('\n'),
      progress: ['Yes', 'No', 'Being Planned', 'Work is underway', 'Close to completion'],
      selectedOption: '',
      score: 0
    },
    {
      id: 2,
      theme: 'Inter-Team Collaboration & Communication',
      enabler: `There is a strong organizational/team level drive for establishment of clear separation of duties
      `,
      someOfTheThingsYouMightSee: `
      Functional groups like Business/System Analysts, Developers, Architects, Testers, and Infrastructure specialists are aware of their core job responsibilities.
      In projects with cross-functional teams, a project kick-off activity event is a mandatory step where resources are made aware of their responsibilities.
      `.trim().split('\n'),
      progress: ['Yes', 'No', 'Being Planned', 'Work is underway', 'Close to completion'],
      selectedOption: '',
      score: 0
    },
    {
      id: 3,
      theme: 'Inter-Team Collaboration & Communication',
      enabler: `Management is in favor of (or has already completed) creation of multidisciplinary teams
      `,
      someOfTheThingsYouMightSee: `
      Cross-functional teams, made up of different functions (Business/System Analysts, Developers, Architect, Testers, Operations and Infrastructure, etc.), are becoming the norm for projects.
      In some cases, dedicated permanent product teams have been formed and their performance is being measured. Based on their outcomes, the management team has plans to replicate this team topology across the organization.
      `.trim().split('\n'),
      progress: ['Yes', 'No', 'Being Planned', 'Work is underway', 'Close to completion'],
      selectedOption: '',
      score: 0
    },
    {
      id: 4,
      theme: 'Inter-Team Collaboration & Communication',
      enabler: `Short feedback cycles between delivery functions is considered standard for software delivery
      `,
      someOfTheThingsYouMightSee: `
      There is an organization-wide (or at least a team-level) commitment underway (or has been completed) to shorten feedback cycles between functions. This stance is applicable to work being completed by either in-house teams or external vendors.
      `.trim().split('\n'),
      progress: ['Yes', 'No', 'Being Planned', 'Work is underway', 'Close to completion'],
      selectedOption: '',
      score: 0
    },
    {
      id: 5,
      theme: 'Inter-Team Collaboration & Communication',
      enabler: `Clear expectations of collaboration are documented as part of vendor contracts
      `,
      someOfTheThingsYouMightSee: `
      There is an organization-wide effort underway (or has been completed) for introduction of clearly documented collaboration rules that vendors must agree to. 
      For full transparency, vendors may be asked to share their process and delivery principles and to agree to penalties if agreed upon SLAs are not respected.
      `.trim().split('\n'),
      progress: ['Yes', 'No', 'Being Planned', 'Work is underway', 'Close to completion'],
      selectedOption: '',
      score: 0
    },
    {
      id: 6,
      theme: 'Cross-Functional Knowledge',
      enabler: `Provide training on other functions' methods
      `,
      someOfTheThingsYouMightSee: `
      Efforts are underway (or have been completed) at the organization level to provide practical and high-quality opportunity for cross-functional training for its teams. 
      Training is provided (or is being provided) to non-DevOps teams and leadership so they understand how to work with DevOps teams. 
      `.trim().split('\n'),
      progress: ['Yes', 'No', 'Being Planned', 'Work is underway', 'Close to completion'],
      selectedOption: '',
      score: 0
    },
    {
      id: 7,
      theme: 'Cross-Functional Knowledge',
      enabler: `Coach teams as they learn by doing `,
      someOfTheThingsYouMightSee: `
      The organization has expressed openness to bringing (or has already engaged with) highly experienced and effective DevOps coaches for the delivery teams.
      Teams that have had success with DevOps-related enhancements are expected to educate/mentor those who are in the earlier stages of experimenting with DevOps principles.
      `.trim().split('\n'),
      progress: ['Yes', 'No', 'Being Planned', 'Work is underway', 'Close to completion'],
      selectedOption: '',
      score: 0
    },
    {
      id: 8,
      theme: 'Organizational Culture',
      enabler: `Human Resources takes a proactive role in overcoming cultural challenges
      `,
      someOfTheThingsYouMightSee: `
      HR is proactively involved in strategizing and developing a communication plan when initiatives that may require a change to existing culture are planned.
      HR is responsible for/assists in creating messaging that sets the right expectations for those who will be impacted by highlighting the benefits of the change to the organization and the effected resource.
      `.trim().split('\n'),
      progress: ['Yes', 'No', 'Being Planned', 'Work is underway', 'Close to completion'],
      selectedOption: '',
      score: 0
    },
    {
      id: 9,
      theme: 'Organizational Culture',
      enabler: `Communicate that change is non-negotiable
      `,
      someOfTheThingsYouMightSee: `
      Leadership is clear about the direction being taken and makes adapting to changing practices a mandatory requirement for all resources.
      `.trim().split('\n'),
      progress: ['Yes', 'No', 'Being Planned', 'Work is underway', 'Close to completion'],
      selectedOption: '',
      score: 0
    },
    {
      id: 10,
      theme: 'Tooling',
      enabler: `DevOps practitioners converge towards setting tools standards
      `,
      someOfTheThingsYouMightSee: `
      Teams that use different tools are embarking on (or have already completed) a move to enterprise standards.  
      Teams are actively trying to using the same tools for their delivery pipelines. 
            `.trim().split('\n'),
      progress: ['Yes', 'No', 'Being Planned', 'Work is underway', 'Close to completion'],
      selectedOption: '',
      score: 0
    },
    {
      id: 11,
      theme: 'Tooling',
      enabler: `Establish best practices for tool usage
      `,
      someOfTheThingsYouMightSee: `
      Teams understand the fact that the effectiveness of the tools being used is based on the underlying process.
      As much as possible, configuration of tools using default settings is preferred over customizing them. Default out- of-the-box configuration of tools is rarely changed. 
      `.trim().split('\n'),
      progress: ['Yes', 'No', 'Being Planned', 'Work is underway', 'Close to completion'],
      selectedOption: '',
      score: 0
    },
    {
      id: 12,
      theme: 'Tooling',
      enabler: `Componentize where necessary
      `,
      someOfTheThingsYouMightSee: `
      Reuse of software components is encouraged as part of continuous operational efficiency improvements. 
      Organizationally, software delivery teams are expected to share components they make with others (when appropriate).
      `.trim().split('\n'),
      progress: ['Yes', 'No', 'Being Planned', 'Work is underway', 'Close to completion'],
      selectedOption: '',
      score: 0
    },
    {
      id: 13,
      theme: 'Organizational Processes',
      enabler: `There is a strong practice for clear documentation of business/IT needs
      `,
      someOfTheThingsYouMightSee: `
      Just-Enough and Just-Right documentation is completed as part of every delivery. The documentation is usually completed as a cross-functional collaborative exercise. In an ideal situation, the teams use auto-process documentation tools.
      `.trim().split('\n'),
      progress: ['Yes', 'No', 'Being Planned', 'Work is underway', 'Close to completion'],
      selectedOption: '',
      score: 0
    },
    {
      id: 14,
      theme: 'Organizational Processes',
      enabler: `Examining process health through data is mandatory
      `,
      someOfTheThingsYouMightSee: `
      The delivery processes are continually evaluated against their performance related data, and areas for improvement are proactively found and worked on.
      `.trim().split('\n'),
      progress: ['Yes', 'No', 'Being Planned', 'Work is underway', 'Close to completion'],
      selectedOption: '',
      score: 0
    },
    {
      id: 15,
      theme: 'Organizational Processes',
      enabler: `Automation of processes
      `,
      someOfTheThingsYouMightSee: `
      There is a big push to automate processes where possible.
      The ability to automate processes has become part of the technology teams' guiding principles.
      `.trim().split('\n'),
      progress: ['Yes', 'No', 'Being Planned', 'Work is underway', 'Close to completion'],
      selectedOption: '',
      score: 0
    },
    {
      id: 16,
      theme: 'Organizational Processes',
      enabler: `Enterprise Architecture and Application Architecture play an active role in system design
      `,
      someOfTheThingsYouMightSee: `
      Application and Enterprise Architecture teams have a strong influence on the overall design philosophy of the organization and systems being developed.
      An Architecture Review Board assesses proposed architectures against enterprise standards before system designs are confirmed.
      Application and Enterprise Architecture teams ensure the architecture is flexible enough to accommodate changes with minimal side effects (like massive rework or introduction of technical debt).
      `.trim().split('\n'),
      progress: ['Yes', 'No', 'Being Planned', 'Work is underway', 'Close to completion'],
      selectedOption: '',
      score: 0
    },
    {
      id: 17,
      theme: 'Organizational Processes',
      enabler: `Developers follow good practices while writing code
      `,
      someOfTheThingsYouMightSee: `
      Developers use consistent naming conventions, follow code design principles like SOLID, unit test, run integration tests with mocking, and adhere to good source management plans.
      `.trim().split('\n'),
      progress: ['Yes', 'No', 'Being Planned', 'Work is underway', 'Close to completion'],
      selectedOption: '',
      score: 0
    },
    {
      id: 18,
      theme: 'Organizational Processes',
      enabler: `Testers use strategic quality management approaches
      `,
      someOfTheThingsYouMightSee: `
      Testers take a multi-perspective approach for establishing a test strategy and use automation where possible.  
      `.trim().split('\n'),
      progress: ['Yes', 'No', 'Being Planned', 'Work is underway', 'Close to completion'],
      selectedOption: '',
      score: 0
    },
    {
      id: 19,
      theme: 'Organizational Processes',
      enabler: `Adopting Infrastructure as a Code
      `,
      someOfTheThingsYouMightSee: `
      Infrastructure teams version, test, build, and deploy using IaC and support setting up pre-configured systems and networks.
      `.trim().split('\n'),
      progress: ['Yes', 'No', 'Being Planned', 'Work is underway', 'Close to completion'],
      selectedOption: '',
      score: 0
    },

  ]

  // exportPdf() {
  //   import('jspdf').then((jsPDF) => {
  //     import('jspdf-autotable').then(() => {
  //       var doc = new jsPDF.default('p', 'px', 'a4');

  //       const headerText = `${this.projectData.buName}`;
  //       const headerHeight = 30;
  //       const headerColor = [0, 0, 255];
  //       doc.setFontSize(16);
  //       doc.setTextColor(headerColor[0], headerColor[1], headerColor[2]);
  //       doc.text(headerText, doc.internal.pageSize.getWidth() / 2, headerHeight, { align: 'center' });

  //       doc.setFontSize(16);
  //       doc.setTextColor(headerColor[0], headerColor[1], headerColor[2]);
  //       doc.text(headerText, doc.internal.pageSize.getWidth() / 2, headerHeight, { align: 'center' });

  //       const subHeaderText = `${this.projectData.projectName}`;
  //       const subHeaderFontSize = 12;
  //       doc.setFontSize(subHeaderFontSize);
  //       doc.setTextColor(0, 0, 0);
  //       const subHeaderTextY = headerHeight + subHeaderFontSize + 5;

  //       const subHeaderTextWidth = doc.getTextWidth(subHeaderText);
  //       const startX = (doc.internal.pageSize.getWidth() - subHeaderTextWidth) / 2;
  //       const startY = subHeaderTextY + 2;
  //       const endX = startX + subHeaderTextWidth;
  //       const lineHeight = 1;
  //       doc.setLineWidth(lineHeight);
  //       doc.setDrawColor(headerColor[0], headerColor[1], 0);
  //       doc.line(startX, startY, endX, startY);

  //       doc.text(subHeaderText, doc.internal.pageSize.getWidth() / 2, subHeaderTextY, { align: 'center' });

  //       const headerY = subHeaderTextY + 30;

  //       const marginLineY = headerY + 10;
  //       const marginLineXStart = 10;
  //       const marginLineXEnd = doc.internal.pageSize.getWidth() - 10;
  //       doc.setLineWidth(0.5);
  //       doc.setDrawColor(0);
  //       doc.line(marginLineXStart, marginLineY, marginLineXEnd, marginLineY);

  //       const contentWidth = doc.internal.pageSize.getWidth();
  //       doc.setFontSize(11);

  //       const dateWidth = doc.getStringUnitWidth(Date.now().toString()) * 3;
  //       const dateX = contentWidth - dateWidth - 10;
  //       doc.setTextColor(headerColor[0], headerColor[1], 0);
  //       doc.text(`Date : ${new Date().toLocaleDateString()}`, dateX, headerY, { align: 'right' });

  //       const defaultStyles = {
  //         font: 'Arial',
  //         fontSize: 12,
  //         fontStyle: 'normal',
  //         textColor: [0, 0, 0],
  //         overflow: 'linebreak',
  //         cellPadding: 5,
  //         valign: 'middle',
  //         halign: 'left',
  //         fillColor: [255, 255, 255],
  //         lineWidth: 0.1,
  //         lineColor: [0, 0, 0]
  //       };

  //       const scoreColumnStyle = { ...defaultStyles, halign: 'center' };

  //       const headerStyles = {
  //         fillColor: [200, 200, 200],
  //         textColor: [0, 0, 0],
  //         fontStyle: 'bold',
  //       };

  //       const body = this.selectedData.map(({ id, theme, enabler, someOfTheThingsYouMightSee, selectedOption }) => Object.values({ id, theme, enabler, someOfTheThingsYouMightSee, selectedOption }));

  //       (doc as any).autoTable({
  //         head: [this.exportColumns],
  //         body: body,
  //         startY: marginLineY + 5,
  //         styles: defaultStyles,
  //         columnStyles: {
  //           4: scoreColumnStyle,
  //         },
  //         headStyles: headerStyles,
  //       });

  //       const addFooter = (totalPages: number) => {
  //         const marginLineXStart = 10;
  //         const marginLineXEnd = doc.internal.pageSize.getWidth() - 10;
  //         for (let i = 1; i <= totalPages; i++) {
  //           doc.setPage(i);
  //           const pageWidth = doc.internal.pageSize.getWidth();
  //           const pageHeight = doc.internal.pageSize.getHeight();
  //           const xOffset = 10;
  //           const yOffset = pageHeight - 10;
  //           doc.setFontSize(10);
  //           doc.setTextColor(0);
  //           doc.text(`Page ${i} of ${totalPages}`, pageWidth - xOffset, yOffset, { align: 'right' });
  //           doc.setLineWidth(0.5);
  //           doc.setDrawColor(0);
  //           doc.line(marginLineXStart, pageHeight - 20, marginLineXEnd, pageHeight - 20);
  //         }
  //       };

  //       const totalPages = doc.internal.pages.length - 1;
  //       addFooter(totalPages);

  //       doc.save('Enablers.pdf');
  //     });
  //   });
  // }

}
