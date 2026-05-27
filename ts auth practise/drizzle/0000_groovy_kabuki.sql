CREATE TABLE "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(500) NOT NULL,
	"content" text,
	"completed" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"event_date" date
);
