import { Request, Response } from "express";

import * as fs from "fs";

export default async function getSvgs(req: Request, res: Response) {
  const username: string = req.params.username;
  const id: string = req.params.id;
  const projectname: string = req.params.projectname;

  if (username == undefined || id == undefined || projectname == undefined) {
    res.status(400).send("Bad request : missing parameters");
    return;
  }

  let parentPath = "/app/src/database";
  let direct = `${username}-${id}/${projectname}`;
  const path = `${parentPath}/${direct}/`;

  console.log(path);

  if (!fs.existsSync(path)) {
    res.status(404).send("Folder not found");
    return;
  }

  let files: string[] = [];
  fs.readdirSync(path).forEach((file) => {
    if (file.endsWith(".svg")) files.push(file);
  });

  let srcFolder = "/app";

  let resultfiles = {};
  for (let i = 0; i < files.length; i++) {
    let name = files[i].split(".")[0];
    let filePath = `${srcFolder}/${path.slice(5)}/${files[i]}`;
    let content = fs.readFileSync(`${filePath}`, "utf8");
    resultfiles = { ...resultfiles, [name]: content };
  }
  res.send(resultfiles);
}
