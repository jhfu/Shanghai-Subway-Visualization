# coding: utf-8

import random
result = '{\n'
stationNames = []


index = 0
c = open('datavistest/stations_by_name_with_alias_src.json','rb')
readlines = c.readlines()
for line in readlines:
    if len(line)>10:
    	temp = line.split('\": {')
    	stationName = temp[0][2:]
    	stationInfo = (temp[1]).split('}')[0]
    	index += 1

    	countRandom = random.uniform(2, 5)

    	temp = '"%s":{%s,"count": [1,%d]},\n' %(stationName,stationInfo,countRandom)
    	result += temp
    	if stationNames.count(stationName)==0:
    		stationNames.append(stationName)
    	else:
    		print stationName,index
    		# pass
    	# print temp[0],temp[1]
c.close()
print index,len(stationNames)
# for x in stationNames:
# 	print x

result = result[:-2]+'\n}'

# file_object = open('datavistest/stations_by_name_with_alias.json', 'w')
# file_object.write(result)
# file_object.close()



result = '[\n'
index = 0
c = open('datavistest/connections_by_station_name_src.json','rb')
readlines = c.readlines()
for line in readlines:
    if len(line)>5:
    	temp = line.split(']')
    	connectionsInfo = temp[0]

    	countRandom = random.uniform(0, 100)
    	# countRandom = index
    	index += 1
    	temp = '%s, [0,%f]],\n' %(connectionsInfo,countRandom)
    	result += temp
    	print temp
c.close()

# for x in stationNames:
# 	print x

result = result[:-2]+'\n]'

file_object = open('datavistest/connections_by_station_name.json', 'w')
file_object.write(result)
file_object.close()
