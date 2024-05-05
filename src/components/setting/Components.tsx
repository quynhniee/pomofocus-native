import React, { useState } from 'react';
import { View, StyleSheet, Text, Switch } from 'react-native';
import { Button } from 'react-native-paper';
import Modal from '../Modal';
import Palette from '../Palette';

const List = ({ children }) => <View style={styles.stack}>{children}</View>;

const ListItem = ({ children }) => (
  <View style={styles.listItem}>{children}</View>
);

const Title = ({ children }) => (
  <View style={styles.title}>{children}</View>
);

const TextStyled = props => <Text style={styles.text} {...props} />;

const IOSSwitch = props => <Switch {...props} />;

const ThemeModal = ({ tab, updateTab }) => {
  const [open, setOpen] = useState(false);
  const openHandle = () => setOpen(true);
  const closeHandle = () => setOpen(false);

  return (
    <>
      <Button
        style={{
          minWidth: 0,
          backgroundColor: tab.themeColor,
          width: 27,
          height: 27,
        }}
        onPress={openHandle}
      > </Button>
      <Modal open={open} onClose={closeHandle}>
        <View style={styles.stack}>
          <TextStyled> Pick a color for {tab.name} </TextStyled>
        </View>
        <Palette tab={tab} updateTab={updateTab} closeHandle={closeHandle} />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  stack: {
    flexDirection: 'column',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    color: '#BDBDBD',
    gap: 5,
    marginBottom: 10,
    fontWeight: 'bold',

  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export { List, ListItem, TextStyled as Text, IOSSwitch, Title, ThemeModal };