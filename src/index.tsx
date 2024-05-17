import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./views/LoginScreen"; // Import các màn hình của bạn
import { HomeScreen, RegisterScreen } from "./views";
import { useDispatch, useSelector } from "react-redux";
import { getItem } from "./utils/storage";
import { useEffect } from "react";
import { authAction } from "./redux/auth/auth";
import { useJwt } from "react-jwt";
import { setHeader } from "./api";
import axios from "axios";
import Context from "./store/Context";

const Stack = createStackNavigator();
const Router = () => {
  // axios.defaults.baseURL = "http://10.0.2.2:5001/api/";
  axios.defaults.baseURL = "http://192.168.1.250:5001/api/";
  const dispatch = useDispatch();
  const isAuth = useSelector((state: any) => state?.auth?.isAuth);
  const [token, setToken] = React.useState<string>("");

  const { decodedToken, isExpired } = useJwt(token);
  const { currentThemeColor } = React.useContext(Context);
  const [themeColor, setThemeColor] = React.useState(currentThemeColor);

  useEffect(() => {
    setThemeColor(themeColor);
  }, [currentThemeColor]);

  useEffect(() => { 
    getItem("token").then((res) => {
      setToken(res);
    });
  }, []);

  useEffect(() => {
    if (token && !isExpired) {
      dispatch(authAction.login());
      setHeader(token);
    } else {
      dispatch(authAction.logout());
    }
  }, [dispatch, isExpired, token]);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          
          {!isAuth && isAuth !== null && (
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
          )}
          {!isAuth && isAuth !== null && (
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          )}
          {isAuth && <Stack.Screen name="HomeScreen" component={HomeScreen} />}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Router;
