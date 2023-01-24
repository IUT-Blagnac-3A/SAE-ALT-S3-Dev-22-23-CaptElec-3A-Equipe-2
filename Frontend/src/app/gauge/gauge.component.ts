import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Gauge } from './gauge.model';
Chart.register(...registerables);

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent implements AfterViewInit{
  @Input() gauge!: Gauge;

  ngAfterViewInit(): void {
    this.renderChart();
  }

  renderChart(): void {
    // custom chartJS plugin
    const centerText = {
      id: 'centerText',
      afterDatasetsDraw(chart: Chart, args: any, pluginOptions: any) {
        const { ctx } = chart;

        const text = "60";

        ctx.save()
        const x = chart.getDatasetMeta(0).data[0].x;
        const y = chart.getDatasetMeta(0).data[0].y;

        ctx.textAlign = 'center';
        ctx.font = "30pt Roboto";

        ctx.fillText(text, x, y + 10)
      }
    }

    Chart.register(centerText);

    const gaugeChart = new Chart(this.gauge.id, {
      type: 'doughnut',
      data: {
        labels: ['Mon', 'Tue'],
        datasets: [{
          label: 'Weekly Sales',
          data: [0.4, 1],
          backgroundColor: [
            this.gauge.color,
            '#e8e8e8'
          ],
          borderWidth: 0
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        circumference: 270,
        rotation: -135,
        cutout: 60,
      }
    });

  }

}
