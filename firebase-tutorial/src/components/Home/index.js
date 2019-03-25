import React from 'react';

import { withAuthorization } from '../Session'
import Messages from '../Messages';

const HomePage = () => (
    <div>
        <h1>Home Page</h1>
        <p>The Home Page is accessible to signed in users</p>

        <Messages />
    </div>
)

const condition = authUser => !!authUser

export default withAuthorization(condition)(HomePage);