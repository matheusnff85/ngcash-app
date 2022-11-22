import axios from 'axios';
import React from 'react';
import { IUserLoginInfos } from '../interfaces/loginInterface';
import Table from '../components/table';
import styled from '../css/dashboard.module.css';

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
      dashboardErrorMsg: '',
    }
  }

  async componentDidMount(): Promise<void> {
    const userData = localStorage.getItem('user');
    if (userData) {
      const { token, id } = JSON.parse(userData) as IUserLoginInfos;
      const getUserInfos = await axios
        .get(`http://localhost:3001/users/${id}`, { headers: { Authorization: token } })
          .then((res) => res.data)
          .catch((err) => console.error(err));
      const { username, accountId, userBalance } = getUserInfos;
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
      .catch((err) => {
        this.setState({ dashboardErrorMsg: err.response.data.message });
      });
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
      debitedAccountId: userId,
      creditedAccountId: getUserId,
      value: Number(amountToTransfer).toFixed(2),
      createdAt: new Date().toISOString(),
    };
    const newTransaction = await axios.post('http://localhost:3001/transaction', transactionObj, {
      headers: { Authorization: token } })
      .then((res) => res.data)
      .catch((err) => {
        this.setState({ dashboardErrorMsg: err.response.data.message });
      });
    if (newTransaction) {
      this.setState({ 
        userBalance: userBalance - Number(amountToTransfer),
        amountToTransfer: '',
        userToTransfer: '',
      });
      window.alert('Transação realizada com sucesso!');
      window.location.reload();
    }
  }

  logOut = () => {
    localStorage.removeItem('user');
    window.location.replace('/');
  }

  render(): React.ReactNode {
    const checkButtonStatus = this.payButtonStatus();
    const { 
      username,
      userBalance,
      userTransactions,
      userId,
      userToTransfer,
      amountToTransfer,
      dashboardErrorMsg,
      } = this.state;
    return(
      <main className={ styled.dashboardMainContainer } >
        <header className={ styled.dashboardHeader } >
          <div>
            <h2 className={ styled.dashboardMainTitle } >NG.CASH</h2>
          </div>
          <div className={ styled.headerUserDiv }>
            <h3 className={ styled.dashboardUsername } >{ username }</h3>
            <h3 className={ styled.dashboardUserBalance } >{ `R$: ${userBalance}` }</h3>
            <button
              onClick={ this.logOut }
              className={ styled.dashboardLogoutBtn }
            >
              Log-out
            </button>
          </div>
        </header>
        <div className={ styled.transactionContainer } >
          <h3 className={ styled.transactionTitle } >Informe o nome do usuário para quem deseja transferir e a quantia</h3>
          <input
            type="text"
            placeholder="Username"
            name="userToTransfer"
            value={ userToTransfer }
            onChange={ this.handleChange }
          />
          <input 
            type="number" 
            placeholder="Quantia" 
            name="amountToTransfer"
            value={ amountToTransfer }
            onChange={ this.handleChange }
          />
          <button
            disabled={ checkButtonStatus }
            onClick={ this.newTransaction }
            className={ styled.transactionBtn }
          >
            Transferir
          </button>
          { dashboardErrorMsg && <h2 className={ styled.dashboardErrorMsg } >{ dashboardErrorMsg }</h2>}
        </div>
        <Table
          transactions={ userTransactions }
          userId={ userId }
          />
      </main>
    )
  }
}

export default Dashboard;