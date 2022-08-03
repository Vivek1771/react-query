import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

function User() {

    const { isLoading, error, data } = useQuery(['fetchUser'], () => axios("https://jsonplaceholder.typicode.com/users"))
    const queryClient = useQueryClient()

    const AddUser = (newUser) => {
        return axios.post('https://jsonplaceholder.typicode.com/users', newUser)
    }

    const deleteUser = (id) => {
        return axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
    }


    const mutation = useMutation(AddUser, {
        onSuccess: () => {
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
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error?.message}.</p>}
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