const http = require('http');
const fs = require('fs');
const AutoLayout = require('bpmn-auto-layout');


http.createServer((function(rqeuest, response) {
    console.log(rqeuest.url);
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
            // loaded the bpmn xml
            const xml = data.toString();
            /*
             * Automatic layout START
             * Need this only if we don't write bpmndi definitions inside the xml
             * this code will generate an automatic layout for you
             * If you need a custom layout we have to write bpmndi sections ourselves
             */
            const autoLayout = new AutoLayout();
            const ayoutedDiagramXML = await autoLayout.layoutProcess(xml);
            /*
             * Automatic layout END
             */
            response.writeHeader(200, {'Content-Type': 'text/xml'})
            response.write(ayoutedDiagramXML);
            response.end();
        });
    }
})).listen(80);