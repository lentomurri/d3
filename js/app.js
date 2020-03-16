d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json").then(function(data) {
    
    var start = parseInt(data.from_date.substr(0,4));
    var end =   parseInt(data.to_date.substr(0,4));

    //dimensions for SVG and axis
    var width = 800;
    var height = 400;
    var padding = 40;
    var barwidth = width/275;

//collection of all the GDP data
var GDP = data.data;
GDP = GDP.map(x => x[1]);

//create svg and gives it a class to manipulate
const svg = d3.select("body")
.append("svg")
.attr("class", "svg")
.attr("width", width)
.attr("height", height);

//scale with starting year and ending year
var xscale = d3.scaleLinear()
.domain([start, end])
.range([0, width - 100]);

//scale from min GDP to maximum        
var yscale = d3.scaleLinear()
.domain([0, d3.max(GDP)])
.range([ height - padding, padding]);

var scaleGDP = GDP.map(x => yscale(x))
console.log(scaleGDP);

var xAxis = d3.axisBottom()
.scale(xscale);

var yAxis = d3.axisLeft()
.scale(yscale);

svg.append("g")
.attr("transform", "translate(" + padding + "," + (height - padding) + ")")
.call(xAxis);

svg.append("g")
.attr("transform", "translate(" + padding + ", 0)")
.call(yAxis);

svg.selectAll("rect")
.data(scaleGDP)
.enter()
.append("rect")
.attr("x", (d) => d)
.attr("y", (d) => height - padding - d)
.attr("width", barwidth)
.attr("height", (d) => d)
.attr("class", "bar")
.style("fill", "rgb(250, 20, 200)")

svg.append("text")
.attr("transform", "translate (" + (padding *1.5) + ", 300) rotate(-90)")
.attr("class", "graph")
.text(data.name);
});







