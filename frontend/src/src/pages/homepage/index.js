import SearchBar from "../../components/search-bar";

export default function Homepage() {
    return (
        <div className="container">
            <div className="row justify-content-center align-items-start" style={{ height: '80vh', marginTop: '40vh' }}>
                <div className="col-md-8 col-lg-6">
                    <div className="text-center p-4 rounded">
                        <SearchBar />
                    </div>
                </div>
            </div>
        </div>
    );
}
