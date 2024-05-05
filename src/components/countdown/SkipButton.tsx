import React from 'react';
import { IconButton } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const SkipButton = ({ onClick, style }) => {
  return (
    <View style={style}>
      <IconButton
        icon="skip-next"
        iconColor='white'
        size={50}
        onPress={onClick}
      />
    </View>
  );
};



export default SkipButton;