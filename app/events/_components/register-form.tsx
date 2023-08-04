"use client";

import { Button } from "components/ui/button";
import React, { use, useEffect, useState } from "react";
import { api, RouterOutputs } from "trpc/client";
import Login from "./login-in";
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
import { Textarea } from "components/ui/textarea";

const formSchema = z.object({
  going: z.enum(["Yes", "No", "Maybe"]),
  extraDetails: z.string().optional(),
});

interface RegisterFormProps {
  eventId: string;
  extraDetails?: string;
}

const RegisterForm = ({ eventId, extraDetails }: RegisterFormProps) => {
  const eventSignUpForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    userSignUp({
      going: values.going,
      extraDetails: values.extraDetails,
    });
  }

  // #region Not Logged In Error Handling
  const [userSignUpStatus, setUserSignUpStatus] = useState<
    RouterOutputs["events"]["signUpStatus"] | undefined
  >(undefined);
  const [unauthorized, setUnauthorized] = useState<boolean>(false);

  useEffect(() => {
    async function getUserSignUpStatus() {
      try {
        const res = await api.events.signUpStatus.query({
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

  async function userSignUp({
    going,
    extraDetails,
  }: z.infer<typeof formSchema>) {
    try {
      await api.events.signUp.mutate({
        going: going,
        eventId: eventId,
        extraDetails: extraDetails,
      });
      // redirect to /events
      window.location.href = "/events";
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
        {extraDetails && (
          <FormField
            control={eventSignUpForm.control}
            name="extraDetails"
            defaultValue={userSignUpStatus.extraDetails}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Extra Details</FormLabel>
                <FormControl>
                  <Textarea className="resize-none" {...field} />
                </FormControl>
                <FormDescription>
                  {extraDetails}. Please enter them below
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
