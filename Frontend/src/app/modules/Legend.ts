export default class Legend {
  private min: number;
  private max: number;
  private colors: string[];
  private unit: string;

  constructor(min: number, max: number, colors: string[], unit: string) {
    this.min = min;
    this.max = max;
    this.colors = colors;
    this.unit = unit;
  }

  generateHTML(): string {
    let html =
      '<div class="legend-container" style="display: flex; justify-content: center; align-items: center;">' +
      '<div class="legend">';
    const range = this.max - this.min;
    const colorStops = this.colors
      .map((color, i) => {
        const position = i / (this.colors.length - 1);
        return `<stop offset="${position}" stop-color="${color}" />`;
      })
      .join("");
    html += `
  <svg id="legend" width="500" height="36">
    <defs>
      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        ${colorStops}
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="400" height="26" rx="15" ry="15" fill="url(#gradient)" />
  </svg>
`;
    html +=
      // Under the svg, display the legend values with 400px width
      '<div class="legend-values" style="width: 400px; margin-left: 45px; display: flex; justify-content: space-between;">' +
      // Display the min, first quartile, median, third quartile, and max
      `<div>${this.min}</div> <div>${this.min + range / 4}</div> <div>${
        this.min + range / 2
      }</div> <div>${this.min + (3 * range) / 4}</div> <div>${this.max}</div>` +
      "</div>" +
      // + the unit
      `<div style="text-align: center;">${this.unit}</div>`;
    ("</div>");
    html += "</div></div>";
    // style
    html += `
<style>
    
</style>
`;
    return html;
  }

  display(): void {
    const legendContainer = document.getElementById("svg-container");
    if (legendContainer) {
      // Append the legend to the container
      legendContainer.innerHTML += this.generateHTML();
    }
  }
}
