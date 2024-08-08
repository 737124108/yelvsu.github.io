// function updateTime() {
//     const now = new Date();
//     const timeString = now.toLocaleTimeString();
//     document.getElementById('current-time').textContent = timeString;
// }

// // 初次加载时显示时间
// updateTime();
// // 每秒更新一次时间
// setInterval(updateTime, 1000);


// var data;
// var geoCoordMap;
 document.addEventListener('DOMContentLoaded', function() {
   console.log('Data from server:', dataFromServer);

 });

 let middlecontainer = document.getElementById('mapDiv'); // 获取容器元素，通过其 ID 或者其他方式

 //container.innerHTML = ''; // 清空容器的所有子元素
//天地图加载
var quanjvdata = [];
var selectedLayer="count";
    var map;
    var map2;
    var zoom = 5;
    var heatmapOverlay;
    if (!isSupportCanvas()) {
        alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~');
    }
    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            // var geoCoord = data[data[i].name];
             if (data[i].lat!=null&&data[i].lng!=null) {
                res.push({
                    name: data[i].name,
                    lat: data[i].lat,
                    lng: data[i].lng,
                    count: data[i].count,
                    count2:data[i].count2,
                    water_direction:data[i].water_direction,
                    water_temp:data[i].water_temp,
                    salinity:data[i].salinity,
                    wind_temp:data[i].wind_temp,
                    wind_speed: data[i].wind_speed,
                    water_speed:data[i].water_speed,
                    wind_direction: data[i].wind_direction,
                    time:data[i].time
                });
             
            }
        }
        return res;
    };
    var points = convertData(dataFromServer);
    quanjvdata=points;
   // console.log(typeof points[0].lng);
function setStyle(rect, fillColor) {
    rect.setOptions({
        fillColor: fillColor,
        color: fillColor,
        strokeWeight: 3,
        fillOpacity: 1
    });
  }
   function setRectangleStyle(rect, count,bbb) {
    if(bbb=='wind_speed'){
      if (count < 0.3) {
        setStyle(rect, "rgba(109, 168, 176)");
    } else if (count < 0.5) {
        setStyle(rect, "rgba(118, 173, 173)");
    } else if (count < 1) {
        setStyle(rect, "rgba(145, 186, 162)");
    } else if (count < 1.5) {
        setStyle(rect, "rgba(156, 191, 155)");
    } else if (count < 1.9) {
        setStyle(rect, "rgba(181, 207, 145)");
    } else if (count < 2.1) {
      setStyle(rect, "rgba(203, 219, 129)");
    } else if (count < 2.3) {
      setStyle(rect, "rgba(235, 240, 110)");//黄
    } else if (count < 2.5) {
      setStyle(rect, "rgba(247, 247, 101)");
    } else if (count < 2.7) {
      setStyle(rect, "rgba(252, 237, 93)");
    } else if (count < 2.9) {
      setStyle(rect, "rgba(252, 216, 83)");
    } else if (count < 3) {
      setStyle(rect, "rgba(252, 206, 78)");
    } else if (count < 3.3) {
      setStyle(rect, "rgba(252, 193, 73)");
    } else if (count < 3.5) {
      setStyle(rect, "rgba(252, 171, 66)");
    } else if (count < 4.5) {
      setStyle(rect, "rgba(252, 163, 61)");
    } else if (count < 5) {
      setStyle(rect, "rgba(247, 122, 45)");//红
    } else if (count < 6) {
      setStyle(rect, "rgba(249, 133, 50)");
    } else if (count < 7) {
      setStyle(rect, "rgba(242, 81, 31)");
    } else if (count < 7.5) {
      setStyle(rect, "rgba(237, 45, 24)");
    } else if (count < 8.5) {
      setStyle(rect, "rgba(237, 24, 21)");
    } else if (count >=8.5) {
      setStyle(rect, "rgba(232, 16, 20)");
    } 
    }
    else if(bbb=='water_temp'){
      if (count == 0) {
        setStyle(rect, "rgba(69, 117, 181)");
    } else if (count < 13.5) {
        setStyle(rect, "rgba(123, 152, 186)");
    } else if (count < 15.8) {
        setStyle(rect, "rgba(174, 189, 188)");
    } else if (count < 17.9) {
        setStyle(rect, "rgba(227, 232, 190)");
    } else if (count < 19.9) {
        setStyle(rect, "rgba(255, 227, 166)");
    } else if (count < 21.9) {
      setStyle(rect, "rgba(247, 164, 116)");
    } else if (count < 23.3) {
      setStyle(rect, "rgba(235, 110, 75)");//黄
    } else if (count >= 23.3) {
      setStyle(rect, "rgba(214, 47, 39)");
    } 
    }
    else if(bbb=='water_speed'){
      if (count < 0.02) {
        setStyle(rect, "rgba(56, 168, 0)");
    } else if (count < 0.04) {
        setStyle(rect, "rgba(102, 191, 0)");
    } else if (count < 0.06) {
        setStyle(rect, "rgba(155, 217, 0)");
    } else if (count < 0.1) {
        setStyle(rect, "rgba(222, 242, 0)");
    } else if (count < 0.2) {
        setStyle(rect, "rgba(255, 221, 0)");
    } else if (count < 0.4) {
      setStyle(rect, "rgba(255, 145, 0)");
    } else if (count < 0.6) {
      setStyle(rect, "rgba(255, 72, 0)");//黄
    } else if (count < 0.9) {
      setStyle(rect, "rgba(255, 0, 0)");
    } else if (count >= 0.9) {
      setStyle(rect, "rgba(255, 0, 0)");
    } 
    }
    else if(count<3){
    if (count < -4.8313108) {
        setStyle(rect, "rgba(56, 168, 0)");
    } else if (count < -2.25365549) {
        setStyle(rect, "rgba(102, 191, 0)");
    } else if (count < -1.5734408) {
        setStyle(rect, "rgba(155, 217, 0)");
    } else if (count < -1.17963243) {
        setStyle(rect, "rgba(222, 242, 0)");
    } else if (count < -0.7858239) {
        setStyle(rect, "rgba(255, 221, 0)");
    } else if (count < -0.3204139) {
      setStyle(rect, "rgba(255, 145, 0)");
    } else if (count < 0.61040597) {
      setStyle(rect, "rgba(255, 72, 0)");//黄
    } else if (count < 2.221440554) {
      setStyle(rect, "rgba(255, 0, 0)");
    } else if (count >= 2.221440554) {
      setStyle(rect, "rgba(255, 0, 0)");
    } 
  }
  
  else if(count>30){
    if (count < 31.20) {
      setStyle(rect, "rgba(109, 168, 176)");
  } else if (count < 31.50) {
      setStyle(rect, "rgba(118, 173, 173)");
  } else if (count < 32.00) {
      setStyle(rect, "rgba(145, 186, 162)");
  } else if (count < 32.40) {
      setStyle(rect, "rgba(156, 191, 155)");
  } else if (count < 32.60) {
      setStyle(rect, "rgba(181, 207, 145)");
  } else if (count < 32.80) {
    setStyle(rect, "rgba(203, 219, 129)");
  } else if (count < 33.00) {
    setStyle(rect, "rgba(235, 240, 110)");//黄
  } else if (count < 33.20) {
    setStyle(rect, "rgba(247, 247, 101)");
  } else if (count < 33.40) {
    setStyle(rect, "rgba(252, 237, 93)");
  } else if (count < 33.50) {
    setStyle(rect, "rgba(252, 216, 83)");
  } else if (count < 33.60) {
    setStyle(rect, "rgba(252, 206, 78)");
  } else if (count < 33.70) {
    setStyle(rect, "rgba(252, 193, 73)");
  } else if (count < 33.80) {
    setStyle(rect, "rgba(252, 171, 66)");
  } else if (count < 33.90) {
    setStyle(rect, "rgba(252, 163, 61)");
  } else if (count < 34.00) {
    setStyle(rect, "rgba(247, 122, 45)");//红
  } else if (count < 34.10) {
    setStyle(rect, "rgba(249, 133, 50)");
  } else if (count < 34.20) {
    setStyle(rect, "rgba(242, 81, 31)");
  } else if (count < 34.30) {
    setStyle(rect, "rgba(237, 45, 24)");
  } else if (count < 34.40) {
    setStyle(rect, "rgba(237, 24, 21)");
  } else if (count >=34.40) {
    setStyle(rect, "rgba(232, 16, 20)");
  } 
  }
  else if(count>7&&count<30){
    if (count < 8) {
      setStyle(rect, "rgba(109, 168, 176)");
  } else if (count < 8.5) {
      setStyle(rect, "rgba(118, 173, 173)");
  } else if (count < 12) {
      setStyle(rect, "rgba(145, 186, 162)");
  } else if (count < 15) {
      setStyle(rect, "rgba(156, 191, 155)");
  } else if (count < 17) {
      setStyle(rect, "rgba(181, 207, 145)");
  } else if (count < 19) {
    setStyle(rect, "rgba(203, 219, 129)");
  } else if (count < 20) {
    setStyle(rect, "rgba(235, 240, 110)");//黄
  } else if (count < 20.1) {
    setStyle(rect, "rgba(247, 247, 101)");
  } else if (count < 20.4) {
    setStyle(rect, "rgba(252, 237, 93)");
  } else if (count < 20.6) {
    setStyle(rect, "rgba(252, 216, 83)");
  } else if (count < 20.8) {
    setStyle(rect, "rgba(252, 206, 78)");
  } else if (count < 21) {
    setStyle(rect, "rgba(252, 193, 73)");
  } else if (count < 21.2) {
    setStyle(rect, "rgba(252, 171, 66)");
  } else if (count < 21.4) {
    setStyle(rect, "rgba(252, 163, 61)");
  } else if (count < 21.6) {
    setStyle(rect, "rgba(247, 122, 45)");//红
  } else if (count < 21.8) {
    setStyle(rect, "rgba(249, 133, 50)");
  } else if (count < 22) {
    setStyle(rect, "rgba(242, 81, 31)");
  } else if (count < 22.5) {
    setStyle(rect, "rgba(237, 45, 24)");
  } else if (count < 23) {
    setStyle(rect, "rgba(237, 24, 21)");
  } else if (count >=23) {
    setStyle(rect, "rgba(232, 16, 20)");
  } 
  }
}
let leftmap2 = document.querySelector('.navbar-middle-left');
let rightmap2 = document.querySelector('.navbar-middle-right');
map = new T.Map(leftmap2,'mapDiv');
map2 = new T.Map(rightmap2,'mapDiv2');
function onLoad() {
            //map = new T.Map('mapDiv');
            var selectedButton2 = document.getElementById('countButton');
                selectedButton2.classList.add('active');
            map.centerAndZoom(new T.LngLat(133.98808446017483, 38.99443575790634), zoom);
            map2.centerAndZoom(new T.LngLat(133.98808446017483, 38.99443575790634), zoom);
            // if(points!=null){
            //   for (var i = 0; i < points.length; i++) {
            //       var bounds = new T.LngLatBounds(new T.LngLat(points[i].lng-0.045,points[i].lat-0.045 ),new T.LngLat( points[i].lng+0.045,points[i].lat+0.045));
            //       var rect = new T.Rectangle(bounds);
            //       setRectangleStyle(rect, points[i].count);
            //       map.addOverLay(rect);
            //  }
           
            huaRectangle(points,'count');
            
              // 在这里执行画矩形的函数
              huaRectangle2(points,'water_temp');
                         
             var controlPosition=T_ANCHOR_BOTTOM_LEFT;
       
               //创建缩放平移控件对象
               control = new T.Control.Zoom();
            //   //添加缩放平移控件
               map.addControl(control);
               control.setPosition(controlPosition);

               var scale = new T.Control.Scale();
               //添加比例尺控件
               map.addControl(scale);
        }

      

        
        var chart = null;
