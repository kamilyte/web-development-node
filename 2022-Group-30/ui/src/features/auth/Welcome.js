import { Link } from 'react-router-dom'

const Welcome = () => {
    
    const content = (
        <section className="welcome"> 
            <center>

                {/* <p>{today}</p> */}

                <h1>Welcome!</h1>

                <p><Link to="/dash/songs">View All Songs</Link></p>

                <p><Link to="/dash/songs/id">Get Song with ID</Link></p>

                <p><Link to="/dash/songs/name">Get Song with Name</Link></p>

                <p><Link to="/dash/songs/new">New Song</Link></p>

                <p><Link to="/dash/artists">View All Artists</Link></p>

                <p><Link to="/dash/top">Top Songs</Link></p>

                <p><Link to="/dash/songs/deleteSongsID">Delete Songs by Artist ID</Link></p>

                <p><Link to="/dash/songs/deleteSongsName">Delete Songs by Artist Name</Link></p>
            
            </center>
        </section>
    )

    return content
}
export default Welcome