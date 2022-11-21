import axios from 'axios';
import React from 'react';
import { IUserLoginInfos } from '../interfaces/loginInterface';

class Dashboard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      accountId: '',
      userId: '',
      token: '',
      userBalance: '',
      username: '',
      userTransactions: [],
      userToTransfer: '',
      amountToTransfer: '',
    }
  }

  async componentDidMount(): Promise<void> {
    const userData = localStorage.getItem('user');
    if (userData) {
      const { 
        username,
        accountId,
        userBalance,
        token,
        id
      } = JSON.parse(userData) as IUserLoginInfos;
      this.setState({ username, accountId, token, userId: id, userBalance: userBalance.balance });
      await this.getTransactions(id, token);
    } else {
      window.location.replace('/login');
    }
  }

  handleChange = ({ target }: any) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  getTransactions = async (id: number, token: string) => {
    const result = await axios
      .get(`http://localhost:3001/transaction/user/${id}`, { headers: { Authorization: token }})
        .then((res) => res.data)
        .catch((err) => console.error(err));
    if (result) {
      this.setState({ userTransactions: result });
    }
  }

  payButtonStatus = () => {
    const { userBalance, amountToTransfer, userToTransfer } = this.state;
    return Number(amountToTransfer) > userBalance || Number(amountToTransfer) <= 0 || userToTransfer === '';
  }

  newTransaction = async () => {
    const { userToTransfer } = this.state;
    const getUserId = await axios.get('http://localhost:3001/users', {
      params: { username: userToTransfer } })
      .then((res) => res.data)
      .catch((err) => console.error(err));
    console.log(getUserId);
  }

    // criar uma transferencia, component de table, trocar o retorno do backend do id dos envolvidos para o username

  render() {
    const checkButtonStatus = this.payButtonStatus();
    const { username, userBalance } = this.state;
    return(
      <main>
        <header>
          <div>
            <h2>NG.CASH</h2>
          </div>
          <div>
            <h3>{ username }</h3>
            <h3>{ userBalance }</h3>
            <button>Log-out</button>
          </div>
        </header>
        <div>
          <h3>Informe o nome do usuário para quem deseja transferir e a quantia</h3>
          <input
            type="text"
            placeholder="Username"
            name="userToTransfer"
            onChange={ this.handleChange }
          />
          <input 
            type="number" 
            placeholder="Quantia" 
            name="amountToTransfer"
            onChange={ this.handleChange }
          />
          <button
            disabled={ checkButtonStatus }
            onClick={ this.newTransaction }
          >
            Transferir
          </button>
        </div>
      </main>
    )
  }
}

export default Dashboard;