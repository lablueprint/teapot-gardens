import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    name: {
      textAlign: "center",
      fontSize: 20,
      textDecorationLine: "underline",
      marginBottom: 10,
    },
    handle: {
      textAlign: "center",
      fontSize: 16,
      marginBottom: 10,
    },
    bio: {
      textAlign: "center",
    },
    button: {
      alignItems: "center",
      padding: 7,
      borderWidth: 1,
      borderColor: 'grey',
      margin: 7,
      width: "50%",
      borderRadius: 10,
      backgroundColor: "#008c8c",
    },
    buttonContainer: {
      alignItems: "center",
    },
    title: {
      textAlign: "center",
      fontSize: 20,
      marginBottom: 10,
      backgroundColor: "#008c8c",
      color: "white",
    },
    subtitle: {
      fontSize: 15,
      marginBottom: 5,
    },
    input: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    eventContainer: {
      borderColor: "gray", 
      borderWidth: 1, 
      padding: 10, 
      marginVertical: 10,
      marginRight: 10,
      borderRadius: 10,
    }, 
    badgeContainer: {
      borderColor: "gray", 
      borderWidth: 1, 
      padding: 10, 
      borderRadius: 10,
      marginBottom: 30,
    }, 
    privacy: {
      display: "flex"
    },
    image: {
      width: 100,
      height: 100,
      borderRadius: 50, 
      alignSelf: "center",
      justifyContent: "center",
      marginVertical: 15,
    },
  });
  
  export default styles;