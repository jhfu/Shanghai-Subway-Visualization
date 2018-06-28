# coding: utf-8

import csv
c=open("station.csv","rb") #以rb的方式打开csv文件
lineList = [];
metroMap = {}
read=csv.reader(c)

readBuffer = [[]]
lineNo = 'a'

total = 0
for line in read: 
    if line[3]==lineNo:
        readBuffer.append(line)
        pass
    else:
        lineTemp = [lineNo]
        
        for x in readBuffer:
            # print x
            if len(x)>1:
                lineTemp.append(x[1].decode('cp936').encode('utf-8'))
            pass
        lineList.append(lineTemp)
        lineNo = line[3]
        readBuffer = [line]



c.close()

lineTemp = [lineNo]
    
for x in readBuffer:
    # print x
    if len(x)>1:
        pass
        temp = x[1].decode('cp936').encode('utf-8')
        print temp
        lineTemp.append(temp)
    pass
lineList.append(lineTemp)

csvfile = file('lineList.csv', 'wb')
writer = csv.writer(csvfile)
writer.writerows(lineList[2:])
csvfile.close()

