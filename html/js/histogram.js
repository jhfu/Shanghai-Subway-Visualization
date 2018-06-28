
// 0: weekday, 1: weekend
var histogramXScale;
var histogramYScale;

function drawHistogram(){

	d3.select("#histogram").select("svg").remove();
	var margin = {top: 15, right: 30, left: 70, bottom: 20};
	var width = $("#histogram").width() - margin.left - margin.right;
	var height = $("#histogram").height() - margin.top - margin.bottom;

	var svg = d3.select("#histogram").append("svg")
	        .attr("width", $("#histogram").width())
	        .attr("height", $("#histogram").height())

	// console.log(totalInSubway)
	maxInSubway = getMaxInSubway()
	// console.log(maxInSubway)
	var xScale = d3.scale.linear().domain([0, timeIndexMax]).range([0, width]);
	var yScale = d3.scale.linear().domain([0, maxInSubway[dayType]]).range([height,0]);
	var yAxis = d3.svg.axis().scale(yScale).orient("left");

	histogramYScale = yScale
	histogramXScale = xScale

	svg.selectAll('rect.histogram')
		.data(totalInSubway)
		.enter().append('rect')
		.attr("transform","translate(" + margin.left + "," + margin.top + ")")
        .attr("x", function(d,i){
            return xScale(i);
        })
        .attr("y",function(d){
            return yScale(d[getDayTypeInNumber()])
        })
        .attr("width", function(){
        	return xScale(1)*1.1
        } )
        .attr("height", function(d){
            return height - yScale(d[getDayTypeInNumber()])+3;
        })
        .on('mouseover',function(d,i){
			timeIndex = i
			window.clearInterval(timer); 
			updateSubwayMap()
			updateHistogram()
			updateLinesFlowTime()
			updatechange(timeIndex);
			updatestationsflow();
        })


	svg.selectAll('text1').data('1').enter().append('text')
			.text(function(){
				return totalInSubway[timeIndex][getDayTypeInNumber()]
			})
			.style("font-size","13px")
			.attr("transform","translate(" + margin.left + "," + margin.top + ")")

	svg.append("g")
	  .attr("class","pa axis")
	  .attr("transform","translate(" + margin.left + "," + margin.top + ")")
	  .call(yAxis.ticks(4))
  	  .append('text')
  		.text('地铁内总人数')
  		.attr('transform', 'translate(' + (-margin.left*0.1) + ', ' + (-margin.top*0.3) + ')');







	// 定义x轴
	nameDataset = ['5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00']

	var xScale2 = d3.scale.ordinal()
		    .domain(d3.range(nameDataset))
		    .rangeRoundBands([0, width]);

	svg.append("g")
	  .attr("class","sc axis")
	  .attr("transform","translate(" + margin.left + "," + (height+margin.top+3) + ")")
	  .call(d3.svg.axis().scale(xScale2).orient("bottom")); 
	svg.append('text')
  		.text('时间')
  		.attr('transform', 'translate(' + (margin.right*1.5+width+30) + ', ' + (margin.top+height + 12) + ')');


	svg.selectAll(".stationName")
		.data(nameDataset)
		.enter().append("text")
	    .text(function(d) { return d; })
	    .style("text-anchor", "start")
	    .style("dominant-baseline", "text-before-edge")
	    .attr("transform", function(d, i){ return "translate(" + (margin.left+width/35+i* width*5.1/100) + ", "+ (margin.top+height+5) + ")";})
	    .attr("class", "stationName");






    updateHistogram()

}

function getDayTypeInNumber(){
	if (dayType == 'weekday') {return 0};
	if (dayType == 'weekend') {return 1};
}

function getMaxInSubway(){
	max0 = max1 = 10000
	for (var i = 0; i < timeIndexMax ; i++) {
		// console.log(i)
		if (totalInSubway[i][0] > max0) {
			max0 = totalInSubway[i][0]
		};
		if (totalInSubway[i][1] > max1) {
			max1 = totalInSubway[i][1]
		};
	};

	return Object({weekday:max0,weekend:max1})
}

function updateHistogram(){
	d3.select("#histogram").selectAll("rect")
		// .transition().duration(delay)
		.attr('fill',function(d,i){
			if (timeIndex == i) {return 'yellow'}
			else {	return '#f29c9c'}
		})
	d3.select("#histogram").select("text")
		.text(function(){
				return totalInSubway[timeIndex][getDayTypeInNumber()]
			})
			.attr('x',function(){
				return histogramXScale(timeIndex)-20
			})
			.attr('y',function(){
				return histogramYScale(totalInSubway[timeIndex][getDayTypeInNumber()]) - 5
				// return 100
			})
}
