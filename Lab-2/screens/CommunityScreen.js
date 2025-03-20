"use client";

import { useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import Header from "../components/Header";
import { ICONS } from "../assets/icons";
import CommunityAvatar from "../assets/icons/community-avatar.png";
import { posts, filters } from "../data/data";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

const Subtitle = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.secondaryText};
  padding: 0 16px;
  margin-top: 8px;
  margin-bottom: 21px;
`;

const FilterTabsWrapper = styled.View`
  background-color: ${(props) => props.theme.cardBackground};
  margin-bottom: 8px;
`;

const FilterTabsScrollView = styled.ScrollView`
  margin-bottom: 16px;
`;

const FilterTabsContainer = styled.View`
  flex-direction: row;
  padding-horizontal: 16px;
  background-color: ${(props) => props.theme.cardBackground};
`;

const FilterTab = styled.TouchableOpacity`
  padding: 12px 12px;
  border-radius: 8px;
  margin-right: 8px;
  background-color: ${(props) =>
    props.active
      ? props.theme.accent
      : props.theme.isDark
      ? "#303649"
      : "#e0e0e0"};
`;

const FilterTabText = styled.Text`
  font-size: 16px;
  color: ${(props) => (props.active ? "white" : props.theme.text)};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
`;

const SearchButton = styled.TouchableOpacity`
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.theme.isDark ? "#303649" : "#e0e0e0")};
  border-radius: 8px;
  margin-right: 8px;
`;

const SearchIcon = styled.Image`
  width: 24px;
  height: 24px;
  tint-color: ${(props) => props.theme.secondaryText};
`;

const PostContainer = styled.View`
  margin: 0 0 8px 0;
  overflow: hidden;
  background-color: ${(props) => props.theme.cardBackground};
`;

const PostHeader = styled.View`
  flex-direction: row;
  align-items: flex-start;
  padding: 12px;
`;

const AuthorAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 12px;
`;

const AuthorInfo = styled.View`
  flex: 1;
`;

const AuthorNameRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const AuthorName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.text};
`;

const BadgeContainer = styled.View`
  background-color: #b63db6;
  padding: 2px 6px;
  border-radius: 4px;
  margin-left: 10px;
`;

const BadgeText = styled.Text`
  color: white;
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
`;

const PostTimeWrapper = styled.View`
  margin-top: 4px;
`;

const PostTime = styled.Text`
  font-size: 12px;
  color: ${(props) => props.theme.secondaryText};
`;

const MoreButton = styled.TouchableOpacity`
  padding: 4px;
`;

const MoreIcon = styled.Text`
  font-size: 20px;
  color: ${(props) => props.theme.secondaryText};
`;

const PostImage = styled.Image`
  width: 100%;
  height: 200px;
  padding: 0 20px 0 20px;
  border-radius: 8px;
  resize-mode: cover;
`;

const PostTitle = styled.Text`
  font-family: ABeeZee;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: -0.32px;
  color: ${(props) => props.theme.text};
  padding: 20px 20px 8px;
`;

const PostContent = styled.Text`
  font-family: ABeeZee;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.28px;
  color: ${(props) => props.theme.secondaryText};
  padding: 0 20px 20px;
`;

const PostActions = styled.View`
  flex-direction: row;
  padding: 12px 16px;
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.border};
`;

const ActionButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-right: 24px;
`;

const ActionIcon = styled.Image`
  width: 18px;
  height: 18px;
  tint-color: ${(props) =>
    props.active ? "#00d44b" : props.theme.secondaryText};
  resize-mode: contain;
`;

const ActionCount = styled.Text`
  margin-left: 8px;
  font-size: 16px;
  color: ${(props) => (props.active ? "#00d44b" : props.theme.secondaryText)};
`;

const ShareButton = styled.TouchableOpacity`
  margin-left: auto;
`;

const CommunityScreen = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const renderPostItem = ({ item, index }) => (
    <PostContainer style={{ marginBottom: index === posts.length - 1 ? 0 : 8 }}>
      <PostHeader>
        <AuthorAvatar source={CommunityAvatar} />
        <AuthorInfo>
          <AuthorNameRow>
            <AuthorName>{item.author}</AuthorName>
            {item.badge && (
              <BadgeContainer>
                <BadgeText>{item.badge}</BadgeText>
              </BadgeContainer>
            )}
          </AuthorNameRow>
          <PostTimeWrapper>
            <PostTime>{item.time}</PostTime>
          </PostTimeWrapper>
        </AuthorInfo>
        <MoreButton>
          <MoreIcon>•••</MoreIcon>
        </MoreButton>
      </PostHeader>

      <PostImage source={{ uri: item.image }} />

      <PostTitle>{item.title}</PostTitle>
      <PostContent>{item.content}</PostContent>

      <PostActions>
        <ActionButton>
          <ActionIcon source={ICONS.LIKE} active={item.liked} />
          <ActionCount active={item.liked}>{item.likes}</ActionCount>
        </ActionButton>
        <ActionButton>
          <ActionIcon source={ICONS.COMMENT} />
          <ActionCount>{item.comments}</ActionCount>
        </ActionButton>
        <ShareButton>
          <ActionIcon source={ICONS.SHARE} />
        </ShareButton>
      </PostActions>
    </PostContainer>
  );

  return (
    <Container>
      <FlatList
        data={posts}
        renderItem={(props) => renderPostItem({ ...props, index: props.index })}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <FilterTabsWrapper>
            <Header title="Community" showSearch={false} />
            <Subtitle>
              Community and official content for all games and software
            </Subtitle>
            <FilterTabsScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <FilterTabsContainer>
                <SearchButton>
                  <SearchIcon source={ICONS.SEARCH} />
                </SearchButton>
                {filters.map((filter) => (
                  <FilterTab
                    key={filter.id}
                    active={activeFilter === filter.id}
                    onPress={(e) => {
                      e.stopPropagation();
                      if (activeFilter !== filter.id) {
                        setActiveFilter(filter.id);
                      }
                    }}
                  >
                    <FilterTabText active={activeFilter === filter.id}>
                      {filter.label}
                    </FilterTabText>
                  </FilterTab>
                ))}
              </FilterTabsContainer>
            </FilterTabsScrollView>
          </FilterTabsWrapper>
        )}
      />
    </Container>
  );
};

export default CommunityScreen;
