var yScaleUpper
var yScaleDown
var halfHeight = $("#linesflow").height()/2 - 20
var positiveDown = 1
var linesFlowMousePosition = ''



function drawLinesFlow(dIn){
	// dIn[2]    显示出来的几号线
	zhi_11_list = ['花桥','光明路','兆丰路','安亭','上海汽车城','昌吉东路','上海赛车场']
	zhi_10_list = ['航中路','紫藤路','龙柏新村']
	positiveList = ['1','5','8','13','4'] 
	// negativeList = ['2','3','6','7','9','10','10zhi','11','11zhi','12','16']
	lineNumber = dIn[2]
	if (lineNumber == '10') {	
		if (zhi_10_list.hasObj(dIn[0]) ) { lineNumber = '10zhi' };
	}else if (lineNumber == '11') {
		if (zhi_11_list.hasObj(dIn[0]) ) { lineNumber = '11zhi' };
	};

	dataset = []
	stationList = []

	if (positiveList.hasObj(lineNumber)) {
		stationList = linesInfo[lineNumber]
	}else{
		stationList = []
		for (var i = linesInfo[lineNumber].length - 1; i >= 0; i--) {
			stationList.push( linesInfo[lineNumber][i])
		};
	}
	if (lineNumber == '4') {
		stationList.push(stationList[0])
	};
	for (var i = 0; i < stationList.length-1; i++) {
		for (var j = 0; j < connections.length; j++) {
			if (connections[j][0]==stationList[i] && connections[j][2]==dIn[2] ) {
				dataset.push(connections[j])
			};
		};
	};
	// console.log(dataset)
	max = getLinesFlowMax(dataset)

	nameDataset = []
	for (var i = 0; i < dataset.length; i++) {
		nameDataset.push( dataset[i][0] )
	};
	nameDataset.push(dataset[dataset.length-1][1])
	// console.log(nameDataset)

	d3.select("#linesflow").select("svg").remove();
	var margin = {top: 20, right: 20, left: 44, bottom: 20};
	var width = $("#linesflow").width() - margin.left - margin.right;
	var height = $("#linesflow").height() - margin.top - margin.bottom;
	var halfHeight = height/2

	var svg = d3.select("#linesflow").append("svg")
	        .attr("width", $("#linesflow").width())
	        .attr("height", $("#linesflow").height())
	svg.append("text").text(dIn[2]).attr("transform","translate(" + (margin.right+width*0.5-35) + "," + (margin.top+20) + ")");
   	// svg.append("text").text("号线各路段客流量随时间变化").attr("transform","translate(" + (margin.right+width*0.5-25) + "," + (margin.top +20) + ")");
	svg.append("text").text("周内").attr("transform","translate(" + (margin.right+width) + "," + (margin.top +20) + ")");
   	svg.append("text").text("周末").attr("transform","translate(" + (margin.right+width) + "," + (margin.top+height-10) + ")");

	var tip_rectWeekdayPositive = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-3, 0]) 
		.html(function(d) {
			text = "</span><strong> 工作日 </strong> </br>"+ 
				"<span style='color:orange'> 🚞 🚃 🚃 🚃 &nbsp " + d[2] + "</span><strong> 号线 </strong> </br>"+
				"<strong> 时间 : </strong> <span style='color:orange'>" + getClock(-1)+'~'+getClock(1)+ "</span></br>" +
				"<strong> 从 </strong> <span style='color:orange'>" +d[0]+ "</span><strong> 到 </strong> <span style='color:orange'>" +d[1]+ "</span><strong> : </strong><span style='color:orange'>" + d[3]['weekday']['positive'][timeIndex] + "</span></br>" +
				"<strong> 从 </strong> <span style='color:orange'>" +d[1]+ "</span><strong> 到 </strong> <span style='color:orange'>" +d[0]+ "</span><strong> : </strong><span style='color:orange'>" + d[3]['weekday']['negative'][timeIndex] + "</span></br>"
			return text
		});
	var tip_rectWeekdayNegative = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-3, 0]) 
		.html(function(d) {
			text ="</span><strong> 工作日 </strong> </br>"+ 
				"<span style='color:orange'> 🚞 🚃 🚃 🚃 &nbsp " + d[2] + "</span><strong> 号线 </strong> </br>"+
				"<strong> 时间 : </strong> <span style='color:orange'>" + getClock(-1)+'~'+getClock(1)+ "</span></br>" +
				"<strong> 从 </strong> <span style='color:orange'>" +d[1]+ "</span><strong> 到 </strong> <span style='color:orange'>" +d[0]+ "</span><strong> : </strong><span style='color:orange'>" + d[3]['weekday']['negative'][timeIndex] + "</span></br>" +
				"<strong> 从 </strong> <span style='color:orange'>" +d[0]+ "</span><strong> 到 </strong> <span style='color:orange'>" +d[1]+ "</span><strong> : </strong><span style='color:orange'>" + d[3]['weekday']['positive'][timeIndex] + "</span></br>" 
			return text
		});
	var tip_rectWeekendPositive = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-3, 0]) 
		.html(function(d) {
			text = "</span><strong> 周末 </strong> </br>"+ 
				"<span style='color:orange'> 🚞 🚃 🚃 🚃 &nbsp " + d[2] + "</span><strong> 号线 </strong> </br>"+
				"<strong> 时间 : </strong> <span style='color:orange'>" + getClock(-1)+'~'+getClock(1)+ "</span></br>" +
				"<strong> 从 </strong> <span style='color:orange'>" +d[0]+ "</span><strong> 到 </strong> <span style='color:orange'>" +d[1]+ "</span><strong> : </strong><span style='color:orange'>" + d[3]['weekend']['positive'][timeIndex] + "</span></br>" +
				"<strong> 从 </strong> <span style='color:orange'>" +d[1]+ "</span><strong> 到 </strong> <span style='color:orange'>" +d[0]+ "</span><strong> : </strong><span style='color:orange'>" + d[3]['weekend']['negative'][timeIndex] + "</span></br>"
			return text
		});
	var tip_rectWeekendNegative = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-3, 0]) 
		.html(function(d) {
			text = "</span><strong> 周末 </strong> </br>"+ 
				"<span style='color:orange'> 🚞 🚃 🚃 🚃 &nbsp " + d[2] + "</span><strong> 号线 </strong> </br>"+
				"<strong> 时间 : </strong> <span style='color:orange'>" + getClock(-1)+'~'+getClock(1)+ "</span></br>" +
				"<strong> 从 </strong> <span style='color:orange'>" +d[1]+ "</span><strong> 到 </strong> <span style='color:orange'>" +d[0]+ "</span><strong> : </strong><span style='color:orange'>" + d[3]['weekend']['negative'][timeIndex] + "</span></br>" +
				"<strong> 从 </strong> <span style='color:orange'>" +d[0]+ "</span><strong> 到 </strong> <span style='color:orange'>" +d[1]+ "</span><strong> : </strong><span style='color:orange'>" + d[3]['weekend']['positive'][timeIndex] + "</span></br>" 
			return text
		});


	svg.call(tip_rectWeekdayPositive)
	svg.call(tip_rectWeekdayNegative)
	svg.call(tip_rectWeekendPositive)
	svg.call(tip_rectWeekendNegative)

	
    var xScale = d3.scale.ordinal()
		    .domain(d3.range(dataset.length+1))
		    .rangeRoundBands([0, width]);
	yScaleUpper = d3.scale.linear().domain([0, max]).range([halfHeight,0]);
	yScaleDown = d3.scale.linear().domain([0, max]).range([0,halfHeight]);

	svg.append("g")
	  .attr("class","pa axis")
	  .attr("transform","translate(" + (margin.left-0) + "," + margin.top + ")")
	  .call(d3.svg.axis().scale(yScaleUpper).orient("left").ticks(3.5))
	  .append('text')
  		.text('客流量 (人次/10分钟)')
  		.attr('transform', 'translate(' + (-margin.left*0.6) + ', ' + (-margin.top*0.3) + ')');

	svg.append("g")
	  .attr("class","pa axis")
	  .attr("transform","translate(" + (margin.left-0) + "," + (margin.top+halfHeight) + ")")
	  .call(d3.svg.axis().scale(yScaleDown).orient("left").ticks(3.5));

	svg.append('text')
  		.text('时间')
  		.attr('transform', 'translate(' + (margin.right*1.5+width) + ', ' + (margin.top+height*0.5 + 20) + ')');


	svg.selectAll('rectWeekdayPositive')
		.data(dataset)
		.enter().append('rect')
		.attr('fill','#f29c9c')
		.attr('id','rectWeekdayPositive')
		.attr("transform","translate(" + (margin.left+xScale.rangeBand()*.6  )+ "," + margin.top + ")")
        .attr("x", function(d,i){
            return xScale(i)-xScale.rangeBand()*0;
        })
        .on('mouseover', tip_rectWeekdayPositive.show)
		.on('mouseout', tip_rectWeekdayPositive.hide)
		// .on('click',function(d){
		// 	rectWeekdayPositive.show
		// 	rectWeekdayPositive.hide
		// 	positiveDown = 1
		// 	change(d)
		// 	drawLinesFlow(dIn)
		// })
 
    svg.selectAll('rectWeekdayNegative')
		.data(dataset)
		.enter().append('rect')
		.attr('fill','#9fe0f6')
		.attr('id','rectWeekdayNegative')
		.attr("transform","translate(" + (margin.left+xScale.rangeBand()*.6  )+ "," + margin.top + ")")
        .attr("x", function(d,i){
            return xScale(i)-xScale.rangeBand()*0;
        })
        .on('mouseover', tip_rectWeekdayNegative.show)
		.on('mouseout', tip_rectWeekdayNegative.hide);

    svg.selectAll('rectWeekendPositive')
		.data(dataset)
		.enter().append('rect')
		.attr('fill','#f29c9c')
		.attr('id','rectWeekendPositive')
		.attr("transform","translate(" + (margin.left+xScale.rangeBand()*.6  )+ "," + (margin.top+halfHeight) + ")")
        .attr("x", function(d,i){
            return xScale(i)-xScale.rangeBand()*0;
        })
        .on('mouseover', tip_rectWeekendPositive.show)
		.on('mouseout', tip_rectWeekendPositive.hide);

    svg.selectAll('rectWeekendNegative')
		.data(dataset)
		.enter().append('rect')
		.attr('fill','#9fe0f6')
		.attr('id','rectWeekendNegative')
		.attr("transform","translate(" + (margin.left+xScale.rangeBand()*.6  )+ "," + (margin.top+halfHeight)+ ")")
		.attr("x", function(d,i){
            return xScale(i)-xScale.rangeBand()*0;
        })
        .on('mouseover', tip_rectWeekendNegative.show)
		.on('mouseout', tip_rectWeekendNegative.hide);
        
        
    svg.selectAll("rect")
        .attr("width", function(){
        	return xScale.rangeBand()*0.8
        } )
        .on('click',function(d){
        	// tip_rectWeekdayPositive.hide
        	// tip_rectWeekdayNegative.hide
        	// tip_rectWeekendPositive.hide
        	// tip_rectWeekendNegative.hide
	       	change(d)
        	if (this.id == 'rectWeekendPositive' || this.id == 'rectWeekdayPositive'){
        		positiveDown = 1
        	}else{
        		positiveDown = 0
        	}
        	updateLinesFlowTime()
        	updateLinesFlowFill()
        	// drawLinesFlow(dIn)
        })
        // .on('mouseover',function(){
        // 	linesFlowMousePosition = this.id
        // 	updateLinesFlowFill()
        // })
        // .on('mouseout',function(){
        // 	linesFlowMousePosition = ''
        // 	updateLinesFlowFill()
        // })
        
	var color = ['#f29c9c','#9fe0f6'];
	var label = ['从左到右','从右到左'];
   	for (var i = 2 - 1; i >= 0; i--) {
		svg.append('text')
  		.text(label[i])
  		.attr('transform', 'translate(' + (margin.right*0.7+width) + ', ' + (margin.top*2.35+12*(i+1)) + ')')
  		.attr("fill",color[i]);		
	};

	svg.append("g")
		.attr("class","sc axis")
		.attr("transform","translate(" + (margin.left) + "," + (halfHeight+margin.top) + ")")
		.call(d3.svg.axis().scale(xScale).orient("bottom")); 
	svg.append("g")
		.attr("class","paa axis")
		.attr("transform","translate(" + margin.left + "," + (margin.top+height - 58) + ")")
		.call(d3.svg.axis().scale(xScale).orient("bottom")); 


	svg.selectAll(".stationName")
		.data(nameDataset)
		.enter().append("text")
	    .text(function(d) { return d; })
	    .style("text-anchor", "start")
	    .style("dominant-baseline", "text-before-edge")
	    .attr("transform", function(d, i){ return "translate(" + (margin.left +  xScale(i)+xScale.rangeBand()*0.5 +8) + ", "+ (margin.top+height - 50) + "), rotate(90)";})
	    .attr("class", "stationName")
	    .on('click',function(d){
			stationsflow(d,stations[d]);
		})


	// svg.append("text").text(dIn[2]).attr("transform","translate(" + (margin.right+width*0.5-35) + "," + (margin.top+20) + ")");
   	svg.append("text").text("号线各线路段客流量变化").attr("transform","translate(" + (margin.right+width*0.5-25) + "," + (margin.top +20) + ")");
	updateLinesFlowTime()
}

