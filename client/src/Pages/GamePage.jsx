import React, { useState, useEffect, useRef } from "react";
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
// Existing enemy assets (Lancer and standard warrior)
import lancerIdle from "../assets/Lancer_Idle.png";
import lancerRun from "../assets/Lancer_Run.png";
import lancerAttack from "../assets/Lancer_Right_Attack.png";
import warriorIdle from "../assets/Warrior_Idle.png";
import warriorRun from "../assets/Warrior_Run.png";
import warriorAttack from "../assets/Warrior_Attack1.png";
// New enemy assets (Archer and Black Warrior)
import archerIdle from "../assets/Archer_Idle.png";
import archerRun from "../assets/Archer_Run.png";
import archerShoot from "../assets/Archer_Shoot.png";
import blackWarriorIdle from "../assets/Warrior_IdleBlack.png";
import blackWarriorRun from "../assets/Warrior_RunBlack.png";
import blackWarriorAttack from "../assets/Warrior_Attack1Black.png";

// Sprite/animation constants for each enemy type
const LANCER_SPRITE = {
  idleFrames: 12,   // Lancer_Idle.png columns
  runFrames: 6,    // Lancer_Run.png columns
  attackFrames: 3, // Lancer_Right_Attack.png columns
  fps: 10,
};

const ARCHER_SPRITE = {
  idleFrames: 12,   // Archer_Idle.png columns
  runFrames: 6,    // Archer_Run.png columns
  attackFrames: 3, // Archer_Shoot.png columns
  fps: 10,
};

const BLACK_WARRIOR_SPRITE = {
  idleFrames: 12,   // Warrior_IdleBlack.png columns
  runFrames: 6,    // Warrior_RunBlack.png columns
  attackFrames: 3, // Warrior_Attack1Black.png columns
  fps: 10,
};

const MAX_HEARTS = 5;

