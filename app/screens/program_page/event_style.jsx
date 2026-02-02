import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    eventContainer: {
        display: 'flex',
        marginTop: 10,
        borderRadius: 20,
        overflow: 'hidden',
        marginRight: 15,
        height: 200,
        width: 350,
        backgroundColor: '#D0D4C2',
    },
    eventInfoContainer: {
        height: 200,
        display: 'flex',
        flexDirection: 'row',
    },
    listProgramImage: {
        height: '100%',
    },
    listText: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: 20,
        width: '60%',
    },
    listName: {
        fontFamily: 'IMFell',
        fontSize: 37,
    },
    listDescription: {
        fontFamily: 'IMFell',
        fontSize: 14,
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