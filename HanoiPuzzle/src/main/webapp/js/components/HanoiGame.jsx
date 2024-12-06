import React, { useState, useEffect } from 'react';
import { Trophy, Award, Timer, Sparkles } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const HanoiGame = () => {
  const [numDisks, setNumDisks] = useState(3);
  const [towers, setTowers] = useState([]);
  const [selectedDisk, setSelectedDisk] = useState(null);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bestScore, setBestScore] = useState(null);

  // Initialize towers
  useEffect(() => {
    resetGame();
  }, [numDisks]);

  // Timer logic
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const resetGame = () => {
    const initialTower = Array.from({length: numDisks}, (_, i) => numDisks - i);
    setTowers([initialTower, [], []]);
    setMoves(0);
    setTimer(0);
    setIsPlaying(true);
    setShowSuccess(false);
  };

  const handleDiskClick = (towerIndex, diskIndex) => {
    if (selectedDisk === null && diskIndex !== undefined) {
      setSelectedDisk({ towerIndex, diskIndex });
    } else if (selectedDisk !== null) {
      moveDisk(towerIndex);
    }
  };

  const moveDisk = (targetTowerIndex) => {
    if (selectedDisk === null) return;

    const sourceTower = towers[selectedDisk.towerIndex];
    const targetTower = towers[targetTowerIndex];
    const diskToMove = sourceTower[selectedDisk.diskIndex];

    if (targetTower.length === 0 || diskToMove < targetTower[targetTower.length - 1]) {
      const newTowers = towers.map((tower, index) => {
        if (index === selectedDisk.towerIndex) {
          return tower.filter((_, i) => i !== selectedDisk.diskIndex);
        }
        if (index === targetTowerIndex) {
          return [...tower, diskToMove];
        }
        return tower;
      });

      setTowers(newTowers);
      setMoves(prev => prev + 1);
      checkWinCondition(newTowers);
    }

    setSelectedDisk(null);
  };

  const checkWinCondition = (currentTowers) => {
    if (currentTowers[2].length === numDisks) {
      setIsPlaying(false);
      setShowSuccess(true);
      if (!bestScore || moves < bestScore) {
        setBestScore(moves);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex gap-4">
          <select 
            value={numDisks}
            onChange={(e) => setNumDisks(Number(e.target.value))}
            className="px-4 py-2 rounded bg-gray-100"
          >
            {[3,4,5,6,7].map(n => (
              <option key={n} value={n}>{n} Disks</option>
            ))}
          </select>
          <button 
            onClick={resetGame}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reset Game
          </button>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5" />
            <span className="font-mono">{formatTime(timer)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            <span>{moves} moves</span>
          </div>
        </div>
      </div>

      {showSuccess && (
        <Alert className="mb-4 bg-green-50 border-green-200">
          <Sparkles className="w-4 h-4" />
          <AlertTitle>Congratulations!</AlertTitle>
          <AlertDescription>
            You solved it in {moves} moves and {formatTime(timer)}!
            {bestScore === moves && " This is your best score!"}
          </AlertDescription>
        </Alert>
      )}

      <div className="relative h-96 bg-gray-100 rounded-lg p-4 flex justify-around items-end">
        {towers.map((tower, towerIndex) => (
          <div 
            key={towerIndex}
            className="relative h-full flex flex-col justify-end items-center"
            onClick={() => handleDiskClick(towerIndex)}
          >
            <div className="absolute bottom-0 w-2 h-4/5 bg-gray-400 rounded"></div>
            <div className="w-32 h-2 bg-gray-400 rounded"></div>
            
            <div className="absolute bottom-2 flex flex-col-reverse items-center gap-1">
              {tower.map((size, diskIndex) => (
                <div
                  key={diskIndex}
                  className={`h-6 rounded transition-all cursor-pointer
                    ${selectedDisk?.towerIndex === towerIndex && selectedDisk?.diskIndex === diskIndex
                      ? 'ring-2 ring-blue-500 ring-offset-2'
                      : ''}`}
                  style={{
                    width: `${(size / numDisks) * 120}px`,
                    backgroundColor: `hsl(${(size * 360) / numDisks}, 70%, 50%)`
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDiskClick(towerIndex, diskIndex);
                  }}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        <h3 className="font-semibold mb-2">Rules:</h3>
        <ul className="list-disc pl-5">
          <li>Move all disks to the rightmost tower</li>
          <li>Only one disk can be moved at a time</li>
          <li>No larger disk may be placed on top of a smaller disk</li>
        </ul>
      </div>
    </div>
  );
};

export default HanoiGame;