"use client";
import React, { useState } from "react";
import { TextField, Button, Callout, Text } from "@radix-ui/themes"; /* 
import SimpleMDE from "react-simplemde-editor"; */
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IssueFromSchema } from "@/app/ValidationSchema";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import dynamic from "next/dynamic";
import { Issue } from "@prisma/client";
/* interface IssueFormData {
  title: string;
  description: string;
} */
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
type IssueFormData = z.infer<typeof IssueFromSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
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
  const [isSubmitting, setSubmitting] = useState(false);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/issues/new", data);
      router.push("/issues/view");
    } catch (error) {
      setSubmitting(false);
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
        <TextField.Root
          defaultValue={issue?.title}
          placeholder="This is Title..."
          {...register("title")}
        />
        {<ErrorMessage>{errors.title?.message}</ErrorMessage>}
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Reply to comment..." {...field} />
          )}
        />
        {<ErrorMessage>{errors.description?.message}</ErrorMessage>}
        <Button type="submit" disabled={isSubmitting}>
          Submit Issue{isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
