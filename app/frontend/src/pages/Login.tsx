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
  };

  login = async (loginObj: ILogin) => {
    // const { history } = this.props;
    const result = await axios.post('http://localhost:3001/login', loginObj)
    .then((res) => res.data)
    .catch((err) => {
      this.setState({ loginErrorMsg: err.response.data.message });
    });
    console.log(result);
    if (result) {
      window.location.replace('/dashboard');
    }
  };

  render() {
    const { username, password, loginErrorMsg } = this.state;
    return (
      <main>
        <h2>Login Page</h2>
        <h2>{ loginErrorMsg }</h2>
        <input
          type="text"
          name="username"
          placeholder="usuário"
          value={ username }
          onChange={ this.handleChange }
        />
        <input
          type="text"
          name="password"
          placeholder="senha"
          value={ password }
          onChange={ this.handleChange }
        />

          <button onClick={ () => this.login({ username, password }) } >Login</button>

        <Link to="/register" >
          <button>Cadastrar-se</button>
        </Link>
      </main>
    );
  }
}

export default Login;