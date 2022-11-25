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

function ProfileScreen({ navigation }) {
  // Add username as props

  return(
<View style={styles.container}>

<View style={styles.header}>
        <Text style={styles.headerText}>Battleship</Text>
      </View>

<TouchableOpacity style={styles.backArrow} onPress={() => {navigation.navigate("Home")}}>
<Ionicons name="arrow-back-outline" size='40%'></Ionicons>
</TouchableOpacity>


<View style={styles.profile}>
      <View style={styles.profile_pic}></View>
      <Text style={styles.usernameText}>Username</Text>
      <Text style={styles.startDateText}>Player since 01/01/2001</Text>
      </View>

      <View style={styles.statisticsList}>

<View style={styles.statisticGroup}>
<Text style={styles.statisticText}>Games Played:</Text><Text style={styles.numberText}>160</Text>
</View>

<View style={styles.statisticGroup}>
<Text style={styles.statisticText}>Winning Percentage:</Text><Text style={styles.numberText}>100%</Text>
</View>

<View style={styles.statisticGroup}>
<Text style={styles.statisticText}>Best Win Streak</Text><Text style={styles.numberText}>5</Text>
</View>

      </View>

</View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: { 
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
    padding: '5%',
      },
    headerText: {
    fontSize: '32px',
    color: 'white',
    padding: '10%',
    fontWeight: 'bold',
      },
      backArrow: {
marginLeft: '2%',
      },
  profile_pic: {
    backgroundColor: 'pink',
    width: '40%',
    height: '65%',
    borderRadius: '100%',

  },
  profile: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: .3,
  },
  usernameText: {
    fontSize: '16pt',
    fontWeight: 'bold',
    padding: '1%',
  },
  startDateText: {
    fontSize: '14pt',
  },
  statisticsList: {
    flex: .3,
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  statisticGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: '15%',
    paddingRight: '15%',
  },
  numberText: {
    fontWeight: 'bold'
  }
})

export default ProfileScreen;