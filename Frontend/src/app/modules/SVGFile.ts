export default class SVGFile {
  _name: string;
  _path: string;
  _content: string | undefined;

  constructor(name: string, path: string, content?: string | undefined) {
    this._name = name;
    this._path = path;
    this._content = content;
  }
  /**
   * We're working with a xml svg file, so we need to parse it to be able to use it
   */
  async displayOnPage() {
    let svgContainer = document.getElementById("svg-container");
    if (svgContainer == null) throw new Error("Container not found");
    svgContainer.insertAdjacentHTML("beforeend", this._content as string);

    //
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
