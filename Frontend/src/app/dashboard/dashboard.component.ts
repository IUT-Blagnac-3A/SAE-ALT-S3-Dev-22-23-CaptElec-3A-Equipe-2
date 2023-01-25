import { Component, ViewChild, QueryList, ElementRef } from "@angular/core";

import SVGService from "../modules/SVG";

import File from "../modules/SVGFile";
import { ViewService } from "../view.service";
import { RoomService } from "../room.service";
import { Room } from "../room";
import { HttpErrorResponse } from "@angular/common/http";
import { Chart, registerables } from "chart.js";
import Project from "../modules/Project";

Chart.register(...registerables);

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
  @ViewChild("svg") svg: ElementRef | null = null;

  svgFiles: File[] = [];
  viewService!: ViewService;
  roomService!: RoomService;
  rooms!: Room[];
  roomName!: string;

  constructor(
    private svgService: SVGService,
    private viewServ: ViewService,
    private roomServ: RoomService
  ) {}

  async ngOnInit() {
    this.viewService = this.viewServ;
    this.roomService = this.roomServ;
    this.getRoomInformations();

    let values = await this.svgService.getSVGFromClientProject(
      "remiboulle",
      "0acf456wf",
      "IUT-BLAGNAC"
    );

    let newProject = new Project("IUT-BLAGNAC", values, this.svgService);
    newProject.displayOnPage();

    this.renderCharts();
  }

  getRoomInformations(): void {
    this.roomService.getRoom("AM107-33").subscribe(
      (result: Room[]) => {
        this.rooms = result;
        this.roomName = this.rooms[0].devicename;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  renderCharts(): void {
    // batteryChart
    const batteryChart = new Chart("batteryChart", {
      type: "bar",
      data: {
        labels: [""],
        datasets: [
          {
            label: "Actual battery",
            data: [15],
            backgroundColor: "#dc3545",
          },
          {
            label: "Maximum battery",
            data: [100],
            backgroundColor: "#212529",
          },
        ],
      },
      options: {
        plugins: {
          //@ts-ignore
          centerText: false,
          tooltip: {
            mode: "point",
          },
          legend: {
            display: false,
          },
          title: {
            display: false,
            text: "Below 15% a notification will be sent",
            position: "bottom",
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
              display: false,
            },
            ticks: {
              maxTicksLimit: 6,
            },
          },
        },
      },
    });

    // custom chartJS plugin
    const centerText = {
      id: "centerText",
      afterDatasetsDraw(chart: Chart, args: any, pluginOptions: any) {
        const { ctx } = chart;

        const text = "60";

        ctx.save();
        const x = chart.getDatasetMeta(0).data[0].x;
        const y = chart.getDatasetMeta(0).data[0].y;

        ctx.textAlign = "center";
        ctx.font = "30pt Roboto";

        ctx.fillText(text, x, y + 10);
      },
    };

    // co2 chart
    const co2Chart = new Chart("co2Chart", {
      type: "doughnut",
      data: {
        labels: ["Mon", "Tue"],
        datasets: [
          {
            label: "Weekly Sales",
            data: [0.4, 1],
            backgroundColor: ["#3a86ff", "#e8e8e8"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        circumference: 270,
        rotation: -135,
        cutout: 60,
      },
    });

    // humidity chart
    const humidityChart = new Chart("humidityChart", {
      type: "doughnut",
      data: {
        labels: ["Mon", "Tue"],
        datasets: [
          {
            label: "Weekly Sales",
            data: [1.4, 1],
            backgroundColor: ["#8338ec", "#e8e8e8"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        circumference: 270,
        rotation: -135,
        cutout: 60,
      },
    });

    // temperature chart
    const temperatureChart = new Chart("temperatureChart", {
      type: "doughnut",
      data: {
        labels: ["Mon", "Tue"],
        datasets: [
          {
            label: "Weekly Sales",
            data: [4, 1],
            backgroundColor: ["#e63946", "#e8e8e8"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        circumference: 270,
        rotation: -135,
        cutout: 60,
      },
    });

    Chart.register(centerText);
  }
}
