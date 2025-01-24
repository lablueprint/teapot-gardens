import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    eventContainer: {
        height: 80,
        marginTop: 10,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        display: 'flex',
        flexDirection: 'row', 
    },
    eventPic: {
        width: 70, 
        height: '200',
        borderRadius: 5, 
    }, 
    eventInfo: {
        paddingLeft: 20,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    eventDate: {
        fontSize: 14,
    }
})

export default styles;