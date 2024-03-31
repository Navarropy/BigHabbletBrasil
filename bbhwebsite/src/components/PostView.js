// components/PostView.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function PostView() {
  const { id } = useParams(); // Extract the post ID from the URL
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch post data
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/posts/${id}`); // Adjust the URL as needed
        if (!response.ok) {
          throw new Error('Could not fetch post data.');
        }
        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]); // This effect runs when the component mounts and whenever the `id` changes

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      {/* Display the image if it exists */}
      {post.image_url && <img src={post.image_url} alt={post.title} />}
    </div>
  );
}

export default PostView;
