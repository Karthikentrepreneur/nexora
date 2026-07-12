import { Outlet } from 'react-router';
import Footer1 from '../Components/Footer/Footer1';
import Header2 from '../Components/Header/Header2';

const Layout3 = () => {
    return (
        <div className='main-page-area2'>
            <Header2></Header2>
            <Outlet></Outlet>
            <Footer1></Footer1>
        </div>
    );
};

export default Layout3;