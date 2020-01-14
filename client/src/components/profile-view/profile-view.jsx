import React from 'react';
import './profile-view.scss';

import { ProfileInfo } from './profile-info';
import { ProfileForm } from './profile-form';

/* =============react-bootstrap-imports=============*/
import Spinner from 'react-bootstrap/Spinner';
/* =============react-bootstrap-imports=============*/

import axios from 'axios';

export class ProfileView extends React.Component {
    constructor() {
        super();
        this.state = {
            usernameNew: null,
            passwordNew: null,
            emailNew: null,
            birthdayNew: null,
        };
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.getUserProfile(accessToken);
        }
    }

    getUserProfile(token) {
        axios.get(`https://rotten-potatoes3000.herokuapp.com/user/${localStorage.getItem('user')}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                this.setState({
                    uerData: reseponse.data,
                    username: response.data.username,
                    password: response.data.password,
                    email: response.data.email,
                    birthday: response.data.birthday,
                    favourites: response.data.favourites
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleProfileUpdate = (event) => {
        event.preventDefault();
        console.log();
        axios.put(`https://rotten-potatoes3000.herokuapp.com/user/${localStorage.getItem('user')}`, {
            username: username,
            password: password,
            email: email,
            birthday: birthday
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(res => {
                const data = res.data;
                console.log('Data updated: ' + data);
                alert('Profile successfully updated!');
                window.open('/'); //Once the user updates the data, they will be redirected to login again!
            })
            .catch(function (error) {
                console.log('Update failed:' + error);
                alert('Unable to update user profile. Try again please!');
            });
    };

    deleteUserProfile() {
        axios.delete(`https://rotten-potatoes3000.herokuapp.com/user/${localStorage.getItem('user')}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(res => {
                confirm('Do you really want to delete your account?')
            })
            .then(res => {
                console.log('User account deleted.');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                window.open('/', '_self');
            })
            .catch(function (error) {
                console.log('Unable to delete user account: ' + error);
            });
    }

    deleteFavouriteMovie(e) {
        const { movie } = this.props;
        e.preventDefault();
        axios.delete(`https://rotten-potatoes3000.herokuapp.com/user/${localStorage.getItem('user')}/movies/${movie._id}`, {
            username: localStorage.getItem('user')
        }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
            .then(res => {
                console.log('movie added to favourite list.');
                alert(`${movie.title} has been deleted from your favorites list!`);
            })
            .catch(error => {
                console.log('Failed to add movie to list: ' + error);
                alert(`Unable to remove ${movie.title} from your favorites list!`)
            });
    }

    render() {
        const { movies } = this.props;

        if (!movies) return <div>
            <Spinner className="profile-view-spinner" animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>;
        return (
            <div className="profile-view">
                <ProfileInfo getUserProfile={getUserProfile} user={userData} />
                <ProfileForm handleProfileUpdate={handleProfileUpdate} deleteUserProfile={deleteUserProfile} deleteFavouriteMovie={deleteFavouriteMovie} />
            </div >
        );
    }
}