"use client";
import React, { useState, useEffect } from "react";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import { Value } from "@radix-ui/themes/src/components/data-list.jsx";
import { User } from "@prisma/client";
const AssignSelect = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      let { data } = await axios.get("/api/users");
      setUsers(data);
    };
    fetchUser();
  }, []);

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
