import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/core/theme';
import AppMain from './src/'
import { Provider } from 'react-redux';
import store from './src/redux/auth';
import SettingProvider from './src/store/Provider';

export default function App() { 
  const error = console.error;
console.error = (...args) => {
  if (/defaultProps/.test(args[0])) return;
  error(...args);
};

  return (
    <Provider store={store}>
      <SettingProvider>
        <PaperProvider theme={theme}>
          <AppMain/>
        </PaperProvider>
      </SettingProvider>
    </Provider>
  );
}

