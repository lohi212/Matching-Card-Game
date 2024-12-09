import { ALL_CARDS } from "./utils/utils";
import Card from "./components/Card";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [allCards, setAllCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [lockBoard, setLockBoard] = useState(false);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
  };

  const updateCardMatch = (matchedCardID) => {
    const updatedCards = allCards.map((card) =>
      card.id === matchedCardID ? { ...card, isMatch: true } : card
    );
    setAllCards(updatedCards);
  };

  const resetSelectedCards = () => {
    setTimeout(() => {
      setSelectedCards([]);
      setLockBoard(false);
    }, 1500);
  };

  useEffect(() => {
    const duplicatedCards = [...ALL_CARDS, ...ALL_CARDS].map((card, index) => ({
      ...card,
      isMatch: false,
      cardID: `${card.id}-${index}`,
    }));
    setAllCards(shuffleArray(duplicatedCards));
  }, []);

  const nonMatchedCards = allCards.filter((ele) => !ele.isMatch);
  return (
    <div className="wrapper">
      <p className="win-text"> {!nonMatchedCards.length ? "You Won!" : ""}</p>
      <div className="center">
        <div className="game">
          {allCards.map((card, index) => (
            <Card
              key={card.cardID}
              cardData={card}
              lockBoard={lockBoard}
              setLockBoard={setLockBoard}
              selectedCards={selectedCards}
              setSelectedCards={setSelectedCards}
              updateCardMatch={updateCardMatch}
              resetSelectedCards={resetSelectedCards}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