function huaRectangle(points,count) {
          map.clearOverLays();
          var marker =null;
          if (points != null) {
            console.log(points.length);
              for (var i = 0; i < points.length; i++) {
                  (function(index) { // 创建闭包来捕获每次循环的索引值
                      var bounds = new T.LngLatBounds(
                          new T.LngLat(points[index].lng - 0.045, points[index].lat - 0.045),
                          new T.LngLat(points[index].lng + 0.045, points[index].lat + 0.045)
                      );
                      var rect = new T.Rectangle(bounds);
                      var countValue = points[index][count];
                      
                      setRectangleStyle(rect, countValue,selectedLayer);
                      
                      var infoWin1 = new T.InfoWindow();
                    
                      
                      rect.addEventListener('click', function(event) {
                        
                  
                          // rect.openInfoWindow(infoWin1); // 在点击的位置打开信息窗口
                          
                          // 发送数据到Python服务器
                          var data = {
                              lng: points[index].lng,
                              lat: points[index].lat
                          };
                          updateCoordinates(points[index].lng, points[index].lat);
                          fetch('http://localhost:5000/receive-coordinates', {
                              method: 'POST',
                              headers: {
                                  'Content-Type': 'application/json'
                              },
                              body: JSON.stringify(data)
                          })
                          .then(response => response.json())
                          .then(data => {
                              console.log('Response from server:', data);
                              let labelss=[]
                              let valuess=[]
                              let data1=[]  //图层值
                              let data2=[]  //叶绿素预测值
                              let data3=[]  //叶绿素真实值
  //                             updateCoordinates(longitude, latitude);
  // updateCharts(data1, data2, data3);
                              for (let i = 0; i < data.length; i++) {
                                
                                console.log(data[i].time.split(" ")[1]);
                                console.log(typeof(data[i].time.split(" ")[1]))
                                console.log(data[i][count])
                                  //labelss[i]=data[i].time.split(" ")[1];
                                if(data[i][count]!=null){
                                let flag=data[i].time.split(" ")[1];
                                let hours = parseInt(flag.split(':')[0], 10);
                                labelss[i]=hours;
                      
                                valuess[i]=data[i][selectedLayer];
                                data1.push(data[i][selectedLayer]);
                                data2.push(data[i]['count']);
                                data3.push(data[i]['count2']);
                                }
                                
                               
                              }
                              var chartData = {
                                labels: labelss,
                                values: valuess,
                                label: 'count',  // 可选，数据集的标签
                                borderColor: 'green',   // 可选，数据集的边框颜色
                                backgroundColor: 'rgba(0, 255, 0, 0.1)',  // 可选，数据集的背景颜色
                                borderWidth: 2  // 可选，数据集的边框宽度
                            };
                            //updateCharts(data1, data2, data3);
                            console.log(data1);
                            if(marker!=null){
                            map.removeOverLay(marker);
                            }
                            createLineChart(chart1, labelss, data1);
                            if(selectedLayer=='count'){
                            createLineChart2(chart2, labelss, data2,data3);
                            }
                      //         var content = '<div style="position: relative;width:200px; height:150px;margin-left=0;">';
                      //         content += '<div style="display: block;">lat:' + points[index].lat + ','+'lng:'+points[index].lng+'</div>';
                      //            content += '<div style="display: block;">数据：' + points[index][count] + '</div>';
                      //            content += '<div style="position: absolute; bottom: 0; left: 0;width:100px; height:100px"><canvas id="lineChartCanvas"></canvas></div>'; // 添加 canvas 元素
                      // // 如果需要添加图片，可以取消下一行代码的注释
                      // // content += '<img src="' + points[index].imageUrl + '" alt="图片">';
                      //            content += '</div>';
                       console.log(points[index].lat);
                       console.log(points[index].lng);
                      //infoWin1.setContent(content);
                       //创建标注对象
            marker = new T.Marker(new T.LngLat(points[index].lng, points[index].lat));
            //向地图上添加标注
            map.addOverLay(marker);
                      //drawLineChart(chartData);
                      
                              // 可以在这里处理从服务器返回的数据
                          })
                          .catch(error => {
                              console.error('Error sending data to server:', error);
                          });
                      });
                      map.addOverLay(rect);
                  })(i); // 传入当前循环的索引值作为参数
              }
          }
      }
      



