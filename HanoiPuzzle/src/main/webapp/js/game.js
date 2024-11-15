class TowerOfHanoi {
    constructor() {
        this.score = 0;
    }

    calculateMoves(disks) {
        return Math.pow(2, disks) - 1;
    }

    checkGuess(numDisks, guessedMoves) {
        const actualMoves = this.calculateMoves(numDisks);
        const points = guessedMoves === actualMoves ? 10 : 0;
        this.score += points;
        return {
            correct: guessedMoves === actualMoves,
            actualMoves: actualMoves,
            points: points,
            totalScore: this.score
        };
    }

    resetScore() {
        this.score = 0;
    }
}

// Form validation
function validateForm() {
    const password = document.getElementById('password').value;
    const rePassword = document.getElementById('rePassword').value;
    const email = document.getElementById('email').value;

    if (password !== rePassword) {
        alert('Passwords do not match!');
        return false;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        alert('Please enter a valid email address!');
        return false;
    }

    return true;
}

// Game interaction
const game = new TowerOfHanoi();

function playGame() {
    const numDisks = parseInt(document.getElementById('numDisks').value);
    const guessedMoves = parseInt(document.getElementById('guessedMoves').value);
    
    if (isNaN(numDisks) || isNaN(guessedMoves) || numDisks < 1) {
        alert('Please enter valid numbers!');
        return;
    }

    const result = game.checkGuess(numDisks, guessedMoves);
    updateScoreboard(numDisks, guessedMoves, result);
    saveScore(numDisks, guessedMoves, result.actualMoves, result.points);
}
