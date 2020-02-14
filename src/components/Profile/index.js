import React from 'react'
import './Profile.css'

export class Profile extends React.Component {
    state = {
        // we can update name, email etc.
        // just updating name as an example
        name: this.props.user.name
    }

    onNameChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }

    onProfileUpdate = (data) => {
        fetch(`https://sleepy-castle-79381.herokuapp.com/profiles/${this.props.user.id}`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                formInput: data
            })
        })
        .then(res => {
            this.props.toggleModal();
            this.props.loadUser({ ...this.props.user, data })
        })
    }

    render() {
        const { user, toggleModal } = this.props;
        return (
            <div
                className="profile-modal">
                <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
                    <main className="pa4 black-80 w-80">
                        <img
                            src="http://tachyons.io/img/logo.jpg"
                            className="h3 w3 dib" alt="avatar" />
                        <h1>{this.state.name} </h1>
                        <h4>Images submitted: {user.entries} </h4>
                        <p>Member since: {new Date(user.joined).toLocaleDateString()} </p>
                        <hr />

                        <label className="mt2 fw6" htmlFor="user-name">Name:</label>
                        <input
                            className="pa2 ba w-100"
                            type="text"
                            name="user-name"
                            id="name"
                            onChange={this.onNameChange}
                        />

                        <div className='mt4' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                            <button
                                className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20'
                                onClick={() => this.onProfileUpdate(this.state)}
                            >
                                Save
                                </button>
                            <button
                                className='b pa2 grow pointer hover-white w-40 bg-light-red b--black-20'
                                onClick={toggleModal}
                            >
                                Cancel
                                </button>
                        </div>
                    </main>
                    <div className='modal-close' onClick={toggleModal}>&times;</div>
                </article>
            </div>
        )
    }
} 
