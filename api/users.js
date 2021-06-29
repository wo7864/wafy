import axios from 'axios';
import { API_URL } from '../utils/constant';


export const authUser = async () => {
    const url = `${API_URL}/auth/user`;
    const res = await axios.get(
        url,
        { withCredentials: true }
    );

    return res.data.user;
}



export const signUp = async (data) => {

    const url = `${API_URL}/users`;
    const sendEmailUrl = `${API_URL}/auth/email-auth`;
    const loginUrl = `${API_URL}/auth/login`;

    const res = await axios.post(
        url,
        data,
        { withCredentials: true }
    )

    if(res.status !== 201){
        return ;
    }

    const emailRes = await axios.post(
        sendEmailUrl,
        {
            email: res.data.email,
            id: res.data._id
        }
    )

    if(emailRes.status !== 200){
        return;
    }

    const loginRes = await axios.post(
        loginUrl,
        data,
        { withCredentials: true }
    )

    if(loginRes.status !==200){
        return;
    }

    return loginRes;

}

export const getUsers = async (data) => {

    const url = `${API_URL}/users`;
    await axios({
        method: "GET",
        url: url,
        data: data
    });
}


export const signIn = async (data) => {

    const url = `${API_URL}/auth/login`;
    const res = await axios.post(
        url,
        data,
        { withCredentials: true }
    )
    .catch((e) => {
        return {
            status:401,
            message:e
        };
    })
    
    return res;
}


export const signOut = async () => {
    const url = `${API_URL}/auth/logout`;
    const res = await axios.get(
        url,
        { withCredentials: true }
    )
}