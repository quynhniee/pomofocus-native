import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { View, StyleSheet } from "react-native";
import Context from "../../store/Context";
import Tab from "./Tab";
import TimerButton from "./TimerButton";
import CountDown from "./Countdown";
import { updateTask } from "../../api";
import { Audio } from "expo-av";

const CountDownBox = ({
  counter,
  increaseCounter,
  activeTab,
  getActiveTab,
  activeItem,
  tasks,
  getTasks,
}) => {
  const { tabs, setTabs, setting, currentThemeColor, setCurrentThemeColor, setIsStarting, setCurrentTask } =
    useContext(Context);

  const {
    autoStartBreak,
    autoStartPomodoro,
    autoSwitchTasks,
    longBreakInterval,
  } = setting;

  const [active, setActive] = useState(
    activeTab === 0 ? autoStartPomodoro : autoStartBreak
  );
  const [minute, setMinute] = useState(tabs[activeTab].minute);
  const [second, setSecond] = useState(tabs[activeTab].second);
  const [alarm, setAlarm] = useState(null);

  async function playTickingSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      { uri: 'https://drive.google.com/uc?export=download&id=1yg61IYjdqLXmaPm8-01aDRN-5qRW2ake'}
    );
    setAlarm(sound);
    await sound.setIsLoopingAsync(true);
    await sound.playAsync();
  }

  async function playSoundPreview(soundFilePath: string) {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      { uri: 'https://drive.google.com/uc?export=download&id=1yg61IYjdqLXmaPm8-01aDRN-5qRW2ake'}
    );
    setAlarm(sound);
    await sound.playAsync();
    // Stop the sound after 5 seconds
  setTimeout(async () => {
    await sound.stopAsync();
  }, 5000);
}

  const getActive = useCallback((data) => {
    setActive(data);
  }, []);

  function updateItemAct() {
    let newItem = { ...activeItem, act: activeItem.act + 1 };
    updateTask(activeItem.id, newItem);
    let newTasks = tasks.map((task) =>
      task.id === activeItem.id ? newItem : task
    );
    if (autoSwitchTasks === true && newItem.act >= newItem.EP) {
      const index = tasks.indexOf(activeItem);
      const length = tasks.length;
      newItem = {
        ...newItem,
        isActive: true,
        isCompleted: true,
      };
      newTasks = newTasks.map((task, i) => {
        if (index === i)
          return {
            ...task,
            isCompleted: true,
            isActive: index !== length - 1 ? false : true,
          };
        if (index + 1 < length && index + 1 === i)
          return { ...task, isActive: true };
        return task;
      });
    }
    return newTasks;
  }

  function changeTab() {
    if (tabs[activeTab] === tabs[0]) {
      getActive(autoStartBreak);
      increaseCounter();
      getTasks(updateItemAct());
      // playAlarm();
      playSoundPreview("../../../assets/alarms/clock-alarm-8761.mp3");
      if ((counter + 1) % longBreakInterval === 0) {
        getActiveTab(2);
        setTabs(
          tabs.map((tab, index) =>
            index === 2
              ? { ...tab, isActive: true }
              : { ...tab, isActive: false }
          )
        );
      } else {
        getActiveTab(1);
        setTabs(
          tabs.map((tab, index) =>
            index === 1
              ? { ...tab, isActive: true }
              : { ...tab, isActive: false }
          )
        );
      }
    } else {
      getActive(autoStartPomodoro);
      getActiveTab(0);
      setTabs(
        tabs.map((tab, index) =>
          index === 0 ? { ...tab, isActive: true } : { ...tab, isActive: false }
        )
      );
    }
  }


  useEffect(() => {
    setMinute(tabs[activeTab].minute);
    setSecond(tabs[activeTab].second);
    setCurrentThemeColor(tabs[activeTab].themeColor);
    // setActive(activeTab === 0 ? autoStartPomodoro : autoStartBreak)
    setCurrentTask(tasks.find((task) => task.isActive === true));
  }, [activeTab, tabs, tasks]);

  useEffect(() => {
    return alarm
      ? () => {
          console.log("Unloading Sound");
          alarm.unloadAsync();
        }
      : undefined;
  }, [alarm]);

  useEffect(() => {
    if (minute === 0 && second === 0) {
      playSoundPreview("../../../assets/alarms/clock-alarm-8761.mp3");
    }
  }, [minute, second]);

  useEffect(() => {
    setIsStarting(active);
    if (!active && alarm) alarm.stopAsync();
    else if (active && alarm) playTickingSound();
  }, [active])

  useEffect(() => {
    const timerInterval =
      active === true
        ? setInterval(() => {
            if (second > 0) setSecond(second - 1);
            else {
              if (minute > 0) {
                setMinute(minute - 1);
                setSecond(59);
              } else {
                clearInterval(timerInterval);
                changeTab();
              }
            }
          }, 1000)
        : null;
    return () => clearInterval(timerInterval);
  });

  return (
    <View style={styles.container}>
      <Tab getActiveTab={getActiveTab} getActive={getActive} />
      <CountDown minute={minute} second={second} />
      <TimerButton
        themeColor={currentThemeColor}
        getActive={getActive}
        active={active}
        changeTab={changeTab}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff2b",
    borderRadius: 10,
    padding: 20,
    paddingBottom: 30,
    alignItems: "center",
    position: "relative",
  },
  skipButton: {
    // position: 'absolute',
    // bottom: -35,
    // right: -140,
  },
});

export default CountDownBox;
