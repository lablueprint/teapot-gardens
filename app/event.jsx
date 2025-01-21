import { Text, View } from "react-native";
import { Link } from "expo-router"; 
import styles from "./event_style";

const Event = (props) => {
  return (
    <View style={styles.eventContainer}>
      <Link
        href={{
          pathname: "/event_page",
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
        <View>
          <Text style={styles.eventTitle}>{props.title}</Text>
          <Text style={styles.eventDate}>{props.date}</Text>
        </View>
      </Link>
    </View>
  );
};

export default Event;
