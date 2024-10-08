import React, { useState, useEffect } from 'react';
import './Admob.css'; // Add your custom CSS for styling here
import { useParams } from 'react-router-dom';
import NeedPaidPlan from '../needpaidplan/needpaidplan';

const Admob = ({ plan }) => { // Receive plan as a prop
    const [formData, setFormData] = useState({
        admobAppId: '',
        bannerAdUnitId: '',
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams(); // Access the id parameter from the URL

    useEffect(() => {
        console.log('Plan:', plan); // Log the plan

        const fetchData = async () => {
            try {
                const response = await fetch(`https://webtoapp-back-1.onrender.com/app/admobs/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    const applicationid = data.applicationid;
                    const bannerid = data.bannerid;
                    setFormData({
                        admobAppId: applicationid || '', // If data is null, set to empty string
                        bannerAdUnitId: bannerid || '', // If data is null, set to empty string
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };
    
        fetchData(); // Call the fetchData function on component mount
    }, [id]); // Include id in the dependency array to fetch data when id changes
    
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
            await fetch(`https://webtoapp-back-1.onrender.com/app/admobs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    appid: id, // Use id from URL params
                    applicationid: formData.admobAppId,
                    bannerid: formData.bannerAdUnitId,
                }),
            });
            setSuccessMessage('Data saved successfully!');
            setErrorMessage('');
        } catch (error) {
            console.error('Error saving data:', error);
            setErrorMessage('Error saving data. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <>
        {plan === "0" ? (
            <NeedPaidPlan />
        ) : (
            <div className="admob-container">
                <h2 className="text-center mb-1">Connect Admob</h2>
                <p className="text-center mb-4">Put your advertisement Info</p>
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
                <form onSubmit={handleSubmit} className="admob-form">
                    <div className="form-group">
                        <label htmlFor="admobAppId">Admob Application Id</label>
                        <input type="text" id="admobAppId" name="admobAppId" className="form-control" value={formData.admobAppId} onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="bannerAdUnitId">Banner Ad Unit Id</label>
                        <input type="text" id="bannerAdUnitId" name="bannerAdUnitId" className="form-control" value={formData.bannerAdUnitId} onChange={handleInputChange} />
                    </div>

                    <button type="submit" className="btn btn-primary btn-primary1 mt-4">Save Changes</button>
                </form>
            </div>
        )}
        </>
    );
};

export default Admob;
