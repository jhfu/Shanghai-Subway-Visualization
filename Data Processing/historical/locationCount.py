# coding: utf-8

import csv
c=open("SPTCC-20150406.csv","rb") #以rb的方式打开csv文件
read=csv.reader(c)

total = 0;
locationList = [];
locationCount = [];

readBuffer = [[]]
for line in read: 
    dataType = line[4].decode('cp936').encode('utf-8')
    if dataType != '地铁':
        continue;
    else :
        location = line[3].decode('cp936').encode('utf-8').split('线')[1]
        if locationList.count(location)==0:
            locationList.append(location)
            locationCount.append(1)
        else :
            locationCount[locationList.index(location)] +=1

    total += 1;
    if total>=100:
        break;

for  i in range(len(locationList)):
    print locationList[i],locationCount[i]
print total
c.close()




# a = open("SPTCC-20150406.csv", "r")
# print len(a.readlines())

