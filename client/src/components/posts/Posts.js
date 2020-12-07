import React, { useEffect, Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getPosts } from '../../action/post';
import { Spinner } from '../layout/Spinner';
import PostItem from './PostItem';
import { addPost } from '../../action/post';

const Posts = ({ 
    getPosts, 
    post: { loading, posts },
    addPost
}) => {
    useEffect(() => {
        getPosts();
    }, [getPosts])

    const [text, setText] = useState(' ');


    return loading ? (<Spinner />
    ) : ( 
    <Fragment>
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">
            <i className="fas fa-user">Welcome to the community</i>
        </p>
        <div className="post-form">
            <div className="bg-primary p">
            <h3>Say Something...</h3>
            </div>
            <form className="form my-1" onSubmit={(e) => {
                e.preventDefault();
                addPost( text );
                setText('');
                }
            }>
            <textarea
                name='text'
                cols="30"
                rows="5"
                placeholder="Create a post"
                value={ text }
                onChange={(e) => setText(e.target.value)}
            ></textarea>
            <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
      </div>
        {/* postForm */}
        <div className="posts">
            {posts.map((post, idx) => (
                <PostItem key={idx} post={post} />
            ) )}
        </div>
    </Fragment>
    )
}

Posts.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    addPost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    post: state.post
})

export default connect(mapStateToProps, { getPosts, addPost })(Posts);