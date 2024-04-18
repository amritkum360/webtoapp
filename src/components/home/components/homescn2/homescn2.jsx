import "./homescn2.css";

export default function Homescn2() {
    return (
        <div className="container_fluid container_home2">
            <div className="row row_home2">
                <h1 style={{color:"white", marginBottom:"30px"}}>Convert Your Website into An App in 3 Steps</h1>
                <div className="col-md-12">
                    <div className="content-box content-box_home2">
                        <div className="step">Step 1</div>
                        <div>
                            <h2>Enter Website URL</h2>
                            <p>Just enter your website address, give a name of your app and convert your website to app for Android or iOS platform.</p>
                        </div>
                        <img src="/1.png" alt="Image" className="img-fluid" />
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="content-box content-box_home2">
                        <div className="step">Step 2</div>
                        <img src="/2.png" alt="Image" className="img-fluid" />
                        <div>
                            <h2>Customize the App</h2>
                            <p>Personalize your app with custom logos, stunning splash screens, and advanced features. Easy and hassle-free!</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="content-box content-box_home2">
                        <div className="step">Step 3</div>
                        <div>
                            <h2>Build & Download</h2>
                            <p>Appilix's fast conversion process builds your Android or iOS app quickly, in less than 10 minutes!</p>
                        </div>
                        <img src="/2.png" alt="Image" className="img-fluid" />
                    </div>
                </div>
            </div>
        </div>
    );
}
