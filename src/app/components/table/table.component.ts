import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() data: any;
  @Input() page: any;
  @Input() identifier: string = ''; // Unique identifier for this instance of the component
  @Output() selectedValuesChange = new EventEmitter<{ id: number, practiceStage: string, item: string, identifier: string,description:string, value: number; }>(); // Event emitter to send selected value to parent

  selectedValue: number = 0;
  matchedData: any[] = []
  dataLoaded: boolean = false
  constructor(private dbService: DbService) { }

  ngOnInit(): void {
    this.selectedValue = 0; // Initialize selectedValue within ngOnInit
    const pageData = JSON.parse(sessionStorage.getItem(this.page)!)
    console.log('page data from table', pageData);

    pageData?.forEach((page: any) => {


      // Set selectedValue based on the stored value
      if (this.identifier === page.identifier) {
        this.selectedValue = page.value;
      }

    });
  }

  getSavedScores(identifier: string): any[] {
    // Assuming scores is the array containing the saved scores
    const savedScores = this.matchedData.find(score => score.some((s: any) => s.identifier === identifier));
    return savedScores || [];
  }



  onChange(item: any) {
    // Emit the selected value along with the identifier to the parent
    this.selectedValuesChange.emit({ id: item.id, practiceStage: item.practiceStage, item: '', identifier: this.identifier,description:item.description, value: this.selectedValue });
  }

}
