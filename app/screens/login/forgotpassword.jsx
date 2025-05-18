import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, TextInput, View, Alert, Image, Pressable} from "react-native";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!email) {
            setError('Please enter your email address.');
            return;
        }
        // Simulate API call
        try {
            // await api.forgotPassword(email);
            setSubmitted(true);
        } catch (err) {
            setError('Failed to send reset email. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Forgot Password</Text>
            <Text style={{ marginBottom: 20 }}>Enter your email address to receive instructions for resetting your password.</Text>
            {submitted ? (
                <Text style={{ color: 'green' }}>Check your email for reset instructions.</Text>
            ) : (
                <>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
                    <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                        <Text style={styles.buttonText}>Send Instructions</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#BFC0A7',
        padding: 30,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#757B454D',
        padding: 10,
        borderRadius: 5,
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default ForgotPassword;