import React from 'react';

const ContactUs = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Contact Us</h2>

      <div style={styles.contactDetails}>
        <p style={styles.label}><strong>Address:</strong></p>
        <p style={styles.info}>
          123 Business St., Tech City, <br />
          XYZ District, ABC State, <br />
          Pin Code: 123456
        </p>

        <p style={styles.label}><strong>Mobile Number:</strong></p>
        <p style={styles.info}>+91 9876543210</p>

        <p style={styles.label}><strong>Email:</strong></p>
        <p style={styles.info}>
          contact@yourbusiness.com
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  },
  header: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px'
  },
  contactDetails: {
    textAlign: 'left',
    fontSize: '16px',
    lineHeight: '1.6'
  },
  label: {
    marginBottom: '5px',
    color: '#333'
  },
  info: {
    marginBottom: '15px',
    color: '#555',
    fontSize: '16px'
  }
};

export default ContactUs;
