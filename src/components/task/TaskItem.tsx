import React, { useContext, useEffect, useState } from "react";
import { List, IconButton, Text, Portal, Dialog, Button } from "react-native-paper";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text as RNText,
} from "react-native";
import TaskCreator from "./TaskCreator";
import Stack from "../Stack";
import { updateTask } from "../../api";
import Context from '../../store/Context';

const TaskItem = ({ tasks, getTasks, task, children }) => {
  const [expand, setExpand] = useState(false);
  const [visible, setVisible] = React.useState(false);
  const {currentTask, isStarting, setCurrentTask} = useContext(Context)
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const updateCurrentTask = async () => {
    setCurrentTask({ ...task, isActive: true })
    const newTasks = tasks.map((t) =>
      task.id === t.id ? { ...task, isActive: true } : { ...t, isActive: false }
    );
    getTasks(newTasks);
    await newTasks.forEach((t) => {
      updateTask(t.id, t);
    });
  }

  const confirmDialog = async () => {
   await updateCurrentTask()
    setVisible(false);

  };

  const ConfirmDialog = () => {
    return <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Warning</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">Do you want to switch task?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
              <Button onPress={confirmDialog}>Okay</Button>

            </Dialog.Actions>
          </Dialog>
        </Portal>
  }


  const clickHandle = async () => {
    if (isStarting) {
      showDialog()
    }
    else {
      await updateCurrentTask()
    }
   
  };
  const getExpand = (data) => setExpand(data);
  return (
    <>
      <ConfirmDialog />
      {expand === false ? (
        <TouchableOpacity style={styles.listItem} onPress={clickHandle}>
          <Stack flexDirection="row" borderLeftWidth={task.isActive ? 2 : 0}>
            <Stack
              flexDirection="row"
              alignInline="space-between"
              alignBlock="center"
            >
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
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  listItemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default TaskItem;
