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
    let path = `${ENV.SERVER_ADRESS_A}/data/${project}/type/${type}`;
    const formData = new FormData();
    formData.append("project", project);
    formData.append("type", type);

    let token = localStorage.getItem("token");

    if (token == null) throw new Error("Token not found");
    return new Promise(async (res, rej) => {
      await this.http
        .get(path, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "json",
        })
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
        environment.rangeColor,
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
    colors: string[],
    value: number
  ): Promise<string> {
    const step = (max - min) / (colors.length - 1);
    const index = Math.floor((value - min) / step);
    const weight = (value - (min + index * step)) / step;
    const color1 = colors[index];
    const color2 = colors[index + 1] || color1;
    const r1 = parseInt(color1.substring(1, 3), 16);
    const g1 = parseInt(color1.substring(3, 5), 16);
    const b1 = parseInt(color1.substring(5, 7), 16);
    const r2 = parseInt(color2.substring(1, 3), 16);
    const g2 = parseInt(color2.substring(3, 5), 16);
    const b2 = parseInt(color2.substring(5, 7), 16);
    const r = Math.floor(r1 + (r2 - r1) * weight)
      .toString(16)
      .padStart(2, "0");
    const g = Math.floor(g1 + (g2 - g1) * weight)
      .toString(16)
      .padStart(2, "0");
    const b = Math.floor(b1 + (b2 - b1) * weight)
      .toString(16)
      .padStart(2, "0");
    return "#" + r + g + b;
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
