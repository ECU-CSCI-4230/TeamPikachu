import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PersonPostForm from './PersonPostForm';
import PostFeed from './PostFeed';
import Spinner from '../common/Spinner';
import {getPersonalPost, getPosts } from '../../actions/postActions';


class PersonPosts extends Component {
    componentDidMount() {
        this.props.getPersonalPost(this.props.match.params.handle);
      }

  render() {
    //console.log(this.props.match.params.handle);
    const { posts, loading } = this.props.post;
    let postContent;
    const handle = this.props.match.params.handle;
    //console.log(posts);
    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="personfeed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PersonPostForm handle = {handle}/>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PersonPosts.propTypes = {
    getPersonalPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    post: state.post
  });

export default connect(mapStateToProps, {getPersonalPost})(PersonPosts);