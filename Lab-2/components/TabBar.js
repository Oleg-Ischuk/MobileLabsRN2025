"use client";
import styled from "styled-components/native";
import { ICONS } from "../assets/icons";
import { useTheme } from "../theme/ThemeProvider";

const TabBarContainer = styled.View`
  flex-direction: row;
  height: 90px;
  padding-bottom: 30px;
  background-color: ${(props) => props.theme.tabBarBackground};
`;

const TabButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const TabIcon = styled.Image`
  width: 24px;
  height: 24px;
  tint-color: ${(props) =>
    props.isFocused ? props.theme.activeTabIcon : props.theme.inactiveTabIcon};
`;

const MyLogoIcon = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

const FallbackIcon = styled.View`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${(props) =>
    props.isFocused ? props.theme.activeTabIcon : props.theme.inactiveTabIcon};
  justify-content: center;
  align-items: center;
`;

const FallbackText = styled.Text`
  color: ${(props) => props.theme.tabBarBackground};
  font-size: 16px;
  font-weight: bold;
`;

const TabBar = ({ state, descriptors, navigation }) => {
  const { theme } = useTheme();

  return (
    <TabBarContainer>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let iconSource;
        let isMyLogo = false;

        switch (route.name) {
          case "Store":
            iconSource = ICONS.STORE;
            break;
          case "Community":
            iconSource = ICONS.COMMUNITY;
            break;
          case "Chat":
            iconSource = ICONS.CHAT;
            break;
          case "Safety":
            iconSource = ICONS.SAFETY;
            break;
          case "Profile":
            iconSource = ICONS.MYLOGO;
            isMyLogo = true;
            break;
          default:
            iconSource = null;
        }

        return (
          <TabButton
            key={index}
            onPress={onPress}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
          >
            {isMyLogo ? (
              iconSource ? (
                <MyLogoIcon source={iconSource} resizeMode="contain" />
              ) : (
                <FallbackIcon isFocused={isFocused}>
                  <FallbackText>P</FallbackText>
                </FallbackIcon>
              )
            ) : (
              <TabIcon
                source={iconSource}
                isFocused={isFocused}
                resizeMode="contain"
              />
            )}
          </TabButton>
        );
      })}
    </TabBarContainer>
  );
};

export default TabBar;
