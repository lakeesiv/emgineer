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
import { Card } from "components/ui/card";
import { Skeleton } from "components/ui/skeleton";
import AddToCal from "./add-to-cal";
import { ParsedEventsPageObjectResponse } from "app/get";
import { Badge } from "components/ui/badge";
import { useToast } from "components/ui/use-toast";

const formSchema = z.object({
  going: z.enum(["Yes", "No", "Maybe"]),
  extraDetails: z.string().optional().default(""),
});

interface RegisterFormProps extends ParsedEventsPageObjectResponse {}

const RegisterForm = ({
  parsed: {
    extraDetails,
    eventId,
    date,
    description,
    location,
    price,
    title,
    duration,
  },
}: RegisterFormProps) => {
  const eventSignUpForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { toast } = useToast();

  function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmitting(true);
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
    return (
      <Card className="mt-10 p-6">
        <div className="flex flex-col mb-6 space-y-4">
          <h1 className="text-4xl font-extrabold  text-emma-primary">
            Sign Up
          </h1>
        </div>
        <Skeleton className="h-96 w-full" />
      </Card>
    );
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

      toast({
        title: "Event Sign Up",
        description:
          "You have successfully updated your sign up for this event",
      });

      // wait for 1 second to allow toast to show
      setTimeout(() => {}, 2000);

      window.location.href = "/events";
    } catch (error) {
      console.log((error as { message: string }).message);
      toast({
        title: "Event Sign Up",
        description: "Something went wrong, please try again later",
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="mt-10 p-6">
      <div className="flex flex-col mb-6 space-y-4">
        <h1 className="text-4xl font-extrabold  text-emma-primary">Sign Up</h1>
        {price && (
          <div>
            <Badge>Requires Payment (£{price})</Badge>
          </div>
        )}
      </div>
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
                <FormDescription className="pb-2">
                  If you change your mind, you can always change it later by
                  going back to this page
                </FormDescription>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
                  <FormDescription className="pb-2">
                    {extraDetails}.
                  </FormDescription>
                  <FormControl>
                    <Textarea className="resize-y" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <div className="flex flex-row items-center space-x-2">
            <Button type="submit" disabled={submitting}>
              Submit
            </Button>
            <AddToCal
              start={date}
              duration={duration}
              name={title}
              description={description}
              location={location}
              size={5}
            />
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default RegisterForm;
