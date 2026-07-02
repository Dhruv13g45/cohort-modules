CREATE TYPE "priority" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
ALTER TABLE "todos" ADD COLUMN "priority" "priority" DEFAULT 'medium'::"priority" NOT NULL;--> statement-breakpoint
ALTER TABLE "todos" ADD COLUMN "completed" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "todos" ADD COLUMN "due_date" timestamp;