import { createContext } from 'react';

/*
*   id: ObjectID
*   email: user Email
*   projects: project list
*       id: objectID
*       title: project title
*       thumbnail: project thumbnail image
*       update_date: recent update date
*       options: object
*/

export const user = {
    id: '',
    setUser: (data) => {
        Object.keys(data).forEach(key => {
            user[key] = data[key]
        })
    }
}

export const UserContext = createContext(user);

