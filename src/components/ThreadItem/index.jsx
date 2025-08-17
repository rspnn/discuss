import React from 'react';
import './threadItem.css';
import { formatTimeAgo } from '../../utils/formatDate';
import {
  LuClock,
  LuMessageCircleMore,
  LuArrowBigUp,
  LuArrowBigDown,
} from 'react-icons/lu';

import parser from 'html-react-parser';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ThreadItem = ({ thread }) => {
  const userVote = thread.userVote || 'down';

  return (
    <div className="thread-card">
      <div className="thread-content">
        <Link to={`/threads/${thread.id}`}>
          <h2 className="thread-title">{thread.title}</h2>
        </Link>
        <div className="thread-snippet">{parser(thread.body)}</div>

        {/* Vote Section */}
        <div className="vote-section">
          <button
            aria-label="upvote"
            className={`vote-button upvote ${userVote === 'up' ? 'active' : ''}`}
          >
            <LuArrowBigUp size={22} />
            <span className="vote-count">{thread.upVotesBy.length}</span>
          </button>

          <button
            aria-label="downvote"
            className={`vote-button downvote ${userVote === 'down' ? 'active' : ''}`}
          >
            <LuArrowBigDown size={22} />
            <span className="vote-count">{thread.upVotesBy.length}</span>
          </button>
        </div>

        <div className="thread-meta">
          <div className="creator-info">
            <div className="avatar">
              <img
                className="avatar-img"
                src={thread.creator.avatar}
                alt={thread.creator.name}
              />
            </div>
            <span className="creator-name">{thread.creator.name}</span>
          </div>

          <div className="meta-right">
            <div className="meta-item">
              <LuClock className="icon" size={20} />
              <span>{formatTimeAgo(thread.createdAt)}</span>
            </div>
            <div className="meta-item">
              <LuMessageCircleMore className="icon" size={20} />
              <span>{thread.totalComments} comments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ThreadItem.propTypes = {
  thread: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    userVote: PropTypes.string,
    totalComments: PropTypes.number.isRequired,
    creator: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ThreadItem;
