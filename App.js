import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/core/theme';
import AppMain from './src/'
import { Provider } from 'react-redux';
import store from './src/redux/auth';
import SettingProvider from './src/store/Provider';

export default function App() { 

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
