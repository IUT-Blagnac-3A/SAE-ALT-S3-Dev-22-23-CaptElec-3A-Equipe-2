import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-battery',
  templateUrl: './battery.component.html',
  styleUrls: ['./battery.component.scss']
})
export class BatteryComponent implements OnInit{
  ngOnInit(): void {
    this.renderChart();
  }

  renderChart(): void{
    // batteryChart
    const batteryChart = new Chart("batteryChart", {
      type: 'bar',
      data: {
        labels: [""],
        datasets: [
          {
            label: 'Actual battery',
            data: [15],
            backgroundColor: "#dc3545",
          },
          {
            label: 'Maximum battery',
            data: [100],
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