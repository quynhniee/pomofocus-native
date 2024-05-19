import React, { useCallback, useEffect, useMemo, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Button,
  Menu,
  PaperProvider,
  Portal,
  Provider,
  Switch,
  Text,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Title } from "./Components";
import Stack from "../Stack";
import { getAllAlarms, getAllTickings } from "../../api";
import Picker from "react-native-picker-select";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { theme } from "../../core/theme";
import { playPreview } from '../../utils/sound-player';
import { debounce } from 'lodash'; 

const AlarmSelect = ({
  alarmSound,
  setAlarmSound,
  alarmVolume,
  setAlarmVolume,
}) => {
  const [alarms, setAlarms] = useState([]);
  const [selectedAlarm, setSelectedAlarm] = useState(alarmSound);
  const [volume, setVolume] = useState([alarmVolume * 100]); // Default volume


  const debouncedPlayPreview = useCallback(
    debounce(async (selectedAlarm, volume) => {
      await playPreview(selectedAlarm, volume[0] / 100)
      console.log(volume)
    }, 500, { leading: true }),
    []
  );

  useEffect(() => {
    debouncedPlayPreview(selectedAlarm, volume);
  }, [selectedAlarm, volume]); 

  useEffect(() => {
    const fetchAlarms = async () => {
      const response = await getAllAlarms();
      setAlarms(response.data);
    };

    fetchAlarms();
  }, []);

  return (
    <Stack flexDirection="row" alignInline="space-between">
      <Text>Alarm sound</Text>
      <Stack flexDirection="column" flexGrow={0}>
        <Picker
          placeholder={{ label: "Select an alarm", value: null }}
          onValueChange={(value) => {
            setSelectedAlarm(value);
            setAlarmSound(value);
          }}
          items={alarms.map((alarm) => ({
            label: alarm.name,
            value: alarm.sound,
          }))}
          value={selectedAlarm}
        />
        <Stack flexDirection="row" alignBlock="center" gap={10}>
          <Text style={{ marginEnd: 20 }}>{volume}</Text>
          <MultiSlider
            selectedStyle={{ backgroundColor: theme.colors.primary }}
            values={volume}
            onValuesChange={(values) => {
              setVolume(values);
              setAlarmVolume(values[0] / 100);
            }}
            min={0}
            max={100}
            step={1}
            sliderLength={150}
            valuePrefix="Volume: "
            markerStyle={{
              height: 20,
              width: 20,
              backgroundColor: theme.colors.primary,
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

const TickingSelect = ({
  tickingSound,
  setTickingSound,
  tickingVolume,
  setTickingVolume,
}) => {
  const [tickings, setTickings] = useState([]);
  const [selectedTicking, setSelectedTicking] = useState(tickingSound);
  const [volume, setVolume] = useState([tickingVolume * 100]); // Default volume

  const debouncedPlayPreview = useCallback(
    debounce(async (selectedTicking, volumeData) => {
      await playPreview(selectedTicking, volumeData[0] / 100)
      console.log(volumeData)
    }, 500, { leading: true }),
    []
  );

  useEffect(() => {
    const fetchTickings = async () => {
      const response = await getAllTickings();
      setTickings(response.data);
    };

    fetchTickings();
  }, []);

  useEffect(() => {
    debouncedPlayPreview(selectedTicking, volume);
  }, [selectedTicking, volume]); 


  return (
    <Stack flexDirection="row" alignInline="space-between">
      <Text>Ticking sound</Text>
      <Stack flexDirection="column" flexGrow={0}>
        <Picker
          placeholder={{ label: "Select an ticking", value: null }}
          onValueChange={(value) => {
            setSelectedTicking(value);
            setTickingSound(value);
          }}
          items={tickings.map((ticking) => ({
            label: ticking.name,
            value: ticking.sound,
          }))}
        />
        <Stack flexDirection="row" alignBlock="center" gap={10}>
          <Text style={{ marginEnd: 20 }}>{volume}</Text>
          <MultiSlider
            selectedStyle={{ backgroundColor: theme.colors.primary }}
            values={volume}
            onValuesChange={(values) => {
              setVolume(values);
              setTickingVolume(values[0] / 100);
            }}
            min={0}
            max={100}
            step={1}
            sliderLength={150}
            valuePrefix="Volume: "
            markerStyle={{
              height: 20,
              width: 20,
              backgroundColor: theme.colors.primary,
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

const Sound = ({
  alarmSound,
  setAlarmSound,
  alarmVolume,
  setAlarmVolume,
  tickingSound,
  setTickingSound,
  tickingVolume,
  setTickingVolume,
}) => {
  return (
    <Stack>
      <Title>
        <Icon name="volume-up" size={20} color="#000" />
        <Text style={styles.uppercaseText}>sound</Text>
      </Title>
      <Stack>
        <AlarmSelect
          alarmSound={alarmSound}
          alarmVolume={alarmVolume}
          setAlarmSound={setAlarmSound}
          setAlarmVolume={setAlarmVolume}
        />
        <TickingSelect
          tickingSound={tickingSound}
          setTickingSound={setTickingSound}
          tickingVolume={tickingVolume}
          setTickingVolume={setTickingVolume}
        />
      </Stack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
  uppercaseText: {
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default Sound;
