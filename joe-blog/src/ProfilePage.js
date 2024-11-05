import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import clownfishImg from './assets/clownfish.jpg';
import dolphinImg from './assets/dolphin.jpg'; 
import seaTurtleImg from './assets/seaturtle.jpg';
import bluetangImg from './assets/bluetang.jpg';
import whitesharkImg from './assets/whiteshark.jpg';
import whaleImg from './assets/whale.jpg';
import coralImg from './assets/coral.jpg';
import octopusImg from './assets/octopus.jpg';

const ProfilePage = () => {
  const [activePage, setActivePage] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [newSpeciesModalOpen, setNewSpeciesModalOpen] = useState(false);
  const [newSpecies, setNewSpecies] = useState({
    name: '',
    image: null,
    info: ''
  });
  const [likeCounts, setLikeCounts] = useState(() => {
    const savedLikes = localStorage.getItem('likeCounts');
    return savedLikes ? JSON.parse(savedLikes) : {};
  });
  
  const proverbs = [
    "The sea, once it casts its spell, holds one in its net of wonder forever.",
    "Water is the driving force of all nature.",
    "In one drop of water are found all the secrets of all the oceans."
  ];

  const [currentProverb, setCurrentProverb] = useState(proverbs[0]);
  const [speciesData, setSpeciesData] = useState(() => {
    const savedSpecies = localStorage.getItem('speciesData');
    return savedSpecies ? JSON.parse(savedSpecies) : [
      {
        id: 1,
        name: 'Clownfish',
        image: clownfishImg,
        info: 'Clownfish are small, colorful fish that live among the sea anemones.'
      },
      {
        id: 2,
        name: 'Dolphin',
        image: dolphinImg,
        info: 'Dolphins are highly intelligent marine mammals known for their playful behavior.'
      },
      {
        id: 3,
        name: 'Sea Turtle',
        image: seaTurtleImg,
        info: 'Sea turtles are known for their long migrations and slow reproduction rates.'
      },
      {
        id: 4,
        name: 'Blue Tang',
        image: bluetangImg,
        info: 'Blue Tangs are vibrant blue fish with a yellow tail and black markings, commonly found in coral reefs.'
      },
      {
        id: 5,
        name: 'Great White Shark',
        image: whitesharkImg,
        info: 'Great White Sharks are large predatory fish known for their size, strength, and role as apex predators in marine ecosystems.'
      },
      {
        id: 6,
        name: 'Humpback Whale',
        image: whaleImg,
        info: 'Humpback Whales are known for their complex songs and acrobatic behavior, especially breaching.'
      },
      {
        id: 7,
        name: 'Coral',
        image: coralImg,
        info: 'Coral is a marine invertebrate that forms large colonies and provides habitat for many aquatic species.'
      },
      {
        id: 8,
        name: 'Octopus',
        image: octopusImg,
        info: 'Octopuses are highly intelligent mollusks known for their problem-solving abilities and camouflage skills.'
      }
    ];
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProverb(proverbs[Math.floor(Math.random() * proverbs.length)]);
    }, 5000);
    return () => clearInterval(interval);
  }, [proverbs]);

  useEffect(() => {
    // Save species data to localStorage whenever it changes
    localStorage.setItem('speciesData', JSON.stringify(speciesData));
  }, [speciesData]);

  const handleLike = (id) => {
  setLikeCounts(prevCounts => {
    const newCounts = {
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1
    };
    localStorage.setItem('likeCounts', JSON.stringify(newCounts)); // Save to localStorage
    return newCounts;
  });
};
  const handleDeleteSpecies = (id) => {
    // Filter out the species with the given id
    setSpeciesData(speciesData.filter(species => species.id !== id));
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <div className="home-page">
            <h1>AQUATIC BLOG</h1>
            <p className="proverb">{currentProverb}</p>
            <div className="species-container">
              {speciesData.map(species => (
                <div key={species.id} className="species-card">
                  <span className="delete-button" onClick={() => handleDeleteSpecies(species.id)}>&times;</span>
                  <img src={species.image} alt={species.name} className="species-image" onClick={() => openModal(species)} />
                  <h3>{species.name}</h3>
                  <div className="like-section">
                    <button onClick={(e) => { e.stopPropagation(); handleLike(species.id); }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <span>{likeCounts[species.id] || 0}</span>
                    </button>
                  </div>
                </div>
              ))}
              <div className="species-card add-new" onClick={openNewSpeciesModal}>
                <h3>+ Add New Species</h3>
              </div>
            </div>
            {isModalOpen && selectedSpecies && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={closeModal}>&times;</span>
                  <h2>{selectedSpecies.name}</h2>
                  <p>{selectedSpecies.info}</p>
                  <div className="like-section">
                    <button onClick={(e) => { e.stopPropagation(); handleLike(selectedSpecies.id); }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <span>{likeCounts[selectedSpecies.id] || 0}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
            {newSpeciesModalOpen && (
              <div className="modal">
                <div className="modal-content">
                  <span className="close" onClick={closeNewSpeciesModal}>&times;</span>
                  <h2>Add New Species</h2>
                  <form onSubmit={handleNewSpeciesSubmit}>
                    <input
                      type="text"
                      placeholder="Species Name"
                      value={newSpecies.name}
                      onChange={e => setNewSpecies({ ...newSpecies, name: e.target.value })}
                      required
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      required
                    />
                    <textarea
                      placeholder="Species Info"
                      value={newSpecies.info}
                      onChange={e => setNewSpecies({ ...newSpecies, info: e.target.value })}
                      required
                    />
                    <button type="submit">Add Species</button>
                  </form>
                </div>
              </div>
            )}
          </div>
        );
        case 'species-update':
          return (
            <div className="species-update-page">
              <div className="about-header">
                <h1>AQUATIC BLOG</h1>
                <p>
                 Dive deep into the fascinating world of aquatic life. This blog brings you incredible facts, species updates, and a glimpse into the beautiful creatures that inhabit our oceans.
                </p>
              </div>
              <div className="about-sections">
                <div className="about-section">
                  <h2>Our Mission</h2>
                  <p>
                    We aim to raise awareness about marine life and inspire conservation
                    efforts. Through education and passion, we can protect these
                    extraordinary ecosystems.
                  </p>
                </div>
                <div className="about-section">
                  <h2>Why We Care</h2>
                  <p>
                    The ocean covers more than 70% of our planet, yet we know so little
                    about it. Every species, big or small, plays a role in maintaining
                    balance and beauty. We care because they matter.
                  </p>
                </div>
                <div className="about-section">
                  <h2>Join Our Journey</h2>
                  <p>
                    Follow along as we explore new species, share insights, and
                    contribute to marine conservation. The ocean is calling!
                  </p>
                </div>
              </div>
            </div>
          );

      case 'contact':
  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="image-container">
          <img
            src={require('/project/joe-blog/src/assets/aaa.jpeg')}
            alt="Blog Owner"
            className="owner-image"
          />
        </div>
        <div className="info-container">
          <h1>Contact Me</h1>
          <p>
            I'm passionate about aquatic life and always happy to connect with fellow enthusiasts!
          </p>
          <p>Feel free to reach out anytime!</p>
          <div className="slogan-container">
            <p className="slogan">"joeselvarakshan@gmail.com"</p>
            <p className="slogan">"Let's protect our marine life together!"</p>
            <p className="slogan">"Dive deep, explore more!"</p>
          </div>
        </div>
      </div>
    </div>
  );

      default:
        return null;
    }
  };

  const openModal = (species) => {
    setSelectedSpecies(species);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSpecies(null);
  };

  const openNewSpeciesModal = () => {
    setNewSpeciesModalOpen(true);
  };

  const closeNewSpeciesModal = () => {
    setNewSpeciesModalOpen(false);
  };

  const handleNewSpeciesSubmit = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onloadend = () => {
      const newSpeciesWithId = {
        ...newSpecies,
        id: speciesData.length + 1,
        image: reader.result // Store the Base64 string
      };
      setSpeciesData([...speciesData, newSpeciesWithId]);
      setNewSpecies({
        name: '',
        image: null,
        info: ''
      });
      closeNewSpeciesModal();
    };
    if (newSpecies.image) {
      reader.readAsDataURL(newSpecies.image); // Read the image file as Base64
    }
  };

  const handleImageUpload = (e) => {
    setNewSpecies({ ...newSpecies, image: e.target.files[0] });
  };

  return (
    <div className="profile-page">
      <div className="navbar">
        <button onClick={() => setActivePage('home')}>Home</button>
        <button onClick={() => setActivePage('species-update')}>About Blog</button>
        <button onClick={() => setActivePage('contact')}>Contact</button>
      </div>
      {renderPage()}
    </div>
  );
};

export default ProfilePage;
