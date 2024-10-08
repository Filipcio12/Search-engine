import { useEffect, useState } from 'react';
import './index.css';

export default function UrlCard({
    url = 'https://example.com',
    title = 'Card Title',
    content = "Some quick example text to build on the card title and make up the bulk of the card's content."
}) {
    const [favicon, setFavicon] = useState("https://via.placeholder.com/30");

    useEffect(() => {
        const domain = new URL(url).hostname;
        setFavicon("https://icons.duckduckgo.com/ip2/" + domain + ".ico");
    }, []);

    return (
        <div className="card" style={{ width: '37rem', backgroundColor: 'transparent', border: 'none' }}>
            <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                    <img src={favicon} alt="Logo" className="card-logo me-2" />
                    <span className="card-link-text">{url}</span>
                </div>
                <h5 className="card-title">
                    <a href={url} className="card-title-link" target="_blank" rel="noopener noreferrer">{title}</a>
                </h5>
                <p className="card-text">{content}</p>
            </div>
        </div>
    );
}
