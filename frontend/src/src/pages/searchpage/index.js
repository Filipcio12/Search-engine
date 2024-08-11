import { useState } from "react";
import SearchBar from "../../components/search-bar";
import UrlCard from "../../components/url-card";
import './index.css';

export default function SearchPage() {
    const [results, setResults] = useState([]);

    const handleSearchResults = (data) => {
        setResults(data);
    };

    const urlCards = Array.from({ length: 10 }, (_, index) => (
        <UrlCard key={index} />
    ));

    return (
        <div>
            <div className="bg-dark text-white p-3 mb-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 ms-3">
                            <SearchBar onSearch={handleSearchResults}/>
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
