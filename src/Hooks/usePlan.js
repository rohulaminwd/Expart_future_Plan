import { useQuery } from "react-query";
import axios from "../Utils/Axios.config";

const usePlan = () => {
  const { data, isLoading, refetch, error } = useQuery("plan", () =>
    axios.get("/plan").then((res) => res.data?.data)
  );

  return [data, isLoading, refetch, error];
};
export default usePlan;
