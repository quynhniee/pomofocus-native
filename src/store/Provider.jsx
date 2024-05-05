import React, { useState, useCallback } from "react";
import TabsContext from "./Context";

const settingDefault = require("./defaultSetting.json");
const tabsDefault = require("./defaultTabs.json"); 

const SettingProvider = ({ children }) => {
	const [setting, setSetting] = useState(settingDefault);
	const [tabs, setTabs] = useState(tabsDefault);

	const [currentThemeColor, setCurrentThemeColor] = useState(
		tabs[0].themeColor
	);

	const updatePomodoro = useCallback(
		(data) => setTabs([data, tabs[1], tabs[2]]),
		[tabs]
	);
	const updateShortBreak = useCallback(
		(data) => setTabs([tabs[0], data, tabs[2]]),
		[tabs]
	);
	const updateLongBreak = useCallback(
		(data) => setTabs([tabs[0], tabs[1], data]),
		[tabs]
	);

	return (
		<TabsContext.Provider
			value={{
				tabs,
				setTabs,
				currentThemeColor,
				setCurrentThemeColor,
				setting,
				setSetting,
				updateLongBreak,
				updatePomodoro,
				updateShortBreak,
			}}
		>
			{children}
		</TabsContext.Provider>
	);
};

export default SettingProvider;