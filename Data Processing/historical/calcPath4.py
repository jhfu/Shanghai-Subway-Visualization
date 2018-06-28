# coding: utf-8

import csv

changePunishment = 3

def read_line(filename):
    value = ''
    c = open('line/' + filename+'.txt','rb')
    readlines = csv.reader(c)
    for line in readlines:
        value += line[0]+' '
    return value
    c.close()

def getString(pathList,start,end):
    result = '换乘因子 %d  从 %s 到 %s  共 %d 种方案:'%(changePunishment,start,end,len(pathList))
    result += '\n'
    for pathPositive in pathList:
        for x in pathPositive[::2]:
            result += x+' '
        result += '\n'
        if len(pathPositive) > 1:
           result += ( '共 %d 站 换乘 %d 次 代价 %d\n'%(len(pathPositive)/2-1,(pathPositive[-1][-1]-len(pathPositive)/2-1)/changePunishment,pathPositive[-1][-1]-changePunishment+2))
    return result

stations = set()
def build_subway(**lines):
    """
    Input is build_subway(linename='station1 station2...'...)
    Ouput is a dictionary like {station:{neighbor1:line number,neighbor2:line number,...},station2:{...},...}
    """
    for key in lines.keys():
        # print key
        value = lines[key]
        lines[key] = value.split()

    for key in lines.keys():
        stations.update(set(lines[key]))
    system = {}
    for station in stations:
        next_station = {}
        for key in lines:
            if station in lines[key]:
                line = lines[key]
                idx = line.index(station)
                if idx == 0:
                    if next_station.has_key(line[1]): 
                        temp =  next_station[line[1]]
                        temp.append(key)
                        next_station[line[1]] = temp
                    else:
                         next_station[line[1]] = [key]
                elif idx == len(line)-1:
                    if next_station.has_key(line[idx-1]): 
                        temp =  next_station[line[idx-1]]
                        temp.append(key)
                        next_station[line[idx-1]] = temp
                    else:
                         next_station[line[idx-1]] = [key]
                else:
                    if next_station.has_key(line[idx-1]): 
                        temp =  next_station[line[idx-1]]
                        temp.append(key)
                        next_station[line[idx-1]] = temp
                    else:
                         next_station[line[idx-1]] = [key]
                    if next_station.has_key(line[idx+1]): 
                        temp =  next_station[line[idx+1]]
                        temp.append(key)
                        next_station[line[idx+1]] = temp
                    else:
                         next_station[line[idx+1]] = [key]
        system[station] = next_station
    return system
def update_subway(shanghaiSubway):
    """
    due to line2 and line10 are circle lines.
    the shanghaiSubway need to update
    """
    shanghaiSubway['宜山路']['上海体育馆'] = ['line04']
    shanghaiSubway['上海体育馆']['宜山路'] = ['line04']
    return shanghaiSubway

sh_subway = build_subway(
    line1 = read_line('1'),
    line2 = read_line('2'),
    line4 = read_line('4'),
    line3 = read_line('3'),

    line5 = read_line('5'),
    line6 = read_line('6'),
    line7 = read_line('7'),
    line8 = read_line('8'),
    line9 = read_line('9'),
    line10zhi = read_line('10zhi'),
    line10 = read_line('10'),
    line11zhi = read_line('11zhi'),
    line11 = read_line('11'),
    line12 = read_line('12'),
    line13 = read_line('13'),
    line16 = read_line('16')
)
sh_subway = update_subway(sh_subway)

def cout(textList):
    for x in textList:
        print x,
    print ''

