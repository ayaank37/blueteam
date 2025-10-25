import React, { useState } from "react";
import { useGameBucks } from "../Components/GameBucksContext";

const rewards = {
  Skins: [
    { name: "Red Skin", price: 5, color: "#ff9999" },
    { name: "Blue Skin", price: 6, color: "#3399ff" },
    { name: "Green Skin", price: 7, color: "#4caf50" },
    { name: "Gold Skin", price: 10, color: "#ffd700" },
  ],
  Wands: [
    { name: "Basic Wand", price: 3, color: "#99ccff" },
    { name: "Fire Wand", price: 6, color: "#ff5722" },
    { name: "Ice Wand", price: 6, color: "#00bcd4" },
    { name: "Shadow Wand", price: 9, color: "#6a1b9a" },
  ],
  Badges: [
    { name: "Bronze Badge", price: 4, color: "#cd7f32" },
    { name: "Silver Badge", price: 6, color: "#c0c0c0" },
    { name: "Gold Badge", price: 8, color: "#ffd700" },
  ],
  "Power Ups": [
    { name: "Speed Boost", price: 8, color: "#2e7d32" },
    { name: "Extra Life", price: 12, color: "#e91e63" },
  ],
};

const RewardsPage = () => {
  const { gameBucks, setGameBucks } = useGameBucks();
  const [lastPurchase, setLastPurchase] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleBuy = (reward) => {
    if (gameBucks >= reward.price) {
      setGameBucks((prev) => prev - reward.price);
      setLastPurchase(reward);
      setErrorMessage("");
    } else {
      setLastPurchase(null);
      setErrorMessage(`Not enough GameBucks to buy ${reward.name}.`);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#1a1a1a",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
        boxSizing: "border-box",
        gap: "40px",
        position: "relative",
        overflowY: "auto",
      }}
    >
      {/* GameBucks Display */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 30,
          fontSize: "1.2rem",
          backgroundColor: "#333",
          padding: "10px 20px",
          borderRadius: "12px",
          color: "#4caf50",
          fontWeight: "bold",
        }}
      >
        GameBucks: {gameBucks}
      </div>

      {/* Header */}
      <div
        style={{
          backgroundColor: "#ccc",
          width: "90%",
          textAlign: "center",
          padding: "25px 15px",
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "#111",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        Reward Page
      </div>

      {/* Rewards by Category */}
      <div style={{ width: "100%", maxWidth: "1200px" }}>
        {Object.entries(rewards).map(([category, items]) => (
          <div
            key={category}
            style={{
              marginBottom: "60px",
              textAlign: "center",
            }}
          >
            {/* Category Label */}
            <h2
              style={{
                fontSize: "2rem",
                marginBottom: "25px",
                color: "#f5f5f5",
                borderBottom: "2px solid #555",
                display: "inline-block",
                paddingBottom: "10px",
              }}
            >
              {category}
            </h2>

            {/* Items Grid (multi-column instead of 1 row scroll) */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "40px",
                marginTop: "30px",
                justifyItems: "center",
              }}
            >
              {items.map((reward, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <div
                    style={{
                      width: 150,
                      height: 150,
                      backgroundColor: reward.color,
                      borderRadius: "25px",
                    }}
                  />

                  <p
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: "600",
                      color: "#ddd",
                    }}
                  >
                    {reward.name} ${reward.price}
                  </p>

                  <button
                    onClick={() => handleBuy(reward)}
                    style={{
                      padding: "12px 30px",
                      borderRadius: "25px",
                      border: "none",
                      fontWeight: "bold",
                      backgroundColor: reward.color,
                      color: reward.color === "#ffeb3b" ? "#111" : "white",
                      fontSize: "1rem",
                      cursor: "pointer",
                    }}
                  >
                    Buy
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Purchase Message */}
      {lastPurchase && (
        <p
          style={{
            marginTop: "30px",
            fontSize: "1.2rem",
            color: lastPurchase.color,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          You bought <strong>{lastPurchase.name}</strong> for ${lastPurchase.price}
        </p>
      )}

      {/* Error Message */}
      {errorMessage && (
        <p
          style={{
            marginTop: "20px",
            fontSize: "1.2rem",
            color: "#ff5252",
            textAlign: "center",
          }}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default RewardsPage;
