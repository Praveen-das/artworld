import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { _addCategories, _removeCategories, _updateCategories, fetchCategories } from "../lib/product.api";

function useCategories(uid) {
    const queryClient = useQueryClient()

    const categories = useQuery(["categories"], () => fetchCategories());

    const addCategories = useMutation(_addCategories, {
        onSuccess: () => {
            queryClient.invalidateQueries(["categories"])
        }
    });

    const removeCategories = useMutation(_removeCategories, {
        onSuccess: () => {
            queryClient.invalidateQueries(["categories"])
        }
    });

    const updateCategories = useMutation(_updateCategories, {
        onSuccess: () => {
            queryClient.invalidateQueries(["categories"])
        }
    });

    return {
        categories,
        addCategories,
        removeCategories,
        updateCategories
    }
}

export default useCategories