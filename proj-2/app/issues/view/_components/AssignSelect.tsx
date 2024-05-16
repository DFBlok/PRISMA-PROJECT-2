"use client";
import React from "react";
import { Select } from "@radix-ui/themes";

const AssignSelect = () => {
  return (
    <div>
      <Select.Root>
        <Select.Trigger placeholder="Assign user...." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="1">Dev</Select.Item>
            <Select.Item value="2">Robert</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  );
};

export default AssignSelect;
