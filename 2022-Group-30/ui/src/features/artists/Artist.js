import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectArtistById } from './artistsApiSlice'

const Artist = ({ artistId }) => {

    const artist = useSelector(state => selectArtistById(state, artistId))

    const navigate = useNavigate()

    if (artist) {
        
        const handleEdit = () => navigate(`/dash/artists/${artistId}`)

        return (
            <tr className="table__row artist">
               
                <td className="table__cell artist__name">{artist.name}</td>
                <td className="table__cell artist__popularity">{artist.popularity}</td>

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
export default Artist