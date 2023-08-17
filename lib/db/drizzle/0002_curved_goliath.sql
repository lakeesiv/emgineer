ALTER TABLE "eventSignUp" ALTER COLUMN "updatedAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "eventSignUp" ALTER COLUMN "updatedAt" SET NOT NULL;