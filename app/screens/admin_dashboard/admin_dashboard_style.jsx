import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    adminContainer: {
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'left',
        textAlign: 'left',
    },
    title: {
        marginBottom: 20, 
        fontSize: 20, 
        textAlign: 'center',
    },
    dropdown: {
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 17,
        paddingBottom: 10,
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5,
        width: '100%',
        marginBottom: 10,
        marginTop: 5,
        borderRadius: 5
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        borderColor: 'gray',
        borderWidth: 1,
        margin: 5,
        width: '25%',
        alignItems: 'center',
        borderRadius: 5, 
        padding: 5, 
    }
})

export default styles;