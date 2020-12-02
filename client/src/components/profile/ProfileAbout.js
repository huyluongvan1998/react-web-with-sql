import React from 'react'

const ProfileAbout = ({
    info,
    skills
}) => {
    return (
        <div className="profile-about bg-light p-2 my-2">
          <h2 className="text-primary">{`About ${info}`}</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed
            doloremque nesciunt, repellendus nostrum deleniti recusandae nobis
            neque modi perspiciatis similique?
          </p>
          <div className="line"></div>
          <h2 className="text-primary">Skill Set</h2>
          <div className="skills">
            {
                skills.slice(0,4).map((skill, idx) => (
                    <div className="p-1" key={idx}>
                        <i className="fa fa-check"></i> {skill}
                    </div>
                ))
            }
          </div>
        </div>

    )
}


export default ProfileAbout
