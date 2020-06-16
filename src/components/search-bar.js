import React, {useState} from 'react';

const SearchBar = ({handleSearch}) => {
  const [ searchTerm, setSearchTerm ] = useState('');


  return (
    <div className="justify-center w-12 search-bar">
    <label
      className="block text-gray-700 text-sm font-bold mb-2"
    >#Hashtag</label>
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      onChange={e => setSearchTerm(e.target.value)}
      placeholder="#hashtag"
      value={searchTerm}
      />
      <button
        className="w-2"
        onClick={handleSearch(searchTerm)}>Search</button>
    </div>

  );
};

export default SearchBar;