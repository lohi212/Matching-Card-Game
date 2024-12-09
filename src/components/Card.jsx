import React, { useState, useEffect } from "react";

const Card = ({
  cardData,
  lockBoard,
  setLockBoard,
  selectedCards,
  setSelectedCards,
  updateCardMatch,
  resetSelectedCards,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    if (lockBoard || isFlipped || cardData.isMatch) return;

    setIsFlipped(true);
    if (selectedCards.length === 0) {
      setSelectedCards([cardData]);
    } else if (selectedCards.length === 1) {
      setLockBoard(true);
      setSelectedCards((prev) => [...prev, cardData]);

      const [firstCard] = selectedCards;
      if (
        firstCard.id === cardData.id &&
        firstCard.cardID !== cardData.cardID
      ) {
        updateCardMatch(cardData.id);
        resetSelectedCards();
      } else {
        resetSelectedCards();
        setTimeout(() => setIsFlipped(false), 1500);
      }
    }
  };

  useEffect(() => {
    if (!selectedCards.length && !cardData.isMatch) {
      setIsFlipped(false);
    }
  }, [selectedCards, cardData.isMatch]);

  return (
    <div className="card card-center" onClick={handleClick}>
      {isFlipped || cardData.isMatch ? (
        <img alt={cardData.alt} src={cardData.img} className="card-img" />
      ) : (
        <img alt="Hidden" src="/images/mushroom.jpg" className="fallback-img" />
      )}
    </div>
  );
};

export default Card;
