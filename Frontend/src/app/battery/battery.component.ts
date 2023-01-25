import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import DefaultDico from '../modules/default.dico';
import { RoomService } from '../room.service';
import { RoomBattery } from '../roomBattery';
Chart.register(...registerables);

@Component({
  selector: 'app-battery',
  templateUrl: './battery.component.html',
  styleUrls: ['./battery.component.scss']
})
export class BatteryComponent implements OnInit{
  ngOnInit(): void {
    this.getBatteryInformations();
  }

  constructor(private roomService: RoomService){}

  getBatteryInformations(): void {
    this.roomService.getRoomBattery("AM107-9").subscribe(
      (result: RoomBattery[]) => {
        let informationNumber = 0;
        for(let i=0 ; i<result.length ; i++){
          informationNumber = i;
        }

        this.renderChart(result[informationNumber].battery);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }

  renderChart(value: Number): void{
    // batteryChart
    let batteryColor = "";

    if(value>DefaultDico.CRITICAL_BATTERY()){
      batteryColor = "#60992D";
    }else{
      batteryColor = "#B3001B";
    }

    const batteryChart = new Chart("batteryChart", {
      type: 'bar',
      data: {
        labels: [""],
        datasets: [
          {
            label: 'Actual battery',
            data: [value],
            backgroundColor: batteryColor,
          },
          {
            label: 'Maximum battery',
            data: [DefaultDico.MAX_BATTERY()],
            backgroundColor: "#212529",
          }
        ]
      },
      options: {
        plugins: {
          //@ts-ignore
          centerText: false,
          //@ts-ignore
          centerTextCO2: false,
          //@ts-ignore
          centerTextHumidity: false,
          //@ts-ignore
          centerTextTemperature: false,
          tooltip: {
            mode: 'point',
          },
          legend: {
            display: false
          },
          title: {
            display: false,
            text: 'Below 15% a notification will be sent',
            position: "bottom"
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: false,
            stacked: true,
          },
          y: {
            stacked: true,
            min: 0,
            max: 100,
            grid: {
              display: false
            },
            ticks: {
              maxTicksLimit: 6
            }
          }
        },
      }
    });
  }

}