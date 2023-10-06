const fs = require('fs');
const filePath = require('./filePath').filePath;

const kpiAmount = require('./filePath').kpiAmount;
fs.readFile(filePath,'utf-8',function(err, dataStr){
  console.log(dataStr)
  const content = JSON.parse(dataStr)
  const kpis = []
  for(let i=0; i< kpiAmount; i++){
    const newKpi = {
      name: 'kpi'+i,
      description: 'kpi'+i,
      expression: getRandomExpression(),
      uom: 'uom'+i,
      "_thresholdValue": 0.2,
      "_isThresholdUpperLimit": true,
      "_minimumAlarmDuration": 5,
      "_emailOnAlert": false
    };
    kpis.push(newKpi)
  }
  content.KPIs = kpis;

  
 
  const newContent = JSON.stringify(content);
  const buf = Buffer.from(newContent);

  fs.open(filePath,'w', function(err, fd){
    fs.write(fd,buf, function(err,written, buffer){
      console.log('done')
    })
  })
})

function getRandomExpression(){
  const sensorPrefix = 'XY';
  const operators = ['+', '-', '*', '/'];
  const expressionLen = Math.floor(Math.random() * 10);
  let result = '';
  if(expressionLen > 0){
    for(let i =0; i< expressionLen; i++){
      result += `"${(sensorPrefix + Math.floor(Math.random() * 100))}"`;
      if(i+1 < expressionLen){
        const randomNum = parseInt(Math.random()*3)
        result += ` ${operators[randomNum]} `;
      }
    }

    return result;
  }else{
    return Number(Math.random() * 100).toFixed(0);
  }
}