import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [passwordErrors, setPasswordErrors] = useState({
        minLength: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });
    const navigate = useNavigate();

    const validatePassword = (value) => {
        setPasswordErrors({
            minLength: value.length >= 8,
            uppercase: /[A-Z]/.test(value),
            lowercase: /[a-z]/.test(value),
            number: /[0-9]/.test(value),
            specialChar: /[@$!%*?&]/.test(value),
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setMessage('');

        try {
            const response = await axiosInstance.post('/api/auth/register', {
                name,
                email,
                password,
            });

            setMessage(response.data.message || 'Registration successful. Redirecting to login...');
            setName('');
            setEmail('');
            setPassword('');

            setTimeout(() => {
                navigate('/login');
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div className="register-page container mt-5" style={{ maxWidth: '500px' }}>
            <h2 className="mb-4">Register</h2>

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        id="name"
                        className="form-control"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        id="email"
                        className="form-control"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        id="password"
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            validatePassword(e.target.value);
                        }}
                        required
                    />
                    {password?.length > 0 && (<div className="form-text mt-2">
                        <ul className="mb-0 ps-3">
                            <li className={passwordErrors.minLength ? 'text-success' : 'text-danger'}>At least 8 characters</li>
                            <li className={passwordErrors.uppercase ? 'text-success' : 'text-danger'}>At least one uppercase letter</li>
                            <li className={passwordErrors.lowercase ? 'text-success' : 'text-danger'}>At least one lowercase letter</li>
                            <li className={passwordErrors.number ? 'text-success' : 'text-danger'}>At least one number</li>
                            <li className={passwordErrors.specialChar ? 'text-success' : 'text-danger'}>At least one special character (@$!%*?&)</li>
                        </ul>
                    </div>)}
                </div>

                <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
        </div>
    );
}
