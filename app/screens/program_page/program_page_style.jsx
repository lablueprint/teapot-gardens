import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    outerContainer: {
        alignItems: 'left',
    },
    banner: {
        height: '200', 
    },
    contentContainer: {
        alignItems: 'left',
        padding: 20,
    },
    programTitle: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    description: {
        fontsize: 20,
        marginTop: 20, 
        marginBottom: 20
    },
    button: {
        backgroundColor: 'black',
        color: 'white',
        padding: 15, 
        borderRadius: 20, 
        textAlign: 'center', 
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
    header: {
        fontSize: 20,
        marginTop: 30,
        fontWeight: 'bold'
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
    }
})

export default styles;