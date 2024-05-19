import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Button, Dialog, Divider, IconButton, List, Portal, Title, Text } from 'react-native-paper';
import TaskMenu from './TaskMenu';
import AddTaskButton from './AddTaskButton';
import TaskItem from './TaskItem';
import TaskCheckButton from './TaskCheckButton';
import TaskCreator from './TaskCreator';
import Stack from '../Stack';
import Context from '../../store/Context';

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
              <Text style={styles.taskText}>{task.act}</Text>
              <Text style={styles.taskText}> / {task.EP}</Text>
            </View>
          </TaskItem>
        )}
      />
      <View style={{marginBottom: 40}}>
        
        {expand === false ? (
          <AddTaskButton getExpand={getExpand} />
        ) : (
          <TaskCreator getExpand={getExpand} getTasks={getTasks} tasks={tasks} task={undefined} />
        )}
      </View>
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