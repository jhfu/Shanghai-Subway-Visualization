# coding: utf-8

import csv
c=open("SPTCC-20150406.csv","rb") #以rb的方式打开csv文件
read=csv.reader(c)

total = 0;
available = -1;
locationList = [];
locationCount = [];

readBuffer = [[]]
cardNo = 'a'

for line in read: 
	if line[0]==cardNo:
		readBuffer.append(line)
		pass
	else:
		readBuffer.sort(lambda x,y:cmp(x[2],y[2])) 
		available +=len(readBuffer)
		if len(readBuffer)%2==0:
			for i in xrange(0,len(readBuffer),2):
				print total,readBuffer[i][3].decode('cp936').encode('utf-8').split('线')[1],readBuffer[i+1][3].decode('cp936').encode('utf-8').split('线')[1],readBuffer[i][2],readBuffer[i+1][2]
				pass
			pass
		cardNo = line[0]
		readBuffer = [line]
		# readBuffer.append(line)
		# print '```'
    # cardNo = line[0].decode('cp936').encode('utf-8')
    # if dataType != '地铁':
    #     continue;
    # else :
    #     location = line[3].decode('cp936').encode('utf-8').split('线')[1]
    #     if locationList.count(location)==0:
    #         locationList.append(location)
    #         locationCount.append(1)
    #     else :
    #         locationCount[locationList.index(location)] +=1

	total += 1;
	if total>=20:
	    break;

print total,available

# for  i in range(len(locationList)):
#     print locationList[i],locationCount[i]
# print total
c.close()




# a = open("SPTCC-20150406.csv", "r")
# print len(a.readlines())

