export default class File {
  _name: string;
  _path: string;
  _content: string | undefined;

  constructor(name: string, path: string, content?: string | undefined) {
    this._name = name;
    this._path = path;
    this._content = content;
  }

  get name() {
    return this._name;
  }

  get path() {
    return this._path;
  }

  get content() {
    return this._content;
  }
}
