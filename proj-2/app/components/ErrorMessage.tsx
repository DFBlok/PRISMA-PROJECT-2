import React, { PropsWithChildren } from "react";
import { Text } from "@radix-ui/themes";
const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <div>
      <Text as="p" color="red" my="4">
        {children}
      </Text>
    </div>
  );
};

export default ErrorMessage;
