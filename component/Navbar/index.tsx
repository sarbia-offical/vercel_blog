import type { NextPage } from 'next';
import styles from './index.module.scss';
import { navs } from './config';
import { useRouter } from 'next/router';
import { Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Link from 'next/link';

import Login from '../Login/index';
const Navbar: NextPage = () => {
  const { pathname } = useRouter();
  const [isShow, setIsShow] = useState(false);
  console.log('pathname', pathname);

  // methods
  const handleLogin = () => {
    setIsShow(true);
  };

  const handleCreate = () => {
    console.log('create');
  };

  const handleClose = (flag: boolean = false) => {
    setIsShow(flag);
  };

  const handleGotoEditorPage = () => {};

  return (
    <div className={styles.navbar}>
      <section className={styles.logoArea}>BLOG-C</section>
      <section className={styles.linkArea}>
        {navs?.map((nav) => (
          <Link key={nav?.label} href={nav?.value}>
            <span className={pathname === nav?.value ? styles.active : ''}>
              {nav?.label}
            </span>
          </Link>
        ))}
      </section>
      <section className={styles.operationArea}>
        <Button onClick={handleGotoEditorPage}>写文章</Button>
        <Button type="primary" onClick={handleLogin}>
          登录
        </Button>
      </section>

      {/* 弹窗 */}
      <Login isShow={isShow} handleClose={handleClose}></Login>
    </div>
  );
};
export default Navbar;
