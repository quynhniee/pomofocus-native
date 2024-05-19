import React, { useContext, useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import {
  Switch,
  Text as RNText,
  Divider,
  IconButton,
  Button,
  Snackbar,
} from "react-native-paper";
import Context from "../../store/Context";
import { getSetting, getTabs, updateSetting, updateTabs } from "../../api";
import TimerSetting from "./Timer";
import TaskSetting from "./Task";
import ThemeSetting from "./Theme";
import Modal from "../Modal";
import Stack from "../Stack";
import useSnackbar from "../../hooks/useSnackbar";
import Sound from "./Sound";

const SettingButton = () => {
  const { showSnackbar, hideSnackbar, message, visible } = useSnackbar();
  const { setting, setSetting, tabs, setTabs } = useContext(Context);

  const pomodoro = tabs[0],
    shortBreak = tabs[1],
    longBreak = tabs[2];
  const [open, setOpen] = useState(false);
  const [pomodoroMinute, setPomodoroMinute] = useState(pomodoro.minute);
  const [shortBreakMinute, setShortBreakMinute] = useState(shortBreak.minute);
  const [longBreakMinute, setLongBreakMinute] = useState(longBreak.minute);
  const [autoStartBreak, setAutoStartBreak] = useState(setting.autoStartBreak);
  const [autoStartPomodoro, setAutoStartPomodoro] = useState(
    setting.autoStartPomodoro
  );
  const [longBreakInterval, setLongBreakInterval] = useState(
    setting.longBreakInterval
  );
  const [autoSwitchTasks, setAutoSwitchTasks] = useState(
    setting.autoSwitchTasks
  );
  const [alarmSound, setAlarmSound] = useState(setting.alarmSound);
  const [alarmVolume, setAlarmVolume] = useState(setting.alarmVolume);
  const [alarmSoundRepeat, setAlarmSoundRepeat] = useState(
    setting.alarmSoundRepeat
  );
  const [tickingSound, setTickingSound] = useState(setting.tickingSound);
  const [tickingVolume, setTickingVolume] = useState(setting.tickingVolume);
  const getPomodoroMinute = useCallback((data) => setPomodoroMinute(data), []);
  const getShortBreakMinute = useCallback(
    (data) => setShortBreakMinute(data),
    []
  );
  const getLongBreakMinute = useCallback(
    (data) => setLongBreakMinute(data),
    []
  );
  const toggleStartBreak = useCallback(
    () => setAutoStartBreak(!autoStartBreak),
    [autoStartBreak]
  );
  const toggleStartPomodoro = useCallback(
    () => setAutoStartPomodoro(!autoStartPomodoro),
    [autoStartPomodoro]
  );
  const getLongBreakInterval = useCallback(
    (data) => setLongBreakInterval(data),
    []
  );
  const toggleSwitchTasks = useCallback(
    () => setAutoSwitchTasks(!autoSwitchTasks),
    [autoSwitchTasks]
  );

  const openHandle = () => setOpen(true);
  const closeHandle = () => setOpen(false);

  const updateTabsStorage = () => {
    const _tabs = [
      { ...pomodoro, minute: pomodoroMinute },
      { ...shortBreak, minute: shortBreakMinute },
      { ...longBreak, minute: longBreakMinute },
    ];
    setTabs(_tabs);
    updateTabs(_tabs);
  };

  const updateSettingStorage = () => {
    const _setting = {
      autoStartBreak,
      autoStartPomodoro,
      longBreakInterval,
      autoSwitchTasks,
      alarmSound,
      alarmVolume,
      alarmSoundRepeat,
      tickingSound,
      tickingVolume,
    };
    setSetting(_setting);
    updateSetting(_setting);
    console.log(_setting)
  };

  const saveHandle = () => {
    updateTabsStorage();
    updateSettingStorage();
    setOpen(false);
    showSnackbar("Settings saved!");
  };

  useEffect(() => {
    getSetting()
      .then((resp) => resp?.data)
      .then((data) => {
        if (data) setSetting(data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    getTabs()
      .then((res) => res?.data)
      .then((data) => {
        if (data) setTabs(data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAutoStartBreak(setting.autoStartBreak);
    setAutoStartPomodoro(setting.autoStartPomodoro);
    setPomodoroMinute(pomodoro.minute);
    setLongBreakMinute(longBreak.minute);
    setShortBreakMinute(shortBreak.minute);
    setAutoSwitchTasks(setting.autoSwitchTasks);
    setLongBreakInterval(setting.longBreakInterval);
    setAlarmSound(setting.alarmSound);
    setAlarmVolume(setting.alarmVolume);
    setAlarmSoundRepeat(setting.alarmSoundRepeat);
    setTickingSound(setting.tickingSound);
    setTickingVolume(setting.tickingVolume);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setting]);

  return (
    <>
      <IconButton icon="cog" iconColor="white" onPress={openHandle} />
      <View style={styles.container}>
        <Modal open={open} onClose={closeHandle}>
          <View style={styles.row}>
            <RNText style={styles.boldText}>Setting</RNText>
            <IconButton icon="close" onPress={closeHandle} />
          </View>
          <Divider />

          <ScrollView>
            <View style={styles.settings}>
              <Stack marginBottom={20}>
                <TimerSetting
                  getPomodoroMinute={getPomodoroMinute}
                  getShortBreakMinute={getShortBreakMinute}
                  getLongBreakMinute={getLongBreakMinute}
                  toggleStartBreak={toggleStartBreak}
                  toggleStartPomodoro={toggleStartPomodoro}
                  getLongBreakInterval={getLongBreakInterval}
                  longBreakInterval={longBreakInterval}
                  autoStartBreak={autoStartBreak}
                  autoStartPomodoro={autoStartPomodoro}
                />
                <Divider />
                <Sound
                  alarmSound={alarmSound}
                  setAlarmSound={setAlarmSound}
                  alarmVolume={alarmVolume}
                  setAlarmVolume={setAlarmVolume}
                  tickingSound={tickingSound}
                  setTickingSound={setTickingSound}
                  tickingVolume={tickingVolume}
                  setTickingVolume={setTickingVolume}
                   />
                <Divider />
                <TaskSetting
                  autoSwitchTasks={autoSwitchTasks}
                  toggleSwitchTasks={toggleSwitchTasks}
                />
                <Divider />

                <ThemeSetting />
              </Stack>
              <View>
                <Stack
                  alignInline="center"
                  flexDirection="row"
                  alignBlock="center"
                >
                  <Button onPress={saveHandle} mode="contained-tonal">
                    Save
                  </Button>
                </Stack>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </View>
      <Snackbar
        style={{ zIndex: 1000 }}
        duration={Snackbar.DURATION_SHORT}
        onDismiss={hideSnackbar}
        visible={visible}
      >
        {message}
      </Snackbar>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  boldText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  settings: {
    padding: 15,
    marginBottom: 100,
  },
  footer: {},
});

export default SettingButton;
