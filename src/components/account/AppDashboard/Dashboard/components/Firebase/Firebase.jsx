import React, { useState, useEffect } from 'react';
import './Firebase.css'; // Add your custom CSS for styling here

const Firebase = () => {
    const [formData, setFormData] = useState({
        firebaseConfigFile: null,
        fcmServerKey: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchFirebaseData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3000/app/firebase');
                if (response.ok) {
                    const data = await response.json();
                    const { firebaseconf, fcmsecuritykey } = data;
                    setFormData({
                        firebaseConfigFile: null, // Set to null as file input value cannot be set programmatically
                        fcmServerKey: fcmsecuritykey || '',
                    });
                }
            } catch (error) {
                console.error('Error fetching Firebase data:', error);
            }
        };

        fetchFirebaseData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = {
                fcmsecuritykey: formData.fcmServerKey,
            };

            const formDataToSendString = JSON.stringify(formDataToSend);

            const response = await fetch('http://127.0.0.1:3000/app/firebase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: formDataToSendString,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Data updated successfully:', data);
                setSuccessMessage('Data updated successfully!');
                setErrorMessage('');
            } else {
                throw new Error('Failed to update data');
            }
        } catch (error) {
            console.error('Error updating data:', error);
            setErrorMessage('Error updating data. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="firebase-container">
            <h2 className="text-center">Connect Firebase</h2>
            <p className="text-center mb-2">Put Firebase detail in the form</p>
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
            <form onSubmit={handleSubmit} className="firebase-form">
                <div className="form-group">
                    <label htmlFor="firebaseConfigFile">Firebase Configuration File</label>
                    <input type="file" id="firebaseConfigFile" name="firebaseConfigFile" className="form-control" accept=".json" />
                </div>

                <div className="form-group">
                    <label htmlFor="fcmServerKey">FCM Server Key</label>
                    <textarea id="fcmServerKey" name="fcmServerKey" rows="4" className="form-control" value={formData.fcmServerKey} onChange={handleInputChange}></textarea>
                </div>

                <button type="submit" className="btn btn-primary mt-4">Save Changes</button>
            </form>
        </div>
    );
};

export default Firebase;
