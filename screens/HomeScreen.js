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
import { subscribeToUsers, getFBAuth, signOutFB } from "../data/DB";
import { withOrientation } from "react-navigation";

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
    // Header
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Battleship</Text>
      </View>

      {/* Profile picture + username */}
      <TouchableOpacity
        style={styles.profile}
        onPress={() => {
          navigation.navigate("Profile");
        }}
      >
        <View style={styles.profile_pic}></View>
        <Text>{currentUser?.displayName}</Text>
      </TouchableOpacity>

      <Text style={styles.welcomeText}>
        Welcome {currentUser?.displayName}!
      </Text>

      {/* Menu options */}
      <View style={styles.listContainer}>
        <TouchableOpacity style={styles.menuOption}>
          <Text style={styles.menuOptionText}>Create a new match</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuOption}>
          <Text style={styles.menuOptionText}>Join a new match</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuOption}>
          <Text style={styles.menuOptionText}>Resume a match in progress</Text>
        </TouchableOpacity>
      </View>

      {/* Sign out */}
      <Button
        style={styles.signOutButton}
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
  },
  header: {
    flex: 0.1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    padding: "5%",
  },
  headerText: {
    fontSize: "32px",
    color: "white",
    padding: "10%",
    fontWeight: "bold",
  },
  listContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  profile_pic: {
    backgroundColor: "pink",
    width: "10%",
    height: "50%",
    marginLeft: "5%",
    marginRight: "2%",
    borderRadius: "100%",
  },
  profile: {
    flex: 0.1,
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
    justifyContent: "flexStart",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: "24px",
    padding: "5%",
    textAlign: "center",
  },
  menuOption: {
    width: "70%",
    backgroundColor: "lightblue",
    height: "25%",
    margin: "4%",
    justifyContent: "center",
    alignItems: "center",
  },
  menuOptionText: {
    fontSize: "18pt",
    padding: "2%",
    color: "black",
  },
  signOutButton: {
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    marginTop: "10%",
  },
});

export default HomeScreen;
