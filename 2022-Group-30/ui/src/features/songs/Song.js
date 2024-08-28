import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectSongById } from './songsApiSlice'

const Song = ({ songId }) => {


    const song = useSelector(state => selectSongById(state, songId))

    const navigate = useNavigate()

    if (true) {
        
        const handleEdit = () => navigate(`/dash/songs/${songId}`)

        const songArtistsString = song.artists.toString().replaceAll(',', ', ')
        
        const songArtistIdString = song.artistIDs.toString().replaceAll(',', ', ')

        return (
            <tr className="table__row song">
                <td className="table__cell song__name">{song.name}</td>
                <td className="table__cell song__popularity">{song.popularity}</td>
                <td className="table__cell song__artists">{songArtistsString}</td>
                <td className="table__cell song__artistIDs">{songArtistIdString}</td>
                <td className="table__cell song__date">{song.date}</td>


                <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } 
}
export default Song