
import { useQuery } from 'react-query';
import axios from '../Utils/Axios.config';

const useTask = () => {

    const {data, isLoading, refetch, error, } = useQuery('task', () =>
    axios.get('/task').then((res) => res.data)
  );

    return [data, isLoading, refetch, error];
}
export default useTask;