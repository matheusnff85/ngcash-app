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

  getTransactions = async (id: number, token: string) => {
    const result = await axios
      .get(`http://localhost:3001/transaction/user/${id}`, { headers: { Authorization: token }})
        .then((res) => res.data)
        .catch((err) => console.error(err));
    console.log(result);
  }

  render() {
    return(
      <main>
        <h2>Dashboard Page</h2>
        <div>
          <h2>Informe o nome do usuário para quem deseja transferir e a quantia</h2>
          <input type="text" placeholder="Username" />
          <input type="number" placeholder="Quantia" />
          <button>Transferir</button>
        </div>
        <button>Log-out</button>
      </main>
    )
  }
}

export default Dashboard;