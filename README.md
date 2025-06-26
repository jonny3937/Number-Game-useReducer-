# Number Guessing Game with React useReducer

A simple yet engaging number guessing game built with React, showcasing the power of the `useReducer` hook for state management. Every state transition is handled in the `numberGameReducer` function based on the dispatched action type.

## Action: `set-guess`

```js
if (action.type === "set-guess") {
  return { ...state, guess: action.payload };
}
```

This action is fired when the user types in the input box.

- It updates the `guess` property in the state with the current value.
- Using `payload` lets us pass in the value directly from the input's `onChange`.

## Action: `submit-guess`

```js
if (action.type === "submit-guess") {
  if (state.gameOver || state.attempts >= 10) return state;
}
```

Prevents guess submissions if the game is over or max attempts have been reached.

### Parsing and Validating Input

```js
const guessNum = parseInt(state.guess);
let message = '';
let gameOver = false;

if (isNaN(guessNum)) {
  message = 'Please enter a valid number.';
}
```

- Converts user input to a number.
- If its not a number, feedback is given and no further logic is executed.

### Correct Guess

```js
else if (guessNum === state.targetNumber) {
  const accuracy = (100 - (10*state.attempts));
  message = `Correct! The number was ${state.targetNumber}. Accuracy: ${accuracy}%.`;
  gameOver = true;
}
```

- If the guess matches the target number, the game ends.
- Accuracy is calculated based on attempts (1st try = 100%, 10th = 10%).

### Incorrect Guess

```js
else if (guessNum < state.targetNumber) {
  message = 'Too low.';
} else {
  message = 'Too high.';
}
```

- Basic comparison gives feedback if the guess is lower or higher.

### Ending After 10 Attempts

```js
const attempts = state.attempts + 1;
if (attempts >= 10 && !gameOver) {
  message = `Max attempts reached. The number was ${state.targetNumber}.`;
  gameOver = true;
}
```

- Ends the game and reveals the number if the user reaches 10 attempts.

### Final Return

```js
return {
  ...state,
  message,
  attempts,
  gameOver,
};
```

## Action: `new-game`

```js
if (action.type === "new-game") {
  return {
    targetNumber: Math.floor(Math.random() * 100),
    guess: '',
    message: '',
    attempts: 0,
    gameOver: false,
  };
}
```

- Resets all state to begin a new round.
- A new target number is randomly selected.

---

The entire logic validation, scoring, error handling, and reset is centralized in the reducer. This makes the app easy to extend.

---

# Run the Game 

```bash
git clone https://github.com/jonny3937/Number-Game-useReducer-.git
npm install
npm run dev
```
