import React, { useState } from 'react';
import { List, IconButton, Text } from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity, Text as RNText } from 'react-native';
import TaskExpandButton from './TaskExpandButton';
import TaskCreator from './TaskCreator';
import Stack from '../Stack';

const TaskItem = ({ tasks, getTasks, task, children }) => {
  const [expand, setExpand] = useState(false);
  const clickHandle = () => {
    getTasks(
      tasks.map((t) =>
        task.id === t.id
          ? { ...task, isActive: true }
          : { ...t, isActive: false }
      )
    );
  };
  const getExpand = (data) => setExpand(data);
  return (
    <>
      {expand === false ? (
        <TouchableOpacity style={styles.listItem} onPress={clickHandle}>
          <Stack flexDirection='row'>
            <Stack flexDirection='row' alignInline='space-between' alignBlock='center'>
              {children}
            </Stack>
              <IconButton
                icon="dots-vertical"
                onPress={(e) => {
                  e.stopPropagation();
                  setExpand(true);
                }}
              />
          </Stack>
        </TouchableOpacity>
      ) : (
        <TaskCreator
          getExpand={getExpand}
          task={task}
          getTasks={getTasks}
          tasks={tasks}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default TaskItem;