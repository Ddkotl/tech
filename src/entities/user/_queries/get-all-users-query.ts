import { useQueryClient } from "@tanstack/react-query";
import { getAllUsersAction } from "../_actions/get-all-users-action";

const baseKey = "users";

export const getAllUsersQuery = () => ({
  queryKey: [baseKey, "getAllUsersById"],
  queryFn: () => getAllUsersAction(),
});

export const useInvalidateUsers = () => {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: [baseKey, "getAllUsersById"],
    });
};
