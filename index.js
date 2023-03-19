const http = require('http');
const fs = require('fs');
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
        const xml = await createProcess();
        response.writeHeader(200, {'Content-Type': 'text/xml'})
        response.write(xml);
        response.end();
    }
}).listen(80);