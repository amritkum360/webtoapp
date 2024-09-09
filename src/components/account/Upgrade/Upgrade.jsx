import { useNavigate, useParams } from "react-router-dom";

export default function Upgrade() {
    let { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

    // Function to handle button click based on token existence
    const handleButtonClick = () => {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

        if (token) {
            navigate("/account/newapp"); // Redirect to '/' if token exists
        } else {
            navigate("/login"); // Redirect to '/login' if token doesn't exist
        }
    };

    console.log(id);

    // Modify paymenthandler to accept amount as a parameter
    const paymenthandler = async (amount) => {
        if (amount === 0) {
            navigate(`/app/dashboard/${id}`); // Navigate directly to the app dashboard if the amount is 0
            return; // Return to prevent further execution of payment process
        }

        
        const currency = "INR";
        const receiptId = "qwsaq1";

        const response = await fetch("https://rayzorpay-backend.onrender.com/order", {
            method: "post",
            body: JSON.stringify({
                amount,
                currency,
                receipt: receiptId,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const order = await response.json();
        console.log(order);

        var options = {
            key: "rzp_live_989PQ7Ffj0QKwf", 
            amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency,
            name: "WebApproxy", 
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            handler: async function (response) {
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature)
                const body = {
                    ...response,
                };

                const validateRes = await fetch("https://rayzorpay-backend.onrender.com/order/validate", {
                    method: "post",
                    body: JSON.stringify(body),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const jsonRes = await validateRes.json();
                console.log(jsonRes);

                if (jsonRes.msg == "success") {
                    const paymentData = {
                        paymentId: jsonRes.paymentId, // Assuming jsonRes contains paymentId and orderId
                        orderId: jsonRes.orderId,
                        appId: id, // Assuming id is the user's ID
                        amount: (amount/100)
                    };

                    // Save payment data to backend
                    const savePaymentResponse = await fetch("https://rayzorpay-backend.onrender.com/payment/detailsave", {
                        method: "post",
                        body: JSON.stringify(paymentData),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    const savePaymentJsonRes = await savePaymentResponse.json();
                    console.log(savePaymentJsonRes);


                    navigate(`/app/dashboard/${id}`);
                }
            },
            "prefill": {
                "name": "Amrit Kumar", //your customer's name
                "email": "Amrit.kumar@example.com",
                "contact": "9000090000", //Provide the customer's phone number for better conversion rates
            },
            "notes": {
                "address": "Razorpay Corporate Office",
            },
            "theme": {
                "color": "#3399cc",
            },
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });

        rzp1.on("payment.captured", (response) => {
            // toast.success("Order Placed Successfully");
            // cart[1]([]);
            navigate("/"); // Navigate to '/' on successful payment
        });

        rzp1.open();
    };

    return (
        <>
            
            <div className="pricing-container">
                <div className="pricing-box">
                    <h2>Free</h2>
                    <div className="price">Rs 0.00</div>
                    <p>For Testing, Expires in 30 Days</p>
                    <hr />
                    <ul>
                        <li><span className="feature">1 Android Application</span></li>
                        <li><span className="feature">Unlimited Builds</span></li>
                        <li><span className="feature">Unlimited Active Users</span></li>
                        <li><span className="cross-icon">✘</span> No Appilix Logo</li>
                        <li><span className="cross-icon">✘</span> Admob Ad</li>
                        <li><span className="cross-icon">✘</span> Push Notifications</li>
                        <li><span className="cross-icon">✘</span> Play Store Releasable</li>
                    </ul>
                    {/* Pass the desired amount to paymenthandler */}
                    <button className="get-started-btn" onClick={() => paymenthandler(0)}>Get Started</button>
                </div>
                <div className="pricing-box">
                    <h2>Yearly</h2>
                    <div className="price">Rs 1199 / year</div>
                    <p>Billed as Rs 1199.00 per year</p>
                    <hr />
                    <ul>
                        <li><span className="feature">1 Android Application</span></li>
                        <li><span className="feature">Unlimited Builds</span></li>
                        <li><span className="feature">Unlimited Active Users</span></li>
                        <li><span className="check-icon">✓</span> No Appilix Logo</li>
                        <li><span className="check-icon">✓</span> Admob Ad</li>
                        <li><span className="check-icon">✓</span> Push Notifications</li>
                        <li><span className="check-icon">✓</span> Play Store Releasable</li>
                    </ul>
                    {/* Pass the desired amount to paymenthandler */}
                    <button className="get-started-btn" onClick={() => paymenthandler(1000)}>Get Started</button>
                </div>
                <div className="pricing-box popular">
                    <h2>Lifetime</h2>
                    <div className="price">Popular Rs 2000</div>
                    <p>No Recurring Payments</p>
                    <hr />
                    <ul>
                        <li><span className="feature">1 Android Application</span></li>
                        <li><span className="feature">Unlimited Builds</span></li>
                        <li><span className="feature">Unlimited Active Users</span></li>
                        <li><span className="check-icon">✓</span> No Appilix Logo</li>
                        <li><span className="check-icon">✓</span> Admob Ad</li>
                        <li><span className="check-icon">✓</span> Push Notifications</li>
                        <li><span className="check-icon">✓</span> Play Store Releasable</li>
                    </ul>
                    {/* Pass the desired amount to paymenthandler */}
                    <button className="popular_get blue" onClick={() => paymenthandler(200000)}>Get Started</button>
                </div>
            </div>
        </>
    );
}
