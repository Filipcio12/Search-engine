import { useEffect, useState } from "react";
import SearchBar from "../../components/search-bar";
import UrlCard from "../../components/url-card";
import './index.css';
import axios from 'axios';
import { useLocation } from "react-router-dom";

export default function SearchPage() {
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');

    useEffect(() => {
        if (query.trim()) {
            document.title = query + ' at ChopChopGo';
            console.log('Searching for:', query);
            axios.get('http://localhost:8000/search', {
                params: {
                    query: query
                }
            })
            .then(response => {
                setResults(response.data.results);
                setError(null);
            })
            .catch(error => {
                console.error('ERROR:', error);
                setError('An error occurred while fetching the search results. Please try again later :(');
            });
        } else {
            document.title = 'ChopChopGo';
        }
    }, [query]);

    return (
        <div>
            <div className="bg-dark text-white p-3 mb-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 ms-3">
                            <SearchBar searchField={query}/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-8 ms-3">
                    {error ? (
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        ) : (
                            results.map((result) => (
                                <UrlCard 
                                    url={result.url}
                                    title={result.title}
                                    content={result.content}
                                />
                            ))
                        )}
                    </div>
                    <div className="col-md-4">
                        {/* Empty for now */}
                    </div>
                </div>
            </div>
        </div>
    );
}
