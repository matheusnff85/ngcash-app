import React from 'react';

class Register extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  handleChange = ({ target }: any) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { username, password } = this.state;
    return(
      <main>
        <h2>Register Page</h2>
        <input
          type="text"
          name="username"
          placeholder="usuário"
          value={ username }
          onChange={ this.handleChange }
        />
        <ul>
          <li>O usuário precisa ter no mínimo 3 caracteres</li>
        </ul>
        <input
          type="text"
          name="password"
          placeholder="senha"
          value={ password }
          onChange={ this.handleChange }
        />
        <div>
          <p>A senha deve conter no mínimo:</p>
          <ul>
            <li>8 Caracteres</li>
            <li>1 Letra Maiúscula</li>
            <li>1 Número</li>
          </ul>
        </div>
        <button>
          Registrar-se
        </button>
      </main>
    )
  }
}

export default Register;