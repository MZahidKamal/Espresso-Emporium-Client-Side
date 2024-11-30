import {Outlet} from "react-router";
import Navbar from "../../Components/Navbar/Navbar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";


const MainLayout = () => {
    return (
        <div className={'font-Rancho'}>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};


export default MainLayout;
