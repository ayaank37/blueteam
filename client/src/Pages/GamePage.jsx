import React, { useState, useEffect } from 'react';
import { useGameBucks } from '../Components/GameBucksContext';

const questionBank = [
  { prompt: 'What is the output of: print(2 ** 3)', answer: '8' },
  { prompt: 'What does len("hello") return?', answer: '5' },
  { prompt: 'What is the result of: print(10 // 3)', answer: '3' },
  { prompt: 'What is the value of: bool("")', answer: 'False' },
  { prompt: 'What is the result of: print(5 % 2)', answer: '1' },
  { prompt: 'What is the output of: print("a" * 3)', answer: 'aaa' },
  { prompt: 'What is the output of: print(7 + 3 * 2)', answer: '13' },
  { prompt: 'What is the type of: type([])', answer: "<class 'list'>" },
  { prompt: 'What is the output of: print(9 != 10)', answer: 'True' },
  { prompt: 'What does range(3) return?', answer: 'range(0, 3)' },
];

const MAX_HEARTS = 5;

const GamePage = () => {
  const { gameBucks, setGameBucks } = useGameBucks();
  const [playerHearts, setPlayerHearts] = useState(MAX_HEARTS);
  const [monsterHearts, setMonsterHearts] = useState(MAX_HEARTS);
  const [feedback, setFeedback] = useState('');
  const [userInput, setUserInput] = useState('');
  const [usedIndices, setUsedIndices] = useState([]);
  const [question, setQuestion] = useState(null);

  const renderHearts = (count) => '❤️ '.repeat(count).trim();

  const getNextQuestion = (used) => {
    if (used.length >= questionBank.length) return null;
    let index;
    do {
      index = Math.floor(Math.random() * questionBank.length);
    } while (used.includes(index));
    return { question: questionBank[index], index };
  };

  const loadNextQuestion = () => {
    const { question: nextQ, index } = getNextQuestion(usedIndices) || {};
    if (nextQ) {
      setQuestion(nextQ);
      setUsedIndices((prev) => [...prev, index]);
    }
  };

  useEffect(() => {
    loadNextQuestion();
  }, []); // initial load

  const handleSubmit = () => {
    if (!question || playerHearts === 0 || monsterHearts === 0) return;

    const normalized = userInput.trim();
    const correct = normalized === question.answer;

    if (correct) {
      setFeedback('✅ Correct! +5 GameBucks. Monster lost a heart!');
      setGameBucks((prev) => prev + 5);
      const newMonsterHearts = Math.max(monsterHearts - 1, 0);
      setMonsterHearts(newMonsterHearts);
      if (newMonsterHearts === 0) {
        setGameBucks((prev) => prev + 25);
        setFeedback('🎉 You defeated the monster! +25 bonus GameBucks!');
      }
    } else {
      const newPlayerHearts = Math.max(playerHearts - 1, 0);
      setPlayerHearts(newPlayerHearts);
      if (newPlayerHearts === 0) {
        setFeedback(`☠️ You died. Correct answer: ${question.answer}`);
      } else {
        setFeedback(`❌ Incorrect! You lost a heart. Correct answer: ${question.answer}`);
      }
    }

    setUserInput('');

    if (playerHearts > 1 && monsterHearts > 1) {
      setTimeout(() => {
        loadNextQuestion();
      }, 500);
    }
  };

  return (
    <div style={{ backgroundColor: '#1a1a1a', color: 'white', minHeight: '100vh', paddingBottom: '60px' }}>
      <div style={{ width: '100%', backgroundColor: '#ccc', textAlign: 'center', padding: '20px 0', fontSize: '2.5rem', fontWeight: 'bold', color: '#111' }}>
        Python Battle: Level One
      </div>

      {/* Hearts + Battle Display */}
      <div style={{ backgroundColor: '#c9f2f8', width: '90%', maxWidth: '900px', margin: '40px auto', borderRadius: '12px', padding: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ backgroundColor: 'black', color: 'white', borderRadius: '50%', width: 70, height: 70, fontSize: '1rem', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 10px' }}>
            LVL<br />1
          </div>
          <div style={{ marginBottom: '10px' }}>You</div>
          <div style={{ fontSize: '1.2rem', marginBottom: '20px' }}>{renderHearts(playerHearts)}</div>
          <div style={{ fontSize: '80px' }}>🧑‍💻</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ backgroundColor: 'black', color: 'white', borderRadius: '50%', width: 70, height: 70, fontSize: '1rem', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 10px' }}>
            LVL<br />1
          </div>
          <div style={{ marginBottom: '10px' }}>Monster</div>
          <div style={{ fontSize: '1.2rem', marginBottom: '20px' }}>{renderHearts(monsterHearts)}</div>
          <div style={{ fontSize: '80px' }}>👾</div>
        </div>
      </div>

      {/* Question */}
      {question && playerHearts > 0 && monsterHearts > 0 && (
        <div style={{ backgroundColor: '#2c2c2c', padding: '40px', width: '90%', maxWidth: '800px', borderRadius: '10px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Question:</h2>
          <p style={{ fontStyle: 'italic', color: '#ccc', marginBottom: '20px' }}>{question.prompt}</p>

          <textarea
            placeholder="Type answer here..."
            rows={3}
            style={{ width: '100%', fontSize: '1rem', padding: '15px', borderRadius: '8px', border: '1px solid #666', backgroundColor: '#fff', color: '#111' }}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handleSubmit}
              disabled={playerHearts === 0 || monsterHearts === 0}
              style={{
                backgroundColor: '#4caf50',
                color: 'white',
                padding: '12px 25px',
                borderRadius: '25px',
                fontSize: '1rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Submit Answer
            </button>
          </div>

          {feedback && (
            <p style={{ marginTop: '20px', fontSize: '1.2rem', fontWeight: 'bold', color: feedback.startsWith('✅') || feedback.startsWith('🎉') ? '#4caf50' : '#ff5252' }}>
              {feedback}
            </p>
          )}
        </div>
      )}

      {/* Game Over / Win */}
      {playerHearts === 0 && (
        <h2 style={{ textAlign: 'center', marginTop: '40px', color: '#ff5252' }}>☠️ You have died. Refresh to try again.</h2>
      )}
      {monsterHearts === 0 && (
        <h2 style={{ textAlign: 'center', marginTop: '40px', color: '#4caf50' }}>🎉 Victory! You earned +25 bonus GameBucks!</h2>
      )}
    </div>
  );
};

export default GamePage;
