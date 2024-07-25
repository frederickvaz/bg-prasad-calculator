let thresholds = {};

function calculateThresholds() {
    const cpi = document.getElementById('cpi').value;
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;
    const resultDiv = document.getElementById('result');

    if (!cpi) {
        alert('Please enter the CPI value.');
        return;
    }

    const FACTOR = 2.88 * 4.63 * 4.93;

    const classILower = Math.round(100 * (cpi / 100) * FACTOR);
    const classIUpper = Infinity;

    const classIILower = Math.round(50 * (cpi / 100) * FACTOR);
    const classIIUpper = classILower - 1;

    const classIIILower = Math.round(30 * (cpi / 100) * FACTOR);
    const classIIIUpper = classIILower - 1;

    const classIVLower = Math.round(15 * (cpi / 100) * FACTOR);
    const classIVUpper = classIIILower - 1;

    const classVUpper = classIVLower - 1;

    thresholds = {
        classILower,
        classIIUpper,
        classIILower,
        classIIIUpper,
        classIIILower,
        classIVUpper,
        classIVLower,
        classVUpper
    };

    resultDiv.innerHTML = `
        <h2>Updated BG Prasad Socio-economic Scale for ${month} ${year}</h2>
        <p>Class I: >= ${classILower}</p>
        <p>Class II: ${classIILower} - ${classIIUpper}</p>
        <p>Class III: ${classIIILower} - ${classIIIUpper}</p>
        <p>Class IV: ${classIVLower} - ${classIVUpper}</p>
        <p>Class V: <= ${classVUpper}</p>
    `;
}

function determineClass() {
    const income = document.getElementById('income').value;
    const classResultDiv = document.getElementById('classResult');
    const month = document.getElementById('month').value;
    const year = document.getElementById('year').value;

    if (!income) {
        alert('Please enter the Monthly Per Capita Income of the Family.');
        return;
    }

    let socioClass = '';

    if (income >= thresholds.classILower) {
        socioClass = 'Class I';
    } else if (income >= thresholds.classIILower && income <= thresholds.classIIUpper) {
        socioClass = 'Class II';
    } else if (income >= thresholds.classIIILower && income <= thresholds.classIIIUpper) {
        socioClass = 'Class III';
    } else if (income >= thresholds.classIVLower && income <= thresholds.classIVUpper) {
        socioClass = 'Class IV';
    } else if (income <= thresholds.classVUpper) {
        socioClass = 'Class V';
    } else {
        socioClass = 'Undefined';
    }

    classResultDiv.innerHTML = `
        <h2>BG Prasad Socio-economic Class for ${month} ${year}</h2>
        <p>The family falls under: <strong>${socioClass}</strong></p>
    `;
}
