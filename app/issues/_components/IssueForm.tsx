"use client";
import { zodResolver } from '@hookform/resolvers/zod';
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from 'zod';

import { issueSchema } from "@/app/validationSchemas";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Button, Callout, TextField } from "@radix-ui/themes";

import { ErrorMessage, Spinner } from '@/app/components';
import { Issue } from '@prisma/client';
import SimpleMDE from 'react-simplemde-editor'

type IssueFormData = z.infer<typeof issueSchema>

interface Props{
    issue?: Issue
}

const IssueForm = ({issue}: Props) => {
  const [clientError, setClientError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter();
  const { register, control, handleSubmit, formState: {errors} } = useForm<IssueFormData>({resolver: zodResolver(issueSchema)});

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true)
      if(issue)
        await axios.patch('/api/issues/'+issue.id,data)
      else
        await axios.post("/api/issues", data);
      router.push("/issues/list"); 
      router.refresh() 

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
          defaultValue={issue?.title}
          {...register("title")}
        ></TextField.Input>
      </TextField.Root>
      {<ErrorMessage>{errors.title?.message}</ErrorMessage>}

      <Controller
        name="description"
        defaultValue={issue?.description}
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      {<ErrorMessage>{errors.description?.message}</ErrorMessage>}

      <Button disabled={isSubmitting}> {issue? 'Update issue' : 'Submit new Issue'} {' '} {isSubmitting && <Spinner/>}</Button>
    </form>

    </div>
      );
};

export default IssueForm;
