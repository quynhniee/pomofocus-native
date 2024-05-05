import React, { useContext } from 'react';
import { IconButton, Text } from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity, Text as RNText } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Context from '../../store/Context';
// import { updateTask } from '../../api';

const TaskCheckButton = ({ tasks, getTasks, task }) => {
  const clickHandle = (e) => {
    e.stopPropagation();
    const newTask = { ...task, isCompleted: !task.isCompleted };
    getTasks(tasks.map((t) => (t.id === task.id ? newTask : t)));
    // updateTask(task.id, newTask);
  };
  const { currentThemeColor } = useContext(Context);
  return (
    <View style={styles.container}>
      <IconButton
        icon={({ size, color }) => (
          <MaterialCommunityIcons name="check" size={size} color={color} />
        )}
        iconColor="white"
        style={{
          backgroundColor: task.isCompleted ? currentThemeColor : '#DFDFDF',
          marginRight: 10,
        }}
        onPress={clickHandle}
      />
      <RNText
        style={{
          color: task.isCompleted ? '#BBBBBB' : '#555555',
          fontWeight: 'bold',
          fontSize: 15,
          textDecorationLine: task.isCompleted ? 'line-through' : 'none',
          textDecorationColor: '#BBBBBB',
        }}
      >
        {task.content}
      </RNText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TaskCheckButton;