import { useQuery } from "react-query";
import axios from "../Utils/Axios.config";

const useRequest = () => {
  const { data, isLoading, refetch, error } = useQuery("request", () =>
    axios.get("/request").then((res) => res.data?.data)
  );
  return [data, isLoading, refetch, error];
};

export default useRequest;
