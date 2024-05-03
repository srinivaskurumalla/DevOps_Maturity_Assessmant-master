import { Component, Input, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-iac',
  templateUrl: './iac.component.html',
  styleUrls: ['./iac.component.scss']
})
export class IACComponent implements OnInit {

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
    this.pageName = `${buName}|${projectName}|iac`
    const iacData = JSON.parse(sessionStorage.getItem(`${buName}|${projectName}|iac`)!)
    console.log('iac data', iacData);

  }

  table1 = [
    { id: 40101, page: 'Infrastructure as a code', stageDef: 'Automated provisioning', practiceStage: 'Basic', description: 'We have no automated provisioning process.', score: 1, value: 1, tooltip: '1', name: 'val1' },
    { id: 40101, stageDef: 'Automated provisioning', practiceStage: 'Initial', description: 'We have manual allocation of data center assets and VMs to each application that needs it.', score: 3, value: 3, tooltip: '3', name: 'val1' },
    { id: 40101, stageDef: 'Automated provisioning', practiceStage: 'Developed', description: 'We use IaaS and create on-demand infrastructure when application teams manually send us a request.', score: 5, value: 5, tooltip: '5', name: 'val1' },
    { id: 40101, stageDef: 'Automated provisioning', practiceStage: 'Mature', description: 'We have automated provisioning of infrastructure via APIs but these requests are not event-driven (e.g. application is faiacng a scalability crunch and needs more VMs due to mitigate the risk).', score: 8, value: 8, tooltip: '8', name: 'val1' },
    { id: 40101, stageDef: 'Automated provisioning', practiceStage: 'Optmized', description: 'Infrastructure is provisioned/deprovisioned automatically and dynamically based on increased/decreased usage of applications.', score: 10, value: 10, tooltip: '10', name: 'val1' },
  ];

  table2 = [
    { id: 40201, page: 'Infrastructure as a code', stageDef: 'Use of containers', practiceStage: 'Basic', description: 'We currently don’t use containers.', score: 1, value: 1, tooltip: '1', name: 'val2' },
    { id: 40201, stageDef: 'Use of containers', practiceStage: 'Initial', description: 'We have containerized our existing monolithic applications for purposes of deployment.', score: 3, value: 3, tooltip: '3', name: 'val2' },
    { id: 40201, stageDef: 'Use of containers', practiceStage: 'Developed', description: 'We have containerized individual modules and support independent provisioning of these modules.', score: 5, value: 5, tooltip: '5', name: 'val2' },
    { id: 40201, stageDef: 'Use of containers', practiceStage: 'Mature', description: 'We have a microservices architecture that is containerized and has the capability to auto-scale on existing ready-to-use infrastructure.', score: 8, value: 8, tooltip: '8', name: 'val2' },
    { id: 40201, stageDef: 'Use of containers', practiceStage: 'Optmized', description: 'We have a microservices architecture, which is containerized, with each container having integrated auto-scale capability on dynamically provisioned infrastructure.', score: 10, value: 10, tooltip: '10', name: 'val2' },
  ];

  selectedValues: { id: number, practiceStage: string, item: string, identifier: string,description:string, value: number }[] = []; // Array to store selected values
  updateSelectedValues(selectedValue: { id: number, practiceStage: string, item: string, identifier: string,description:string, value: number }) {
     // Update the selected values array with the emitted value
    const index = this.selectedValues.findIndex(item => item.identifier === selectedValue.identifier);
    selectedValue.item = 'Infrastructure as a code'
    if (index !== -1) {
      this.selectedValues[index] = selectedValue;
    } else {
      this.selectedValues.push(selectedValue);
    }
    console.log('selected', index);

  }
  saveAll() {
    // You can implement the logic to save all selected values here
    console.log('All selected values in iac:', this.selectedValues);
    const { buName, projectName } = this.projectData;

    // Retrieve existing session data
    let sessionData = JSON.parse(sessionStorage.getItem(`${buName}|${projectName}|iac`)!) || {};
    console.log('session data iac',sessionData);
    
    if (sessionData.length > 0) {
      sessionData.newProperty = JSON.stringify(this.selectedValues);

      // Parse the new property string into an array
      let newPropertyArray = JSON.parse(sessionData.newProperty);

      // Remove items from existing session data if their IDs match any IDs in the new property array
      sessionData = sessionData?.filter((existingItem: any) => !newPropertyArray.some((newItem: any) => newItem.id === existingItem.id));

      // Merge the new property array with the existing session data array
      sessionData = [...sessionData, ...newPropertyArray];

      // Store the updated session data back into session storage
      sessionStorage.setItem(`${buName}|${projectName}|iac`, JSON.stringify(sessionData));
    }
    else{
      sessionStorage.setItem(`${buName}|${projectName}|iac`, JSON.stringify(this.selectedValues));

    }
    //sessionStorage.setItem(`${buName}|${projectName}|iac`, JSON.stringify(this.selectedValues))
    this.dbService.showSuccess('Data Updated')


  }

}
