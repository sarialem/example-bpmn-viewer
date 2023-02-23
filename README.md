# example-bpmn-viewer
An example of a bpmn web modeler using bpmn-js
It loads a bpmn 2.0 file, expects it to have bpmndi inside and views it in the browser.

The code here demostrates:
- Uses saveSVG to save the diagram as SVG
- Uses saveXML to save the diagram in XML BPMN format
- Support `Undo` and `Redo` operations by clicking `u` and `r` on the keyboard respectively

How to Run:
1. Clone
2. Run ```node index.js```
3. In your browser, navigate to ```localhost:80```
4. Click the button you see in order to load the bpmn xml and display the diagram
