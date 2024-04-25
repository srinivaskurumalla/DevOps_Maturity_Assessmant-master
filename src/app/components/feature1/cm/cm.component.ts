import { Component, Input, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-cm',
  templateUrl: './cm.component.html',
  styleUrls: ['./cm.component.scss']
})
export class CMComponent implements OnInit {

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
    this.pageName = `${buName}|${projectName}|cm`
    const cmData = JSON.parse(sessionStorage.getItem(`${buName}|${projectName}|cm`)!)
    console.log('cm data', cmData);

  }

  table1 = [
    {id: 60101,page:'Continuous Monitoring', stageDef: 'Monitoring solutions', practiceStage: 'Basic', description: 'We don’t use a monitoring solution per se. All monitoring is done by the Ops teams.', score: 1, value: 1, tooltip: '1', name: 'val1' },
    {id: 60101, stageDef: 'Monitoring solutions', practiceStage: 'Initial', description: 'Operations team have basic monitoring tool that is used to keep an eye on basic OS-level events.', score: 3, value: 3, tooltip: '3', name: 'val1' },
    {id: 60101, stageDef: 'Monitoring solutions', practiceStage: 'Developed', description: 'We have a robust set of monitoring capabilities including log monitoring, application monitoring, and security monitoring.', score: 5, value: 5, tooltip: '5', name: 'val1' },
    {id: 60101, stageDef: 'Monitoring solutions', practiceStage: 'Mature', description: '(Developing) + We have a dedicated team of Site Reliability Engineers (or similar function) to use the data from monitoring solutions for analysis and hypothesis generation.', score: 8, value: 8, tooltip: '8', name: 'val1' },
    {id: 60101, stageDef: 'Monitoring solutions', practiceStage: 'Optmized', description: '(Mature) + We have tools that support generation of proactive analytical insights using techniques like MLOps and AIOps.', score: 10, value: 10, tooltip: '10', name: 'val1' },
  ];

  table2 = [
    {id: 60201,page:'Continuous Monitoring', stageDef: 'Monitoring application performance', practiceStage: 'Basic', description: 'We have no application performance monitoring plans.', score: 1, value: 1, tooltip: '1', name: 'val2' },
    {id: 60201, stageDef: 'Monitoring application performance', practiceStage: 'Initial', description: 'We run manual ad hoc checks on application performance but only at the level of the OS hosting the application.', score: 3, value: 3, tooltip: '3', name: 'val2' },
    {id: 60201, stageDef: 'Monitoring application performance', practiceStage: 'Developed', description: 'We have the capability (in terms of tools and knowing what to measure) to get real-time access to statistics on application performance in production.', score: 5, value: 5, tooltip: '5', name: 'val2' },
    {id: 60201, stageDef: 'Monitoring application performance', practiceStage: 'Mature', description: '(Developing) + We have the ability to isolate a problem down to the individual server, container, VM, or process causing it.', score: 8, value: 8, tooltip: '8', name: 'val2' },
    {id: 60201, stageDef: 'Monitoring application performance', practiceStage: 'Optmized', description: '(Mature) + We have the ability to track down a problem in the application all the way from the initial request made to the server down to the stored procedure level.', score: 10, value: 10, tooltip: '10', name: 'val2' },
  ];

  table3 = [
    {id: 60301,page:'Continuous Monitoring', stageDef: 'Security monitoring', practiceStage: 'Basic', description: 'We have no security monitoring in place.', score: 1, value: 1, tooltip: '1', name: 'val3' },
    {id: 60301, stageDef: 'Security monitoring', practiceStage: 'Initial', description: 'We have a manual and ad hoc process for monitoring security using basic OS and network tools.', score: 3, value: 3, tooltip: '3', name: 'val3' },
    {id: 60301, stageDef: 'Security monitoring', practiceStage: 'Developed', description: 'We have tools that can identify simple threats such as DoS attacks and phishing attacks.', score: 5, value: 5, tooltip: '5', name: 'val3' },
    {id: 60301, stageDef: 'Security monitoring', practiceStage: 'Mature', description: 'We have a suite of advanced network monitoring tools to actively identify vulnerabilities and active attacks.', score: 8, value: 8, tooltip: '8', name: 'val3' },
    {id: 60301, stageDef: 'Security monitoring', practiceStage: 'Optmized', description: 'We have a sophisticated real-time security monitoring solution where we check every payload that hits our systems, and based on statistical analysis, informs us of potential areas of vulnerability in our systems.', score: 10, value: 10, tooltip: '10', name: 'val3' },
  ];

  table4 = [
    {id: 60401,page:'Continuous Monitoring', stageDef: 'Log monitoring', practiceStage: 'Basic', description: 'We have no log monitoring in place.', score: 1, value: 1, tooltip: '1', name: 'val4' },
    {id: 60401, stageDef: 'Log monitoring', practiceStage: 'Initial', description: 'We have an ad hoc log monitoring process using basic OS tools.', score: 3, value: 3, tooltip: '3', name: 'val4' },
    {id: 60401, stageDef: 'Log monitoring', practiceStage: 'Developed', description: 'We use all the logs we collect (application server, database server, network traffic, web access) and make them accessible for analysis, though they might not all be used.', score: 5, value: 5, tooltip: '5', name: 'val4' },
    {id: 60401, stageDef: 'Log monitoring', practiceStage: 'Mature', description: '(Developing) + We make all our logs accessible to use by anyone through a central location.', score: 8, value: 8, tooltip: '8', name: 'val4' },
    {id: 60401, stageDef: 'Log monitoring', practiceStage: 'Optmized', description: '(Mature) + All our logs are saved in a central location and are indexed and tagged with metadata to make them easily accessible.', score: 10, value: 10, tooltip: '10', name: 'val4' },
  ];

  table5 = [
    {id: 60501,page:'Continuous Monitoring', stageDef: 'Alerting solution', practiceStage: 'Basic', description: 'We have no log alerting solutions in place.', score: 1, value: 1, tooltip: '1', name: 'val5' },
    {id: 60501, stageDef: 'Alerting solution', practiceStage: 'Initial', description: 'We have a system where only the team that can manage an alert are informed of the presence of problems in their module’s security or performance.', score: 3, value: 3, tooltip: '3', name: 'val5' },
    {id: 60501, stageDef: 'Alerting solution', practiceStage: 'Developed', description: 'We have a system where all teams that can/may be able to manage an alert are informed of the details of problems in a system module’s security or performance.', score: 5, value: 5, tooltip: '5', name: 'val5' },
    {id: 60501, stageDef: 'Alerting solution', practiceStage: 'Mature', description: 'We have alerting solutions that are able to provide a time-series of similarly categorized events, including event details and remediations applied.', score: 8, value: 8, tooltip: '8', name: 'val5' },
    {id: 60501, stageDef: 'Alerting solution', practiceStage: 'Optmized', description: '(Mature) + Alerting thresholds are easily modifiable, and we follow Site Reliability Engineering practices to ensure the proper SLO, SLI and Error Budgets are maintained.', score: 10, value: 10, tooltip: '10', name: 'val5' },
  ];

  selectedValues: { id: number,practiceStage : string, item: string, identifier: string, value: number }[] = []; // Array to store selected values
  updateSelectedValues(selectedValue: { id: number,practiceStage : string, item: string, identifier: string, value: number }) {
     // Update the selected values array with the emitted value
    const index = this.selectedValues.findIndex(item => item.identifier === selectedValue.identifier);
    selectedValue.item = 'Continuous Monitoring'

    if (index !== -1) {
      this.selectedValues[index] = selectedValue;
    } else {
      this.selectedValues.push(selectedValue);
    }
    console.log('selected', index);

  }
  saveAll() {
    // You can implement the logic to save all selected values here
    console.log('All selected values in cm:', this.selectedValues);
    const { buName, projectName } = this.projectData;

    // Retrieve existing session data
    let sessionData = JSON.parse(sessionStorage.getItem(`${buName}|${projectName}|cm`)!) || {};
    console.log('session data cm',sessionData);
    
    if (sessionData.length > 0) {
      sessionData.newProperty = JSON.stringify(this.selectedValues);

      // Parse the new property string into an array
      let newPropertyArray = JSON.parse(sessionData.newProperty);

      // Remove items from existing session data if their IDs match any IDs in the new property array
      sessionData = sessionData?.filter((existingItem: any) => !newPropertyArray.some((newItem: any) => newItem.id === existingItem.id));

      // Merge the new property array with the existing session data array
      sessionData = [...sessionData, ...newPropertyArray];

      // Store the updated session data back into session storage
      sessionStorage.setItem(`${buName}|${projectName}|cm`, JSON.stringify(sessionData));
    }
    else{
      sessionStorage.setItem(`${buName}|${projectName}|cm`, JSON.stringify(this.selectedValues));

    }
    //sessionStorage.setItem(`${buName}|${projectName}|cm`, JSON.stringify(this.selectedValues))
    this.dbService.showSuccess('Data Updated')


  }

}
