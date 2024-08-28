import { useState, useEffect } from "react"
import { useUpdateSongMutation, useDeleteSongIDMutation } from "./songsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const EditSongForm = ({ song }) => {

    const [updateSong, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateSongMutation()

    const [deleteSong, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteSongIDMutation()

    const navigate = useNavigate()

    const [name, setName] = useState(song.name)
    const [popularity, setPopularity] = useState(song.popularity)
    const [artists, setArtists] = useState(song.artists)
    const [artistIDs, setArtistIDs] = useState(song.artistIDs)
    const [date, setDate] = useState(song.date)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setName('')
            setPopularity('')
            setArtists('')
            setArtistIDs('')
            setDate('')
            navigate('/dash/songs')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onPopularityChanged = e => setPopularity(e.target.value)
    const onArtistsChanged = e => setArtists(e.target.value)
    const onArtistIDsChanged = e => setArtistIDs(e.target.value)
    const onDateChanged = e => setDate(e.target.value)

    const canSave = [name, popularity, artists, artistIDs, date].every(Boolean) && !isLoading

    const onSaveSongClicked = async (e) => {
        if (canSave) {
            await updateSong({ id: song.id, name, popularity, artists, artistsID: artistIDs, date})
        }
    }

    const onDeleteSongClicked = async () => {
        await deleteSong({ id: song.id })
    }

    /*
    const options = artistList.map(artist => {
        return (
            <option
                key={artist.id}
                value={artist.id}

            > {artist.name}</option >
        )
    })
    */

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validNameClass = !name ? "form__input--incomplete" : ''
    const validPopularityClass = !popularity ? "form__input--incomplete" : ''
    const validArtistsClass = !artists ? "form__input--incomplete" : ''
    const validArtistIDsClass = !artistIDs ? "form__input--incomplete" : ''
    const validDateClass = !date ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Song #{song.ticket}</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveSongClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteSongClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="name">
                    Name:</label>
                <input
                    className={`form__input ${validNameClass}`}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onNameChanged}
                />

                <label className="form__label" htmlFor="popularity">
                    Popularity:</label>
                <input
                    className={`form__input ${validPopularityClass}`}
                    id="popularity"
                    name="popularity"
                    value={popularity}
                    onChange={onPopularityChanged}
                />

                <label className="form__label" htmlFor="artists">
                    Artists:</label>
                <input
                    className={`form__input ${validArtistsClass}`}
                    id="artists"
                    name="artists"
                    value={artists}
                    onChange={onArtistsChanged}
                />

                <label className="form__label" htmlFor="artistIDs">
                    ArtistIDs:</label>
                <input
                    className={`form__input ${validArtistIDsClass}`}
                    id="artistIDs"
                    name="artistIDs"
                    value={artistIDs}
                    onChange={onArtistIDsChanged}
                />    

                <label className="form__label" htmlFor="date">
                    Date:</label>
                <input
                    className={`form__input ${validDateClass}`}
                    id="date"
                    name="date"
                    type="date"
                    autoComplete="off"
                    value={date}
                    onChange={onDateChanged}
                /> 
            </form>
        </>
    )

    return content
}

export default EditSongForm