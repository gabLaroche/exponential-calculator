import Chart from 'chart.js';

const ctx = document.getElementById('resultsChart').getContext('2d');
const calcBtn = document.querySelector('.calc-btn');
const resultsCtn = document.querySelector('.results__ctn');
const resultsList = document.querySelector('.results__list');

calcBtn.addEventListener('click', onBtnClick);

function onBtnClick () {
    let initalAmount = Number(document.getElementById('initalAmount').value);
    const percentage = Number(document.getElementById('percentage').value);
    const nbTimes = Number(document.getElementById('nbTimes').value);
    const data = [];
    const labels = [];

    if (!initalAmount || !nbTimes || !percentage) {
        alert('yo');
        return;
    }

    for (let i = 0; i < nbTimes; i++) {
        const label = `${getOrdinalSuffix(i + 1)} Occurence`;
        if (i > 0) {
            initalAmount = initalAmount + (initalAmount * (percentage / 100));
        }

        resultsCtn.classList.remove('hidden');
        resultsList.innerHTML += createResultsListItem(label, Math.round(initalAmount))

        data.push(Math.round(initalAmount))
        labels.push(label);
    }

    console.log(resultsCtn);
    createChart(labels, data);
}

function createResultsListItem(label, amount) {
    return `<li>${label}: ${amount}</li>`
}

function createChart(labels, data) {
    const resultsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                borderWidth: 1,
                borderColor:'#00c0ef',
                label: 'Amount',
            }]
        },
        options: {
            responsive: true,
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false,
                    }
                }]
            }
        }
    });
}

function getOrdinalSuffix(num) {
    const j = num % 10;
    const k = num % 100;

    if (j === 1 && k !== 11) {
        return `${num}st`;
    } 
    if (j === 2 && k !== 12) {
        return `${num}nd`;
    }
    if (j === 3 && k !== 13) {
        return `${num}rd`;
    }
    return `${num}th`;
}

function updateData(label, amount) {
    resultsChart.data.labels.push(label);
    resultsChart.data.datasets[0].data.push(amount);

    resultsChart.update();
}