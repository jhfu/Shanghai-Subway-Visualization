# coding: utf-8
import csv
import stationsData
import connectionsData

def getTimeInSeconds(timeInTxt):
    return int(timeInTxt[0:2])*3600+int(timeInTxt[3:5])*60+int(timeInTxt[6:8])
    
# time
metroStartTimeEarliestInSeconds = getTimeInSeconds('04:25:00')  # 16060, 4:27
metroEndTimeLastInSeconds  = getTimeInSeconds('23:55:00')   # 85749, 23:50, 117 units
TIME_UNITS = 117    #117

# def updateFileCount(fileDate):
#     print weekendCount,weekdayCount
    # if (int(fileDate)+2)%7 in [0,6]:
    #     weekendCount += 1
    # else:
    #     weekdayCount += 1



def checkTime(timeInTxt):
    t = getTimeInSeconds(timeInTxt)
    if t < metroStartTimeEarliestInSeconds:
        return metroStartTimeEarliestInSeconds
    elif t > metroEndTimeLastInSeconds:
        return metroEndTimeLastInSeconds
    return t
def checkIndex(index):
    if index < 0:
        return 0
    if index < TIME_UNITS:
        return index
    else:
        return TIME_UNITS-1

def cout(textList):
    for x in textList:
        print x.decode('cp936').encode('utf-8'),
    print ' '

def readChangeInfo():
    c=open("pathErgodic201504.csv") #以rb的方式打开csv文件
    read=csv.reader(c)
    changeTable = []
    for line in read: 
        changeTable.append(line)
    # StationIndex = changeTable[0]
    c.close()
    return changeTable
def getChangeInfo(changeTable,start,end):
    return changeTable[changeTable[0].index(start)][changeTable[0].index(end)]


# print (metroEndTimeLastInSeconds - metroStartTimeEarliestInSeconds)/600


stations = stationsData.init(TIME_UNITS)
connections = connectionsData.init(TIME_UNITS)
changeTable = readChangeInfo()



# print stations['马陆']['weekday']['outCount'][1]
# print connections['剑川路,东川路,5']['weekday']
# print getChangeInfo(changeTable,'大渡河路','龙阳路')
# print getChangeInfo(changeTable,'东川路','龙阳路')
# print getChangeInfo(changeTable,'龙阳路','东川路')

def updateData(start,end,_startTime,_endTime,dayType):
    # print start,end,_startTime,_endTime,dayType
    startTime = checkTime(_startTime)
    endTime = checkTime(_endTime)
    timeTotal = endTime-startTime
    if timeTotal <= 0:
         print 'time out error 0',start,end,_startTime,_endTime

    if start == end:
        if endTime - startTime > 1800: # 30min x 60s
            pass
            # print 'time out error 1',start,end,_startTime,_endTime
        else:
            stations[start][dayType]['inCount'][checkIndex(int((startTime - metroStartTimeEarliestInSeconds)/600))] += 1
            stations[end][dayType]['outCount'][checkIndex(int((endTime - metroStartTimeEarliestInSeconds)/600))] += 1
    else:
        # print 'else'
        info = getChangeInfo(changeTable,start,end).split('\n')
        temp = info[0].split(' ')
        cost = int(temp[1])
        weight = 1.0/int(temp[9])
        timeShift = startTime - metroStartTimeEarliestInSeconds

        timeCostPerUnit = timeTotal / cost
        for i in xrange(1,len(info)-1,4):
            costList = info[i].split(' ')
            connectionsList = info[i+1].split(' ')
            directionList = info[i+2].split(' ')
            transferList = info[i+3].split(' ')
            for j in xrange(0,len(costList)):
                if directionList[j] == 'p':
                    connections[connectionsList[j]][dayType]['positive'][checkIndex(int((float(costList[j])*timeCostPerUnit+timeShift)/600))] += weight
                elif directionList[j] =='n':
                    # print connectionsList[j]
                    connections[connectionsList[j]][dayType]['negative'][checkIndex(int((float(costList[j])*timeCostPerUnit+timeShift)/600))] += weight
            for j in xrange(0,len(transferList)-1,2):
                # print j
                stations[transferList[j+1]][dayType]['transferCount'][checkIndex(int((float(transferList[j])*timeCostPerUnit+timeShift)/600))] += weight

                # print checkIndex(int((float(transferList[j])*timeCostPerUnit+timeShift)/600))
            stations[start][dayType]['inCount'][int(timeShift/600)] += weight
            stations[end][dayType]['outCount'][checkIndex(int((endTime - metroStartTimeEarliestInSeconds)/600))] += weight
            


        # print cost,len(info)/4
        # if timeTotal/cost > 00:
        #     pass
        


# updateData('龙阳路','龙阳路','06:00:00','06:10:00')
# break
# for x in xrange(1,1000):
#     updateData('龙阳路','世纪大道','06:00:00','07:00:00')
    # pass



