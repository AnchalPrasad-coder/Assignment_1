import { useState } from 'react';
import './App.css';

function SkillBadge({ skill }) {
  return <span className="skill-badge">{skill}</span>;
}

function SkillList({ skills }) {
  return (
    <div className="skills-list">
      {skills.map((skill) => (
        <SkillBadge key={skill} skill={skill} />
      ))}
    </div>
  );
}

function ProfileCard({ profile, skills, photoUrl, onThemeToggle, onNextPhoto, onAlert, likes, onLike }) {
  return (
    <div className="card">
      <img className="profile-photo" src={photoUrl} alt={`${profile.name} avatar`} />
      <div className="profile-content">
        <h1>{profile.name}</h1>
        <p className="profile-title">{profile.title}</p>
        <p className="profile-bio">{profile.bio}</p>
        <SkillList skills={skills} />
        <div className="card-actions">
          <button className="action-button" onClick={onThemeToggle}>
            Toggle Theme
          </button>
          <button className="action-button" onClick={onNextPhoto}>
            Next Photo
          </button>
          <button className="action-button" onClick={onAlert}>
            Show Alert
          </button>
        </div>
        <div className="likes-row">
          <button className="like-button" onClick={onLike}>
            ❤️ Like
          </button>
          <span className="likes-count">{likes} {likes === 1 ? 'like' : 'likes'}</span>
        </div>
      </div>
    </div>
  );
}

function MovieCard({ movie, isFavourite, onToggleFavourite }) {
  return (
    <div className="movie-card">
      <div>
        <h3>{movie.title}</h3>
        <p className="movie-meta">{movie.year} · {movie.genre}</p>
        <p className="movie-description">{movie.description}</p>
      </div>
      <button className={`favourite-button ${isFavourite ? 'active' : ''}`} onClick={() => onToggleFavourite(movie.id)}>
        {isFavourite ? 'Unfavourite' : 'Favourite'}
      </button>
    </div>
  );
}

function MovieExplorer({ movies }) {
  const [query, setQuery] = useState('');
  const [favourites, setFavourites] = useState([]);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredMovies = movies.filter((movie) => {
    if (!normalizedQuery) return false;
    return (
      movie.title.toLowerCase().includes(normalizedQuery) ||
      movie.genre.toLowerCase().includes(normalizedQuery) ||
      movie.description.toLowerCase().includes(normalizedQuery)
    );
  });

  const favouritesList = movies.filter((movie) => favourites.includes(movie.id));

  const handleReset = () => setQuery('');

  const handleToggleFavourite = (id) => {
    setFavourites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  return (
    <div className="card movie-card-panel">
      <div className="movie-header">
        <div>
          <h1>Movie Explorer</h1>
          <p>Search, filter, and favourite movies using local state.</p>
        </div>
        <button className="action-button" onClick={handleReset}>
          Reset
        </button>
      </div>
      <div className="search-row">
        <input
          className="search-input"
          type="search"
          placeholder="Search movies (e.g. 'Interstellar', 'Star')"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <div className="search-state-message">
        {!normalizedQuery ? (
          <p>Start typing to search local movie data. Results will update as you type.</p>
        ) : filteredMovies.length === 0 ? (
          <p>No matching results. Try a different title or keyword.</p>
        ) : (
          <p>{filteredMovies.length} result{filteredMovies.length === 1 ? '' : 's'} found.</p>
        )}
      </div>
      {filteredMovies.length > 0 && (
        <div className="movie-grid">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavourite={favourites.includes(movie.id)}
              onToggleFavourite={handleToggleFavourite}
            />
          ))}
        </div>
      )}
      <section className="favourite-section">
        <div className="section-header">
          <h2>Favourite Movies</h2>
          <span>{favouritesList.length} selected</span>
        </div>
        {favouritesList.length === 0 ? (
          <p className="empty-state">No favourites yet. Mark movies as favourite to see them here.</p>
        ) : (
          <div className="movie-grid">
            {favouritesList.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavourite={true}
                onToggleFavourite={handleToggleFavourite}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState('light');
  const [page, setPage] = useState('portfolio');
  const [photoIndex, setPhotoIndex] = useState(0);
  const [likes, setLikes] = useState(0);

  const profile = {
    name: 'Aisha Kapoor',
    title: 'Frontend Developer & UI Designer',
    bio: 'I build polished, responsive portfolio experiences with React and clean component architecture. I love creating reusable UI patterns and interactive workflows.',
  };

  const skills = ['React', 'CSS', 'JavaScript', 'Accessibility', 'Responsive UI'];

  const profilePhotos = [
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
  ];

  const movieData = [
    {
      id: 1,
      title: 'Interstellar',
      year: 2014,
      genre: 'Sci-Fi',
      description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival.',
    },
    {
      id: 2,
      title: 'Star Wars: A New Hope',
      year: 1977,
      genre: 'Space Opera',
      description: 'A farm boy joins forces with a band of rebels to save the galaxy from an evil empire.',
    },
    {
      id: 3,
      title: 'The Star',
      year: 2017,
      genre: 'Animation',
      description: 'A small but brave donkey and his animal friends become the first Christmas heroes.',
    },
    {
      id: 4,
      title: 'Moonlight',
      year: 2016,
      genre: 'Drama',
      description: 'A young man deals with his dysfunctional home life and comes of age in Miami.',
    },
    {
      id: 5,
      title: 'Arrival',
      year: 2016,
      genre: 'Sci-Fi',
      description: 'A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear.',
    },
  ];

  const handleThemeToggle = () => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  };

  const handleNextPhoto = () => {
    setPhotoIndex((current) => (current + 1) % profilePhotos.length);
  };

  const handleAlert = () => {
    alert(`Hi, I am ${profile.name}! Welcome to my portfolio card.`);
  };

  const handleLike = () => {
    setLikes((current) => current + 1);
  };

  return (
    <div className={`app-shell ${theme}`}>
      <div className="top-bar">
        <div>
          <h1>Assignment 1</h1>
          <p>Toggle between the portfolio card and movie search explorer.</p>
        </div>
        <div className="top-actions">
          <button className={`page-button ${page === 'portfolio' ? 'active' : ''}`} onClick={() => setPage('portfolio')}>
            Portfolio
          </button>
          <button className={`page-button ${page === 'movies' ? 'active' : ''}`} onClick={() => setPage('movies')}>
            Movie Explorer
          </button>
          <button className="theme-button" onClick={handleThemeToggle}>
            Toggle theme
          </button>
        </div>
      </div>

      <main>
        {page === 'portfolio' ? (
          <ProfileCard
            profile={profile}
            skills={skills}
            photoUrl={profilePhotos[photoIndex]}
            onThemeToggle={handleThemeToggle}
            onNextPhoto={handleNextPhoto}
            onAlert={handleAlert}
            likes={likes}
            onLike={handleLike}
          />
        ) : (
          <MovieExplorer movies={movieData} />
        )}
      </main>
    </div>
  );
}

export default App;
