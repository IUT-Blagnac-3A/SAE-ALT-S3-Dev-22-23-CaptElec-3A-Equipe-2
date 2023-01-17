import Project from "./Project";

export default class Client {
  _firstname: string;
  _lastname: string;
  _projects: Project[];

  constructor(firstname: string, lastname: string) {
    this._firstname = firstname;
    this._lastname = lastname;
    this._projects = [];
  }

  static loadFromClientName(firstname: string, secondname: string) {}

  addProject(project: Project) {
    this._projects.push(project);
  }
}
