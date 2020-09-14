import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import { UserOutlined, KeyOutlined, InsuranceOutlined } from '@ant-design/icons';
import md5 from 'md5';
import FormStyle from './form.module.styl';
import { POST } from '@/utils/http';
import locationPush from '@/utils/location';
type params = {
  [props: string]: string;
};
export default () => {
  const [params, setParams] = useState<params>({
    userName: '',
    passWord: '',
    token: ''
  });

  const handleParams = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const { value } = e.target;
    const result = {
      [type]: value
    };
    const key = {
      ...params,
      ...result
    };
    setParams(key);
  };

  const login = async () => {
    const { userName, passWord, token } = params;
    if (!userName || !passWord || !token) {
      return message.error('检查个人信息是填写正确');
    }
    const result = await POST('/user/login', { ...params, passWord: md5(passWord) });
    const { data } = result;
    if (data) {
      // 登录成功
      localStorage.setItem('TOKEN', data);
      locationPush('test?t=122', true);
    }
  };

  return (
    <div className={FormStyle['box']}>
      <h2>xxx</h2>
      <div>
        <div className={FormStyle['box_input']}>
          <Input prefix={<UserOutlined />} onChange={event => handleParams(event, 'userName')} placeholder="请输入用户名" />
        </div>
        <div className={FormStyle['box_input']}>
          <Input.Password onChange={event => handleParams(event, 'passWord')} prefix={<KeyOutlined />} placeholder="请输入密码" />
        </div>
        <div className={FormStyle['box_input']}>
          <Input prefix={<InsuranceOutlined />} onChange={event => handleParams(event, 'token')} placeholder="请输入令牌" />
        </div>
        <Button onClick={login}>登录</Button>
      </div>
    </div>
  );
};
