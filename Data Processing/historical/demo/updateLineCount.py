# coding: utf-8

import csv
c=open("transferListTest.csv","rb") #以rb的方式打开csv文件
transferList = [];
read=csv.reader(c)
for line in read:
	transferList.append(line)
stationList = transferList[0]
c.close()

c=open("lineListTest.csv","rb") #以rb的方式打开csv文件
lineList = [];
read=csv.reader(c)
for line in read:
	lineList.append(line)
c.close()

stationCount = [[]]
stationCount[0]=stationList
for i in xrange(1,11):
	stationCount.append([0]*len(stationList))
	stationCount[i][0]=i-1


lineCount = [[0]]
for x in lineList:
	lineCount[0].extend(x[1:-1])
for i in xrange(1,11):
	lineCount.append([0]*len(lineCount[0]))
	lineCount[i][0]=i-1

lineCountIndexShift = [1]
for i in xrange(0,len(lineList)-1):
	lineCountIndexShift.append( len(lineList[i])-2+lineCountIndexShift[i] )
	pass

# print lineCountIndexShift



def getTimeInSeconds(time):
	return int(time[0:2])*3600+int(time[3:5])*60+int(time[6:8])

def getLineIndex(lineName):
	return int(lineName)-1
	# pass
def getLineShiftInCount(lineName):
	return lineCountIndexShift[getLineIndex(lineName)]
	pass

startTime = getTimeInSeconds('06:00:00')

def updateLineWithoutTransfer(lineName,stationA,stationB,timaA,timeCostPerUnit,unitout):
	unitCount = unitout
	temp = lineList[getLineIndex(lineName)]
	i = temp.index(stationA)-1
	j = temp.index(stationB)-1
	if i<j:
		for x in xrange(j-i):
			lineCount[int(timaA + unitCount*timeCostPerUnit - startTime)/600+1][ getLineShiftInCount(lineName)+i+x ] +=1
			unitCount += 1
			# print x
	else: 
		for x in xrange(i-j):
			lineCount[int(timaA + unitCount*timeCostPerUnit - startTime)/600+1][ getLineShiftInCount(lineName)+i-1-x ] +=1
			unitCount += 1
	return unitCount


def updateLineCount(stationA,stationB,timeAinTxt,timeBinTxt): 
	# print 'updateLineCount'
	timaA = getTimeInSeconds(timeAinTxt)
	timaB = getTimeInSeconds(timeBinTxt)

	if timaA > timaB:
		timaA,timaB = timaB,timaA
		stationA,stationB = stationB,stationA# from A to B

	indexA = stationList.index(stationA)
	indexB = stationList.index(stationB)
	tempTransferList = transferList[indexA][indexB].split(';')
	info = tempTransferList[0].split('-')
	if info[2]!='0':
		transStation = tempTransferList[1].split('-')
		transData = tempTransferList[2].split('-')
	else:
		transStation = []
		transData = []

	timeCostPerUnit = (timaB - timaA )/( (int(info[1])+2)+int(info[2])*2)

	stationCount[(timaA - startTime)/600+1][stationList.index(stationA)] +=1
	stationCount[(timaB - startTime)/600+1][stationList.index(stationB)] +=1

	unitCount = 1.5;
	for i in xrange(len(transStation)):
		unitCount += int(transData[i*2+1])
		stationCount[int(timaA + unitCount*timeCostPerUnit - startTime)/600+1][stationList.index(transStation[i])] +=1
		unitCount += 2

	unitCount = 1.5;
	if info[2]=='0':
		updateLineWithoutTransfer(info[0],stationA,stationB,timaA,timeCostPerUnit,1.5)

	else:
		transStation.insert(0,stationA)
		transStation.append(stationB)
		for i in xrange(len(transStation)-1):
			unitCount = updateLineWithoutTransfer(transData[i*2],transStation[i],transStation[i+1],timaA,timeCostPerUnit,unitCount)+2
			# print unitCount
			pass

	return

# updateLineCount('A','B',1,2)
# updateLineCount('F','A',1,2)
# updateLineCount('D','A','06:09:25','07:19:16')
# updateLineCount('A','E','06:20:25','06:58:16')
# updateLineCount('K','A','06:20:25','06:58:16')
for x in xrange(1,50000):
	updateLineCount('K','A','06:20:25','06:38:16')
	pass
updateLineCount('F','A','06:20:25','06:38:16')
updateLineCount('F','E','06:20:25','06:38:16')
updateLineCount('F','H','06:20:25','06:38:16')
updateLineCount('F','K','06:20:25','06:38:16')
updateLineCount('F','C','06:20:25','06:38:16')
updateLineCount('F','I','06:20:25','06:38:16')

# updateLineCount('H','A',5,9)
# updateLineCount('A','',1,2)

# for i in transferList:
	# print i
# for i in lineList:
# 	print i
# print stationList


csvfile = file('stationCount.csv', 'wb')
writer = csv.writer(csvfile)
writer.writerows(stationCount)
csvfile.close()
csvfile = file('lineCount.csv', 'wb')
writer = csv.writer(csvfile)
writer.writerows(lineCount)
csvfile.close()

