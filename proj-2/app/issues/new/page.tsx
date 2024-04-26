"use client";
import React, { useState } from "react";
import { TextField, Button, Callout, Text } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IssueFromSchema } from "@/app/ValidationSchema";
import ErrorMessage from "@/app/components/ErrorMessage";
/* interface IssueFormData {
  title: string;
  description: string;
} */
type IssueFormData = z.infer<typeof IssueFromSchema>;

const NewIssue = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueFromSchema),
  });
  const [error, setError] = useState("");
  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post("/api/issues/new", data);
      router.push("/issues/view");
    } catch (error) {
      setError("Unable to create issue, try again");
    }
  });
  return (
    <div className="max-w-lg space-y-4 mt-5">
      {error && (
        <Callout.Root color="orange">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="max-w-lg space-y-4 mt-5" onSubmit={onSubmit}>
        <TextField.Root placeholder="This is Title..." {...register("title")} />
        {<ErrorMessage>{errors.title?.message}</ErrorMessage>}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Reply to comment..." {...field} />
          )}
        />
        {<ErrorMessage>{errors.description?.message}</ErrorMessage>}
        <Button type="submit">Submit Issue</Button>
      </form>
    </div>
  );
};

export default NewIssue;
