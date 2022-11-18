import React from 'react';

class Register extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  render() {
    return(
      <h2>Register Page</h2>
    )
  }
}

export default Register;