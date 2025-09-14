import { useQuery } from "@tanstack/react-query";
import { fetchFilterParams } from "../Services/product.api";

export default function useFacets(callback) {
  const queryString = window.location.search.slice(1);

  const facets = useQuery(["filterParams", queryString], () => fetchFilterParams(queryString), {
    onSuccess: callback,
    keepPreviousData: true,
  });

  return {
    facets,
  };
}
