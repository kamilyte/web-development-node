import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const artistsAdapter = createEntityAdapter({})

const initialState = artistsAdapter.getInitialState()

export const artistsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getArtists: builder.query({
            query: () => '/artists?=application/json',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            //keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedArtists = responseData.map(artist => {
                    artist.id = artist._id
                    return artist
                });
                return artistsAdapter.setAll(initialState, loadedArtists)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Artist', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Artist', id }))
                    ]
                } else return [{ type: 'Artist', id: 'LIST' }]
            }
        }),
        
    }),
})

export const {
    useGetArtistsQuery,
} = artistsApiSlice

// returns the query result object
export const selectArtistsResult = artistsApiSlice.endpoints.getArtists.select()

// creates memoized selector
const selectArtistsData = createSelector(
    selectArtistsResult,
    artistsResult => artistsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllArtists,
    selectById: selectArtistById,
    selectIds: selectArtistIds
    // Pass in a selector that returns the artists slice of state
} = artistsAdapter.getSelectors(state => selectArtistsData(state) ?? initialState)