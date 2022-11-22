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

  return(
<View style={styles.container}>

<View style={styles.header}>
        <Text style={styles.headerText}>Battleship</Text>
      </View>

<TouchableOpacity>
<Ionicons name="arrow-back-outline"></Ionicons>
</TouchableOpacity>

<View style={styles.profile}  
    // onPress={() => {navigation.navigate()}}
    >
      <View style={styles.profile_pic}></View>
      <Text>Username</Text>
      <Text>Player since 01/01/2001</Text>
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
  profile_pic: {
    backgroundColor: 'pink',
    width: '10%',
    height: '50%',
    marginLeft: '5%',
    marginRight: '2%',
    borderRadius: '100%'

  },
  profile: {
    flex: .1,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ProfileScreen;