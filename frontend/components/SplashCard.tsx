import { FunctionComponent, useEffect, useState } from "react";

const SplashCard: FunctionComponent = () => {
  const splashWords = ["Pay", "Explore", "Manage"];
  const [currentSaying, setCurrentSaying] = useState(splashWords[0]);
  const [lastSaying, setLastSaying] = useState("");

  useEffect(() => {
    let timer = setInterval(() => {
      setLastSaying(currentSaying);
      setCurrentSaying(
        splashWords[
          splashWords.indexOf(currentSaying) + 1 < splashWords.length
            ? splashWords.indexOf(currentSaying) + 1
            : 0
        ]
      );
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div className="splashCard">
      <div className="splashWordsContainer">
        {splashWords.map((word, index) => {
          return (
            <span
              key={index}
              className={`saying ${
                currentSaying === word
                  ? "currentSaying"
                  : lastSaying === word
                  ? "lastSaying"
                  : ""
              }`}
            >
              {word}
            </span>
          );
        })}
      </div>
      <h1>Bills Online</h1>
    </div>
  );
};

export default SplashCard;
