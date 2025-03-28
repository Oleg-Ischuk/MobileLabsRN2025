"use client";

import { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import {
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  PinchGestureHandler,
  State,
} from "react-native-gesture-handler";
import { useGame } from "./GameContext";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const SAFE_AREA_WIDTH = SCREEN_WIDTH * 1;
const SAFE_AREA_HEIGHT = 300;
const MAX_TRANSLATE_X = SAFE_AREA_WIDTH / 2 - 90;
const MAX_TRANSLATE_Y = SAFE_AREA_HEIGHT / 2 - 90;

const PointsIndicator = ({ points, position, onComplete, isCritical }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(translateY, {
        toValue: -80,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1.2,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onComplete) onComplete();
    });
  }, []);

  const getPointsColor = (pts, critical) => {
    if (critical) return "#FF5722";
    if (pts >= 5) return "#FF9800";
    if (pts >= 3) return "#4CAF50";
    if (pts >= 2) return "#2196F3";
    return "#9E9E9E";
  };

  return (
    <Animated.View
      style={[
        styles.pointsIndicator,
        {
          opacity,
          transform: [
            { translateY },
            { translateX: position.x || 0 },
            { scale },
          ],
          top: position.y || 0,
        },
      ]}
    >
      <Text
        style={[
          styles.pointsText,
          {
            color: getPointsColor(points, isCritical),
            fontSize: isCritical ? 36 : 30,
          },
        ]}
      >
        +{points.toFixed(1)}
        {isCritical ? "!" : ""}
      </Text>
    </Animated.View>
  );
};

