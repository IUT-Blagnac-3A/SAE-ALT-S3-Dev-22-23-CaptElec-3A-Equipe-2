import { Request, Response } from "express";

import * as fs from "fs";

export default async function getSvgs(req: Request, res: Response) {
  const username: string = req.params.username;
  const projectname: string = req.params.projectname;

  if (username == undefined || projectname == undefined) {
    res.status(400).send("Bad request : missing parameters");
    return;
  }

  const parentPath = "/app/src/database";
  const direct = `${username}/${projectname}`;
  const path = `${parentPath}/${direct}/`;

  console.log(path);

  if (!fs.existsSync(path)) {
    res.status(404).send("Folder not found");
    return;
  }

  const files: string[] = [];
  fs.readdirSync(path).forEach((file) => {
    if (file.endsWith(".svg")) files.push(file);
  });

  const srcFolder = "/app";

  let resultfiles = {};
  for (let i = 0; i < files.length; i++) {
    const name = files[i].split(".")[0];
    const filePath = `${srcFolder}/${path.slice(5)}/${files[i]}`;
    const content = fs.readFileSync(`${filePath}`, "utf8");
    resultfiles = { ...resultfiles, [name]: content };
  }
  res.send(resultfiles);
}
