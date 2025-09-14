import React, { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  ListItem,
  Slider,
  Checkbox,
  Fade,
  Chip,
  Grid,
} from "@mui/material";
import _ExpandLess from "@mui/icons-material/ExpandMore";
import _ExpandMore from "@mui/icons-material/ExpandLess";
import { Box } from "@mui/system";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useFilter } from "./useFilter";
import useFacets from "../../../Hooks/useFacets";
import { useProducts } from "../../../Hooks/useProducts";

const ExpandMore = () => <_ExpandMore fontSize="small" />;
const ExpandLess = () => <_ExpandLess fontSize="small" />;

const ratinglist = [4, 3, 2, 1];
const discountList = [40, 30, 20, 10];

const title = { variant: "button", fontWeight: 700, fontSize: 14 };
const primaryTypographyProps = { fontWeight: 600, textTransform: "capitalize", fontSize: 12 };

function Sidebar() {
  const navigate = useNavigate();
  const { filter, setFilter, deleteFilter } = useFilter();
  const { data: products, isLoading } = useProducts();
  const data = useFacets().facets.data;
  const subjects = data?.subjects || [];
  const styles = data?.styles || [];
  const materials = data?.materials || [];
  const priceRange = data?.priceRange || null;

  const { pathname } = useLocation();
  let pathName = pathname.slice(1);
  const [open, setOpen] = useState([]);

  const handleList = (item) => {
    if (open.includes(item)) return setOpen((pre) => pre.filter((o) => o !== item));
    return setOpen((pre) => [...pre, item]);
  };

  const handlePriceRange = ([min, max]) => {
    setFilter("price_range", { min, max }, true);
  };

  const handleFilter = (item, value) => {
    setFilter(item, value);
  };

  let timeOut = 100;

  if (pathName === "results" && !products?.length) return <></>;
  return (
    <Box
      sx={{
        // display: "none",
        width: "100%",
        height: "100%",
        borderRadius: 4,
      }}
    >
      <List sx={{ pt: 0 }} dense aria-labelledby="nested-list-subheader">
        <ListItem>
          <ListItemText primary="Filters" primaryTypographyProps={title} />
        </ListItem>
        <List dense>
          <ListItem>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {filter.map(({ item, value, label }) => {
                if (item === "order") return null;
                if (item === "collection") return null;
                if (item === "category") return null;
                if (item === "q") return null;
                if (item === "p") return null;
                if (item === "limit") return null;
                if (item === "sellingOption") return null;

                return (
                  <Chip
                    key={value}
                    variant="filled"
                    color="primary"
                    label={label}
                    onClick={() => {
                      if (item === "price_range") return deleteFilter(item);
                      if (item === "q") return navigate("/shop");
                      setFilter(item, value);
                    }}
                    size="small"
                    sx={{
                      fontSize: 10,
                      height: 20,
                      textTransform: "capitalize",
                      ":hover": { textDecoration: "line-through", cursor: "pointer" },
                    }}
                  />
                );
              })}
            </div>
          </ListItem>
        </List>

        {/* ----------------------------Price range---------------------------- */}
        <ListItem>
          <ListItemText primary="Price" primaryTypographyProps={title} />
        </ListItem>
        <List dense>
          <ListItem>
            <Box sx={{ width: "100%", mt: -1 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <ListItemText primaryTypographyProps={primaryTypographyProps}>From {priceRange?.min || 0}</ListItemText>
                <ListItemText sx={{ textAlign: "right" }} primaryTypographyProps={primaryTypographyProps}>
                  Up to {priceRange?.max || 99999}
                </ListItemText>
              </Box>
              <PriceRange onChange={handlePriceRange} range={[priceRange?.min || 0, priceRange?.max || 99999]} />
            </Box>
          </ListItem>
        </List>

        {/* ----------------------------Style---------------------------- */}
        <ListItemButton sx={{ borderRadius: 50 }} onClick={() => handleList("style")}>
          <ListItemText primary="Style" primaryTypographyProps={title} />
          {open.includes("style") ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={!open.includes("style")} timeout="auto" unmountOnExit>
          <List disablePadding dense sx={{ maxHeight: 300, overflow: "auto" }}>
            {!!styles?.length &&
              styles?.map(({ style }, i) => (
                <Fade
                  key={style?.id}
                  style={{ transitionDelay: `${i * timeOut}ms` }}
                  in={!open.includes("style")}
                  mountOnEnter
                  unmountOnExit
                >
                  <ListItemButton onClick={() => handleFilter("style", style?.name)} key={style?.id} sx={{ pl: 4 }}>
                    <Checkbox
                      checked={Boolean(filter?.find(({ value }) => value === style?.name))}
                      edge="start"
                      tabIndex={-1}
                      size="small"
                      disableRipple
                      sx={{ py: "5px" }}
                    />
                    <ListItemText primaryTypographyProps={primaryTypographyProps} primary={style?.name} />
                  </ListItemButton>
                </Fade>
              ))}
          </List>
        </Collapse>

        {/* ----------------------------Subject---------------------------- */}
        <ListItemButton sx={{ borderRadius: 50 }} onClick={() => handleList("subject")}>
          <ListItemText primary="Subject" primaryTypographyProps={title} />
          {open.includes("subject") ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={!open.includes("subject")} timeout="auto" unmountOnExit>
          <List disablePadding dense sx={{ maxHeight: 300, overflow: "auto" }}>
            {!!subjects?.length &&
              subjects?.map(({ subject }, i) => (
                <Fade
                  key={subject?.id}
                  style={{ transitionDelay: `${i * timeOut}ms` }}
                  in={!open.includes("subject")}
                  mountOnEnter
                  unmountOnExit
                >
                  <ListItemButton
                    onClick={() => handleFilter("subject", subject?.name)}
                    key={subject?.id}
                    sx={{ pl: 4 }}
                  >
                    <Checkbox
                      checked={Boolean(filter?.find(({ value }) => value === subject?.name))}
                      edge="start"
                      tabIndex={-1}
                      size="small"
                      disableRipple
                      sx={{ py: "5px" }}
                    />
                    <ListItemText primaryTypographyProps={primaryTypographyProps} primary={subject?.name} />
                  </ListItemButton>
                </Fade>
              ))}
          </List>
        </Collapse>

        {/* ----------------------------Material---------------------------- */}
        <ListItemButton sx={{ borderRadius: 50 }} onClick={() => handleList("material")}>
          <ListItemText primary="Material" primaryTypographyProps={title} />
          {open.includes("material") ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={!open.includes("material")} timeout="auto" unmountOnExit>
          <List disablePadding dense sx={{ maxHeight: 300, overflow: "auto" }}>
            {!!materials?.length &&
              materials?.map(({ material }, i) => (
                <Fade
                  key={material?.id}
                  style={{ transitionDelay: `${i * timeOut}ms` }}
                  in={!open.includes("material")}
                  mountOnEnter
                  unmountOnExit
                >
                  <ListItemButton
                    onClick={() => handleFilter("material", material?.name)}
                    key={material?.id}
                    sx={{ pl: 4 }}
                  >
                    <Checkbox
                      checked={Boolean(filter?.find(({ value }) => value === material?.name))}
                      edge="start"
                      tabIndex={-1}
                      size="small"
                      disableRipple
                      sx={{ py: "5px" }}
                    />
                    <ListItemText primaryTypographyProps={primaryTypographyProps} primary={material?.name} />
                  </ListItemButton>
                </Fade>
              ))}
          </List>
        </Collapse>

        {/* ----------------------------Rating---------------------------- */}
        <ListItemButton sx={{ borderRadius: 50 }} onClick={() => handleList("ratings")}>
          <ListItemText primary="Customer ratings" primaryTypographyProps={title} />
          {open.includes("ratings") ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={!open.includes("ratings")} timeout="auto" unmountOnExit>
          <List disablePadding dense sx={{ maxHeight: 300, overflow: "auto" }}>
            {ratinglist.map((rating, i) => (
              <Fade
                key={i}
                style={{ transitionDelay: `${i * timeOut}ms` }}
                in={!open.includes("ratings")}
                mountOnEnter
                unmountOnExit
              >
                <ListItemButton key={rating} onClick={() => setFilter("rating", rating)} sx={{ pl: 4 }}>
                  <Checkbox
                    checked={Boolean(filter?.find((o) => o.item === "rating" && o.value === rating))}
                    edge="start"
                    size="small"
                  />
                  <ListItemText primary={`${rating} & above`} primaryTypographyProps={primaryTypographyProps} />
                </ListItemButton>
              </Fade>
            ))}
          </List>
        </Collapse>

        {/* ----------------------------Discount---------------------------- */}
        <ListItemButton sx={{ borderRadius: 50 }} onClick={() => handleList("discount")}>
          <ListItemText primary="Discount" primaryTypographyProps={title} />
          {open.includes("discount") ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={!open.includes("discount")} timeout="auto" unmountOnExit>
          <List disablePadding dense sx={{ maxHeight: 300, overflow: "auto" }}>
            {discountList.map((vote, i) => (
              <Fade
                key={i}
                style={{ transitionDelay: `${i * 60}ms` }}
                in={!open.includes("discount")}
                mountOnEnter
                unmountOnExit
              >
                <ListItemButton key={vote} onClick={() => setFilter("discount", vote)} sx={{ pl: 4 }}>
                  <Checkbox checked={Boolean(filter?.find((o) => o.value === vote))} edge="start" size="small" />
                  <ListItemText
                    primary={`${vote}% or more`}
                    primaryTypographyProps={{ ...primaryTypographyProps, textTransform: "none" }}
                  />
                </ListItemButton>
              </Fade>
            ))}
          </List>
        </Collapse>
      </List>
    </Box>
  );
}

export default Sidebar;

function PriceRange({ range, onChange = () => null }) {
  const [value, setValue] = useState(range);
  const { filter } = useFilter();

  useEffect(() => {
    const price_range = filter?.find((o) => o.item === "price_range");
    if (price_range) setValue([price_range.value.min, price_range.value.max]);
  }, [filter, range]);

  return (
    <Slider
      value={value}
      onChange={(_, val) => setValue(val)}
      onChangeCommitted={(_, val) => onChange(val)}
      size="small"
      valueLabelDisplay="auto"
      step={1}
      min={range[0]}
      max={range[1]}
    />
  );
}
