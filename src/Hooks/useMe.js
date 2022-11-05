const { useState, useEffect } = require("react")

const useMe = () => {
    const [me, setMe] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:5000/api/v1/user/me', {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        }).then(res => res.json())
        .then(data => {
            if(data.data){
                setMe(data.data)
                setLoading(false)
            }
            console.log(data, 'success');
        });
    }, [])

    return [me, setMe, loading];
}
export default useMe;