document.querySelector('#calculate').addEventListener('click', function() {

    const processorTimeInput = document.querySelector('#processorTime');
    const tasksInput = document.querySelector('#tasks');
    const errorMsgProcessor = document.querySelector('#errorMsgProcessor');
    const errorMsgTasks = document.querySelector('#errorMsgTasks');

    const regex = /^(\d+,\s*)*\d+$/;

    if (!processorTimeInput.value) {
        errorMsgProcessor.innerText = 'Processor time input is empty. Please enter positive integers separated by commas.';
    } else if (!regex.test(processorTimeInput.value)) {
        errorMsgProcessor.innerText = 'Invalid format for processor time. Please enter positive integers separated by commas.';
    } else {
        errorMsgProcessor.innerText = '';
    }

    if (!tasksInput.value) {
        errorMsgTasks.innerText = 'Tasks input is empty. Please enter positive integers separated by commas.';
    } else if (!regex.test(tasksInput.value)) {
        errorMsgTasks.innerText = 'Invalid format for tasks. Please enter positive integers separated by commas.';
    } else {
        errorMsgTasks.innerText = '';
    }

    if (errorMsgProcessor.innerText || errorMsgTasks.innerText) {
        return;
    }

    const processorTime = document.querySelector('#processorTime').value.split(',').map(Number);
    const tasks = tasksInput.value.split(',').map(s => Number(s.trim()));
    const result = minProcessingTime(processorTime, tasks);
    document.querySelector('#result').innerText = 'Min Processing Time: ' + result;
});

function minProcessingTime(processorTime, tasks) {
    // Step 1
    processorTime.sort((a, b) => a - b);
    // Step 2
    tasks.sort((a, b) => b - a);
    // Step 3
    let processorEndTimes = [...processorTime];
    // Step 4
    for (let task of tasks) {
        let minIndex = processorEndTimes.indexOf(Math.min(...processorEndTimes));
        processorEndTimes[minIndex] += task;
    }
    // Step 5
    return Math.max(...processorEndTimes);
}

document.querySelector('#clear').addEventListener('click', function() {
    document.querySelector('#processorTime').value = '';
    document.querySelector('#tasks').value = '';
    document.querySelector('#errorMsgProcessor').innerText = '';
    document.querySelector('#errorMsgTasks').innerText = '';
    document.querySelector('#result').innerText = '';
});