CREATE TABLE "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"display_date" date NOT NULL,
	CONSTRAINT "messages_display_date_unique" UNIQUE("display_date")
);
