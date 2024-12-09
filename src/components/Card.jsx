import React, { useState } from "react";

const Card = ({
  data,
  indx,
  setSelectedCards,
  selectedCards,
  updateCardMatch,
}) => {
  const [showImg, setShowImg] = useState(false);

  const toggleCard = () => {
    setShowImg(true);

    if (selectedCards.length) {
      if (selectedCards.includes(data.id)) updateCardMatch(data);
      else {
        setTimeout(() => {
          setShowImg(false);
        }, 1500);
      }
      setSelectedCards([]);
    } else setSelectedCards([data.id]);
  };

  return (
    <div className="card card-center" onClick={toggleCard}>
      {data?.isMatch || showImg ? (
        <img alt={data.alt} src={data.img} className="card-img" />
      ) : (
        <img
          alt="mushroom"
          src="/images/mushroom.jpg"
          className="fallback-img"
        />
      )}
    </div>
  );
};

export default Card;
