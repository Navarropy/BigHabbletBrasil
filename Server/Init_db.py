import sqlite3

conn = sqlite3.connect('./posts.db')
c = conn.cursor()

# Create table
c.execute('''CREATE TABLE IF NOT EXISTS posts
(id INTEGER PRIMARY KEY, title TEXT, body TEXT, image_url TEXT)
''')
c.execute('''CREATE TABLE IF NOT EXISTS contestants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    image_url TEXT,
    eviction_image_url TEXT,
    status TEXT NOT NULL
);
''')

# Save (commit) the changes
conn.commit()

# Close the connection
conn.close()
