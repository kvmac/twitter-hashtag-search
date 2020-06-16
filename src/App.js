import React, { useState } from 'react';
import { useAxios } from './hooks/use-axios';
import Header from './components/header.js';
import Footer from './components/footer.js';
import './App.css';
import ListTable from './components/list-table.js';
import SearchBar from './components/search-bar.js';

const dummyData = {
  tweets: [
    {
      name: 'Keanue Reeves',
      handle: 'Johnny Utah',
      img_url: 'https://i.pinimg.com/originals/8c/cf/ec/8ccfec7d5cb3c92265cbf153523eb9b5.jpg',
      text: "Yo, this app is dope!",
      hashtags: [
        "#neat", "#dope",
      ]
    },
    {
      name: 'Keanue Reeves',
      handle: 'Johnny Utah',
      img_url: 'https://i.pinimg.com/originals/8c/cf/ec/8ccfec7d5cb3c92265cbf153523eb9b5.jpg',
      text: "Yo, this app is dope!",
      hashtags: [
        "#neat", "#dope",
      ]
    },
    {
      name: 'Keanue Reeves',
      handle: 'Johnny Utah',
      img_url: 'https://i.pinimg.com/originals/8c/cf/ec/8ccfec7d5cb3c92265cbf153523eb9b5.jpg',
      text: "Yo, this app is dope!",
      hashtags: [
        "#neat", "#dope",
      ]
    },
  ],
  error: null,
}

function App() {
  const [ tweets, setTweets ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ hasError, setHasError ] = useState(false);


  const handleSearch = async (searchTerm) => {
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { tweets, error } = await useAxios(`/.netlify/functions/twitter?hashtag=${searchTerm}`) || dummyData;

    setTweets(tweets);
    setHasError(error);
    setIsLoading(false);
  }

  return (
    <div className="App">
      <div
        display="flex"
        alignItems="center">
        <Header />

        <SearchBar handleSearch={handleSearch} />

        <ListTable isLoading={isLoading} hasError={hasError} tweets={tweets} />

        <Footer />
      </div>
    </div>
  );
}

export default App;
