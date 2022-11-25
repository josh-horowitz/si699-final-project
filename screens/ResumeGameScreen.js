import { Button } from "@rneui/themed";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { withOrientation } from "react-navigation";
import MatchInProgress from "../components/MatchInProgress";

function ResumeGameScreen({ navigation }) {

    return (
  <View style={styles.container}>
  
  <View style={styles.header}>
          <Text style={styles.headerText}>Battleship</Text>
        </View>
  
  <TouchableOpacity style={styles.backArrow} onPress={() => {navigation.navigate("Home")}}>
  <Ionicons name="arrow-back-outline" size='40%'></Ionicons>
  </TouchableOpacity>

  <Text>Matches In Progress</Text>

  <MatchInProgress></MatchInProgress>

  </View>
  )
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
    backArrow: {
        marginLeft: '2%',
              },
            }
  )

  export default ResumeGameScreen;