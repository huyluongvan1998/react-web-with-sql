import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Spinner } from '../layout/Spinner';
import { Link} from 'react-router-dom';
import DashboardAction from './DashboardAction';
import Experience from './Experience';
import Education from './Education';


//actio
import { getCurrentProfile, accountDeleted } from '../../action/profile';
//action

const Dashboard =  ({ 
    getCurrentProfile,
    accountDeleted,
    auth: { user }, 
    profile: { profile, loading }}) => {

    useEffect(() => {
         getCurrentProfile();
    }, [getCurrentProfile]);

    return loading && profile === null ? (<Spinner />
        ) : (
        <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"></i>
                Welcome {user && user.name} 
            </p>
        {
            profile !== null ?(
            <Fragment>
                <DashboardAction />
                <Experience experiences={profile.experience} />
                <Education educations={profile.education} />
                <button
                    className='btn btn-danger my-2'
                    onClick={() => accountDeleted()}
                >Delete Account</button>
            </Fragment> 
            ) : (      
            <Fragment>
                <p>you have not yet setup a profile, please add some info</p>
                <Link to='/create-profile' className='btn btn-primary my-1' >
                    Create Profile
                </Link>
                <button
                    className='btn btn-danger my-2'
                    onClick={() => accountDeleted()}
                >Delete Account</button>
            </Fragment> )
        }

    </Fragment>)
}



Dashboard.propTypes = {
getCurrentProfile : PropTypes.func.isRequired,
accountDeleted: PropTypes.func.isRequired,
auth: PropTypes.object.isRequired,
profile: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile 
})

export default connect(mapStateToProps, { 
    getCurrentProfile, 
    accountDeleted 
})(Dashboard);

