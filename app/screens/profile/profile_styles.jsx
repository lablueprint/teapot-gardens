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
      backgroundColor: '#BFC0A7',
    },   
    events_container: {
      justifyContent: 'center',
    },
    name: {
      textAlign: "center",
      fontSize: 24,
      marginBottom: 10,
      fontWeight: 600,
    },
    handle: {
      textAlign: "center",
      fontSize: 16,
      marginBottom: 10,
    },
    bio: {
      textAlign: "center",
      fontSize: 16,
      marginBottom: 10,
    },
    button: {
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      margin: 10,
      borderRadius: 12,
      backgroundColor: "#DEDBD6",
      width: 345,
      height: 43,
    }, 
    qr: {
      alignItems: "center",
      padding: 12,
      borderRadius: 12,
      backgroundColor: "#DEDBD6",
    },
    buttonContainer: {
      alignItems: "center",
    },
    title: {
      textAlign: "center",
      fontSize: 20,
      marginTop: 110,
      marginBottom: 25,
      fontSize: 32,
      fontFamily: 'IMFell',
    },
    subtitle: {
      fontSize: 32,
      color: "#161414",
      marginBottom: 5,
      fontWeight: 500,
      font: 'NewSpirit',
    },
    subsubtitle: {
      fontSize: 16,
      color: "#403C3C82",
      // marginBottom: 30,
    },
    events: {
      flex: 1
    },
    input: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
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
    bgImage: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      zIndex: -1,
      marginTop: 80,
      paddingTop: 70,
      borderTopLeftRadius: 90,
      borderTopRightRadius: 90,
      borderTopColor: '#E8E1DD',
    },
    bgWrapper: {
      flex: 1,
      backgroundColor: '#EDEEEA',
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      paddingVertical: 40,
      paddingHorizontal: 24,
    },
    endText: {
      fontSize: 16,
      marginTop: 10,
      marginBottom: 5,
      fontWeight: 500,
      alignSelf: "center",
      alignItems: "center",
    },
    subText: {
      color: "#403C3C80",
    },
    logo: {
      color: "#403C3C80",
      width: 58,
      resizeMode: 'contain'
    },
    row: {
      flexDirection: 'row', 
      justifyContent: 'space-between' 
    },
    data: {
      alignItems: "left",
      padding: 12,
      marginVertical: 10,
      borderRadius: 12,
      backgroundColor: "#DEDBD6",
      width: 165,
      marginBottom: 40,
    }
  });
  
  export default styles;