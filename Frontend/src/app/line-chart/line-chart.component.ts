import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Room } from '../room';
import { RoomService } from '../room.service';
import { ViewService } from '../view.service';
import DateService from '../modules/date.worker';
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
        let historyObjects = []

        for (let i = 0; i < result.length; i++) {
          informationNumber = i;
          historyObjects.push({
            date: new Date(result[i].ts),
            co2: result[i].co2,
            temperature: result[i].temperature
          })
        }

        historyObjects.sort((object1, object2) => object1.date.getTime() - object2.date.getTime());
        let lastObjects = historyObjects.slice(Math.max(historyObjects.length - 10, 0))
        this.renderChart(lastObjects);

      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public renderChart(histories: any): void {
    const labels = [];
    const dataset1 = [];
    const dataset2 = [];

    let minY0 = histories[0].co2;
    let minY1 = histories[0].temperature;

    let maxY0 = histories[0].co2;
    let maxY1 = histories[0].temperature;

    for(let history of histories){
      labels.push(history.date.getHours()+":"+history.date.getMinutes());
      dataset1.push(history.co2);
      dataset2.push(history.temperature);

      if(history.co2 < minY0){
        minY0 = history.co2
      } 

      if(history.temperature < minY1){
        minY1 = history.temperature
      } 

      if(history.co2 > maxY0){
        maxY0 = history.co2
      } 

      if(history.temperature > maxY1){
        maxY1 = history.temperature
      } 
    }

    const data = {
      labels: labels,
      datasets: [
        {
          label: 'CO2',
          data: dataset1,
          borderColor: "#102E4A",
          yAxisID: 'y',
        },
        {
          label: 'Temperature',
          data: dataset2,
          borderColor: "#EB5160",
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
            text: 'Last 1h30 Data history'
          }
        },
        scales: {
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            min: minY0-200,
            max: maxY0+200
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            min: minY1-1,
            max: maxY1+1,

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
