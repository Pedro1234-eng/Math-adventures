
import React from 'react';
import { GameConfig, Problem, GameMode } from '../types';
import TreasureHunt from './games/TreasureHunt';
import BalloonPop from './games/BalloonPop';
import Card from './ui/Card';

interface GameScreenProps {
  config: GameConfig;
  problems: Problem[];
  onGameEnd: (score: number) => void;
}

const ComingSoonGame: React.FC<{gameTitle: string}> = ({gameTitle}) => (
    <Card className="text-center">
        <h2 className="text-3xl font-bold text-blue-800">{gameTitle}</h2>
        <p className="mt-4 text-gray-600 text-xl">This game mode is under construction and coming soon!</p>
        <img src="https://picsum.photos/400/300?grayscale" alt="Under Construction" className="mt-6 rounded-lg mx-auto shadow-lg" />
    </Card>
);

const GameScreen: React.FC<GameScreenProps> = ({ config, problems, onGameEnd }) => {
  switch (config.gameMode) {
    case GameMode.TreasureHunt:
      return <TreasureHunt problems={problems} onGameEnd={onGameEnd} />;
    case GameMode.BalloonPop:
      return <BalloonPop problems={problems} onGameEnd={onGameEnd} />;
    case GameMode.MathRace:
      return <ComingSoonGame gameTitle="Math Race" />;
    case GameMode.MathNinja:
        return <ComingSoonGame gameTitle="Math Ninja" />;
    default:
      return <div>Unknown game mode</div>;
  }
};

export default GameScreen;
