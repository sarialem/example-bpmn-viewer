const http = require('http');
const fs = require('fs');
const AutoLayout = require('bpmn-auto-layout');
const { createProcess } = require('./bpmnconstructor');


http.createServer(async (reqeuest, response) => {
    if(reqeuest.url ==='/') {
        fs.readFile('./bpmn.html', (error, data) => {
            response.writeHeader(200, {'Content-Type': 'text/html'})
            response.write(data);
            response.end();
        });
    }
    if(reqeuest.url ==='/bpmn.xml') {
        var autoLayout = new AutoLayout();
        const xml = await createProcess();
        var layoutedDiagramXML = await autoLayout.layoutProcess(xml);
        response.writeHeader(200, {'Content-Type': 'text/xml'})
        response.write(layoutedDiagramXML);
        response.end();
    }
}).listen(80);