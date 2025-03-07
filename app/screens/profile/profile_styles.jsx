import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      borderRadius: 40,
      flex: 1,
    },
    main_container: {
      backgroundColor: '#E8E1DD',
      paddingTop: 40,
    },
    name: {
      textAlign: "center",
      fontSize: 32,
      marginBottom: 10,
    },
    handle: {
      textAlign: "center",
      fontSize: 16,
      marginBottom: 5,
      marginTop: 15
    },
    button: {
      alignItems: "center",
      padding: 7,
      borderWidth: 1,
      borderColor: 'grey',
      marginBottom: 50,
      width: 98,
      borderRadius: 10,
      backgroundColor: "#FFFFFF",
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
      color: "white",
      marginBottom: 5,
      fontWeight: 600,
      marginLeft: 10,
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
      width: 155,
      height: 155,
      borderRadius: 80, 
      alignSelf: "center",
      justifyContent: "center",
      marginVertical: 15,
    },
  });
  
  export default styles;