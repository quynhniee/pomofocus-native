import React from "react";
import { Button, Text, useTheme } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import SkipButton from './SkipButton';

const TimerButton = ({ themeColor, getActive, active, changeTab }) => {
  const clickHandle = () => {
    getActive(!active); 
  };

  return (
    <View style={styles.container}>
      <Button style={styles.disabledButton} disabled children={""}></Button>
      <Button
        rippleColor={themeColor + '20'}
        style={[
          styles.button,
          { transform: [{ translateY: active === false ? -10 : 0 }] }, 
        ]}
        onPress={clickHandle} 
      >
        <Text style={[styles.text, { color: themeColor }]}>
          {active === false ? "Start" : "Pause"}
        </Text>
      </Button>
      {active === true ? <SkipButton style={styles.skipButton} onClick={changeTab} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  disabledButton: {
    position: "absolute",
    width: 120,
    backgroundColor: "#ebebeb",
    transform: [{ translateY: 0 }],
    height: 40,
    borderRadius: 5,
  },
  button: {
    position: 'absolute',
    backgroundColor: "white",
    width: 120,
    zIndex: 3,
    height: 40,
    borderRadius: 5,
    // transition: "0.2s all ease",
  },
  text: {
    fontWeight: "bold",
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  skipButton: {
    position: 'absolute',
    bottom: -35,
    right: -140,
  },
});

export default TimerButton;
