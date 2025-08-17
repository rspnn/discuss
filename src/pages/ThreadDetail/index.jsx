import React from 'react';
import './threadDetail.css';
import { LuArrowBigDown, LuArrowBigUp, LuClock } from 'react-icons/lu';
import { formatTimeAgo } from '../../utils/formatDate';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  asyncAddThreadDetailComment,
  asyncReceiveThreadDetail,
} from '../../states/threadDetail/action';
import parser from 'html-react-parser';
import useInput from '../../hooks/useInput';

const ThreadDetail = () => {
  const { id } = useParams();
  const { threadDetail = null, authUser } = useSelector((states) => states);
  const [comment, onCommentChange] = useInput('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onAddComment = ({ comment }) => {
    dispatch(asyncAddThreadDetailComment({ threadId: id, content: comment }));
    // Reset comment input after adding
    onCommentChange({ target: { value: '' } });
  };

  const userVote = 'down';

  if (!threadDetail) {
    return null;
  }

  return (
    <div className="thread-detail-container">
      {/* Thread Header */}
      <div className="thread-detail-card">
        <div className="thread-detail-meta">
          <div className="creator-info">
            <div className="avatar">
              <img
                className="avatar-img"
                src={threadDetail.owner.avatar}
                alt={threadDetail.owner.name}
              />
            </div>
            <span className="creator-name">{threadDetail.owner.name}</span>
          </div>
          <div className="thread-time">
            <LuClock className="icon" size={20} />
            <span>{formatTimeAgo(threadDetail.createdAt)}</span>
          </div>
        </div>

        <h1 className="thread-detail-title">{threadDetail.title}</h1>
        <div className="thread-detail-body">{parser(threadDetail.body)}</div>

        <div className="vote-section">
          <button
            className={`vote-button upvote ${userVote === 'up' ? 'active' : ''}`}
          >
            <LuArrowBigUp size={22} />
            <span className="vote-count">{threadDetail.upVotesBy.length}</span>
          </button>
          <button
            className={`vote-button downvote ${userVote === 'down' ? 'active' : ''}`}
          >
            <LuArrowBigDown size={22} />
            <span className="vote-count">{threadDetail.upVotesBy.length}</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="comments-section">
        <h2 className="comments-title">
          Komentar ({threadDetail.comments.length})
        </h2>
        {threadDetail.comments.map((comment) => (
          <div key={comment.id} className="comment-card">
            <div className="comment-header">
              <div className="avatar">
                <img
                  className="avatar-img"
                  src={comment.owner.avatar}
                  alt={comment.owner.name}
                />
              </div>
              <span className="creator-name">{comment.owner.name}</span>
              <div className="comment-time">
                <LuClock className="icon" size={20} />
                <span>{formatTimeAgo(comment.createdAt)}</span>
              </div>
            </div>
            <div className="comment-body">{parser(comment.content)}</div>

            <div className="vote-section">
              <button
                className={`vote-button upvote ${userVote === 'up' ? 'active' : ''}`}
              >
                <LuArrowBigUp size={22} />
                <span className="vote-count">
                  {threadDetail.upVotesBy.length}
                </span>
              </button>
              <button
                className={`vote-button downvote ${userVote === 'down' ? 'active' : ''}`}
              >
                <LuArrowBigDown size={22} />
                <span className="vote-count">
                  {threadDetail.upVotesBy.length}
                </span>
              </button>
            </div>
          </div>
        ))}

        {/* Add Comment Form */}
        {authUser ? (
          <form className="comment-form">
            <textarea
              className="comment-input"
              placeholder="Tulis komentar kamu..."
              value={comment}
              onChange={onCommentChange}
            />
            <button
              type="button"
              className="comment-submit"
              onClick={() => {
                onAddComment({ comment });
              }}
            >
              Kirim
            </button>
          </form>
        ) : (
          <div className="login-footer">
            <p>
              Silakan <Link to="/login">masuk</Link> untuk menambahkan komentar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreadDetail;
