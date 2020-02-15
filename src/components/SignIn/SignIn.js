import React, { Component } from 'react';
import './SignIn.css';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChanged = (event) => {
        this.setState({ signInEmail: event.target.value })
    }

    onPasswordChanged = (event) => {
        this.setState({ signInPassword: event.target.value })
    }

    saveAuthTokenInSession = (token) => {
        window.localStorage.setItem('token', token);
    }

    onSignInSubmit = () => {
        // SignIn with the username and pass and get auth token
        fetch("https://sleepy-castle-79381.herokuapp.com/signin", {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('signInData', data)
                if (data.userId && data.success === true) {
                    // Once we got auth token, save it in storage
                    // and get the user profile based on user id
                    this.saveAuthTokenInSession(data.token);
                    fetch(`https://sleepy-castle-79381.herokuapp.com/profiles/${data.userId}`, {
                        method: 'get',
                        headers: {
                            'content-type': 'application/json',
                            'authorization': data.token
                        }
                    }).then(response => response.json())
                        .then(user => {
                            if (user && user.email) {
                                this.props.loadUser(user);
                                this.props.onRouteChange('home');
                            }
                        })
                }
            })
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <div className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChanged} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white hover-black w-100" type="email" name="email-address" id="email-address" />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChanged} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white hover-black w-100" type="password" name="password" id="password" />
                            </div>
                            <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox" /> Remember me</label>
                        </fieldset>
                        <div className="">
                            <input onClick={this.onSignInSubmit
                            } className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}

export default SignIn;