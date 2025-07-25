
import React, { useState, useEffect, useMemo } from 'react';
import { Problem } from '../../types';
import Card from '../ui/Card';

interface BalloonPopProps {
  problems: Problem[];
  onGameEnd: (score: number) => void;
}

type Feedback = 'correct' | 'incorrect' | 'unanswered';

const BalloonPop: React.FC<BalloonPopProps> = ({ problems, onGameEnd }) => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<Feedback>('unanswered');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const currentProblem = problems[currentProblemIndex];
  const totalProblems = problems.length;

  const shuffledOptions = useMemo(() => {
    if (!currentProblem || !currentProblem.options) return [];
    return [...currentProblem.options].sort(() => Math.random() - 0.5);
  }, [currentProblem]);

  useEffect(() => {
    if (feedback !== 'unanswered') {
      const timer = setTimeout(() => {
        if (currentProblemIndex + 1 < totalProblems) {
          setCurrentProblemIndex(currentProblemIndex + 1);
          setFeedback('unanswered');
          setSelectedAnswer(null);
        } else {
          onGameEnd(score);
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [feedback, currentProblemIndex, totalProblems, onGameEnd, score]);

  const handleAnswerSelect = (option: number) => {
    if (feedback !== 'unanswered') return;

    setSelectedAnswer(option);
    if (option === currentProblem.answer) {
      setScore(score + 1);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };
  
  const balloonColors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-400'];

  return (
    <Card className="w-full max-w-3xl text-center overflow-hidden">
        <h2 className="text-3xl font-bold text-cyan-700 mb-2">Balloon Pop Math</h2>
        <p className="text-gray-600 mb-4">Pop the balloon with the correct answer!</p>
        <p className="font-semibold text-gray-700 mb-6">Question {currentProblemIndex + 1} of {totalProblems} | Score: {score}</p>
      
        <div className="bg-blue-200/50 p-6 rounded-lg border-2 border-blue-300 min-h-[300px] flex flex-col justify-center items-center">
             <div className="mb-8">
                <p className="text-5xl font-bold text-gray-800">{currentProblem.question}</p>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {shuffledOptions.map((option, index) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrect = option === currentProblem.answer;
                    
                    let balloonClass = '';
                    if (feedback !== 'unanswered' && isSelected) {
                        balloonClass = isCorrect ? 'animate-ping' : 'animate-shake';
                    }
                    if (feedback !== 'unanswered' && !isCorrect) {
                        balloonClass += ' opacity-50';
                    }

                    return (
                        <button
                            key={index}
                            onClick={() => handleAnswerSelect(option)}
                            disabled={feedback !== 'unanswered'}
                            className={`relative text-white font-extrabold text-3xl h-28 w-full rounded-full flex items-center justify-center transition-transform duration-200 transform hover:scale-110 disabled:cursor-not-allowed disabled:transform-none ${balloonColors[index % balloonColors.length]} ${balloonClass}`}
                        >
                            {option}
                             <div className="absolute -bottom-2 w-0 h-0 border-l-[10px] border-l-transparent border-t-[15px] border-r-[10px] border-r-transparent" style={{borderTopColor: 'inherit'}}></div>
                        </button>
                    )
                })}
             </div>

             <div className="h-12 mt-6">
                {feedback === 'correct' && <p className="text-2xl font-bold text-green-600">POP! Correct! 🎉</p>}
                {feedback === 'incorrect' && <p className="text-2xl font-bold text-red-600">Whoops! The answer is {currentProblem.answer}.</p>}
             </div>
        </div>
    </Card>
  );
};


// Simple shake animation for incorrect answers
const style = document.createElement('style');
style.innerHTML = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
    20%, 40%, 60%, 80% { transform: translateX(10px); }
  }
  .animate-shake {
    animation: shake 0.5s ease-in-out;
  }
`;
document.head.appendChild(style);

export default BalloonPop;
