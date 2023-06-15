import type { NextPage } from 'next';
import Navbar from 'component/Navbar';
import Footer from 'component/Footer';
import styles from './index.module.scss';
const Layout: NextPage = (props) => {
  return (
    <div>
      <Navbar></Navbar>
      <div className={styles.dashboardContainer}>{props.children}</div>
      <Footer></Footer>
    </div>
  );
};
export default Layout;
