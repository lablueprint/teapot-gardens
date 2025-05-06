import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    main_container: {
      backgroundColor: '#E8E1DD',
      paddingTop: 30,
    },
    foregroundContainer: {
      flex: 1,
      // backgroundColor: '#E8E1DD',
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      overflow: 'hidden',
      zIndex: -1,
    },   
    events_container: {
      marginTop: 20,
      paddingHorizontal: 20,
    },
    name: {
      textAlign: "center",
      fontSize: 32,
      marginBottom: 10,
      fontWeight: 600,
    },
    handle: {
      textAlign: "center",
      fontSize: 16,
      marginBottom: 5,
      marginTop: 15
    },
    button: {
      alignItems: "center",
      justifyContent: "center",
      padding: 7,
      borderWidth: 1,
      borderColor: 'grey',
      marginBottom: 50,
      width: 98,
      borderRadius: 14,
      backgroundColor: "#FFFFFF",
    }, 
    qr: {
      alignItems: "center",
      justifyContent: "center",
      padding: 7,
      borderWidth: 1,
      borderColor: 'grey',
      marginBottom: 50,
      width: 300,
      height: 150,
      borderRadius: 14,
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
      fontSize: 18,
      color: "white",
      marginBottom: 5,
      fontWeight: 600,
      marginLeft: 20,
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
    bushImage: {
      width: '100%',
      alignSelf: 'center',  
      marginTop: 20,
      paddingBottom: 20,         
      zIndex: -1,
    },
    bushBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
    },  
    bgImage: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      zIndex: -1,
      borderTopLeftRadius: 80,
      borderTopRightRadius: 80,
      overflow: 'hidden',
    },
    bgWrapper: {
      flex: 1,
      borderTopLeftRadius: 80,
      borderTopRightRadius: 80,
    }
    
    
  });
  
  export default styles;