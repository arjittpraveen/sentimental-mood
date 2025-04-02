let moodHistory = JSON.parse(localStorage.getItem('moodHistory')) || [];
let moodChart;

const theme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', theme);
updateThemeIcon(theme);

function initChart() {
    const ctx = document.getElementById('moodChart').getContext('2d');
    moodChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Mood Score',
                data: [],
                borderColor: '#4CAF50',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1
                }
            }
        }
    });
    updateChart();
}

function updateChart() {
    const labels = moodHistory.map(entry => new Date(entry.timestamp).toLocaleTimeString());
    const data = moodHistory.map(entry => entry.score);
    
    moodChart.data.labels = labels;
    moodChart.data.datasets[0].data = data;
    moodChart.update();
}

document.getElementById('theme-toggle').addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

document.querySelectorAll('.mood-option').forEach(option => {
    option.addEventListener('click', () => {
        const mood = option.dataset.mood;
        document.getElementById('userInput').value = `I am feeling ${mood}`;
        checkMood();
    });
});

function checkMood() {
    let userInput = document.getElementById("userInput").value;
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "Loading...";

    fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: userInput })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        resultDiv.innerHTML = "";

        let p = document.createElement("p");

        if (data.result === "good") {
            console.log(data.result) //DEBUG
            p.innerText = "👍";
            resultDiv.appendChild(p);
            addToMoodHistory(1);
        } else if (data.result === "neutral") {
            console.log(data.result);
            p.innerText = "😐";
            resultDiv.appendChild(p);
            addToMoodHistory(0.5);
        } else {
            console.log(data.result) //DEBUG
            p.innerText = "👎";
            resultDiv.appendChild(p);
            addToMoodHistory(0);
            // if (data.joke) {
            //     joke.textContent = data.joke;
            //     resultDiv.appendChild(joke);
            // }
        }

        // Add motivational quote
        addMotivationalQuote(data.result);
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = "Error: Could not connect to the server. Please make sure the backend is running.";
    });
}

function addToMoodHistory(score) {
    moodHistory.push({
        score: score,
        timestamp: new Date().toISOString()
    });
    
    if (moodHistory.length > 10) {
        moodHistory.shift();
    }
    
    localStorage.setItem('moodHistory', JSON.stringify(moodHistory));
    updateChart();
}

function addMotivationalQuote(mood) {
    const quotes = {
        good: [
            "Keep spreading that positivity! 🌟",
            "Keep up the good energy! ✨",
            "You're doing great! 🎉"
        ],
        neutral: [
            "Every day is a new opportunity! 🌈",
            "Stay balanced and focused! 🎯",
            "You've got this! 💪"
        ],
        bad: [
            "Remember, tough times are temporary! 🌅",
            "You're stronger than you know! 💪",
            "Tomorrow is a fresh start! 🌱"
        ]
    };

    const quoteDiv = document.createElement("p");
    quoteDiv.className = "motivational-quote";
    quoteDiv.textContent = quotes[mood][Math.floor(Math.random() * quotes[mood].length)];
    document.getElementById("result").appendChild(quoteDiv);
}

document.addEventListener('DOMContentLoaded', initChart);

document.getElementById('reset-btn').addEventListener('click', () => {
    if (confirm('Are you sure you want to reset your mood history? This action cannot be undone.')) {
        moodHistory = [];
        localStorage.removeItem('moodHistory');
        updateChart();
        
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '<p class="success-message">Mood history has been reset! 🎯</p>';
        setTimeout(() => {
            resultDiv.innerHTML = '';
        }, 3000);
    }
});
