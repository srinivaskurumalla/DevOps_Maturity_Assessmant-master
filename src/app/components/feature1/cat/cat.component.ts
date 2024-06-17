import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.scss']
})
export class CATComponent implements OnInit {
  showToast: boolean = false;

  projectData!: any
  pageName!: string
  constructor(private dbService: DbService) { }
  existingData: any[] = []
  @Input() showFooter1: boolean = true
  showFooter: boolean = true
  ngOnInit(): void {
    this.projectData = this.dbService.projectData
    console.log('proj data from service', this.projectData);
    const { buName, projectName } = this.projectData;
    this.pageName = `${buName}|${projectName}|cat`
    const catData = JSON.parse(sessionStorage.getItem(`${buName}|${projectName}|cat`)!)
    console.log('cat data', catData);

  }
  @ViewChild('pdfDownload3') pdfDownload: ElementRef | undefined;

  downloadPdf() {
    setTimeout(() => {
      const data = this.pdfDownload!.nativeElement;
      html2canvas(data).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight()); // Add width and height parameters
        pdf.save('downloaded-pdf.pdf');
      });
    }, 1000); // Adjust the delay as needed
  }
  // tablesData: any[][] = [
  //   [
  //     {stageDef : 'Automated Testing', practiceStage: 'Basic', description: 'Source code management is not done.', score: 1, value: 1, tooltip: '1', name:val1  },
  //     {stageDef : 'Automated Testing', practiceStage: 'Initial', description: 'Our developers execute unit tests as part of their code writing activities.', score: 3, value: 3, tooltip: '3', name:val1  },
  //     {stageDef : 'Automated Testing', practiceStage: 'Developed', description: '(Initial) + Automated Functional Scenario Tests', score: 5, value: 5, tooltip: '5', name:val1  },
  //     {stageDef : 'Automated Testing', practiceStage: 'Mature', description: '(Developing) + Automated Security Tests', score: 8, value: 8, tooltip: '8', name:val1  },
  //     {stageDef : 'Automated Testing', practiceStage: 'Optmized', description: '(Mature) + Automated Performance Tests', score: 10, value: 10, tooltip: '10' name:val1,   },
  //   ],
  //   [
  //     { stageDef: 'Another Stage', practiceStage: 'Stage 1', description: 'Description 1', score: 1, value: 1, tooltip: '1', name:val1  },
  //     { stageDef: 'Another Stage', practiceStage: 'Stage 2', description: 'Description 2', score: 2, value: 2, tooltip: '2', name:val1  },
  //     // Add more rows for the second table
  //   ],
  // ]
  table1 = [
    { id: 30101, page: 'Continuous Automated Testing', stageDef: 'Automated Testing', practiceStage: 'Basic', description: 'Source code management is not done.', score: 1, value: 1, tooltip: '1', name: 'val1' },
    { id: 30101, stageDef: 'Automated Testing', practiceStage: 'Initial', description: 'Our developers execute unit tests as part of their code writing activities.', score: 3, value: 3, tooltip: '3', name: 'val1' },
    { id: 30101, stageDef: 'Automated Testing', practiceStage: 'Developed', description: '(Initial) + Automated Functional Scenario Tests', score: 5, value: 5, tooltip: '5', name: 'val1' },
    { id: 30101, stageDef: 'Automated Testing', practiceStage: 'Mature', description: '(Developing) + Automated Security Tests', score: 8, value: 8, tooltip: '8', name: 'val1' },
    { id: 30101, stageDef: 'Automated Testing', practiceStage: 'Optmized', description: '(Mature) + Automated Performance Tests', score: 10, value: 10, tooltip: '10', name: 'val1', },
  ];
  table2 = [
    { id: 30201, page: 'Continuous Automated Testing', stageDef: 'Actions taken on results from automated tests', practiceStage: 'Basic', description: 'We don’t take any action when automated tests fail.', score: 1, value: 1, tooltip: '1', name: 'val2' },
    { id: 30201, stageDef: 'Actions taken on results from automated tests', practiceStage: 'Initial', description: 'We document the problems that emerge and let the developers decide if and how they want to mitigate them.', score: 3, value: 3, tooltip: '3', name: 'val2' },
    { id: 30201, stageDef: 'Actions taken on results from automated tests', practiceStage: 'Developed', description: 'Any problems that emerge during a sprint are tackled before the sprint ends; else they are ignored or left to the discretion of the developer to fix.', score: 5, value: 5, tooltip: '5', name: 'val2' },
    { id: 30201, stageDef: 'Actions taken on results from automated tests', practiceStage: 'Mature', description: 'Any problems that emerge are reviewed by the development team (as part of a regular retrospective-like meeting), a plan to fix the problem is developed, and the tasks associated with implementing the fix is added to the sprint plan.', score: 8, value: 8, tooltip: '8', name: 'val2' },
    { id: 30201, stageDef: 'Actions taken on results from automated tests', practiceStage: 'Optmized', description: 'A failed automated test of any kind is a signal to the team to stop their work and immediately triage the problem.', score: 10, value: 10, tooltip: '10', name: 'val2', },
  ];
  table3 = [
    { id: 30301, page: 'Continuous Automated Testing', stageDef: 'Unit tests.', practiceStage: 'Basic', description: 'We don’t have any unit testing.', score: 1, value: 1, tooltip: '1', name: 'val3' },
    { id: 30301, stageDef: 'Unit tests.', practiceStage: 'Initial', description: 'We have a few simple unit tests that are run every time code is developed.', score: 3, value: 3, tooltip: '3', name: 'val3' },
    { id: 30301, stageDef: 'Unit tests.', practiceStage: 'Developed', description: 'We ensure our unit test cases are designed for testability.', score: 5, value: 5, tooltip: '5', name: 'val3' },
    { id: 30301, stageDef: 'Unit tests.', practiceStage: 'Mature', description: 'We use Test Driven Design and Development for all layers of our application code (UI, DB, Business Logic).', score: 8, value: 8, tooltip: '8', name: 'val3' },
    { id: 30301, stageDef: 'Unit tests.', practiceStage: 'Optmized', description: 'Our unit tests have expansive code coverage and include UI, DB, Business Logic, and Integration tests.', score: 10, value: 10, tooltip: '10', name: 'val3' },
  ];
  table4 = [
    { id: 30401, page: 'Continuous Automated Testing', stageDef: 'Unit test coverage measurement', practiceStage: 'Basic', description: 'We have a unit test coverage tool but don’t use it for any measurements.', score: 1, value: 1, tooltip: '1', name: 'val4' },
    { id: 30401, stageDef: 'Unit test coverage measurement', practiceStage: 'Initial', description: '(Basic) + Our tool shows our unit test coverage is less than 25%.', score: 3, value: 3, tooltip: '3', name: 'val4' },
    { id: 30401, stageDef: 'Unit test coverage measurement', practiceStage: 'Developed', description: '(Basic) + Our tool shows our unit test coverage to be between 25% and 50%.', score: 5, value: 5, tooltip: '5', name: 'val4' },
    { id: 30401, stageDef: 'Unit test coverage measurement', practiceStage: 'Mature', description: '(Basic) + Our tool shows our unit test coverage to between 50% and 75%.', score: 8, value: 8, tooltip: '8', name: 'val4' },
    { id: 30401, stageDef: 'Unit test coverage measurement', practiceStage: 'Optmized', description: '(Basic) + Our tool shows our unit test coverage is greater than 75%.', score: 10, value: 10, tooltip: '10', name: 'val4' },
  ];

  table5 = [
    { id: 30501, page: 'Continuous Automated Testing', stageDef: 'Frequency of running unit tests', practiceStage: 'Basic', description: 'We don’t have any unit testing.', score: 1, value: 1, tooltip: '1', name: 'val5' },
    { id: 30501, stageDef: 'Frequency of running unit tests', practiceStage: 'Initial', description: 'Developers run their own tests in ad hoc fashion.', score: 3, value: 3, tooltip: '3', name: 'val5' },
    { id: 30501, stageDef: 'Frequency of running unit tests', practiceStage: 'Developed', description: 'Developers run the entire harness at commit.', score: 5, value: 5, tooltip: '5', name: 'val5' },
    { id: 30501, stageDef: 'Frequency of running unit tests', practiceStage: 'Mature', description: 'CI tool runs the harness for development environment and builds for the entire build.', score: 8, value: 8, tooltip: '8', name: 'val5' },
    { id: 30501, stageDef: 'Frequency of running unit tests', practiceStage: 'Optmized', description: 'CI tool runs the harness for every build on every environment.', score: 10, value: 10, tooltip: '10', name: 'val5' },
  ];
  table6 = [
    { id: 30601, page: 'Continuous Automated Testing', stageDef: 'Scenario/functional/story test coverage', practiceStage: 'Basic', description: 'We don’t run any  automated scenario/functional/story tests.', score: 1, value: 1, tooltip: '1', name: 'val6' },
    { id: 30601, stageDef: 'Scenario/functional/story test coverage', practiceStage: 'Initial', description: 'Scenario/functional/story test coverage <25%', score: 3, value: 3, tooltip: '3', name: 'val6' },
    { id: 30601, stageDef: 'Scenario/functional/story test coverage', practiceStage: 'Developed', description: 'Scenario/functional/story test coverage >25% to <50%', score: 5, value: 5, tooltip: '5', name: 'val6' },
    { id: 30601, stageDef: 'Scenario/functional/story test coverage', practiceStage: 'Mature', description: 'Scenario/functional/story test coverage >50% to <75%', score: 8, value: 8, tooltip: '8', name: 'val6' },
    { id: 30601, stageDef: 'Scenario/functional/story test coverage', practiceStage: 'Optmized', description: 'Scenario/functional/story test coverage >75%', score: 10, value: 10, tooltip: '10', name: 'val6' },
  ];
  table7 = [
    { id: 30701, page: 'Continuous Automated Testing', stageDef: 'Performance tests', practiceStage: 'Basic', description: 'We don’t execute any performance  tests.', score: 1, value: 1, tooltip: '1', name: 'val7' },
    { id: 30701, stageDef: 'Performance tests', practiceStage: 'Initial', description: 'Performance test selected functionality (smoke tests).', score: 3, value: 3, tooltip: '3', name: 'val7' },
    { id: 30701, stageDef: 'Performance tests', practiceStage: 'Developed', description: 'Performance test everything.', score: 5, value: 5, tooltip: '5', name: 'val7' },
    { id: 30701, stageDef: 'Performance tests', practiceStage: 'Mature', description: 'Performance test with SLAs (transaction SLA, page load SLA).', score: 8, value: 8, tooltip: '8', name: 'val7' },
    { id: 30701, stageDef: 'Performance tests', practiceStage: 'Optmized', description: 'Performance measurement and tests in production.', score: 10, value: 10, tooltip: '10', name: 'val7' },
  ];

  table8 = [
    { id: 30801, page: 'Continuous Automated Testing', stageDef: 'Performance test frequency', practiceStage: 'Basic', description: 'We don’t execute any performance  tests.', score: 1, value: 1, tooltip: '1', name: 'val8' },
    { id: 30801, stageDef: 'Performance test frequency', practiceStage: 'Initial', description: 'We run performance tests in an ad hoc manner.', score: 3, value: 3, tooltip: '3', name: 'val8' },
    { id: 30801, stageDef: 'Performance test frequency', practiceStage: 'Developed', description: 'We run performance tests every time we release.', score: 5, value: 5, tooltip: '5', name: 'val8' },
    { id: 30801, stageDef: 'Performance test frequency', practiceStage: 'Mature', description: 'We run performance tests as part of every sprint.', score: 8, value: 8, tooltip: '8', name: 'val8' },
    { id: 30801, stageDef: 'Performance test frequency', practiceStage: 'Optmized', description: 'We continuously run performance tests (e.g. with SRE frameworks).', score: 10, value: 10, tooltip: '10', name: 'val8' },
  ];

  table9 = [
    { id: 30901, page: 'Continuous Automated Testing', stageDef: 'Performance test types', practiceStage: 'Basic', description: 'We don’t execute any performance  tests.', score: 1, value: 1, tooltip: '1', name: 'val9' },
    { id: 30901, stageDef: 'Performance test types', practiceStage: 'Initial', description: 'We only run performance tests.', score: 3, value: 3, tooltip: '3', name: 'val9' },
    { id: 30901, stageDef: 'Performance test types', practiceStage: 'Developed', description: '(Initial) + We run load tests.', score: 5, value: 5, tooltip: '5', name: 'val9' },
    { id: 30901, stageDef: 'Performance test types', practiceStage: 'Mature', description: '(Developing) + We run extended soak tests where we let the application run under load for a period of time before releasing it to production.', score: 8, value: 8, tooltip: '8', name: 'val9' },
    { id: 30901, stageDef: 'Performance test types', practiceStage: 'Optmized', description: '(Mature) + We run exhaustive stress tests on the application to test its limits.', score: 10, value: 10, tooltip: '10', name: 'val9' },
  ];

  table10 = [
    { id: 301001, page: 'Continuous Automated Testing', stageDef: 'Security test types', practiceStage: 'Basic', description: 'We don’t execute any security tests.', score: 1, value: 1, tooltip: '1', name: 'val10' },
    { id: 301001, stageDef: 'Security test types', practiceStage: 'Initial', description: 'We do basic vulnerability scanning.', score: 3, value: 3, tooltip: '3', name: 'val10' },
    { id: 301001, stageDef: 'Security test types', practiceStage: 'Developed', description: '(Initial) + We run automated code reviews.', score: 5, value: 5, tooltip: '5', name: 'val10' },
    { id: 301001, stageDef: 'Security test types', practiceStage: 'Mature', description: '(Developing) + We run static code analysis on our code.', score: 8, value: 8, tooltip: '8', name: 'val10' },
    { id: 301001, stageDef: 'Security test types', practiceStage: 'Optmized', description: '(Mature) + We run penetration tests on all our applications and systems.', score: 10, value: 10, tooltip: '10', name: 'val10' },
  ];

  table11 = [
    { id: 301101, page: 'Continuous Automated Testing', stageDef: 'Frequency of vulnerability scanning ', practiceStage: 'Basic', description: 'We don’t execute any vulnerability scanning.', score: 1, value: 1, tooltip: '1', name: 'val11' },
    { id: 301101, stageDef: 'Frequency of vulnerability scanning ', practiceStage: 'Initial', description: 'We have external teams (either inside our organization or with a vendor) that perform a vulnerability analysis on our applications before releasing to production.', score: 3, value: 3, tooltip: '3', name: 'val11' },
    { id: 301101, stageDef: 'Frequency of vulnerability scanning ', practiceStage: 'Developed', description: 'We have development teams run vulnerability tests for every release.', score: 5, value: 5, tooltip: '5', name: 'val11' },
    { id: 301101, stageDef: 'Frequency of vulnerability scanning ', practiceStage: 'Mature', description: 'We have development teams run vulnerability tests as part of every sprint.', score: 8, value: 8, tooltip: '8', name: 'val11' },
    { id: 301101, stageDef: 'Frequency of vulnerability scanning ', practiceStage: 'Optmized', description: 'We have automated the execution of our vulnerability tests through our CI tool, which gets executed on every checked-in file.', score: 10, value: 10, tooltip: '10', name: 'val11' },
  ];

  table12 = [
    { id: 301201, page: 'Continuous Automated Testing', stageDef: 'Automated code quality review frequency ', practiceStage: 'Basic', description: 'We have no automated code quality scanning.', score: 1, value: 1, tooltip: '1', name: 'val12' },
    { id: 301201, stageDef: 'Automated code quality review frequency ', practiceStage: 'Initial', description: 'Code quality review might be done on an ad hoc basis if time permits.', score: 3, value: 3, tooltip: '3', name: 'val12' },
    { id: 301201, stageDef: 'Automated code quality review frequency ', practiceStage: 'Developed', description: 'We have code quality review, done by the development team, for every release.', score: 5, value: 5, tooltip: '5', name: 'val12' },
    { id: 301201, stageDef: 'Automated code quality review frequency ', practiceStage: 'Mature', description: 'We have code quality review, done by the development team, for every sprint.', score: 8, value: 8, tooltip: '8', name: 'val12' },
    { id: 301201, stageDef: 'Automated code quality review frequency ', practiceStage: 'Optmized', description: 'We have automated the execution of code quality review through our CI tool, which gets executed on every checked-in file.', score: 10, value: 10, tooltip: '10', name: 'val12' },
  ];

  table13 = [
    { id: 301301, page: 'Continuous Automated Testing', stageDef: 'Penetration testing frequency', practiceStage: 'Basic', description: 'We don’t have any penetration testing cycles.', score: 1, value: 1, tooltip: '1', name: 'val13' },
    { id: 301301, stageDef: 'Penetration testing frequency', practiceStage: 'Initial', description: 'Penetration testing is performed by another team (internal or external) only as part of a security audit and accreditation.', score: 3, value: 3, tooltip: '3', name: 'val13' },
    { id: 301301, stageDef: 'Penetration testing frequency', practiceStage: 'Developed', description: 'Penetration testing is performed by another team (internal or external) for every release.', score: 5, value: 5, tooltip: '5', name: 'val13' },
    { id: 301301, stageDef: 'Penetration testing frequency', practiceStage: 'Mature', description: 'Penetration testing is performed by another team (internal or external) for every sprint.', score: 8, value: 8, tooltip: '8', name: 'val13' },
    { id: 301301, stageDef: 'Penetration testing frequency', practiceStage: 'Optmized', description: 'Penetration testing is done by the CI tool for every checked-in file.', score: 10, value: 10, tooltip: '10', name: 'val13' },
  ];

  // selectedValues: number[] = new Array(this.tablesData[0].length).fill(0); // Assuming all tables have the same number of rows
  selectedValues: { id: number, practiceStage: string, item: string, identifier: string,description:string, value: number }[] = []; // Array to store selected values
  updateSelectedValues(selectedValue: { id: number, practiceStage: string, item: string, identifier: string,description:string, value: number }) {
    // Update the selected values array with the emitted value
    const index = this.selectedValues.findIndex(item => item.identifier === selectedValue.identifier);
    selectedValue.item = 'Continuous Automated Testing'

    if (index !== -1) {
      this.selectedValues[index] = selectedValue;
    } else {
      this.selectedValues.push(selectedValue);
    }
    console.log('selected', index);

  }

  saveAll() {
    this.dbService.imageCaptured = false;

    // You can implement the logic to save all selected values here
    console.log('All selected values in cat:', this.selectedValues);
    const { buName, projectName } = this.projectData;

    // Retrieve existing session data
    let sessionData = JSON.parse(sessionStorage.getItem(`${buName}|${projectName}|cat`)!) || {};
    console.log('session data cat',sessionData);
    
    if (sessionData.length > 0) {
      sessionData.newProperty = JSON.stringify(this.selectedValues);

      // Parse the new property string into an array
      let newPropertyArray = JSON.parse(sessionData.newProperty);

      // Remove items from existing session data if their IDs match any IDs in the new property array
      sessionData = sessionData?.filter((existingItem: any) => !newPropertyArray.some((newItem: any) => newItem.id === existingItem.id));

      // Merge the new property array with the existing session data array
      sessionData = [...sessionData, ...newPropertyArray];

      // Store the updated session data back into session storage
      sessionStorage.setItem(`${buName}|${projectName}|cat`, JSON.stringify(sessionData));
    }
    else{
      sessionStorage.setItem(`${buName}|${projectName}|cat`, JSON.stringify(this.selectedValues));

    }
    //sessionStorage.setItem(`${buName}|${projectName}|ci`, JSON.stringify(this.selectedValues))
    this.dbService.showSuccess('Data Updated')


  }


}
