"use client";
import React, { useState, useEffect } from "react";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { Value } from "@radix-ui/themes/src/components/data-list.jsx";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
const AssignSelect = () => {
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

  return (
    <div>
      <Select.Root>
        <Select.Trigger placeholder="Assign user...." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
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
    </div>
  );
};

export default AssignSelect;
