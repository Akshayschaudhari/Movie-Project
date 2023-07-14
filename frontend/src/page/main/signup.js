import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import 'react-toastify/dist/ReactToastify.css';
import config from '../../config'



export default function Signup() {

    const [FirstName, setFirstname] = useState("");
    const [LastName, setLastname] = useState("");
    const [mobile_no, setMobile_no] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const Navigate = useNavigate();

    const signup = () => {
        if (FirstName.length === 0) {
            toast.error("Enter First name");
        } else if (LastName.length === 0) {
            toast.error("Enter Last name");
        } else if (mobile_no.length === 0) {
            toast.error("Enter Mobile no");
        } else if (email.length === 0) {
            toast.error("Enter Email");
        } else if (password.length === 0) {
            toast.error("Enter password");
        } else if (role.length === 0 || role === "Select") {
            toast.error("Select Role");
        }
        else {
            const body = {
                FirstName,
                LastName,
                mobile_no,
                email,
                password,
                role
            };

            axios.post(config.serverURL+"/user/signup", body).then((response) => {
                const result = response.data;
                if (result["Status"] === "success") {
                    toast.success("Successfully Registered");
                    setFirstname("")
                    setLastname("")
                    setEmail("")
                    setMobile_no("")
                    setPassword("")
                    setRole("")
                    Navigate("/signin");
                } else {
                    toast.error("User SignUp failed");
                }
            }).catch((error) => {
                toast.error(error.response.data.Data)
            });
        }
    };

    return (
        <div style={{ marginTop: 50 }}>
            <div style={styles.container}>
                <div className='mb-3'>
                    <label>First name</label>
                    <input
                        onChange={(event) => {
                            setFirstname(event.target.value)
                        }}
                        className='form-control'
                        type='text'
                    />
                </div>
                <div className='mb-3'>
                    <label>Last name</label>
                    <input
                        onChange={(event) => {
                            setLastname(event.target.value)
                        }}
                        className='form-control'
                        type='email'
                    />
                </div>
                <div className='mb-3'>
                    <label>Mobile no.</label>
                    <input
                        
                        onChange={(event) => {
                            setMobile_no(event.target.value)
                        }}
                        className='form-control'
                        type='tel'
                    />
                </div>
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
                <div className='mb-3'>
                    <select style={{ padding : "0.3rem" }} onChange={(event) => {
                        setRole(event.target.value)
                    }}>

                        <option>Select Role</option>
                        {/* <option>Admin</option> */}
                        <option>Theater Administrator</option>
                        <option>User</option>
                    </select>
                </div>

                <div className='mb-3' style={{ marginTop: 40 }}>
                    <button onClick={()=>{signup()}} style={styles.signupButton}>
                        Signup
                    </button>
                </div>
            </div>
        </div>
    )
}

const styles = {
    container: {
        width: 400,
        height: 550,
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
    signupButton: {
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