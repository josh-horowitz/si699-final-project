import { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { Button } from "@rneui/themed";
import { getFBAuth, saveAndDispatch } from "../data/DB";
import { createUser } from "../data/Actions";

const auth = getFBAuth();

function SigninBox({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginHeaderText}>Sign In to Battleship!</Text>
      <View style={styles.loginRow}>
        <View style={styles.loginLabelContainer}>
          <Text style={styles.loginLabelText}>Email: </Text>
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput
            style={styles.loginInputBox}
            placeholder="enter email address"
            autoCapitalize="none"
            spellCheck={false}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
      </View>
      <View style={styles.loginRow}>
        <View style={styles.loginLabelContainer}>
          <Text style={styles.loginLabelText}>Password: </Text>
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput
            style={styles.loginInputBox}
            placeholder="enter password"
            autoCapitalize="none"
            spellCheck={false}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>
      </View>
      <View style={styles.loginRow}>
        <Button
          onPress={async () => {
            try {
              await signInWithEmailAndPassword(auth, email, password);
              navigation.navigate("Home");
            } catch (error) {
              Alert.alert("Sign Up Error", error.message, [{ text: "OK" }]);
            }
          }}
        >
          Sign In
        </Button>
      </View>
    </View>
  );
}

function SignupBox({ navigation }) {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [displayName, setDisplayName] = useState("");

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginHeaderText}>Sign Up for Battleship!</Text>
      <View style={styles.loginRow}>
        <View style={styles.loginLabelContainer}>
          <Text style={styles.loginLabelText}>Display Name: </Text>
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput
            style={styles.loginInputBox}
            placeholder="enter display name"
            autoCapitalize="none"
            spellCheck={false}
            onChangeText={(text) => setDisplayName(text)}
            value={displayName}
          />
        </View>
      </View>
      <View style={styles.loginRow}>
        <View style={styles.loginLabelContainer}>
          <Text style={styles.loginLabelText}>Email: </Text>
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput
            style={styles.loginInputBox}
            placeholder="enter email address"
            autoCapitalize="none"
            spellCheck={false}
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </View>
      </View>

      <View style={styles.loginRow}>
        <View style={styles.loginLabelContainer}>
          <Text style={styles.loginLabelText}>Enter Password: </Text>
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput
            style={styles.loginInputBox}
            placeholder="enter password"
            autoCapitalize="none"
            spellCheck={false}
            secureTextEntry={true}
            onChangeText={(text) => setPassword1(text)}
            value={password1}
          />
        </View>
      </View>
      <View style={styles.loginRow}>
        <View style={styles.loginLabelContainer}>
          <Text style={styles.loginLabelText}>Confirm Password: </Text>
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput
            style={styles.loginInputBox}
            placeholder="enter password"
            autoCapitalize="none"
            spellCheck={false}
            secureTextEntry={true}
            onChangeText={(text) => setPassword2(text)}
            value={password2}
          />
        </View>
      </View>
      <View style={styles.loginRow}>
        <Button
          disabled={
            password1 !== password2 && password1 !== "" && password2 !== ""
          }
          onPress={async () => {
            try {
              const userCred = await createUserWithEmailAndPassword(
                getFBAuth(),
                email,
                password1
              );
              const newDate = new Date();
              saveAndDispatch(
                createUser({
                  uid: userCred.user.uid,
                  displayName: displayName,
                  createdDate: newDate,
                  lastDayActive: newDate,
                })
              );
            } catch (error) {
              Alert.alert("Sign Up Error", error.message, [{ text: "OK" }]);
            }
          }}
        >
          Sign Up
        </Button>
      </View>
    </View>
  );
}

function LoginScreen({ navigation }) {
  const [loginMode, setLoginMode] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("signed in! user:", user);
        navigation.navigate("Home");
      } else {
        console.log("user is signed out!");
        navigation.navigate("Login");
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        {loginMode ? <SigninBox navigation={navigation} /> : <SignupBox />}
      </View>

      <View styles={styles.modeSwitchContainer}>
        {loginMode ? (
          <Text>
            New user?
            <Text
              onPress={() => {
                setLoginMode(!loginMode);
              }}
              style={{ color: "blue" }}
            >
              {" "}
              Sign up{" "}
            </Text>
            instead!
          </Text>
        ) : (
          <Text>
            Returning user?
            <Text
              onPress={() => {
                setLoginMode(!loginMode);
              }}
              style={{ color: "blue" }}
            >
              {" "}
              Sign in{" "}
            </Text>
            instead!
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bodyContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: 'tan'
  },
  loginContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingTop: "30%",
    paddingBottom: "10%",
    //backgroundColor: 'lightblue'
  },
  loginHeader: {
    width: "100%",
    padding: "3%",
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: 'tan'
  },
  loginHeaderText: {
    fontSize: 24,
    color: "black",
    paddingBottom: "5%",
  },
  loginRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    //backgroundColor: 'pink',
    padding: "3%",
  },
  loginLabelContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  loginLabelText: {
    fontSize: 18,
  },
  loginInputContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
  },
  loginInputBox: {
    width: "100%",
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 6,
    fontSize: 18,
    padding: "2%",
  },
  modeSwitchContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "pink",
  },
  loginButtonRow: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    flex: 0.7,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});

export default LoginScreen;
