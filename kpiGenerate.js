const fs = require('fs');
const filePath = require('./filePath').filePath;
fs.readFile(filePath,'utf-8',function(err, dataStr){
  const content = JSON.parse(dataStr)
  const kpis = []
  for(let i=0; i< 200; i++){
    const newKpi = {
      name: 'kpi'+i,
      description: 'kpi'+i,
      expression: `${Math.random()*1000}`,
      uom: 'uom'+i
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