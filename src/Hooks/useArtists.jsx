import { useQuery } from "@tanstack/react-query";
import { getArtists } from "../Services/user.api";

function useArtists() {
    const user = useQuery(["artists"], getArtists);

    return user
}

export default useArtists