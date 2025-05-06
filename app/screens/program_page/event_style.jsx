import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    eventContainer: {
        display: 'flex',
        padding: 10,
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 15,
        overflow: 'hidden',
        marginRight: 15, 
    },
    eventInfoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    listProgramImage: {
        height: 60,
        width: 60,
        borderWidth: 1, 
        borderRadius: 5,
        marginRight: 10,
    },
    listText: {
        width: 140,
    },
    listName: {
        fontFamily: 'IMFell',
        fontSize: 18,
    },
    listDescription: {
        fontFamily: 'IMFell',
        fontSize: 13,
    },
    followButton: {
        borderRadius: 15,
        borderWidth: 1,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderColor: 'darkgreen',
        marginRight: 8
    }
})

export default styles;