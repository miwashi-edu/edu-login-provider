import React from 'react';
import {Fetcher} from '../util/Fetcher/index.js';
import {JsonViewer} from '../util/JsonViewer/index.js';

const ProfileOrganism = () => (
    <div>
        <h2>Profile</h2>
        <Fetcher apiUrl='http://localhost:3000' path='/api/users/'>
            <JsonViewer/>
        </Fetcher>
    </div>
);

export default ProfileOrganism;
