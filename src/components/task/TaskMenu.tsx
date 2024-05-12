import React, { useRef, useState } from 'react';
import { IconButton, Menu, Divider } from 'react-native-paper';
import { View, StyleSheet, TouchableOpacity, Text as RNText } from 'react-native';



const TaskMenu = ({ getTasks, tasks }) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  
  const clearActHandle = () => {
    const newTasks = tasks.map((t) => ({ ...t, act: 0 }));
    getTasks(newTasks);
    closeMenu();
  };

  const clearAllHandle = () => {
    getTasks([]);
    closeMenu();
  };

  const clearFinishedHandle = () => {
    const newTasks = tasks.filter((t) => t.isCompleted === false);
    getTasks(newTasks);
    closeMenu();
  };


  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<IconButton iconColor='white' icon="dots-vertical" size={24} onPress={openMenu} />}
      > 
        <Menu.Item onPress={clearFinishedHandle} title="Clear finished tasks" />
        <Menu.Item onPress={clearActHandle} title="Clear act pomodoros" />
        {/* <Menu.Item onPress={closeMenu} title="Save as routine" />
        <Menu.Item onPress={closeMenu} title="Add from routines" /> */}
        <Divider />
        <Menu.Item onPress={clearAllHandle} title="Clear all tasks" />
      </Menu>
    </View>
  );
};

export default TaskMenu;