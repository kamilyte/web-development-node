import { useGetSongsQuery } from "./songsApiSlice"
import Song from "./Song"

const SongsList = () => {
    const {
        data: songs,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetSongsQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }


    if (isSuccess) {
        const { ids } = songs

        const tableContent = ids?.length
            ? ids.map(songId => <Song key={songId} songId={songId} />)
            : null

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
export default SongsList