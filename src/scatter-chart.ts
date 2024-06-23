import * as d3 from 'd3';
import { determineNationality } from './data-proccesing';
const filepath = "data.csv";

export function setupScatterChart(element: HTMLButtonElement) {

  // html template delivered as closure functino, for future logic handling in the popup
  const HtmlTemplate = (data: d3.DSVRowString<string>) => {



    let template = `
    <div>
      <h3>${data.shipname} - ${data.yearam}</h3>
      <p>This ${determineNationality(data.national)} Voyage carried ${data.slaarriv} captured Africans to port ${data.sla1port}</p>
    </div>
    `
    return template
  }
  
  let margin = {top: 10, right: 30, bottom: 30, left: 60};
    let width = 1000 - margin.left - margin.right;
    let height = 640 - margin.top - margin.bottom;

  const svg = d3.select(element)
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

        
  d3.csv(filepath).then(function (data) {
    // console.log(data)
    let x = d3.scaleLinear()
      .domain([1500, 1800])
      .range([0, width]);

      svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))


    let y = d3.scaleLinear()
    .domain([0, 500])
    .range([ height, 0]);

      svg.append("g")
      .call(d3.axisLeft(y));

    // data pop-up, made initially invisible
    let div = d3.select("body").append("div")
      .attr("class", "info-bubble")
      .style("opacity", 0);

    svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(Number(d.yearam)); } )
      .attr("cy", function (d) { return y(Number(d.slaarriv)); } )
      .attr("r", 1.5)
      .style("fill", "#69b3a2")
    
      .on('mouseover', function(event, d) {
        d3.select(this).transition()
                .duration(50)
                .style("fill", "red")

                div.html(HtmlTemplate(d))
                  .style("left", (event.pageX + 10) + "px")
                  .style("top", (event.pageY - 15) + "px");

                div.transition()
                .duration(50)
                .style("opacity", 1);
      })
      .on('mouseout', function() {
        d3.select(this).transition()
                .duration(50)
                .style("fill", '#69b3a2')

        div.transition()
        .duration(50)
        .style("opacity", 0);
      })

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
