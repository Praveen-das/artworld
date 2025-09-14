import { useMutation, useQueryClient } from "@tanstack/react-query";
import { _createBankAccount, _verifyPayment, _verifyRegistration } from "../Services/rzp.api";

function useRzp() {
    const queryClient = useQueryClient()
    
    const verifyPayment = useMutation(_verifyPayment, {
        onSuccess: () => {
            queryClient.invalidateQueries(["currentUser"]);
        },
    });

    const verifyRegistration = useMutation(_verifyRegistration, {
        onSuccess: () => {
            queryClient.invalidateQueries(["currentUser"]);
        },
    });
    
    const createBankAccount = useMutation(_createBankAccount, {
        // onSuccess: () => {
        //     queryClient.invalidateQueries(["currentUser"]);
        // },
    });

    return {
        verifyPayment,
        verifyRegistration,
        createBankAccount
    };
}

export default useRzp;
