import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Switch, Text as RNText } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Title } from './Components';

const Task = ({ autoSwitchTasks, toggleSwitchTasks }) => {
  return (
    <View>
      <Title>
        <Icon name="task-alt" size={20} color="#000" />
        <RNText style={styles.uppercaseText}>task</RNText>
      </Title>
      <View style={styles.row}>
        <RNText>Auto Switch Tasks</RNText>
        <Switch
          value={autoSwitchTasks}
          onValueChange={toggleSwitchTasks}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uppercaseText: {
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Task;