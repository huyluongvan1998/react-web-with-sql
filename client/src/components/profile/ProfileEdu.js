import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';

const ProfileEdu = ({education: {
    current,
    degree,
    description,
    fieldofstudy,
    from,
    school,
    to,
}}) => {
    return (
        <div>
          <h2 className="text-primary">Education</h2>
            <div>
                <h3>{school}</h3>
                <p>{from}{' '}
                -{' '} {current ? ('Now'
                ) : (
                <Moment format='YYYY-MM-DD'> {to} </Moment> ) } 
                </p>
                <p><strong>Degree: </strong>{degree}</p>
                <p><strong>Field Of Study: </strong>{fieldofstudy}</p>
                <p>
                <strong>Description: </strong>{description}
                </p>
            </div>
        </div>
    )
}

ProfileEdu.propTypes = ({
    education : PropTypes.object.isRequired,
})

export default ProfileEdu
