import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import Project from "./Project";
import File from "./File";

@Injectable({
  providedIn: "root",
})
export default class SVGService {
  constructor(private http: HttpClient) {}

  async getSVGFromClientProject(
    firstname: string,
    secondname: string,
    id: string,
    projectname: string,
    index: number = 0
  ): Promise<File[]> {
    return new Promise(async (resolve, reject) => {
      let svgFiles: File[] = [];
      let path = `http://localhost:3000/svgs/${firstname}/${secondname}/${id}/${projectname}/`;
      let file: File;

      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", secondname);
      formData.append("id", id);
      formData.append("projectname", projectname);

      await this.http
        .post(`${path}`, formData, { responseType: "json" })
        .subscribe((data: any) => {
          // {"1et.svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"><path d=\"M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C27.5 90 10 72.5 10 50S27.5 10 50 10s40 17.5 40 40-17.5 40-40 40z\"/></svg>"}
          for (let key in data) {
            file = new File(key, path, data[key]);
            svgFiles.push(file);
          }
          resolve(svgFiles);
        });
    });
  }

  /**
   * Method that displays the SVGs files in the html page in a given container
   * @param svgFiles
   */
  displaySVGsOnPage(svgFiles: File[], containerId: string): void {
    if (svgFiles.length == 0) throw new Error("No SVG files found");
    let container = document.getElementById(containerId);
    console.log(container);

    if (container == null) throw new Error("Container not found");
    svgFiles.forEach((file: any) => {
      let img = document.createElement("img");
      img.src = file.path + "/" + file.name;
      container?.appendChild(img);
    });
  }
}
