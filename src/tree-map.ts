// Unused file
//@ts-nocheck
import * as d3 from 'd3';
const filepath = "named-data.csv";


export default function setupTreeMap (element: HTMLDivElement) {
    let margin = {top: 10, right: 30, bottom: 30, left: 60};
    let width = 800 - margin.left - margin.right;
    let height = 400 - margin.top - margin.bottom;

    const svg = d3.select(element)
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    
    //Stratifying the flat CSV data into hierachical to use for treemap, according to country of origin.
    d3.csv(filepath).then(function (data) {

        let locations : [string] = ['Unknown Place']
        
        data.forEach((d, index) => {
            if(!d["Voyage itinerary imputed port where began (ptdepimp) place"]) {
                d["Voyage itinerary imputed port where began (ptdepimp) place"] = 'Unknown Place'
                
            }

            if(!locations.includes(d["Voyage itinerary imputed port where began (ptdepimp) place"])) {
                locations.push(d["Voyage itinerary imputed port where began (ptdepimp) place"]);
            }
            console.log(d)
        });

        locations.forEach((location) => {
            data.push({
                "Voyage itinerary imputed port where began (ptdepimp) place": location
            })
        })

        data.forEach((d, index) => {
            d.id = `${index}`
        });

        console.log(data);

        const root = d3.stratify()
        .id(d => d.id)
        .parentId(d => d["Voyage itinerary imputed port where began (ptdepimp) place"])
        (data);

        console.log(root.data)
        
        root.sum((d) => d["Year of arrival at port of disembarkation"]);
        //const color = d3.scaleOrdinal(data.children.map(d => d.id.split("/").at(-1)), d3.schemeTableau10);
    
        d3.treemap()
            .size([width, height])
            .padding(4)
            (root)
        
        console.log(root.leaves);

        svg
            .selectAll("rect")
            .data(root.leaves())
            .enter()
            .append("rect")
            .attr('x', function (d) { return d.x0; })
            .attr('y', function (d) { return d.y0; })
            .attr('width', function (d) { return d.x1 - d.x0; })
            .attr('height', function (d) { return d.y1 - d.y0; })
            .style("stroke", "black")
            .style("fill", "#69b3a2");
    });

    
}