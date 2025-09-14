import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

function parseJSON(json) {
  let parsed = json;
  try {
    parsed = JSON.parse(json);
  } catch (error) {
    console.log(error)
  }
  return parsed;
}

const searchOptions = { replace: true };

export function useFilter() {
  const [searchParams, setSearchParams] = useSearchParams({ p: 1 });
  const queryString = searchParams.toString();

  let filter = useMemo(() => {
    let facets = [];

    for (let [key, value] of searchParams.entries()) {
      if (key === "order") continue;
      if (key === "collection") continue;
      if (key === "category") continue;
      if (key === "q") continue;
      if (key === "p") continue;
      if (key === "limit") continue;
      if (key === "sellingOption") continue;

      key = key.replace("[]", "");
      value = parseJSON(value);

      if (key === "price_range") {
        let label;
        if (value?.min && value?.max) label = `₹ ${value?.min} - ₹ ${value?.max}`;
        if (!value?.min) label = `Under ₹ ${value?.max}`;
        if (!value?.max) label = `Above ₹ ${value?.min}`;

        facets.unshift({ item: key, value, label });
        continue;
      }

      if (key === "rating") {
        facets.unshift({ item: key, value, label: `${value} & above` });
        continue;
      }
      if (key === "discount") {
        facets.unshift({ item: key, value, label: `${value}% or more` });
        continue;
      }
      if (key === "order") {
        facets.unshift({ item: key, value });
        continue;
      }

      facets.unshift({ item: key, value, label: value });
    }
    return facets;
  }, [searchParams]);

  const setPage = (value) => {
    setSearchParams((q) => {
      q.set("p", value);
      return q;
    });
  };

  const setFilter = (key, value, replace) => {
    if (typeof value == "object") value = JSON.stringify(value);
    if (searchParams.has("p")) searchParams.set("p", 1);

    //remove value if already exists
    if (filter?.some((item) => item.value === value)) {
      let newSearchParams = new URLSearchParams();

      for (let [k, v] of searchParams.entries()) {
        if (value === v) continue;
        newSearchParams.append(k, v);
      }

      setSearchParams(newSearchParams, searchOptions);
      return;
    }

    //replace value if true
    if (replace) {
      setSearchParams((q) => {
        q.set(key, value);
        return q;
      }, searchOptions);
      return;
    }

    //stack values
    setSearchParams((pre) => {
      pre.append(key + "[]", value);
      return pre;
    }, searchOptions);
  };

  const deleteFilter = (key) => {
    setSearchParams((p) => {
      p.delete(key);
      return p;
    }, searchOptions);
  };

  const clearFilters = () => {
    setSearchParams((s) => {
      for (let { item, value } of filter) {
        if(item === 'price_range') s.delete(item)
        else s.delete(item + "[]");
      }
      return s;
    }, searchOptions);
  };

  return {
    setPage,
    searchParams,
    setSearchParams,
    queryString,
    filter,
    setFilter,
    deleteFilter,
    clearFilters,
  };
}
