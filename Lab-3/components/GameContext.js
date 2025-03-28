"use client";

import { createContext, useState, useContext, useEffect, useRef } from "react";

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [tapUpgrades, setTapUpgrades] = useState({
    singleTap: 1,
    doubleTap: 2,
    longPress: 5,
    singleTapLevel: 1,
    doubleTapLevel: 1,
    longPressLevel: 1,

    criticalClickChance: 5,
    criticalClickMultiplier: 2,
    criticalClickLevel: 0,

    comboClickBonus: 1,
    comboClickLevel: 0,

    swipeUpgradeValue: 3,
    swipeUpgradeLevel: 0,

    pinchUpgradeValue: 3,
    pinchUpgradeLevel: 0,
  });

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Натисніть 10 разів",
      description: "Натисніть на об'єкт клікера 10 разів",
      required: 10,
      progress: 0,
      completed: false,
    },
    {
      id: 2,
      title: "Подвійний клік 5 разів",
      description: "Зробіть подвійний клік на об'єкті 5 разів",
      required: 5,
      progress: 0,
      completed: false,
    },
    {
      id: 3,
      title: "Утримуйте 3 секунди",
      description: "Утримуйте клікер протягом 3 секунд",
      required: 1,
      progress: 0,
      completed: false,
    },
    {
      id: 4,
      title: "Перетягніть об'єкт",
      description: "Перетягніть клікер по екрану",
      required: 1,
      progress: 0,
      completed: false,
    },
    {
      id: 5,
      title: "Свайп вправо",
      description: "Виконайте швидкий свайп вправо",
      required: 1,
      progress: 0,
      completed: false,
    },
    {
      id: 6,
      title: "Свайп вліво",
      description: "Виконайте швидкий свайп вліво",
      required: 1,
      progress: 0,
      completed: false,
    },
    {
      id: 7,
      title: "Змініть розмір",
      description: "Використайте жест щипка для зміни розміру",
      required: 1,
      progress: 0,
      completed: false,
    },
    {
      id: 8,
      title: "Наберіть 100 очок",
      description: "Зберіть загалом 100 очок",
      required: 100,
      progress: 0,
      completed: false,
    },
  ]);

  const comboTimeoutRef = useRef(null);
  const [comboCount, setComboCount] = useState(0);

  useEffect(() => {
    updateTaskProgress(8, score);

    return () => {
      if (comboTimeoutRef.current) {
        clearTimeout(comboTimeoutRef.current);
      }
    };
  }, [score]);

  const addPoints = (points) => {
    let finalPoints = points;
    let isCritical = false;

    if (tapUpgrades.criticalClickLevel > 0) {
      const roll = Math.random() * 100;
      if (roll <= tapUpgrades.criticalClickChance) {
        finalPoints *= tapUpgrades.criticalClickMultiplier;
        isCritical = true;
      }
    }

    if (tapUpgrades.comboClickLevel > 0) {
      if (comboTimeoutRef.current) {
        clearTimeout(comboTimeoutRef.current);
      }

      setComboCount((prev) => prev + 1);

      finalPoints += comboCount * tapUpgrades.comboClickBonus;

      comboTimeoutRef.current = setTimeout(() => {
        setComboCount(0);
      }, 2000);
    }

    setScore((prevScore) => prevScore + finalPoints);

    return { points: finalPoints, isCritical };
  };

  const updateTaskProgress = (taskId, progress, complete = false) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              progress: complete ? task.required : progress,
              completed: complete ? true : progress >= task.required,
            }
          : task
      )
    );
  };

  const incrementTaskProgress = (taskId, amount = 1) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId && !task.completed) {
          const newProgress = Math.min(task.progress + amount, task.required);
          return {
            ...task,
            progress: newProgress,
            completed: newProgress >= task.required,
          };
        }
        return task;
      })
    );
  };

  const upgradeTap = (type) => {
    switch (type) {
      case "singleTap":
        const singleTapCost = tapUpgrades.singleTapLevel * 10;
        if (score >= singleTapCost) {
          setScore((prevScore) => prevScore - singleTapCost);
          setTapUpgrades((prev) => ({
            ...prev,
            singleTap: Math.round((prev.singleTap + 0.5) * 10) / 10,
            singleTapLevel: prev.singleTapLevel + 1,
          }));
          return true;
        }
        break;

      case "doubleTap":
        const doubleTapCost = tapUpgrades.doubleTapLevel * 20;
        if (score >= doubleTapCost) {
          setScore((prevScore) => prevScore - doubleTapCost);
          setTapUpgrades((prev) => ({
            ...prev,
            doubleTap: Math.round((prev.doubleTap + 1) * 10) / 10,
            doubleTapLevel: prev.doubleTapLevel + 1,
          }));
          return true;
        }
        break;

      case "longPress":
        const longPressCost = tapUpgrades.longPressLevel * 30;
        if (score >= longPressCost) {
          setScore((prevScore) => prevScore - longPressCost);
          setTapUpgrades((prev) => ({
            ...prev,
            longPress: Math.round((prev.longPress + 1.5) * 10) / 10,
            longPressLevel: prev.longPressLevel + 1,
          }));
          return true;
        }
        break;

      case "criticalClick":
        const criticalClickCost = tapUpgrades.criticalClickLevel * 75;
        if (score >= criticalClickCost) {
          setScore((prevScore) => prevScore - criticalClickCost);
          setTapUpgrades((prev) => {
            const newLevel = prev.criticalClickLevel + 1;
            const newChance = Math.min(50, 5 + (newLevel - 1) * 2);
            const newMultiplier =
              Math.round((2 + (newLevel - 1) * 0.2) * 10) / 10;

            return {
              ...prev,
              criticalClickChance: newChance,
              criticalClickMultiplier: newMultiplier,
              criticalClickLevel: newLevel,
            };
          });
          return true;
        }
        break;

      case "comboClick":
        const comboClickCost = tapUpgrades.comboClickLevel * 100;
        if (score >= comboClickCost) {
          setScore((prevScore) => prevScore - comboClickCost);
          setTapUpgrades((prev) => {
            const newLevel = prev.comboClickLevel + 1;
            const newBonus = Math.round((prev.comboClickBonus + 0.3) * 10) / 10;

            return {
              ...prev,
              comboClickBonus: newBonus,
              comboClickLevel: newLevel,
            };
          });
          return true;
        }
        break;

      case "swipeUpgrade":
        const swipeUpgradeCost = tapUpgrades.swipeUpgradeLevel * 40;
        if (score >= swipeUpgradeCost) {
          setScore((prevScore) => prevScore - swipeUpgradeCost);
          setTapUpgrades((prev) => {
            const newLevel = prev.swipeUpgradeLevel + 1;
            const newValue =
              Math.round((prev.swipeUpgradeValue + 0.8) * 10) / 10;

            return {
              ...prev,
              swipeUpgradeValue: newValue,
              swipeUpgradeLevel: newLevel,
            };
          });
          return true;
        }
        break;

      case "pinchUpgrade":
        const pinchUpgradeCost = tapUpgrades.pinchUpgradeLevel * 60;
        if (score >= pinchUpgradeCost) {
          setScore((prevScore) => prevScore - pinchUpgradeCost);
          setTapUpgrades((prev) => {
            const newLevel = prev.pinchUpgradeLevel + 1;
            const newValue = Math.round((prev.pinchUpgradeValue + 1) * 10) / 10;

            return {
              ...prev,
              pinchUpgradeValue: newValue,
              pinchUpgradeLevel: newLevel,
            };
          });
          return true;
        }
        break;
    }

    return false;
  };

  return (
    <GameContext.Provider
      value={{
        score,
        addPoints,
        tasks,
        updateTaskProgress,
        incrementTaskProgress,
        tapUpgrades,
        upgradeTap,
        comboCount,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
