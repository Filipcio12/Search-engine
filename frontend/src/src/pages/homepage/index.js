import './index.css';

import SearchBar from '../../components/search-bar';
import logo from '../../chopchopgo.png';

export default function Homepage() {
    return (
        <div className="container">
            <div className="row justify-content-center align-items-start" style={{ height: '80vh', marginTop: '20vh' }}>
                <div className="col-md-8 col-lg-6">
                    <div className="text-center p-4 rounded">
                        <img src={logo} alt="Logo" className="circle-image mb-4" style={{ maxWidth: '50%', height: 'auto' }} />
                        <SearchBar />
                    </div>
                </div>
            </div>
        </div>
    );
}
