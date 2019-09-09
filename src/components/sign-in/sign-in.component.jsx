import React from 'react';
import './sign.styles.scss';

class SignIn extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }
}

render() {
    const {email, password} = this.state;
    return (
        <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form action="">
                <input type="email" name='email' value={email}/>
                <label htmlFor="">Email</label>
                <input type="password" name='password' value={password}/>
                <label htmlFor="">Email</label>
            </form>
        </div>
    )
}
