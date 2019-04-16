import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteNEWComment } from '../../../../actions/postActions';

class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteNEWComment(postId, commentId);
    window.location.reload();
  }

  render() {
    const { comment, postId, auth } = this.props;
    var moment = require('moment');
    var formatted_date = moment(comment.date).format('LLL');

    return (
      <div className="card card-body border-light mb-3">
        <div className="row">
          <div className="col-md-2">
              <img
                style={{ width: '50px' }}
                className="rounded-circle d-none d-md-block center"
                src={comment.avatar}
                alt=""
              />
            <p className="d-flex justify-content-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{comment.text}</p>
            {comment.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                type="button"
                className="btn btn-sm btn-danger mr-1"
              >
                Delete
              </button>
            ) : null}
          </div>
          <div class="blockquote-footer bottomcorner" >{formatted_date}</div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteNEWComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteNEWComment })(CommentItem);
