from flask import Flask, render_template, jsonify, request
from itsdangerous import exc
from sqlalchemy import create_engine, text
from sqlalchemy.orm import scoped_session, sessionmaker
from flask_cors import CORS
from sqlalchemy.exc import SQLAlchemyError
import logging

from contextlib import contextmanager
app = Flask(__name__,static_folder='static', static_url_path='/static')
CORS(app)
# MySQL数据库连接字符串
#db_url = 'mysql+pymysql://root:593840702zty8@localhost/yelvse?charset=utf8mb4'
db_url = 'mysql+pymysql://root:593840702zty8@172.22.24.186:3306/yelvse?charset=utf8mb4'



# 创建数据库引擎
engine = create_engine(db_url)

# 创建会话工厂
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))

# 设置日志记录配置
logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s - %(levelname)s - %(message)s')
variable1 = "2024-01-01"  # 获取 variable1 的值
variable2 = "00:00"  # 获取 variable2 的值
# Flask route定义
@app.route('/')
def index():
    table_name = '2024-01-01'
    rows = []
    try:
        with db_session() as session:
            sql = text(f"SELECT * FROM `{table_name}` WHERE `time` LIKE CONCAT('%', :variable2, '%')")
            result = session.execute(sql, {'variable2': variable2})

            for row in result:
                rows.append({
                    'name': row.name,
                    'count': row.count,
                    'count2': row.count2,
                    'lat': row.lat,
                    'lng': row.lng,
                    'water_temp': row.water_temp,
                    'salinity': row.salinity,
                    'wind_temp': row.wind_temp,
                    'wind_direction': row.wind_direction,
                    'water_direction': row.water_direction,
                    'water_speed': row.water_speed,
                    'wind_speed': row.wind_speed,
                    'time': row.time,
                    # 添加其他需要的字段
                })
    except SQLAlchemyError as e:
        # 处理数据库查询异常，例如输出日志或其他处理方式
        print(f"Database error: {e}")
        row=[]

    # 如果发生异常或查询结果为空，返回空数组
    return render_template('index.html', data=rows)


selected_layer = "count"
@app.route('/process_data', methods=['POST'])
def process_data():
    data = request.get_json()  # 获取发送过来的 JSON 数据
    global variable1,variable2,selected_layer
    variable1 = data.get('variable1')  # 获取 variable1 的值
    variable2 = data.get('variable2')  # 获取 variable2 的值
    selected_layer = data.get('variable3')
    # 在这里可以对 variable1 和 variable2 进行进一步的处理
    # 比如保存到数据库、进行计算等
    try:
        with db_session() as session:
            sql = text(f"SELECT * FROM `{variable1}` WHERE `time` LIKE CONCAT('%', :variable2, '%')")

        # 执行 SQL 查询
            result = session.execute(sql, {'variable2': variable2})
            rows = []
            for row in result:
                rows.append({
                    'name': row.name,
                    'count':row.count,
                    'count2': row.count2,
                    'lat':row.lat,
                    'lng':row.lng,
                    'water_temp': row.water_temp,
                    'salinity': row.salinity,
                    'wind_temp': row.wind_temp,
                    'wind_direction': row.wind_direction,
                    'water_direction': row.water_direction,
                    'water_speed': row.water_speed,
                    'wind_speed': row.wind_speed,
                    'time': row.time,
                # 添加其他需要的字段
                })
    except SQLAlchemyError as e:
      # 表不存在时，返回空的 rows 数组
        rows = []
    # 返回响应给前端

    response_data = {'message': '接收到的变量值是：' + variable1 + ', ' + variable2}
    return jsonify(rows)