const ClickerObject = () => {
  const {
    addPoints,
    incrementTaskProgress,
    updateTaskProgress,
    tapUpgrades,
    comboCount,
  } = useGame();

  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const [currentScale, setCurrentScale] = useState(1);
  const pinchTaskCompletedRef = useRef(false);

  const doubleTapRef = useRef(null);
  const [tapped, setTapped] = useState(false);
  const [pointsIndicators, setPointsIndicators] = useState([]);
  const [isProcessingTap, setIsProcessingTap] = useState(false);

  const addPointsIndicator = (points, x = 0, y = 0, isCritical = false) => {
    const id = Date.now() + Math.random();
    setPointsIndicators((prev) => [
      ...prev,
      { id, points, position: { x, y }, isCritical },
    ]);
  };

  const removePointsIndicator = (id) => {
    setPointsIndicators((prev) =>
      prev.filter((indicator) => indicator.id !== id)
    );
  };

  const onSingleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE && !isProcessingTap) {
      setIsProcessingTap(true);

      const result = addPoints(tapUpgrades.singleTap);
      incrementTaskProgress(1);

      const randomX = Math.random() * 40 - 20;
      addPointsIndicator(result.points, randomX, -20, result.isCritical);

      setTapped(true);
      setTimeout(() => setTapped(false), 150);

      Animated.sequence([
        Animated.timing(scale, {
          toValue: currentScale * 0.8,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: currentScale,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setTimeout(() => {
          setIsProcessingTap(false);
        }, 50);
      });
    }
  };

  const onDoubleTap = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      const result = addPoints(tapUpgrades.doubleTap);
      incrementTaskProgress(2);

      const randomX = Math.random() * 40 - 20;
      addPointsIndicator(result.points, randomX, -20, result.isCritical);

      setTapped(true);
      setTimeout(() => setTapped(false), 150);

      Animated.sequence([
        Animated.timing(scale, {
          toValue: currentScale * 0.7,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: currentScale * 1.2,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: currentScale,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const onLongPress = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      const result = addPoints(tapUpgrades.longPress);
      updateTaskProgress(3, 1, true);

      const randomX = Math.random() * 40 - 20;
      addPointsIndicator(result.points, randomX, -20, result.isCritical);

      Animated.sequence([
        Animated.timing(scale, {
          toValue: currentScale * 1.5,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: currentScale,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const onPan = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      const newX = Math.min(
        Math.max(event.nativeEvent.translationX, -MAX_TRANSLATE_X),
        MAX_TRANSLATE_X
      );
      const newY = Math.min(
        Math.max(event.nativeEvent.translationY, -MAX_TRANSLATE_Y),
        MAX_TRANSLATE_Y
      );

      translateX.setValue(newX);
      translateY.setValue(newY);

      updateTaskProgress(4, 1, true);
    }

    if (event.nativeEvent.state === State.END) {
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();

      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleSwipe = (event) => {
    if (event.nativeEvent.state === State.END) {
      const velocityX = event.nativeEvent.velocityX;

      if (Math.abs(velocityX) > 200) {
        const swipePoints =
          tapUpgrades.swipeUpgradeLevel > 0
            ? tapUpgrades.swipeUpgradeValue
            : Math.floor(Math.random() * 5) + 1;
        const result = addPoints(swipePoints);

        const randomX = velocityX > 0 ? 50 : -50;
        addPointsIndicator(result.points, randomX, -20, result.isCritical);

        if (velocityX > 0) {
          updateTaskProgress(5, 1, true);

          Animated.sequence([
            Animated.timing(translateX, {
              toValue: Math.min(80, MAX_TRANSLATE_X),
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(translateX, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start();
        } else {
          updateTaskProgress(6, 1, true);

          Animated.sequence([
            Animated.timing(translateX, {
              toValue: Math.max(-80, -MAX_TRANSLATE_X),
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(translateX, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start();
        }
      }
    }
  };

  const [baseScale, setBaseScale] = useState(1);

  const onPinchGestureEvent = (event) => {
    if (event.nativeEvent.numberOfPointers >= 2) {
      const pinchScale = event.nativeEvent.scale;
      const newScale = baseScale * pinchScale;
      const limitedScale = Math.min(Math.max(newScale, 0.5), 1.5);
      scale.setValue(limitedScale);

      if (Math.abs(pinchScale - 1) > 0.3 && !pinchTaskCompletedRef.current) {
        pinchTaskCompletedRef.current = true;
        updateTaskProgress(7, 1, true);

        const pinchPoints =
          tapUpgrades.pinchUpgradeLevel > 0 ? tapUpgrades.pinchUpgradeValue : 3;
        const result = addPoints(pinchPoints);

        addPointsIndicator(result.points, 0, -40, result.isCritical);
      }
    }
  };

  const onPinchHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      setCurrentScale(scale._value);
      setBaseScale(scale._value);
    } else if (event.nativeEvent.state === State.BEGAN) {
      setBaseScale(currentScale);
    }
  };

  const handleImagePress = () => {
    if (isProcessingTap) return;

    setIsProcessingTap(true);

    const result = addPoints(tapUpgrades.singleTap);
    incrementTaskProgress(1);

    const randomX = Math.random() * 40 - 20;
    addPointsIndicator(result.points, randomX, -20, result.isCritical);

    setTapped(true);
    setTimeout(() => setTapped(false), 150);

    Animated.sequence([
      Animated.timing(scale, {
        toValue: currentScale * 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: currentScale,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        setIsProcessingTap(false);
      }, 50);
    });
  };

  return (
    <View style={styles.safeAreaContainer}>
      <View style={styles.container}>
        {pointsIndicators.map((indicator) => (
          <PointsIndicator
            key={indicator.id}
            points={indicator.points}
            position={indicator.position}
            isCritical={indicator.isCritical}
            onComplete={() => removePointsIndicator(indicator.id)}
          />
        ))}

        {comboCount > 1 && (
          <View style={styles.comboContainer}>
            <Text style={styles.comboText}>Комбо: x{comboCount}</Text>
          </View>
        )}

        <PinchGestureHandler
          onGestureEvent={onPinchGestureEvent}
          onHandlerStateChange={onPinchHandlerStateChange}
        >
          <Animated.View>
            <PanGestureHandler
              onGestureEvent={onPan}
              onHandlerStateChange={(event) => {
                onPan(event);
                handleSwipe(event);
              }}
            >
              <Animated.View>
                <LongPressGestureHandler
                  onHandlerStateChange={onLongPress}
                  minDurationMs={3000}
                >
                  <Animated.View>
                    <TapGestureHandler
                      onHandlerStateChange={onSingleTap}
                      waitFor={doubleTapRef}
                    >
                      <Animated.View>
                        <TapGestureHandler
                          ref={doubleTapRef}
                          onHandlerStateChange={onDoubleTap}
                          numberOfTaps={2}
                        >
                          <Animated.View
                            style={[
                              styles.clickerContainer,
                              {
                                transform: [
                                  { translateX },
                                  { translateY },
                                  { scale },
                                  {
                                    rotate: rotate.interpolate({
                                      inputRange: [0, 360],
                                      outputRange: ["0deg", "360deg"],
                                    }),
                                  },
                                ],
                              },
                            ]}
                          >
                            <TouchableWithoutFeedback
                              onPress={handleImagePress}
                            >
                              <View
                                style={[
                                  styles.imageContainer,
                                  tapped && styles.imageContainerPressed,
                                ]}
                              >
                                <View style={styles.imageWrapper}>
                                  <Image
                                    source={require("../assets/hamster.png")}
                                    style={styles.image}
                                    resizeMode="contain"
                                  />
                                </View>
                                <View style={styles.shadow}></View>
                              </View>
                            </TouchableWithoutFeedback>
                            <Text style={styles.tapText}>Натисни мене!</Text>
                          </Animated.View>
                        </TapGestureHandler>
                      </Animated.View>
                    </TapGestureHandler>
                  </Animated.View>
                </LongPressGestureHandler>
              </Animated.View>
            </PanGestureHandler>
          </Animated.View>
        </PinchGestureHandler>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    width: "100%",
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 0,
    marginVertical: 10,
  },
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: SAFE_AREA_WIDTH,
    height: SAFE_AREA_HEIGHT,
  },
  clickerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#1976D2",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderWidth: 4,
    borderColor: "#0D47A1",
    overflow: "hidden",
  },
  imageContainerPressed: {
    backgroundColor: "#BBDEFB",
    borderColor: "#2196F3",
  },
  imageWrapper: {
    width: 110,
    height: 110,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  shadow: {
    position: "absolute",
    bottom: -10,
    width: 90,
    height: 18,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 50,
    zIndex: -1,
  },
  tapText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "bold",
    color: "#1976D2",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  pointsIndicator: {
    position: "absolute",
    zIndex: 10,
  },
  pointsText: {
    fontSize: 30,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  comboContainer: {
    position: "absolute",
    top: -30,
    backgroundColor: "rgba(233, 30, 99, 0.8)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    zIndex: 5,
  },
  comboText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ClickerObject;
