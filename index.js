const http = require('http');
const fs = require('fs');


http.createServer((function(rqeuest, response) {
    if(rqeuest.url ==='/') {
        fs.readFile('./bpmn.html', (error, data) => {
            console.log(error);
            response.writeHeader(200, {'Content-Type': 'text/html'})
            response.write(data);
            response.end();
        });
    }
    if(rqeuest.url ==='/bpmn.xml') {
        fs.readFile('./bpmn2.xml', async (error, data) => {
            const xml = data.toString();
            response.writeHeader(200, {'Content-Type': 'text/xml'})
            response.write(xml);
            response.end();
        });
    }
})).listen(80);