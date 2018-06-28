// linesflow();
var LINE_COLOR = {"1": "#e91b39", "2": "#8ac53f", "3": "#fad107", "4": "#502e8d", "5": "#9056a3", "6": "#d61870", "7": "#f37121", "8": "#009eda", "9": "#79c8ed", "10": "#bca8d1", "11": "#7e2131", "12": "#007c65", "13": "#e895c0", "16": "#8dd1bf"
};
    
var connections;
var stations;
var totalInSubway;
var linesInfo;
var timeIndexMax = 117;
var timeIndex = 16
// var dayType = 'weekend'
// var totalInSubway = new Array();

d3.json("data/connections_by_station_name.json", function(error, json){
	if (error) return console.warn(error);
	connections = json;
});
d3.json("data/stations_by_name_with_alias.json", function(error, json){
	if (error) return console.warn(error);
	stations = json;
		// timeIndexMax = stations['东川路']['weekday']['inCount'].length
});
d3.json("data/lines.json", function(error, json){
	if (error) return console.warn(error);
	linesInfo = json;
	// console.log(linesInfo)
		// timeIndexMax = stations['东川路']['weekday']['inCount'].length
});
d3.json('data/totalInSubway.json',function(error,json){
	if (error) return console.warn(error);
	totalInSubway = json;
	// console.log(totalInSubway)
	drawSubwayMap()
	drawHistogram()
	drawButtons()
	drawClock()
	drawLinesFlow(connections[5])
   	stationsflow('人民广场',stations['人民广场']);
   	change(connections[298]);
});

init()



function init(){
	playing = 1
	timer = setInterval(function(){
		timeIndex ++
	    updateSubwayMap()
	    updateHistogram()
	    updateLinesFlowTime()
	    updatechange(timeIndex);
		updatestationsflow();
	    if (timeIndex == timeIndexMax-1) {timeIndex = 0}
		else if (timeIndex == 15) {
	        playing = 0
	    }
	    if (playing == 0) {
	    	 window.clearInterval(timer); 
	    } 
	},40);
}








// "宜山路","虹桥路","延安西路","中山公园”,"金沙江路”,

// "曹杨路","镇坪路","中潭路","上海火车站","宝山路",

Array.prototype.remove = function(val) {  
    var index = this.indexOf(val);  
    if (index > -1) {  
        this.splice(index, 1);  
    }  
};  

Array.prototype.hasObj = function(val) {  
     if ($.inArray(val,this) === -1) {
          return false;
     }else{
          return true;
     }
}; 


function inList(list,start,end){
	for (var i = 0; i < list.length-1; i++) {
		if (start == list[i] && end == list[i+1]) {
			return 1
		};
	};
	return 0;
}
// console.log(leftList)
