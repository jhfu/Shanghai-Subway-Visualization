var selectedLine = ''

function checkMeizi(start,end,lineNumber,type,x,y){

	if (start == '陕西南路' && end =='常熟路') { // 1
		if (type == 'x1') {return x(parseFloat(stations[start]['X']))  } 
		else if (type == 'x2') {return x(parseFloat(stations[end]['X'])) } 
		else if (type == 'y1') {return y(parseFloat(stations[start]['Y'])) - 2 } 
		else if (type == 'y2') {return y(parseFloat(stations[end]['Y'])) - 2 } 
	}else if (start == '上海图书馆' && end =='陕西南路') {  // 10
		if (type == 'x1') {return x(parseFloat(stations[start]['X']))  } 
		else if (type == 'x2') {return x(parseFloat(stations[end]['X'])) } 
		else if (type == 'y1') {return y(parseFloat(stations[start]['Y'])) } 
		else if (type == 'y2') {return y(parseFloat(stations[end]['Y'])) + 1 } 
	}else if (start == '世纪大道' && end =='浦电路') { // 4
		if (type == 'x1') {return x(parseFloat(stations[start]['X']))  } 
		else if (type == 'x2') {return x(parseFloat(stations[end]['X'])) +4} 
		else if (type == 'y1') {return y(parseFloat(stations[start]['Y'])) } 
		else if (type == 'y2') {return y(parseFloat(stations[end]['Y']))  } 
	}else if (start == '浦电路' && end =='蓝村路') {  // 4
		if (type == 'x1') {return x(parseFloat(stations[start]['X'])) +4 } 
		else if (type == 'x2') {return x(parseFloat(stations[end]['X'])) } 
		else if (type == 'y1') {return y(parseFloat(stations[start]['Y'])) } 
		else if (type == 'y2') {return y(parseFloat(stations[end]['Y']))  } 
	}else if (start == '蓝村路' && end =='浦电路') {// 6
		if (type == 'x1') {return x(parseFloat(stations[start]['X']))  } 
		else if (type == 'x2') {return x(parseFloat(stations[end]['X'])) -4} 
		else if (type == 'y1') {return y(parseFloat(stations[start]['Y'])) } 
		else if (type == 'y2') {return y(parseFloat(stations[end]['Y']))  } 
	}else if (start == '浦电路' && end =='世纪大道') {  // 6
		if (type == 'x1') {return x(parseFloat(stations[start]['X'])) -4 } 
		else if (type == 'x2') {return x(parseFloat(stations[end]['X'])) } 
		else if (type == 'y1') {return y(parseFloat(stations[start]['Y'])) } 
		else if (type == 'y2') {return y(parseFloat(stations[end]['Y']))  } 
	}

	deltaX = 0
	deltaY = 0
	if (start == '虹桥火车站' && lineNumber =='10') {
		deltaY = 3.5
	}else if (inList(leftList,start,end)) { // 4号线左边
		deltaX = 2
	}else if (inList(leftList,end,start)) { // 3号线左边
		deltaX = -2
	}else if (inList(upList,start,end)) { // 4号线上边
		deltaY = 2
	}else if (inList(upList,end,start)) { // 3号线上边
		deltaY = -2
	}

	if (type=='x1') {
		return x(parseFloat(stations[start]['X'])) + deltaX
	}else if (type=='x2') {
		return x(parseFloat(stations[end]['X'])) + deltaX
	}else if (type=='y1') {
		return y(parseFloat(stations[start]['Y'])) + deltaY
	}else if (type=='y2') {
		return y(parseFloat(stations[end]['Y'])) + deltaY
	}
}


