import React, { Fragment, useState} from 'react';
import { connect } from 'react-redux';
import { Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { addEducation } from '../../action/profile';

const AddEducation = ({ addEducation, history }) => {
    const [formData, setFormData ] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisable, toggleToDate] = useState(false);

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = formData;

    const onChangeHandler = e => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmitHandler = e => {
      e.preventDefault();
      addEducation(formData, history);
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                Add Your Education
            </h1>
            <p className="lead">
                <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc that
                you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmitHandler(e) }>
                <div className="form-group">
                <input
                    type="text"
                    placeholder="* School or Bootcamp"
                    name="school"
                    onChange={e => onChangeHandler(e)}
                    value={school}
                />
                </div>
                <div className="form-group">
                <input
                    type="text"
                    placeholder="* Degree or Certificate"
                    name="degree"
                    onChange={e => onChangeHandler(e)}
                    value={degree}
                />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Field Of Study"
                    name="fieldofstudy"
                    onChange={e => onChangeHandler(e)}
                    value={fieldofstudy}
                  />
                </div>
                <div className="form-group">
                  <h4>From Date</h4>
                <input 
                  type="date" 
                  name="from"
                  onChange={e => onChangeHandler(e)}
                  value={from} 
                  />
                </div>
                <div className="form-group">
                <p>
                    <input 
                      type="checkbox" 
                      // GODDDDD REMEMBER TO NOT DELETE THE TAG NAME PLEASEEEE
                      // ABSOLUTE IDOTTTTTTTTTTTT 2 HOURS FOR THIS SH*******
                      name='current' 
                      value={current}
                      checked={current}
                      onChange={(e) => {
                        //USING HOOK => USE SPREAD OPERATOR PLEASEEEEEE
                          setFormData({...formData, current: !current });
                          toggleToDate(!toDateDisable);
                        }}
                    />{' '} 
                      Current School or Bootcamp
                </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                  <input 
                    type="date" 
                    name="to"
                    onChange={e => onChangeHandler(e)}
                    value={to} 
                    disabled= { toDateDisable ? 'disabled' : '' }
                />
                </div>
                <div className="form-group">
                <textarea
                    name="description"
                    cols="30"
                    rows="5"
                    placeholder="Program Description"
                    onChange={e => onChangeHandler(e)}
                    value={description}
                ></textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </Fragment>
    );
};

AddEducation.propTypes = ({
    addEducation: PropTypes.func.isRequired,
})

export default connect(null, { addEducation })(withRouter(AddEducation));