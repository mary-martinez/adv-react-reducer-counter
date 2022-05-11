import { useEffect, useReducer, useState } from 'react';
import styles from './Counter.css';

const colors = {
  yellow: 'rgb(236, 222, 153)',
  green: 'rgb(52, 211, 153)',
  red: 'rgb(239, 68, 68)',
};

const initialState = { count: 0, color: colors.yellow };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1, color: state.color };
    case 'decrement':
      return { count: state.count - 1, color: state.color };
    case 'reset':
      return { count: 0, color: state.color };
    case 'positive':
      return { ...state, color: colors.green };
    case 'zero':
      return { ...state, color: colors.yellow };
    case 'negative':
      return { ...state, color: colors.red };
    default:
      throw new Error('not a defined action');
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.count === 0) {
      dispatch({ type: 'zero' });
    }

    if (state.count > 0) {
      dispatch({ type: 'positive' });
    }

    if (state.count < 0) {
      dispatch({ type: 'negative' });
    }
  }, [state.count]);

  return (
    <main className={styles.main}>
      <h1 style={{ color: state.color }}>{state.count}</h1>
      <div>
        <button
          type="button"
          onClick={() => dispatch({ type: 'increment' })}
          aria-label="increment"
          style={{ backgroundColor: colors.green }}
        >
          Increment
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: 'decrement' })}
          aria-label="decrement"
          style={{ backgroundColor: colors.red }}
        >
          Decrement
        </button>
        <button
          type="button"
          aria-label="reset"
          onClick={() => dispatch({ type: 'reset' })}
          style={{ backgroundColor: colors.yellow }}
        >
          Reset
        </button>
      </div>
    </main>
  );
}