function getClock(i=0){
		time = timeIndex*10 + 270 +5*i
		minute=time%60;
		hour=(time-minute)/60;
		if (hour<10) {hour = '0'+hour};
		if (minute==5) {minute = '05'}
		else if (minute == 0) {minute = '00'};

		return  hour+':'+minute
}

        
function drawSubwayMap(){
	console.log('~~~')

	d3.select("#mainGraph").select("svg").remove();
	var zoom = d3.behavior.zoom().scaleExtent([1, 10]).on("zoom", zoomed);
	var drag = d3.behavior.drag().on("drag", dragmove); 
	
	var r = d3.scale.sqrt().domain([0, 500]).range([0, 30]);
	// var opacity_scaler = d3.scale.linear().domain([0, 500]).range([0.3, 0.8]);

	var svg = d3.select("#mainGraph").append("svg")
	        .attr("width", $("#mainGraph").width())
	        .attr("height", $("#mainGraph").height())
        .call(zoom)
        .call(drag)



	var margin = {top: 20, right: 30, left: 30, bottom: 20};
	var width = $("#mainGraph").width() - margin.left - margin.right;
	var height = $("#mainGraph").height() - margin.top - margin.bottom;



	var x = d3.scale.linear().domain([-900, 800]).range([0, width]);
	var y = d3.scale.linear().domain([-700, 800]).range([0, height]);


	leftList = ['宜山路','虹桥路','延安西路','中山公园','金沙江路','曹杨路'];
	upList = ["曹杨路","镇坪路","中潭路","上海火车站","宝山路",'海伦路'];
  
  
    var circleTip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-3, 0]) 
		.html(function(d) {
			text = "<strong> 站名 : </strong> <span style='color:orange'>" + d + "&nbsp 🚉 </span></br>" +
				"<strong> 时间 : </strong> <span style='color:orange'>" + getClock(-1)+'~'+getClock(1)+ "</span></br>" +
				"<strong>进站客流 : </strong> <span style='color:orange'>" + stations[d][dayType]['inCount'][timeIndex] + "</span></br>" +
		   		"<strong>出站客流 : </strong> <span style='color:orange'>"+ stations[d][dayType]['outCount'][timeIndex]+"</span></br>"
	   		if (stations[d][dayType]['transferCount'][timeIndex]==0) {return text};
			return text + "<strong>换乘客流:</strong> <span style='color:orange'>"+ stations[d][dayType]['transferCount'][timeIndex]+"</span></br>"
		});
	svg.call(circleTip)

	var connectionTip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-3, 0]) 
		.html(function(d) {
			text = "<span style='color:orange'> 🚞 🚃 🚃 🚃 &nbsp " + d[2] + "</span><strong> 号线 </strong> </br>"+
				"<strong> 时间 : </strong> <span style='color:orange'>" + getClock(-1)+'~'+getClock(1)+ "</span></br>" +
				"<strong> 从 </strong> <span style='color:orange'>" +d[0]+ "</span><strong> 到 </strong> <span style='color:orange'>" +d[1]+ "</span><strong> : </strong><span style='color:orange'>" + d[3][dayType]['positive'][timeIndex] + "</span></br>" + 
				"<strong> 从 </strong> <span style='color:orange'>" +d[1]+ "</span><strong> 到 </strong> <span style='color:orange'>" +d[0]+ "</span><strong> : </strong><span style='color:orange'>" + d[3][dayType]['negative'][timeIndex] + "</span></br>"
			return text
		});
	svg.call(connectionTip)



	svg.selectAll("line.route")
		.data(connections)
		.enter()
		.append("svg:line")
		.attr("class", "route")
		.attr("stroke-width", 3)
		.attr("id", function(d) { return d[0] + "-" + d[1]; })
		// .attr("stroke", function(d){ return computeColor(colorLinear(d[3]['weekday']['positive'][timeIndex])*1); })
		.attr("stroke-linecap", "round")
		.attr("x1", function(d) { return checkMeizi(d[0],d[1],d[2],'x1',x,y) })
		.attr("y1", function(d) { return checkMeizi(d[0],d[1],d[2],'y1',x,y) })
		.attr("x2", function(d) { return checkMeizi(d[0],d[1],d[2],'x2',x,y) })
		.attr("y2", function(d) { return checkMeizi(d[0],d[1],d[2],'y2',x,y) })
		.on('click',function(d){
			// console.log(d)
			if (selectedLine == d[2]) {	selectedLine = '' }
			else{	selectedLine = d[2] }
			updateSubwayMapColor()
			drawLinesFlow(d)
			change(d);

		})
		.on('mouseover', connectionTip.show)
		.on('mouseout', connectionTip.hide);


	svg.selectAll("circle.station")
		.data(Object.keys(stations))
		.enter()
		.append("svg:circle")
		.attr("class", "station")
		.attr("id", function(d){ return d; })
		.attr("cx", function(d){ return x(parseFloat(stations[d]['X'])) ;})
		.attr("cy", function(d){ return y(parseFloat(stations[d]['Y'])) ;})
		// .attr("r",  function(d){ return Math.sqrt(parseFloat(stations[d]['weekday']['inCount'][timeIndex])*1) ;})
		// .style("stroke", "grey")
		.attr("fill-opacity",0.6)
		.style("fill", function(d){	return LINE_COLOR[stations[d]['LINE_NO']]	})
		.on('click',function(d){
			if (stations[d][dayType]['transferCount'][40] == 0) {
				if (selectedLine == stations[d]['LINE_NO']) {	selectedLine = '' }
				else{	selectedLine = stations[d]['LINE_NO'] }
			}else {
				if (selectedLine != '') {
					selectedLine = ''
				};
			};
			// console.log(stations[d])
			updateSubwayMapColor()
			stationsflow(d,stations[d]);
		})
		.on('mouseover', circleTip.show)
		.on('mouseout', circleTip.hide);

	stationName = svg.selectAll(".stationName")
          .data(Object.keys(stations))
          .enter().append("text")
            .text(function(d) { return d; })
            .style("font-size","6px")
            .attr("transform", function(d){ return "translate(" + (x(parseFloat(stations[d]['X']))+3)+ ", "+ (y(parseFloat(stations[d]['Y'])) - 3) + ")";})

	// console.log('~~~')





