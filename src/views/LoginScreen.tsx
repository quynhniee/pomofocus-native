import React, { useContext, useState, memo, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authAction } from "../redux/auth/auth";
import { Button, Text, TextInput as PaperInput } from "react-native-paper";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Background from "../components/Background";
import Header from "../components/HeaderText";
import Stack from "../components/Stack";
import { Navigation } from "../core/types";
import { theme } from "../core/theme";
import TextInput from "../components/TextInput";
import { emailValidator, passwordValidator } from "../hooks/validator";
import { useFocusEffect } from "@react-navigation/native";

type Props = { 
  navigation: Navigation;
};

const LoginScreen = ({ navigation }: Props) => {
  // const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    navigation.navigate('Dashboard');
  };
  const submitHandle = async (e) => {
    e.preventDefault();

    try {
      // const response = await login({ email, password });
      // if (response.status === 200) {
      // 	setHeader(response.data.token);
      // 	dispatch(authAction.login());
      // } else {
      // 	helperText.current.textContent = response.data.message;
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

  }, [])

  return (
    <Background>
      <View style={{height: '15%'}}/>
      <Header>Welcome back</Header>
        <TextInput
          label="Email"
          value={email.value}
          onChangeText={text => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          placeholder="example@mail.com"
          mode="flat"
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          label="Password"
          value={password.value}
          onChangeText={text => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          mode="flat"
          secureTextEntry={!showPassword}
          returnKeyType="done"
          right={
            <PaperInput.Icon
              icon={showPassword ? "eye" : "eye-off"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPasswordScreen")}
          >
            <Text style={styles.label}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <Stack alignBlock="center">
          <Button mode="contained" onPress={_onLoginPressed}>Login</Button>
          <View style={styles.row}> 
            <Text style={styles.label}>Don’t have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
              <Text style={styles.link}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </Stack>
    </Background>
  );
};

export default memo(LoginScreen);

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
    backgroundColor: theme.colors.background.authScreen,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

