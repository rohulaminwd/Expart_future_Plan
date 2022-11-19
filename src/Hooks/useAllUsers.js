import { useQuery } from "react-query";

const { useState, useEffect } = require("react")

const useAllUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:5000/api/v1/user', {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json())
        .then(data => {
            if(data.data){
                setUsers(data.data)
                setLoading(false)
            }
        });
    }, [])

    return [users, setUsers, loading];
}
export default useAllUsers;