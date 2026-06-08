import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Image,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Completed({ isCompleted, handleRestart }) {
  const animatedScale = useRef(new Animated.Value(0)).current;
  const animatedBtnScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isCompleted) {
      Animated.sequence([
        Animated.timing(animatedScale, {
          duration: 500,
          toValue: 1,
          useNativeDriver: true,
          easing: Easing.elastic(5),
        }),
        Animated.timing(animatedBtnScale, {
          duration: 500,
          toValue: 1,
          useNativeDriver: true,
          easing: Easing.bounce,
        }),
      ]).start();
    }
  }, [isCompleted]);

  const onPress = () => {
    Animated.sequence([
      Animated.timing(animatedBtnScale, {
        duration: 500,
        toValue: 0,
        useNativeDriver: true,
        easing: Easing.back(),
      }),
      Animated.timing(animatedScale, {
        duration: 500,
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start(handleRestart);
  };

  return isCompleted ? (
    <Animated.View
      style={[styles.container, { transform: [{ scale: animatedScale }] }]}
    >
      <Image style={styles.image} source={require("../assets/trophy.png")} />
      <AnimatedPressable
        onPress={onPress}
        style={[
          styles.restartBtn,
          { transform: [{ scale: animatedBtnScale }] },
        ]}
      >
        <Text style={styles.text}>Rejouer</Text>
      </AnimatedPressable>
    </Animated.View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
  },
  restartBtn: {
    width: 260,
    height: 160,
    padding: 16,
    backgroundColor: "#5d3fd3",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },
});
