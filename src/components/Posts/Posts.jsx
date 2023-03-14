import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Posts = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
      .then((response) => response.json())
      .then((json) => setPosts(json));
  }, []);

  return (
    <div className="posts-container">
      {posts.length > 0 &&
        posts.map(({ title, body }) => (
          <div className="single-post" key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </div>
        ))}
    </div>
  );
};

Posts.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default Posts;
