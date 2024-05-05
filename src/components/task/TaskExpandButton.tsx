import React from "react";
import { Button } from 'react-native';
import { IconButton } from 'react-native-paper';

const TaskExpandButton = ({ onClick }) => {
  // const clickHandle = (e) => {
  //   e.stopPropagation();
  // };
  return (
    <IconButton
    icon='chevron-down'
      onPress={onClick}
      iconColor='#999999'
        
    />
  );
};

export default TaskExpandButton;