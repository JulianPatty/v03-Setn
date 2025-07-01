import { pgTable, serial, varchar, text, timestamp, boolean, integer, jsonb, uuid } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Example user table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: varchar('name', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Example workflows table for your workflow editor
export const workflows = pgTable('workflows', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  data: jsonb('data').notNull(), // Store workflow JSON data
  isPublished: boolean('is_published').default(false),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Example workflow runs table
export const workflowRuns = pgTable('workflow_runs', {
  id: uuid('id').defaultRandom().primaryKey(),
  workflowId: uuid('workflow_id').references(() => workflows.id).notNull(),
  status: varchar('status', { length: 50 }).notNull(), // 'pending', 'running', 'completed', 'failed'
  startedAt: timestamp('started_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
  error: text('error'),
  result: jsonb('result'),
});

// Add more tables as needed for your application