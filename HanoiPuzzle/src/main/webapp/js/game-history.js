document.addEventListener('DOMContentLoaded', () => {
    loadGameHistory();
    calculateGameStatistics();
    renderSkillProgressChart();
});

function loadGameHistory() {
    // Fetch game history from local storage or backend
    const gameHistory = JSON.parse(localStorage.getItem('gameHistory') || '[]');
    const gameHistoryBody = document.getElementById('gameHistoryBody');
    
    gameHistory.forEach(game => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${game.date}</td>
            <td>${game.disks}</td>
            <td>${game.guess}</td>
            <td>${game.actualMoves}</td>
            <td>${game.points}</td>
            <td>
                <span class="badge ${game.points > 50 ? 'bg-success' : 'bg-warning'}">
                    ${game.points > 50 ? 'Excellent' : 'Average'}
                </span>
            </td>
        `;
        gameHistoryBody.appendChild(row);
    });
}

function calculateGameStatistics() {
    const gameHistory = JSON.parse(localStorage.getItem('gameHistory') || '[]');
    
    // Total games
    document.getElementById('totalGamesPlayed').textContent = gameHistory.length;
    
    // Highest score
    const highestScore = Math.max(...gameHistory.map(g => g.points), 0);
    document.getElementById('highestScore').textContent = highestScore;
    
    // Accuracy calculation
    const accuracyPercentage = calculateAccuracy(gameHistory);
    const accuracyProgressBar = document.getElementById('accuracyProgressBar');
    accuracyProgressBar.style.width = `${accuracyPercentage}%`;
    accuracyProgressBar.textContent = `Accuracy: ${accuracyPercentage}%`;
}

function renderSkillProgressChart() {
    const gameHistory = JSON.parse(localStorage.getItem('gameHistory') || '[]');
    const ctx = document.getElementById('skillProgressChart').getContext('2d');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: gameHistory.map((_, idx) => `Game ${idx + 1}`),
            datasets: [{
                label: 'Score Progression',
                data: gameHistory.map(g => g.points),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function exportGameHistory() {
    const gameHistory = JSON.parse(localStorage.getItem('gameHistory') || '[]');
    const csvContent = generateCSV(gameHistory);
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'hanoi_heights_history.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function generateCSV(gameHistory) {
    const headers = ['Date', 'Disks', 'Guess', 'Actual Moves', 'Points'];
    const rows = gameHistory.map(game => [
        game.date,
        game.disks,
        game.guess,
        game.actualMoves,
        game.points
    ]);
    
    return [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');
}

function calculateAccuracy(gameHistory) {
    if (gameHistory.length === 0) return 0;
    
    const accurateGames = gameHistory.filter(game => 
        Math.abs(game.guess - game.actualMoves) <= 2
    );
    
    return Math.round((accurateGames.length / gameHistory.length) * 100);
}