// Determine which enemy type is used on each level via an if-statement instead of a static array.

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
  // Determine current enemy type based on level.
  // Use an if-statement: Levels 1–3 → Lancer, Levels 4–6 → Archer, Levels 7–8 → Black Warrior.
  let enemyType = "lancer";
  if (levelIndex >= 3 && levelIndex <= 5) {
    enemyType = "archer";
  } else if (levelIndex >= 6) {
    enemyType = "blackWarrior";
  }

  const [playerHearts, setPlayerHearts] = useState(MAX_HEARTS + extraHearts);
  const [monsterHearts, setMonsterHearts] = useState(MAX_HEARTS);
  const [feedback, setFeedback] = useState("");
  const [userInput, setUserInput] = useState("");
  const [usedIndices, setUsedIndices] = useState([]);
  const [question, setQuestion] = useState(null);

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

  // ======= animation plumbing =======
  const canvasRef = useRef(null);
  const monsterCanvasRef = useRef(null);

  // left player animation state
  const animRef = useRef({
    frame: 0,
    last: 0,
    req: 0,
    state: "idle", // idle | run | attack
    x: 0,          // slide along X during sequence
    isAnimating: false,
  });
  const playerSpriteRef = useRef({ idle: null, run: null, attack: null });

  // draw LEFT (player) – supports idle / run / attack
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // load strips
    const idleImg = new Image(); idleImg.src = warriorIdle;
    const runImg = new Image(); runImg.src = warriorRun;
    const atkImg  = new Image(); atkImg.src  = warriorAttack;

    playerSpriteRef.current = { idle: idleImg, run: runImg, attack: atkImg };

    const FRAME_MS = 100; // 10 fps
    ctx.imageSmoothingEnabled = false;

    const sheet = () => {
      const s = animRef.current.state;
      let img = idleImg, frames = 8;
      if (s === "run")    { img = runImg; frames = 6; }
      if (s === "attack") { img = atkImg; frames = 4; }
      const fw = img.width / frames;
      const fh = img.height;
      return { img, frames, fw, fh };
    };

    const draw = () => {
      const { img, frames, fw, fh } = sheet();
      const f = animRef.current.frame % frames;
      const sx = f * fw;
      const DEST_W = 32 * 12;
      const DEST_H = 32 * 12;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, sx, 0, fw, fh, animRef.current.x, 0, DEST_W, DEST_H);
    };

    const loop = (ts) => {
      if (!animRef.current.last) animRef.current.last = ts;
      const elapsed = ts - animRef.current.last;
      if (elapsed >= FRAME_MS) {
        animRef.current.frame += 1;
        animRef.current.last += FRAME_MS;
      }
      draw();
      animRef.current.req = requestAnimationFrame(loop);
    };

    draw();
    animRef.current.req = requestAnimationFrame(loop);
    return () => animRef.current.req && cancelAnimationFrame(animRef.current.req);
  }, []);

  // RIGHT (monster) – supports Lancer, Archer, Black Warrior
  const monsterAnimRef = useRef({
    frame: 0,
    last: 0,
    state: "idle",
    x: 0,
    isAnimating: false,
  });
  const monsterSpriteRef = useRef({ idle: null, run: null, attack: null });

  useEffect(() => {
    const canvas = monsterCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Choose enemy sprites based on enemyType
    let idleImg = new Image();
    let runImg  = new Image();
    let atkImg  = new Image();
    let SPRITE;
    if (enemyType === "archer") {
      idleImg.src = archerIdle;
      runImg.src  = archerRun;
      atkImg.src  = archerShoot;
      SPRITE      = ARCHER_SPRITE;
    } else if (enemyType === "blackWarrior") {
      idleImg.src = blackWarriorIdle;
      runImg.src  = blackWarriorRun;
      atkImg.src  = blackWarriorAttack;
      SPRITE      = BLACK_WARRIOR_SPRITE;
    } else {
      idleImg.src = lancerIdle;
      runImg.src  = lancerRun;
      atkImg.src  = lancerAttack;
      SPRITE      = LANCER_SPRITE;
    }

    monsterSpriteRef.current = { idle: idleImg, run: runImg, attack: atkImg };

    const FRAME_MS = 1000 / SPRITE.fps;
    const DEST_W = 32 * 12;
    const DEST_H = 32 * 12;
    ctx.imageSmoothingEnabled = false;

    const sheet = () => {
      const s = monsterAnimRef.current.state;
      let img = idleImg;
      let frames = SPRITE.idleFrames;
      if (s === "run")    { img = runImg;  frames = SPRITE.runFrames; }
      if (s === "attack") { img = atkImg;  frames = SPRITE.attackFrames; }
      const fw = img.width / frames;
      const fh = img.height;
      return { img, frames, fw, fh };
    };

    const draw = () => {
      const { img, frames, fw, fh } = sheet();
      const f = monsterAnimRef.current.frame % frames;
      const sx = f * fw;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw the enemy flipped horizontally (so he faces left)
      ctx.save();
      ctx.translate(monsterAnimRef.current.x + DEST_W, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(img, sx, 0, fw, fh, 0, 0, DEST_W, DEST_H);
      ctx.restore();
    };

    let animationId;
    const loop = (ts) => {
      if (!monsterAnimRef.current.last) monsterAnimRef.current.last = ts;
      const elapsed = ts - monsterAnimRef.current.last;
      if (elapsed >= FRAME_MS) {
        const steps = Math.floor(elapsed / FRAME_MS);
        monsterAnimRef.current.frame += steps;
        monsterAnimRef.current.last += steps * FRAME_MS;
      }
      draw();
      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [enemyType]);

  // Lancer: run left → attack → slide back right → idle
  const playMonsterAttackSequence = () => {
    if (monsterAnimRef.current.isAnimating) return;
    monsterAnimRef.current.isAnimating = true;

    // Step 1: run left
    monsterAnimRef.current.state = "run";
    monsterAnimRef.current.frame = 0;

    const startX = 0;
    const endX = -160;
    const runDur = 600; // ms

    let start = 0;
    const runStep = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / runDur);
      monsterAnimRef.current.x = startX + (endX - startX) * p;

      if (p < 1) {
        requestAnimationFrame(runStep);
      } else {
        // Step 2: attack for ~500ms
        monsterAnimRef.current.state = "attack";
        monsterAnimRef.current.frame = 0;
        const atkStart = performance.now();
        const atkDur = 500;

        const atkStep = () => {
          const q = (performance.now() - atkStart) / atkDur;
          if (q < 1) {
            requestAnimationFrame(atkStep);
          } else {
            // Step 3: slide back and idle
            monsterAnimRef.current.state = "idle";
            monsterAnimRef.current.frame = 0;
            const backStart = performance.now();
            const backDur = 400;

            const backStep = () => {
              const r = Math.min(1, (performance.now() - backStart) / backDur);
              monsterAnimRef.current.x = endX + (startX - endX) * r;
              if (r < 1) requestAnimationFrame(backStep);
              else {
                monsterAnimRef.current.x = startX;
                monsterAnimRef.current.isAnimating = false;
              }
            };
            requestAnimationFrame(backStep);
          }
        };
        requestAnimationFrame(atkStep);
      }
    };
    requestAnimationFrame(runStep);
  };

  // run → attack → return animation for LEFT character
  const playAttackSequence = () => {
    if (animRef.current.isAnimating) return;
    animRef.current.isAnimating = true;

    // Step 1: run right
    animRef.current.state = "run";
    animRef.current.frame = 0;
    const startX = 0;
    const endX = 160;
    const runDur = 600; // ms

    let start = 0;
    const runStep = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / runDur);
      animRef.current.x = startX + (endX - startX) * p;
      if (p < 1) {
        requestAnimationFrame(runStep);
      } else {
        // Step 2: attack for ~500ms
        animRef.current.state = "attack";
        animRef.current.frame = 0;
        const atkStart = performance.now();
        const atkDur = 500;
        const atkStep = () => {
          const q = (performance.now() - atkStart) / atkDur;
          if (q < 1) {
            requestAnimationFrame(atkStep);
          } else {
            // Step 3: slide back and idle
            animRef.current.state = "idle";
            animRef.current.frame = 0;
            const backStart = performance.now();
            const backDur = 400;
            const backStep = () => {
              const r = Math.min(1, (performance.now() - backStart) / backDur);
              animRef.current.x = endX + (startX - endX) * r;
              if (r < 1) requestAnimationFrame(backStep);
              else {
                animRef.current.x = startX;
                animRef.current.isAnimating = false;
              }
            };
            requestAnimationFrame(backStep);
          }
        };
        requestAnimationFrame(atkStep);
      }
    };
    requestAnimationFrame(runStep);
  };

  // ======= game logic =======
  const handleSubmit = () => {
    if (!question || playerHearts === 0 || monsterHearts === 0) return;

    const normalized = userInput.trim().toLowerCase();
    const correct = normalized === question.answer.toLowerCase();

    if (correct) {
      setFeedback("✅ Correct! +5 GameBucks. Monster lost a heart!");
      setGameBucks((prev) => prev + 5);

      // play run → attack sequence
      playAttackSequence();

      // remove one heart from monster
      const newMonsterHearts = Math.max(monsterHearts - 1, 0);
      setMonsterHearts(newMonsterHearts);

      if (newMonsterHearts === 0) {
        setGameBucks((prev) => prev + 25);
        setFeedback("🎉 You defeated the monster! +25 bonus GameBucks!");
        const currentUnlocked = Number(localStorage.getItem("unlockedLevels") || "1");
        const nextLevel = levelIndex + 2;
        if (nextLevel > currentUnlocked) {
          localStorage.setItem("unlockedLevels", String(nextLevel));
        }
      }
    } else {
      const newPlayerHearts = Math.max(playerHearts - 1, 0);
      setPlayerHearts(newPlayerHearts);

      // play the enemy's run → attack → return sequence
      playMonsterAttackSequence();

      if (newPlayerHearts === 0) {
        setFeedback(`☠️ You died. Correct answer: ${question.answer}`);
      } else {
        setFeedback(`❌ Incorrect! You lost a heart. Correct answer: ${question.answer}`);
      }
    }

    setUserInput("");

    if (playerHearts > 1 && monsterHearts > 1) {
      setTimeout(() => loadNextQuestion(), 500);
    }
  };

  const handleNextLevel = () => navigate(`/game/${levelIndex + 2}`);
  const handleBackToLevels = () => navigate("/levels");

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
          <div style={{ fontSize: "80px" }}>
            <canvas
              style={{ imageRendering: "pixelated" }}
              ref={canvasRef}
              width="500"
              height="500"
            />
          </div>
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
          <div style={{ fontSize: "80px" }}>
            <canvas
              style={{ imageRendering: "pixelated" }}
              ref={monsterCanvasRef}
              width="500"
              height="500"
            />
          </div>
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

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
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
                color:
                  feedback.startsWith("✅") || feedback.startsWith("🎉")
                    ? "#4caf50"
                    : "#ff5252",
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
