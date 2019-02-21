import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deletePersonaNEWComment } from '../../actions/postActions';

class PersonCommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deletePersonaNEWComment(postId, commentId);
  }

  render() {
    const { comment, postId, auth } = this.props;

    var moment = require('moment');
    var fomatted_date = moment(comment.date).format('LLL');

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
          <div class="bottomcorner" >{fomatted_date}</div>
        </div>
      </div>
    );
  }
}

PersonCommentItem.propTypes = {
  deletePersonaNEWComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePersonaNEWComment })(PersonCommentItem);
