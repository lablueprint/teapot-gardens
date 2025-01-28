import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 8,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },

    title: {
        fontSize: 25,
    },
    body: {
        fontSize: 18,
    },
    button: {
        backgroundColor: 'pink', 
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center', 
    }
})

export default styles;