from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Predefined password for creating posts
PASSWORD = "ZUU7lUCQGvFbmfc"
# Default image URL
DEFAULT_IMAGE_URL = "https://example.com/default-image.png"

def get_db_connection():
    conn = sqlite3.connect('../posts.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/create-post', methods=['POST'])
def create_post():
    data = request.get_json()  # Parse JSON data from the request body
    title = data['title']
    body = data['body']
    image_url = data.get('image_url', DEFAULT_IMAGE_URL)  # Use .get() for optional fields
    password = data['password']

    if password != PASSWORD:
        return jsonify(message="Unauthorized: Incorrect password"), 401

    # Your database insertion logic here
    conn = get_db_connection()
    conn.execute('INSERT INTO posts (title, body, image_url) VALUES (?, ?, ?)',
                 (title, body, image_url))
    conn.commit()
    conn.close()
    return jsonify(message="Post created successfully"), 201

@app.route('/posts', methods=['GET'])
def get_posts():
    conn = get_db_connection()
    posts = conn.execute('SELECT * FROM posts').fetchall()
    conn.close()
    
    # Convert the response to a list of dicts
    posts_list = [dict(post) for post in posts]
    return jsonify(posts_list)

@app.route('/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    conn = get_db_connection()
    post = conn.execute('SELECT * FROM posts WHERE id = ?', 
                        (post_id,)).fetchone()  # Use fetchone() to get the first row
    conn.close()

    if post is None:
        return jsonify(message="Post not found"), 404

    # Convert the Row object to a dict to jsonify it
    post_dict = dict(post)
    return jsonify(post_dict)

@app.route('/create-contestant', methods=['POST'])
def add_contestant():
    data = request.get_json()
    name = data['name']
    image_url = data.get('image_url', '')  # Optional, with default empty string
    eviction_image_url = data.get('eviction_image_url', '')  # Optional, with default empty string
    status = data['status']
    
    conn = get_db_connection()
    conn.execute('INSERT INTO contestants (name, image_url, eviction_image_url, status) VALUES (?, ?, ?, ?)',
                 (name, image_url, eviction_image_url, status))
    conn.commit()
    conn.close()
    return jsonify(message="Contestant added successfully"), 201

@app.route('/contestants', methods=['GET'])
def get_contestants():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT * FROM contestants')
    rows = cur.fetchall()

    # Convert the rows into a list of dicts
    contestants = [dict(row) for row in rows]

    conn.close()
    return jsonify(contestants)

@app.route('/contestants/<int:id>', methods=['PUT'])
def update_contestant(id):
    data = request.get_json()
    name = data.get('name')
    image_url = data.get('image_url')
    eviction_image_url = data.get('eviction_image_url')
    status = data.get('status')

    conn = get_db_connection()
    cursor = conn.cursor()

    # Check if the contestant exists
    cursor.execute('SELECT * FROM contestants WHERE id = ?', (id,))
    contestant = cursor.fetchone()
    if contestant is None:
        conn.close()
        abort(404, description="Contestant not found")

    # Update the contestant
    cursor.execute('UPDATE contestants SET name = ?, image_url = ?, eviction_image_url = ?, status = ? WHERE id = ?',
                   (name, image_url, eviction_image_url, status, id))
    conn.commit()
    conn.close()

    return jsonify(message="Contestant updated successfully"), 200

if __name__ == '__main__':
    app.run(debug=True)