function huaRectangle2(dataditu2,selectedLayer) {
        map2.clearOverLays();
        //console.log('260',dataditu2);
        if (dataditu2 != null) {
            for (var i = 0; i < dataditu2.length; i++) {
                (function(index) { // 创建闭包来捕获每次循环的索引值
                    var bounds2 = new T.LngLatBounds(
                        new T.LngLat(dataditu2[index].lng - 0.045, dataditu2[index].lat - 0.045),
                        new T.LngLat(dataditu2[index].lng + 0.045, dataditu2[index].lat + 0.045)
                    );
                    //console.log(dataditu2[index].temp);
                    var rect2 = new T.Rectangle(bounds2);
                    setRectangleStyle(rect2, dataditu2[index][selectedLayer],selectedLayer);
                    
                    var infoWin2 = new T.InfoWindow();
                    // var content = '<div>';
                    // content += '<p>数据：' + points[index].count + '</p>';
                    // // 如果需要添加图片，可以取消下一行代码的注释
                    // // content += '<img src="' + points[index].imageUrl + '" alt="图片">';
                    // content += '</div>';
                    
                    // infoWin1.setContent(content);
                    // map.addOverLay(rect);
                    
                    rect2.addEventListener('click', function(event) {
                      //rect.closeInfoWindow(infoWin1);
                
                        rect2.openInfoWindow(infoWin2); // 在点击的位置打开信息窗口
                        
                        // 发送数据到Python服务器
                        

                            var content = '<div style="position: relative;width:200px; height:150px;margin-left=0;">';
                            content += '<div style="display: block;">lat:' + dataditu2[index].lat + ','+'lng:'+dataditu2[index].lng+'</div>';
                               content += '<div style="display: block;">数据：' + dataditu2[index].count + '</div>';
                               content += '</div>';
                     console.log(dataditu2[index].lat);
                     console.log(dataditu2[index].lng);
                    infoWin2.setContent(content);
                    
                            // 可以在这里处理从服务器返回的数据
                       
                    });
                    map2.addOverLay(rect2);
                })(i); // 传入当前循环的索引值作为参数
            }
        }
    }


      function drawLineChart(data) {
        // 准备一个新的canvas元素
        var canvas = document.getElementById('lineChartCanvas');
        var ctx = canvas.getContext('2d');
        //document.body.appendChild(canvas);  // 将canvas添加到body中，你可以根据需要调整这里的添加位置
        if (chart) {
          chart.destroy();

      }
        // 使用Chart.js创建折线图
         chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,  // 使用传入的数据对象中的标签数组
                datasets: [{
                    label: data.label || '',  // 数据集的标签，默认为'Line Chart'
                    data: data.values,  // 使用传入的数据对象中的数据数组
                    borderColor: data.borderColor || 'rgba(0, 0, 0, 0)',  // 数据集边框颜色，默认为蓝色
                    backgroundColor: data.backgroundColor || 'rgba(0, 0, 0, 0)',  // 数据集背景颜色，默认为浅蓝色
                    borderWidth: data.borderWidth || 0  // 数据集边框宽度，默认为1像素
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        
        return chart;  // 返回图表对象，如果需要进一步操作或者监视图表，可以使用返回的对象
    }

function isSupportCanvas() {
  var elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
}

//是否显示热力图
function openHeatmap() {
  heatmapOverlay.show();
}

function closeHeatmap() {
  heatmapOverlay.hide();
}
function reloadContainer(data11,data22) {
  console.log(selectedLayer);
  huaRectangle(data11,data22);
}

//画剪头
function drawOceanCurrents(data) {
  // 假设数据格式为 [{ lat: 30, lng: -120, direction: 45 }, { lat: 40, lng: -110, direction: 90 }, ...]
  // 这里的 direction 可以是角度，表示箭头的方向
  map.clearOverLays();
  let newArray = [];
let length=data.length;
let [flag1,flag2,flag3,flag4,flag5,flag6,flag7,flag8,flag9,flag10,flag11,flag12,flag13,flag14,flag15,flag16,flag17,flag18,flag19,flag20,flag21,flag22,flag23,flag24,flag25,flag26,flag27,flag28,flag29,flag30,flag31,flag32,flag33,flag34,flag35,flag36,flag37,flag38,flag39,flag40,flag41,flag42,flag43,flag44,flag45,flag46,flag47,flag48,flag49,flag50] = [1, 1,1, 1,1, 1,1, 1,1, 1,1, 1,1, 1,1, 1,1, 1,1, 1,1, 1,1, 1,1, 1,1, 1,1, 1,1, 1,1,1, 1,1, 1,1, 1,1, 1,1, 1,1, 1,1, 1,1, 1,1];
// 遍历原始数组，每隔十个元素提取一个数据
for (let i = 0; i < data.length; i += 1) {
    if((data[i].lat<46.1550849987&&data[i].lat>45.6550849987&&data[i].lng>138.8457799451&&data[i].lng<139.3457799451&&flag1==1)){
      newArray.push(data[i]);
      flag1=0;
  }
  else if((data[i].lat<46.0652534703&&data[i].lat>45.5652534703&&data[i].lng>141.001736627&&data[i].lng<141.501736627&&flag2==1)){
      newArray.push(data[i]);
      flag2=0;
  }
  else if((data[i].lat<45.346601243&&data[i].lat>44.846601243&&data[i].lng>137.3186439621&&data[i].lng<137.8186439621&&flag3==1)){
      newArray.push(data[i]);
      flag3=0;
  }
  else if((data[i].lat<45.346601243&&data[i].lat>44.846601243&&data[i].lng>139.2051060587&&data[i].lng<139.7051060587&&flag4==1)){
      newArray.push(data[i]);
      flag4=0;
  }
  else if((data[i].lat<45.2567697146&&data[i].lat>44.7567697146&&data[i].lng>140.9119050986&&data[i].lng<141.4119050986&&flag5==1)){
      newArray.push(data[i]);
      flag5=0;
  }
  else if((data[i].lat<44.3584544305&&data[i].lat>43.8584544305&&data[i].lng>136.5999917348&&data[i].lng<137.0999917348&&flag6==1)){
      newArray.push(data[i]);
      flag6=0;
  }
  else if((data[i].lat<44.5381174873&&data[i].lat>44.2381174873&&data[i].lng>139.0559484167&&data[i].lng<139.2559484167&&flag7==1)){
      newArray.push(data[i]);
      flag7=0;
  }
  else if((data[i].lat<44.7177805441&&data[i].lat>44.2177805441&&data[i].lng>140.5525789849&&data[i].lng<141.0525789849&&flag8==1)){
      newArray.push(data[i]);
      flag8=0;
  }
  else if((data[i].lat<44.0889598453&&data[i].lat>43.5889598453&&data[i].lng>135.8915079791&&data[i].lng<136.2915079791&&flag9==1)){
      newArray.push(data[i]);
      flag9=0;
  }
  else if((data[i].lat<43.9991283168&&data[i].lat>43.4991283168&&data[i].lng>137.4983070189&&data[i].lng<137.9983070189&&flag10==1)){
      newArray.push(data[i]);
      flag10=0;
  }
  else if((data[i].lat<43.9092967884&&data[i].lat>43.4092967884&&data[i].lng>138.8457799451&&data[i].lng<139.3457799451&&flag11==1)){
      newArray.push(data[i]);
      flag11=0;
  }
  else if((data[i].lat<42.6516553907&&data[i].lat>42.1516553907&&data[i].lng>132.0490892006&&data[i].lng<132.2490892006&&flag12==1)){
      newArray.push(data[i]);
      flag12=0;
  }
  else if((data[i].lat<42.5618238623&&data[i].lat>42.0618238623&&data[i].lng>133.6355512972&&data[i].lng<134.1355512972&&flag13==1)){
      newArray.push(data[i]);
      flag13=0;
  }
  else if((data[i].lat<42.5618238623&&data[i].lat>42.0618238623&&data[i].lng>135.342350337&&data[i].lng<135.842350337&&flag14==1)){
      newArray.push(data[i]);
      flag14=0;
  }
  else if((data[i].lat<42.5618238623&&data[i].lat>42.0618238623&&data[i].lng>137.1389809053&&data[i].lng<137.6389809053&&flag15==1)){
      newArray.push(data[i]);
      flag15=0;
  }
  else if((data[i].lat<41.6635085781&&data[i].lat>41.1635085781&&data[i].lng>130.9507739164&&data[i].lng<131.3507739164&&flag16==1)){
      newArray.push(data[i]);
      flag16=0;
  }
  else if((data[i].lat<41.6635085781&&data[i].lat>41.1635085781&&data[i].lng>133.0067305983&&data[i].lng<133.5067305983&&flag17==1)){
      newArray.push(data[i]);
      flag17=0;
  }
  else if((data[i].lat<41.3041824645&&data[i].lat>41.0041824645&&data[i].lng>135.3626872802&&data[i].lng<135.6626872802&&flag18==1)){
      newArray.push(data[i]);
      flag18=0;
  }
  else if((data[i].lat<41.2143509361&&data[i].lat>41.0143509361&&data[i].lng>137.5186439621&&data[i].lng<137.8186439621&&flag19==1)){
      newArray.push(data[i]);
      flag19=0;
  }
  else if((data[i].lat<40.0465410667&&data[i].lat>39.5465410667&&data[i].lng>128.2456595925&&data[i].lng<128.7456595925&&flag20==1)){
      newArray.push(data[i]);
      flag20=0;
  }
  else if((data[i].lat<40.2262041235&&data[i].lat>39.7262041235&&data[i].lng>131.0406054448&&data[i].lng<131.4406054448&&flag21==1)){
      newArray.push(data[i]);
      flag21=0;
  }
  else if((data[i].lat<40.4956987088&&data[i].lat>40.0056987088&&data[i].lng>133.6355512972&&data[i].lng<134.1355512972&&flag22==1)){
      newArray.push(data[i]);
      flag22=0;
  }
  else if((data[i].lat<38.8787311974&&data[i].lat>38.3787311974&&data[i].lng>129.233806405&&data[i].lng<129.733806405&&flag23==1)){
      newArray.push(data[i]);
      flag23=0;
  }
  else if((data[i].lat<38.5194050837&&data[i].lat>38.0194050837&&data[i].lng>129.5931325187&&data[i].lng<130.0931325187&&flag24==1)){
      newArray.push(data[i]);
      flag24=0;
  }
  else if((data[i].lat<37.710921328&&data[i].lat>37.210921328&&data[i].lng>129.6829640471&&data[i].lng<130.1829640471&&flag25==1)){
      newArray.push(data[i]);
      flag25=0;
  }
  else if((data[i].lat<37.261763686&&data[i].lat>36.761763686&&data[i].lng>130.311784746&&data[i].lng<130.811784746&&flag26==1)){
      newArray.push(data[i]);
      flag26=0;
  }
  else if((data[i].lat<36.0041222882&&data[i].lat>35.5041222882&&data[i].lng>130.311784746&&data[i].lng<130.811784746&&flag27==1)){
      newArray.push(data[i]);
      flag27=0;
  }
  else if((data[i].lat<36.2736168734&&data[i].lat>35.7736168734&&data[i].lng>132.288078371&&data[i].lng<132.788078371&&flag28==1)){
      newArray.push(data[i]);
      flag28=0;
  }
  else if((data[i].lat<38.429573555&&data[i].lat>38.029573555&&data[i].lng>132.6474044847&&data[i].lng<133.1474044847&&flag29==1)){
      newArray.push(data[i]);
      flag29=0;
  }
  else if((data[i].lat<36.6329429871&&data[i].lat>36.1329429871&&data[i].lng>133.366056712&&data[i].lng<133.866056712&&flag30==1)){
      newArray.push(data[i]);
      flag30=0;
  }
  else if((data[i].lat<38.6092366121&&data[i].lat>38.1092366121&&data[i].lng>134.0847089393&&data[i].lng<134.5847089393&&flag31==1)){
      newArray.push(data[i]);
      flag31=0;
  }
  else if((data[i].lat<41.3041824645&&data[i].lat>41.0041824645&&data[i].lng>139.474600644&&data[i].lng<139.974600644&&flag32==1)){
      newArray.push(data[i]);
      flag32=0;
  }
  else if((data[i].lat<38.9685627258&&data[i].lat>38.4685627258&&data[i].lng>134.1745404677&&data[i].lng<134.6745404677&&flag33==1)){
      newArray.push(data[i]);
      flag33=0;
  }
  else if((data[i].lat<39.8668780099&&data[i].lat>39.3668780099&&data[i].lng>136.5898232632&&data[i].lng<137.1898232632&&flag34==1)){
    newArray.push(data[i]);
    flag34=0;
  }
  else if((data[i].lat<38.6092366121&&data[i].lat>38.1092366121&&data[i].lng>136.6508340927&&data[i].lng<136.6508340927&&flag35==1)){
    newArray.push(data[i]);
    flag35=0;
  }
  else if((data[i].lat<37.8007528564&&data[i].lat>37.3007528564&&data[i].lng>136.0610025643&&data[i].lng<136.5610025643&&flag36==1)){
    newArray.push(data[i]);
    flag36=0;
  }
  else if((data[i].lat<38.788899669&&data[i].lat>38.288899669&&data[i].lng>138.4864538315&&data[i].lng<138.9864538315&&flag37==1)){
    newArray.push(data[i]);
    flag37=0;
  }
  else if((data[i].lat<37.710921328&&data[i].lat>37.210921328&&data[i].lng>137.8678016042&&data[i].lng<138.2678016042&&flag38==1)){
    newArray.push(data[i]);
    flag38=0;
  }
  else if((data[i].lat<39.5075518962&&data[i].lat>39.0075518962&&data[i].lng>124.5625669276&&data[i].lng<125.0625669276&&flag39==1)){
    newArray.push(data[i]);
    flag39=0;
  }
  else if((data[i].lat<38.0702474417&&data[i].lat>37.5702474417&&data[i].lng>124.2930723424&&data[i].lng<124.7930723424&&flag40==1)){
    newArray.push(data[i]);
    flag40=0;
  }
  else if((data[i].lat<37.5312582712&&data[i].lat>37.0312582712&&data[i].lng>126.030376797&&data[i].lng<126.230376797&&flag41==1)){
    newArray.push(data[i]);
    flag41=0;
  }
  else if((data[i].lat<37.0821006291&&data[i].lat>36.5821006291&&data[i].lng>124.4727353992&&data[i].lng<124.9727353992&&flag42==1)){
    newArray.push(data[i]);
    flag42=0;
  }
  else if((data[i].lat<36.0939538166&&data[i].lat>35.5939538166&&data[i].lng>125.8202083254&&data[i].lng<126.3202083254&&flag43==1)){
    newArray.push(data[i]);
    flag43=0;
  }
  else if((data[i].lat<35.1956385325&&data[i].lat>35.6956385325&&data[i].lng>124.652398456&&data[i].lng<125.152398456&&flag44==1)){
    newArray.push(data[i]);
    flag44=0;
  }
  else if((data[i].lat<34.2973232484&&data[i].lat>33.8973232484&&data[i].lng>124.652398456&&data[i].lng<125.152398456&&flag45==1)){
    newArray.push(data[i]);
    flag45=0;
  }
  else if((data[i].lat<34.2074917199&&data[i].lat>33.7074917199&&data[i].lng>127.0083551379&&data[i].lng<127.3083551379&&flag46==1)){
    newArray.push(data[i]);
    flag46=0;
  }
  else if((data[i].lat<34.9261439472&&data[i].lat>34.4261439472&&data[i].lng>130.0422901607&&data[i].lng<130.5422901607&&flag47==1)){
    newArray.push(data[i]);
    flag47=0;
  }
  else if((data[i].lat<32.9498503222&&data[i].lat>32.4498503222&&data[i].lng>125.0117245697&&data[i].lng<125.5117245697&&flag48==1)){
    newArray.push(data[i]);
    flag48=0;
  }
  else if((data[i].lat<32.2311980949&&data[i].lat>31.8311980949&&data[i].lng>126.2591974958&&data[i].lng<126.8591974958&&flag49==1)){
    newArray.push(data[i]);
    flag49=0;
  }
  else if((data[i].lat<32.6803557369&&data[i].lat>32.0803557369&&data[i].lng>128.784648763&&data[i].lng<129.084648763&&flag50==1)){
    newArray.push(data[i]);
    flag50=0;
  }
}

console.log(newArray);
newArray.forEach(function(point) {
      // var lnglat = new T.LngLat(point.lng, point.lat);
      if(point.water_direction<=0&&point.water_direction>-5){
       var staticUrl = location.origin + '/static/image/output_images/jiantou0.png';
       }else if(point.water_direction<=-5&&point.water_direction>-15){
        var staticUrl = location.origin + '/static/image/output_images/jiantou10.png';
       }else if(point.water_direction<=-15&&point.water_direction>-25){
        var staticUrl = location.origin + '/static/image/output_images/jiantou20.png';
       }
       else if(point.water_direction<=-25&&point.water_direction>-35){
        var staticUrl = location.origin + '/static/image/output_images/jiantou30.png';
       }else if(point.water_direction<=-3&&point.water_direction>-45){
        var staticUrl = location.origin + '/static/image/output_images/jiantou40.png';
       }else if(point.water_direction<=-45&&point.water_direction>-55){
        var staticUrl = location.origin + '/static/image/output_images/jiantou50.png';
       }else if(point.water_direction<=-55&&point.water_direction>-65){
        var staticUrl = location.origin + '/static/image/output_images/jiantou60.png';
       }else if(point.water_direction<=-65&&point.water_direction>-75){
        var staticUrl = location.origin + '/static/image/output_images/jiantou70.png';
       }else if(point.water_direction<=-75&&point.water_direction>-85){
        var staticUrl = location.origin + '/static/image/output_images/jiantou80.png';
       }else if(point.water_direction<=-85&&point.water_direction>-95){
        var staticUrl = location.origin + '/static/image/output_images/jiantou90.png';
       }else if(point.water_direction<=-95&&point.water_direction>-105){
        var staticUrl = location.origin + '/static/image/output_images/jiantou100.png';
       }else if(point.water_direction<=-105&&point.water_direction>-115){
        var staticUrl = location.origin + '/static/image/output_images/jiantou110.png';
       }else if(point.water_direction<=-115&&point.water_direction>-125){
        var staticUrl = location.origin + '/static/image/output_images/jiantou120.png';
       }else if(point.water_direction<=-125&&point.water_direction>-135){
        var staticUrl = location.origin + '/static/image/output_images/jiantou130.png';
       }else if(point.water_direction<=-135&&point.water_direction>-145){
        var staticUrl = location.origin + '/static/image/output_images/jiantou140.png';
       }else if(point.water_direction<=-145&&point.water_direction>-155){
        var staticUrl = location.origin + '/static/image/output_images/jiantou150.png';
       }else if(point.water_direction<=-155&&point.water_direction>-165){
        var staticUrl = location.origin + '/static/image/output_images/jiantou160.png';
       }else if(point.water_direction<=-165&&point.water_direction>-175){
        var staticUrl = location.origin + '/static/image/output_images/jiantou170.png';
       }else if(point.water_direction<=-175&&point.water_direction>-180){
        var staticUrl = location.origin + '/static/image/output_images/jiantou180.png';
       }else if(point.water_direction<180&&point.water_direction>=165){
        var staticUrl = location.origin + '/static/image/output_images/jiantou190.png';
       }else if(point.water_direction<165&&point.water_direction>=155){
        var staticUrl = location.origin + '/static/image/output_images/jiantou200.png';
       }else if(point.water_direction<155&&point.water_direction>=145){
        var staticUrl = location.origin + '/static/image/output_images/jiantou210.png';
       }else if(point.water_direction<145&&point.water_direction>=135){
        var staticUrl = location.origin + '/static/image/output_images/jiantou220.png';
       }else if(point.water_direction<135&&point.water_direction>=125){
        var staticUrl = location.origin + '/static/image/output_images/jiantou230.png';
       }else if(point.water_direction<125&&point.water_direction>=115){
        var staticUrl = location.origin + '/static/image/output_images/jiantou240.png';
       }else if(point.water_direction<115&&point.water_direction>=105){
        var staticUrl = location.origin + '/static/image/output_images/jiantou250.png';
       }else if(point.water_direction<105&&point.water_direction>=95){
        var staticUrl = location.origin + '/static/image/output_images/jiantou260.png';
       }else if(point.water_direction<95&&point.water_direction>=85){
        var staticUrl = location.origin + '/static/image/output_images/jiantou270.png';
       }else if(point.water_direction<85&&point.water_direction>=75){
        var staticUrl = location.origin + '/static/image/output_images/jiantou280.png';
       }else if(point.water_direction<75&&point.water_direction>=65){
        var staticUrl = location.origin + '/static/image/output_images/jiantou290.png';
       }else if(point.water_direction<65&&point.water_direction>=55){
        var staticUrl = location.origin + '/static/image/output_images/jiantou300.png';
       }else if(point.water_direction<55&&point.water_direction>=45){
        var staticUrl = location.origin + '/static/image/output_images/jiantou310.png';
       }else if(point.water_direction<45&&point.water_direction>=35){
        var staticUrl = location.origin + '/static/image/output_images/jiantou320.png';
       }else if(point.water_direction<35&&point.water_direction>=25){
        var staticUrl = location.origin + '/static/image/output_images/jiantou330.png';
       }else if(point.water_direction<25&&point.water_direction>=15){
        var staticUrl = location.origin + '/static/image/output_images/jiantou340.png';
       }else if(point.water_direction<15&&point.water_direction>=5){
        var staticUrl = location.origin + '/static/image/output_images/jiantou350.png';
       }else if(point.water_direction<5&&point.water_direction>=0){
        var staticUrl = location.origin + '/static/image/output_images/jiantou0.png';
       }
      // 创建一个箭头标记
      //console.log(staticUrl)
      // var bd = new T.LngLatBounds(
      //   new T.LngLat(point.lng - 0.045, point.lat - 0.045),
      //   new T.LngLat(point.lng + 0.045, point.lat + 0.045)
      // );
      var bd = new T.LngLatBounds(
        new T.LngLat(point.lng - 0.85, point.lat - 0.85),
        new T.LngLat(point.lng + 0.85, point.lat + 0.85)
      );
      
    img = new T.ImageOverlay(staticUrl, bd, {
        opacity: 1
        //alt: "故宫博物院"
    });
    map.addOverLay(img);

  });
}


// 获取加载元素的引用
const loadingContainer = document.getElementById('loadingContainer');

// 显示加载状态
function showLoading() {
  loadingContainer.style.display = 'flex'; // 使用flex布局使其居中显示
}

// 隐藏加载状态
function hideLoading() {
  loadingContainer.style.display = 'none';
}




// 获取保存日期时间的元素和日期时间选择器元素
const selectedDateTimeElement = document.getElementById('selectedDateTime');
const datepickerElement = document.getElementById('datepicker');
const timepickerElement = document.getElementById('timepicker');

// 初始化当前日期时间
const currentDateTime = new Date();
const year = currentDateTime.getFullYear();
let month = currentDateTime.getMonth() + 1;
if (month < 10) month = '0' + month;
let day = currentDateTime.getDate();
if (day < 10) day = '0' + day;
const currentDate = `${year}-${month}-${day}`;

let hours = currentDateTime.getHours();
if (hours < 10) hours = '0' + hours;
// 固定分钟为 00
const currentTime = `${hours}:00`;

// 设置日期选择器和时间选择器的默认值为当前日期时间
datepickerElement.value = currentDate;
timepickerElement.value = currentTime;

let selectedDateTime = `${currentDate} ${currentTime}`;

// 当日期或时间选择器的值改变时更新选择的日期时间变量
datepickerElement.addEventListener('input', updateDateTime);
timepickerElement.addEventListener('input', updateDateTime);

 var datepicker111 = '2024-01-01';
 var datepicker222;
 var dongtaidata=[];
 function updateDateTime() {
  resetProgress();
  console.log(datepickerElement.value);
  console.log(timepickerElement.value);
  datepicker222 = datepickerElement.value;
  console.log(datepicker222);
   selectedDateTime = `${datepickerElement.value} ${timepickerElement.value} `;
   // 这里可以添加自动保存的逻辑，比如将 selectedDateTime 发送到服务器或本地存储
   // 示范：将日期时间打印到控制台
   console.log(`选择的日期时间已自动保存为：${selectedDateTime}`);
   console.log("selectedLayer"+selectedLayer)
   let data = {
    variable1: datepickerElement.value,
    variable2: timepickerElement.value,
    variable3: selectedLayer
};
let middlediv = document.getElementById('navbar-middle');
  fetch('http://localhost:5000/process_data', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
})
.then(response => {showLoading();
  return response.json();
})
.then(data => {
    console.log('服务器选择日期返回的数据753：', data);
    // 这里可以处理服务器返回的响应
    // closeHeatmap();
    // middlecontainer.innerHTML = '';
      //points = convertData(data);
      quanjvdata = data;
      console.log("quanjvdata",quanjvdata);
      //console.log('points数据523:',points);
      huaRectangle2(quanjvdata,'water_temp');
      if(selectedLayer=='water_direction'||selectedLayer=='wind_direction'){
        map.clearOverLays();
        drawOceanCurrents(quanjvdata);
      }
      else{
        reloadContainer(quanjvdata,selectedLayer);
      }
    //  onLoad();
    //middlediv.points = data;
    hideLoading();
})
.catch(error => {
    console.error('发生错误：', error);
});
console.log(datepicker111);
console.log(datepicker222);
if(datepicker111!=datepicker222){
  if(window.myLineChart){
    window.myLineChart.destroy();
  }
  if(window.myLineChart2){
    window.myLineChart2.destroy();
  }
  document.getElementById('coordinates1').innerText = '暂无数据';
  document.getElementById('coordinates2').innerText = '暂无数据';
  gengxindongtai1();
  datepicker111=datepicker222;
  
fetch('http://localhost:5000/dongtai_data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify("开始")
})
.then(response => response.json())
.then(data => {
  console.log('服务器返回的数据动态：', data);
  gengxindongtai();
  dongtaidata=data;
  // 可以在这里处理服务器返回的响应
  // points = convertData(data);
  //   reloadContainer();
})
.catch(error => {
  console.error('请求失败：', error);
});
}
 }


 function selectLayer(aaa) {
  // 移除所有按钮的 active 类
  var buttons = document.querySelectorAll('.tucengbutton button');
  buttons.forEach(function(btn) {
      btn.classList.remove('active');
  });

  // 添加点击按钮的 active 类
  var selectedButton = document.getElementById(aaa + 'Button');
  selectedButton.classList.add('active');
  selectedLayer = aaa;
  // var selectElement = document.getElementById("layerSelect");
  // selectedLayer = selectElement.value;
  console.log("选择了图层：" + selectedLayer);
  resetProgress();
  // 发送数据到服务器
    // 可以在这里处理服务器返回的响应
    
    updateProgress(0,0);
    if(selectedLayer=='water_direction'||selectedLayer=='wind_direction'){
      console.log("570quanjvdata:",quanjvdata);
      drawOceanCurrents(quanjvdata);
    }
    else{
      reloadContainer(quanjvdata,selectedLayer);
    }
    


  fetch('http://localhost:5000/dongtai_data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify("开始")
  })
  .then(response => response.json())
  .then(data => {
    //console.log('服务器返回的数据动态：', data);
    gengxindongtai();
    dongtaidata=data;
    // 可以在这里处理服务器返回的响应
    // points = convertData(data);
    //   reloadContainer();
  })
  .catch(error => {
    console.error('请求失败：', error);
  });
}



 //进度条
 var isPlaying = false;
 var progressWidth = 0;
 var progressBar = document.getElementById('progress-bar');
 var progress = document.getElementById('progress');
 var intervalId;

 function jumpTo(event) {
   if (!isPlaying) {
     var clickOffsetX = event.pageX - progressBar.offsetLeft;
     var progressPercent = (clickOffsetX / progressBar.offsetWidth) * 100;
     //console.log("dongtaiflag:"+dongtaiflag);
     updateProgress(Math.floor(progressPercent),1);
   }
 }
 
 var dongtaiflag=-1;
 function updateProgress(progressPercent,huaflag) {
   progress.style.width = progressPercent + '%';
   progressWidth = progressPercent;
   //console.log(progressWidth);
   let length=dongtaidata.length;//几个时间段
  let flag= Math.floor(progressWidth/4);//第几个时间段
  console.log("flag:"+flag);
   if(flag!=dongtaiflag&&flag<length&&huaflag==1){
    dongtaiflag=flag;
    document.getElementById('progress-child').textContent = dongtaiflag;
    console.log("dongtaiflag:"+dongtaiflag);
    points = convertData(dongtaidata[dongtaiflag]);
    
    if(selectedLayer=='water_direction'||selectedLayer=='wind_direction'){
      drawOceanCurrents(points);
    }
    else if(selectedLayer=='count'){
      reloadContainer(points,selectedLayer);
      if(dongtaiflag<=8){
        huaRectangle2(points,'count2');
      }
      else{
        huaRectangle2(points,'water_temp');
      }
    }
    else{
      reloadContainer(points,selectedLayer);
    }

    }
 }
 

