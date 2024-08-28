import { useGetSongsNameQuery } from './songsApiSlice'
import { useParams } from 'react-router-dom'
import Song from './SongName'

const SongsListName = () => {
    const { name } = useParams()

    const {
        data: songs,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetSongsNameQuery(name)

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        
        var jsonSongs = []
        for (let x in songs) {
           if(x === "entities") {

              var jsonTemp = songs[x]
              var keyID = Object.keys(jsonTemp)

              for(var j in keyID) {

                var json = {}
                Object.assign(json, {
                    name: songs[x][keyID[j]]["name"],
                    popularity: songs[x][keyID[j]]["popularity"],
                    artists: songs[x][keyID[j]]["artists"][0],
                    artistIDs : songs[x][keyID[j]]["artistIDs"][0],
                    songId: keyID[j],
                    date: songs[x][keyID[j]]["date"],
                    edit: songs[x][keyID[j]]["__v"]
                });
                jsonSongs.push(json)
              }
           }     
        }



      

    
        const tableContent = jsonSongs.map(song => <Song key={song.songId} songId={song.songId} song = {song} />)
        
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
}

export default SongsListName