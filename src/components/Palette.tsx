import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Stack from './Stack';

const colors = [
  '#ba4949',
  '#38858a',
  '#397097',
  '#a4893c',
  '#7d53a2',
  '#af4e91',
  '#518a58',
  '#545764',
];

const Palette = ({ tab, updateTab, closeHandle }) => {
  const [color, setColor] = useState(tab.themeColor);

  const handleChooseColor = newColor => {
    updateTab({ ...tab, themeColor: newColor });
    setColor(newColor);
    closeHandle();
  };

  return (
    <Stack flexDirection='row' rowGap={15} alignInline='space-evenly'> 
      {colors.map(c => (
        <TouchableOpacity
          key={c}
          style={[styles.button, { backgroundColor: c }]}
          onPress={() => handleChooseColor(c)}
        >
          {c === color ? <Icon name="check" size={40} color="#fff" /> : null}
        </TouchableOpacity>
      ))}
    </Stack>
  );
};

const styles = StyleSheet.create({
  
  button: {
    borderRadius: 8,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Palette;