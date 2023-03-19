const BpmnModdle = require('bpmn-moddle');
const moddle = new BpmnModdle();

const eventActivities = {
    IntermediateCatchEvent: 'bpmn:IntermediateCatchEvent',
    StartEvent: 'bpmn:StartEvent',
    EndEvent: 'bpmn:EndEvent',
};

const gateways = {
    ExclusiveGateway: 'bpmn:ExclusiveGateway',
    InclusiveGateway: 'bpmn:InclusiveGateway',
    ParallelGateway: 'bpmn:ParallelGateway',
};

const activities = {
    Task: 'bpmn:Task',
    ScriptTask: 'bpmn:ScriptTask',
    ServiceTask: 'bpmn:ServiceTask',
    UserTask: 'bpmn:UserTask',
    SubProcess: 'bpmn:SubProcess',
};

const flows = {
    SequenceFlow: 'bpmn:SequenceFlow',
}

const createProcess = async () => {

    const startEvent = moddle.create(eventActivities.StartEvent, { id: 'start' });
    const parallelGateway1 = moddle.create(gateways.ParallelGateway, { id: 'gateway1' });
    const task1 = moddle.create(activities.ServiceTask, { id: 'task1', name: 'Step 1' });
    const task2 = moddle.create(activities.UserTask, { id: 'task2', name: 'Step 2' });
    const task3 = moddle.create(activities.ServiceTask, { id: 'task3', name: 'Step 3' });
    const parallelGateway2 = moddle.create(gateways.ParallelGateway, { id: 'gateway2' });
    const endEvent = moddle.create(eventActivities.EndEvent, { id: 'end' });

    const bpmnProcess = moddle.create('bpmn:Process', { id: 'MyProcess_1',
        flowElements: [
            startEvent,
            parallelGateway2,
            parallelGateway1,
            task1,
            task2,
            task3,
            endEvent,

            moddle.create(flows.SequenceFlow, {
                id: 'flow0',
                sourceRef: startEvent,
                targetRef: parallelGateway1,
            }),
            moddle.create(flows.SequenceFlow, {
                id: 'flow1',
                sourceRef: parallelGateway1,
                targetRef: task1,
            }),
            moddle.create(flows.SequenceFlow, {
                id: 'flow2',
                sourceRef: task1,
                targetRef: task2,
            }),
            moddle.create(flows.SequenceFlow, {
                id: 'flow3',
                sourceRef: parallelGateway1,
                targetRef: task3,
            }),
            moddle.create(flows.SequenceFlow, {
                id: 'flow4',
                sourceRef: task3,
                targetRef: parallelGateway2,
            }),
            moddle.create(flows.SequenceFlow, {
                id: 'flow5',
                sourceRef: task2,
                targetRef: parallelGateway2,
            }),
            moddle.create(flows.SequenceFlow, {
                id: 'flow6',
                sourceRef: parallelGateway2,
                targetRef: endEvent,
            }),
        ],
    });

    const root = moddle.create('bpmn:Definitions', { id: 'MyDefinition_1'});
    root.rootElements = [bpmnProcess];

    const {
        xml
    } = await moddle.toXML(root);
    console.log(xml);
    return xml;
}

module.exports= { createProcess};