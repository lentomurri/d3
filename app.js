d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json").then(function(data) {
    
    var start = parseInt(data.from_date.substr(0,4));
    var end =   parseInt(data.to_date.substr(0,4));

var width = 1000;
var height = 200;
var padding = 20;

const svg = d3.select("body")
        .append("svg")
        .attr("class", "svg")
        .attr("width", width)
        .attr("height", height);

var xscale = d3.scaleLinear()
.domain([start, end])
.range([0, width - 200]);

        
var yscale = d3.scaleLinear()
.domain([0, end])
.range([ height - padding, padding]);

var xAxis = d3.axisBottom()
.scale(xscale);

svg.append("g")
.attr("transform", "translate(0," + (height - padding) + ")")
.call(xAxis);

svg.append("g")
.attr("transform", "translate(0," + (height - padding) + ")")
.call(yAxis);


});




