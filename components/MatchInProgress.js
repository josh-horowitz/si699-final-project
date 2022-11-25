import { Button } from "@rneui/themed";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Touchable,
} from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { withOrientation } from "react-navigation";

export default function MatchInProgress({ navigation }) {

    return (
        <View styles = {styles.matchBox}>
        <TouchableOpacity
        style={styles.profile}
        onPress={() => {
          navigation.navigate("Profile");
        //   Pass in opponent's username as props
        }}
      >
        <View style={styles.profile_pic}></View>
        <Text>{currentUser?.displayName}</Text>
      </TouchableOpacity>
      <Text style={styles.turnText}>Your Turn</Text>
      <TouchableOpacity>
      <Ionicons name="play-outline" style={styles.playButton}></Ionicons>
      </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
matchBox: {
    flex: 1,
    border: '1px black solid',
    borderRadius: '70%',
},
profile: {
    flex: 0.1,
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
    justifyContent: "flexStart",
    alignItems: "center",
  },
profile_pic: {
    backgroundColor: "pink",
    width: "10%",
    height: "50%",
    borderRadius: "100%",
  },
})