import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'


const GetSongName = () => {
    const navigate = useNavigate()
    
    const [name, setName] = useState('')

    useEffect(() => {
        setName('')
    }, [])

    const onNameChanged = e => setName(e.target.value)

    const onClicked = () => {
        const param = name.replace(/\s+/g, '-')
        navigate(`/dash/songs/name/${param}`)
    }

    const validNameClass = !name ? "form__input--incomplete" : ''

    const content = (
        <>
            <p ></p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Get songs by name</h2>
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
                <button  type="submit" onClick={onClicked}>Search</button>
                
            </form>
        </>
    )

    return content


}

export default GetSongName