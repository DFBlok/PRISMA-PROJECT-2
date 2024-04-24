import React from "react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
const IssuePage = () => {
  return (
    <div className="my-4">
      <Button asChild size="3">
        <Link href="/issues/new">Add New Issue</Link>
      </Button>
    </div>
  );
};

export default IssuePage;
