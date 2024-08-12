import { useEffect, useState } from "react";
import SearchBar from "../../components/search-bar";
import UrlCard from "../../components/url-card";
import './index.css';
import axios from 'axios';
import { useLocation } from "react-router-dom";

export default function SearchPage() {
    const [results, setResults] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');

    useEffect(() => {
        if (query.trim()) {
            console.log('Searching for:', query);
            axios.get('http://localhost:8000/search', {
                params: {
                    query: query
                }
            })
            .then(response => {
                setResults(response.data.results);
            })
            .catch(error => console.error('ERROR:', error));
        }
    }, [query]);

    return (
        <div>
            <div className="bg-dark text-white p-3 mb-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 ms-3">
                            <SearchBar />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-8 ms-3">
                        {results.map((result) => (
                            <UrlCard 
                                url={result.url}
                                title={result.title}
                                content={result.content}
                            />
                        ))}
                    </div>
                    <div className="col-md-4">
                        {/* Empty for now */}
                    </div>
                </div>
            </div>
        </div>
    );
}
