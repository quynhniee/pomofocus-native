import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text as RNText } from 'react-native';
import { Divider, IconButton, List, Title } from 'react-native-paper';
import TaskMenu from './TaskMenu';
import AddTaskButton from './AddTaskButton';
import TaskItem from './TaskItem';
import TaskCheckButton from './TaskCheckButton';
import TaskCreator from './TaskCreator';
import Stack from '../Stack';

const TasksList = ({ tasks, getTasks }) => {
  const [expand, setExpand] = useState(false);
  const getExpand = (data) => setExpand(data);

  return (
    <Stack>
      <View style={styles.header}>
        <Title style={styles.title}>Tasks</Title>
        <TaskMenu getTasks={getTasks} tasks={tasks} />
      </View>
      <Divider />
      <FlatList
        scrollEnabled={false}
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item: task }) => (
          <TaskItem tasks={tasks} getTasks={getTasks} task={task}>
            <TaskCheckButton tasks={tasks} getTasks={getTasks} task={task} />
            <View style={styles.taskInfo}>
              <RNText style={styles.taskText}>{task.act}</RNText>
              <RNText style={styles.taskText}> / {task.EP}</RNText>
            </View>
          </TaskItem>
        )}
      />
      {expand === false ? (
        <AddTaskButton getExpand={getExpand} />
      ) : (
        <TaskCreator getExpand={getExpand} getTasks={getTasks} tasks={tasks} task={undefined} />
      )}
    </Stack>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#fff',
  },
  taskInfo: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  taskText: {
    fontWeight: 'bold',
    color: '#BBBBBB',
    fontSize: 17,
  },
});

export default TasksList;