var xPosition = $("#mainGraph").width()*2.5/100+20;
	var yPosition = $("#mainGraph").height()*8/100;

	// var testx = $("#mainGraph").width()/100
	// var testy = $("#mainGraph").height()/100
// console.log(testx)
// console.log(testy)

	var xpingyi = $("#mainGraph").width()*6/100
	var ypingyi = $("#mainGraph").height()*5/100


	svg.selectAll("circle.legend")
		.data([500,2500,5000])
		.enter()
		.append("circle")
		.attr("id", "circleLegend")
		// .attr("id", function(d){ return d; })
		.attr("cx", function(d,i){ return xPosition+xpingyi*i ;})
		.attr("cy",yPosition)
		// .attr("r",  function(d){ return Math.sqrt(parseFloat(stations[d]['weekday']['inCount'][timeIndex])*1) ;})
		.style("stroke", "white")
		// .attr("fill-opacity",0.6)
		// .attr("fill","#f3e59a");



 	drawColorScale(svg)
   	updateSubwayMap()
   	updateSubwayMapColor()
   	drawCircle(svg)
}





function computeColor(i){
	// 10,40,80,95
	i = i/8000*10000

	var computeColor0 = d3.interpolate(getColorStandard(0),getColorStandard(1));
	var computeColor1 = d3.interpolate(getColorStandard(1),getColorStandard(2));
	var computeColor2 = d3.interpolate(getColorStandard(2),getColorStandard(3));

	if (i<500) {return getColorStandard(0)}
	else if (i<4000) {return computeColor0((i-1000)/3500)}
	else if (i<8000) {return computeColor1((i-4000)/4000)}
	else if (i<9500) {return computeColor2((i-8000)/1500)}
	else {return getColorStandard(3)}	 

}




//下面这三个连着的function是画尺度变换的圈圈
function drawCircle(svg){
	
	var xPosition = $("#mainGraph").width()*5/100+20;
	var yPosition = $("#mainGraph").height()*5/100;

	// var testx = $("#mainGraph").width()/100
	// var testy = $("#mainGraph").height()/100
// console.log(testx)
// console.log(testy)

	var xpingyi = $("#mainGraph").width()*6/100
	var ypingyi = $("#mainGraph").height()*5/100
	var r1 = Math.sqrt((500+300)/6.15/Math.PI)
	var r2 = Math.sqrt((2500+300)/6.15/Math.PI)
	var r3 = Math.sqrt((5000+300)/6.15/Math.PI)
	var data1 = '<500'
	var data2 = '2500';
	var data3 = '5000';


// //加圈圈下面的字儿
writeCircleCharacters(xPosition-9,yPosition+ypingyi,data1,svg)
writeCircleCharacters(xPosition+xpingyi-12,yPosition+ypingyi,data2,svg)
writeCircleCharacters(xPosition+xpingyi*2-12,yPosition+ypingyi,data3,svg)

}

function writeCircleCharacters(xPosition,yPosition,r,svg){
    svg.selectAll('.Timer').data([r]).enter().append('text')
    	.attr("x", xPosition-18)
        .attr("y", yPosition-4.5)
        .attr("dy", "-0.3em")
        .text(function(d){return d})
}





//这三个function组合起来都是画比例尺的
function drawColorScale(svg){
    var kuandu = $("#mainGraph").width()*4/100
    // var height = $("#mainGraph").height()*32.5/100

//添加矩形

drawColorScaleRect(svg)

//添加文字
	character1 = '<100'
	character2 = '2000'
	character3 = '4000'
	character4 = '6000'
	character5 = '>8000'
	y = $("#mainGraph").height()*84/100 - 3
	writeColorScaleCharacter(svg,character1,6,y)
	writeColorScaleCharacter(svg,character2,6+kuandu,y)
	writeColorScaleCharacter(svg,character3,6+kuandu*2,y)
	writeColorScaleCharacter(svg,character4,6+kuandu*3,y)
	writeColorScaleCharacter(svg,character5,6+kuandu*4,y)
}

function getColorStandard(i){
	color = [d3.rgb(39,235,25), d3.rgb(255,158,0), d3.rgb(255,0,0), d3.rgb(167,0,15)]
	return color[i]
}

