import './index.css';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({searchField}) {
    const [query, setQuery] = useState(searchField);
    const navigate = useNavigate();

    const handleSearch = () => {
        const newURL = '/search/?query=' + encodeURIComponent(query);
        if (window.location.pathname + window.location.search !== newURL) {
            navigate(newURL);
        } else {
            window.location.reload();
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
