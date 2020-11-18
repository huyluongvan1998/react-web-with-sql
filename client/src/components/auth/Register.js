import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom';
// import axios from 'axios';
import { connect } from 'react-redux';
import { setAlert } from '../../action/alert';
import PropTypes from 'prop-types';


const Register = ({ setAlert }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name, email, password, password2} = formData; 

    const onChange = (event) => setFormData({ ...formData, [event.target.name] : event.target.value})
    const onSubmit = async (e) => {
        e.preventDefault(); 
        if(password !== password2){
            setAlert('password do not match', 'danger');
        } else {
            // const newUser = {
            //     name,
            //     email,
            //     password
            // };
            // try {
            //     // configure the header to pass on the Backend route
            //     const config = {
            //         headers: {
            //             "Content-Type" : "application/json"
            //         }
            //     };
    
            //     const body = JSON.stringify(newUser); // turn newuser from object to into a JSON
            //     // pattern for sending requiest to backend using axios
            //     const res = await axios.post('/api/users', body, config); 
            //     console.log(res.data)// send back token
            // } catch (error) {
            //     console.error(error.response.data) // console error in react
            // }
            console.log("success");
        }  
    }

    return (
    <Fragment>
        <section className="container">
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    onChange={e => onChange(e)}
                    required="required"
                    value={name}/>
                </div>
                <div className="form-group">
                <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    onChange={e => onChange(e)}
                    required="required"
                    value={email} />
                <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small>
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    minLength="6"
                    onChange={e => onChange(e)}
                    required="required"
                    value={password}
                />
                </div>
                <div className="form-group">
                <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    minLength="6"
                    onChange={e => onChange(e)}
                    required="required"
                    value={password2}
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </section>
    </Fragment>
    )
}


//check required setAlert must be a function
Register.propTypes = {
    setAlert: PropTypes.func.isRequired, 
}

//By import action to component through Connect => allowed access to props.setAlert
export default connect(null, { setAlert })(Register);
