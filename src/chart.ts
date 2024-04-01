import * as d3 from 'd3';
const filepath = "data.csv";

export function setupChart(element: HTMLButtonElement) {
  let self = element;


  
  const data:  Array<number> = [12, 5, 6, 6, 9, 10];

  let margin = {top: 10, right: 30, bottom: 30, left: 60};
    let width = 460 - margin.left - margin.right;
    let height = 400 - margin.top - margin.bottom;

  const svg = d3.select(self)
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

        
  d3.csv(filepath).then(function (data) {
    console.log(data)
    let x = d3.scaleLinear()
      .domain([1500, 1800])
      .range([0, width]);
    let y = d3.scaleLinear()
    .domain([0, 500])
    .range([ height, 0]);

    svg.append("g")
    .call(d3.axisLeft(y));

    svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d.yearam); } )
      .attr("cy", function (d) { return y(d.slaarriv); } )
      .attr("r", 1.5)
      .style("fill", "#69b3a2")

  });

  
  // svg.selectAll("rect")
  // .data(data)
  // .enter()
  // .append("rect")
  // .attr("x", (d, i) => i * 70)
  // .attr("y", (d, i) => 300 - 10 * d)
  // .attr("width", 65)
  // .attr("height", (d, i) => d * 10)
  // .attr("fill", "green");

  // svg.selectAll("text")
  //     .data(data)
  //     .enter()
  //     .append("text")
  //     .text((d) => d)
  //     .attr("x", (d, i) => i * 70)
  //     .attr("y", (d, i) => 300 - (10 * d) - 3)
}