var jinduflag=1;
 function togglePlay() {
   isPlaying = !isPlaying;
   if (isPlaying) {
    document.getElementById('control-button').style.backgroundImage = `url('/static/image/更新/暂停.png')`;
    document.getElementById('progress-child').style.display = 'flex';
     if(jinduflag==1){
      try {
        points = convertData(dongtaidata[0]);
        if(selectedLayer=='water_direction'||selectedLayer=='wind_direction'){
          drawOceanCurrents(points);
        }
        else{
          reloadContainer(points,selectedLayer);
        }
        jinduflag = 0;
    } catch (error) {
        // 弹出错误提示页面或者消息框
        alert('该日期无动态数据');
        // 可以根据具体需求进行处理，比如恢复默认状态或者执行其他操作
        // 例如：points = []; // 恢复默认值
        // 或者执行其他逻辑
        document.getElementById('control-button').style.backgroundImage = `url('/static/image/更新/开始.png')`;
        return;
    }
     }
     intervalId = setInterval(function() {
      increaseProgress();
    }, 100);
   } else {
    document.getElementById('control-button').style.backgroundImage = `url('/static/image/更新/开始.png')`;
     clearInterval(intervalId);
   }
 }
 
 function increaseProgress() {
  // let length=dongtaidata.length;
  // let flag= Math.floor(progressWidth/5);
  //  if(flag!=dongtaiflag&&dongtaiflag<length){
  //   dongtaiflag=flag;
  //   points = convertData(dongtaidata[dongtaiflag]);
  //     reloadContainer();
  //  }
  //   points = convertData(data[i]);
  //     reloadContainer();
   
   progressWidth += 1; // increase by 10% every second (adjust as needed)
   if (progressWidth > 100) {
     progressWidth = 0;
     dongtaiflag=-1;
      jinduflag=1;
    //  points = convertData(dongtaidata[0]);
    //   reloadContainer();
   }
   updateProgress(progressWidth,1);
 }

 function resetProgress() {
  dongtaiflag=0;
  progressWidth = 0;
  document.getElementById('progress-child').textContent = dongtaiflag;
  progress.style.width = '0%';
  // 重置其他相关变量或状态，如果有需要的话ZTY
}

