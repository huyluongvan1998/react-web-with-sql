import React, {Fragment} from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEdu } from '../../action/profile';
import PropTypes from 'prop-types';


const Education = ({ educations, deleteEdu }) => {

    const data = educations.map(edu => (
                        <tr key={edu._id}>
                            <td> 
                                {edu.school}
                            </td>
                            <td className='hide-sm'>
                                {edu.degree}
                            </td>
                            <td className='hide-sm'>
                                <Moment format='YYYY/MM/DD'> 
                                  {edu.from}
                                </Moment>
                                {' '}- {
                                    edu.current ? 'Now' 
                                    : 
                                        <Moment format='YYYY/MM/DD'>
                                                {edu.to}
                                        </Moment>
                                    }
                            </td>
                            <td>
                                <button className='btn btn-danger'
                                    onClick={() => deleteEdu(edu._id)}
                                > Delete </button>
                            </td>
                            
                         </tr>
                    ));
              

    return (
        <Fragment>
            <h2 className='my-2'>Education Credentials</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>School</th>
                        <th className='hide-sm'>Degree</th>
                        <th className='hide-sm'>Year</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                <tbody>
                    {data}
                </tbody>
            </table>
        </Fragment>
    )
}


Education.propTypes = {
    deleteEdu: PropTypes.func.isRequired,
}

export default connect(null, { deleteEdu } )(Education);
