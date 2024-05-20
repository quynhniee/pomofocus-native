import React, { useRef, useState } from "react";
import { IconButton, Menu, Divider } from "react-native-paper";
import { View } from "react-native";
import { addTask, deleteTask, updateTask } from "../../api";
import { handleImport } from "../../utils/excel-reader";
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../../redux/toast';

const TaskMenu = ({ getTasks, tasks }) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const dispatch = useDispatch();

  const clearActHandle = async() => {
    const newTasks = tasks.map((t) => t.isCompleted ? t : ({ ...t, act: 0 }));
    getTasks(newTasks);
    newTasks.map(async (t) => {
      await updateTask(t.id, t);
    });
    closeMenu();
  };

  const clearAllHandle = () => {
    getTasks([]);
    tasks.map(async (t) => {
      await deleteTask(t.id);
    });

    dispatch(showSnackbar("All tasks cleared successfully!"));
    closeMenu();
  };

  const clearFinishedHandle = async () => {
    const newTasks = tasks.filter((t) => t.isCompleted === false);
    getTasks(newTasks);
    tasks.map(async (t) => {
      if (t.isCompleted) {
        await deleteTask(t.id);
      }
    });
    dispatch(showSnackbar("Finished tasks cleared successfully!"));

    closeMenu();
  };

  const importTasksFromExcelHandle = async (f: any) => {
    const importedTasks = await handleImport(f);
    importedTasks.forEach(async (t) => {
      await addTask(t);
    })
    getTasks(tasks.concat(importedTasks));
    dispatch(showSnackbar("Tasks imported successfully!"));
    closeMenu();
  };

  return (
    <>
      <View>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <IconButton
              iconColor="white"
              icon="dots-vertical"
              size={24}
              onPress={openMenu}
            />
          }
        >
          <Menu.Item
            onPress={importTasksFromExcelHandle}
            title="Import task from excel"
          />
          <Divider />
          <Menu.Item
            onPress={clearFinishedHandle}
            title="Clear finished tasks"
          />
          <Menu.Item onPress={clearActHandle} title="Clear act pomodoros" />
          <Divider />
          <Menu.Item onPress={clearAllHandle} title="Clear all tasks" />
        </Menu>
      </View>
    </>
  );
};

export default TaskMenu;
