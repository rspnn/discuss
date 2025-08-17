import React, { useEffect } from 'react';
import ThreadItem from '../../components/ThreadItem';
import './home.css';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../../states/shared/action';
import { LuCirclePlus } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const Home = () => {
  const { threads = [], users = [], authUser } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const threadsList = threads.map((thread) => ({
    ...thread,
    creator: users.find((user) => user.id === thread.ownerId),
  }));

  return (
    <div className="home-container">
      {threadsList.map((thread) => (
        <ThreadItem key={thread.id} thread={thread} />
      ))}
      {authUser && (
        <Link to="/new" className="new-thread-button">
          <LuCirclePlus size={50} color="black" />
        </Link>
      )}
    </div>
  );
};

export default Home;
