$(document).ready(function() {
    const username = localStorage.getItem('username');
    if (!username) {
        window.location.href = 'login.html';
        return;
    }

    // Enhanced game history loading with more details
    function loadGameHistory() {
        $.ajax({
            url: '/game_history',
            method: 'GET',
            data: { username: username },
            success: function(gameHistory) {
                const scoreboardBody = $('#scoreboardBody');
                scoreboardBody.empty();
                
                let totalHistoryScore = 0;
                let bestScore = 0;
                let gamesPlayed = gameHistory.length;

                gameHistory.forEach((game, index) => {
                    // Calculate performance rating
                    const performanceRating = calculatePerformanceRating(game.guessedMoves, game.actualMoves);
                    
                    const row = `
                        <tr class="${performanceRating === 'Excellent' ? 'table-success' : 
                                    performanceRating === 'Good' ? 'table-info' : 
                                    performanceRating === 'Average' ? 'table-warning' : 'table-danger'}">
                            <td>${new Date(game.gameDate).toLocaleDateString()}</td>
                            <td>${game.disks}</td>
                            <td>${game.guessedMoves}</td>
                            <td>${game.actualMoves}</td>
                            <td>${game.points}</td>
                            <td>${performanceRating}</td>
                        </tr>
                    `;
                    scoreboardBody.append(row);
                    
                    totalHistoryScore += game.points;
                    bestScore = Math.max(bestScore, game.points);
                });

                // Update additional stats
                $('#totalHistoryScore').text(totalHistoryScore);
                $('#gamesPlayed').text(gamesPlayed);
                $('#bestScore').text(bestScore);

                // Visualize performance
                generatePerformanceChart(gameHistory);
            },
            error: function() {
                $('#scoreboardBody').html(`
                    <tr>
                        <td colspan="6" class="text-center text-danger">
                            Unable to load game history. Please try again later.
                        </td>
                    </tr>
                `);
            }
        });
    }

    // Calculate performance based on guessed vs actual moves
    function calculatePerformanceRating(guessedMoves, actualMoves) {
        const accuracy = Math.abs(guessedMoves - actualMoves) / actualMoves;
        
        if (accuracy < 0.1) return 'Excellent';
        if (accuracy < 0.25) return 'Good';
        if (accuracy < 0.5) return 'Average';
        return 'Needs Improvement';
    }

    // Basic performance visualization (could be expanded)
    function generatePerformanceChart(gameHistory) {
        const ctx = document.getElementById('performanceChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: gameHistory.map((game, index) => `Game ${index + 1}`),
                datasets: [{
                    label: 'Points Earned',
                    data: gameHistory.map(game => game.points),
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Performance Over Time'
                    }
                }
            }
        });
    }

    // Initialize the page
    loadGameHistory();

    // Add export functionality
    $('#exportScoreboard').on('click', function() {
        exportToCSV(gameHistory);
    });

    function exportToCSV(data) {
        const csvContent = [
            ['Date', 'Disks', 'Guessed Moves', 'Actual Moves', 'Points', 'Performance'],
            ...data.map(game => [
                new Date(game.gameDate).toLocaleDateString(),
                game.disks,
                game.guessedMoves,
                game.actualMoves,
                game.points,
                calculatePerformanceRating(game.guessedMoves, game.actualMoves)
            ])
        ].map(e => e.join(",")).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", "hanoi_heights_scoreboard.csv");
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
});
