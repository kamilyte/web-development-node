import { useState, useEffect } from "react"
import { useDeleteSongsArtistNameMutation } from "./songsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"

const DeleteSongsArtistName = () => {

    const [deleteSongsArtistName, {
        isSuccess,
        isError,
        error
    }] = useDeleteSongsArtistNameMutation()

    const navigate = useNavigate()

    const [name, setName] = useState()

    useEffect(() => {
        if (isSuccess) {
            setName('')
            navigate('/dash/songs')
        }
    }, [isSuccess, navigate])

    const onArtistNameChanged = e => setName(e.target.value)

    const onDeleteSongsClicked = async () => {
        await deleteSongsArtistName({ artists: name})
    }

    const errClass = (isError ) ? "errmsg" : "offscreen"
    const validArtistNameClass = !name ? "form__input--incomplete" : ''
    const errContent = (error?.data?.message) ?? ''

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Delete Songs by Artist Name </h2>
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
                <label className="form__label" htmlFor="name">
                    Artist Name:</label>
                <input
                    className={`form__input ${validArtistNameClass}`}
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="off"
                    value={name}
                    onChange={onArtistNameChanged}
                />
            </form>
        </>
    )

    return content

}

export default DeleteSongsArtistName