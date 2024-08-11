import './index.css';
import React, {useState} from 'react';
import axios from 'axios';

export default function SearchBar({onSearch}) {
    const [query, setQuery] = useState('');
    
    const handleSearch = () => {
        if (query.trim()) {
            console.log('Searching for:', query);
            axios.get('http://localhost:8000/search', {
                params: {
                    query: query
                }
            })
            .then(response => {
                onSearch(response.data.results);
            })
            .catch(error => console.error('ERROR:', error));
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className="search-bar">
            <div className="input-group">
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Search..." 
                    aria-label="Search" 
                    aria-describedby="button-addon2"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button 
                    className="btn search-btn" 
                    type="button" 
                    id="button-addon2"
                    onClick={handleSearch}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}
