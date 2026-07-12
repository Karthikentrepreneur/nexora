import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import Header3 from "../Components/Header/Header3";
import Footer1 from "../Components/Footer/Footer1";

const Main = () => {
    const location = useLocation();
    const isHome = location.pathname === "/";

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className='main-page-area'>
            {!isHome && <Header3></Header3>}
            <Outlet></Outlet>
            <Footer1></Footer1>
        </div>
    );
};

export default Main;
