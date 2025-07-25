
import React from 'react';
import Card from './ui/Card';

interface EndScreenProps {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
}

const EndScreen: React.FC<EndScreenProps> = ({ score, totalQuestions, onPlayAgain }) => {
  const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  
  let message = "Good effort!";
  if (percentage === 100) {
    message = "Perfect Score! You're a Math Genius!";
  } else if (percentage >= 80) {
    message = "Excellent Work! You're a Math Star!";
  } else if (percentage >= 50) {
    message = "Great Job! Keep practicing!";
  }

  return (
    <Card className="text-center max-w-lg w-full">
        <h2 className="text-4xl font-bold text-yellow-500 mb-4">Adventure Complete!</h2>
        <p className="text-2xl text-blue-800 font-semibold mb-2">{message}</p>
        
        <div className="my-8">
            <p className="text-lg text-gray-700">Your Score:</p>
            <p className="text-7xl font-extrabold text-green-600 my-2">
                {score} / {totalQuestions}
            </p>
        </div>

        <button
            onClick={onPlayAgain}
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-bold rounded-xl text-2xl px-5 py-4 text-center transition-transform transform hover:scale-105 shadow-lg"
        >
            Play Again
        </button>
    </Card>
  );
};

export default EndScreen;
