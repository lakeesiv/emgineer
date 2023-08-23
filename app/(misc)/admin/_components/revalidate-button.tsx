"use client";
import { FC } from "react";
import { api } from "trpc/client";
import { useToast } from "components/ui/use-toast";
import { Button } from "components/ui/button";
import { useState } from "react";

interface RevalidateButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const RevalidateButton: FC<RevalidateButtonProps> = ({ ...props }) => {
  const { toast } = useToast();
  const [disabled, setDisabled] = useState(false);

  return (
    <Button
      {...props}
      disabled={disabled}
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

export default RevalidateButton;
