import React from 'react';
import './Build.css'; // Import your custom CSS for styling here
import Button from 'react-bootstrap/Button'; // Import Bootstrap Button component

const Build = () => {
    const handleClick = async () => {
        try {
            const response = await fetch('http://127.0.0.1:3000/changethedata', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data)
                const { appName } = data;

                // console.log(data[0])

                // Construct the data to be written to the file
                const fileContent = `{
"name": "urapp",
"displayName": "${appName}"
 }
                  
                `;

                const filecontent2 = `<resources>
<string name="app_name">${appName}</string>
</resources>
`

                // Send a POST request to update the file content
                const updateResponse = await fetch('http://127.0.0.1:3000/updatefile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content: fileContent, content2: filecontent2 }),
                });

                if (updateResponse.ok) {
                    console.log('File content updated successfully.');
                } else {
                    console.error('Failed to update file content.');
                }
            } else {
                console.error('Failed to fetch data from the server.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const handleBuildAndDownload = async () => {
        try {
          const buildResponse = await fetch('http://127.0.0.1:3000/build', {
            method: 'POST',
          });
    
          if (buildResponse.ok) {
            const downloadResponse = await fetch('http://127.0.0.1:3000/download');
            const blob = await downloadResponse.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'app-release.apk';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
          } else {
            alert('Build failed');
          }
        } catch (error) {
          console.error('Error triggering build:', error);
          alert('Error triggering build');
        }
      };
    


    
    return (
        <div className="build-container">
            <Button variant="primary" className="build-button" onClick={handleClick}>
                Build the App
            </Button>
            <div>
      <button onClick={handleBuildAndDownload}>Build and Download APK</button>
    </div>
        </div>
        
    );
};

export default Build;
