import * as d3 from 'd3';
const filepath = "data.csv";

export function setupChart(element: HTMLButtonElement) {
  let self = element;


  d3.csv(filepath, function (data) {
    console.log(data)
  });
  
  const data:  Array<number> = [12, 5, 6, 6, 9, 10];

  const svg = d3.select(self).append("svg").attr("width", 700).attr("width", 700).attr("height", 300);
  
  svg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (d, i) => i * 70)
  .attr("y", (d, i) => 300 - 10 * d)
  .attr("width", 65)
  .attr("height", (d, i) => d * 10)
  .attr("fill", "green");

  svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text((d) => d)
      .attr("x", (d, i) => i * 70)
      .attr("y", (d, i) => 300 - (10 * d) - 3)
}
