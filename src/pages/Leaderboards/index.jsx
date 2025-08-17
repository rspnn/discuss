import React, { useEffect } from 'react';
import './leaderboards.css';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveLeaderboard } from '../../states/leaderboards/action';

const Leaderboard = () => {
  const leaderboards = useSelector((state) => state.leaderboards || []);

  useEffect(() => {
    dispatch(asyncReceiveLeaderboard());
  }, []);

  return (
    <div className="leaderboard-container">
      <h1 className="leaderboard-title">Leaderboard</h1>

      <div className="leaderboard-list">
        {leaderboards.map((leaderboard, index) => (
          <div key={leaderboard.user.id} className="leaderboard-item">
            <span className="rank">#{index + 1}</span>
            <img
              src={leaderboard.user.avatar}
              alt={leaderboard.user.name}
              className="avatar"
            />
            <span className="username">{leaderboard.user.name}</span>
            <span className="score">{leaderboard.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
