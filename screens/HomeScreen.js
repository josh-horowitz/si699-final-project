import { Button } from "@rneui/themed";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  subscribeToUsers,
  getFBAuth,
  signOutFB,
  subscribeToChat,
} from "../data/DB";

const auth = getFBAuth();

//I'm thinking that this screen could have a circle profile type button in the top right corner and then the three buttons
//from our mockup, but with no onClick just yet.
function HomeScreen({ navigation }) {
  const users = useSelector((state) => {
    console.log("useSelector, state:", state);
    return state.users;
  });

  const currentUser = useSelector((state) => {
    const currentUserId = auth.currentUser.uid;
    return state.users.find((u) => u.uid === currentUserId);
  });

  const dispatch = useDispatch();

  useEffect(() => {
    subscribeToUsers(dispatch);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>Battleship</Text>
      </View>

      <View style={styles.profile_pic}></View><Text>Username</Text>

      <View style={styles.listContainer}>
    <Text>Welcome "username"!</Text>
    <TouchableOpacity><Text>Create a new match</Text></TouchableOpacity>
    <TouchableOpacity><Text>Join a new match</Text></TouchableOpacity>
    <TouchableOpacity><Text>Resume a match in progress</Text></TouchableOpacity>
</View>
      <Button
        onPress={async () => {
          navigation.navigate("Login");
          signOutFB(auth);
        }}
      >
        {" "}
        Sign Out{" "}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
  },
  listContainer: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
