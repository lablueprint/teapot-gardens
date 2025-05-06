import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    outerContainer: {
        alignItems: 'left',
        flexGrow: 1,
    },
    contentContainer: {
        alignItems: 'left',
        padding: 20,
        backgroundColor: '#EAE6E0',
        borderRadius: 30,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        overflow: "hidden",
        marginTop: -30,
    },
    infoContainer: {
        marginTop: 20,
    },
    programTitle: {
        fontFamily: 'IMFell',
        fontSize: 35,
        textAlign: 'center',
    },
    header: {
        fontFamily: 'IMFell',
        fontSize: 16,
        marginTop: 30,
        fontWeight: 10
    },
    description: {
        fontFamily: 'IMFell',
        fontsize: 20,
        fontWeight: 8,
        color: '#7D7D7D',
        marginTop: 20, 
        marginBottom: 20
    },
    button: {
        backgroundColor: '#757B45',
        display: 'flex',
        flexDirection: 'row',
        padding: 15, 
        borderRadius: 20, 
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    buttonText: {
        fontFamily: 'IMFell',
        textAlign: 'center', 
        color: 'white',
    },
    upcomingBox: {
        height: 500,
        borderWidth: 1,
        borderColor: 'red',
    },
    createEventContainer: {
        padding: 10,
        marginTop: 10,
    },
    createEventButton: {
        borderWidth: 1, 
        borderRadius: 100, 
        backgroundColor: 'black', 
        position: 'absolute', 
        paddingHorizontal: 10, 
        paddingVertical: 6,
        right: 0,
        justifyContent: 'center', 
        alignItems: 'center',
    },
    plusButton: {
        color: 'white', 
        fontWeight: 'bold',         
    },
    carouselContainer: {
        flexDirection: 'row',
        align: 'center',
    },
    bulletContainer: {
        fontSize: 20,
        textAlign: 'left',
        margin: 10
    },
    image: {
        width: 100,
        height: 200,
        marginLeft: 5,
        marginRight: 5
    },
    collapsible: {
        margin: 2,
        backgroundColor: '#D3D3D3'
    },
    photoContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between", 
        marginTop: 40,
      }, 
      photoGalleryContainer: {
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-between", 
        backgroundColor: "#DFD8D0",
        padding: 10,
        marginTop: 10,
      }, 
      galleryPhoto: {
        width: 70, 
        height: 70, 
        borderRadius: 5
      }
})

export default styles;