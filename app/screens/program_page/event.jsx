import { Text, View, Image, Pressable} from "react-native";
import { Link } from "expo-router"; 
import styles from "./event_style";
import garden from '@assets/garden.jpg';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Event = (props) => {
  return (
    <View style={styles.eventContainer}>
      <Link
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
      > 
        <View style={styles.eventInfoContainer}>
        <Image source={garden} style={styles.listProgramImage} />
        <View style={styles.listText}>
            <Text style={styles.listName}>{props.title}</Text>
            <Text style={styles.listDescription}>{props.details}</Text>
        </View>
        <Pressable style={styles.followButton}>
            <Text style={{ color: 'green' }}>Follow</Text>
        </Pressable>
        <Ionicons name="arrow-forward-outline" size={20} color="gray" />
        </View>
      </Link>
    </View>
  );
};

export default Event;
