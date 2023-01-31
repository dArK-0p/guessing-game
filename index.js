import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';

function getWord() {
  return 'Ironman';
}

function getRemainingGuess() {
  return 5;
}

class App extends Component {
  state = {
    word: getWord().toLowerCase().split(''),
    originalWord: getWord().split(''),
    remainingGuesses: getRemainingGuess(),
    guessList: [],
    status: 'Playing',
  };

  componentDidMount() {
    window.addEventListener('keypress', this.handleKeyPress);
  }

  setStatus = () => {
    const finished = this.state.word.every((letter) => {
      return this.state.guessList.includes(letter) || letter == ' ';
    });

    let stateVal = '';
    if (this.state.remainingGuesses == 0) {
      stateVal = 'Failed';
    } else if (finished) {
      stateVal = 'Success';
    } else {
      stateVal = 'Playing';
    }

    this.setState({
      status: stateVal,
    });
  };

  getStatusMessage = () => {
    if (this.state.status == 'Playing') {
      return `Guesses Remaining : ${this.state.remainingGuesses}`;
    } else if (this.state.status == 'Failed') {
      return `Nice try, the word was ${this.state.originalWord.join('')}`;
    } else {
      return `Great job! You guessed the word`;
    }
  };

  hint = () => {
    if (this.state.status != 'Playing') {
      return;
    }

    return 'Hint : We love you 3000';
  };

  getPuzzle = () => {
    if (this.state.status != 'Playing') {
      return;
    }

    let puzzle = '';
    this.state.originalWord.forEach((letter) => {
      puzzle =
        puzzle +
        (this.state.guessList.includes(letter.toLowerCase()) || letter == ' '
          ? letter
          : '*');
    });

    return puzzle;
  };

  makeGuess = (letter) => {
    if (this.state.status != 'Playing') {
      return;
    }
    const guessedAlready = this.state.guessList.includes(letter.toLowerCase());

    if (letter.length > 0 && letter != ' ' && !guessedAlready) {
      const arr = this.state.guessList;

      arr.push(letter.toLowerCase());

      this.setState({
        guessList: arr,
      });

      const correctGuess = this.state.word.includes(letter.toLowerCase());

      if (!correctGuess) {
        this.setState({
          remainingGuesses: this.state.remainingGuesses - 1,
        });
      }
    }

    this.setStatus();
  };

  handleKeyPress = (event) => {
    this.makeGuess(event.key);
  };

  render() {
    return (
      <div>
        {this.state.status == 'Playing' ? (
          <h1>GUESS IT (Press any key)</h1>
        ) : this.state.status == 'Success' ? (
          <h1>YOU GUESSED IT!</h1>
        ) : (
          <h1>OH NO!</h1>
        )}
        <h3>{this.hint()}</h3>
        <h3>{this.getPuzzle()}</h3>
        <h3>{this.getStatusMessage()}</h3>
        <button
          onClick={() => {
            this.setState({
              word: getWord().toLowerCase().split(''),
              originalWord: getWord().split(''),
              remainingGuesses: getRemainingGuess(),
              guessList: [],
              status: 'Playing',
            });
          }}
        >
          Play Again
        </button>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
