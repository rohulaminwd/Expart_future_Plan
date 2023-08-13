import { useQuery } from "react-query";
import axios from "../Utils/Axios.config";

const useUsers = () => {
  const { data, isLoading, refetch, error } = useQuery("user", () =>
    axios.get("/users").then((res) => res.data)
  );

  const users = data?.data.filter((i) => i?.status === "active");
  const inactive = data?.data.filter((i) => i?.status === "inactive");
  const blocked = data?.data.filter((i) => i?.status === "block");

  return [users, isLoading, refetch, error, blocked, inactive];
};
export default useUsers;
