import { useState, useEffect } from "react"

import SongId from "./SongId"

const SongsListId = () => {
    const [songID, setSongID] = useState()

    useEffect(() => {
        setSongID('')
    }, [])

    const onSongIDChanged = e => setSongID(e.target.value)

    const onButtonClicked = () => {
       return <SongId id={songID} />
    }

    //const errClass = (isError ) ? "errmsg" : "offscreen"
    const validSongIDClass = !songID ? "form__input--incomplete" : ''
    //const errContent = (error?.data?.message) ?? ''
    //<p className={errClass}>{errContent}</p>
    const content = (
        <>
            

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Get Song </h2>
            
                        
                    
                </div>
                <label className="form__label" htmlFor="artistID">
                    Song ID:</label>
                <input
                    className={`form__input ${validSongIDClass}`}
                    id="songID"
                    name="songID"
                    type="text"
                    autoComplete="off"
                    value={songID}
                    onChange={onSongIDChanged}
                />
                <button onClick={onButtonClicked}> Search</button>
            </form>
        
            </>
    )

    return content

}
export default SongsListId