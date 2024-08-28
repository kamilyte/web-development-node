
import { useGetSongIDQuery } from './songsApiSlice'

import Song from './Song'

const SongId = ({id}) => {
    

    const { data: song,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetSongIDQuery(id, {
        pollingInterval: 3000,
        refetchOnMountOrArgChange: true,
        skip: false,
    })
    

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    
    if (isSuccess) {
    

        const tableContent = <Song key={song} song={song} />
        
        content = (
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
    }

    return content


    //const song = useSelector(state => selectSongById(state, id))

    //const content = song ? <EditSongForm song={song} /> : <p>Loading...</p>

    //return content
}
export default SongId