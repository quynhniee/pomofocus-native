import React, { useEffect, useState } from 'react';
import { Button, IconButton, TextInput } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Stack from '../Stack';
import { theme } from '../../core/theme';

const EstPomodoros = ({ task, getTaskUpdate }) => {
  const [act, setAct] = useState(task ? task.act : 0);
  const [EP, setEP] = useState(task ? task.EP : 1);

  useEffect(() => {
    if (act < 0) setAct(0);
    if (EP < 0) setEP(0);
    getTaskUpdate({ ...task, act: act, EP: EP });
    return;
  }, [act, EP]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {task ? 'Act / Est Pomodoros' : 'Est Pomodoros'}
      </Text>
      <View style={styles.row}>
        {task ? (
          <View style={styles.row}>
            <TextInput
              mode="flat"
              style={styles.input}
              keyboardType="numeric"
              onChangeText={(value) => {
                let tmp = +value;
                setAct(tmp >= 1 ? (tmp) : (tmp * 10) / 10);
              }}
              value={act.toString()}
            />
            <Text style={styles.separator}>/</Text>
          </View>
        ) : null}
        <TextInput
          mode='flat'
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(value) => {
            let tmp = +value;
            setEP(tmp >= 1 ? (tmp) : (tmp * 10) / 10);
          }}
          value={EP.toString()}
        />
        <Stack flexDirection='row'>
          <IconButton
            mode='contained-tonal'
            icon='arrow-up'
            onPress={() => {
              if (EP > 0) setEP(EP >= 1 ? EP + 1 : (EP * 10 + 1) / 10);
            }}
          />
          <IconButton
            mode='contained-tonal'
            icon='arrow-down'
            onPress={() => {
              if (EP > 0) setEP(EP > 1 ? EP - 1 : (EP * 10 - 1) / 10);
            }}
          />
        </Stack>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    width: 75,
    fontWeight: 'bold',
    height: 40,
  },
  separator: {
    color: '#999999',
    marginHorizontal: 5,
  },
});

export default EstPomodoros;