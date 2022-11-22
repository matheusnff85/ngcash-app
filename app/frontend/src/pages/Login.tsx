import React from 'react';
import axios from 'axios';
import { ILogin } from '../interfaces/loginInterface';
import styled from '../css/login.module.css';


class Login extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginErrorMsg: '',
    }
  }

  handleChange = ({ target }: any) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  login = async (loginObj: ILogin) => {
    localStorage.removeItem('user');
    const result = await axios.post('http://localhost:3001/login', loginObj)
    .then((res) => res.data)
    .catch((err) => {
      this.setState({ loginErrorMsg: err.response.data.message });
    });
    if (result) {
      localStorage.setItem('user', JSON.stringify(result));
      window.location.replace('/dashboard');
    }
  }

  render(): React.ReactNode {
    const { username, password, loginErrorMsg } = this.state;
    return (
      <main className={ styled.loginMainContainer } >
        <div className={ styled.loginHeader } >
          <h2 className={ styled.loginMainTitle } >NG.CASH</h2>
          <p className={ styled.loginSubTitle } >O app financeiro da <strong>N</strong>ova <strong>G</strong>eração!</p>
        </div>
        <div className={ styled.loginInputs }>
          <input
            type="text"
            name="username"
            placeholder="usuário"
            value={ username }
            onChange={ this.handleChange }
          />
          <input
            type="password"
            name="password"
            placeholder="senha"
            value={ password }
            onChange={ this.handleChange }
          />
          <button 
            onClick={ () => this.login({ username, password }) }
            className={ styled.loginBtn }
          >
            Login
          </button>
        </div>
        { loginErrorMsg && <h2 className={ styled.loginErrorMsg } >{ loginErrorMsg }</h2>}
        <div className={ styled.loginRegisterDiv } >        
          <h4>Não possui conta?</h4>
          <button onClick={ () => window.location.replace('/register') } >Criar Conta</button>
        </div>
      </main>
    );
  }
}

export default Login;