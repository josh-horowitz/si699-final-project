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

function MatchInProgress({ navigation }) {

    return (
        <View style={styles.matchBox}>


        <TouchableOpacity
        style={styles.profile}
        onPress={() => {
          navigation.navigate("Profile");
        //   Pass in opponent's username as props
        }}
      >
        <View style={styles.profile_pic}></View>
        <Text>username</Text>
      </TouchableOpacity>

      <Text style={styles.turnText}>Your Turn</Text>
      
      <TouchableOpacity>
      <Ionicons name="play-outline" size='60%' style={styles.playButton}></Ionicons>
      </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
matchBox: {
    borderWidth: '3px',
    margin: '2%',
    borderRadius: '70%',
},
profile: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "row",
    justifyContent: "flexStart",
    alignItems: "center",
    marginLeft: '10%',
    marginTop: '5%'
  },
profile_pic: {
    backgroundColor: "pink",
    width: "10%",
    height: "200%",
    borderRadius: "100%",
    marginRight: '2%',
  },
  playButton: {
position: 'relative',
left: '80%',
bottom: '40%',
  },
  turnText: {
marginLeft: '20%',
top: '35%'
  }
})

export default MatchInProgress;