// components/PostsList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PostsList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/posts');
        if (!response.ok) throw new Error('Data could not be fetched!');
        
        const posts = await response.json();
        setPosts(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div>
      <h1>Posts</h1>
      {posts.length ? (
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <Link to={`/posts/${post.id}`}>{post.title}</Link> - {post.body}
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found</p>
      )}
      <Link to="/posts/new">Create a New Post</Link>
    </div>
  );
}

export default PostsList;
