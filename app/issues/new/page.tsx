"use client";
import React, {useState} from "react";
import { useForm, Controller } from "react-hook-form";
import {zodResolver} from '@hookform/resolvers/zod';
import axios from "axios";
import { z } from 'zod';
import { useRouter } from "next/navigation";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import { Button, Callout,TextField } from "@radix-ui/themes";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { createIssueSchema } from "@/app/validationSchemas";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from './../../components/Spinner';


type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const [clientError, setClientError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter();
  const { register, control, handleSubmit, formState: {errors} } = useForm<IssueForm>({resolver: zodResolver(createIssueSchema)});

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)
      await axios.post("/api/issues", data);
      router.push("/issues");  

    } catch (error) {
      setClientError('An unexpected error occured')
      setIsSubmitting(false)
    }
  })

  return (
    <div className="max-w-xl space-y-3">
      { clientError && <Callout.Root>
        <Callout.Icon >
          <ExclamationTriangleIcon color='tomato'/>
        </Callout.Icon>
        <Callout.Text>{clientError}</Callout.Text>
      </Callout.Root>}
      
      <form
      className="space-y-3"
      {...register}
      onSubmit={onSubmit}
    >
      <TextField.Root>
        <TextField.Input
          placeholder="Title"
          {...register("title")}
        ></TextField.Input>
      </TextField.Root>
      {<ErrorMessage>{errors.title?.message}</ErrorMessage>}

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      {<ErrorMessage>{errors.description?.message}</ErrorMessage>}

      <Button disabled={isSubmitting}>Submit new Issue {isSubmitting && <Spinner/>}</Button>
    </form>

    </div>
      );
};

export default NewIssuePage;
