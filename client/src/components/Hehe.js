import React, { useEffect, useState } from 'react';
import { getUsername } from '../helper/helper';

const Hehe = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUsername() {
      try {
        const decode = await getUsername();
        setUsername(decode.username); // Assuming the decoded token has a 'username' field
      } catch (err) {
        setError(err);
      }
    }

    fetchUsername();
  }, []);

  return (
    <div>
      {error ? <div>Error: {error}</div> : <div>Username: {username}</div>}
    </div>
  );
}

export default Hehe;