def updateFile(fileDate):
    if (int(fileDate)+2)%7 in [0,6]:
        dayType = 'weekend'
    else:
        dayType = 'weekday'
    
    c=open('data/SPTCC-201504'+fileDate+'.csv',"rb") #以rb的方式打开csv文件
    read=csv.reader(c)

    metroInfoBuffer = []

    for line in read: 
        dataType = line[4].decode('cp936').encode('utf-8')
        if dataType == '地铁':
            metroInfoBuffer.append(line)
        # total += 1
        # if total>=1000000:
        #     break
    c.close()

    total = len(metroInfoBuffer)

    print fileDate,'read finished'
    metroInfoBuffer.sort(lambda x,y:cmp(x[0],y[0]))
    print fileDate,'sort finished'

    metroAvailableTotal = 0
    readBuffer = [[]]
    cardNo = 'a'
    timesStatistics = {}

    for line in metroInfoBuffer: 
        dataType = line[4].decode('cp936').encode('utf-8')
        if line[0]==cardNo:
            if line[2]>'01:00:00':
                readBuffer.append(line)
        else:
            readBuffer.sort(lambda x,y:cmp(x[2],y[2]))
            length = len(readBuffer)
            metroAvailableTotal += length
            # if length not in timesStatistics:
            #     timesStatistics[length] = 1
            # else:
            #     timesStatistics[length] += 1
            if length%2==0:
                for i in xrange(0,len(readBuffer),2):
                    startStation = readBuffer[i][3].decode('cp936').encode('utf-8').split('线')[1]
                    endStation = readBuffer[i+1][3].decode('cp936').encode('utf-8').split('线')[1]
                    startTime = readBuffer[i][2]
                    endTime = readBuffer[i+1][2]
                    if startStation == '大木桥路 ':
                        startStation = '大木桥路'
                    if endStation == '大木桥路 ':
                        endStation = '大木桥路'
                    # print startStation,endStation,startTime,endTime
                    updateData(startStation,endStation,startTime,endTime,dayType)
                    
            cardNo = line[0]
            readBuffer = [line]
    print 'file',fileDate,'finished. ',total,metroAvailableTotal
    return dayType

    # print timesStatistics

def average():
    print weekdayCount,weekendCount
    if weekdayCount > 0:
        day = 'weekday'
        for stationName in stations.keys():
            for count in ['inCount','outCount','transferCount']:
                for x in xrange(0,TIME_UNITS):
                    stations[stationName][day][count][x] /= weekdayCount

        for connectionName in connections.keys():
            for direction in ['positive','negative']:
                for x in xrange(0,TIME_UNITS):
                    connections[connectionName][day][direction][x] /= weekdayCount

    if weekendCount > 0:
        day = 'weekend'
        for stationName in stations.keys():
            for count in ['inCount','outCount','transferCount']:
                for x in xrange(0,TIME_UNITS):
                    stations[stationName][day][count][x] /= weekendCount

        for connectionName in connections.keys():
            for direction in ['positive','negative']:
                for x in xrange(0,TIME_UNITS):
                    connections[connectionName][day][direction][x] /= weekendCount



def calcTotal():
    dayTypeList = ['weekday','weekend']
    totalInSubway = [[0,0]]
    for timeIndex in xrange(1,TIME_UNITS):
        totalInSubway.append([0,0])
        for dayTypeIndex in xrange(0,len(dayTypeList)):
            change = 0
            for station in stations.keys():
                change += stations[station][dayTypeList[dayTypeIndex]]['inCount'][timeIndex] - stations[station][dayTypeList[dayTypeIndex]]['outCount'][timeIndex]
            totalInSubway[timeIndex][dayTypeIndex] = totalInSubway[timeIndex-1][dayTypeIndex] + change
            if totalInSubway[timeIndex][dayTypeIndex] < 0 :
                totalInSubway[timeIndex][dayTypeIndex] = 0
    return totalInSubway
def saveTotal(totalInSubway,filePath = 'stationsDataCalculated.txt'):
    text = '[\n'
    for x in totalInSubway: # x = [0,0], 
        text += '[%d,%d],\n' % (x[0],x[1])
    text = text[:-2] + '\n]'
    
    file_object = open(filePath, 'w')
    file_object.write(text)
    file_object.close()

# print getChangeInfo(changeTable,'临平路','肇嘉浜路')
# updateData('临平路','肇嘉浜路', '07:19:39', '07:55:06', 'weekday')


weekendCount = 0
weekdayCount = 0

for x in xrange(1,6): # 1,31
    if x in [3,12,29]:
        continue
    name = '%02d' % (x)
    if updateFile(name) == 'weekend':
        weekendCount += 1
    else:
        weekdayCount += 1

average()
    




# updateFile('01')
# updateFile('04')



saveTotal(calcTotal(),'web/data/totalInSubway.json')
stationsData.saveSatationsData(stations,'web/data/stations_by_name_with_alias.json')
connectionsData.saveConnectionsData(connections,'web/data/connections_by_station_name.json')






