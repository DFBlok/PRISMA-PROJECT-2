"use client";
import React, { useState, useEffect } from "react";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { Value } from "@radix-ui/themes/src/components/data-list.jsx";
import { User, Issue } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import toast, { Toaster } from "react-hot-toast";
const AssignSelect = ({ issue }: { issue: Issue }) => {
  const {
    error,
    isLoading,
    data: users,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, // 60 sec
    retry: 3,
  });

  if (isLoading) return <Skeleton />;

  const assignIssue = async (userId: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId === "unassigned" ? null : userId,
      });
      toast.success("Updated successfully");
    } catch (error) {
      toast.error("Change could not save");
    }
  };

  return (
    <div>
      <Select.Root
        onValueChange={assignIssue}
        defaultValue={issue.assignedToUserId || "unassigned"}
      >
        <Select.Trigger placeholder="Assign user...." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassign</Select.Item>
            <Select.Item value="1">Dev</Select.Item>
            {users &&
              users.map((user) => (
                <Select.Item key={user.id} value={user.id}>
                  {user.name}
                </Select.Item>
              ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </div>
  );
};

export default AssignSelect;
