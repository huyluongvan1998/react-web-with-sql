import React, {Fragment, useState} from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../action/auth';



const Login = ({ login, isAuthenticated }) => {

    const [loginData, setLoginForm]= useState({
        email: '',
        password: ''
    });

    const {email, password} = loginData;

    const onChange = event => setLoginForm({...loginData, 
        [event.target.name] : event.target.value
    });
    const onSubmit = event => {
        event.preventDefault();

        login({email, password});
    }

    if(isAuthenticated){
        
        return <Redirect to='/dashboard' />
     }
     
    return (
        <Fragment>
            <section className="container">
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
                <form className="form" onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}

                    />
                    </div>
                    <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                    />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
                <p className="my-1">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </section>
        </Fragment>
    )
}


Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated //take all data of auth from redux
})

export default connect(mapStateToProps, { login })(Login);
