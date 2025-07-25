import React, { useState, useCallback } from 'react';
import { GameConfig, ClassLevel, Operation, GameMode } from '../types';
import { CLASS_LEVELS, OPERATIONS, GAME_MODES, ROUNDS } from '../constants';
import Card from './ui/Card';

interface ConfigScreenProps {
  onStartGame: (config: GameConfig) => void;
}

const ConfigScreen: React.FC<ConfigScreenProps> = ({ onStartGame }) => {
  const [level, setLevel] = useState<ClassLevel>(ClassLevel.P1);
  const [operation, setOperation] = useState<Operation>(Operation.Addition);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.TreasureHunt);
  const [rounds, setRounds] = useState<number>(5);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onStartGame({
      level,
      operation,
      gameMode,
      rounds,
      timeChallenge: false, // Time challenge not implemented in this version
    });
  }, [level, operation, gameMode, rounds, onStartGame]);
  
  const isModeDisabled = (mode: GameMode) => mode === GameMode.MathRace || mode === GameMode.MathNinja;

  return (
    <Card className="w-full max-w-2xl">
        <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-800">Math Adventure Land</h1>
            <p className="text-gray-600 mt-2">Choose your challenge and start the fun!</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
            <ConfigSection title="1. Select Your Class Level">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {CLASS_LEVELS.map(l => (
                        <RadioCard
                            key={l.id}
                            id={`level-${l.id}`}
                            name="level"
                            checked={level === l.id}
                            onChange={() => setLevel(l.id)}
                            label={l.title}
                        />
                    ))}
                </div>
            </ConfigSection>

            <ConfigSection title="2. Pick an Operation">
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {OPERATIONS.map(op => (
                        <RadioCard
                            key={op.id}
                            id={`op-${op.id}`}
                            name="operation"
                            checked={operation === op.id}
                            onChange={() => setOperation(op.id)}
                            label={op.title}
                        />
                    ))}
                </div>
            </ConfigSection>

            <ConfigSection title="3. Choose a Game Mode">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {GAME_MODES.map(mode => (
                         <GameModeCard
                            key={mode.id}
                            id={`mode-${mode.id}`}
                            name="gameMode"
                            checked={gameMode === mode.id}
                            onChange={() => setGameMode(mode.id)}
                            title={mode.title}
                            description={mode.description}
                            disabled={isModeDisabled(mode.id)}
                            label={mode.title}
                        />
                    ))}
                </div>
            </ConfigSection>

             <ConfigSection title="4. How Many Rounds?">
                <div className="flex justify-center space-x-4">
                    {ROUNDS.map(r => (
                        <RadioCard
                            key={r}
                            id={`rounds-${r}`}
                            name="rounds"
                            checked={rounds === r}
                            onChange={() => setRounds(r)}
                            label={`${r} Rounds`}
                        />
                    ))}
                </div>
            </ConfigSection>

            <div className="pt-4">
                 <button
                    type="submit"
                    className="w-full text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-bold rounded-xl text-2xl px-5 py-4 text-center transition-transform transform hover:scale-105 shadow-lg"
                    >
                    Start Adventure!
                </button>
            </div>
        </form>
    </Card>
  );
};

// Helper components for styling the config screen
const ConfigSection: React.FC<{title: string; children: React.ReactNode}> = ({ title, children }) => (
    <div>
        <h2 className="text-xl font-bold text-blue-900 mb-3 text-center">{title}</h2>
        {children}
    </div>
);

interface RadioCardProps {
    id: string;
    name: string;
    checked: boolean;
    onChange: () => void;
    label: string;
}

const RadioCard: React.FC<RadioCardProps> = ({ id, name, checked, onChange, label }) => (
    <div>
        <input type="radio" id={id} name={name} checked={checked} onChange={onChange} className="hidden" />
        <label htmlFor={id} className={`block cursor-pointer text-center p-4 rounded-lg border-2 transition-all duration-200 ${checked ? 'bg-blue-500 border-blue-700 text-white font-bold shadow-md' : 'bg-white/80 border-gray-300 hover:border-blue-400 hover:bg-blue-50'}`}>
            {label}
        </label>
    </div>
);

interface GameModeCardProps extends RadioCardProps {
    title: string;
    description: string;
    disabled?: boolean;
}

const GameModeCard: React.FC<GameModeCardProps> = ({ id, name, checked, onChange, title, description, disabled=false, label }) => (
     <div>
        <input type="radio" id={id} name={name} checked={checked} onChange={onChange} className="hidden" disabled={disabled} />
        <label htmlFor={id} className={`flex flex-col text-left p-4 rounded-lg border-2 transition-all duration-200 ${disabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'cursor-pointer'} ${checked ? 'bg-blue-500 border-blue-700 text-white shadow-md' : 'bg-white/80 border-gray-300 hover:border-blue-400 hover:bg-blue-50'}`}>
            <span className={`font-bold text-lg ${checked ? 'text-white' : 'text-blue-900'}`}>{title}</span>
            <span className={`text-sm ${checked ? 'text-blue-100' : 'text-gray-600'}`}>{description}</span>
        </label>
    </div>
);


export default ConfigScreen;