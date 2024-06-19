import React, { useState, useEffect } from 'react'
import { Route, Routes, Navigate } from "react-router-dom";
import axios from 'axios';
import apiKey from './config.js'
import Nav from './components//Nav.jsx'
import Search from './components/Search.jsx'
import PhotoList from './components//PhotoList.jsx'
import NotFound from './components//NotFound.jsx'

function App() {
  const [photos, setPhotos] = useState([]);
  const [cars, setCars] = useState([]);
  const [trees, setTrees] = useState([]);
  const [rabbits, setRabbits] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Fetches the photos that is typed in the search bar
   * @param {string} query 
   */
  const fetchData = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`);
      setPhotos(response.data.photos.photo);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching and parsing data', error);
    }
  }

  
  // Fetches the default photos for Cars, Tress, and Rabbits!
   
  const fetchDefaults = async () => {
    try {
      const responseCars = await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=cars&per_page=24&format=json&nojsoncallback=1`);
      setCars(responseCars.data.photos.photo);

      const responseTrees = await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=trees&per_page=24&format=json&nojsoncallback=1`);
      setTrees(responseTrees.data.photos.photo);

      const responseRabbits = await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=rabbits&per_page=24&format=json&nojsoncallback=1`);
      setRabbits(responseRabbits.data.photos.photo);
    } catch (error) {
      console.log('Error fetching and parsing data', error);
    }
  }

  useEffect(() => {
    fetchDefaults();
  }, []);

  // Controls the routes for the three topics
  return (
    <div className="container">
      <Search />
      <Nav />
      <Routes>
        <Route path="/" >
          <Route index element={<Navigate replace to="cars" />} />
        </Route>
        <Route path="cars" element={<PhotoList photos={cars} pageTitle="Cars" />} />
        <Route path="trees" element={<PhotoList photos={trees} pageTitle="Trees" />} />
        <Route path="rabbits" element={<PhotoList photos={rabbits} pageTitle="Rabbits" />} />
        <Route path="search/:query" element={<PhotoList photos={photos} pageTitle="Search Results" fetchData={fetchData} loading={loading} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
    </div>
  )
}

export default App