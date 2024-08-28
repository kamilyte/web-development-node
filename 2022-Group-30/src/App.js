import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import SongsList from './features/songs/SongsList'
import ArtistsList from './features/artists/ArtistsList'
import EditSong from './features/songs/EditSong'
import NewSongForm from './features/songs/NewSongForm'
import SongsListId from './features/songs/SongsListId'
import DeleteSongsArtistId from './features/songs/DeleteSongsArtistId'
import DeleteSongsArtistName from './features/songs/DeleteSongsArtistName'
//import NewSong from './features/songs/NewSong'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />

        <Route path="dash" element={<DashLayout />}>

          <Route index element={<Welcome />} />

          <Route path="songs">
            <Route index element={<SongsList />} />
            <Route path=":id" element={<EditSong />} />
            <Route path="new" element={<NewSongForm />} />
            <Route path="id" element={<SongsListId />} />
            <Route path="deleteSongsID" element={<DeleteSongsArtistId />} />
            <Route path="deleteSongsName" element={<DeleteSongsArtistName />} />
          </Route>

          <Route path="artists">
            <Route index element={<ArtistsList />} />
          </Route>

        </Route>{/* End Dash */}

      </Route>
    </Routes>
  );
}

export default App;