import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SearchBar() {

  /*definerer variabler for å lagre fritekst/nøkkelord, samt resultater fra søk*/
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  /* søkefunksjon */
  const handleSearch = async () => {
    try {
        const response = await axios.get(`http://localhost:8800/search?term=${searchTerm}`);
        console.log(response.data);
        setResults(response.data);
    } catch (error) {
        console.error("Error searching:", error);
    }
};

  return (
    <div className="search-container">

      <Link to="/">Hjem</Link>
      <hr/>
      <h1>Søk</h1>
      
      <input
        type="text"
        placeholder="nøkkeord"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button onClick={handleSearch}>Søk</button>
      <hr/>

      <div className='table-container'>
        <table className='SearchTable'>
          <thead>
            <tr>
              <th>Mottaksnummer</th>
              <th>Antall Gjenstander</th>
              <th>Grupper</th>
              <th>Mottaksdato</th>
              <th>Mottaksmetode</th>
              <th>Beskrivelse</th>
              <th>Status</th>
              <th>Avvisningsgrunn</th>
              <th>Eier</th>
              <th>Proveniens</th>
              <th>Plassering</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result)=> (
              <tr key={result.id}>
                <td>{result.mottaksnr}</td>
                <td>{result.antallGjenstander}</td>
                <td>{result.grupper}</td>
                <td>{result.mottaksdato}</td>
                <td>{result.mottaksmetode}</td>
                <td>{result.beskrivelse}</td>
                <td>{result.tilstand}</td>
                <td>{result.avvisningsgrunn}</td>
                <td>{result.eier}</td>
                <td>{result.proveniens}</td>
                <td>{result.plassering}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default SearchBar;
