import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { _addToWishlist, _removeFromWishlist, _getUserWishlist } from "../Services/product.api";

function useWishlist() {
    const queryClient = useQueryClient();

    const wishlist = useQuery(['wishlist'], _getUserWishlist)

    const addToWishlist = useMutation(_addToWishlist, {
        onSuccess: () => {
            queryClient.invalidateQueries(['wishlist'])
        },
    })

    const removeFromWishlist = useMutation(_removeFromWishlist, {
        onSuccess: () => {
            queryClient.invalidateQueries(['wishlist'])
        },
    })

    return {
        wishlist,
        addToWishlist,
        removeFromWishlist
    }
}

export default useWishlist