function gengxindongtai(){
  var container = document.getElementById('dongtaijiazai');
container.textContent = '动态数据加载成功';

}

function gengxindongtai1(){
  var container = document.getElementById('dongtaijiazai');
container.textContent = '动态数据加载中...';

}

 


 //分屏两个地图
 // JavaScript代码
let isWide = true; // 初始状态为宽地图

document.getElementById('toggleMapButton').addEventListener('click', function() {
    const leftmap = document.querySelector('.navbar-middle-left');
    const rightmap = document.querySelector('.navbar-middle-right');
    if (isWide) {
        // 切换为窄地图

        leftmap.style.width = '50%';
        rightmap.style.width = '50%';
        isWide = false; // 更新状态为窄地图
        map.checkResize();
        map2.checkResize();
    } else {
        
      leftmap.style.width = '100%';
      rightmap.style.width = '0';
        isWide = true; // 更新状态为宽地图
        map.checkResize();
        map2.checkResize();
    }
});








let longitude = 0;
let latitude = 0;

// 更新经度和纬度显示
function updateCoordinates(lon, lat) {
  document.getElementById('coordinates1').innerText = lon.toFixed(4);
  document.getElementById('coordinates2').innerText = lat.toFixed(4);
}

// 更新折线图的函数，可以根据实际数据源进行修改
// function updateCharts(data1, data2, data3) {
//   drawChart('chart1', data1);
//   drawChart('chart2', data2);
//   drawChart('chart3', data3);
// }

