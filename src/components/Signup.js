import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

    const host = props.host;

    const [credentials, setCredentials] = useState({ name: "", email: "", enrollment: "", password: "", cpassword: "" })
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, enrollment, password, cpassword } = credentials;

        if (password !== cpassword) {
            props.showAlert("Password Not Matched", "danger")
        } else {
            const response = await fetch(`${host}/api/auth/createuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, enrollment, password })
            });
            const json = await response.json()
            // console.log(json);
            if (json.success) {
                // Save the auth token and redirect
                // localStorage.setItem('token', json.authtoken);
                navigate('/login');
                props.showAlert("Acount created successfully", "success")

            }
            else {
                props.showAlert("Invalid Credentials", "danger")
            }
        }


    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div id='signup' className='container mt-3 text-light'>
            <h2>Create Acount In Library</h2>
            <form className='my-3' onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" onChange={onChange} id="name" name="name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="enrollment" className="form-label">Enrollment</label>
                    <input type="number" className="form-control" onChange={onChange} required id="enrollment" name="enrollment" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} minLength={5} required name="password" id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={onChange} minLength={5} required name="cpassword" id="cpassword" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup