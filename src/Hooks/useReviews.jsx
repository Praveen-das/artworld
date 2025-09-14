import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    addUserReview,
    deleteUserReview,
    _getProductReview,
    updateUserReview,
    _getProductsWithAverageRating
} from '../Services/userReview.api'

const useReviews = (productId) => {

    const queryClient = useQueryClient()

    const reviews = useQuery(['review', productId], () => _getProductReview(productId), { enabled: !!productId })
    const productsWithAverageRating = useQuery(['productsWithAverageRating'], _getProductsWithAverageRating)

    const addReview = useMutation(addUserReview, {
        onSuccess: () => queryClient.invalidateQueries(['review'])
    })

    const deleteReview = useMutation(deleteUserReview, {
        onSuccess: () => queryClient.invalidateQueries(['review'])
    })


    const updateReview = useMutation(updateUserReview, {
        onSuccess: () => {
            queryClient.invalidateQueries(['review'])
            queryClient.invalidateQueries(['product'])
        }
    })

    return {
        reviews,
        addReview,
        deleteReview,
        updateReview,
    }

}

export default useReviews