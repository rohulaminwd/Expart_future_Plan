import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "../Utils/Axios.config";

const useMe = () => {
  const [meData, setMeData] = useState();

  const { data, isLoading, refetch, error } = useQuery("myData", () =>
    axios.get("/auth/me").then((res) => res.data?.data)
  );

  useEffect(() => {
    setMeData(data);
  }, [data]);

  return [meData, isLoading, refetch, error, setMeData];
};

export default useMe;
