import { Component, Input, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-cs',
  templateUrl: './cs.component.html',
  styleUrls: ['./cs.component.scss']
})
export class CSComponent implements OnInit {

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
    this.pageName = `${buName}|${projectName}|cs`
    const csData = JSON.parse(sessionStorage.getItem(`${buName}|${projectName}|cs`)!)
    console.log('cs data', csData);

  }

  table1 = [
    { id: 70101, page: 'Continuous Security', stageDef: 'Requirements', practiceStage: 'Basic', description: 'No security requirements are explicstly addressed in user stories or SOPs. No formal risk assessment and compliance checks are performed during the requirement process to collaborate with the dedicated security teams. We don’t have any documentation for security considerations.', score: 1, value: 1, tooltip: '1', name: 'val1' },
    { id: 70101, stageDef: 'Requirements', practiceStage: 'Initial', description: 'Some high-level basic security requirements are defined in the user stories/SOP documents for threat modeling. We perform basic risk assessment and few of the team members are awared of the compliance and some are not aware on the security awareness. We collaborate with security teams very often.', score: 3, value: 3, tooltip: '3', name: 'val1' },
    { id: 70101, stageDef: 'Requirements', practiceStage: 'Developed', description: 'We have well defined security requirements specsfied for each feature using Jira and Confluence and perform systematic threat modeling for key features and components using Microsoft Threat Modeling Tool, Lucsdchart and well defined compliance requirements with regulor collaborations with dedicated security team. Tools we use Jira, Confluence, Lucsdchart, Agile project management.', score: 5, value: 5, tooltip: '5', name: 'val1' },
    { id: 70101, stageDef: 'Requirements', practiceStage: 'Mature', description: 'Security is ingrained in the orgainizational culture and continuous learning and improvement in progress. We perform threat, secuirty and risk assessment models during requirement phase. Continuos monitorinig and scanning for dependencses and vulnerabilities and continuous monitoring of container security and runtime protection and validation and improvement of Security practices using Jira, Confluence, Gitlab for requirements and threat dragon and lucsdchart for Threat modeling and Microsoftr excel for risk assessmnet and slack and teams using for collaboration with security teams', score: 8, value: 8, tooltip: '8', name: 'val1' },
    { id: 70101, stageDef: 'Requirements', practiceStage: 'Optmized', description: 'Proactive improvement of security requirement process with continuous improvement on the documentation using Jira, Confluence and agile project management tools and continuous evolution of threat modeling practices in place using microsoft Threat modeling tools, Lucsdchart  and continous improvement in Risk assessment and priritization using Microsoftr excel, Risk Watch and RiskLens and ensure we have 100 percent adherence to the compliance using Chef Compliance, InSpec and AWS cs and we have synergistic collaboration with security teams with proactive feedbacks for improvement using Slack, Microsoft Teams and Zoom.', score: 10, value: 10, tooltip: '10', name: 'val1' },
  ];

  table2 = [
    { id: 70201, page: 'Continuous Security', stageDef: 'Design', practiceStage: 'Basic', description: 'There is no threat modeling strategy (or) no security planning is done and security measures are not conisdered/included in the Design of the application.', score: 1, value: 1, tooltip: '1', name: 'val2' },
    { id: 70201, stageDef: 'Design', practiceStage: 'Initial', description: 'There is no threat modeling strategy (or) no security planning is done. But, some standard security plans/measures are conisdered/included in the Design of the application.', score: 3, value: 3, tooltip: '3', name: 'val2' },
    { id: 70201, stageDef: 'Design', practiceStage: 'Developed', description: 'High level threat modeling is done and security measures/plans are considered/included in the Design for the identified threats/risks/vulnerabilities.', score: 5, value: 5, tooltip: '5', name: 'val2' },
    { id: 70201, stageDef: 'Design', practiceStage: 'Mature', description: 'Complete threat modeling is done and security measures/plans to mitigate the identified threats and risks are included in the Design of application.', score: 8, value: 8, tooltip: '8', name: 'val2' },
    { id: 70201, stageDef: 'Design', practiceStage: 'Optmized', description: 'Threat modeling is done using tools like Microsoft Threat Modeling Tool, OWASP, IriusRisk etc and secuirty measures/plans are included in the Design for all the threats/Vulnerabilities or risks identified.', score: 10, value: 10, tooltip: '10', name: 'val2' },
  ];

  table3 = [
    { id: 70301, page: 'Continuous Security', stageDef: 'Development', practiceStage: 'Basic', description: 'Either no security checks or minimal secutiry practices are followed during the development.Key stakeholders are familiar with the basic security requirement but no practices are implemented.', score: 1, value: 1, tooltip: '1', name: 'val3' },
    { id: 70301, stageDef: 'Development', practiceStage: 'Initial', description: 'Basic security measures are incorporated as part of the development.Development considers the security requirements and incorporate the requirements in the process.', score: 3, value: 3, tooltip: '3', name: 'val3' },
    { id: 70301, stageDef: 'Development', practiceStage: 'Developed', description: 'Security is consudered as an integral part of the development and delivery.Peer-review and and vulnerability scanning are performed during development.Developers work closely with security team and operations team. Security concerns are effectively handled in a reactive manner.Automation is partially implemented.', score: 5, value: 5, tooltip: '5', name: 'val3' },
    { id: 70301, stageDef: 'Development', practiceStage: 'Mature', description: 'Development plans for the long term security of the applications. Highest level of risk assessment, vulnerability assessment and remediations are planned well in advance. Automation is implemented to the fullest capacsty.Static application security testing (SAST) tools such as GitHub, GitLab, and Coverity are used efficsently.Software composition analysis (SCA) platforms like Snyk, Mend, and BlackDuck, SonarQube, SourceClear are used.', score: 8, value: 8, tooltip: '8', name: 'val3' },
    { id: 70301, stageDef: 'Development', practiceStage: 'Optmized', description: 'Development is planned for way ahead in future, considering all the infra, security and operational requirements.Code review, auditing, risk management, security testing happens quite frequently, and development cycle considers these as an integral part.The development practices adhere to the best of the enterprise level standrads.Highest level of automation is incorporated in the release management.Tools like GitLab, SonarSource, Trivy, OWASP ZAP are used with highest level of automation.', score: 10, value: 10, tooltip: '10', name: 'val3' },
  ];

  table4 = [
    {id: 70401,page:'Continuous Security', stageDef: 'Build & Deploy', practiceStage: 'Basic', description: 'There is no or minimal security practices in place during build and deploy phase.', score: 1, value: 1, tooltip: '1', name: 'val4' },
    {id: 70401, stageDef: 'Build & Deploy', practiceStage: 'Initial', description: 'Basic security measures are embedded during build and deployment phase. Automation is at a very minimal level.', score: 3, value: 3, tooltip: '3', name: 'val4' },
    {id: 70401, stageDef: 'Build & Deploy', practiceStage: 'Developed', description: 'Dynamic application security testing (DAST) tools and runtime verification tools like Osquery, Falco, and Tripwire, WhiteSource are used.csuration management tools like Ansible, Chef, Puppet, Terraform are used. Automation is enabled and used where ever is possible.', score: 5, value: 5, tooltip: '5', name: 'val4' },
    {id: 70401, stageDef: 'Build & Deploy', practiceStage: 'Mature', description: 'Highest level of automation is incorporated in the build and deploy phase using: Container image scanning tools like Aqua Security, Twistlock, Anchore. Infrastructure as Code tools like Checkmarx CloudGuard, Snyk Infrastructure as Code Scanning, CloudSploit. cs/CD tools like Jenkins, Travis cs, csrclecs, GitLab cs/CD.', score: 8, value: 8, tooltip: '8', name: 'val4' },
    {id: 70401, stageDef: 'Build & Deploy', practiceStage: 'Optmized', description: 'Proactive and efficsent security practices are followed rigorously with continuous monitoring and highest level of efficsency. All the tools used for monitoring SCA, SAST, IaC, csuration management are automated.', score: 10, value: 10, tooltip: '10', name: 'val4' },
  ];

  table5 = [
    {id: 70501,page:'Continuous Security', stageDef: 'Staging', practiceStage: 'Basic', description: 'No tools or technologies available to monitor the security in Production.', score: 1, value: 1, tooltip: '1', name: 'val5' },
    {id: 70501, stageDef: 'Staging', practiceStage: 'Initial', description: 'Some basic tools are available for monitoring the security in production, but, they are not integrated across.', score: 3, value: 3, tooltip: '3', name: 'val5' },
    {id: 70501, stageDef: 'Staging', practiceStage: 'Developed', description: 'Tools are available like OpenVas that checks visible ports, services and it has been integarted. Notifications are received from tools detecting the threats/vulnerabilities.', score: 5, value: 5, tooltip: '5', name: 'val5' },
    {id: 70501, stageDef: 'Staging', practiceStage: 'Mature', description: 'Tools are available. We are using Verica - Production Chanos which is used to make systems more secure and less vulnerable to costly incidents. Notifications are received. But there are no Dashboards and reports for continuous improvements based on the feedback.', score: 8, value: 8, tooltip: '8', name: 'val5' },
    {id: 70501, stageDef: 'Staging', practiceStage: 'Optmized', description: 'All Tools are available. We have customized notifications, cutsomized policies, Custom isolation policies and we have Hackerone-PT to receive, manage and track the incoming vulnerability disclores with the industrys most trusted and reputable ethical hackers.', score: 10, value: 10, tooltip: '10', name: 'val5' },
  ];
 table6 = [
  {id: 70601,page:'Continuous Security', stageDef: 'Production', practiceStage: 'Basic', description: 'No tools or technologies available to monitor the security in Production.', score: 1, value: 1, tooltip: '1', name: 'val6' },
  {id: 70601, stageDef: 'Production', practiceStage: 'Initial', description: 'Some basic tools are available for monitoring the security in production, but, they are not integrated across.', score: 3, value: 3, tooltip: '3', name: 'val6' },
  {id: 70601, stageDef: 'Production', practiceStage: 'Developed', description: 'Tools are available like OpenVas that checks visible ports, services and it has been integarted. Notifications are received from tools detecting the threats/vulnerabilities.', score: 5, value: 5, tooltip: '5', name: 'val6' },
  {id: 70601, stageDef: 'Production', practiceStage: 'Mature', description: 'Tools are available. We are using Verica - Production Chanos which is used to make systems more secure and less vulnerable to costly incsdents. Notifications are received. But there are no Dashboards and reports for continuous improvements based on the feedback.', score: 8, value: 8, tooltip: '8', name: 'val6' },
  {id: 70601, stageDef: 'Production', practiceStage: 'Optmized', description: 'All Tools are available. We have customized notifications, cutsomized policses, Custom isolation policses and we have Hackerone-PT to receive, manage and track the incoming vulnerability disclores with the industry’s most trusted and reputable ethical hackers.', score: 10, value: 10, tooltip: '10', name: 'val6' },
];
selectedValues: { id: number, practiceStage: string, item: string, identifier: string,description:string, value: number }[] = []; // Array to store selected values
updateSelectedValues(selectedValue: { id: number, practiceStage: string, item: string, identifier: string,description:string, value: number }) {
// Update the selected values array with the emitted value
  const index = this.selectedValues.findIndex(item => item.identifier === selectedValue.identifier);
  selectedValue.item = 'Continuous Security'

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
  console.log('All selected values in cs:', this.selectedValues);
  const { buName, projectName } = this.projectData;

  // Retrieve existing session data
  let sessionData = JSON.parse(sessionStorage.getItem(`${buName}|${projectName}|cs`)!) || {};
  console.log('session data cs',sessionData);
  
  if (sessionData.length > 0) {
    sessionData.newProperty = JSON.stringify(this.selectedValues);

    // Parse the new property string into an array
    let newPropertyArray = JSON.parse(sessionData.newProperty);

    // Remove items from existing session data if their IDs match any IDs in the new property array
    sessionData = sessionData?.filter((existingItem: any) => !newPropertyArray.some((newItem: any) => newItem.id === existingItem.id));

    // Merge the new property array with the existing session data array
    sessionData = [...sessionData, ...newPropertyArray];

    // Store the updated session data back into session storage
    sessionStorage.setItem(`${buName}|${projectName}|cs`, JSON.stringify(sessionData));
  }
  else{
    sessionStorage.setItem(`${buName}|${projectName}|cs`, JSON.stringify(this.selectedValues));

  }
  //sessionStorage.setItem(`${buName}|${projectName}|cs`, JSON.stringify(this.selectedValues))
  this.dbService.showSuccess('Data Updated')


}
}
