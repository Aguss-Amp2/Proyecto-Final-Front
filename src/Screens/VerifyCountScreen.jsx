import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const VerifyEmailScreen = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    useEffect(() => {
        const verifyEmail = async () => {
            const token = searchParams.get('verification_token')
            if (!token) {
                console.error('No token found')
                return;
            }

            try {
                const response = await fetch(`http://localhost:4000/api/auth/verify-email?verification_token=${token}`);
                const data = await response.json();

                if (data.ok) {
                    alert('Email verified successfully! Redirecting to login...')
                    navigate('/login');
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error('Error verifying email:', error)
            }
        };

        verifyEmail();
    }, [searchParams, navigate]);

    return <h2>Verifying your email...</h2>;
};

export default VerifyEmailScreen;