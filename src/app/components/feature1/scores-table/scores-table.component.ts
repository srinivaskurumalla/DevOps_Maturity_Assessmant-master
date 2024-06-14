import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scores-table',
  templateUrl: './scores-table.component.html',
  styleUrls: ['./scores-table.component.scss']
})
export class ScoresTableComponent implements OnInit {
  @Input() table1!: any[];
  @Input() table2!: any[];
  @Input() devOpsPracticeMaturity!: string;
  constructor() { }

  ngOnInit(): void {
  }

}
