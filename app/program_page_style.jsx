import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    outerContainer: {
        alignItems: 'center',
        paddingBottom: 10
    },
    contentContainer: {
        alignItems: 'center',
        padding: 20,
    },
    carouselContainer: {
        flexDirection: 'row',
        align: 'center',
        padding: 10
    },
    programTitle: {
        fontSize: 50,
        textAlign: 'center'
    },
    header: {
        fontSize: 25,
        textAlign: 'center'
    },
    content: {
        fontsize: 20,
        textAlign: 'center',
        paddingBottom: 20
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