import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ILogin } from '../interfaces/loginInterface';


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

  render() {
    const { username, password, loginErrorMsg } = this.state;
    return (
      <main>
        <h2>NG.CASH</h2>
        <p>O app financeiro da <strong>N</strong>ova <strong>G</strong>eração!</p>
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
        >
          Login
        </button>
        <h4>Não possui conta?</h4>
        <Link to="/register" >
          <button>Criar Conta</button>
        </Link>

        { loginErrorMsg && <h2>{ loginErrorMsg }</h2>}
      </main>
    );
  }
}

export default Login;