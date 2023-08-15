CREATE TABLE IF NOT EXISTS "eventSignUp" (
	"id" text PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"eventId" text NOT NULL,
	"event" text NOT NULL,
	"going" "going" NOT NULL,
	"extraDetails" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP(3) on update CURRENT_TIMESTAMP(3)
);