@app.route('/tuceng_data', methods=['POST'],endpoint='different_route_endpoint')
def process_data():
    data = request.get_json()  # 获取发送过来的 JSON 数据
    global selected_layer
    selected_layer = data.get('selectedLayer')  # 获取 variable1 的值
    try:
        with db_session() as session:
            sql = text(f"SELECT * FROM `{variable1}` WHERE `time` LIKE CONCAT('%', :variable2, '%')")

        # 执行 SQL 查询
            result = session.execute(sql, {'variable2': variable2})
            rows = []
            for row in result:
                rows.append({
                    'name': row.name,
                    'count':row.count,
                    'count2': row.count2,
                    'lat':row.lat,
                    'lng':row.lng,
                    'water_temp':row.water_temp,
                    'salinity': row.salinity,
                    'wind_temp': row.wind_temp,
                    'wind_direction': row.wind_direction,
                    'water_direction': row.water_direction,
                    'water_speed': row.water_speed,
                    'wind_speed': row.wind_speed,
                    'time': row.time,
                # 添加其他需要的字段
                })
    except SQLAlchemyError as e:
      # 表不存在时，返回空的 rows 数组
        rows = []
    # 返回响应给前端

    response_data = {'message': '接收到的变量值是：' + variable1 + ', ' + variable2}
    return jsonify(rows)


@app.route('/receive-coordinates', methods=['POST'])
def receive_coordinates():
    # 解析 JSON 数据
    data = request.json
    lng1 = float(data.get('lng'))  # 获取经度
    lat1 = float(data.get('lat')) # 获取纬度
    try:
        with db_session() as session:
            sql = text(f"SELECT * FROM `{variable1}` WHERE lat = :lat1 AND lng = :lng1 ORDER BY time ASC")
            # 执行 SQL 查询
            result = session.execute(sql,{'lat1': lat1,'lng1': lng1})

            rows = []
            for row in result:
                rows.append({
                    'name': row.name,
                    'count':row.count,
                    'count2': row.count2,
                    'lat':row.lat,
                    'lng':row.lng,
                    'water_temp':row.water_temp,
                    'salinity': row.salinity,
                    'wind_temp': row.wind_temp,
                    'wind_direction': row.wind_direction,
                    'water_direction': row.water_direction,
                    'water_speed': row.water_speed,
                    'wind_speed': row.wind_speed,
                    'time': row.time,
                    # 添加其他需要的字段
                })
    except SQLAlchemyError as e:
        # 表不存在时，返回空的 rows 数组
        logging.error('An SQLAlchemy error occurred: %s', str(e))
        rows = []
    # 在这里可以对接收到的经纬度数据进行处理
    # 例如打印到控制台或者进行其他操作

    # 返回一个简单的响应
    response = {'message': 'Received coordinates', 'lng': lng1, 'lat': lat1}
    return jsonify(rows)



@app.route('/dongtai_data', methods=['POST'],endpoint='dongtai_route_endpoint')
def process_data():
    data = request.get_json()
    try:
        with db_session() as session:
            sql = text(f"SELECT * FROM `{variable1}` ORDER BY time ASC")
        # 执行 SQL 查询
            result = session.execute(sql)
            rows = []
            rowss = []
            flag = 1
            for row in result:
                if flag==1:
                    time1 = row.time
                if row.time==time1:
                    rowss.append({
                        'name': row.name,
                        'count': row.count,
                        'count2': row.count2,
                        'lat': row.lat,
                        'lng': row.lng,
                        'water_temp': row.water_temp,
                        'salinity': row.salinity,
                        'wind_temp': row.wind_temp,
                        'wind_direction': row.wind_direction,
                        'water_direction': row.water_direction,
                        'water_speed': row.water_speed,
                        'wind_speed': row.wind_speed,
                        'time': row.time,
                        # 添加其他需要的字段
                    })
                    flag=0
                else:
                    rows.append(rowss)
                    time1 = row.time
                    rowss = []
                    rowss.append({
                        'name': row.name,
                        'count': row.count,
                        'count2': row.count2,
                        'lat': row.lat,
                        'lng': row.lng,
                        'water_temp': row.water_temp,
                        'salinity': row.salinity,
                        'wind_temp': row.wind_temp,
                        'wind_direction': row.wind_direction,
                        'water_direction': row.water_direction,
                        'water_speed': row.water_speed,
                        'wind_speed': row.wind_speed,
                        'time': row.time,
                        # 添加其他需要的字段
                    })
            rows.append(rowss)
    except SQLAlchemyError as e:
      # 表不存在时，返回空的 rows 数组
        rows = []
    # 返回响应给前端

    return jsonify(rows)


if __name__ == '__main__':
    app.run(debug=True)
