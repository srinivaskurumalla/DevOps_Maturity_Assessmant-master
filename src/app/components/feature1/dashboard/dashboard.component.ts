import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from "node_modules/chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { DbService } from 'src/app/services/db.service';

Chart.register(...registerables, ChartDataLabels);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  items: string[] = [];
  shortCuts: string[] = [];
  values: number[] = [];
  totals: number[] = [];
  projectData: any;
  mergedArray: any[] = [];
  table1: any = [];
  table2: any = [];
  sumAchievedScore: number = 0;
  devOpsPracticeMaturity: string = '';

  constructor(private dbService: DbService) { }

  ngOnInit(): void {
    this.table1 = [
      { dpp: 'Configuration Management', achievedScore: 0, totalScore: 20 },
      { dpp: 'Continuous Integration', achievedScore: 0, totalScore: 50 },
      { dpp: 'Continuous Automated Testing', achievedScore: 0, totalScore: 130 },
      { dpp: 'Infrastructure as a code', achievedScore: 0, totalScore: 20 },
      { dpp: 'Continuous Delivery and Deployment', achievedScore: 0, totalScore: 50 },
      { dpp: 'Continuous Monitoring', achievedScore: 0, totalScore: 50 },
      { dpp: 'Continuous Security', achievedScore: 0, totalScore: 60 },
      { dpp: 'Total Score', achievedScore: 0, totalScore: 380 },
    ];
    this.table2 = [
      { ml: 'Basic', description: 'DevOps practices are limited to non-existent', score: '22-25' },
      { ml: 'Initial', description: 'There is an appreciation for DevOps practices but their implementation is limited', score: '56-110' },
      { ml: 'Developing', description: 'DevOps practices are being adopted and there is a clear understanding of how they should be applied', score: '111-164' },
      { ml: 'Mature', description: 'DevOps is a strong core of a quality driven and customer-centric delivery pipeline', score: '165-219' },
      { ml: 'Optimized', description: 'Strong and continually evolving culture of learning; An exemplar of DevOps practices', score: '220' }
    ];
    this.projectData = this.dbService.projectData;
    console.log('proj data from service', this.projectData);
    const { buName, projectName } = this.projectData;

    this.projectData = JSON.parse(sessionStorage.getItem('devOpsForm')!);
    const array1 = JSON.parse(sessionStorage.getItem(`${buName}|${projectName}|config`)!) || [];
    const array2 = JSON.parse(sessionStorage.getItem(`${buName}|${projectName}|ci`)!) || [];
    const array3 = JSON.parse(sessionStorage.getItem(`${buName}|${projectName}|cat`)!) || [];
    const array4 = JSON.parse(sessionStorage.getItem(`${buName}|${projectName}|iac`)!) || [];
    const array5 = JSON.parse(sessionStorage.getItem(`${buName}|${projectName}|cdd`)!) || [];
    const array6 = JSON.parse(sessionStorage.getItem(`${buName}|${projectName}|cm`)!) || [];
    const array7 = JSON.parse(sessionStorage.getItem(`${buName}|${projectName}|cs`)!) || [];

    // Merge the arrays into a single array
    this.mergedArray = [...array1, ...array2, ...array3, ...array4, ...array5, ...array6, ...array7];
    sessionStorage.setItem('mergedArray', JSON.stringify(this.mergedArray));
    console.log('merged array', this.mergedArray);

    const sumsMap: { [item: string]: number } = {};

    // Iterate over the data array and accumulate sums based on item
    this.mergedArray?.forEach((score: any) => {
      const item = score.item;
      const value = score.value;
      sumsMap[item] = (sumsMap[item] || 0) + value;
    });

    const aggregatedData = Object.entries(sumsMap).map(([item, value]) => {
      let totalValue;
      switch (item) {
        case 'Configuration Management':
          totalValue = 20;
          break;
        case 'Continuous Integration':
          totalValue = 50;
          break;
        case 'Continuous Automated Testing':
          totalValue = 130;
          break;
        case 'Infrastructure as a code':
          totalValue = 20;
          break;
        case 'Continuous Delivery and Deployment':
          totalValue = 50;
          break;
        case 'Continuous Monitoring':
          totalValue = 50;
          break;
        case 'Continuous Security':
          totalValue = 60;
          break;
        default:
          totalValue = value;
      }
      return {
        item,
        value,
        totalValue
      };
    });

    console.log('aggregate', aggregatedData);
    aggregatedData.forEach(data => {
      this.items.push(data.item);
      this.values.push(data.value);
      this.totals.push(data.totalValue);

      this.table1.forEach((tableRecord: any) => {
        aggregatedData.forEach(data => {
          if (data.item === tableRecord.dpp) {
            tableRecord.achievedScore = data.value;
          }
        });
      });
      this.sumAchievedScore = this.table1.reduce((accumulator: number, currentValue: any) => accumulator + currentValue.achievedScore, 0);
    });

    console.log('items', this.items);
    console.log('values', this.values);
    console.log('totals', this.totals);
    this.table1[7].achievedScore = this.sumAchievedScore;
    this.devOpsPracticeMaturity = this.assignLabel(this.sumAchievedScore);

    this.dbService.setTable1(this.table1);
    this.dbService.setTable2(this.table2);
    this.RenderChart('bar', 'barchart', this.values, this.totals);
  }

  findPercentage(achievedScore: number, totalScore: number) {
    return (achievedScore / totalScore) * 100
  }
  RenderChart(type: any, id: string, achievedScores: number[], totalScores: number[]) {
    // Calculate the achieved percentages
    let achievedPercentages = achievedScores.map((score, index) =>
      this.findPercentage(score, totalScores[index])
    );

    console.log('percentages',achievedPercentages);
    
    // Get the colors for each bar based on the achieved percentage
    let barColors = achievedPercentages.map(percentage =>
      this.getBarColor(percentage)
    );
    console.log('barColors',barColors);

    new Chart(id, {

      type: type,
      data: {
        labels: this.items,
        datasets: [
          {
            label: 'Total Score',
            data: totalScores,
            backgroundColor: '#4a8cc7',
            borderColor: '#1066b3',
            borderWidth: 1
          },
          {
            label: 'Achieved Score',
            data: achievedScores,
            backgroundColor: barColors,
            borderColor: 'white',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'top',
            formatter: (value: number) => value,
            font: {
              weight: 'bold'
            }
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeInOutQuad'
        }
      },
      plugins: [ChartDataLabels]
    });
  }

  getBarColor(achievedPercentage: number): string {
    if (achievedPercentage >= 50) {
      return 'green';
    } else if (achievedPercentage >= 25) {
      return 'yellow';
    } else {
      return 'orange';
    }
  }

  assignLabel(sum: number) {
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
