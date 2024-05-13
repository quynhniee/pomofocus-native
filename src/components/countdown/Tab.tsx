import React, { useContext } from 'react';
import { Button, Text, useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import Context from '../../store/Context';
import { updateTabs } from '../../api';

const Tab = ({ getActiveTab, getActive }) => {
  const { tabs, setTabs } = useContext(Context);
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {tabs.map((value, index) => (
        <Button
          key={index}
          buttonColor={value.isActive ? colors.primary : colors.background}
          onPress={async() => {
            getActiveTab(index);
            const newTabs =  tabs.map((tab, i) =>
                i === index
                  ? { ...tab, isActive: true }
                  : { ...tab, isActive: false }
              )
            setTabs(
             newTabs
            );
            await updateTabs(newTabs);
            getActive(false);
          }}
          style={{
						backgroundColor:
							value.isActive === true ? "#0000002b" : null,
          }}
        >
          <Text style={value.isActive ? styles.activeTab : styles.inactiveTab}>
            {value.name}
          </Text>
        </Button>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  activeTab: {
    color: 'white',
    fontWeight: 'bold',
  },
  inactiveTab: {
    color: 'white',
  },
});

export default Tab;