import { Button } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const LoadingNewIssue = () => {
  return (
    <div>
      {" "}
      <form className="max-w-lg space-y-4 mt-5">
        <Skeleton />

        <Skeleton height="16rem" />
        <Button type="submit">Submit Issue</Button>
      </form>
    </div>
  );
};

export default LoadingNewIssue;
