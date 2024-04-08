import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/views/LoginScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/core/theme';
import AppMain from './src/'
export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AppMain/>
    </PaperProvider>
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
