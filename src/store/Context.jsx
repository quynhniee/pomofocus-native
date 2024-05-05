import { createContext } from "react";

const Context = createContext({
	tabs: [
		{
			"name": "Pomodoro",
			"minute": 25,
			"second": 0,
			"themeColor": "#ba4949",
			"isActive": true
		},
		{
			"name": "Short Break",
			"minute": 5,
			"second": 0,
			"themeColor": "#38858a",
			"isActive": false
		},
		{
			"name": "Long Break",
			"minute": 10,
			"second": 0,
			"themeColor": "#397097",
			"isActive": false
		}

	],
	setTabs: (any) => {},
	currentThemeColor: "#ba4949",
	setCurrentThemeColor: (any) => {},
	setting: {
		"autoStartBreak": false,
		"autoStartPomodoro": false,
		"longBreakInterval": 4,
		"autoSwitchTasks": false,
		"alarmSound": "/pomofocus-/static/media/dog-sound.68a11d6805471469a5ea.wav",
		"alarmVolume": 0.5,
		"alarmSoundRepeat": 1,
		"tickingSound": "none",
		"tickingVolume": 0.5
	},
	setSetting: (any) => {},
	updateLongBreak: (any) => {},
	updatePomodoro: (any) => {},
	updateShortBreak: (any) => {},
});

export default Context;