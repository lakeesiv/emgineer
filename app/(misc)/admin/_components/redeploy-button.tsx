"use client";

import { Button } from "components/ui/button";
import { useToast } from "components/ui/use-toast";
import { FC, useState } from "react";
import { api } from "trpc/client";

interface RedeployButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const RedeployButton: FC<RedeployButtonProps> = ({ ...props }) => {
  const { toast } = useToast();
  const [disabled, setDisabled] = useState(false);

  return (
    <Button
      {...props}
      disabled={disabled}
      type="submit"
      onClick={async () => {
        try {
          setDisabled(
            (s) => true // disable button
          );
          await api.web.revalidate.query();
          toast({
            title: "Redeployed Website",
            description:
              "A deploy has been triggered. Please wait a few minutes for it to complete.",
            duration: 1000,
          });
          setDisabled(
            (s) => false // reset disabled
          );
        } catch (error: unknown) {
          const e = error as Error;
          toast({
            title: "Error",
            description: "Something went wrong: " + e.message,
            variant: "destructive",
          });
        }
      }}
    >
      Redeploy Website
    </Button>
  );
};

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";

export function RedeployDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Redeploy Website</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-red-800">
        <DialogHeader>
          <DialogTitle>Redeploy Website</DialogTitle>
          <DialogDescription>
            This will update the website by redeploying it. Do not do this
            often, please also wait a few minutes before doing this again.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <RedeployButton className="my-2" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RedeployButton;
