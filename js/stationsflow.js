var iddd = 0;
var positiveDown2 =0;
var y12Scale
var y22Scale
var staScale
var height2
var dataset1sta
var dataset2sta
var dataset3sta
var dataset6sta
var dataset4sta
var dataset5sta
var indexdataset3;
function stationsflow(data1,data2){
	// console.log(data1,data2);
	// dataj = data1;
	// datajj = data2;
	d3.select("#stationsflow").select("svg").remove();
	//画布大小
	var padding = {left:40, right:30, top:20, bottom:20};
        width = $("#stationsflow").width() - padding.left - padding.right,
        height = $("#stationsflow").height() - padding.top - padding.bottom;
 height2 = height;
	// 加一个SVG画布
    var svg = d3.select("#stationsflow").append("svg")
        .attr("width", $("#stationsflow").width())
        .attr("height", $("#stationsflow").height());

   var  station = data1;
   svg.append("text")
    .text(station)
    .attr("transform","translate(" + (padding.right+width*0.5-35) + "," + padding.top + ")");
   svg.append("text")
    .text("站客流量随时间变化")
    .attr("transform","translate(" + (padding.right+width*0.5+35) + "," + padding.top + ")");
   svg.append("text")
    .text("周内")
    .attr("transform","translate(" + (padding.right+width) + "," + padding.top + ")");

   svg.append("text")
    .text("周末")
    .attr("transform","translate(" + (padding.right+width) + "," + (padding.top+height) + ")");

   svg.append('text')
  		.text('时间')
  		.attr('transform', 'translate(' + (padding.right*1.5+width) + ', ' + (padding.top+height*0.55) + ')');
	var color = ['#f29c9c','red','#9fe0f6 '];
	var label = ['进站','出站','换乘'];
	//定义一个数组
	var dataset1 = [];
	var dataset2 = [];
	var dataset3 = [];
	var dataset4 = [];
	var dataset5 = [];
	var dataset6 = [];
	var dataweekdaytrindexstart = [];
	var dataweekendtrindexstart = [];
	var dataweekdaytrindexend = [];
	var dataweekendtrindexend = [];
	

dataweekday = data2.weekday;
dataweekend = data2.weekend;

dataweekdayin = dataweekday.inCount;
dataweekdayout = dataweekday.outCount;
dataweekdaytr = dataweekday.transferCount;
dataweekendin = dataweekend.inCount;
dataweekendout = dataweekend.outCount;
dataweekendtr = dataweekend.transferCount;

dataset1 = dataweekdayin; 
dataset2 = dataweekdayout; 
dataset3 = dataweekdaytr; 
dataset4 = dataweekendin; 
dataset5 = dataweekendout; 
dataset6 = dataweekendtr; 

if (d3.max(dataset3)==0){
	dataset3 = [0];
	indexdataset3 = 0;
}else{
	indexdataset3 = 1;
}
if (d3.max(dataset6)==0){
	dataset6 = [0];
}

dataset1sta = dataset1
dataset2sta = dataset2
dataset4sta = dataset4
dataset5sta = dataset5
dataset3sta = dataset3
dataset6sta = dataset6
var xData = ["5:30","7:30","9:30","11:30","13:30","15:30","17:30","19:30","21:30","23:30",];
	//x轴的比例尺
var xScale = d3.scale.ordinal()
		.domain(d3.range(xData.length))
		.rangeRoundBands([0, width ]);

var x2Scale = d3.scale.ordinal()
		.domain(d3.range(dataset1.length))
		.rangeRoundBands([0, width ]);
staScale = x2Scale
var datasetmax1 = d3.max(dataset1) + d3.max(dataset2)+d3.max(dataset3);
var datasetmax2 = d3.max(dataset4) + d3.max(dataset5)+ d3.max(dataset6);
var datasetmax = d3.max([datasetmax1,datasetmax2]);
var y1Scale = d3.scale.linear()
		.domain([0,datasetmax])
		.range([(height)*0.5, 0]);
var y2Scale = d3.scale.linear()
		.domain([0,datasetmax])
		.range([ 0, (height)*0.5]);
y12Scale = y1Scale;
y22Scale = y2Scale;
	//定义x轴
var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom")
		.ticks(xData.length);
		
//定义y轴
	var y1Axis = d3.svg.axis()
		.scale(y1Scale)
		.orient("left")
		.ticks(5);
	var y2Axis = d3.svg.axis()
		.scale(y2Scale)
		.orient("left")
		.ticks(5);
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
svg.append("g")
		.attr("class","pa axis")
		.attr("transform","translate(" + padding.left + "," + (padding.top + 0.5*height)+ ")")
		.call(y2Axis);
var rectPadding = 0;
	//添加矩形元素

var rects1 = svg.selectAll(".MyRect11")
		.data(dataset1)
		.enter()
		.append("rect")
		.attr("class","MyRect11")
		.attr('id','Rect1')
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.attr("x", function(d,i){
			if(i==0){
				return 0;
			}
			return x2Scale(i-1) + rectPadding/2;
		})
		// .attr("y",function(d){
		// 	return y1Scale(d);
		// })
		.attr("width", x2Scale.rangeBand() - rectPadding )
		.attr("height", function(d){
			return (height)/2 - y1Scale(d);
		})
		.attr("fill","#f29c9c")
		.on("mouseover",function(){
			iddd = 'Rect1';
			updatestationsflow();
		})
		.on("mouseout",function(){
			iddd = 1;
			updatestationsflow();
		});

var rects2 = svg.selectAll(".My Rect")
		.data(dataset2)
		.enter()
		.append("rect")
		.attr("class","My Rect")
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
		// 	// console.log(dataset1[i]);			
		// 	return y1;
		// }
		.attr("width", x2Scale.rangeBand() - rectPadding )
		.attr("height", function(d){
			return (height)/2 - y1Scale(d);
		})
		.attr("fill","#9d7bc8") 
		.on("mouseover",function(){
			iddd = 'Rect2';
			updatestationsflow();
		})
		.on("mouseout",function(){
			iddd = 1;
			updatestationsflow();
		});

if(indexdataset3){
var rects3 = svg.selectAll(".My Rect0")
		.data(dataset3)
		.enter()
		.append("rect")
		.attr("class","My Rect0")
		.attr('id','Rect3')
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.attr("x", function(d,i){
			if(i==0){
				return 0;
			}
			return x2Scale(i-1) + rectPadding/2;
		} )
		// .attr("y",function(d,i){
		// 	var y1 = y1Scale(d+dataset1[i]+dataset2[i]);
		// 	// console.log(dataset1[i]);			
		// 	return y1;
		// })
		.attr("width", x2Scale.rangeBand() - rectPadding )
		.attr("height", function(d){
			return (height)/2 - y1Scale(d);
		})
		.attr("fill","#9fe0f6")
		.on("mouseover",function(){
			iddd = 'Rect3';
			updatestationsflow();
		})
		.on("mouseout",function(){
			iddd = 1;
			updatestationsflow();
		})  ;
}

	var rects4 = svg.selectAll(".MyRect1")
		.data(dataset4)
		.enter()
		.append("rect")
		.attr("class","MyRect1")
		.attr('id','Rect4')
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
			iddd = 'Rect4';
			updatestationsflow();
		})
		.on("mouseout",function(){
			iddd = 1;
			updatestationsflow();
		}) ;

	var rects5 = svg.selectAll(".My Rect1")
		.data(dataset5)
		.enter()
		.append("rect")
		.attr("class","My Rect1")
		.attr('id','Rect5')
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.attr("x", function(d,i){
			if(i==0)
				return 0;
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
		.attr("fill","#9d7bc8") 
		.on("mouseover",function(){
			iddd = 'Rect5';
			updatestationsflow();
		})
		.on("mouseout",function(){
			iddd = 1 ;
			updatestationsflow();
		}) ;

if(indexdataset3){
var rects6 = svg.selectAll(".My Rect2")
		.data(dataset6)
		.enter()
		.append("rect")
		.attr("class","My Rect2")
		.attr('id','Rect6')
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.attr("x", function(d,i){
			if(i==0){
				return 0;
			}
			return x2Scale(i-1) + rectPadding/2;
		} )
		// .attr("y",function(d,i){
		// 	var y1 = y2Scale(dataset4[i]+dataset5[i]);
		// 	// console.log(dataset1[i]);			
		// 	return y1+(height)/2 ;
		// })
		.attr("width", x2Scale.rangeBand() - rectPadding )
		.attr("height", function(d){
			return y2Scale(d);
		})
		.attr("fill","#f29c9c") 
		.on("mouseover",function(){
			iddd = 'Rect6';
			updatestationsflow();
		})
		.on("mouseout",function(){
			iddd = 1;
			updatestationsflow();
		}) ;
	}


svg.append('text')
  			.attr("id","text_tip1")
  			.attr("fill","#f29c9c")
			.text(function(){	
				return 0
			})
			.style("font-size","13px")
			.attr("transform","translate(" + padding.left + "," + (padding.top*2-5) + ")")
 svg.append('text')
  			.attr("id","text_tip2")
  			.attr("fill","#9d7bc8")
			.text(function(){	
				return 0
			})
			.style("font-size","13px")
			.attr("transform","translate(" + padding.left + "," + (padding.top*2+10) + ")")
if(indexdataset3){
	svg.append('text')
  			.attr("id","text_tip3")
  			.attr("fill","#9fe0f6")
			.text(function(){	
				return 0
			})
			.style("font-size","13px")
			.attr("transform","translate(" + padding.left + "," + (padding.top*2+24) + ")")
}
if(indexdataset3){
 svg.append('text')
  			.attr("id","text_tip4")
  			.attr("fill","#9fe0f6")
			.text(function(){	
				return 0
			})
			.style("font-size","13px")
			.attr("transform","translate(" + padding.left + "," + (padding.top*2+15+height*0.8) + ")")
		}else{
			 svg.append('text')
  			.attr("id","text_tip4")
  			.attr("fill","#f29c9c")
			.text(function(){	
				return 0
			})
			.style("font-size","13px")
			.attr("transform","translate(" + padding.left + "," + (padding.top*2-15+height*0.8) + ")")
		}
if(indexdataset3){
 svg.append('text')
  			.attr("id","text_tip5")
  			.attr("fill","#9d7bc8")
			.text(function(){	
				return 0
			})
			.style("font-size","13px")
			.attr("transform","translate(" + padding.left + "," + (padding.top*2+height*0.8) + ")")
}else{
	svg.append('text')
  			.attr("id","text_tip5")
  			.attr("fill","#9d7bc8")
			.text(function(){	
				return 0
			})
			.style("font-size","13px")
			.attr("transform","translate(" + padding.left + "," + (padding.top*2+height*0.8) + ")")
}

if(indexdataset3){
	svg.append('text')
  			.attr("id","text_tip6")
  			.attr("fill","#f29c9c")
			.text(function(){	
				return 0
			})
			.style("font-size","13px")
			.attr("transform","translate(" + padding.left + "," + (padding.top*2-15+height*0.8) + ")")
}



svg.selectAll("rect")
		.on('click',function(){
        	if (this.id == 'Rect1' || this.id == 'Rect4'){
        		// console.log(1)
        		positiveDown2 = 0;
        	}else if (this.id == 'Rect3' || this.id == 'Rect6'){
        		// console.log(2)
        		positiveDown2 = 1;
        	}
        	else if(this.id == 'Rect2' || this.id == 'Rect5'){
        		// console.log(2)
        		positiveDown2 = 2
        	}
        	 stationsflow(data1,data2);
        })

updatestationsflowclick();

// 添加图例
var idd = ['rectpo','rectne','recttr']
	for (var i = 3 - 1; i >= 0; i--) {
		if(i<2){
		svg.append("rect")
	        .attr("width",10)
	        .attr("height",8)
	        .attr('id',idd[i])
	        .attr("transform","translate(" + (padding.left*0.4+width) + "," + (padding.top*2+10*(i+1)) + ")")
	        .attr("fill",color[i]);	

	    svg.append('text')
  		.text(label[i])
  		.attr('transform', 'translate(' + (padding.right*0.6+width+12) + ', ' + (padding.top*2.37+10*(i+1)) + ')');		
		}
		else{
		// console.log(indexdataset3);
		if(indexdataset3==1){
		svg.append("rect")
        .attr("width",10)
        .attr("height",8)
         .attr('id',idd[i])
        .attr("transform","translate(" + (padding.left*0.4+width) + "," + (padding.top*2+10*(2+1)) + ")")
        .attr("fill",color[i]);	

	    svg.append('text')
  		.text(label[2])
  		.attr('transform', 'translate(' + (padding.right*0.6+width+12) + ', ' + (padding.top*2.37+10*(2+1)) + ')');	
			}			
		}	
	};
updatestationsflow();
svg.append("g")
	.attr("class","sc axis")
	.attr("transform","translate(" + padding.left + "," + (height*0.5 + padding.bottom ) + ")")
	.call(xAxis); 
}

function updatestationsflow(){
	// console.log(iddd);
	if(iddd == 1){
	d3.select("#stationsflow").selectAll("rect")
			.style("fill-opacity",function(d,i){
			return 1;
		})
		iddd = '0';
	}
	else if(iddd == 'Rect4'|| iddd == 'Rect1'||iddd == 'rectpo'){
		// console.log(1);
	d3.select("#stationsflow").selectAll("rect")
	.style("fill-opacity",function(d,i){
		if(this.id == 'Rect4'||this.id == 'Rect1'||this.id == 'rectpo'){
			return 1;}
			 else {
			 // console.log("````");	
			return 0.2;
		};
		})
	iddd = '0';
		}
	else if(iddd == 'Rect2'|| iddd == 'Rect5'||iddd == 'rectne'){
		// console.log(1);
	d3.select("#stationsflow").selectAll("rect")
	.style("fill-opacity",function(d,i){
		if(this.id == 'Rect2'||this.id == 'Rect5'||this.id == 'rectne'){
			return 1;}
			 else {
			 // console.log("````");	
			return 0.2;
		};
		})
	iddd = '0';
		}
	else if(iddd == 'Rect3'|| iddd == 'Rect6'||iddd == 'recttr'){
		// console.log(1);
	d3.select("#stationsflow").selectAll("rect")
	.style("fill-opacity",function(d,i){
		if(this.id == 'Rect3'||this.id == 'Rect6'||this.id == 'recttr'){
			return 1;}
			 else {
			 // console.log("````");	
			return 0.2;
		};
		})
	iddd = '0';
		}

d3.select("#stationsflow").selectAll("rect")
		// .transition().duration(delay)
		.attr('fill',function(d,i){
			if (timeIndex == (i+1)%117) {return 'yellow'}
			else {	
				if(this.id == 'Rect1'||this.id == 'Rect4'||this.id == 'rectpo'){
				return '#f29c9c'}
				else if(this.id == 'Rect2'||this.id == 'Rect5'||this.id == 'rectne'){
				return '#9d7bc8'}
				else if(this.id == 'Rect3'||this.id == 'Rect6'||this.id == 'recttr'){
				return '#9fe0f6'}
				
			}
		})


d3.select("#stationsflow").select("text#text_tip1")
		.text(function(){		
			return dataset1sta[timeIndex]		
		})
		.attr('x',function(){
			return staScale(timeIndex)-20
		})
d3.select("#stationsflow").select("text#text_tip2")
		.text(function(){		
			return dataset2sta[timeIndex]		
		})
		.attr('x',function(){
			return staScale(timeIndex)-20
		})
if(indexdataset3){
	d3.select("#stationsflow").select("text#text_tip3")
		.text(function(){		
			return dataset3sta[timeIndex]		
		})
		.attr('x',function(){
			return staScale(timeIndex)-20
		})
	}
d3.select("#stationsflow").select("text#text_tip4")
		.text(function(){		
			return dataset4sta[timeIndex]		
		})
		.attr('x',function(){
			return staScale(timeIndex)-20
		})
d3.select("#stationsflow").select("text#text_tip5")
		.text(function(){		
			return dataset5sta[timeIndex]		
		})
		.attr('x',function(){
			return staScale(timeIndex)-20
		})
if(indexdataset3){
	d3.select("#stationsflow").select("text#text_tip6")
		.text(function(){		
			return dataset6sta[timeIndex]		
		})
		.attr('x',function(){
			return staScale(timeIndex)-20
		})
	}	

}

function updatestationsflowclick(){
// console.log(dataset11)
// console.log(dataset44)
// console.log(dataaa)
// console.log("~~~")
// console.log(indexdataset3)
// console.log(positiveDown2)
	d3.select("#stationsflow").selectAll("rect")
		.attr('y',function(d,i){			
		if(indexdataset3){
			if (positiveDown2 == 0 ) {
				// console.log("~~~1111~")
				if (this.id == 'Rect1' ) { return y12Scale(d) ; }
				else if (this.id == 'Rect2' ) { return y12Scale(d+dataset1sta[(i)%117]); }
				else if (this.id == 'Rect3' && indexdataset3) { return y12Scale(d+dataset1sta[(i)%117]+dataset2sta[(i)%117]);}
				else if (this.id == 'Rect4' ) { return (height2)/2 ; }
				else if (this.id == 'Rect5' ) { return (height2)/2+y22Scale(dataset4sta[(i)%117]); }
				else if (this.id == 'Rect6' && indexdataset3 ) { return (height2)/2+y22Scale(dataset4sta[(i)%117])+y22Scale(dataset5sta[(i)%117]);}
				
			}else if(positiveDown2 == 1){
				// console.log("~~2222~~")
				if (this.id == 'Rect1' ) { return y12Scale(d+dataset3sta[(i)%117]); }
				else if (this.id == 'Rect2' ) { return y12Scale(d+dataset1sta[(i)%117]+dataset3sta[(i)%117]);}
				else if (this.id == 'Rect3' && indexdataset3 ) { return y12Scale(d) ; }
				else if (this.id == 'Rect4' ) { return (height2)/2+y22Scale(dataset6sta[(i)%117]);}
				else if (this.id == 'Rect5' ) { return (height2)/2+y22Scale(dataset4sta[(i)%117])+y22Scale(dataset6sta[(i)%117]); }
				else if (this.id == 'Rect6' && indexdataset3 ) { return (height2)/2;}
			positiveDown2 == 0;
			}
			else if(positiveDown2 == 2){
				// console.log("~~2222~~")
				if (this.id == 'Rect1' ) { return y12Scale(d+dataset3sta[(i)%117]+dataset2sta[(i)%117]); }
				else if (this.id == 'Rect2' ) { return y12Scale(d);}
				else if (this.id == 'Rect3' && indexdataset3 ) { return y12Scale(d+dataset2sta[(i)%117]) ; }
				else if (this.id == 'Rect4' ) { return (height2)/2+y22Scale(dataset6sta[(i)%117])+y22Scale(dataset5sta[(i)%117]);}
				else if (this.id == 'Rect5' ) { return (height2)/2 ; }
				else if (this.id == 'Rect6' && indexdataset3) { return (height2)/2+y22Scale(dataset5sta[(i)%117]);}
			positiveDown2 == 0;
			}				
		}
		else{
			if (positiveDown2 == 0 || positiveDown2 == 1 ) {
				// console.log("~~~1111~")
				if (this.id == 'Rect1' ) { return y12Scale(d) ; }
				else if (this.id == 'Rect2' ) { return y12Scale(d+dataset1sta[(i)%117]); }
				// else if (this.id == 'Rect3' && dataset3sta!=[0] ) { return y12Scale(d+dataset1sta[(i)%117]+dataset2sta[(i)%117]);}
				else if (this.id == 'Rect4' ) { return (height2)/2 ; }
				else if (this.id == 'Rect5' ) { return (height2)/2+y22Scale(dataset4sta[(i)%117]); }
				// else if (this.id == 'Rect6' && dataset6sta!=[0] ) { return (height2)/2+y22Scale(dataset4sta[(i)%117])+y22Scale(dataset5sta[(i)%117]);}
				
			}else if(positiveDown2 == 2){
				// console.log("~~2222~~")
				if (this.id == 'Rect1' ) { return y12Scale(d+dataset2sta[(i)%117]); }
				else if (this.id == 'Rect2' ) { return y12Scale(d);}
				// else if (this.id == 'Rect3' && dataset3sta!=[0] ) { return y12Scale(d) ; }
				else if (this.id == 'Rect4' ) { return (height2)/2+y22Scale(dataset5sta[(i)%117]);}
				else if (this.id == 'Rect5' ) { return (height2)/2; }
				// else if (this.id == 'Rect6' && dataset6sta!=[0] ) { return (height2)/2;}
			positiveDown2 == 0;
			}
		}
		})
		
}