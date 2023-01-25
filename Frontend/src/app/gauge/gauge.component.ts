import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Gauge } from './gauge.model';
import DefaultDico from '../modules/default.dico';
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
    let value = this.gauge.value;
    let unit = this.gauge.unit;

    //bypass chartJS plugin bug
    let pluginId = "centerText";
    let chartConf = {};

    if(this.gauge.id==="co2Chart"){
      pluginId = "centerTextCO2";
      chartConf = {
        centerTextTemperature: false,
        centerTextHumidity: false,
        legend: {display: false},
        tooltip: {
          enabled: false,
        }
      };
    }else if(this.gauge.id==="temperatureChart"){
      chartConf = {
        centerTextCO2: false,
        centerTextHumidity: false,
        legend: {display: false},
        tooltip: {
          enabled: false,
        }
      };
      pluginId = "centerTextTemperature";
    }else if(this.gauge.id==="humidityChart"){
      chartConf = {
        centerTextTemperature: false,
        centerTextCO2: false,
        legend: {display: false},
        tooltip: {
          enabled: false,
        }
      };
      pluginId = "centerTextHumidity";
    }

    // custom chartJS plugin
    const centerText = {
      id: pluginId,
      afterDatasetsDraw(chart: Chart, args: any, pluginOptions: any) {
        const { ctx } = chart;

        let text = ""+value;
        let unitText = unit;

        ctx.save()
        const x = chart.getDatasetMeta(0).data[0].x;
        const y = chart.getDatasetMeta(0).data[0].y;

        ctx.textAlign = 'center';
        ctx.font = "23pt Roboto";

        if(unit.length>2){
          ctx.fillText(text, x, y)
          ctx.font = "14pt Roboto";
          ctx.fillText(unitText, x, y+20)
        }else{
          text+=unit;
          ctx.fillText(text, x, y+10)
        }
        
        
      }
    }

    const gaugeChart = new Chart(this.gauge.id, {
      type: 'doughnut',
      data: {
        labels: ['Actual value', 'Tue'],
        datasets: [{
          label: '',
          data: [this.gauge.value, this.gauge.maxValue],
          backgroundColor: [
            this.gauge.color,
            '#e8e8e8'
          ],
          hoverBackgroundColor: [
            this.gauge.color,
            '#e8e8e8'
          ],
          borderWidth: 0
        }]
      },
      options: {
        plugins: chartConf,
        circumference: 270,
        rotation: -135,
        cutout: 60,
      }
    });

    Chart.register(centerText);
  }

}
