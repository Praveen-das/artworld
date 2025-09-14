import useFacets from "../Hooks/useFacets";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const Chip = styled((props) => <Box component={Link} {...props} />)({
  boxSizing: "border-box",
  width: "100%",
  display: "flex",
  flex: "1 1 max-content",
  background: "var(--brandLight)",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px 20px",
  borderRadius: "10px",
  whiteSpace: "nowrap",
  transition: "0.2s",
  ":hover": {
    background: "var(--brand)",
    color: "white !important",
  },
});

function SubjectsList() {
  const {
    facets: { data },
  } = useFacets();
  const subjects = data?.allSubjects || [];

  const typo = {
    fontSize: 14,
    fontWeight: 500,
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "var(--vGap)",
          mt: 8,
          ml: 4,
        }}
      >
        <Typography variant="heading2">WHAT ARE YOU LOOKING FOR ?</Typography>
        <Box
          sx={{
            width: "100%",
            position: "relative",
            height: 65,
          }}
        >
          <Box
            className="no-scrollbar"
            sx={{
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              position: "absolute",
              inset: 0,
              pr: 6,
              gap: 2,
              overflow: "auto",
              // height: 'auto',
            }}
          >
            {subjects?.map(({ name }) => (
              <Chip key={name} to={`/shop?subject%5B%5D=${name}`}>
                <Typography sx={typo}>{name}</Typography>
              </Chip>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default SubjectsList;
