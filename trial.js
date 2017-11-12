var margin = {top: 5, right: 20, bottom: 0, left: 50},
    width = 500 - margin.left - margin.right,
    height = 500;

var xlist=[
  {
    id:'mpg',
    name:'mpg'
  },
  {
    id:'cylinders',
    name:'cylinders'
  },
  {
    id:'displacement',
    name:'displacement'
  },
  {
    id:'horsepower',
    name:'horsepower'
  },
  {
    id:'weight',
    name:'weight'
  },
  {
    id:'acceleration',
    name:'acceleration'
  },
  {
    id:'model.year',
    name:'model.year'
  }
];

var ylist=[
  {
    id:'mpg',
    name:'mpg'
  },
  {
    id:'cylinders',
    name:'cylinders'
  },
  {
    id:'displacement',
    name:'displacement'
  },
  {
    id:'horsepower',
    name:'horsepower'
  },
  {
    id:'weight',
    name:'weight'
  },
  {
    id:'acceleration',
    name:'acceleration'
  },
  {
    id:'model.year',
    name:'model.year'
  }
];

function addListeners(){
 $('#update').on('click',function(){
    // Define the axes
    var xvalue=d3.select("#sel-x").node().value;
    console.log(xvalue);
    var yvalue=d3.select("#sel-y").node().value;
    console.log(yvalue);
    var svg= d3.select("svg")
    .attr("width", width+10)
    .attr("height", height+50)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
    // set the ranges
    var x = d3.scaleLinear().range([0,width]);
    var y = d3.scaleLinear().range([height,0]);

    var valueline = d3.line()
        .x(function(d) { return x(d.xvalue); })
        .y(function(d) { return y(d.yvalue); });


//load values
d3.csv('car.csv',function(data) {
  data.forEach(function(d) {
    d[xvalue] = +d[xvalue];
    d[yvalue] = +d[yvalue];
  });
  console.log(data[0]);

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d[xvalue]; }));
  y.domain(d3.extent(data, function(d) { return d[yvalue]; }));

  svg.selectAll("dot")
          .data(data)
        .enter().append("circle")
          .attr("r", 3.5)
          .attr("cx",function(d) { return x(d[xvalue]); })
          .attr("cy",function(d) { return y(d[yvalue]); })
          // .style("fill",function(d){return d?colour(d[1]):"black";});
            // Add the X Axis
          svg.append("g")
          .attr("transform", "translate(" + 0 + " ," +
                 (height) + ")")
              .call(d3.axisBottom(x))
          svg.append("text")
          .attr("transform",
            "translate(" + (width/2) + " ," +
                           (height+30) + ")")
          .style("text-anchor", "middle")
          .text(d3.select("#sel-x").node().value);

          // Add the Y Axis
          svg.append("g")
                .call(d3.axisLeft(y))
          svg.append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 0 - margin.left)
          .attr("x",0 - (height / 2))
          .attr("dy", "1em")
          .style("text-anchor", "middle")
                // .attr("transform", "rotate(-90)")
                .text(d3.select("#sel-y").node().value);


});
svg.selectAll(".pin").exit().remove();
 });
}

$(document).ready(function(){
  var selx = $("#sel-x");
  for(var i=0;i<xlist.length;i++){
    var xl=xlist[i];
    $('<option></option>')
    .val(xl.id)
    .text(xl.name)
    .appendTo(selx);
  }
  var sely = $("#sel-y");
  for(var i=0;i<xlist.length;i++){
    var yl=ylist[i];
    $('<option></option>')
    .val(yl.id)
    .text(yl.name)
    .appendTo(sely);
  }
  addListeners();
})
