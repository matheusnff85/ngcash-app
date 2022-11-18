import React from 'react';

class Dashboard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
    }
  }

  render() {
    return(
      <h2>Dashboard Page</h2>
    )
  }
}

export default Dashboard;