// // 绘制折线图和坐标轴
// function drawChart(canvasId, data) {
//   let canvas = document.getElementById(canvasId);
//   let ctx = canvas.getContext('2d');
//   ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布

//   // 确定数据范围
//   let maxData = Math.max(...data);
//   let minData = Math.min(...data);

//   // 绘制坐标轴线
//   ctx.beginPath();
//   ctx.moveTo(30, 10);
//   ctx.lineTo(30, canvas.height - 20);
//   ctx.lineTo(canvas.width - 10, canvas.height - 20);
//   ctx.strokeStyle = '#000';
//   ctx.stroke();

//   // 绘制折线图
//   if (data.length > 0) {
//     ctx.beginPath();
//     ctx.moveTo(30, canvas.height - 20 - (data[0] - minData) * (canvas.height - 30) / (maxData - minData));
//     for (let i = 0; i < data.length; i++) {
//       let x = 30 + i * (canvas.width - 40) / (data.length - 1);
//       let y = canvas.height - 20 - (data[i] - minData) * (canvas.height - 30) / (maxData - minData);
      
//       // 绘制折线
//       ctx.lineTo(x, y);
//       ctx.strokeStyle = '#00f';
//       ctx.stroke();
      
//       // 显示数据值
//       ctx.fillStyle = '#00f';
//       ctx.fillText(data[i].toFixed(3), 2, y ); // 显示数据点的具体数值，保留两位小数，可以根据需要调整精度
//     }
//   }
// }




