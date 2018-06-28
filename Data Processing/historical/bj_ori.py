# coding: utf-8
def build_subway(**lines):
    """
    Input is build_subway(linename='station1 station2...'...)
    Ouput is a dictionary like {station:{neighbor1:line number,neighbor2:line number,...},station2:{...},...}
    """
    for key in lines.keys():
        value = lines[key]
        lines[key] = value.split()
    stations = set()
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
                    next_station[line[1]] = key
                elif idx == len(line)-1:
                    next_station[line[idx-1]]=key
                else:
                    next_station[line[idx-1]] = key
                    next_station[line[idx+1]] = key
        system[station] = next_station
    return system

def update_subway(BeiJingSubway):
    """
    due to line2 and line10 are circle lines.
    the BeiJingSubway need to update
    """
    BeiJingSubway['西直门']['积水潭'] = 'line2'
    BeiJingSubway['积水潭']['西直门'] = 'line2'
    BeiJingSubway['劲松']['潘家园'] = 'line10'
    BeiJingSubway['潘家园']['劲松'] = 'line10'
    return BeiJingSubway


bj_subway = build_subway(line1='''苹果园 古城路 八角游乐园 八宝山 玉泉路 五棵松 万寿路 公主坟 军事博物馆 木樨地
南礼士路 复兴门 西单 天安门西 天安门东 王府井 东单 建国门 永安里 国贸 大望路 四惠 四惠东''',
                       line2='''西直门 车公庄 阜成门 复兴门 长椿街 宣武门 和平门 前门 崇文门 北京站 建国门
朝阳门 东四十条 东直门 雍和宫 安定门 鼓楼大街 积水潭''',
                       line5='''宋家庄 刘家窑 蒲黄榆 天坛东门 磁器口 崇文门 东单 灯市口 东四 张自忠路
北新桥 雍和宫 和平里北街 和平西桥 惠新西街南口 惠新西街北口 大屯桥东 北苑路北 立水桥南 立水桥 天通苑南 天通苑 天通苑北''',
                       line4='''天宫院 生物医药基地 义和庄 黄村火车站 黄村西大街 清源路 枣园 高米店南
高米店北 西红门 新宫 公益西桥 角门西 马家堡 北京南站 陶然亭 菜市口 宣武门 西单 灵境胡同 西四
平安里 新街口 西直门 动物园 国家图书馆 魏公村 人民大学 海淀黄庄 中关村 北京大学东门 圆明园 西苑 北宫门 安河桥北''',
                       line6='''海淀五路居 慈寿寺 白石桥南 车公庄西 车公庄 平安里 北海北 南锣鼓巷 东四 朝阳门 东大桥
呼家楼 金台路 十里堡 青年路 褡裢坡 黄渠 常营 草房 物资学院路 通州北关 通运门 北运河西 北运河东 郝家府 东夏园 潞城''',
                       line8='''朱辛庄 育知路 平西府 回龙观东大街 霍营 育新 西小口 永泰庄 林萃桥 森林公园南门
奥林匹克公园 奥体中心 北土城 安华桥 鼓楼大街 什刹海 南锣鼓巷''',
                       line9='''国家图书馆 白石桥南 白堆子 军事博物馆 北京西站 六里桥东 六里桥 七里庄
丰台东大街 丰台南路 科怡路 丰台科技园 郭公庄''',
                       line10='''劲松 双井 国贸 金台夕照 呼家楼 团结湖 农业展览馆 亮马桥 三元桥 太阳宫 芍药居
惠新西街南口 安贞门 北土城 健德门 牡丹园 西土城 知春路 知春里 海淀黄庄 苏州街 巴沟 火器营
长春桥 车道沟 慈寿寺 西钓鱼台 公主坟 莲花桥 六里桥 西局 泥洼 丰台站 首经贸 纪家庙 草桥
角门西 角门东 大红门 石榴庄 宋家庄 成寿寺 分钟寺 十里河 潘家园''',
                       line13='''西直门 大钟寺 知春路 五道口 上地 西二旗 龙泽 回龙观 霍营 立水桥 北苑 望京西
                        芍药居 光熙门 柳芳 东直门''',
                       line14='''张郭庄 园博园 大瓦窑 郭庄子 打井 七里庄 西局''',
                       line15='''俸伯 顺义 石门 南法信 后沙峪 花梨坎 国展 孙河 马泉营 崔各庄望京 望京西''',
                       YiZhuangLine='''宋家庄 肖村 小红门 旧宫 亦庄桥 亦庄文化园 万源街 荣京东街 荣昌东街
                       同济南路 经海路 次渠南 次渠''',
                       FangShanLine='''郭公庄 大葆台 稻田 长阳 篱笆房 广阳城 良乡大学城北 良乡大学城 良乡大学城西 良乡南关 苏庄''',
                       ChangPingLine='西二旗 生命科学园 朱辛庄 巩华城 沙河 沙河高教园 南邵',
                       BaTongLine='''四惠 四惠东 高碑店 中国传媒大学 双桥 管庄 八里桥 通州北苑 果园 九棵树 梨园 临河里 土桥''')
bj_subway = update_subway(bj_subway)



def shorter_path(start, goal):
    """
    without consideration of the change times fina shortest path
    """
    if start == goal:
        return [start]
    explored = set() 
    queue = [ [start] ] 
    while queue:
        path = queue.pop(0)
        s = path[-1]
        for state, action in bj_subway[s].items():
            if state not in explored:
                explored.add(state)
                path2 = path + [action, state]
                if state == goal:
					# print path2
					# for x in queue:
					#     print x
					return path2
                else:
                    queue.append(path2)
    return []

def path_search(start, goal):
    """Find the shortest path from start state to a state
    with min change times such that is_goal(state) is true."""
    if start == goal:
        return [start]
    explored = set() 
    queue = [ [start, ('', 0)] ]
    while queue:
        path = queue.pop(0)
        s = path[-2]
        linenum, changetimes = path[-1]
        if s == goal:
            print changetimes
            print path
            for x in queue:
                print x
            return path
        for state, action in bj_subway[s].items():
            if state not in explored:
                linechange = changetimes + 1
                explored.add(state)
                if linenum != action:
                    linechange += 2
                path2 = path[:-1] + [action, state, (action, linechange)]
                queue.append(path2)
                queue.sort(key=lambda path:path[-1][-1])
    return []


def find_path(here, there, system=bj_subway):
    """
    Return a path on the subway system from here to there.
    find a better path between the change-time-less path and shorter path
    """

    min_change_path = path_search(here, there)[::2]
    short_path = shorter_path(here, there)[::2]
    # if len(min_change_path) <= len(short_path):
    for ele in min_change_path:
        print(ele)
    print(len(min_change_path))
    # else:
    #     for ele in short_path:
    #         print(ele)
    #     print(len(short_path))

find_path('中关村','知春里')