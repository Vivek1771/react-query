import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

function User() {

    const placeholderUsers = { data: { data: [{ name: "Abcd", email: "fsdf@asd.dasdas" }, { name: "Abcd", email: "fsdf@asd.dasdas" }] } }

    const { isLoading, error, data, refetch, isFetching } = useQuery(['fetchUser'], () => axios("https://jsonplaceholder.typicode.com/users"), {
        placeholderData: placeholderUsers.data, refetchOnWindowFocus: false, cacheTime: 5000, enabled: false, onSuccess, onError,
        // select: (data) => {
        //     const website = data?.data?.map(user => user?.website)
        //     return website
        // }
        // refetchInterval: 2000
    })

    function onSuccess(data) { console.log("success", data); }

    function onError(error) { console.log("error", error); }

    const queryClient = useQueryClient()

    const AddUser = (newUser) => {
        return axios.post('https://jsonplaceholder.typicode.com/users', newUser)
    }

    const deleteUser = (id) => {
        return axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
    }


    const mutation = useMutation(AddUser, {
        onSuccess: (data) => {
            console.log('data :', data);
            queryClient.invalidateQueries(['fetchUser'])
        },
    })

    const deleteMutation = useMutation(deleteUser, {
        onSuccess: () => {
            queryClient.invalidateQueries(['fetchUser'])
        },
    })



    return (
        <>
            <div>User</div>
            <hr></hr>
            {isLoading || isFetching && <p>Loading...</p>}
            {error && <p>Error: {error?.message}.</p>}
            <button type='button' onClick={refetch}>Fetch users</button>
            {data?.data?.map(user =>
                <>
                    <p><b>Name:</b> {user?.name}</p>
                    <p><b>Email:</b>  {user?.email}</p>
                </>
            )}


            {mutation.isLoading ? (
                'Adding User...'
            ) : (
                <>
                    {mutation.isError ? (
                        <div>An error occurred: {mutation.error.message}</div>
                    ) : null}

                    {mutation.isSuccess ? <div>User added!</div> :
                        <button
                            onClick={() => {
                                mutation.mutate({ name: 'Vivek Mehta', email: "abvcdawe@fas.asd" })
                            }}
                        >
                            Add User
                        </button>
                    }

                </>
            )}

            <br /> <br />
            {deleteMutation.isLoading ? (
                'deleting User...'
            ) : (
                <>
                    {deleteMutation.isError ? (
                        <div>An error occurred: {deleteMutation.error.message}</div>
                    ) : null}

                    {deleteMutation.isSuccess ? <div>User deleted!</div> :
                        <button
                            onClick={() => {
                                deleteMutation.mutate(4)
                            }}
                        >
                            Delete User
                        </button>
                    }

                </>
            )}


        </>
    )
}

export default User