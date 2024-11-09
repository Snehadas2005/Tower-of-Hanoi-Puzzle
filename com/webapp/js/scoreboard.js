document.addEventListener('DOMContentLoaded', function() {
    loadScoreboard();
});

async function loadScoreboard() {
    try {
        const response = await fetch('api/scores');
        const scores = await response.json();
        
        const scoreboardBody = document.getElementById('scoreboardBody');
        let totalScore = 0;
        
        scores.forEach(score => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${new Date(score.playedAt).toLocaleDateString()}</td>
                <td>${score.numDisks}</td>
                <td>${score.guessedMoves}</td>
                <td>${score.actualMoves}</td>
                <td>${score.points}</td>
            `;
            scoreboardBody.appendChild(row);
            totalScore += score.points;
        });
        
        document.getElementById('totalHistoryScore').textContent = totalScore;
    } catch (error) {
        console.error('Error loading scoreboard:', error);
        alert('Failed to load scoreboard. Please try again later.');
    }
}

function updateScoreboard(numDisks, guessedMoves, result) {
    const lastResult = document.getElementById('lastResult');
    lastResult.style.display = 'block';
    
    if (result.correct) {
        lastResult.className = 'alert alert-success';
        lastResult.textContent = `Correct! You earned ${result.points} points!`;
    } else {
        lastResult.className = 'alert alert-danger';
        lastResult.textContent = `Incorrect. The actual number of moves was ${result.actualMoves}.`;
    }
    
    const totalScoreElement = document.getElementById('totalScore');
    totalScoreElement.textContent = result.totalScore;
    totalScoreElement.classList.add('score-highlight');
    setTimeout(() => totalScoreElement.classList.remove('score-highlight'), 500);
}