import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ProfileAbout from './ProfileAbout';
import ProfileExp from './ProfileExp';
import ProfileEdu from './ProfileEdu';
import ProfileGithub from './ProfileGitHub';

const ProfileTop = ({profile: {
    company,
    location,
    skills,
    social,
    status,
    website,
    user:{ name, avatar },
    education,
    experience,
    githubusername
}}) => {
    return (
        <Fragment>
            <div className="profile-top bg-primary p-2 ">
                <img
                    className="round-img my-1"
                    src={avatar}
                    alt=""
                />
                <h1 className="large">{name}</h1>
                <p className="lead">{status} {company ? `at ${company}`  : ''}</p>
                <p>{location}</p>


                <div className="icons my-1">
                    {website && (
                        <Link to={website} target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-globe fa-2x"></i>
                        </Link>
                    )}
                    {/* twitter */}
                    {
                        social && social.twitter && (
                    <Link to={social.twitter} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter fa-2x"></i>
                    </Link>
                        )
                    }
                    {/* facebook */}
                    {
                        social && social.facebook && (
                    <Link to={social.facebook} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook fa-2x"></i>
                    </Link>
                        )
                    }

                    {/* linkedin */}
                    {
                        social && social.facebook && (
                    <Link to="#" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin fa-2x"></i>
                    </Link>
                        )
                    }

                    {/* youtube */}
                    {
                        social && social.youtube && (
                    <Link to={social.youtube} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-youtube fa-2x"></i>
                    </Link>
                    )
                    }
                    {/* instagram */}
                    {
                        social && social.instagram && (
                    <Link to={social.instagram} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram fa-2x"></i>
                    </Link>
                        )
                    }
                </div>
            </div>
            <ProfileAbout skills={skills} info={name} />
            <div className="profile-grid my-2">
                <div className="profile-exp bg-white p-2">
                    <Fragment>
                        {
                            experience.length > 0 && experience.map((exp, idx) => (
                                <ProfileExp key={idx} experience={exp} />
                        ) )
                        }
                    </Fragment>
                </div>
                <div className="profile-edu bg-white p-2">
                    <Fragment>
                        {
                            education.length > 0 && education.map((edu, idx) => (
                                <ProfileEdu key={idx} education={edu} />
                        ) )
                        }
                    </Fragment>
                </div>
            </div>
            {githubusername && 
           <ProfileGithub username={githubusername} />}
           </Fragment>
        
        
    )
}

export default ProfileTop
