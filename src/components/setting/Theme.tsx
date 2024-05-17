import React, { useContext } from "react";
import { View, Text as RNText, StyleSheet } from "react-native";
import { List, ListItem, ThemeModal, Title } from "./Components";
import Icon from "react-native-vector-icons/MaterialIcons";
import Context from "../../store/Context";
import Stack from "../Stack";

const Theme = () => {
  const { tabs, updatePomodoro, updateShortBreak, updateLongBreak } =
    useContext(Context);
  return (
    <List>
      <Title>
        <Icon name="format-color-fill" size={20} color="#000" />
        <RNText style={styles.uppercaseText}>theme</RNText>
      </Title>
      <ListItem>
        <RNText>Color Themes</RNText>
        <View>
          <Stack flexDirection="row" columnGap={5}>
            <ThemeModal tab={tabs[0]} updateTab={updatePomodoro} />
            <ThemeModal tab={tabs[1]} updateTab={updateShortBreak} />
            <ThemeModal tab={tabs[2]} updateTab={updateLongBreak} />
          </Stack>
        </View>
      </ListItem>
    </List>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 10,
  },
  uppercaseText: {
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default Theme;
