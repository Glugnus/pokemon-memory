import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StartBtn from "./components/StartBtn";
import { pokemonsArr } from "./data";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import Completed from "./components/Completed";

export default function App() {
  const [shouldDistribute, setShouldDistribute] = useState(false);
  const [openCards, setOpenCards] = useState([]);
  const [clearedCards, setCleardsCards] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [shouldRestart, setShouldRestart] = useState(false);
  const [cards, setCards] = useState(
    pokemonsArr.sort(() => 0.5 - Math.random()),
  );

  const handleCardPress = (card) => {
    setOpenCards((prev) => [...prev, card]);
  };

  const evaluate = () => {
    if (openCards[0].type === openCards[1].type) {
      setCleardsCards((prev) => [...prev, openCards[0].type]);
      setOpenCards([]);
    } else {
      setOpenCards([]);
    }
  };

  useEffect(() => {
    if (openCards.length === 2) {
      setTimeout(evaluate, 500);
    }
  }, [openCards]);

  const startGame = () => {
    setShouldDistribute(true);
  };

  useEffect(() => {
    if (clearedCards.length === 6) {
      setTimeout(() => {
        setIsCompleted(true);
      }, 500);
    }
  }, [clearedCards]);

  const handleRestart = () => {
    (((setCleardsCards([]), setOpenCards([]), setIsCompleted(false)),
    setShouldRestart(true)),
      setCards(pokemonsArr.sort(() => 0.5 - Math.random())));
  };

  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <Card
          key={card.id}
          index={index}
          shouldDistribute={shouldDistribute}
          card={card}
          onPressCard={handleCardPress}
          isFlipped={!!openCards.find((el) => el.id === card.id)}
          isCleared={clearedCards.includes(card.type)}
          shouldRestart={shouldRestart}
          setShouldRestart={setShouldRestart}
        />
      ))}
      <StartBtn startGame={startGame} />
      <Completed isCompleted={isCompleted} handleRestart={handleRestart} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
