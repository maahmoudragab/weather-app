import { Box, Typography } from "@mui/material";

export default function ErrorMessage() {

  return (
    <Box
      sx={{
        position: "absolute",
        width: "95%",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        color: "#fff",
        textAlign: "center",
        bgcolor: "#c7deff2e",
        backdropFilter: "blur(40px)",
        borderRadius: 2,
        p: 2,
      }}
    >
      <Typography variant="h5">
        Error fetching data from the API. Please try again later.
      </Typography>
    </Box>
  );
}
