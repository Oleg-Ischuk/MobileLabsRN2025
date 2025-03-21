"use client";

import React, { useState } from "react";
import { FlatList, ScrollView, Dimensions } from "react-native";
import styled from "styled-components/native";
import Header from "../components/Header";
import { ICONS } from "../assets/icons";
import { categories, games, featuredGames } from "../data/data";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.background};
`;

const FeaturedGamesScrollView = styled.ScrollView`
  margin-top: 16px;
`;

const FeaturedGameCard = styled.View`
  width: ${Dimensions.get("window").width - 32}px;
  height: 230px;
  margin-horizontal: 16px;
  border-radius: 8px;
  overflow: hidden;
`;

const GameImageContainer = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
`;

const GameImage = styled.Image`
  width: 100%;
  height: 100%;
  resize-mode: cover;
`;

const GameInfo = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
`;

const GameTitle = styled.Text`
  font-family: Gilroy;
  font-weight: 700;
  font-size: 20px;
  line-height: 39px;
  letter-spacing: -0.34px;
  color: white;
`;

const RecommendedText = styled.Text`
  font-family: ABeeZee;
  font-weight: 400;
  font-size: 13px;
  line-height: 18px;
  letter-spacing: -0.14px;
  color: #cccccc;
  margin-top: 4px;
`;

const PriceContainer = styled.View`
  width: 95px;
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const DiscountBadge = styled.View`
  background-color: #00d44b80;
  padding: 2px 2px;
  border-radius: 4px;
  margin-right: 6px;
`;

const DiscountText = styled.Text`
  color: white;
  font-family: PingFang SC;
  font-weight: 300;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.13px;
  text-transform: uppercase;
`;

const OriginalPrice = styled.Text`
  color: #cccccc;
  text-decoration-line: line-through;
  margin-right: 6px;
`;

const Price = styled.Text`
  color: white;
  font-family: PingFang SC;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 14px;
`;

const PlatformIconContainer = styled.View`
  position: absolute;
  right: 16px;
  bottom: 16px;
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const PlatformIcon = styled.Image`
  width: 16.5px;
  height: 16.5px;
  tint-color: ${(props) => (props.theme.isDark ? "white" : props.theme.text)};
`;

const CategoryScrollView = styled.ScrollView`
  margin-vertical: 16px;
`;

const CategoryTabsContainer = styled.View`
  flex-direction: row;
  padding-horizontal: 16px;
`;

const CategoryTab = styled.TouchableOpacity`
  padding: 14px;
  border-radius: 8px;
  margin-right: 8px;
  background-color: ${(props) =>
    props.active ? props.theme.accent : props.theme.cardBackground};
`;

const CategoryTabText = styled.Text`
  color: ${(props) => (props.active ? "white" : props.theme.text)};
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
`;

const GameListItem = styled.TouchableOpacity`
  flex-direction: row;
  padding: 12px 16px;
  align-items: center;
  background-color: ${(props) => props.theme.cardBackground};
`;

const GameListImage = styled.Image`
  width: 72px;
  height: 50px;
  border-radius: 10px;
  margin-right: 12px;
`;

const GameListInfo = styled.View`
  flex: 1;
`;

const GameListTitle = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.text};
  margin-bottom: 4px;
`;

const PlatformContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const PlatformText = styled.Text`
  color: ${(props) => props.theme.secondaryText};
  font-size: 14px;
  margin-left: 6px;
`;

const GameListPriceContainer = styled.View`
  align-items: flex-end;
`;

const GameListPriceRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const GameListOriginalPrice = styled.Text`
  color: ${(props) => props.theme.secondaryText};
  text-decoration-line: line-through;
  font-family: PingFang SC;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.13px;
  text-transform: uppercase;
  margin-right: 6px;
`;

const GameListPrice = styled.Text`
  font-family: PingFang SC;
  font-weight: 300;
  font-size: 18px;
  letter-spacing: -0.13px;
  text-transform: uppercase;
  color: ${(props) => props.theme.text};
`;

const DiscountBadgeSmall = styled.View`
  background-color: #00d44b80;
  padding: 2px 6px;
  border-radius: 4px;
  margin-top: 4px;
`;

const StoreScreen = () => {
  const [activeCategory, setActiveCategory] = useState("topSellers");

  const renderGameItem = ({ item }) => (
    <GameListItem>
      <GameListImage source={{ uri: item.image }} />
      <GameListInfo>
        <GameListTitle>{item.title}</GameListTitle>
        <PlatformContainer>
          {item.platforms.map((platform, index) => (
            <React.Fragment key={index}>
              <PlatformIcon
                source={platform === "Windows" ? ICONS.WINDOWS : ICONS.MAC}
                resizeMode="contain"
              />
              <PlatformText>
                {platform === "Windows" ? "Windows" : "Mac"}
              </PlatformText>
              {index < item.platforms.length - 1 && (
                <PlatformText>, </PlatformText>
              )}
            </React.Fragment>
          ))}
        </PlatformContainer>
      </GameListInfo>
      <GameListPriceContainer>
        <GameListPriceRow>
          {item.discount && (
            <GameListOriginalPrice>${item.price}</GameListOriginalPrice>
          )}
          <GameListPrice>${item.discountPrice || item.price}</GameListPrice>
        </GameListPriceRow>
        {item.discount && (
          <DiscountBadgeSmall>
            <DiscountText>-{item.discount}%</DiscountText>
          </DiscountBadgeSmall>
        )}
      </GameListPriceContainer>
    </GameListItem>
  );

  const renderFeaturedGame = (game) => (
    <FeaturedGameCard key={game.id}>
      <GameImageContainer>
        <GameImage source={{ uri: game.image }} />
        <GameInfo>
          <GameTitle>{game.title}</GameTitle>
          {game.recommended && (
            <RecommendedText>
              Recommended by your friend, Player
            </RecommendedText>
          )}
          <PriceContainer>
            {game.discount && (
              <DiscountBadge>
                <DiscountText>-{game.discount}%</DiscountText>
              </DiscountBadge>
            )}
            {game.discountPrice && <OriginalPrice>${game.price}</OriginalPrice>}
            <Price>${game.discountPrice || game.price}</Price>
          </PriceContainer>
        </GameInfo>
        <PlatformIconContainer>
          {game.platforms.map((platform, index) => (
            <PlatformIcon
              key={index}
              source={platform === "Windows" ? ICONS.WINDOWS : ICONS.MAC}
              resizeMode="contain"
            />
          ))}
        </PlatformIconContainer>
      </GameImageContainer>
    </FeaturedGameCard>
  );

  return (
    <Container>
      <Header title="Store" />

      <ScrollView>
        <FeaturedGamesScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={Dimensions.get("window").width - 16}
          decelerationRate="fast"
          snapToAlignment="center"
        >
          {featuredGames.map((game) => renderFeaturedGame(game))}
        </FeaturedGamesScrollView>
        <CategoryScrollView horizontal showsHorizontalScrollIndicator={false}>
          <CategoryTabsContainer>
            {categories.map((category) => (
              <CategoryTab
                key={category.id}
                active={activeCategory === category.id}
                onPress={() => setActiveCategory(category.id)}
              >
                <CategoryTabText active={activeCategory === category.id}>
                  {category.label}
                </CategoryTabText>
              </CategoryTab>
            ))}
          </CategoryTabsContainer>
        </CategoryScrollView>
        <FlatList
          data={games}
          renderItem={renderGameItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </ScrollView>
    </Container>
  );
};

export default StoreScreen;
