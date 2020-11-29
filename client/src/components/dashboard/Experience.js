import React, {Fragment} from 'react';
import Moment from 'react-moment';
import { deleteExp } from '../../action/profile';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const Experience = ({ experiences, deleteExp}) => {

    const data = experiences.map(exp => (
                        <tr key={exp._id}>
                            <td> 
                                {exp.company}
                            </td>
                            <td className='hide-sm'>
                                {exp.title}
                            </td>
                            <td className='hide-sm'>
                                <Moment format='YYYY/MM/DD'> 
                                  {exp.from}
                                </Moment>
                                {' '}- {
                                    exp.current ? 'Now' 
                                    : 
                                        <Moment format='YYYY/MM/DD'>
                                                {exp.to}
                                        </Moment>
                                    }
                            </td>
                            <td>
                                <button className='btn btn-danger' onClick={() => 
                                deleteExp(exp._id)
                            }> Delete </button>
                            </td>
                         </tr>
                    ));

    return (
        <Fragment>
            <h2 className='my-2'>Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className='hide-sm'>Title</th>
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

Experience.propTypes = {
    deleteExp: PropTypes.func.isRequired,
}

export default connect(null, { deleteExp })(Experience);
