"use client";

import { useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import Header from "../components/Header";
import TabSelector from "../components/TabSelector";
import { tabs, chats } from "../data/data";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

const ChatItem = styled.TouchableOpacity`
  flex-direction: row;
  padding: 12px 20px;
  align-items: center;
  background-color: ${(props) => props.theme.cardBackground};
`;

const AvatarContainer = styled.View`
  position: relative;
  margin-right: 12px;
`;

const Avatar = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 24px;
`;

const OnlineIndicator = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 12px;
  height: 12px;
  border-radius: 6px;
  background-color: ${(props) => props.theme.online};
  border-width: 2px;
  border-color: ${(props) => props.theme.background};
`;

const ChatInfo = styled.View`
  flex: 1;
`;

const ChatName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
  margin-bottom: 4px;
`;

const ChatMessage = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.secondaryText};
`;

const ChatMeta = styled.View`
  align-items: flex-end;
`;

const ChatTime = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.secondaryText};
  margin-bottom: 4px;
`;

const UnreadIndicator = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.unread};
`;

const UnreadBadge = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.unread};
  justify-content: center;
  align-items: center;
`;

const UnreadCount = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

const ChatScreen = () => {
  const [activeTab, setActiveTab] = useState("chats");

  const renderChatItem = ({ item }) => (
    <ChatItem>
      <AvatarContainer>
        <Avatar source={{ uri: item.avatar }} />
        {item.online && <OnlineIndicator />}
      </AvatarContainer>

      <ChatInfo>
        <ChatName>{item.name}</ChatName>
        <ChatMessage>{item.message}</ChatMessage>
      </ChatInfo>

      <ChatMeta>
        {item.time && <ChatTime>{item.time}</ChatTime>}
        {item.unread > 0 ? (
          <UnreadBadge>
            <UnreadCount>{item.unread}</UnreadCount>
          </UnreadBadge>
        ) : item.unread === 0 && item.time ? (
          <UnreadIndicator />
        ) : null}
      </ChatMeta>
    </ChatItem>
  );

  return (
    <Container>
      <Header title="Chat" />

      <TabSelector
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
      />
    </Container>
  );
};

export default ChatScreen;
