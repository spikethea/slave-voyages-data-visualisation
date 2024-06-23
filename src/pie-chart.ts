//@ts-nocheck
import * as d3 from 'd3';
import GSAP from 'gsap';
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
const width = 1000,
    height = 550,
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
    .outerRadius(radius* 0.8)
    

// load csv data asynchronously, then call the handler the manipulate the data
  d3.csv(filepath).then(function (data) {
    // setting up range slider 
    slider.min = '1';
    
    slider.setAttribute('max', `${data.length - 1}`);

    // set the color scale
    const color = d3.scaleOrdinal()
        .domain(["Denmark / Baltic", "France","Great Britain", "Netherlands", "Portugal / Brazil", "Spain / Uraguay"])
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#a05d96"]);
    
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
    const keyedData = Object.entries(data[yearIndex]);
    const filtered = data.filter((d) => console.log(d));
    if (!yearLabel) return;
    // Compute the position of each group on the pie:
    const pie = d3.pie()
      .value(function (d) {
        // filtering out the total, and empty values
        if (d[0] !== "" && d[0] !== "Totals") {
          return d[1];
        } else return;
        
      })
      // change the starting angle back, because the dataset has many data fields, causing visual clutter with the side-labels
      .startAngle(-Math.PI / 3)
      .sort(null)

    const data_ready = pie(keyedData);
    
    let local = d3.local()
    

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    const u = svg.selectAll("path")
      .data(data_ready)

    u.transition().duration(1000).attr("d", arc)
      
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
        console.log(d)
        // GSAP.fromTo(d, {
        //   duration: 1000,
        //   attr: {
        //     start: d.startAngle, end: d.endAngle  
        //   },
        //   ease: "bounce"
        // })
      })
      .attr('d', arc
      )
      .attr('fill', colorScale)
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
      .transition()
      .duration(1000)
      .attrTween("d", function (d) {
        var i = d3.interpolate(d.startAngle, d.endAngle);
        return function (t) {
            d.endAngle = i(t);
            return arc(d);
        }
      });


    u
    .exit()
    .remove()

      yearLabel.innerHTML = data[yearIndex][''];

  // creating the off-chart labels and polylines for the donut chart

    // reusable 'ghost' arc for label outer circle
    const outerArc = d3.arc()
    .innerRadius(radius)// This is the size of the donut hole
    .outerRadius(radius)

    svg
    .selectAll('polyline')
    .data(data_ready)
    .join(
      enter => enter.append("polyline"),
      update => update,
      exit => exit.remove()
    )
      // filtered out 'Totals' out of the polylines
      .filter((d, i) => d.data[0] !== 'Totals')
      .attr("stroke", "black")
      .style("fill", "none")
      .attr("stroke-width", 1)
      .attr('points', function(d) {
        var posA = arc.centroid(d) // line insertion in the slice
        var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
        var posC = outerArc.centroid(d); // Label position = almost the same as posB
        var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC]
      })
    

  svg
  .attr("font-family", "sans-serif")
  .attr("text-anchor", "middle")
  .attr('class', 'pie-chart-label')
  .attr("text-anchor", "middle")
  .selectAll('text')
  .data(data_ready)
  .join(
    enter => enter.append("text"),
    update => update,
    exit => exit.remove()
  )
  // filtered out 'Totals' out of the text labels
  .filter((d, i) => d.data[0] !== 'Totals')
  .attr('transform', function(d) {
    console.log(d.data[0])
      var pos = outerArc.centroid(d);
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
      pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
      return 'translate(' + pos + ')';
  })
  .style('text-anchor', function(d) {
      var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
      return (midangle < Math.PI ? 'start' : 'end')
  })
  .text(d => d.data[0])


  return svg.node();
}
}
