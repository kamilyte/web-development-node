import { useGetArtistsQuery } from "./artistsApiSlice"
import Artist from "./Artist"

const ArtistsList = () => {
    const {
        data: artists,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetArtistsQuery()

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = artists

        const tableContent = ids?.length
            ? ids.map(artistId => <Artist key={artistId} artistId={artistId} />)
            : null

        content = (
            <table className="table table--artists">
                <thead className="table__thead">
                    <tr>
                    
                        <th scope="col" className="table__th artist__name">Name</th>
                        <th scope="col" className="table__th artist__popularity">Popularity</th>
                        <th scope="col" className="table__th artist__edit">Edit</th>
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
export default ArtistsList