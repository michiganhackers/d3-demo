window.onload = function () {
	var graph = Graph (d3.select( "#graph" ));
}

function Graph (div){
	//bounds of the graph's horizontal (x) scale
	var xMin = 2005;
	var xMax = 2014;

	//bounds of the graph's vertical (y) scale
	var yMin = 4;
	var yMax = 11;

	//white space in the graph
	var margin= {top : 40, right : 40, bottom : 40, left : 40};
	var border= {top : 0, right : 0, bottom : 10, left : 10};

	
	//calculated sizes
	var outerHeight = parseInt( div.style( "height" ) ),
		outerWidth = parseInt( div.style ( "width" ) ),
		graphHeight = outerHeight - margin.top - margin.bottom,
		graphWidth = outerWidth - margin.left - margin.right,
		canvasHeight = graphHeight - border.top - border.bottom,
		canvasWidth = graphWidth - border.left - border.right;

	var scale = {
		y : d3.scale.linear()
		.domain([yMax, yMin])
		.range([0, canvasHeight]),

		x : d3.scale.linear()
		.domain([xMin, xMax])
		.range([0, canvasWidth])
	};

	//create you svg
	var outerArea  = div.append("svg")
		.attr("height", outerHeight)
		.attr("width", outerWidth);

	var graphArea = outerArea.append("svg:g")
		.attr("transform", translate(margin.left, margin.top))
		.attr("class", "graph-area");
		

	graphArea.append("svg:rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", graphWidth)
		.attr("height", graphHeight);

	graphArea.append("svg:rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", border.left)
		.attr("height", canvasHeight)
		.attr("class", "border");

	graphArea.append("svg:rect")
		.attr("x", border.left)
		.attr("y", canvasHeight)
		.attr("width", canvasWidth)
		.attr("height", border.bottom)
		.attr("class", "border");

	var yRules = graphArea.selectAll("g.y-rule")
			.data(scale.y.ticks(10))
		.enter().append("svg:g")
			.attr("class", "y-rule")
			.attr("transform", function(d){
				return translate(0, scale.y(d) + border.top)
			});

	yRules.append("svg:line")
		.attr("x1", 0)
		.attr("x2", graphWidth)
		.attr("y1", 0)
		.attr("y2", 0)

	yRules.append("svg:text")
		.attr("text-anchor", "end")
		.attr("x", 0)
		.attr("y", 0)
		.attr("dx", "-.5em")
		.attr("dy", ".5em")
		.text(function(d){ return d; });

	var xRules = graphArea.selectAll("g.x-rule")
	      .data(scale.x.ticks(10))
	    .enter().append("svg:g")
	      .attr("class", "x-rule")
	      .attr("transform", function(d){
	        return "translate(" + (scale.x(d) + border.left) + ",0)";
	      });

	  xRules.append("svg:line")
	    .attr("x1", 0)
	    .attr("x2", 0)
	    .attr("y1", 0)
	    .attr("y2", graphHeight);


	  xRules.append("svg:text")
	    .attr("text-anchor", "middle")
	    .attr("x", 0)
	    .attr("y", canvasHeight)
	    .attr("dy", "2em")
	    .text(function(d){ return d; });


	var canvas = graphArea.append("svg:g")
		.attr("transform", translate(border.left, border.top))
		.attr("class", "canvas")


	//Data we are going to use
	// years 2005 - 2014
	var years = [];
	for (var i = 0; i < 10; ++i){
		years[i] = 2005 + i;
	}

	//Endowment data 
	var endowment = [4.931, 5.652, 7.090, 7.572, 6.001, 6.564, 7.835, 7.691, 8.382, 9,444];

	var data = d3.range(10).map(function(i) {
		return {x : years[i], y : endowment[i]};
	});

	var line = d3.svg.line()
		.interpolate("linear")
		.y(function(d){return scale.y(d.y); })
		.x(function(d){return scale.x(d.x); })

	var path = d3.select(".graph-path");
	  if ( !path.empty() ){
	    path.attr("d", function(){ return line(data); });
	  }
	  else {
    d3.select(".canvas").append("svg:path")
      .attr("class", "graph-path")
      .attr("d", function(){ return line(data); });
    }	

}

function translate (x, y){
	return "translate(" + x + "," + y + ")";
}