import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Spotify Stats!</span></h1>
            </header>
            <main className="public__main">
                <p>Located in the sad corners of our bedroom.</p>
                <address className="public__addr">
                    Team 30<br />
                    Web Engineering<br />
                    2022-2023<br />
                </address>
                <br />
            </main>
            
           

        </section>

    )
    return content
}
export default Public 
/*<footer>
    <Link to="/login">Employee Login</Link>
</footer> */