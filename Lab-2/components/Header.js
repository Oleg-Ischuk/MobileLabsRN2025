import styled from "styled-components/native";
import { ICONS } from "../assets/icons";

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  margin-top: 61px;
  background-color: transparent;
`;

const LogoContainer = styled.View`
  width: 39px;
  height: 39px;
  margin-right: 12px;
`;

const Logo = styled.Image`
  width: 42px;
  height: 42px;
  tint-color: ${(props) => (props.theme.isDark ? "white" : "#000000")};
`;

const Title = styled.Text`
  font-family: ABeeZee;
  font-weight: 400;
  font-size: 28px;
  line-height: 39px;
  letter-spacing: -0.48px;
  color: ${(props) => props.theme.text};
`;

const SearchButton = styled.TouchableOpacity`
  margin-left: auto;
`;

const SearchIcon = styled.Image`
  width: 24px;
  height: 24px;
  tint-color: ${(props) => props.theme.secondaryText};
`;

const Header = ({ title, showSearch = true, onSearchPress }) => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo source={ICONS.STEAM_LOGO} resizeMode="contain" />
      </LogoContainer>
      <Title>{title}</Title>
      {showSearch && (
        <SearchButton onPress={onSearchPress}>
          <SearchIcon source={ICONS.SEARCH} />
        </SearchButton>
      )}
    </HeaderContainer>
  );
};

export default Header;
