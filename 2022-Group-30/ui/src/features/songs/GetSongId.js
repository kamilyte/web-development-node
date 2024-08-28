import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'


const GetSongId = () => {
    const navigate = useNavigate()
    
    const [id, setId] = useState()

    useEffect(() => {
        setId('')
    }, [])

    const onIdChanged = e => setId(e.target.value)

    const onClicked = () => navigate(`/dash/songs/id/${id}`)

    const validIdClass = !id ? "form__input--incomplete" : ''

    const content = (
        <>
            <p ></p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Get Song ID</h2>
                </div>
                <label className="form__label" htmlFor="id">
                    ID:</label>
                <input
                    className={`form__input ${validIdClass}`}
                    id="id"
                    name="id"
                    type="text"
                    autoComplete="off"
                    value={id}
                    onChange={onIdChanged}
                />
                <button  onClick={onClicked}>Search</button>
                
            </form>
        </>
    )

    return content


}

export default GetSongId