import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import ENV from "../environments/environment";
import File from "./SVGFile";

const types = ["activity", "co2", "humidity", "pressure", "temperature"];

import DefineEnvironnementType from "./type.environnement";

export interface SVGData {
  value: number;
  device: string;
  room: string;
}

@Injectable({
  providedIn: "root",
})
export default class SVGService {
  data: Array<SVGData> | undefined;
  constructor(private http: HttpClient) {}

  async getSVGFromClientProject(
    username: string,
    projectname: string
  ): Promise<File[]> {
    return new Promise(async (resolve, reject) => {
      let svgFiles: File[] = [];
      let path = `${ENV.SERVER_ADRESS_A}/svgs/${username}/${projectname}/`;
      let file: File;

      const formData = new FormData();
      formData.append("username", username);
      formData.append("projectname", projectname);

      await this.http
        .post(`${path}`, formData, { responseType: "json" })
        .subscribe((data: any) => {
          for (let key in data) {
            file = new File(key, path, data[key]);
            svgFiles.push(file);
          }

          resolve(svgFiles);
        });
    });
  }

  findDeviceLinkedToRoom(room: string) {
    let device = this.data?.find((data) => data.room == room);
    if (device == null) return undefined;
    return device.device;
  }
  /**
   *
   */
  displaySvgWithIndex(svgFiles: File[], index: string) {
    // Find the svg with the index, the index is the name of the svg
    console.log(svgFiles);

    let svg = svgFiles.find((svg) => svg.name == index);
    if (svg == null) throw new Error("SVG not found");
    let container = document.getElementById("svg-container");
    if (container == null) throw new Error("Container not found");
    svg.displayOnPage();
  }
  /**
   * get the couple rooms values
   */
  async getRoomsValues(type: string, project: string): Promise<Array<SVGData>> {
    if (!types.includes(type)) throw new Error("Type not found");
    let path = `${ENV.SERVER_ADRESS_A}/data/project/${project}/type/${type}`;
    const formData = new FormData();
    formData.append("project", project);
    formData.append("type", type);

    return new Promise(async (res, rej) => {
      await this.http
        .get(path, { responseType: "json" })
        .subscribe((data: any) => {
          this.data = data;
          res(data);
        });
    });
  }
  /**
   * Fill the svgs
   * We start with an array of objects like this
   */
  async fillSVGs(values: Array<SVGData>, type: string) {
    if (!types.includes(type)) throw new Error("Type not found");
    let environment = DefineEnvironnementType(type);

    values.forEach(async (value: SVGData) => {
      let svg = document.getElementById(value.room.toLowerCase());

      if (svg == null) return;
      let paths = svg?.getElementsByTagName("path");
      if (paths == null) return;
      let color = await SVGService.findColorNuance(
        environment.min,
        environment.max,
        environment.minColor,
        environment.maxColor,
        value.value
      );
      for (let i = 0; i < paths?.length; i++) {
        paths[i].setAttribute("fill", color);
      }
      // Change the title of the svg currently only the title is displayed so we put title + values + unit
      let title = svg?.getElementsByTagName("title");
      if (title == null) return;
      title[0].innerHTML = `${value.room} : ${value.value} ${environment.unit}`;
    });
  }

  static async findColorNuance(
    min: number,
    max: number,
    minColor: string,
    maxColor: string,
    value: number
  ): Promise<string> {
    let minColorRGB = SVGService.hexToRgb(minColor);
    let maxColorRGB = SVGService.hexToRgb(maxColor);
    let color = {
      r: 0,
      g: 0,
      b: 0,
    };
    let nuance = (value - min) / (max - min);
    color.r = Math.floor(
      minColorRGB.r + nuance * (maxColorRGB.r - minColorRGB.r)
    );
    color.g = Math.floor(
      minColorRGB.g + nuance * (maxColorRGB.g - minColorRGB.g)
    );
    color.b = Math.floor(
      minColorRGB.b + nuance * (maxColorRGB.b - minColorRGB.b)
    );
    return SVGService.rgbToHex(color.r, color.g, color.b);
  }

  static hexToRgb(hex: string): any {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  static rgbToHex(r: number, g: number, b: number): string {
    return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
  }
}
