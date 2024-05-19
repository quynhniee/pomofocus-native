import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Divider } from 'react-native-paper';
import ButtonGroup from './ButtonGroup';
// import Logo from '../Logo';

const AppHeader = () => {
  return (
    <>
      <View style={styles.container}>
        {/* <Logo /> */}
        <ButtonGroup />
      </View>
      <Divider />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 50 : 20,
  },
});

export default AppHeader;