// 模拟更新数据的函数，实际应用中应根据数据源获取更新的数据
// function updateData() {
//   // 模拟从数据源获取数据
//   let data1 = [];
//   let data2 = [];
//   let data3 = [];
//   for (let i = 0; i < 6; i++) {
//     data1.push(Math.random() * 150);
//     data2.push(Math.random() * 150);
//     data3.push(Math.random() * 150);
//   }
//   // 更新经度纬度显示和折线图
//   updateCoordinates(longitude, latitude);
//   updateCharts(data1, data2, data3);
// }

// // 初始化页面时首次更新数据和图表
// updateData();



const chart1 = document.getElementById('chart1');
//绘制折线图
function createLineChart(chartContainer, labels, data) {
  // 先销毁之前的实例，确保 canvas 清空
  if (window.myLineChart) {
      window.myLineChart.destroy();
      window.myLineChart2.destroy();
  }

  // 配置项
  const config = {
      type: 'line',
      data: {
          labels: labels,
          datasets: [{
              label: selectedLayer,
              color:'rgb(255, 255, 255)',
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 255, 255)',
              data: data,
              fill: false,
              borderDash: [],
          }]
      },
      options: {
        maintainAspectRatio: false, // 取消维持纵横比，可以随着容器大小改变而改变图表大小
          responsive: true,
          plugins: {
            legend: {
                labels: {
                    color: 'white' // 设置图例标签文字颜色为白色
                }
            }
          },
          layout: {
            padding: {
                left: 0,
                right: 40,
                top: 20,
                bottom: 0
            }
          },
          scales: {
              x: {
                  display: true,
                  ticks: {
                    color: 'white' // 设置 y 轴刻度数字颜色为白色
                },
                  title: {
                      display: true
                      
                  },
                  grid: {
                    color: 'rgba(255, 255, 255)' // 设置 x 轴网格线颜色
                }
              },
              y: {
                  display: true,
                  ticks: {
                    color: 'white' // 设置 y 轴刻度数字颜色为白色
                },
                  title: {
                      display: true
                      
                  },
                  grid: {
                    color: 'rgba(255, 255, 255)' // 设置 x 轴网格线颜色
                }
              }
          }
      },
  };

  // 创建新的 Chart 实例
  window.myLineChart = new Chart(chartContainer, config);
}




