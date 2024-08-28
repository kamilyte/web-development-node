import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <center><h1>Welcome to <span className="nowrap"><Link to="../dash">Spotify Stats!</Link></span></h1></center>
            </header>
            <main className="public__main">
                <center>
                    <p>Located in the sad corners of our bedroom.</p>
                    <address className="public__addr">
                        Team 30<br />
                        Web Engineering<br />
                        2022-2023<br />
                    </address>
                    <br />
                    <p>Click above & let us present the spotify stats dataset 1921-2022</p>
                </center>
            </main>           

        </section>

    )
    return content
}
export default Public 
