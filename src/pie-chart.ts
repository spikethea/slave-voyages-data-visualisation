import * as d3 from 'd3';
const filepath = "country-data.csv";

export function setupPieChart(element: HTMLButtonElement, slider: HTMLInputElement) {

let yearInput = 5;




// set the dimensions and margins of the graph
const width = 450,
    height = 450,
    margin = 40;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
const radius = Math.min(width, height) / 2 - margin


const svg = d3.select(element)
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", `translate(${width / 2},${height / 2})`);

// // Create dummy data
// const data = {a: 9, b: 20, c:30, d:8, e:12}
  d3.csv(filepath).then(function (data) {
    console.log(data);
    // setting up range slider 
    slider.min = '1';
    
    slider.setAttribute('max', `${data.length - 1}`);
    console.log(slider);

    // set the color scale
    const color = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

    updateChart(data, yearInput, color);   
    
    
    slider.addEventListener('change', (e: Event) => {
      let target = e.target as HTMLInputElement;
      if(e.target) {
        yearInput = Number(target.value);
      };

      const color = d3.scaleOrdinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);

      updateChart(data, yearInput, color)
    });
  });

  function updateChart(data: any, year: number, colorScale) {
    // Compute the position of each group on the pie:
    const pie = d3.pie()
      .value(d=>d[1])

    const data_ready = pie(Object.entries(data[5]))

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
      .selectAll('whatever')
      .data(data_ready)
      .join('path')
      .attr('d', d3.arc()
        .innerRadius(150)         // This is the size of the donut hole
        .outerRadius(radius)
      )
      .attr('fill', d => colorScale(d.data[year]))
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)

  }

}
