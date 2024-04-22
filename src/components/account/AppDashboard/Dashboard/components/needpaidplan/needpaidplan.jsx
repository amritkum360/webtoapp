import React from 'react';
import './needpaidplan.css'

export default function NeedPaidPlan() {
    return (
        <div className="card-container card-container-needpaid">
            <div className="card card-needpaid">
                <div className="card-img card-img-needpaid"></div>
                <div className="card-body card-body-needpaid">
                     <h5 className="card-title card-title-needpaid">Upgrade to Paid Plan</h5>
                    <p className="card-text card-text-needpaid">Unlock premium features with our paid plan.</p> 
                    <button className="btn btn-primary btn-needpaid btn-primary-needpaid">Upgrade Now</button>
                </div>
            </div>
        </div>
    );
}
