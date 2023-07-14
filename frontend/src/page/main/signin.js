import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import { userRole } from '../../Slice/seatNumberSelecction';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import { useDispatch } from "react-redux"
import 'react-toastify/dist/ReactToastify.css';
import config from '../../config';



function Signin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()
    const Navigate = useNavigate();

    const signin = () => {

        if (email.length === 0) {
            toast.error("Enter Email");
        } else if (password.length === 0) {
            toast.error("Enter Password");
        } else {
            const body = {
                email,
                password,
            };
            axios.post(config.serverURL + "/user/signin", body).then((response) => {
                const result = response.data;
                if (result["Status"] === "success") {
                    sessionStorage['token'] = result['data']['token']
                    sessionStorage['role'] = result['data']['role']
                    sessionStorage['username'] = result['data']['username']
                    dispatch(userRole({ userRoleValue: result['data']['role'] }))
                    toast.success("Welcome, " + result.data.username);
                    if (result['data']['role'] === "Admin") {
                        Navigate("/adminhome");
                    }
                    dispatch(userRole({ userRoleValue: result['data']['role'] }))
                    if (result['data']['role'] === "Theater_Admin") {
                        Navigate("/theateradmin");
                    }
                    if (result['data']['role'] === "User"){
                        Navigate("/home");}
                } 
                else {
                    toast.error("Invalid username or password");
                }
            }).catch((error) => {
                toast.error(error.response.data.Data)
            });
        }
    };

    return (
        <div style={{ marginTop: 100 }}>
            <div style={styles.container}>
                <div className='mb-3'>
                    <label>Email</label>
                    <input
                        onChange={(event) => {
                            setEmail(event.target.value)
                        }}
                        className='form-control'
                        type='email'
                    />
                </div>
                <div className='mb-3'>
                    <label>Password</label>
                    <input required="required"
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}
                        className='form-control'
                        type='password'
                    />
                </div>
                <div className='mb-3' style={{ marginTop: 40 }}>
                    <div>
                        Dont have an account? <Link to='/signup'>Signup here</Link>
                    </div>
                    <button onClick={() => { signin() }} style={styles.signinButton}>
                        Signin
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Signin

const styles = {
    container: {
        width: 400,
        height: 300,
        padding: 20,
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 'auto',
        borderColor: '#ffc107',
        borderRadius: 10,
        broderWidth: 1,
        borderStyle: 'solid',
        boxShadow: '1px 1px 20px 5px #C9C9C9',
    },
    signinButton: {
        position: 'relative',
        width: '100%',
        height: 40,
        backgroundColor: '#ffc107',
        color: 'black',
        borderRadius: 5,
        border: 'none',
        marginTop: 10,
    },
}