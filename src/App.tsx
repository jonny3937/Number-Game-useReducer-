import { useReducer } from "react";
import "./App.css";

function numberGameReducer(state, action) {
  if (action.type === "set-guess") {
    return { ...state, guess: action.payload };
  }

  if (action.type === "submit-guess") {
    if (state.gameOver || state.attempts >= 10) return state;

    const guessNum = parseInt(state.guess);
    let message = '';
    let gameOver = false;

    if (isNaN(guessNum)) {
      message = 'Please enter a valid number.';
    } else if (guessNum === state.targetNumber) {
      const accuracy = (100 - (10*state.attempts));
      message = `Correct! The number was ${state.targetNumber}. Accuracy: ${accuracy}%.`;
      gameOver = true;
    } else if (guessNum < state.targetNumber) {
      message = 'Too low.';
    } else {
      message = 'Too high.';
    }

    const attempts = state.attempts + 1;
    if (attempts >= 10 && !gameOver) {
      message = `Max attempts reached. The number was ${state.targetNumber}.`;
      gameOver = true;
    }

    return {
      ...state,
      message,
      attempts,
      gameOver,
    };
  }

  if (action.type === "new-game") {
    return {
      targetNumber: Math.floor(Math.random() * 100),
      guess: '',
      message: '',
      attempts: 0,
      gameOver: false,
    };
  }
}

function NumberGuessingGame() {
  const [gameState, dispatch] = useReducer(numberGameReducer, {
    targetNumber: Math.floor(Math.random() * 100),
    guess: '',
    message: '',
    attempts: 0,
    gameOver: false,
  });

  const isGuessDisabled = gameState.gameOver || gameState.attempts >= 10;

  return (
    <div className="game-container">
      <h1 className="game-title">Number Guessing Game</h1>

      <form 
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "submit-guess" });
        }}
        className="guess-form"
      >
        <input
          type="number"
          min="1"
          max="100"
          value={gameState.guess}
          onChange={(e) => dispatch({ type: "set-guess", payload: e.target.value })}
          disabled={isGuessDisabled}
          className="guess-input"
          placeholder="Enter your guess (1-100)"
        />

        <div className="button-group">
          <button
            type="submit"
            disabled={isGuessDisabled}
            className="submit-button"
          >
            Guess
          </button>

          <button
            type="button"
            onClick={() => dispatch({ type: "new-game" })}
            className="new-game-button"
          >
            New Game
          </button>
        </div>
      </form>

      <div className="feedback-message">
        {gameState.message}
      </div>

      <div className="attempts-counter">
        Attempts: {gameState.attempts}/10
      </div>
    </div>
  );
}

export default NumberGuessingGame;