import { Link } from 'react-router-dom'

const DashHeader = () => {

    const content = (
        <header className="dash-header">
            <div className="dash-header__container">
                <Link to="/dash">
                    <h1 className="dash-header__title">Spotify Stats</h1>
                </Link>
                <nav className="dash-header__nav">
                    {/* add nav buttons later 
                    could be a navigation bar / dropdown menu on the header*/}
                    <Link to="../dash/songs">All Songs</Link>
                    <Link to="../dash/artists">All Artists</Link>
                    <Link to="../dash/songs/new"> Add a song</Link>
                </nav>
            </div>
        </header>
    )

    return content
}
export default DashHeader