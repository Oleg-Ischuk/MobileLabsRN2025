import styled from "styled-components/native";
import { ICONS } from "../assets/icons";

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: ${(props) => props.theme.cardBackground};
  margin: 27px 20px 0 20px;
`;

const ItemText = styled.Text`
  flex: 1;
  font-size: 16px;
  color: ${(props) => props.theme.text};
`;

const ChevronIcon = styled.Image`
  width: 4px;
  height: 10px;
  tint-color: ${(props) => props.theme.secondaryText};
`;

const ListItem = ({ text, onPress }) => {
  return (
    <ItemContainer onPress={onPress}>
      <ItemText>{text}</ItemText>
      <ChevronIcon source={ICONS.CHEVRON} />
    </ItemContainer>
  );
};

export default ListItem;
