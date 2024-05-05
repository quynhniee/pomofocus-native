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

const Stack = createStackNavigator();

const Router = () => {
  const dispatch = useDispatch();
  // const isAuth = useSelector((state: any) => state?.auth?.isAuth);
  const isAuth = true
  
  let token: string;
  async () => {
    token = await getItem("token");
  };
  const { decodedToken, isExpired } = useJwt(token);

  useEffect(() => {
    if (token && !isExpired) {
      dispatch(authAction.login());
      // setHeader(token);
    } else {
      dispatch(authAction.logout());
    }
  }, [dispatch, isExpired, token]);

  return (
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
        {isAuth && <Stack.Screen name='HomeScreen' component={HomeScreen} />}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
