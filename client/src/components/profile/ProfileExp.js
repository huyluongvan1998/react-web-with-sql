import React from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExp = ({
    experience: {
        company,
        current,
        description,
        from,
        location, 
        title,
        to
    }
}) => {
    return (
        <div>
          <h2 className="text-primary">Experience</h2>
          <div>
            <h3 className="text-dark">{company}</h3>
            <p>
                <Moment format='YYYY-MM-DD' >{from}</Moment>{' '}
                - {' '} {current ? 'Now' : (
                    <Moment format='YYYY-MM-DD'>{to}</Moment>
                ) } 
            </p>
            <p><strong>Position: </strong>{title}</p>
            <p>
              <strong>Description: </strong>{description}.
            </p>
            <p>
              <strong>Location: </strong>{location}.
            </p>
          </div>
        </div>
    )
}

ProfileExp.propTypes = {
    experience : PropTypes.object.isRequired,
}

export default ProfileExp
