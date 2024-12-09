import { ALL_CARDS } from "./utils/utils";
import Card from "./components/Card";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [allCards, setAllCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
  };

  const updateCardMatch = (data) => {
    console.log("==");

    const newAllCards = allCards.map((ele) => {
      if (data.id === ele.id)
        return {
          ...ele,
          isMatch: true,
        };

      return ele;
    });

    setAllCards(newAllCards);
  };

  useEffect(() => {
    const totalImages = [...ALL_CARDS, ...ALL_CARDS].map((ele) => {
      return { ...ele, isMatch: false };
    });
    const shuffledImages = shuffleArray(totalImages);
    setAllCards(shuffledImages);
  }, []);

  return (
    <div className="center">
      <div className="game">
        {allCards.map((ele, i) => (
          <Card
            data={ele}
            indx={i}
            selectedCards={selectedCards}
            setSelectedCards={setSelectedCards}
            updateCardMatch={updateCardMatch}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
