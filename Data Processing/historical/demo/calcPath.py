# coding: utf-8

import csv
c=open("lineListTest.csv","rb") #以rb的方式打开csv文件
lineList = [];
metroMap = {}
read=csv.reader(c)
for line in read:
    lineList.append(line)
    # if 1==1:
        # pass
    if metroMap.has_key(line[1]):
        metroMap[line[1]].append(line[2])
        pass
    else:
        metroMap[line[1]] = [line[2]]

    for i in xrange(2,len(line)-1):
        if metroMap.has_key(line[i]):
            metroMap[line[i]].append(line[i-1])
            metroMap[line[i]].append(line[i+1])
            pass
        else:
            metroMap[line[i]] = [line[i-1],line[i+1]]

    if metroMap.has_key(line[i+1]):
        metroMap[line[i+1]].append(line[i])
        pass
    else:
        metroMap[line[i+1]] = [line[i]]


c.close()
print metroMap
print lineList

# graph = {'A': ['B', 'C'],
#              'B': ['C', 'D'],
#              'C': ['D'],
#              'D': ['C'],
#              'E': ['F'],
#              'F': ['C']}



def find_all_paths(graph, start, end, path=[]):
    path = path + [start]
    if start == end:
        return [path]
    if not graph.has_key(start):
        return []
    paths = []
    for node in graph[start]:
        if node not in path:
            newpaths = find_all_paths(graph, node, end, path)
            for newpath in newpaths:
                paths.append(newpath)
    return paths

def find_shortest_path(graph, start, end, path=[]):
    path = path + [start]
    if start == end:
        return path
    if not graph.has_key(start):
        return None
    shortest = None
    for node in graph[start]:
        if node not in path:
            newpath = find_shortest_path(graph, node, end, path)
            if newpath:
                if not shortest or len(newpath) < len(shortest):
                    shortest = newpath
    return shortest


print find_all_paths(metroMap,'A','K')
print find_shortest_path(metroMap,'A','E')
