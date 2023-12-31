"use client";
import { Button } from "components/ui/button";
import { useToast } from "components/ui/use-toast";
import { FC, useState } from "react";
import { api } from "trpc/client";

interface RevalidateButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const RevalidateButton: FC<RevalidateButtonProps> = ({ ...props }) => {
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
            title: "Synced with Notion",
            description: "The website has been synced with Notion",
            duration: 1000,
          });
          setDisabled(
            (s) => false // reset disabled
          );
        } catch (error) {
          toast({
            title: "Error",
            description: "Something went wrong",
            variant: "destructive",
          });
        }
      }}
    >
      Sync With Notion
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

export function RevalidateDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Sync With Notion</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sync With Notion</DialogTitle>
          <DialogDescription>
            This will update the website with the latest data from Notion
            however it will not update any images, for that you will need to
            redeploy the website. Note: It should immediately update the
            website, no need to wait a few minutes.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <RevalidateButton className="my-2" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default RevalidateButton;