function drawColorScaleRect(svg){
	var defs = svg.append("defs");
	var linearGradient = defs.append("linearGradient").attr("id","linearColor")
								.attr("x1","0%").attr("y1","0%").attr("x2","100%").attr("y2","0%");

	linearGradient.append("stop").attr("offset","5%").style("stop-color",getColorStandard(0).toString());
	linearGradient.append("stop").attr("offset","40%").style("stop-color",getColorStandard(1).toString());
	linearGradient.append("stop").attr("offset","80%").style("stop-color",getColorStandard(2).toString());
	linearGradient.append("stop").attr("offset","95%").style("stop-color",getColorStandard(3).toString());

    var kuandu = $("#mainGraph").width()*17/100
    var height = $("#mainGraph").height()*32.5/100
	var y = $("#mainGraph").height()*84/100
    var colorRect = svg.append("rect")
        .attr("x", 30)
        .attr("y", y)
        .attr("width", kuandu)
        .attr("height", 10)
        .style("fill","url(#" + linearGradient.attr("id") + ")");

}
function writeColorScaleCharacter(svg,character,x,y){
    svg.selectAll('.Timer').data([character]).enter().append('text')
	.attr("x", x+10)
    .attr("y", y)
    .attr("dy", "-0.3em")
    .attr('id','colorScale')
    .text(function(d){return d})

}






function drawClock(){
	// console.log('qwe')
	var svg = d3.select("#clockGraph").append("svg")
	        .attr("width", $("#clockGraph").width())
	        .attr("height", $("#clockGraph").height())

	svg.selectAll('.Timer').data([timeIndex]).enter().append('text')
			// .text(function(d){return d})
    		.attr("transform", "translate("+40+","+60+")" )
    		.style("font-size","40px")
    		.attr('id','clock')
    updateClock()

}

function updateClock(){
	d3.select("#clockGraph").selectAll("text")
		.text(function(d){	return getClock()})
}	

function updateSubwayMap(){
	updateClock()
	d3.select("#mainGraph").selectAll("circle").transition().duration(80)
			.attr("r",  function(d){ 
				if (this.id != 'circleLegend') {
					if (countList.length == 0) {return 2}
					else{
						temp = 0
						for (var i = 0; i < countList.length; i++) {
							temp += parseFloat(stations[d][dayType][countList[i]][timeIndex])
						};
						return Math.sqrt((temp+100)/6.15/Math.PI) 
					};
				}else{
					return Math.sqrt((d+100)/6.15/Math.PI)
				}
			});
	d3.select("#mainGraph").selectAll("line").transition().duration(80)
			.attr("stroke", function(d){ return computeColor((d[3][dayType]['positive'][timeIndex]+d[3][dayType]['negative'][timeIndex])/1); })
}

function updateSubwayMapColor(){
	d3.select("#mainGraph").selectAll("line")
		.attr("stroke-opacity", function(d){ 
			if (selectedLine =='') {return 1}
			if (d[2]==selectedLine) {return 1}
			else{ return 0.2}
		 })

	d3.select("#mainGraph").selectAll("circle")
		.attr("fill-opacity", function(d){ 
			if (this.id != 'circleLegend') {
				if (selectedLine =='') {return 0.618}
				else{
					if (selectedLine == '11') {
						if (linesInfo['11'].hasObj(d) || linesInfo['11zhi'].hasObj(d)) {
							return 0.618
						};
					}else if (selectedLine == '10') {
						if (linesInfo['10'].hasObj(d) || linesInfo['10zhi'].hasObj(d)) {
							return 0.618
						};
					}else{
						if (linesInfo[selectedLine].hasObj(d)) {
							return 0.618
						};
					}
					return 0.2
				}
			}else{
				return 1
			}
		 })
		.style("fill", function(d){ 
			if (this.id != 'circleLegend') {
				if (selectedLine == '11') {
					if (linesInfo['11'].hasObj(d) || linesInfo['11zhi'].hasObj(d)) {
						return LINE_COLOR['11']
					};
				}else if (selectedLine == '10') {
					if (linesInfo['10'].hasObj(d) || linesInfo['10zhi'].hasObj(d)) {
						return LINE_COLOR['10']
					};
				}else if (selectedLine != ''){
					if (linesInfo[selectedLine].hasObj(d)) {
						return LINE_COLOR[selectedLine]
					};
				}
				return LINE_COLOR[stations[d]['LINE_NO']]
			}else{
				return '#f29c9c'
			}
		 })
	updateCircles();
}


function zoomed() {
	d3.select(this).attr("transform", 
		"translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}
function dragmove(d) {	
	// d3.select(this)
	//   .attr("width", d.width = d3.event.x )
	//   .attr("height", d.height = d3.event.y );
}
