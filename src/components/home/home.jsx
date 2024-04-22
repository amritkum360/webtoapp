import Navbar from "../Navbar/Navbar";
import Pricing from "../Pricing/Pricing";
import Homescn1 from "./components/homescn1/homescn1";
import Homescn2 from "./components/homescn2/homescn2";

export default function Home(){
    return(
        <>
        {/* <Navbar /> */}
        <Homescn1 />
        <Homescn2 />
        <Pricing />
        {/* <img src="/1.png" alt="" style={{width:"100vw"}} />
        <img src="/2.png" alt="" style={{width:"100vw"}} /> */}
        </>
    )
}