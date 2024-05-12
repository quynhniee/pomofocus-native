import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { View, Text, StyleSheet, Animated, ScrollView } from "react-native";
import AppHeader from "../components/header";
import CountDownBox from "../components/countdown";
import { theme } from "../core/theme";
import Context from "../store/Context";
import Stack from "../components/Stack";
import TasksList from "../components/task";
import { getAllTask } from "../api";
import useSnackbar from "../hooks/useSnackbar";
import { Snackbar } from "react-native-paper";

const HomeScreen = () => {
  const { showSnackbar, hideSnackbar, message } = useSnackbar();

  const { currentThemeColor } = useContext(Context);
  const [tasks, setTasks] = useState([]);
  const colorAnimation = useRef(new Animated.Value(0)).current;
  const animatedColorRef = useRef(currentThemeColor);

  const backgroundColor = colorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [animatedColorRef.current, currentThemeColor],
  });

  useEffect(() => {
    animatedColorRef.current = currentThemeColor;
    colorAnimation.setValue(0);
    Animated.timing(colorAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [currentThemeColor]);

  useEffect(() => {
    getAllTask()
      .then((res) => res.data)
      .then((data) => {
        setTasks(data);
      });
  }, []);
  const [activeTab, setActiveTab] = useState(0);
  const defaultActiveItem = useCallback(() => {
    for (const task of tasks) if (task.isActive === true) return task;
    return {
      content: activeTab === 0 ? "Time to focus!" : "Time for a break!",
    };
  }, [activeTab, tasks]);
  const [activeItem, setActiveItem] = useState(defaultActiveItem);
  const [counter, setCounter] = useState(0);
  const [actNumber, setActNumber] = useState(0);
  const [pomosNumber, setPomosNumber] = useState(0);
  const getActiveTab = useCallback((data) => setActiveTab(data), []);
  const increaseCounter = useCallback(() => setCounter(counter + 1), [counter]);
  const getTasks = useCallback((data) => setTasks(data), []);

  useEffect(() => {
    setActiveItem(defaultActiveItem());
    const act = tasks.reduce((sum, val) => sum + val.act, 0);
    const pomos = tasks.reduce(
      (sum, val) => sum + Math.max(val.act, val.EP),
      0
    );
    setActNumber(act);
    setPomosNumber(pomos);
  }, [activeTab, defaultActiveItem, tasks]);

  return (
    <>
      <Snackbar
        visible={true}
        onDismiss={hideSnackbar}
        duration={Snackbar.DURATION_SHORT}
      >
        {message}
      </Snackbar>
      <Animated.View style={{ flex: 1, backgroundColor: backgroundColor }}>
        <AppHeader />
        <ScrollView style={{ padding: 20 }}>
          <Stack>
            <CountDownBox
              counter={counter}
              increaseCounter={increaseCounter}
              activeTab={activeTab}
              getActiveTab={getActiveTab}
              activeItem={activeItem}
              tasks={tasks}
              getTasks={getTasks}
            />

            <Stack alignInline="center" flexDirection="row" gap={5}>
              <Text style={styles.contentText}>#{counter}</Text>
              <Text style={styles.contentText}>{activeItem.content}</Text>
            </Stack>
            <TasksList tasks={tasks} getTasks={getTasks} />
          </Stack>
        </ScrollView>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  contentText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default HomeScreen;
