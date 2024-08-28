import { Link } from 'react-router-dom'

const Welcome = () => {

    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)
    
    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome!</h1>

            <p><Link to="/dash/songs">View All Songs</Link></p>

            <p><Link to="/dash/songs/id">Get Song with ID</Link></p>

            <p><Link to="/dash/songs/new">New Song</Link></p>

            <p><Link to="/dash/artists">View All Artists</Link></p>

            <p><Link to="/dash/songs/deleteSongsID">Delete Songs by Artist ID</Link></p>

            <p><Link to="/dash/songs/deleteSongsName">Delete Songs by Artist Name</Link></p>

        </section>
    )

    return content
}
export default Welcome