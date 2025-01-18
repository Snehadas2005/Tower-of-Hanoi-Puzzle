class TowerOfHanoi {
    constructor() {
        this.level = 1;
        this.moves = 0;
        this.startTime = new Date();
        this.timer = null;
        this.selectedDisk = null;
        this.disks = 3; // Starting number of disks
        this.towers = [[], [], []];
        this.optimalMoves = Math.pow(2, this.disks) - 1;
        
        // Initialize drag-and-drop functionality
        this.initDragAndDrop();
        this.init();
    }

    init() {
        this.setupTowers();
        this.setupEventListeners();
        this.updateDisplay();
        this.startTimer();
    }

    setupTowers() {
        this.towers = [[], [], []];
        for (let i = this.disks; i > 0; i--) {
            this.towers[0].push(i);
        }
        this.renderTowers();
    }

    renderTowers() {
        const towers = document.querySelectorAll('.tower');
        towers.forEach((tower, towerIndex) => {
            tower.innerHTML = '';
            this.towers[towerIndex].forEach((diskSize, diskIndex) => {
                const disk = document.createElement('div');
                disk.className = 'disk';
                disk.id = `disk-${diskSize}`;
                disk.setAttribute('draggable', true);
                disk.style.width = `${diskSize * 30 + 30}px`;
                disk.style.bottom = `${diskIndex * 35}px`;
                disk.style.backgroundColor = this.getDiskColor(diskSize);
                disk.dataset.size = diskSize;
                tower.appendChild(disk);
            });
        });
    }

    initDragAndDrop() {
        document.addEventListener('DOMContentLoaded', () => {
            const disks = document.querySelectorAll('.disk');
            const pegs = document.querySelectorAll('.tower');

            disks.forEach(disk => {
                disk.addEventListener('dragstart', (e) => this.handleDragStart(e, disk));
                disk.addEventListener('dragend', (e) => this.handleDragEnd(e, disk));
            });

            pegs.forEach(peg => {
                peg.addEventListener('dragover', (e) => e.preventDefault());
                peg.addEventListener('drop', (e) => this.handleDrop(e, peg));
            });
        });
    }

    handleDragStart(e, disk) {
        const parentPeg = disk.parentElement;
        const topDisk = parentPeg.firstElementChild;
        if (disk !== topDisk) {
            e.preventDefault();
            return;
        }
        
        e.dataTransfer.setData('text/plain', disk.id);
        disk.classList.add('dragging');
    }

    handleDragEnd(e, disk) {
        disk.classList.remove('dragging');
    }

    handleDrop(e, targetPeg) {
        e.preventDefault();
        const diskId = e.dataTransfer.getData('text/plain');
        const disk = document.getElementById(diskId);
        
        if (this.isValidMove(disk, targetPeg)) {
            targetPeg.insertBefore(disk, targetPeg.firstChild);
            this.moves++;
            this.updateDisplay();
            this.checkWin();
        }
    }

    getDiskColor(size) {
        const colors = {
            1: 'var(--disk-1)',
            2: 'var(--disk-2)',
            3: 'var(--disk-3)',
            4: 'var(--disk-4)',
            5: 'var(--disk-5)',
            6: 'var(--disk-6)',
            7: 'var(--disk-7)'
        };
        return colors[size];
    }

    setupEventListeners() {
        document.querySelectorAll('.tower').forEach((tower, index) => {
            tower.addEventListener('click', () => this.handleTowerClick(index));
        });

        document.getElementById('resetBtn').addEventListener('click', () => this.resetGame());
        document.getElementById('historyBtn').addEventListener('click', () => this.showHistory());
    }

    handleTowerClick(towerIndex) {
        if (!this.selectedDisk) {
            if (this.towers[towerIndex].length === 0) return;
            this.selectedDisk = towerIndex;
            const topDisk = document.querySelector(`#tower${towerIndex} .disk:last-child`);
            if (topDisk) topDisk.classList.add('selected');
        } else {
            if (this.isValidMove(this.selectedDisk, towerIndex)) {
                this.moveDisk(this.selectedDisk, towerIndex);
                this.moves++;
                this.updateDisplay();
                if (this.checkWin()) {
                    this.handleWin();
                }
            }
            const selectedDiskElement = document.querySelector('.disk.selected');
            if (selectedDiskElement) selectedDiskElement.classList.remove('selected');
            this.selectedDisk = null;
        }
    }

    isValidMove(disk, targetPeg) {
        if (targetPeg.children.length === 0) {
            return true;
        }
        
        const topDisk = targetPeg.firstElementChild;
        const movingDiskSize = parseInt(disk.dataset.size);
        const topDiskSize = parseInt(topDisk.dataset.size);
        
        return movingDiskSize < topDiskSize;
    }

    moveDisk(from, to) {
        const disk = this.towers[from].pop();
        this.towers[to].push(disk);
        this.renderTowers();
    }

    checkWin() {
        const lastPeg = document.querySelector('.tower:last-child');
        const diskCount = this.disks;
        
        if (lastPeg.children.length === diskCount) {
            let isOrdered = true;
            let prevSize = Infinity;
            
            Array.from(lastPeg.children).forEach(disk => {
                const size = parseInt(disk.dataset.size);
                if (size > prevSize) {
                    isOrdered = false;
                }
                prevSize = size;
            });
            
            if (isOrdered) {
                const endTime = new Date();
                const timeTaken = Math.floor((endTime - this.startTime) / 1000);
                this.handleWin(timeTaken);
                return true;
            }
        }
        return false;
    }

    handleWin(timeTaken) {
        const score = this.calculateScore();
        
        const gameData = {
            level: this.level,
            moves: this.moves,
            optimalMoves: this.optimalMoves,
            time: timeTaken,
            score: score,
            date: new Date().toISOString()
        };

        this.saveGameHistory(gameData);

        if (this.level < 5) {
            setTimeout(() => {
                alert(`Congratulations! Level ${this.level} completed!\nMoves: ${this.moves}\nTime: ${timeTaken} seconds\nScore: ${score}`);
                this.level++;
                this.disks++;
                this.optimalMoves = Math.pow(2, this.disks) - 1;
                this.resetGame();
            }, 300);
        } else {
            this.showHistory();
        }
    }

    calculateScore() {
        const movesPenalty = Math.max(0, this.moves - this.optimalMoves) * 5;
        return Math.max(0, 100 - movesPenalty);
    }

    saveGameHistory(gameData) {
        const history = JSON.parse(localStorage.getItem('gameHistory') || '[]');
        history.push(gameData);
        localStorage.setItem('gameHistory', JSON.stringify(history));
    }

    updateDisplay() {
        document.getElementById('level').textContent = `Level: ${this.level}`;
        document.getElementById('moves').textContent = `Moves: ${this.moves}`;
    }

    startTimer() {
        this.startTime = new Date();
        this.timer = setInterval(() => {
            const time = Math.floor((Date.now() - this.startTime) / 1000);
            const minutes = Math.floor(time / 60).toString().padStart(2, '0');
            const seconds = (time % 60).toString().padStart(2, '0');
            document.getElementById('timer').textContent = `${minutes}:${seconds}`;
        }, 1000);
    }

    resetGame() {
        clearInterval(this.timer);
        this.moves = 0;
        this.startTime = new Date();
        this.selectedDisk = null;
        this.setupTowers();
        this.updateDisplay();
        this.startTimer();
    }

    showHistory() {
        const history = JSON.parse(localStorage.getItem('gameHistory') || '[]');
        const historyText = history.map(game => 
            `Level ${game.level}: ${game.moves} moves in ${game.time} seconds (Score: ${game.score})`
        ).join('\n');
        alert(historyText || 'No game history yet!');
    }
}

// Initialize game when document is ready
document.addEventListener('DOMContentLoaded', () => new TowerOfHanoi());
