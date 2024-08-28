import { useState, useEffect } from "react"
import { useDeleteSongsArtistIDMutation } from "./songsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"

const DeleteSongsArtistID = () => {

    const [deleteSongsArtistID, {
        isSuccess,
        isError,
        error
    }] = useDeleteSongsArtistIDMutation()

    const navigate = useNavigate()

    const [artistID, setArtistID] = useState('')

    useEffect(() => {
        if (isSuccess) {
            setArtistID('')
            navigate('/dash/songs')
        }
    }, [isSuccess, navigate])

    const onArtistIDChanged = e => setArtistID(e.target.value)

    const onDeleteSongsClicked = async () => {
        await deleteSongsArtistID({ id: artistID})
    }

    const errClass = (isError ) ? "errmsg" : "offscreen"
    const validArtistIDClass = !artistID ? "form__input--incomplete" : ''
    const errContent = (error?.data?.message) ?? ''

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Delete Songs by ArtistID </h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteSongsClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="artistID">
                    Artist ID:</label>
                <input
                    className={`form__input ${validArtistIDClass}`}
                    id="artistID"
                    name="artistID"
                    type="text"
                    autoComplete="off"
                    value={artistID}
                    onChange={onArtistIDChanged}
                />
            </form>
        </>
    )

    return content

}

export default DeleteSongsArtistID