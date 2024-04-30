import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditIssueButton = ({ issueId }: { issueId: string }) => {
  return (
    <div>
      {" "}
      <Button>
        <Link href={`/issues/view/${issueId}/edit`}>Update Issue</Link>
      </Button>
    </div>
  );
};

export default EditIssueButton;
