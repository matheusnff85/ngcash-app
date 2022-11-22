import React from 'react';
import axios from 'axios';
import { ILogin } from '../interfaces/loginInterface';
import styled from '../css/register.module.css';

class Register extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      password: '',
      responseMessage: '',
    }
  }

  handleChange = ({ target }: any) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  buttonStatus = () => {
    const { username, password } = this.state;

    const regex = /(?=.*[A-Z])(?=.*\d)[A-Za-z\d$@$!%*?&.]{8}/;
    return (username.length >= 3) && (password.match(regex));
  }

  register = async (userObj: ILogin) => {
    const result = await axios.post('http://localhost:3001/users', userObj)
      .then((res) => res.data)
      .catch((err) => {
        this.setState({ responseMessage: err.response.data.message });
      });
    if (result) {
      this.setState({ responseMessage: 'Registrado com sucesso' });
      window.location.replace('/login');
    }
  }

  render(): React.ReactNode {
    const checkButtonStatus = this.buttonStatus();
    const { username, password, responseMessage } = this.state;
    return(
      <main className={ styled.registerMainContainer } >
        <div className={ styled.registerHeader } >
          <h2 className={ styled.registerMainTitle } >NG.CASH</h2>
          <p className={ styled.registerSubTitle } >O app financeiro da <strong>N</strong>ova <strong>G</strong>eração!</p>
        </div>
        <div className={ styled.registerInputs }>
          <input
            type="text"
            name="username"
            placeholder="usuário"
            value={ username }
            onChange={ this.handleChange }
          />
          <ul className={ styled.registerUserReqs } >
            <li>O usuário precisa ter no mínimo 3 caracteres</li>
          </ul>
          <input
            type="password"
            name="password"
            placeholder="senha"
            value={ password }
            onChange={ this.handleChange }
          />
          <div className={ styled.registerPassReqs } >
            <p>A senha deve conter no mínimo:</p>
            <ul>
              <li>8 Caracteres</li>
              <li>1 Letra Maiúscula</li>
              <li>1 Número</li>
            </ul>
          </div>
          <button
            disabled={ !checkButtonStatus }
            onClick={ () => this.register({ username, password }) }
            className={ styled.registerBtn }
          >
            Registrar-se
          </button>
        </div>
        { responseMessage && <h2 className={ styled.registerErrorMsg } >{ responseMessage }</h2>}
      </main>
    )
  }
}

export default Register;