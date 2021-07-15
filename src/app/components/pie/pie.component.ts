import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {
  // Chart Config
  public chartType: string = 'pie';
  public chartDatasets!: Array<any>
  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];
  public chartOptions: any = {
    responsive: true
  };
  chartLabels!: string[];
  // Chart Data
  @Input() chartData!: number[];
  @Input() chartDataLabels!: string[];


  constructor() { }

  ngOnInit(): void {
    this.chartDatasets = [
      { data: this.chartData?.slice(0, 4), label: 'Dataset' }
    ];
    this.chartLabels = this.chartDataLabels?.slice(0, 4)
  }
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}
