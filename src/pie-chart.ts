import * as d3 from 'd3';
const filepath = "country-data.csv";

export function setupPieChart(element: HTMLButtonElement, slider: HTMLInputElement) {


let yearInput = 5;

const countryLabel = document.createElement('h4');
const yearLabel = document.createElement('div');

countryLabel.id = 'country-label';
yearLabel.id = 'year-label';

element.appendChild(countryLabel);
element.appendChild(yearLabel)


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

  // create reusable arc for fture use
    const arc = d3.arc()
    .innerRadius(150)// This is the size of the donut hole
    .outerRadius(radius)

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
        .domain(["Denmark / Baltic", "France","Great Britain", "Netherlands", "Portugal / Brazil", "Spain / Uraguay"])
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);
    
    updateChart(data, yearInput, color);   
    
    
    slider.addEventListener('change', (e: Event) => {
      let target = e.target as HTMLInputElement;
      if(e.target) {
        yearInput = Number(target.value);
      };

      

      updateChart(data, yearInput, color)
    });
  });

  function updateChart(data: any, yearIndex: number, colorScale: d3.ScaleOrdinal<string, unknown, never>) {
    if (!yearLabel) return;
    // Compute the position of each group on the pie:
    const pie = d3.pie()
      .value(function (d) {
        if (d[0] !== "" && d[0] !== "Totals") {
          return d[1];
        } else return;
        
      })
      .sort((a, b) => Number(a[1]) - Number(b[1]))

    const data_ready = pie(Object.entries(data[yearIndex]));
    
    let local = d3.local()
    

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    const u = svg.selectAll("path")
      .data(data_ready)
      
    // svg.on('mouseover', function (event, d) {
    //   d3.select(this).transition()
    //            .duration(50)
    //            .attr('opacity', '.85');
    //     countryLabel.textContent = `${d.value}`;
    //     console.log(d)
    // })


      u
      .join(
        enter => enter.append("path"),
        update => update,
        exit => exit.remove()
      )
      .each(function(d) {
        local.set(this, d)
      })
      // .transition()
      // .duration(1000)
      // .attrTween('d', function(d) {
      //   let i = d3.interpolate(local.get(this), d);
      //   local.set(this, i(0));
      //   return function(t) {
      //     return arc(i(t));
      //   }
      // })
      .attr('d', arc
      )
      .attr('fill', colorScale)
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)


      svg
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .selectAll('text')
      
      .data(data_ready)
      .join(
        enter => enter.append("text"),
        update => update,
        exit => exit.remove()
      )
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .text(d => d.data[0])

    u
    .exit()
    .remove()

      yearLabel.innerHTML = data[yearIndex][''];

      return svg.node();
  }

}
