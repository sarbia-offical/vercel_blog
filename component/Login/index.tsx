import { ChangeEvent, useState } from 'react';
import CountDown from '../CountDown';
import { message } from 'antd';
import styles from './index.module.scss';
import request from '../../service/fetch';
interface IProps {
  isShow: boolean;
  handleClose: Function;
}

const Login = (props: IProps) => {
  const { isShow = false, handleClose } = props;

  const [form, setForm] = useState({
    name: '',
    gender: '',
    phone: '',
    verify: '',
  }); // 表单

  const [isShowVerifyCode, setIsShowVerifyCode] = useState(false);

  // 表单修改
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setForm({
      ...form,
      [name]: value,
    });
  };

  // 获取验证码
  const handleGetVerifyCode = () => {
    // setIsShowVerifyCode(true);
    if (!form.phone) {
      message.error('请输入手机号');
      return;
    } else {
      setIsShowVerifyCode(true);
      request
        .post('/api/user/sendVerifyCode', {
          to: form?.phone,
          templateId: 1,
        })
        .then((res: any) => {
          if (res?.code === 200) {
            console.log('请求成功', res);
          } else {
            console.log('请求失败', res);
            message.error(res?.msg || '未知错误');
          }
        });
    }
  };

  // 验证码弹窗关闭
  const handleCountDownEnd = () => {
    setIsShowVerifyCode(false);
  };

  // 登录
  const handleLogin = () => {};

  // 使用第三方github登录
  const handleOAuthGithub = () => {};

  return isShow ? (
    <div className={styles.loginArea}>
      <div className={styles.loginBox}>
        <div className={styles.loginTitle}>
          <div>手机号登录</div>
          <div
            className={styles.close}
            onClick={() => {
              handleClose && handleClose();
            }}
          >
            x
          </div>
        </div>
        <input
          name="phone"
          type="text"
          placeholder="请输入手机号"
          value={form.phone}
          onChange={handleFormChange}
        />
        <div className={styles.verifyCodeArea}>
          <input
            name="verify"
            type="text"
            placeholder="请输入验证码"
            value={form.verify}
            onChange={handleFormChange}
          />
          <span className={styles.verifyCode} onClick={handleGetVerifyCode}>
            {isShowVerifyCode ? (
              <CountDown time={10} onEnd={handleCountDownEnd}></CountDown>
            ) : (
              '获取验证码'
            )}
          </span>
        </div>
        <div className={styles.loginBtn} onClick={handleLogin}>
          登录
        </div>
        <div className={styles.otherLogin} onClick={handleOAuthGithub}>
          使用 Github 登录
        </div>
        <div className={styles.loginPrivacy}>
          注册登录即表示同意
          <a
            href="https://moco.imooc.com/privacy.html"
            target="_blank"
            rel="noreferrer"
          >
            隐私政策
          </a>
        </div>
      </div>
    </div>
  ) : null;
};

export default Login;