function getLinesFlowMax(dataset){
	max = 0
	for (var i = 0; i < dataset.length; i++) {
		for (var j = 0; j < timeIndexMax; j++) {
			temp1 = dataset[i][3]['weekend']['positive'][j] + dataset[i][3]['weekend']['negative'][j]
			temp2 = dataset[i][3]['weekday']['positive'][j] + dataset[i][3]['weekday']['negative'][j]
			if (temp1 > max) { max = temp1};
			if (temp2 > max) { max = temp2 };
		};
	};
	return max
}

function updateLinesFlowTime(){
	d3.select("#linesflow").selectAll("rect")
		.attr('y',function(d,i){
			if (positiveDown) {
				if (this.id == 'rectWeekdayPositive' ) { return yScaleUpper(d[3]['weekday']['positive'][timeIndex]) }
				else if (this.id == 'rectWeekdayNegative' ) { return yScaleUpper(d[3]['weekday']['negative'][timeIndex])-(halfHeight - yScaleUpper(d[3]['weekday']['positive'][timeIndex])) }
				else if (this.id == 'rectWeekendPositive' ) { return 0}
				else if (this.id == 'rectWeekendNegative' ) { return yScaleDown(d[3]['weekend']['positive'][timeIndex]); }	
			}else{
				if (this.id == 'rectWeekdayPositive' ) { return yScaleUpper(d[3]['weekday']['positive'][timeIndex])-(halfHeight - yScaleUpper(d[3]['weekday']['negative'][timeIndex])) }
				else if (this.id == 'rectWeekdayNegative' ) { return yScaleUpper(d[3]['weekday']['negative'][timeIndex])}
				else if (this.id == 'rectWeekendPositive' ) { return yScaleDown(d[3]['weekend']['negative'][timeIndex]); }
				else if (this.id == 'rectWeekendNegative' ) { return 0}
			}
			
		})
		.attr('height',function(d,i){
			if (this.id == 'rectWeekdayPositive' ) { return halfHeight - yScaleUpper(d[3]['weekday']['positive'][timeIndex]) }
			else if (this.id == 'rectWeekdayNegative' ) { return halfHeight - yScaleUpper(d[3]['weekday']['negative'][timeIndex]); }
			else if (this.id == 'rectWeekendPositive' ) { return yScaleDown(d[3]['weekend']['positive'][timeIndex]); }
			else if (this.id == 'rectWeekendNegative' ) { return yScaleDown(d[3]['weekend']['negative'][timeIndex]); }
				
		})
}


function updateLinesFlowFill(){
	d3.select("#linesflow").selectAll("rect")
		.attr("fill-opacity",function(d,i){
			if (linesFlowMousePosition == 'rectWeekdayPositive' || linesFlowMousePosition == 'rectWeekendPositive') {
				if (this.id == 'rectWeekendPositive' || this.id == 'rectWeekdayPositive') {return 1}
				else{ return 0.3}
			}else if (linesFlowMousePosition == 'rectWeekdayNegative' || linesFlowMousePosition == 'rectWeekendNegative') {
				if (this.id == 'rectWeekendNegative' || this.id == 'rectWeekdayNegative') {return 1}
				else{ return 0.3}
			}else{
				return 1
			}
		})
}






