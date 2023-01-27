import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Room } from '../room';
import { RoomService } from '../room.service';
import { ViewService } from '../view.service';
Chart.register(...registerables)

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements AfterViewInit {

  constructor(private roomService: RoomService, private viewServ: ViewService){}

  ngAfterViewInit(): void {
    this.getHistory();
  }

  public getHistory(): void{
    this.roomService.getRoom(this.viewServ.dashboardId).subscribe(
      (result: Room[]) => {
        let informationNumber = 0;
        for (let i = 0; i < result.length; i++) {
          informationNumber = i;
          
        }

      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public renderChart(): void {
    const DATA_COUNT = 7;

    const labels = ["a","b","c","d","e","f","g"];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Dataset 1',
          data: [1,2,3,4,5],
          borderColor: "#ff0000",
          yAxisID: 'y',
        },
        {
          label: 'Dataset 2',
          data: [5,3,2,4,1],
          borderColor: "00ff00",
          yAxisID: 'y1',
        }
      ]
    };
    const lineChar = new Chart('lineChart',{
      type: 'line',
      data: data,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        plugins: {
          //@ts-ignore
          centerTextHumidity: false,
          //@ts-ignore
          centerTextTemperature: false,
          //@ts-ignore
          centerTextCO2: false,
          //@ts-ignore
          centerText: false,
          title: {
            display: true,
            text: 'CO2 Data history'
          }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',

            // grid line settings
            grid: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          },
        }
      },
    });
  }

}
