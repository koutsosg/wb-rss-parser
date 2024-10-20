CREATE TABLE podcasts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  description TEXT,
  copyright VARCHAR(255),
  guid VARCHAR(255) UNIQUE,
  funding_url VARCHAR(255),
  language VARCHAR(10),
  pub_date TIMESTAMP,
  transistor_url VARCHAR(255),
  image_url VARCHAR(255),
  image_title VARCHAR(255),
  image_link VARCHAR(255),
  author VARCHAR(255),
  categories TEXT[],
  keywords TEXT[],
  owner_name VARCHAR(255),
  owner_email VARCHAR(255)
);
CREATE TABLE persons (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  role VARCHAR(100),
  href VARCHAR(255),
  img VARCHAR(255)
);
CREATE TABLE episodes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  season INT,
  episode_type VARCHAR(50),
  guid VARCHAR(255) UNIQUE,
  link VARCHAR(255),
  description TEXT,
  pub_date TIMESTAMP,
  author VARCHAR(255),
  enclosure_url VARCHAR(255),
  enclosure_length BIGINT,
  enclosure_type VARCHAR(100),
  image_href VARCHAR(255),
  keywords TEXT[],
  chapters_url VARCHAR(255),
  chapters_type VARCHAR(100),
  podcast_id INT REFERENCES podcasts(id) ON DELETE CASCADE
);
CREATE TABLE podcast_persons (
  id SERIAL PRIMARY KEY,
  podcast_id INT REFERENCES podcasts(id) ON DELETE CASCADE,
  person_id INT REFERENCES persons(id) ON DELETE CASCADE
);
CREATE TABLE episode_persons (
  id SERIAL PRIMARY KEY,
  episode_id INT REFERENCES episodes(id) ON DELETE CASCADE,
  person_id INT REFERENCES persons(id) ON DELETE CASCADE,
  role VARCHAR(100)
);
CREATE TABLE episode_images (
  id SERIAL PRIMARY KEY,
  episode_id INT REFERENCES episodes(id) ON DELETE CASCADE,
  image_url VARCHAR(255),    
  image_description TEXT,      
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);