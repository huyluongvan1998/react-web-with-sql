import React, { useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

//action 
import { createProfile } from '../../action/profile';
//action
const CreateProfile = ({ createProfile, history }) => {
    const [ formData, setFormData ] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills:'' ,
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    });

    const [ displaySocialLink, ToggleSocialLink ] = useState(false); 

    const {
        company,
        website,
        location,
        status,
        skills ,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData;

    const onChangeHandle = e => {
      setFormData({...formData, [e.target.name] : e.target.value });
    }

    const submitHandler = e => {
      e.preventDefault();

      createProfile(formData, history);
    }

    return (
        <Fragment>
      <h1 className="large text-primary">
        Create Your Profile
      </h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => submitHandler(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={e => onChangeHandle(e)}>
            <option value="0" >* Select Professional Status</option>
            <option value="Developer" >Developer</option>
            <option value="Junior Developer" >Junior Developer</option>
            <option value="Senior Developer" >Senior Developer</option>
            <option value="Manager" >Manager</option>
            <option value="Student or Learning" >Student or Learning</option>
            <option value="Instructor" >Instructor or Teacher</option>
            <option value="Intern" >Intern</option>
            <option value="Other" >Other</option>
          </select>
          <small className="form-text"
            >Give us an idea of where you are at in your career</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" 
          onChange={e => onChangeHandle(e)}
          value ={company} />
          <small className="form-text"
            >Could be your own company or one you work for </small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" 
          onChange={e => onChangeHandle(e)}
          value ={website}
          />
          <small className="form-text"
            >Could be your own or a company website</small
          >
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" 
          onChange={e => onChangeHandle(e)}
          value ={location}
          />
          <small className="form-text"
            >City & state suggested (eg. Boston, MA)</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" 
          onChange={e => onChangeHandle(e)}
          value ={skills}
          />
          <small className="form-text"
            >Please use comma separated values (eg.
            HTML,CSS,JavaScript,PHP)</small
          >
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            onChange={e => onChangeHandle(e)}
            value ={githubusername}
            
          />
          <small className="form-text"
            >If you want your latest repos and a Github link, include your
            username</small
          >
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio"
          onChange={e => onChangeHandle(e)}
          value ={bio}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button type="button" className="btn btn-light" onClick={() => ToggleSocialLink(!displaySocialLink)}>
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {
          displaySocialLink && 
          <Fragment>
              <div className="form-group social-input">
                <i className="fab fa-twitter fa-2x"></i>
                <input type="text" placeholder="Twitter URL" name="twitter" 
                  onChange={e => onChangeHandle(e)}
                  value={twitter} />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-facebook fa-2x"></i>
                <input type="text" placeholder="Facebook URL" name="facebook" 
                  onChange={e => onChangeHandle(e)}
                  value={facebook} />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-youtube fa-2x"></i>
                <input type="text" placeholder="YouTube URL" name="youtube" 
                  onChange={e => onChangeHandle(e)}
                  value={youtube} />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-linkedin fa-2x"></i>
                <input type="text" placeholder="Linkedin URL" name="linkedin" 
                  onChange={e => onChangeHandle(e)}
                  value={linkedin} />
              </div>

              <div className="form-group social-input">
                <i className="fab fa-instagram fa-2x"></i>
                <input type="text" placeholder="Instagram URL" name="instagram" 
                  onChange={e => onChangeHandle(e)}
                  value={instagram} />
              </div>
          </Fragment>
        }
        
        <input type="submit" className="btn btn-primary my-1" />
        <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
      </form>
    </Fragment>
    )
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
