
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

const CountDown = (props) => {
  const { minute, second } = props;

  return (
    <Text style={styles.countdown}>
      {minute < 10 ? `0${minute}` : minute}:
      {second < 10 ? `0${second}` : second}
    </Text>
  );
};

const styles = StyleSheet.create({
  countdown: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 60,
    // transform: [{ translateY: -15 }],
    paddingBottom: 10,
  },
});

export default CountDown;