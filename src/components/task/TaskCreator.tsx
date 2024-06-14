import React, { useState, useCallback, useContext } from 'react';
import { Button, Card, TextInput } from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity, Text as RNText, TouchableWithoutFeedback, Keyboard } from 'react-native';
import EstPomodoros from './EstPomodoros';
import Stack from '../Stack';
import { addTask, deleteTask, updateTask } from '../../api';
import Context from '../../store/Context';

const TaskCreator = ({ getExpand, task, tasks, getTasks }) => {
  const { currentThemeColor } = useContext(Context);
  const [taskUpdate, setTaskUpdate] = useState(
    task
      ? task
      : {
          id: 'id' + new Date().getTime(),
          content: '',
          isActive: false,
          isCompleted: false,
        }
  );
  const [content, setContent] = useState(taskUpdate.content);
  const getTaskUpdate = useCallback(
    (data) => {
      setTaskUpdate({ ...taskUpdate, act: data.act, EP: data.EP });
      return;
    },
    [taskUpdate]
  );
  const saveHandle = async () => {
    const newTask = { ...taskUpdate, content: content };
    if (newTask.content.trim() === '') return;
    if (task) {
      getTasks(tasks.map((t) => (t.id === taskUpdate.id ? newTask : t)));
        updateTask(task.id, newTask);
    } else {
      getTasks(tasks.concat([newTask]));
      await addTask({ ...newTask });
    }
    getExpand(false);
  };
  const removeHandle =  async () => {
    getTasks(tasks.filter((t) => t.id !== task.id));
    await deleteTask(task.id);
    getExpand(false);
  };
  return (
    <TouchableWithoutFeedback onPress={() => getExpand(false)} accessible={false}>
      <Card style={styles.card}>
        <View style={styles.container}>
          <TextInput
            mode="outlined"
            style={styles.input}
            placeholder="What are you working on?"
            autoFocus
            defaultValue={taskUpdate.content}
            value={content}
            onChangeText={(value) => setContent(value)}
          />
          <EstPomodoros task={task} getTaskUpdate={getTaskUpdate} />
          <Stack flexDirection='row' columnGap={10}>
            {['+ Add Note', '+ Add Project'].map((e, index) => (
              <TouchableOpacity key={index}>
                <RNText style={styles.buttonText}>{e}</RNText>
              </TouchableOpacity>
            ))}
          </Stack>
        </View>
        <Card.Actions style={styles.actions}> 
          <Stack flexDirection='row' flex={1} justifyContent='space-between' flexWrap='nowrap' columnGap={20}>
            {task ? (
              <Button mode='contained-tonal'  buttonColor={currentThemeColor + '50'} onPress={removeHandle}>
                Delete
              </Button>
            ) : null}
            <Stack flexDirection='row' columnGap={10}>
              <Button mode="contained" buttonColor={currentThemeColor} onPress={() => getExpand(false)}>
                Cancel
              </Button>
              <Button mode="contained" buttonColor={currentThemeColor} onPress={saveHandle} disabled={!content || content === ''}>
                Save
              </Button>
            </Stack>
          </Stack>
        </Card.Actions>
      </Card>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  container: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#999999',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  actions: {
    backgroundColor: '#efefef',
    padding: 10,
  },
});

export default TaskCreator;