function toggleRightContainer() {
  var rightContainer = document.querySelector(".navbar-right");
  var rightToggleBtn = document.getElementById("right-toggle-btn");
  var computedStyle = window.getComputedStyle(rightContainer);
  var width11 = computedStyle.getPropertyValue("width");

  console.log(width11); // 输出获取到的宽度
  
  if (width11 === "0px" || width11 === "") {
    rightContainer.style.width = "14vw";
    rightToggleBtn.innerHTML = "";
  } else {
    rightContainer.style.width = "0px";
    rightToggleBtn.innerHTML = "";
  }
}






const chart2 = document.getElementById('chart2');
function createLineChart2(chartContainer, labels, data1, data2) {
  // 先销毁之前的实例，确保 canvas 清空
  if (window.myLineChart2) {
    window.myLineChart2.destroy();
  }

  // 配置项
  const config = {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: '预测', // 第一条折线的标签
          borderColor: 'rgb(255, 255, 255)',
          backgroundColor: 'rgb(255, 99, 132)',
          data: data1,
          fill: false,
          borderDash: [],
        },
        {
          label: '真实', // 第二条折线的标签
          borderColor: 'rgb(255, 255, 255)',
          backgroundColor: 'rgb(54, 162, 235)',
          data: data2,
          fill: false,
          borderDash: [],
        },
      ],
    },
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            color: 'white',
          },
        },
      },
      layout: {
        padding: {
          left: 0,
          right: 20,
          top: 30,
          bottom: 0,
        },
      },
      scales: {
        x: {
          display: true,
          ticks: {
            color: 'white',
          },
          title: {
            display: true,
          },
          grid: {
            color: 'rgba(255, 255, 255)',
          },
        },
        y: {
          display: true,
          ticks: {
            color: 'white',
          },
          title: {
            display: true,
          },
          grid: {
            color: 'rgba(255, 255, 255)',
          },
        },
      },
    },
  };

  // 创建新的 Chart 实例
  window.myLineChart2 = new Chart(chartContainer, config);
}


// var canvas = document.getElementById('myChart');
// var data1 = [10, 15, 20, 25, 30];
// var data2 = [5, 10, 15, 20, 25];
// var labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];

// drawLineChart(canvas, data1, data2, labels);
