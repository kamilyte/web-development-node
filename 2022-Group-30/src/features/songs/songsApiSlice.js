import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const songsAdapter = createEntityAdapter({})

const initialState = songsAdapter.getInitialState()

export const songsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getSongs: builder.query({
            query: () => '/songs/all?=application/json',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            //keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedSongs = responseData.map(song => {
                    song.id = song._id
                    return song
                });
                return songsAdapter.setAll(initialState, loadedSongs)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Song', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Song', id }))
                    ]
                } else return [{ type: 'Song', id: 'LIST' }]
            }
        }),
        getSongID: builder.query({
            query: (id) => ({
                url: `/songs/id?=application/json`,
                body: { id }
            }),
            
            transformResponse: (response, meta, arg) => response.data,
      
            transformErrorResponse: (response, meta, arg) => response.status,
            providesTags: (result, error, id) => [{ type: 'Song', id }],
            
            /*
            providesTags: (result, error, arg) => [
                { type: 'Song', id: arg.id }
            ]
            */
        }),
        addNewSong: builder.mutation({
            query: initialSongData => ({
                url: '/songs',
                method: 'POST',
                body: {
                    ...initialSongData,
                }
            }),
            invalidatesTags: [
                { type: 'Song', id: "LIST" }
            ]
        }),
        updateSong: builder.mutation({
            query: initialSongData => ({
                url: '/songs/id',
                method: 'PATCH',
                body: {
                    ...initialSongData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Song', id: arg.id }
            ]
        }),
        deleteSongID: builder.mutation({
            query: ({ id }) => ({
                url: `/songs/id`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Song', id: arg.id }
            ]
        }),
        deleteSongsArtistID: builder.mutation({
            query: ({ id }) => ({
                url: `/songs/artist/id`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Song', id: arg.id }
            ]
        }),
        deleteSongsArtistName: builder.mutation({
            query: ({ artists }) => ({
                url: `/songs/artist`,
                method: 'DELETE',
                body: { artists }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Song', id: arg.artists }
            ]
        }),
    }),
})

export const {
    useGetSongsQuery,
    useGetSongIDQuery,
    useAddNewSongMutation,
    useUpdateSongMutation,
    useDeleteSongIDMutation,
    useDeleteSongsArtistIDMutation,
    useDeleteSongsArtistNameMutation,
} = songsApiSlice

// returns the query result object
export const selectSongsResult = songsApiSlice.endpoints.getSongs.select()

// creates memoized selector
const selectSongsData = createSelector(
    selectSongsResult,
    songsResult => songsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllSongs,
    selectById: selectSongById,
    selectIds: selectSongIds
    // Pass in a selector that returns the songs slice of state
} = songsAdapter.getSelectors(state => selectSongsData(state) ?? initialState)