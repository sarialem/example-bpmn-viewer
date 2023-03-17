const http = require('http');
const fs = require('fs');
const AutoLayout = require('bpmn-auto-layout');


http.createServer((function(rqeuest, response) {
    if(rqeuest.url ==='/') {
        fs.readFile('./bpmn.html', (error, data) => {
            response.writeHeader(200, {'Content-Type': 'text/html'})
            response.write(data);
            response.end();
        });
    }
    if(rqeuest.url ==='/bpmn.xml') {
        var autoLayout = new AutoLayout();

        fs.readFile('./bpmn2.bpmn', async (error, data) => {
            const xml = data.toString();
            var layoutedDiagramXML = await autoLayout.layoutProcess(xml);
            response.writeHeader(200, {'Content-Type': 'text/xml'})
            response.write(layoutedDiagramXML);
            response.end();
        });
    }
})).listen(80);