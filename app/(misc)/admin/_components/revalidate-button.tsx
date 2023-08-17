"use client";
import { FC } from "react";
import { api } from "trpc/client";
import { useToast } from "components/ui/use-toast";
import { Button } from "components/ui/button";

interface RevalidateButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const RevalidateButton: FC<RevalidateButtonProps> = ({ ...props }) => {
  const { toast } = useToast();
  return (
    <Button
      {...props}
      onClick={async () => {
        try {
          await api.web.revalidate.query();
          toast({
            title: "Synced with Notion",
            description: "The website has been synced with Notion",
          });
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
