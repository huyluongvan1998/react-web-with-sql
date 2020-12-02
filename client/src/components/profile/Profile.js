import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileById } from '../../action/profile';
import { Spinner } from '../layout/Spinner';

// Profile Top
import ProfileTop from './ProfileTop';
// Profile Top

const Profile = ({ getProfileById, 
    profile: {profile, loading}, 
    auth,
    match
 }) => {

    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match]);

    return (
        <Fragment>
            {
                loading || profile === null ? (<Spinner />
                ) : (
                <Fragment> 
                    <Link to='/profiles' className='btn btn-primary'>
                        Back to profiles
                    </Link>
                   {
                       auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id 
                       && (
                       <Link to='/edit-profile' className='btn btn-dark'>
                           Edit Profile
                       </Link>
                       )
                   }
                   <ProfileTop profile={profile} />
                </Fragment>
                )
            }
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})


export default connect(mapStateToProps, { getProfileById  } )(Profile);
