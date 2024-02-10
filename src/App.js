// app.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link  , useParams,Routes} from 'react-router-dom';

const UserListPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://api.github.com/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user?.login}`}>
              <img src={user?.avatar_url} alt={`${user.login}'s avatar`} style={{width:"3rem" , borderRadius:"2rem"}} />
              ({user.login})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const UserDetailsPage = ({ match }) => {
  const params = useParams()
  const [user, setUser] = useState(null);

  useEffect(() => {
    const username = params?.username;
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      }
    };

    fetchUserDetails();
  }, [params?.username]);

  return (
    <div>
      <h1>User Details</h1>
      {user && (
        <div>
          <img src={user?.avatar_url} alt={`${user?.login}'s avatar`}  />
          <p>Name: {user?.name ? user.name : 'N/A'}</p>
          <p>Company:{user?.company}</p>
          <p>BIO:{user?.bio === null ? "N/A" : user?.bio}</p>
          <p>Login: {user?.login}</p>
          <p>organizations-url : {user?.organizations_url}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<UserListPage />} />
      <Route path="/user/:username" element={<UserDetailsPage />} />
    </Routes>
  </Router>
  );
};

export default App;
