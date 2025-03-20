import styled from "styled-components/native";

const TabContainer = styled.View`
  flex-direction: row;
  border-radius: 12px;
  overflow: hidden;
  margin: 18px 20px 12px 20px;
  background-color: ${(props) => props.theme.cardBackground};
  border: 1px solid ${(props) => props.theme.border};
  height: 48px;
`;

const Tab = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.active ? props.theme.accent : "transparent"};
  border-radius: 10px;
  margin: 2px;
`;

const TabText = styled.Text`
  color: ${(props) => (props.active ? "#ffffff" : props.theme.secondaryText)};
  font-family: PingFang SC;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.15px;
`;

const TabSelector = ({ tabs, activeTab, onTabChange }) => {
  return (
    <TabContainer>
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          active={activeTab === tab.id}
          onPress={() => onTabChange(tab.id)}
        >
          <TabText active={activeTab === tab.id}>{tab.label}</TabText>
        </Tab>
      ))}
    </TabContainer>
  );
};

export default TabSelector;
