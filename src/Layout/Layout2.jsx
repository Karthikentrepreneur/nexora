import { Outlet } from 'react-router';
import Footer1 from '../Components/Footer/Footer1';
import Header1 from '../Components/Header/Header1';

const Layout2 = () => {
    return (
        <div className='main-page-area2'>
            <Header1></Header1>
            <Outlet></Outlet>
            <Footer1></Footer1>
        </div>
    );
};

export default Layout2;