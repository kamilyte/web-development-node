import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewSongMutation } from "./songsApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const NewSongForm = () => {

    const [addNewSong, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewSongMutation()

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [popularity, setPopularity] = useState('')
    const [artists, setArtists] = useState('')
    const [artistIDs, setArtistIDs] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        if (isSuccess) {
            setName('')
            setPopularity('')
            setArtists('')
            setArtistIDs('')
            setDate('')
            navigate('/dash/songs')
        }
    }, [isSuccess, navigate])

    const onNameChanged = e => setName(e.target.value)
    const onPopularityChanged = e => setPopularity(e.target.value)
    const onArtistsChanged = e => setArtists(e.target.value)
    const onArtistIDsChanged = e => setArtistIDs(e.target.value)
    const onDateChanged = e => setDate(e.target.value)

    const canSave = [name, popularity, artists, artistIDs, date].every(Boolean) && !isLoading

    const onSaveSongClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewSong({ name, popularity, artists, artistsID: artistIDs, date })
        }
    }

    /*
    const options = songs.map(song => {
        return (
            <option
                key={song.id}
                value={song.id}
            > {song.name}</option >
        )
    })
    */

    const errClass = isError ? "errmsg" : "offscreen"
    const validNameClass = !name ? "form__input--incomplete" : ''
    const validPopularityClass = !popularity ? "form__input--incomplete" : ''
    const validArtistsClass = !artists ? "form__input--incomplete" : ''
    const validArtistIDsClass = !artistIDs ? "form__input--incomplete" : ''
    const validDateClass = !date ? "form__input--incomplete" : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveSongClicked}>
                <div className="form__title-row">
                    <h2>New Song</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="name">
                    Name:</label>
                <input
                    className={`form__input ${validNameClass}`}
                    id="name"
                    name="name"
                    //type="text"
                    //autoComplete="off"
                    value={name}
                    onChange={onNameChanged}
                />

                <label className="form__label" htmlFor="popularity">
                    Popularity:</label>
                <input
                    className={`form__input ${validPopularityClass}`}
                    id="popularity"
                    name="popularity"
                    //type="number"
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
                    value={date}
                    onChange={onDateChanged}
                />             

            </form>
        </>
    )
    return content
}

export default NewSongForm