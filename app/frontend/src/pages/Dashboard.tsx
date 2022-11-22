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

  getUserIdByUsername = async (username: string) => {
    const { token } = this.state;
    const result = await axios.get('http://localhost:3001/users/0', {
      headers: { Authorization: token },
      params: { username } })
      .then((res) => res.data)
      .catch((err) => console.error(err));
    return result.id;
  }

  payButtonStatus = () => {
    const { userBalance, amountToTransfer, userToTransfer, username } = this.state;
    return Number(amountToTransfer) > userBalance 
      || Number(amountToTransfer) <= 0 
      || userToTransfer === ''
      || username === userToTransfer;
  }

  newTransaction = async () => {
    const { userToTransfer, userId, amountToTransfer, token, userBalance } = this.state;
    const getUserId = await this.getUserIdByUsername(userToTransfer);
    const transactionObj = {
      debitedAccountId: getUserId,
      creditedAccountId: userId,
      value: Number(amountToTransfer),
      createdAt: new Date().toISOString(),
    }
    const newTransaction = await axios.post('http://localhost:3001/transaction', transactionObj, {
      headers: { Authorization: token } })
      .then((res) => res.data)
      .catch((err) => console.error(err));
    if (newTransaction) {
      this.setState({ userBalance: userBalance - Number(amountToTransfer)});
    }
  }

  logOut = () => {
    localStorage.removeItem('user');
    window.location.replace('/');
  }

  // criar uma transferencia - OK
  // botão de logout
  // component de table
  // trocar o retorno do backend do id dos envolvidos para o username
  // remover log do backend - ok

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
            <button
              onClick={ this.logOut }
            >
              Log-out
            </button>
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