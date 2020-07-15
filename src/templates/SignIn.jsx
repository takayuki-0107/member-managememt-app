import React, { useState, useCallback } from 'react';
// import  from '../reducks/users/operation';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { signIn } from '../reducks/users/operation';
import { TextInput, PrimaryButton } from '../components/Uikit';

const SignIn = (props) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(''),
    [password, setPassword] = useState('');

  const inputEmail = useCallback(
    (e) => {
      setEmail(e.target.value);
    },
    [setEmail]
  );
  const inputPassword = useCallback(
    (e) => {
      setPassword(e.target.value);
    },
    [setPassword]
  );

  return (
    <div className="c-section-container">
      <h2 className="u-text__headline u-text-center">サインイン</h2>
      <div className="module-spacer--medium"></div>
      <TextInput
        fullWidth={true}
        label={'メールアドレス'}
        multiline={false}
        required={true}
        rows={1}
        value={email}
        type={'email'}
        onChange={inputEmail}
      />
      <TextInput
        fullWidth={true}
        label={'パスワード'}
        multiline={false}
        required={true}
        rows={1}
        value={password}
        type={'password'}
        onChange={inputPassword}
      />

      <div className="module-spacer--medium"></div>
      <div className="center">
        <PrimaryButton
          label="sign In"
          onClick={() => dispatch(signIn(email, password))}
        />
        {/* <button onClick={() => props.login()}>google認証</button> */}
        <p onClick={() => dispatch(push('/signup'))}>
          アカウントをお持ちでない方はこちら
        </p>
        <p onClick={() => dispatch(push('/signin/reset'))}>
          パスワードを忘れた方はこちら
        </p>
      </div>
    </div>
  );
};

export default SignIn;
