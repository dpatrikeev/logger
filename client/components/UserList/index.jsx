import React from 'react';
import PropTypes from 'prop-types';

import User from './components/User';

function UserList(props) {
    const {
        getUserErrors,
        userList,
    } = props;

    return (
        <div>
            {userList && userList.map(el => (
                <User
                    key={el}
                    userId={el}
                    getUserErrors={getUserErrors}
                />
            )) }
        </div>
    );
}

UserList.propTypes = {
    userList: PropTypes.array,
    userErrors: PropTypes.array,
    getUserErrors: PropTypes.func.isRequired,
};

UserList.defaultProps = {
    userList: [],
    userErrors: [],
};

export default UserList;
