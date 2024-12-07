// Game Logic for Tower of Hanoi
const game = {
    currentScore: 0,
    currentUser: null,
    leaderboard: [],
    settings: {
        minDisks: 3,
        maxDisks: 8,
        maxGuessDeviation: 0.3 // 30% deviation allowed
    },
    
    // Initialize game
    init: function(username) {
        this.currentUser = username;
        this.loadLeaderboard();
        this.resetScore();
        this.showRulesModal();
    },

    // Show rules modal before game start
    showRulesModal: function() {
        const modal = `
        <div class="modal fade" id="rulesModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Tower of Hanoi Challenge</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <h6>Game Objective</h6>
                        <p>Guess the minimum number of moves required to solve the Tower of Hanoi puzzle!</p>
                        <ol>
                            <li>Select number of disks (3-8)</li>
                            <li>Predict total moves needed to solve the puzzle</li>
                            <li>Earn points based on the accuracy of your prediction</li>
                        </ol>
                        <h6>Rules</h6>
                        <ul>
                            <li>Only one disk can be moved at a time</li>
                            <li>A larger disk cannot be placed on a smaller disk</li>
                            <li>The goal is to move all disks to the rightmost tower</li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="rulesCheckbox">
                            <label class="form-check-label" for="rulesCheckbox">
                                I understand the rules
                            </label>
                        </div>
                        <button type="button" class="btn btn-primary" id="startGameBtn" disabled>Start Game</button>
                    </div>
                </div>
            </div>
        </div>
        `;
        
        // Append modal to body
        $('body').append(modal);
        
        // Show modal
        const rulesModal = new bootstrap.Modal('#rulesModal');
        rulesModal.show();

        // Enable start button only when checkbox is checked
        $('#rulesCheckbox').on('change', function() {
            $('#startGameBtn').prop('disabled', !this.checked);
        });

        $('#startGameBtn').on('click', function() {
            rulesModal.hide();
            game.startGame();
        });
    },

    // Start the game
    startGame: function() {
        const numDisks = parseInt($('#numDisks').val());
        const guessedMoves = parseInt($('#guessedMoves').val());
        
        // Validate inputs
        if (isNaN(numDisks) || isNaN(guessedMoves) || 
            numDisks < this.settings.minDisks || 
            numDisks > this.settings.maxDisks) {
            this.showAlert(`Please enter valid number of disks (${this.settings.minDisks}-${this.settings.maxDisks}).`, 'danger');
            return;
        }

        // Calculate actual minimum moves (2^n - 1)
        const actualMoves = Math.pow(2, numDisks) - 1;
        
        // Calculate score based on proximity to actual moves
        const points = this.calculateScore(guessedMoves, actualMoves, numDisks);
        
        this.updateScore(points);
        this.saveGameResult(numDisks, guessedMoves, actualMoves, points);
        this.showGameResult(guessedMoves, actualMoves, points);
    },

    // Calculate score based on guess accuracy
    calculateScore: function(guessed, actual, disks) {
        const accuracy = Math.abs(guessed - actual) / actual;
        const baseScore = disks * 10; // Base score depends on disk count
        
        // If guess is within acceptable deviation, award full points
        if (accuracy <= this.settings.maxGuessDeviation) {
            return baseScore;
        }
        
        // Partial points for close guesses
        return Math.max(0, Math.round(baseScore * (1 - accuracy)));
    },

    // Update total score
    updateScore: function(points) {
        this.currentScore += points;
        $('#totalScore').text(this.currentScore);
        $('#totalScore').addClass('score-highlight');
        setTimeout(() => $('#totalScore').removeClass('score-highlight'), 500);
    },

    // Save game result to server
    saveGameResult: function(disks, guessedMoves, actualMoves, points) {
        $.ajax({
            url: '/save-game-score',
            method: 'POST',
            data: {
                username: this.currentUser,
                disks: disks,
                guessedMoves: guessedMoves,
                actualMoves: actualMoves,
                points: points
            },
            success: (response) => {
                this.updateLeaderboard(response.leaderboard);
                console.log('Game result saved');
            },
            error: function(xhr, status, error) {
                console.error('Error saving game result:', error);
            }
        });
    },

    // Update local leaderboard
    updateLeaderboard: function(newLeaderboard) {
        this.leaderboard = newLeaderboard;
        this.renderLeaderboard();
    },

    // Render leaderboard
    renderLeaderboard: function() {
        const leaderboardList = $('#leaderboard');
        leaderboardList.empty();
        
        this.leaderboard.forEach((entry, index) => {
            leaderboardList.append(`
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${index + 1}. ${entry.username}
                    <span class="badge bg-primary rounded-pill">${entry.totalScore}</span>
                </li>
            `);
        });
    },

    // Load initial leaderboard
    loadLeaderboard: function() {
        $.ajax({
            url: '/get-leaderboard',
            method: 'GET',
            success: (response) => {
                this.updateLeaderboard(response.leaderboard);
            },
            error: function(xhr, status, error) {
                console.error('Error loading leaderboard:', error);
            }
        });
    },

    // Show game result
    showGameResult: function(guessed, actual, points) {
        const resultDiv = $('#lastResult');
        resultDiv.removeClass('alert-success alert-danger alert-warning');
        
        const deviation = Math.abs(guessed - actual) / actual * 100;
        
        if (points > 0) {
            resultDiv.addClass('alert-success');
            resultDiv.html(`Great prediction! You guessed ${guessed} moves. Actual moves were ${actual} (${deviation.toFixed(1)}% deviation). Earned ${points} points!`);
        } else {
            resultDiv.addClass('alert-warning');
            resultDiv.html(`Close attempt! You guessed ${guessed} moves. Actual moves were ${actual} (${deviation.toFixed(1)}% deviation).`);
        }
        
        resultDiv.show();
    },

    // Reset score
    resetScore: function() {
        this.currentScore = 0;
        $('#totalScore').text(this.currentScore);
        $('#lastResult').hide();
    },

    // Show alert messages
    showAlert: function(message, type = 'info') {
        const alertDiv = $('<div>', {
            class: `alert alert-${type} alert-dismissible fade show`,
            role: 'alert',
            html: message + '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>'
        });
        
        $('#currentScore').prepend(alertDiv);
    }
};

// Initialize game when document is ready
$(document).ready(function() {
    // Check if user is logged in and set current user
    const username = localStorage.getItem('username');
    if (username) {
        game.init(username);
    } else {
        window.location.href = 'login.html';
    }
});
