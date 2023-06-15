/*
 * @Description: 
 * @version: 
 * @Author: zouwenqin
 * @Date: 2023-06-15 10:59:14
 * @LastEditors: zouwenqin
 * @LastEditTime: 2023-06-15 11:35:25
 */
import type { NextPage } from 'next';
import Navbar from 'component/Navbar';
import Footer from 'component/Footer';
import styles from './index.module.scss';
import React from "react"
const Layout: any = (props: React.PropsWithChildren<{}>) => {
  return (
    <div>
      <Navbar></Navbar>
      <div className={styles.dashboardContainer}>{props.children}</div>
      <Footer></Footer>
    </div>
  );
};
export default Layout;
