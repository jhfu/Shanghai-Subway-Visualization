mousePosition = -1
var dayType = 'weekday'
var countList = ['inCount']
var playing = 0
var timer 

var selectedLineTemp = ''

function drawButtons(){
    var svg = d3.select("#buttonsGraph").append("svg")
            .attr("width", $("#buttonsGraph").width())
            .attr("height", $("#buttonsGraph").height())


    //x轴的比例尺
    var yScale = d3.scale.ordinal()
        .domain(d3.range(7))
        .rangeRoundBands([0, $("#buttonsGraph").height()/2.4]);
    //定义x轴
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");
    //定义button大小
    var rectHeight = 30;   //每个矩形所占的像素高度(包括空白)
    var rectPadding = 0;
    var hengzuobiao = 13

    var labelData = [   {'show':'复原'},{'show':'播放'},
                        {'show':'周内','info':'weekday'},{'show':'周末','info':'weekend'},
                        {'show':'进站','info':'inCount'},{'show':'出站','info':'outCount'},{'show':'换乘','info':'transferCount'}
                    ]
    // console.log(labelData)
    // var character=['复原','播放','weekday','weekend','inCount','outCount','transferCount']

    svg.selectAll("rect")
        .data(labelData)
        .enter()
        .append("rect")
        .attr("y",function(d,i){ 
            {return yScale(i)+20 ;}
        })
        .attr("x",hengzuobiao)
        .attr("width",function(){
            return 55;
        })
        .attr("height",rectHeight)
        // .attr("fill","lightgreen")
        .on("mouseover",function(d,i){
                mousePosition = i
                updateButtons()
            })
        .on("mouseout",function(d,i){
                mousePosition = -1
                updateButtons()
            })
        .on("mousedown",function(d,i){
            buttonActionHandle(d,i)
        })

    var texts = svg.selectAll(".MyText")
        .data(labelData)
        .enter()
        .append("text")
        .attr("class","MyText")
        .attr("y", function(d,i){
            {return yScale(i)+40 ;}
        })
        .attr("x",hengzuobiao+17)
        .text(function(d){
            return d['show'];
        })
        .attr("fill","black")
        .on("mouseover",function(d,i){
                mousePosition = i
                updateButtons()
            })
        .on("mouseout",function(d,i){
                mousePosition = -1
                updateButtons()
            })
        .on("mousedown",function(d,i){
            buttonActionHandle(d,i)
        })






    lineLegend = ['1','2','3','4','5','6','7','8','9','10','11','12','13','16']
    svg.selectAll("circleLegend")
        .data(lineLegend)
        .enter().append("circle")
        .attr('id','circleLegend')
        .attr("cx",function(d,i){ 
            return (i%2)*28 + 24
        })
        .attr("cy",function(d,i){
            return yScale(parseInt(i/2)) + yScale.rangeBand()*9
        })
        .attr("r",11)
        .style("fill", function(d){ return LINE_COLOR[d]   })
        .on("mouseover",function(d,i){
                selectedLineTemp = selectedLine
                selectedLine = d
                updateButtons()
                updateCircles()
                updateSubwayMapColor()
            })
        .on("mouseout",function(d,i){
                selectedLine = selectedLineTemp
                selectedLineTemp = ''
                updateButtons()
                updateCircles()
                updateSubwayMapColor()
            })
        .on('click',function(d){
            if (selectedLineTemp == d) { selectedLineTemp = ''; selectedLine = ''}
            else{   selectedLineTemp = d }
            // selectedLineTemp = selectedLine
            updateSubwayMapColor()
            drawLinesFlow([0,0,d])
            updateCircles()
        })

     svg.selectAll("cText")
        .data(lineLegend)
        .enter().append("text")
        .style("font-size","13px")
        .attr("fill","white")
        // .attr("class","MyText")
        .text(function(d){
            return d;
        })
        .attr("x",function(d,i){
            if (i<9) {
                return (i%2)*28 + 20.5
            };
            return (i%2)*28 + 16.5
        })
        .attr("y", function(d,i){
            return yScale(parseInt(i/2)) + yScale.rangeBand()*9+4.5
        })
        .on("mouseover",function(d,i){
                selectedLineTemp = selectedLine
                selectedLine = d
                updateButtons()
                updateCircles()
                updateSubwayMapColor()
            })
        .on("mouseout",function(d,i){
                selectedLine = selectedLineTemp
                selectedLineTemp = ''
                updateButtons()
                updateCircles()
                updateSubwayMapColor()
            })
        .on('click',function(d){
            if (selectedLineTemp == d) { selectedLineTemp = '' ; selectedLine = ''}
            else{   selectedLineTemp = d }
            selectedLineTemp = selectedLine
            updateSubwayMapColor()
            drawLinesFlow([0,0,d])
            updateCircles()
        })

    updateButtons()
    updateCircles()
}


function buttonActionHandle(d,i){
    if (i>3) {updateCountList(d['info'])}
    else if (i>1) {updateDayType(d['info'])}
    else if (i==1) {updatePlaying()}
    else{ drawSubwayMap()  }
    mousePosition = -1
    updateButtons()
}

function updatePlaying(){
    if (playing) {playing = 0}
    else{playing = 1}

    if (playing) {
        timer = setInterval(function(){
	    updatechange(timeIndex);
            updatestationsflow();
            if (playing) {
                if (timeIndex == timeIndexMax-1) {timeIndex = 0};
                timeIndex ++
                updateSubwayMap()
                updateHistogram()
                updateLinesFlowTime()
                if (timeIndex == timeIndexMax-1) {
                    window.clearInterval(timer); 
                    playing = 0
                }
            }else{
                window.clearInterval(timer); 
            }
        },80);
    };
}
function updateDayType(d){
    dayType = d
    updateSubwayMap()
    drawHistogram()
}

function updateCircles(){
    d3.select("#buttonsGraph").selectAll("circle")
        .attr('fill-opacity',function(d){
            if (selectedLine == '') { return 0.99}
            else if (selectedLine == d) { return 0.99};
            return 0.2
        })
}


function updateButtons(){
    d3.select("#buttonsGraph").selectAll("rect")
        .attr('fill',function(d,i){
            if (mousePosition == i) {return 'yellow'}
            else{
                if (i<=1) {return '#9fe0f6' }
                else{   
                    if (dayType == d.info) { return '#f3e59a'}
                    else if( countList.hasObj(d.info) ){
                        return '#f29c9c'
                    }
                    return 'lightgray' 
                }
            }
        })
}
function updateCountList(d){
    if (countList.hasObj(d)) {
        // if (countList.length>1) {
            countList.remove(d)
            // console,log('remove')
        // };
    }else{
        countList.push(d)
    }
    updateSubwayMap()
}
