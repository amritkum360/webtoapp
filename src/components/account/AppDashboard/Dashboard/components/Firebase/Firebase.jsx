import React, { useState, useEffect } from 'react';
import './Firebase.css'; // Add your custom CSS for styling here
import { useParams } from 'react-router-dom';
import NeedPaidPlan from '../needpaidplan/needpaidplan';

const Firebase = ({ plan }) => {
    const {id }= useParams()
    const [formData, setFormData] = useState({
        firebaseConfigFile: null,
        fcmServerKey: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchFirebaseData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:3000/app/firebase/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log("firebase")
                    console.log("firebase",data)
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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const fileData = event.target.result;
            const blob = new Blob([fileData], { type: 'application/json' });
            setFormData({
                ...formData,
                firebaseConfigFile: file,
            });
            
        };
        reader.readAsText(file);
    };
    

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('file', formData.firebaseConfigFile, 'config.json');
            formDataToSend.append('upload_preset', 'qta1vcsh'); // Replace 'your_upload_preset' with your Cloudinary upload preset
    
            const cloudinaryResponse = await fetch('https://api.cloudinary.com/v1_1/dcmrsdzvq/raw/upload', {
                method: 'POST',
                body: formDataToSend,
                // Set Content-Type to multipart/form-data
            });
    
            if (!cloudinaryResponse.ok) {
                throw new Error('Failed to upload file to Cloudinary');
            }
    
            const cloudinaryData = await cloudinaryResponse.json();
            const fileUrl = cloudinaryData.secure_url;
    
            const formDataToSendWithFileUrl = {
                firebaseConfigFile: fileUrl,
                fcmsecuritykey: formData.fcmServerKey,
            };
    
            const response = await fetch(`http://127.0.0.1:3000/app/firebase/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataToSendWithFileUrl),
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
        <>
        {plan === "0" ? (
            <NeedPaidPlan />
        ) : (
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

                <button type="submit" className="btn btn-primary btn-primary1 mt-4">Save Changes</button>
            </form>
        </div>) }
        </>
    );
};

export default Firebase;
