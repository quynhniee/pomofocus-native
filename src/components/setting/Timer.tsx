import React, { useContext } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { Switch, TextInput, Text, HelperText } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import Context from "../../store/Context";
import Stack from "../Stack";
import { Title } from './Components';

const Timer = ({
  getPomodoroMinute,
  getShortBreakMinute,
  getLongBreakMinute,
  toggleStartBreak,
  toggleStartPomodoro,
  getLongBreakInterval,
  longBreakInterval,
  autoStartBreak,
  autoStartPomodoro,
}) => {
  const { tabs } = useContext(Context);
  const onChangeHandle = (value, index) => {
    const time = +value;
    if (index === 0) getPomodoroMinute(time);
    else if (index === 1) getShortBreakMinute(time);
    else if (index === 2) getLongBreakMinute(time);
  };

  return (
    <View>
      <Title>
        <Icon name="access-time" size={20} color="#000" />
        <Text style={styles.uppercaseText}>timer</Text>
      </Title> 
      <View>
        <Text>Time (minutes)</Text>
        <Stack flexDirection="row" alignInline="space-between" gap={5}>
          {tabs.map((tab, index) => (
            <View key={index}>
              <Stack flexDirection="column" key={index}>
                <Text style={styles.greyText}>{tab.name}</Text>
                <TextInput
                  style={styles.input}
                  defaultValue={tab.minute?.toString()}
                  keyboardType="numeric"
                  onChangeText={(value) => onChangeHandle(value, index)}
                />
              </Stack>
            </View>
          ))}
        </Stack>
        <View style={styles.row}>
          <Text>Auto Start Breaks</Text>
          <Switch value={autoStartBreak} onValueChange={toggleStartBreak} />
        </View>
        <View style={styles.row}>
          <Text>Auto Start Pomodoros</Text>
          <Switch
            value={autoStartPomodoro}
            onValueChange={toggleStartPomodoro}
          />
        </View>
        <View style={styles.row}>
          <Text>Long Break interval</Text>
          <TextInput
            style={styles.input}
            defaultValue={longBreakInterval.toString()}
            keyboardType="numeric"
            value={longBreakInterval.toString()}
            onChangeText={(value) => getLongBreakInterval(+value)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 10,
  },
  uppercaseText: {
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
  },
  greyText: {
    color: "#bdbdbd",
  },
  input: {
    width: 90,
    height: 40,
  },
});

export default Timer;
