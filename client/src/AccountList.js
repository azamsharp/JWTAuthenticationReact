
import { useState, useEffect } from 'react'
import axios from 'axios'

function AccountList() {

    const [accounts, setAccounts] = useState([])

    useEffect(() => {
        getAllAccounts()
    }, [])

    const getAllAccounts = () => {

        const username = localStorage.getItem('username')

        axios.get(`http://localhost:8080/accounts/${username}`)
            .then(response => {
                setAccounts(response.data)
            })
            .catch(error => console.log(error))
    }

    return (
        <h1>AccountList</h1>
    )
}

export default AccountList