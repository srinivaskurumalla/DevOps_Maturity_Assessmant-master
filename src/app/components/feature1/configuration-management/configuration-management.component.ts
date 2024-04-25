import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DbService } from 'src/app/services/db.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-configuration-management',
  templateUrl: './configuration-management.component.html',
  styleUrls: ['./configuration-management.component.scss']
})
export class ConfigurationManagementComponent implements OnInit {
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
    this.pageName = `${buName}|${projectName}|config`
    const configData = JSON.parse(sessionStorage.getItem(`${buName}|${projectName}|config`)!)
    console.log('config data', configData);

  }
  @ViewChild('pdfDownload') pdfDownload: ElementRef | undefined;


  // show(): void {
  //   this.showToast = true;
  //   setTimeout(() => this.hideToast(), 3000); // Hide toast after 3 seconds
  // }

  // hideToast(): void {
  //   this.showToast = false;
  // }






  table1 = [
    { id: 10101, page: 'Configuration Management', stageDef: 'Source code management', practiceStage: 'Basic', description: 'Source code management is not done.', score: 1, value: 1, tooltip: '1', name: 'val1' },
    { id: 10101, stageDef: 'Source code management', practiceStage: 'Initial', description: 'We use source code management for application code.', score: 3, value: 3, tooltip: '3', name: 'val1' },
    { id: 10101, stageDef: 'Source code management', practiceStage: 'Developed', description: '(Initial) + We save configuration files, database scripts, and infrastructure code.', score: 5, value: 5, tooltip: '5', name: 'val1' },
    { id: 10101, stageDef: 'Source code management', practiceStage: 'Mature', description: '(Developing) + We save test projects.', score: 8, value: 8, tooltip: '8', name: 'val1' },
    { id: 10101, stageDef: 'Source code management', practiceStage: 'Optmized', description: '(Mature) + We save our builds, containers and VMs.', score: 10, value: 10, tooltip: '10', name: 'val1' },
  ];



  table2 = [
    { id: 10201, page: 'Configuration Management', stageDef: 'Source code branching strategy', practiceStage: 'Basic', description: 'We currently have no source code branching strategy.', score: 1, value: 1, tooltip: '1', name: 'val2' },
    { id: 10201, stageDef: 'Source code branching strategy', practiceStage: 'Initial', description: 'We have multiple copies of source code.', score: 3, value: 3, tooltip: '3', name: 'val2' },
    { id: 10201, stageDef: 'Source code branching strategy', practiceStage: 'Developed', description: 'We use a centralized, single point of entry for any changes we make to our code.', score: 5, value: 5, tooltip: '5', name: 'val2' },
    { id: 10201, stageDef: 'Source code branching strategy', practiceStage: 'Mature', description: 'We use a feature-branch workflow where each branch is dedicated to a feature.', score: 8, value: 8, tooltip: '8', name: 'val2' },
    { id: 10201, stageDef: 'Source code branching strategyt', practiceStage: 'Optmized', description: 'We use a robust branching structure where branches are created for features, hot-fixes and releases, leading to a trunk for final code.', score: 10, value: 10, tooltip: '10', name: 'val2' },
  ];


  selectedValues: { id: number, practiceStage: string, item: string, identifier: string, value: number }[] = []; // Array to store selected values
  updateSelectedValues(selectedValue: { id: number, practiceStage: string, item: string, identifier: string, value: number }) {
    // Update the selected values array with the emitted value
    const index = this.selectedValues.findIndex(item => item.identifier === selectedValue.identifier);
    selectedValue.item = 'Configuration Management'
    if (index !== -1) {
      this.selectedValues[index] = selectedValue;
    } else {
      this.selectedValues.push(selectedValue);
    }
    console.log('selected', this.selectedValues);

  }
  saveAll() {
    // You can implement the logic to save all selected values here
    console.log('All selected values in config:', this.selectedValues);
    const { buName, projectName } = this.projectData;

    // Retrieve existing session data
    let sessionData = JSON.parse(sessionStorage.getItem(`${buName}|${projectName}|config`)!) || {};
    console.log('session data config',sessionData);
    
    if (sessionData.length > 0) {
      sessionData.newProperty = JSON.stringify(this.selectedValues);

      // Parse the new property string into an array
      let newPropertyArray = JSON.parse(sessionData.newProperty);

      // Remove items from existing session data if their IDs match any IDs in the new property array
      sessionData = sessionData?.filter((existingItem: any) => !newPropertyArray.some((newItem: any) => newItem.id === existingItem.id));

      // Merge the new property array with the existing session data array
      sessionData = [...sessionData, ...newPropertyArray];

      // Store the updated session data back into session storage
      sessionStorage.setItem(`${buName}|${projectName}|config`, JSON.stringify(sessionData));
    }
    else{
      sessionStorage.setItem(`${buName}|${projectName}|config`, JSON.stringify(this.selectedValues));

    }
    //sessionStorage.setItem(`${buName}|${projectName}|config`, JSON.stringify(this.selectedValues))
    this.dbService.showSuccess('Data Updated')


  }


}
