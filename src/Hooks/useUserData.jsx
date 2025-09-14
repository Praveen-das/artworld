import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { _addFollower, _removeFollower, _getUserById } from "../Services/user.api";

function useUserData(uid) {
    const queryClient = useQueryClient();

    const user = useQuery(["user", uid], () => _getUserById(uid), {
        enabled: !!uid
    });

    const addFollower = useMutation(_addFollower, {
        onSuccess: () => {
            queryClient.invalidateQueries(["user"])
        }
    })
    const removeFollower = useMutation(_removeFollower, {
        onSuccess: () => {
            queryClient.invalidateQueries(["user"])
        }
    })


    return {
        user,
        addFollower,
        removeFollower
    }
}

export default useUserData