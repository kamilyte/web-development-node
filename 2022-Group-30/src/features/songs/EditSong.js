import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectSongById } from './songsApiSlice'
//import { selectAllArtists } from '../artists/artistsApiSlice'
import EditSongForm from './EditSongForm'

const EditSong = () => {
    const { id } = useParams()

    const song = useSelector(state => selectSongById(state, id))

    const content = song ? <EditSongForm song={song} /> : <p>Loading...</p>

    return content
}
export default EditSong