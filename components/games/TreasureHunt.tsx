
import React, { useState, useEffect } from 'react';
import { Problem } from '../../types';
import Card from '../ui/Card';

interface TreasureHuntProps {
  problems: Problem[];
  onGameEnd: (score: number) => void;
}

type Feedback = 'correct' | 'incorrect' | 'unanswered';

const TreasureHunt: React.FC<TreasureHuntProps> = ({ problems, onGameEnd }) => {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<Feedback>('unanswered');
  
  const currentProblem = problems[currentProblemIndex];
  const totalProblems = problems.length;

  useEffect(() => {
    if (feedback !== 'unanswered') {
      const timer = setTimeout(() => {
        if (currentProblemIndex + 1 < totalProblems) {
            setCurrentProblemIndex(currentProblemIndex + 1);
            setUserAnswer('');
            setFeedback('unanswered');
        } else {
            onGameEnd(score);
        }
      }, 1500); // Wait 1.5 seconds before moving to next question
      return () => clearTimeout(timer);
    }
  }, [feedback, currentProblemIndex, totalProblems, onGameEnd, score]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (feedback !== 'unanswered') return;

    const answer = parseInt(userAnswer, 10);
    if (!isNaN(answer) && answer === currentProblem.answer) {
      setScore(score + 1);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }
  };

  const getFeedbackStyles = () => {
      switch(feedback) {
          case 'correct': return 'bg-green-100 border-green-500 text-green-700';
          case 'incorrect': return 'bg-red-100 border-red-500 text-red-700';
          default: return 'bg-white';
      }
  }
  
  const progressPercentage = (currentProblemIndex / totalProblems) * 100;

  return (
    <Card className="w-full max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-amber-700 mb-2">Treasure Hunt</h2>
        <p className="text-gray-600 mb-6">Solve the puzzle to get closer to the treasure!</p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-6 mb-4 border border-gray-300 overflow-hidden">
            <div 
                className="bg-yellow-400 h-full rounded-full transition-all duration-500 flex items-center justify-end" 
                style={{ width: `${progressPercentage}%` }}
            >
             <span className="text-amber-800 font-bold text-2xl mr-2">💎</span>
            </div>
        </div>
        <p className="font-semibold text-gray-700 mb-6">Question {currentProblemIndex + 1} of {totalProblems} | Score: {score}</p>
      
      
        <div className={`p-8 rounded-lg border-2 transition-colors ${getFeedbackStyles()}`}>
            <p className="text-4xl font-bold text-gray-800 mb-6">{currentProblem.question}</p>
            
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    disabled={feedback !== 'unanswered'}
                    className="text-center text-3xl font-bold w-full max-w-xs mx-auto p-3 border-2 border-gray-300 rounded-lg shadow-inner focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    placeholder="Your Answer"
                />
                <button
                    type="submit"
                    disabled={feedback !== 'unanswered' || !userAnswer}
                    className="mt-6 w-full max-w-xs mx-auto text-white bg-blue-600 hover:bg-blue-700 font-bold rounded-lg text-xl px-5 py-3 text-center transition-transform transform hover:scale-105 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                >
                    Check Answer
                </button>
            </form>

            {feedback === 'correct' && <p className="mt-4 text-2xl font-bold text-green-600 animate-pulse">Correct! 🌟</p>}
            {feedback === 'incorrect' && <p className="mt-4 text-2xl font-bold text-red-600">Not quite! The answer is {currentProblem.answer}.</p>}
        </div>
    </Card>
  );
};

export default TreasureHunt;
