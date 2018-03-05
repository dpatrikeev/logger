import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

import UserList from 'components/UserList';
import Search from 'components/Search';

import styles from './styles.sass';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userList: null,
            search: '',
        };
    }

    componentDidMount() {
        this.getUsers()
            .then((json) => {
                const userList = json.map(el => el._id);

                this.setState(() => ({ userList }));
            })
            .catch(error => global.console.log(error));
    }

    getUserErrors = (user) => {
        const url = `/api/users/errors/${user}`;

        const options = {
            method: 'GET',
            credentials: 'include',
        };

        return fetch(url, options)
            .then(response => response.json())
            .then(json => json)
            .catch(error => global.console.log(error));
    };

    getUsers = () => {
        const url = '/api/users';

        const options = {
            method: 'GET',
            credentials: 'include',
        };

        return fetch(url, options)
            .then(response => response.json())
            .then(json => json)
            .catch(error => global.console.log(error));
    };

    applySearch = (query) => {
        this.setState({ search: query });
    }

    render() {
        let list = this.state.userList;

        if (this.state.search !== '') {
            list = this.state.userList.filter(el => el.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1);
        }

        return (
            <div className={styles.app}>
                <Search
                    userList={this.state.userList}
                    applySearch={this.applySearch}
                />
                <UserList
                    userList={list}
                    getUserErrors={this.getUserErrors}
                />
            </div>
        );
    }
}
