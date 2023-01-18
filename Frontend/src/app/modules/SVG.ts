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

  getSVGFromClientProject(
    firstname: string,
    secondname: string,
    id: string,
    projectname: string
  ): File[] {
    let svgFiles: File[] = [];
    // let path = `'../../../../database'/${firstname[0].toLowerCase()}${secondname[0].toLowerCase()}-${id}/${projectname}/`;
    let path = `./assets/database/rb/`;
    // This is where we use the HttpClient to make a GET request to the server to get the files
    this.http
      .get(path)
      .pipe(
        map((files: any) => {
          files.forEach((file: any) => {
            if (file.endsWith(".svg")) svgFiles.push(new File(file, path));
          });
          return svgFiles;
        })
      )
      .subscribe((svgFiles: File[]) => {
        return svgFiles;
      });
    return svgFiles;
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
