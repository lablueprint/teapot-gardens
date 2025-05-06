import { Text, View, Image, Pressable, ScrollView} from "react-native";
import { Link } from "expo-router"; 
import styles from "./event_style";
import { useNavigation } from "expo-router";
import upcomingevent from '@assets/upcomingevent-1.png'
import garden from '@assets/garden.jpg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRoute } from "@react-navigation/native";


const Event = (props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.eventContainer}>
      {/* <Link
        href={{
          pathname: "screens/event/event_page",
          params: {
            title: props.title,
            date: props.date,
            location: props.location,
            time: props.time,
            details: props.details,
            pic: props.pic
          },
        }}
        style={styles.link}
      >  */}
      <Pressable
        onPress={() => {
            console.log("Navigating to EventPage", props);
            navigation.navigate('EventPage', {
            eventData: JSON.stringify(props),
            });
        }}
        >
        <View style={styles.eventInfoContainer}>
        {/* <Image source={garden} style={styles.listProgramImage} /> */}
        <View style={styles.listText}>
            <Text style={styles.listName}>{props.name}</Text>
            <Text style={styles.listDescription}>{props.date}</Text>
        </View>
        <Image source={upcomingevent} style={styles.listProgramImage} />
        {/* <Pressable style={styles.followButton}>
            <Text style={{ color: 'green' }}>Follow</Text>
        </Pressable>
        <Ionicons name="arrow-forward-outline" size={20} color="gray" /> */}
        </View>
      </Pressable>
      {/* </Link> */}
    </View>
  );
};

export default Event;
