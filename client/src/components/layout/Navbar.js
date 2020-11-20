import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

import { logout } from '../../action/auth';

const Navbar = ({ auth: {isAuthenticated, loading}, logout }) => {

const guestLink = (
    <ul>
        <li><Link to="/profiles">Developers</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
    </ul>
  )
const authLink = (
    <ul>
          <li><Link to="#!" onClick={logout}>
          <i className="fas fa-sign-out-alt" />{' '}
            <span className='hide-sm'>Log Out</span>
          </Link></li>
    </ul>
)


    return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> MySite</Link>
      </h1>
      {
        !loading && (
          <Fragment>
            { isAuthenticated ? authLink : guestLink }
          </Fragment>
        )
      }
    </nav>
    )
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);
