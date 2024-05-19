import React, { useContext } from "react";
import { Button, Dialog, Portal, Text, useTheme } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import Context from "../../store/Context";
import { updateTabs } from "../../api";

const Tab = ({ getActiveTab, getActive, activeTab }) => {
  const { tabs, setTabs, isStarting, setting } = useContext(Context);
  const {autoStartBreak, autoStartPomodoro} = setting
  const { colors } = useTheme();

  const [visible, setVisible] = React.useState(false);
  const [targetTab, setTargetTab] = React.useState(activeTab);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  const confirmDialog = async () => {
    await changeTabHandle(targetTab);
    getActive(targetTab === 0 ? autoStartPomodoro : autoStartBreak)
    setVisible(false);
  };

  const clickTabButtonHandle = async (index: number) => {
    if (isStarting) {
      setTargetTab(index);
      showDialog();
    } else {
      await changeTabHandle(index);
    }
  };

  const changeTabHandle = async (index: number) => {
    getActiveTab(index);
    const newTabs = tabs.map((tab, i) =>
      i === index ? { ...tab, isActive: true } : { ...tab, isActive: false }
    );
    setTabs(newTabs);
    await updateTabs(newTabs);
  };

  const ConfirmDialog = () => {
    return (
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Warning</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">Do you want to cancel this task?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={confirmDialog}>Okay</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  };

  return (
    <>
      <ConfirmDialog />
      <View style={styles.container}>
        {tabs.map((value, index) => (
          <Button
            key={index}
            buttonColor={value.isActive ? colors.primary : colors.background}
            onPress={() => clickTabButtonHandle(index)}
            style={{
              backgroundColor: value.isActive === true ? "#0000002b" : null,
            }}
          >
            <Text
              style={value.isActive ? styles.activeTab : styles.inactiveTab}
            >
              {value.name}
            </Text>
          </Button>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  activeTab: {
    color: "white",
    fontWeight: "bold",
  },
  inactiveTab: {
    color: "white",
  },
});

export default Tab;
