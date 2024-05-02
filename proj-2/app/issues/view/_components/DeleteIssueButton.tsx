"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner";
const DeleteIssueButton = ({ issueId }: { issueId: string }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  return (
    <div>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
            Delete Issue{isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Are you sure ?</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Once you delete you can not reverse the action.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                variant="solid"
                color="red"
                onClick={async () => {
                  try {
                    setDeleting(true);
                    await axios.delete(`/api/issues/${issueId}`);

                    router.push("/issues/view");
                    router.refresh();
                  } catch (error) {
                    setError(true);
                  }
                }}
              >
                Continue with Deletion
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            Something went wrong, please try again
          </AlertDialog.Description>
          <AlertDialog.Action>
            <Button color="red" onClick={() => setError(false)} mt="4">
              OK
            </Button>
          </AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
};

export default DeleteIssueButton;
