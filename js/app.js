var width = 500;
var height = 200;
var padding = 20;

var dataset = d3.range(1).map(function(){
    return d3.range(6).map(x => x * 3);
   });
        
const svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

var scale = d3.scaleLinear()
.domain([d3.min(dataset[0]), d3.max(dataset[0]) + 1])
.range([0, width - 200]);
        
var yscale = d3.scaleLinear()
.domain([0, d3.max(dataset[0])])
.range([ height - padding, padding]);

svg.selectAll("rect")
    .data(dataset[0])
    .enter()
    .append("rect")
    .attr("x", (d) => scale(d) + 15)
    .attr("y", (d) => yscale(d))
    .attr("width", 15)
    .attr("height", (d) => height - yscale(d) - padding )
    .attr("class", "bar");

    svg.selectAll("text")
    .data(dataset[0])
    .enter()
    .append("text")
    .attr("x", (d) => scale(d) + 21)
    .attr("y", (d) => yscale(d) - 2)
    .text((d) => d);



const xAxis = d3.axisBottom()
.scale(scale);   

const yAxis = d3.axisLeft()
.scale(yscale);   

svg.append("g")
.attr("transform", "translate(20," +  (height - padding) + ")")
.attr("id", "xAxis")
.call(xAxis);

svg.append("g")
.attr("transform", "translate(20, 0)")
.attr("id", "yAxis")
.call(yAxis);


