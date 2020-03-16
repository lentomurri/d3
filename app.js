function loadJSON(path, success, error) { //generic function to get JSON
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          if (success)
            success(JSON.parse(xhr.responseText));
        } else {
          if (error)
            error(xhr);
        }
      }
    };
    xhr.open("GET", path, true);
    xhr.send();
  }
  
  loadJSON('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json',
    dataset,
    function(xhr) {
      console.error(xhr);
    }
  );
  
  // loaded data stored in the function
  
  function dataset(data) {
    
    var dataset = data;
    //create title
    d3.select("#title")
    .text(dataset.name);
    
    //sets dimension of height, width and padding
    var h = 700;
    var w = 1000;
    var padding = 50;

    const svg = d3.select("body")
                .append("svg")
                .attr("height", h)
                .attr("width", w)
                .attr("class", "svg");

    //create tooltip
    const tooltip = d3.select("body")
    .append("div")
    .attr("id", "tooltip")
    .attr("visibility", "hidden")

    //create data for the tooltip
    var years = dataset.data.map((item) => new Date(item[0]).getFullYear())
    var months = dataset.data.map(function(item) {
      var current = new Date(item[0]).getMonth();
      switch(current) {
      case 0:
        return "Jan, Q1";
      case 3:
        return "Apr, Q2";
      case 6:
        return "Jul, Q3";
      case 9:
        return "Oct, Q4";
      }

    });
    var dates = dataset.data.map((item) => item[0])
    
    //create scales for axis and data

    const min = new Date(d3.min(dataset.data, (d) => d[0]))
    const max = new Date(d3.max(dataset.data, (d) => d[0])) 
    
    const xScale = d3.scaleTime()
            .domain([min, max])
            .range([padding, w - padding]);

    const yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset.data,(d) =>  d[1])])
            .range([h - padding ,padding]);
    
    //create axis

    const xAxis = d3.axisBottom()
    .scale(xScale)
    
                
    const yAxis = d3.axisLeft()
    .scale(yScale)


    svg.append("g")
    .attr("transform", "translate(0," + (h - padding) + ")")
    .attr("id", "x-axis")
    .call(xAxis.ticks(15));

    svg.append("g")
    .attr("id", "y-axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis);

    svg.selectAll("rect")
    .data(dataset.data)
    .enter()
    .append("rect")
    .attr("height", (d) => h - yScale(d[1]) - padding)
    .attr("width", 1)
    .attr("data-date", (d) => d[0])
    .attr("data-gdp", (d) => d[1])
    .attr("class", "bar")
    .attr("y", (d) => yScale(d[1]))
    .attr("x", (d, i) => xScale(new Date(d[0])))
    .on("mouseover", function(d, i){
      tooltip.style("visibility", "visible")
      .style("top", h - 100 +"px")
      .style("left", (i * 1) + 1100 + 'px')
      .attr("data-date", dates[i])
      .html(years[i] + "<br>" + months[i] + "<br>" + "$" + d[1] + " Billions")
    
      ;})
  .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

  }