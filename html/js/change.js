var positiveDown1 =0;
var y22Scale;
var y11Scale
var height1;
var dataset11 ;
var dataset22;
var dataset55;
var dataset44;
var dataaa
var changex2Scale ;
function change(data){
	dataaa = data;
	d3.select("#change").select("svg").remove();
	//画布大小
	var padding = {left:40, right:30, top:20, bottom:20};
        width = $("#change").width() - padding.left - padding.right,
    height = $("#change").height() - padding.top - padding.bottom;
 height1 = height;
	// 加一个SVG画布
    var svg = d3.select("#change").append("svg")
        .attr("width", $("#change").width())
        .attr("height", $("#change").height());

  


	var color = ['steelblue','pink','purple '];
		var label = ['正向','反向'];
	var idd = ['rectpo','rectne']
	// console.log(color[0]);
	for (var i = 2 - 1; i >= 0; i--) {
		svg.append("rect")
			.attr('id',idd[i])
	        .attr("width",10)
	        .attr("height",8)
	        .attr("transform","translate(" + (padding.left*0.65+width) + "," + (padding.top*2+10*(i+1)) + ")")
	        .attr("fill",color[i]);	

	    svg.append('text')
  		.text(label[i])
  		.attr('transform', 'translate(' + (padding.right*1.4+width) + ', ' + (padding.top*2.35+10*(i+1)) + ')');		
	};

   var  stationstart = data[0];
   var  stationend = data[1];

   svg.append("text")
    .text("从")
    .attr("transform","translate(" + (padding.right+width*0.5-47) + "," + (padding.top - 6)+ ")");
   svg.append("text")
    .text(stationstart)
    .attr("transform","translate(" + (padding.right+width*0.5-35) + "," + (padding.top -6)+ ")");
   svg.append("text")
    .text("到")
    .attr("transform","translate(" + (padding.right+width*0.5-47) + "," + (padding.top +7) + ")");
   svg.append("text")
    .text(stationend)
    .attr("transform","translate(" + (padding.right+width*0.5-35) + "," + (padding.top+7) + ")");

var linenumber = data[2];
    svg.append("text")
    .text(linenumber)
    .attr("transform","translate(" + (padding.right+width*0.5-82) + "," + padding.top + ")");
svg.append("text")
    .text("号线")
    .attr("transform","translate(" + (padding.right+width*0.5-72) + "," + padding.top + ")");

   svg.append("text")
    .text("客流量随时间变化")
    .attr("transform","translate(" + (padding.right+width*0.5+35) + "," + padding.top + ")");

   svg.append("text")
    .text("周内")
    .attr("transform","translate(" + (padding.right+width) + "," + padding.top + ")");

   svg.append("text")
    .text("周末")
    .attr("transform","translate(" + (padding.right+width) + "," + (padding.top+height-10) + ")");

   	svg.append('text')
  		.text('时间')
  		.attr('transform', 'translate(' + (padding.right*1.5+width) + ', ' + (padding.top+height*0.53) + ')');
var dataset1 = [];
var dataset4 = [];
var dataset2 = [];
var dataset5 = [];
data = data[3];
dataweekday = data.weekday;
dataweekend = data.weekend;
dataweekdaypo = dataweekday.positive;
dataweekdayne = dataweekday.negative;
dataweekendpo = dataweekend.positive;
dataweekendne = dataweekend.negative;
dataset1 = dataweekdaypo;
dataset2 = dataweekdayne;
dataset4 = dataweekendpo;
dataset5 = dataweekendne;
dataset44= dataset4;
dataset11= dataset1;
dataset22 = dataset2; 
dataset55 = dataset5;
var xData = ["5:30","7:30","9:30","11:30","13:30","15:30","17:30","19:30","21:30","23:30",];
	//x轴的比例尺
	var xScale = d3.scale.ordinal()
		.domain(d3.range(xData.length))
		.rangeRoundBands([0, width ]);
// console.log(xScale.rangeBand());
	var x2Scale = d3.scale.ordinal()
		.domain(d3.range(dataset1.length))
		.rangeRoundBands([0, width]);
		changex2Scale = x2Scale;
// 折线的比例尺
// console.log(max1);
	// var max2 = (d3.max(xData)-d3.min(xData))*12;
	// console.log(max2);

	// var x1Scale = d3.scale.linear()
	// 	.domain([0,max1])
	// 	.range([0, width - xScale.rangeBand() ]);

	//y轴的比例尺

	var datasetmax1 = d3.max(dataset1) + d3.max(dataset2);

	var datasetmax2 = d3.max(dataset4) + d3.max(dataset5);
// console.log(datasetmax1);
 var datasetmax = d3.max([datasetmax1,datasetmax2]);
	var y1Scale = d3.scale.linear()
		.domain([0,datasetmax])
		.range([(height)*0.5, 0]);

y11Scale = y1Scale;
y2Scale = d3.scale.linear()
		.domain([0,datasetmax])
		.range([ 0, (height)*0.5]);
y22Scale = y2Scale;
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.ticks(xData.length);

	//定义y轴
	var y1Axis = d3.svg.axis()
		.scale(y1Scale)
		.orient("left")
		.ticks(4);
	var y2Axis = d3.svg.axis()
		.scale(y2Scale)
		.orient("left")
		.ticks(4);
//添加x轴

svg.append("g")
		.attr("class","paa axis")
		.attr("transform","translate(" + padding.left + "," + (height + padding.bottom -5 ) + ")")
		.call(xAxis); 

var time0 = svg.selectAll(".labeltime")
            .data(xData)
            .enter().append("text")
	        .text(function(d) { return d; })
	        .style("text-anchor", "start")
	        .style("dominant-baseline", "text-before-edge")
	        .attr("transform", function(d, i){ 
	        	return "translate(" + (xScale(i)+padding.left+xScale.rangeBand()*0.3)+ ", "+ (padding.top+height+2) + ")";})
	        .attr("class", "labeltime");
	//添加y轴
	svg.append("g")
		.attr("class","pa axis")
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.call(y1Axis)
		.append('text')
  		.text('客流量 (人次/10分钟)')
  		.attr('transform', 'translate(' + (-padding.left*0.6) + ', ' + (-padding.top*0.3) + ')');

		// console.log(y2Scale(d3.max(dataset)));
	svg.append("g")
		.attr("class","pa axis")
		.attr("transform","translate(" + padding.left + "," + (padding.top + 0.5*height)+ ")")
		.call(y2Axis);
	

	//柱形的x轴的比例尺


	// //y轴的比例尺
	// var yScale = d3.scale.linear()
	// 	.domain([0,d3.max(dataset)])
	// 	.range([height - padding.top - padding.bottom, 0]);

	//定义x轴
	// var xAxis = d3.svg.axis()
	// 	.scale(xScale)
	// 	.orient("bottom");
		
	// //定义y轴
	// var yAxis = d3.svg.axis()
	// 	.scale(yScale)
	// 	.orient("left");

	//矩形之间的空白
	var rectPadding = 0;
	var rects1 = svg.selectAll(".MyRect1")
		.data(dataset1)
		.enter()
		.append("rect")
		.attr("class","MyRect1")
		.attr("transform","translate(" + (padding.left )+ "," + padding.top + ")")
		.attr('id','Rect1')
		.attr("x", function(d,i){
			if(i==0){
				return 0;
			}
			return x2Scale(i-1) + rectPadding/2;
		} )
	
		.attr("width", x2Scale.rangeBand() - rectPadding )
		.attr("height", function(d){
			// if(click1 == 1){
			// 	return (height)/2 - y1Scale(d);
			// }else{
			return (height)/2 - y1Scale(d);
			// }
		})
		.attr("fill","#9fe0f6")
		.on("mouseover",function(){
			// MyRect1mouseover = 1;
			// selectingSchool.push(SchoolName[d3.select(this)[0][0].textContent])
			// console.log("right:",)
			id = 'Rect1';
			updatechange(1);
			// change_tip.show;
		})
		.on("mouseout",function(){
			// MyRect1mouseover = 0;
			id = 1;
			updatechange(1);
			// change_tip.hide;
		}) 
		
	var rects2 = svg.selectAll(".MyRect2")
		.data(dataset2)
		.enter()
		.append("rect")
		.attr("class","MyRect2")
		.attr('id','Rect2')
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.attr("x", function(d,i){
			if(i==0){
				return 0;
			}
			return x2Scale(i-1) + rectPadding/2;
		} )
		// .attr("y",function(d,i){
		// 	var y1 = y1Scale(d+dataset1[i]);				
		// 	return y1;			
		// })
		.attr("width", x2Scale.rangeBand() - rectPadding )
		.attr("height", function(d){
			// if(click1 == 1){
			// 	return (height)/2 - y1Scale(d);
			// }else{
			return (height)/2 - y1Scale(d);
			// }
		})
		.attr("fill","#f29c9c")
		.on("mouseover",function(){
			id = 'Rect2';
			updatechange(1);
			// change_tip.show;
		})
		.on("mouseout",function(){
			id = 1;
			updatechange(1);
			// change_tip.hide;
		})  
		// .on('mouseover',change_tip.show)
	 //    .on('mouseout', change_tip.hide);

// console.log(dataset4);
	var rects3 = svg.selectAll(".MyRect3")
		.data(dataset4)
		.enter()
		.append("rect")
		.attr("class","MyRect3")
		.attr('id','Rect3')
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.attr("x", function(d,i){
			if(i==0){
			return 0;
			}
			return x2Scale(i-1) + rectPadding/2;
		} )
		// .attr("y",function(d){
		// 	return  (height)/2  ;
		// })
		.attr("width", x2Scale.rangeBand() - rectPadding )
		.attr("height", function(d){
			return  y2Scale(d);
		})
		.attr("fill","#9fe0f6") 
		.on("mouseover",function(){
			id = 'Rect3';
			updatechange(1);
			// change_tip.show;
		})
		.on("mouseout",function(){
			id = 1;
			updatechange(1);
			// change_tip.hide;
		}) 
		// .on('mouseover',change_tip.show)
	 //    .on('mouseout', change_tip.hide);
// console.log(dataset5);
	var rects4 = svg.selectAll(".MyRect4")
		.data(dataset5)
		.enter()
		.append("rect")
		.attr("class","MyRect4")
		.attr('id','Rect4')
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.attr("x", function(d,i){
			if(i==0){
				return 0;
			}
			return x2Scale(i-1) + rectPadding/2;
		} )
		// .attr("y",function(d,i){
		// 	var y1 = y2Scale(dataset4[i]);
		// 	// console.log(dataset1[i]);			
		// 	return y1+(height)/2 ;
		// })
		.attr("width", x2Scale.rangeBand() - rectPadding )
		.attr("height", function(d){
			return y2Scale(d);
		})
		.attr("fill","#f29c9c")
		.on("mouseover",function(){
			id = 'Rect4';
			updatechange(1);
			// change_tip.show;
		})
		.on("mouseout",function(){
			id = 1;
			updatechange(1);
			// change_tip.hide;
		}) 

svg.selectAll("rect")
		.on('click',function(){
        	if (this.id == 'Rect1' || this.id == 'Rect3'){
        		// console.log(1)
        		positiveDown1 = 1
        	}else{
        		// console.log(2)
        		positiveDown1 = 0
        	}
        	 change(dataaa);
        })

 svg.append('text')
  			.attr("id","text_tip1")
  			.attr("fill","#9fe0f6")
			.text(function(){	
				return 0
			})
			.style("font-size","13px")
			.attr("transform","translate(" + padding.left + "," + padding.top*2 + ")")
 svg.append('text')
  			.attr("id","text_tip2")
  			.attr("fill","#f29c9c")
			.text(function(){	
				return 0
			})
			.style("font-size","13px")
			.attr("transform","translate(" + padding.left + "," + (padding.top*2+15) + ")")
 svg.append('text')
  			.attr("id","text_tip3")
  			.attr("fill","#9fe0f6")
			.text(function(){	
				return 0
			})
			.style("font-size","13px")
			.attr("transform","translate(" + padding.left + "," + (padding.top*2+height*0.8) + ")")
 svg.append('text')
  			.attr("id","text_tip4")
  			.attr("fill","#f29c9c")
			.text(function(){	
				return 0
			})
			.style("font-size","13px")
			.attr("transform","translate(" + padding.left + "," + (padding.top*2-15+height*0.8) + ")")
updatechangeclick();
updatechange(timeIndex);
// 后画轴
svg.append("g")
		.attr("class","sc axis")
		.attr("transform","translate(" + padding.left + "," + (height*0.5 + padding.bottom ) + ")")
		.call(xAxis); 
}
var id = '0';
function updatechange(data = 1){
	if(id == 1){
		d3.select("#change").selectAll("rect")
		.style("fill-opacity",function(d,i){
			return 1;
		})
		id = 0;
	}
	else if(id == 'Rect3'|| id == 'Rect1'||id == 'rectpo'){
		// console.log(1);
	d3.select("#change").selectAll("rect")
	.style("fill-opacity",function(d,i){
		if(this.id == 'Rect3'||this.id == 'Rect1'||this.id == 'rectpo'){
			return 1;}
			 else {
			 // console.log("````");	
			return 0.2;
		};
		})
	id = '0';
		}
	else if(id == 'Rect2'|| id == 'Rect4'||id == 'rectne'){
		// console.log(1);
	d3.select("#change").selectAll("rect")
	.style("fill-opacity",function(d,i){
		if(this.id == 'Rect2'||this.id == 'Rect4'||this.id == 'rectne'){
			return 1;}
			 else {
			 // console.log("````");	
			return 0.2;
		};
		})
	id = '0';
		}

d3.select("#change").selectAll("rect")
		// .transition().duration(delay)
		.attr('fill',function(d,i){
			if (timeIndex == (i-1)%117) {return 'yellow'}
			else {	
				if(this.id == 'Rect1'||this.id == 'Rect3'){
				return '#9fe0f6'}
				else if(this.id == 'Rect2'||this.id == 'Rect4'){
				return '#f29c9c'}
				else if(this.id == 'rectpo'){
				return '#9fe0f6'}
				else if(this.id == 'rectne'){
				return '#f29c9c'}
			}
		})

d3.select("#change").select("text#text_tip1")
		.text(function(){		
			return dataset11[timeIndex]		
		})
		.attr('x',function(){
			return changex2Scale(timeIndex)-20
		})
d3.select("#change").select("text#text_tip2")
		.text(function(){		
			return dataset22[timeIndex]		
		})
		.attr('x',function(){
			return changex2Scale(timeIndex)-20
		})
d3.select("#change").select("text#text_tip3")
		.text(function(){		
			return dataset44[timeIndex]		
		})
		.attr('x',function(){
			return changex2Scale(timeIndex)-20
		})
d3.select("#change").select("text#text_tip4")
		.text(function(){		
			return dataset55[timeIndex]		
		})
		.attr('x',function(){
			return changex2Scale(timeIndex)-20
		})	


}

function updatechangeclick(){
// console.log(dataset11)
// console.log(dataset44)
// console.log(dataaa)
	d3.select("#change").selectAll("rect")
		.attr('y',function(d,i){
			// console.log(i)
			if (positiveDown1 == 0 ) {
				// console.log("~~~1111~")
				if (this.id == 'Rect1' ) { return y11Scale(d+dataset22[(i-2)%117]); }
				else if (this.id == 'Rect2' ) { return y11Scale(d); }
				else if (this.id == 'Rect3' ) { return y2Scale(dataset55[(i-2)%117])+(height1)/2}
				else if (this.id == 'Rect4' ) { return (height1)/2 ; }	
			}else{
				// console.log("~~2222~~")
				if (this.id == 'Rect1' ) { return y11Scale(d); }
				else if (this.id == 'Rect2' ) { return y11Scale(d+dataset11[(i-2)%117]);}
				else if (this.id == 'Rect3' ) { return (height1)/2 ; }
				else if (this.id == 'Rect4' ) { return y22Scale(dataset44[(i-2)%117])+(height1)/2 ;}
			}			
		})
		
}