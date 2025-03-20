"use client";

import { useState } from "react";
import { FlatList, ImageBackground } from "react-native";
import styled from "styled-components/native";
import Header from "../components/Header";
import TabSelector from "../components/TabSelector";
import { ICONS } from "../assets/icons";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

const LoggedInText = styled.Text`
  color: ${(props) => props.theme.secondaryText};
  text-align: center;
  margin-top: 16px;
  margin-bottom: 4px;
  font-family: ABeeZee;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.15px;
`;

const CodeContainer = styled.View`
  height: 167px;
  padding-top: 30px;
  align-items: center;
`;

const CodeText = styled.Text`
  font-size: 54px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: 5.52px;
  margin-bottom: 11px;
`;

const ProgressBarContainer = styled.View`
  width: 158px;
  height: 7px;
  align-self: center;
  background-color: ${(props) => (props.theme.isDark ? "#1c202c" : "#e0e0e0")};
  border-radius: 3px;
  overflow: hidden;
`;

const ProgressFill = styled.View`
  width: 70%;
  height: 100%;
  background-color: #3498db;
  border-radius: 3px;
`;

const InfoText = styled.Text`
  color: ${(props) => props.theme.text};
  text-align: left;
  margin: 8px 14px 0 20px;
  font-size: 15px;
  line-height: 22px;
`;

const TipContainer = styled.View`
  margin: 14px 14px 0 20px;
`;

const TipText = styled.Text`
  color: #3498db;
  font-size: 15px;
  line-height: 22px;
`;

const OptionsContainer = styled.View`
  background-color: ${(props) => props.theme.cardBackground};
  border-radius: 8px;
  margin-top: 24px;
  margin-horizontal: 16px;
  overflow: hidden;
`;

const OptionsItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom-width: ${(props) => (props.isLast ? "0" : "1px")};
  border-bottom-color: ${(props) => props.theme.border};
`;

const OptionsText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.text};
`;

const ChevronIcon = styled.Image`
  width: 6px;
  height: 12px;
  tint-color: ${(props) => props.theme.secondaryText};
`;

const SafetyScreen = () => {
  const [activeTab, setActiveTab] = useState("guard");

  const tabs = [
    { id: "guard", label: "Guard" },
    { id: "confirmations", label: "Confirmations" },
  ];

  const options = [
    { id: "remove", text: "Remove Authenticator" },
    { id: "recovery", text: "My Recovery Code" },
    { id: "help", text: "Help" },
  ];

  const renderItem = ({ item, index }) => (
    <OptionsItem
      key={item.id}
      isLast={index === options.length - 1}
      onPress={() => console.log(item.id)}
    >
      <OptionsText>{item.text}</OptionsText>
      <ChevronIcon source={ICONS.CHEVRON} />
    </OptionsItem>
  );

  return (
    <Container>
      <Header title="Safety" showSearch={false} />

      <TabSelector
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <ImageBackground
        source={require("../assets/icons/safety-background.png")}
        style={{
          width: "100%",
          height: "375px",
          justifyContent: "center",
        }}
      >
        <CodeContainer>
          <LoggedInText>Logged in as player</LoggedInText>
          <CodeText>N5KCV</CodeText>
          <ProgressBarContainer>
            <ProgressFill />
          </ProgressBarContainer>
        </CodeContainer>
      </ImageBackground>
      <InfoText>
        You'll enter your code each time you enter your password to sign in to
        your Steam account.
      </InfoText>

      <TipContainer>
        <TipText>
          Tip: If you don't share your PC, you can select "Remember my password"
          when you sign in to the PC client to enter your password and
          authenticator code less often.
        </TipText>
      </TipContainer>

      <OptionsContainer>
        <FlatList
          data={options}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </OptionsContainer>
    </Container>
  );
};

export default SafetyScreen;
