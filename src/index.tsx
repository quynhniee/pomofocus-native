import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { LoginScreen, RegisterScreen } from './views';



const Router = createStackNavigator(
  {
    LoginScreen,
    RegisterScreen,
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);