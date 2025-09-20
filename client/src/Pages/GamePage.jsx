import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGameBucks } from "../Components/GameBucksContext";
import { questionBank } from "../data/QuestionBank";
import level1 from "../assets/OfficialLevel1.png";
import level2 from "../assets/Level2.jpg";
import level3 from "../assets/Level3.jpg";
import level4 from "../assets/Level4.webp";
import level5 from "../assets/Level5.png";
import level6 from "../assets/Level6.gif";
import level7 from "../assets/Level7.jpg";
import level8 from "../assets/Level8.jpg";
import { useRef } from "react";

const MAX_HEARTS = 5;

const levels = [
  { label: "Level 1", bg: "#FCA5A5", image: level1 },
  { label: "Level 2", bg: "#FCD29A", image: level2 },
  { label: "Level 3", bg: "#FDE68A", image: level3 },
  { label: "Level 4", bg: "#BBF7D0", image: level4 },
  { label: "Level 5", bg: "#FCA5A5", image: level5 },
  { label: "Level 6", bg: "#FCD29A", image: level6 },
  { label: "Level 7", bg: "#FDE68A", image: level7 },
  { label: "Level 8", bg: "#BBF7D0", image: level8 },
];

const GamePage = () => {
  const { gameBucks, setGameBucks, extraHearts } = useGameBucks();
  const { levelId } = useParams();
  const navigate = useNavigate();
  const levelIndex = parseInt(levelId, 10) - 1;

  const level = levels[levelIndex] || levels[0];
  const levelQuestions = questionBank[levelIndex] || [];

  const [playerHearts, setPlayerHearts] = useState(MAX_HEARTS + extraHearts);
  const [monsterHearts, setMonsterHearts] = useState(MAX_HEARTS);
  const [feedback, setFeedback] = useState("");
  const [userInput, setUserInput] = useState("");
  const [usedIndices, setUsedIndices] = useState([]);
  const [question, setQuestion] = useState(null);

  // Update player hearts if extraHearts changes
  useEffect(() => {
    setPlayerHearts(MAX_HEARTS + extraHearts);
  }, [extraHearts]);

  const renderHearts = (count) => "❤️ ".repeat(count).trim();

  const getNextQuestion = (used) => {
    if (used.length >= levelQuestions.length) return null;
    let index;
    do {
      index = Math.floor(Math.random() * levelQuestions.length);
    } while (used.includes(index));
    return { question: levelQuestions[index], index };
  };

  const loadNextQuestion = () => {
    const next = getNextQuestion(usedIndices);
    if (next) {
      setQuestion(next.question);
      setUsedIndices((prev) => [...prev, next.index]);
    }
  };

  useEffect(() => {
    loadNextQuestion();
    setPlayerHearts(MAX_HEARTS + extraHearts);
    setMonsterHearts(MAX_HEARTS);
    setFeedback("");
    setUserInput("");
    setUsedIndices([]);
  }, [levelId]);

  const handleSubmit = () => {
    if (!question || playerHearts === 0 || monsterHearts === 0) return;

    const normalized = userInput.trim().toLowerCase();
    const correct = normalized === question.answer.toLowerCase();

    if (correct) {
      setFeedback("✅ Correct! +5 GameBucks. Monster lost a heart!");
      setGameBucks((prev) => prev + 5);
      const newMonsterHearts = Math.max(monsterHearts - 1, 0);
      setMonsterHearts(newMonsterHearts);
      if (newMonsterHearts === 0) {
        setGameBucks((prev) => prev + 25);
        setFeedback("🎉 You defeated the monster! +25 bonus GameBucks!");

        // Unlock next level
        const currentUnlocked = Number(localStorage.getItem("unlockedLevels") || "1");
        const nextLevel = levelIndex + 2;
        if (nextLevel > currentUnlocked) {
          localStorage.setItem("unlockedLevels", String(nextLevel));
        }
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

    setUserInput("");

    if (playerHearts > 1 && monsterHearts > 1) {
      setTimeout(() => {
        loadNextQuestion();
      }, 500);
    }
  };

  // Button handlers
  const handleNextLevel = () => {
    const nextLevel = levelIndex + 2;
    navigate(`/game/${nextLevel}`);
  };

  const handleBackToLevels = () => {
    navigate("/levels");
  };

  const canvasRef = useRef(null);
  const animRef = useRef({ frame: 0, last: 0, req: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sprite = new Image();
    // Image is served from public/Warrior_Idle.png (reachable at /Warrior_Idle.png)
    sprite.src = "/Warrior_Idle.png";

    sprite.onload = () => {
      const FRAME_W = 192;   // each frame width
      const FRAME_H = 192;   // each frame height
      const FRAME_COUNT = 8; // number of frames across
      const FRAME_MS = 100;  // milliseconds per frame (10 fps)

      const DEST_W = 32*12;     // draw size on canvas (width)
      const DEST_H = 32*12;     // draw size on canvas (height)
      const DX = 0;          // draw at origin (0,0)
      const DY = 0;

      ctx.imageSmoothingEnabled = false; // keep pixel art crisp

      const draw = () => {
        const frame = animRef.current.frame;
        const sx = frame * FRAME_W;
        const sy = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(sprite, sx, sy, FRAME_W, FRAME_H, DX, DY, DEST_W, DEST_H);
      };

      const loop = (ts) => {
        if (!animRef.current.last) animRef.current.last = ts;
        const elapsed = ts - animRef.current.last;
        if (elapsed >= FRAME_MS) {
          animRef.current.frame = (animRef.current.frame + 1) % FRAME_COUNT;
          animRef.current.last = ts;
          draw();
        }
        animRef.current.req = requestAnimationFrame(loop);
      };

      // Draw first frame immediately, then start loop
      draw();
      animRef.current.req = requestAnimationFrame(loop);
    };

    sprite.onerror = (e) => {
      console.error("Failed to load sprite", sprite.src, e);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = "16px sans-serif";
      ctx.fillText(`Image failed to load: ${sprite.src}`, 10, 30);
    };

    return () => {
      if (animRef.current.req) cancelAnimationFrame(animRef.current.req);
    };
  }, []);

  

  return (
    <div
      style={{
        backgroundColor: level.bg,
        backgroundImage: `url(${level.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        paddingBottom: "60px",
        color: "#000",
        textShadow: "2px 2px 6px white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          width: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          textAlign: "center",
          padding: "20px 0",
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "#111",
          userSelect: "none",
          boxShadow: "0 0 15px rgba(0,0,0,0.3)",
        }}
      >
        {level.label} - Python Battle
      </div>

      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          width: "90%",
          maxWidth: "900px",
          margin: "40px auto",
          borderRadius: "12px",
          padding: "40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 0 15px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              backgroundColor: level.bg,
              color: "black",
              borderRadius: "50%",
              width: 70,
              height: 70,
              fontSize: "1rem",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto 10px",
              boxShadow: "0 0 8px rgba(0,0,0,0.25)",
            }}
          >
            LVL
            <br />
            {levelId}
          </div>
          <div style={{ marginBottom: "10px", fontWeight: "bold" }}>You</div>
          <div style={{ fontSize: "1.2rem", marginBottom: "20px" }}>{renderHearts(playerHearts)}</div>
          <div style={{ fontSize: "80px" }}><canvas style={{ border: "0px solid black", imageRendering: "pixelated" }} id="game" ref={canvasRef} width="400" height="400"></canvas></div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              backgroundColor: level.bg,
              color: "black",
              borderRadius: "50%",
              width: 70,
              height: 70,
              fontSize: "1rem",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto 10px",
              boxShadow: "0 0 8px rgba(0,0,0,0.25)",
            }}
          >
            LVL
            <br />
            {levelId}
          </div>
          <div style={{ marginBottom: "10px", fontWeight: "bold" }}>Monster</div>
          <div style={{ fontSize: "1.2rem", marginBottom: "20px" }}>{renderHearts(monsterHearts)}</div>
          <div style={{ fontSize: "80px" }}>👾</div>
        </div>
      </div>

      {question && playerHearts > 0 && monsterHearts > 0 && (
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.7)",
            padding: "40px",
            width: "90%",
            maxWidth: "800px",
            borderRadius: "10px",
            margin: "0 auto",
            color: "white",
            boxShadow: "0 0 15px rgba(255,255,255,0.3)",
          }}
        >
          <h2 style={{ fontSize: "1.8rem", marginBottom: "20px" }}>Question:</h2>
          <p style={{ fontStyle: "italic", marginBottom: "20px" }}>{question.prompt}</p>

          <textarea
            placeholder="Type answer here..."
            rows={3}
            style={{
              width: "100%",
              fontSize: "1rem",
              padding: "15px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "white",
              color: "black",
            }}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={playerHearts === 0 || monsterHearts === 0}
          />

          <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
            <button
              onClick={handleSubmit}
              disabled={playerHearts === 0 || monsterHearts === 0}
              style={{
                backgroundColor: "#4caf50",
                color: "white",
                padding: "12px 25px",
                borderRadius: "25px",
                fontSize: "1rem",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Submit Answer
            </button>
          </div>

          {feedback && (
            <p
              style={{
                marginTop: "20px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: feedback.startsWith("✅") || feedback.startsWith("🎉") ? "#4caf50" : "#ff5252",
              }}
            >
              {feedback}
            </p>
          )}
        </div>
      )}

      {playerHearts === 0 && (
        <>
          <h2 style={{ textAlign: "center", marginTop: "40px", color: "#ff5252" }}>
            ☠️ You have died. Refresh to try again.
          </h2>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              onClick={handleBackToLevels}
              style={{
                backgroundColor: "#2196f3",
                color: "white",
                padding: "12px 30px",
                borderRadius: "25px",
                fontSize: "1.2rem",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Back to Levels
            </button>
          </div>
        </>
      )}

      {monsterHearts === 0 && (
        <>
          <h2 style={{ textAlign: "center", marginTop: "40px", color: "#4caf50" }}>
            🎉 Victory! You earned +25 bonus GameBucks!
          </h2>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              onClick={handleNextLevel}
              style={{
                backgroundColor: "#4caf50",
                color: "white",
                padding: "12px 30px",
                borderRadius: "25px",
                fontSize: "1.2rem",
                border: "none",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Next Level
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default GamePage;
