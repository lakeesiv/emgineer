DO $$ BEGIN
 CREATE TYPE "going" AS ENUM('No', 'Maybe', 'Yes');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
