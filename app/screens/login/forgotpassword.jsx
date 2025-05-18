import React, { useState } from 'react';

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
        <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
            <h2>Forgot Password</h2>
            {submitted ? (
                <p>
                    If an account with that email exists, a password reset link has been sent.
                </p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: 16 }}>
                        <label htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            style={{ width: '100%', padding: 8, marginTop: 4 }}
                            required
                        />
                    </div>
                    {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
                    <button type="submit" style={{ padding: '8px 16px' }}>
                        Send Reset Link
                    </button>
                </form>
            )}
        </div>
    );
};

export default ForgotPassword;