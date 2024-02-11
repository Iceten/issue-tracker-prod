"use client";
import React, {useState} from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import { Button, Callout,TextField } from "@radix-ui/themes";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface IssueForm {
  title: "string";
  description: "string";
}

const NewIssuePage = () => {
  const [clientError, setClientError] = useState('')
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

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
      onSubmit={handleSubmit(async (data) => {
        try {
          await axios.post("/api/issues", data);
          router.push("/issues");  
        } catch (error) {
          setClientError('An unexpected error occured')
        }
        
      })}
    >
      <TextField.Root>
        <TextField.Input
          placeholder="Title"
          {...register("title")}
        ></TextField.Input>
      </TextField.Root>

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />

      <Button>Submit new Issue</Button>
    </form>

    </div>
      );
};

export default NewIssuePage;
