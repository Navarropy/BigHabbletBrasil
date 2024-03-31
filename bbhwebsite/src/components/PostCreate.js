// components/PostCreate.js
import React, { useState } from 'react';

function PostCreate() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [password, setPassword] = useState(''); // State to hold the password

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = { title, body, image_url: imageUrl, password }; // Include the password in the postData object
    console.log(postData)

    try {
      const response = await fetch('http://127.0.0.1:5000/create-post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        // Reset form or redirect to posts list
        setTitle('');
        setBody('');
        setImageUrl('');
        setPassword(''); // Reset password field
        alert('Post created successfully!');
      } else {
        alert('Failed to create the post. Please check your password.');
      }
    } catch (error) {
      console.error('There was an error creating the post:', error);
      alert('Error creating post.');
    }
  };

  return (
    <div>
      <h1>Create a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="image-url">Image URL (optional):</label>
          <input
            id="image-url"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password" // Use type="password" to hide password input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}

export default PostCreate;
