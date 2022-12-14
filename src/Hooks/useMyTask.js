
const { useState, useEffect } = require("react")

const useMyTask = () => {
    const [myTask, setMyTask] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)

        fetch(`http://localhost:5000/api/v1/task/complete`, {
                method: "GET",
                headers: {
                    'content-type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
            })
        .then(res => res.json())
        .then(data => {
            if(data){
                setMyTask(data)
                setLoading(false)
            }
        });
    }, [])

    return [myTask, setMyTask, loading];
}
export default useMyTask;