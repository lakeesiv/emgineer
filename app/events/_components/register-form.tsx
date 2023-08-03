"use client";

import { Button } from "components/ui/button";
import React, { use, useEffect, useState } from "react";
import { api, RouterOutputs } from "trpc/client";
import Login from "./login-in";
import { ErrorBoundary } from "react-error-boundary";
import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select";

const formSchema = z.object({
  going: z.enum(["Yes", "No", "Maybe"]),
  extraDetails: z.string().optional(),
});

interface RegisterFormProps {
  eventId: string;
  extraDetails?: string;
}

const RegisterForm = ({ eventId }: RegisterFormProps) => {
  const eventSignUpForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  // #region Not Logged In Error Handling
  const [userSignUpStatus, setUserSignUpStatus] = useState<
    RouterOutputs["events"]["userSignUpStatus"] | undefined
  >(undefined);
  const [unauthorized, setUnauthorized] = useState<boolean>(false);

  useEffect(() => {
    async function getUserSignUpStatus() {
      try {
        const res = await api.events.userSignUpStatus.query({
          eventId: eventId,
        });
        setUserSignUpStatus(res);
      } catch (error) {
        if ((error as { message: string }).message === "UNAUTHORIZED") {
          setUnauthorized(true);
        }
      }
    }
    getUserSignUpStatus();
  }, [eventId]);

  if (unauthorized && !userSignUpStatus) {
    return <Login />;
  }

  if (!userSignUpStatus && !unauthorized) {
    return <div>Loading...</div>;
  }

  if (!userSignUpStatus) {
    return <div>Uh oh: contact Webmaster</div>;
  }
  // #endregion

  async function userSignUp() {
    try {
      const res = await api.events.signUp.mutate({
        status: "Yes",
        eventId: eventId,
        extraDetails: undefined,
      });
      window.location.reload();
    } catch (error) {
      console.log((error as { message: string }).message);
    }
  }

  return (
    <Form {...eventSignUpForm}>
      <form
        onSubmit={eventSignUpForm.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <FormField
          control={eventSignUpForm.control}
          defaultValue={userSignUpStatus.going}
          name="going"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Are you going to event?</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      defaultValue={userSignUpStatus.going}
                      placeholder={userSignUpStatus.going}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="Maybe">Maybe</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                If you change your mind, you can always change it later by going
                back to thi page
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

const WithErrorBoundary = (props: RegisterFormProps) => {
  return (
    <ErrorBoundary fallback={<div>Oh no</div>}>
      <RegisterForm {...props} />
    </ErrorBoundary>
  );
};

export default WithErrorBoundary;
