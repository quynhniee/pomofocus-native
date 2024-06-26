import React, { memo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Background from "../components/Background";
import Header from "../components/HeaderText";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { Button, TextInput as PaperInput, Snackbar } from "react-native-paper";
import { Navigation } from "../core/types";
import {
  emailValidator,
  nameValidator,
  passwordValidator,
} from "../utils/validator";
import Stack from "../components/Stack";
import { signup } from "../api";
import useSnackbar from "../hooks/useSnackbar";

type Props = {
  navigation: Navigation;
};

const RegisterScreen = ({ navigation }: Props) => {
  const { showSnackbar, visible, message, hideSnackbar } = useSnackbar();
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [showPassword, setShowPassword] = useState(false);

  const _onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    const response = await signup({
      name: name.value,
      email: email.value,
      password: password.value,
    });
    if (response.status === 200) {
      showSnackbar("Account created successfully!");
      setTimeout(() => {
      navigation.navigate("LoginScreen");
      },  2000);
    } else {
      showSnackbar(response.data.message);
    }
  };

  return (
    <>
      <Snackbar
        duration={Snackbar.DURATION_SHORT}
        onDismiss={hideSnackbar}
        visible={visible}
      >
        {message}
      </Snackbar>
      <Background>
        <View style={{ height: "15%" }} />
        <BackButton goBack={() => navigation.navigate("LoginScreen")} />
        <Header>Create Account</Header>

        <TextInput
          label="Name"
          returnKeyType="next"
          value={name.value}
          onChangeText={(text) => setName({ value: text, error: "" })}
          error={!!name.error}
          errorText={name.error}
          mode="flat"
        />

        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          textContentType="emailAddress"
          keyboardType="email-address"
          mode="flat"
        />
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry={!showPassword}
          mode="flat"
          right={
            <PaperInput.Icon
              icon={showPassword ? "eye" : "eye-off"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />

        <Stack alignBlock="center">
          <Button
            mode="contained"
            onPress={_onSignUpPressed}
            style={styles.button}
          >
            Sign Up
          </Button>

          <View style={styles.row}>
            <Text style={styles.label}>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text style={styles.link}>Login</Text>
            </TouchableOpacity>
          </View>
        </Stack>
      </Background>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
    backgroundColor: theme.colors.background.authScreen,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default memo(RegisterScreen);
