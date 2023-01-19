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

  let parentPath = "./src/database";
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

  // resultfiles = {"filenameOne": data}
  let resultfiles = {};
  for (let i = 0; i < files.length; i++) {
    let name = files[i].split(".")[0];
    let filePath = `${srcFolder}/${path.slice(5)}/${files[i]}`;
    let content = fs.readFileSync(`${filePath}`, "utf8");
    resultfiles = { ...resultfiles, [name]: content };
  }

  res.send(resultfiles);
}
