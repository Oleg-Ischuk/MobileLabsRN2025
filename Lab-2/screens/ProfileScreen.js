"use client";

import { useState, useEffect } from "react";
import { Animated, Easing } from "react-native";
import styled from "styled-components/native";
import { useTheme } from "../theme/ThemeProvider";
import { ICONS } from "../assets/icons";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

const ProfileHeader = styled.View`
  align-items: center;
  padding: 32px 16px;
`;

const AvatarContainer = styled.View`
  position: relative;
  margin-top: 69px;
  margin-bottom: 16px;
`;

const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

const OnlineIndicator = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.online};
  border-width: 3px;
  border-color: ${(props) => props.theme.background};
`;

const ProfileName = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
  margin-bottom: 4px;
`;

const ProfileStatus = styled.Text`
  font-size: 20px;
  color: ${(props) => props.theme.secondaryText};
`;

const MenuContainer = styled.View`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 8px;
  margin-horizontal: 16px;
  overflow: hidden;
`;

const MenuItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.border};
`;

const MenuText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.text};
`;

const ChevronIcon = styled.Image`
  width: 6px;
  height: 12px;
  tint-color: ${(props) => props.theme.secondaryText};
`;

const ThemeToggleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ToggleWrapper = styled.TouchableOpacity`
  width: 50px;
  height: 30px;
`;

const ToggleTrack = styled.View`
  width: 50px;
  height: 30px;
  background-color: ${(props) => (props.isOn ? "#333333" : "#e0e0e0")};
  border-radius: 15px;
  position: relative;
`;

const ToggleThumb = styled(Animated.View)`
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background-color: white;
  position: absolute;
  top: 2px;
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
`;

const HiddenText = styled.Text`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

const ThemeToggle = ({ isOn, onToggle }) => {
  const [animatedValue] = useState(new Animated.Value(isOn ? 1 : 0));

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isOn ? 1 : 0,
      duration: 300,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  }, [isOn, animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22],
  });

  return (
    <ToggleWrapper onPress={onToggle} activeOpacity={0.8}>
      <ToggleTrack isOn={isOn}>
        <HiddenText>
          {isOn ? "Enable Light Mode" : "Enable Dark Mode"}
        </HiddenText>
        <ToggleThumb style={{ left: translateX }} />
      </ToggleTrack>
    </ToggleWrapper>
  );
};

const ProfileScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme.isDark;

  const menuItems = [
    { id: "settings", text: "Settings", action: () => console.log("Settings") },
    { id: "logout", text: "Logout", action: () => console.log("Logout") },
  ];

  return (
    <Container>
      <ProfileHeader>
        <AvatarContainer>
          <Avatar source={require("../assets/icons/big-my-logo.png")} />
          <OnlineIndicator />
        </AvatarContainer>
        <ProfileName>Oleg Ishchuk</ProfileName>
        <ProfileStatus>IPZ-23-1</ProfileStatus>
      </ProfileHeader>

      <MenuContainer>
        {menuItems.map((item, index) => (
          <MenuItem
            key={item.id}
            onPress={item.action}
            isLast={index === menuItems.length - 1}
          >
            <MenuText>{item.text}</MenuText>
            <ChevronIcon source={ICONS.CHEVRON} />
          </MenuItem>
        ))}
        <MenuItem isLast={true}>
          <MenuText>Theme</MenuText>
          <ThemeToggleContainer>
            <ThemeToggle isOn={isDarkMode} onToggle={toggleTheme} />
          </ThemeToggleContainer>
        </MenuItem>
      </MenuContainer>
    </Container>
  );
};

export default ProfileScreen;
