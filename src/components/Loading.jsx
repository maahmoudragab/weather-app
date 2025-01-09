import { Stack } from "@mui/material";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function Loading() {
  return (
    <Stack gap="20px" sx={{ px: 0.5 }}>
      <div id="wifi-loader">
        <svg className="circle-outer" viewBox="0 0 86 86">
          <circle className="back" cx="43" cy="43" r="40"></circle>
          <circle className="front" cx="43" cy="43" r="40"></circle>
          <circle className="new" cx="43" cy="43" r="40"></circle>
        </svg>
        <svg className="circle-middle" viewBox="0 0 60 60">
          <circle className="back" cx="30" cy="30" r="27"></circle>
          <circle className="front" cx="30" cy="30" r="27"></circle>
        </svg>
        <svg className="circle-inner" viewBox="0 0 34 34">
          <circle className="back" cx="17" cy="17" r="14"></circle>
          <circle className="front" cx="17" cy="17" r="14"></circle>
        </svg>
        <div className="text" data-text="Searching"></div>
      </div>
      <SkeletonTheme
        height={180}
        baseColor="#c7deff2e"
        customHighlightBackground="linear-gradient(90deg, transparent, #ffffff1f, transparent)"
      >
        <Skeleton />
      </SkeletonTheme>
      <SkeletonTheme
        height={180}
        baseColor="#c7deff2e"
        customHighlightBackground="linear-gradient(90deg, transparent, #ffffff1f, transparent)"
      >
        <Skeleton />
      </SkeletonTheme>
    </Stack>
  );
}
