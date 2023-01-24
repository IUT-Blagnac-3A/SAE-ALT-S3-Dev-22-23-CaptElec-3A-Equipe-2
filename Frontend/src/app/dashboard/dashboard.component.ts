import { Component, ViewChild, QueryList, ElementRef } from "@angular/core";

import SVGService from "../modules/SVG";

import File from "../modules/File";
import { ViewService } from "../view.service";
import { RoomService } from "../room.service";
import { Room } from "../room";
import { HttpErrorResponse } from "@angular/common/http";
import { Chart, registerables } from "chart.js";

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

  constructor(private svgService: SVGService, private viewServ: ViewService, private roomServ: RoomService) { }

  async ngOnInit() {
    this.viewService = this.viewServ;
    this.roomService = this.roomServ;
    this.getRoomInformations();

    let values = await this.svgService.getSVGFromClientProject(
      "Rémy",
      "Boulle",
      "0acf456wf",
      "IUT_BLAGNAC"
    );

    values.forEach((files: File) => {
      files.displayOnPage();
    });

    this.renderCharts();
  }

  ngAfterViewInit() {

    let svgContainer = document.getElementById("svg-container");
    let observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          let groups = mutation.addedNodes;
          groups.forEach((group: Node, index: number, parent: NodeList) => {
            if (group instanceof Element && group.tagName === "DIV") {
              let gs = group.querySelectorAll("g");
              gs.forEach((group: Node, index: number, parent: NodeList) => {
                group.addEventListener("mouseenter", (g) => {
                  console.log("enter");
                  if (group instanceof Element) {
                    let path = group.querySelectorAll("path");
                    // If the path is already red, we remove the red color
                    for (let i = 0; i < path.length; i++) {
                      if (path[i].getAttribute("style")?.includes("fill:red")) {
                        path[i].setAttribute("style", "fill:none");
                      } else {
                        path[i].setAttribute("style", "fill:red");
                      }
                    }
                  }
                });
                group.addEventListener("mouseleave", (g) => {
                  console.log("enter");
                  if (group instanceof Element) {
                    let path = group.querySelectorAll("path");
                    // If the path is already red, we remove the red color
                    for (let i = 0; i < path.length; i++) {
                      if (path[i].getAttribute("style")?.includes("fill:red")) {
                        path[i].setAttribute("style", "fill:none");
                      } else {
                        path[i].setAttribute("style", "fill:red");
                      }
                    }
                  }
                });
              });
            }
          });
        }
      });
    });
    if (!svgContainer) throw new Error("Container not found");
    observer.observe(svgContainer, { childList: true });
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
    )
  }

  renderCharts(): void {

  // custom chartJS plugin
  const centerText = {
    id: 'centerText',
    afterDatasetsDraw(chart: Chart, args: any, pluginOptions: any){
      const {ctx} = chart;

      const text = "60";

      ctx.save()
      const x = chart.getDatasetMeta(0).data[0].x;
      const y = chart.getDatasetMeta(0).data[0].y;

      ctx.textAlign = 'center';
      ctx.font = "30pt Roboto";

      ctx.fillText(text,x,y+10)
    }
  }

  // co2 chart
  const co2Chart = new Chart("co2Chart", {
    type: 'doughnut',
    data: {
      labels: ['Mon', 'Tue'],
      datasets: [{
        label: 'Weekly Sales',
        data: [0.4, 1],
        backgroundColor: [
          '#3a86ff',
          '#e8e8e8'
        ],
        borderWidth: 0
      }]
    },
    options: {
      plugins:{
        legend: {
          display: false
        }
      },
      circumference: 270,
      rotation: -135,
      cutout: 60,
    }
  });

  // humidity chart
  const humidityChart = new Chart("humidityChart", {
    type: 'doughnut',
    data: {
      labels: ['Mon', 'Tue'],
      datasets: [{
        label: 'Weekly Sales',
        data: [1.4, 1],
        backgroundColor: [
          '#8338ec',
          '#e8e8e8'
        ],
        borderWidth: 0
      }]
    },
    options: {
      plugins:{
        legend: {
          display: false
        }
      },
      circumference: 270,
      rotation: -135,
      cutout: 60,
    }
  });

  // temperature chart
  const temperatureChart = new Chart("temperatureChart", {
    type: 'doughnut',
    data: {
      labels: ['Mon', 'Tue'],
      datasets: [{
        label: 'Weekly Sales',
        data: [4, 1],
        backgroundColor: [
          '#e63946',
          '#e8e8e8'
        ],
        borderWidth: 0
      }]
    },
    options: {
      plugins:{
        legend: {
          display: false
        }
      },
      circumference: 270,
      rotation: -135,
      cutout: 60,
    }
  });

  Chart.register(centerText);
}
}
