import React from "react";
import { TextField, TextArea, Button } from "@radix-ui/themes";
const NewIssue = () => {
  return (
    <div className="max-w-lg space-y-4 mt-5">
      <TextField.Root placeholder="This is Title..." />
      <TextArea placeholder="Reply to comment..." />
      <Button>Submit Issue</Button>
    </div>
  );
};

export default NewIssue;