def path_search(start, goal):
    """Find the shortest path from start state to a state
    with min change times such that is_goal(state) is true."""
    if start == goal:
        return [start]
    explored = {}
    explored[start] = 2
    queue = [ [start, ('', 0)] ]
    bestPath = [start, ('', 1110)]
    bestPathList = []
    total = 0
    while queue:
        total += 1
        # if total>40000:
        #     return -1,' fail'

        queue.sort(key=lambda path:path[-1][-1])
        path = queue.pop(0)
        s = path[-2]
        # print len(queue)
        # cout(path)

        if s == goal:
            bestPath = path
            # print 'Find one best path ↑'
            bestPathList.append(bestPath)
            if len(queue)==0:
                # print '~~~~',total,getString 
                return total,getString(bestPathList,start,goal)
        else:
            if path[-1][-1] > bestPath[-1][-1]:
                return total,getString(bestPathList,start,goal)

            linenum, changetimes = path[-1]
     
            for state, actions in sh_subway[s].items():
                for action in actions:
                    linechange = changetimes + 1
                    if linenum != action:
                        linechange += changePunishment
                    path2 = path[:-1] + [action, state, (action, linechange)]

                    if (path2[-1][-1]-len(path2)/2-1)/changePunishment <= 4:
                        if len(path2)>6:
                            if (path2[-2] == '上海赛车场' and path2[-4]=='嘉定新城' and path2[-6]=='马陆') or (path2[-6] == '上海赛车场' and path2[-4]=='嘉定新城' and path2[-2]=='马陆') or (path2[-2] == '龙柏新村' and path2[-4]=='龙溪路' and path2[-6]=='水城路') or (path2[-6] == '龙柏新村' and path2[-4]=='龙溪路' and path2[-2]=='水城路'):
                                linechange -= changePunishment
                                path2 = path[:-1] + [action, state, (action, linechange)]

                        if path2.count(state)<=1:
                            if state not in explored:
                                explored[state] = linechange
                                queue.append(path2)
                            
                            elif linechange <= explored[state]+changePunishment: # 考虑马上到终点
                  
                                explored[state] = linechange
                                queue.append(path2)


    return total,getString(bestPathList,start,goal)



def saveChangeInfo(fileName,infoTable):
    csvfile = file(fileName,'w')
    writer = csv.writer(csvfile)
    writer.writerows(infoTable)
    csvfile.close()


def ergodic():
    result = []
    resultEcahLine = ['F']
    for x in stations:
        resultEcahLine.append(x)
    result.append(resultEcahLine)

    total = 0
    fail = 0
    for x in stations:
        resultEcahLine = [x]
        for y in stations:  
            path = ''
            if x == y:
                resultEcahLine.append('0')
            else:
                times,path= path_search(x,y)
                resultEcahLine.append(path)

                printOut = '%.4f%% , %3d, %5d ' % (100.0*total/len(stations)/len(stations),fail,total)
                if path and len(path)>10:
                    printOut += ' '+path.split('\n')[-2]
                printOut += '\t %06s → %06s' % (x,y)
                print printOut

                if times==-1:
                    fail += 1
            total += 1
            
        result.append(resultEcahLine)
    saveChangeInfo('pathErgodic.csv',result)



# ergodic()

# start = '金沙江路'
# end = '闵行开发区'
# # start,end = end,start
# time , pathList = path_search(start,end)
# print time
# print pathList














def readChangeInfo():
    c=open("pathErgodic.csv") #以rb的方式打开csv文件
    read=csv.reader(c)
    changeTable = []
    for line in read: 
        changeTable.append(line)
    # StationIndex = changeTable[0]
    c.close()
    return changeTable, changeTable[0]



def getChangeInfo(start,end):
    return changeTable[StationIndex.index(start)][StationIndex.index(end)]

def updateChangeInfo(start,end):
    time , pathList = path_search(start,end)
    changeTable[StationIndex.index(start)][StationIndex.index(end)] = pathList
    print start, end, time
    print pathList


# print getChangeInfo('东川路','交通大学')
def checkInfo(changeTable,StationIndex):
    failOne = 0
    failTwo = 0

    for x in xrange(1,len(changeTable)):
        for y in xrange(1,len( changeTable[x] )):
            t = changeTable[x][y]
            if t ==' fail' :
                failOne += 1
                if changeTable[y][x] == ' fail':
                    print StationIndex[x],StationIndex[y]
                    failTwo +=1
    print failOne,failTwo/2


changeTable,StationIndex = readChangeInfo()

# print getChangeInfo('金沙江路','滴水湖')
# updateChangeInfo('金沙江路','滴水湖')
# updateChangeInfo('金沙江路','临港大道')
# updateChangeInfo('临平路','闵行开发区')
# updateChangeInfo('海伦路','闵行开发区')
# updateChangeInfo('海伦路','文井路')
# updateChangeInfo('上海儿童医学中心','花桥')
# updateChangeInfo('蓝村路','光明路')
# updateChangeInfo('蓝村路','花桥')
# saveChangeInfo('pathErgodic.csv',changeTable)

# checkInfo(changeTable,StationIndex)

print getChangeInfo('金沙江路','临港大道')
