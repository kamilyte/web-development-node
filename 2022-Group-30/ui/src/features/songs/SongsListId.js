import { selectSongById } from './songsApiSlice'
import { useParams } from 'react-router-dom'
import Song from './Song'

const SongsListId = () => {
    const { id } = useParams()

    const tableContent = <Song key={id} songId={id} />

    const content = (
        <table className="table table--songs">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th song__name">Name</th>
                        <th scope="col" className="table__th song__popularity">Popularity</th>
                        <th scope="col" className="table__th song__artists">Artists</th>
                        <th scope="col" className="table__th song__artistIDs">Artist IDs</th>
                        <th scope="col" className="table__th song__date">Date</th>
                        <th scope="col" className="table__th song__edit">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
    )

    return content
}

export default SongsListId