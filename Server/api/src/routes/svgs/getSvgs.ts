import { Request, Response } from "express";

import * as fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

export default async function getSvgs(req: Request, res: Response) {
  const firstname: string = req.params.firstname;
  const lastname: string = req.params.lastname;
  const id: string = req.params.id;
  const projectname: string = req.params.projectname;

  if (
    firstname == undefined ||
    lastname == undefined ||
    id == undefined ||
    projectname == undefined
  ) {
    res.status(400).send("Bad request : missing parameters");
    return;
  }

  let parentPath = "./src/db/svgs";
  let direct = `${firstname[0].toLowerCase()}${lastname[0].toLowerCase()}-${id}/${projectname}`;
  const path = `${parentPath}/${direct}/`;
  if (!fs.existsSync(path)) {
    res.status(404).send("Folder not found");
    return;
  }

  let files: string[] = [];
  fs.readdirSync(path).forEach((file) => {
    if (file.endsWith(".svg")) files.push(file);
  });

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  // __dirname = C:\Users\ericp\Desktop\SAE-ALT-S3-Dev-22-23-CaptElec-3A-Equipe-2\Server\api\src\routes\svgs
  // cut routes and svgs
  let srcDirName = __dirname.split("\\");
  srcDirName = srcDirName.slice(0, srcDirName.length - 2);
  let srcFolder = srcDirName.join("/");
  // Send the file buffer to the client
  res.setHeader("Content-Type", "image/svg+xml");
  res.sendFile(`${srcFolder}/db/svgs/${direct}/${files[0]}`);
}

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

  test() {
    // Http request to the server to get the svg files
    this.http
      // routes.post("/svgs/:firstname/:secondname/:id/:projectname", getSvgs);

      .get("http://localhost:3000/svgs/remy/boulle/0acf456wf/IUT_BLAGNAC")
      .subscribe((data) => {
        console.log(data);
      });
  }

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
