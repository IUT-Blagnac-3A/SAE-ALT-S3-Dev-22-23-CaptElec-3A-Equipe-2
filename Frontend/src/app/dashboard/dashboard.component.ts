import {
  Component,
  ViewChild,
  QueryList,
  ElementRef,
  Input,
} from "@angular/core";

import SVGService from "../modules/SVG";

import File from "../modules/SVGFile";
import { ViewService } from "../view.service";
import { RoomService } from "../room.service";
import { Room } from "../room";
import { HttpErrorResponse } from "@angular/common/http";
import { Chart, registerables } from "chart.js";
import Project from "../modules/Project";
import { Gauge } from "../gauge/gauge.model";
import DefaultDico from "../modules/default.dico";

Chart.register(...registerables);

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
  @ViewChild("svg") svg: ElementRef | null = null;
  @Input() inputSensorID!: string;
  svgFiles: File[] = [];
  viewService!: ViewService;
  roomService!: RoomService;
  roomInformations!: Room[];
  roomName!: string;
  roomCO2!: Number;
  roomHumidity!: Number;
  roomTemperature!: Number;
  co2Chart!: Gauge;
  humidityChart!: Gauge;
  temperatureChart!: Gauge;
  cardText!: string;
  criticalRateBattery!: number;
  criticalRateCO2!: number;
  criticalRateHumidity!: number;
  criticalRateTemperature!: number;

  constructor(
    private svgService: SVGService,
    private viewServ: ViewService,
    private roomServ: RoomService
  ) {}

  async ngOnInit() {
    this.criticalRateBattery = D.CRITICAL_BATTERY;
    this.criticalRateCO2 = D.CRITICAL_CO2;
    this.criticalRateHumidity = D.CRITICAL_HUMIDITY;
    this.criticalRateTemperature = D.CRITICAL_TEMPERATURE;
    this.cardText = "Critical limit before sending a notification : ";
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

    // this.renderCharts();
  }

  getRoomInformations(): void {
    const D = new DefaultDico();
    this.roomService.getRoom(this.inputSensorID).subscribe(
      (result: Room[]) => {
        let informationNumber = 0;
        for (let i = 0; i < result.length; i++) {
          informationNumber = i;
        }

        this.roomInformations = result;
        this.roomName = this.roomInformations[0].name;

        let co2Color = "";
        let humidityColor = "";
        let temperatureColor = "";

        if (this.roomInformations[informationNumber].co2 < D.CRITICAL_CO2) {
          co2Color = "#60992D";
        } else {
          co2Color = "#B3001B";
        }

        if (
          this.roomInformations[informationNumber].humidity <
          D.CRITICAL_HUMIDITY
        ) {
          humidityColor = "#60992D";
        } else {
          humidityColor = "#B3001B";
        }

        if (
          this.roomInformations[informationNumber].temperature <
          D.CRITICAL_TEMPERATURE
        ) {
          temperatureColor = "#60992D";
        } else {
          temperatureColor = "#B3001B";
        }

        this.co2Chart = new Gauge(
          "co2Chart",
          co2Color,
          this.roomInformations[informationNumber].co2,
          D.MAX_CO2,
          " " + D.CO2_UNIT
        );
        this.humidityChart = new Gauge(
          "humidityChart",
          humidityColor,
          this.roomInformations[informationNumber].humidity,
          D.MAX_HUMIDITY,
          D.HUMIDITY_UNIT
        );
        this.temperatureChart = new Gauge(
          "temperatureChart",
          temperatureColor,
          this.roomInformations[informationNumber].temperature,
          D.MAX_TEMPERATURE,
          D.TEMPERATURE_UNIT
        );
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
}
