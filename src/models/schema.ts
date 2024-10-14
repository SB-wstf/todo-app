import { relations, sql } from "drizzle-orm";
import { boolean, integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

// Users table
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    firstName: varchar("first_name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").default(sql`NOW()`),
    updatedAt: timestamp("updated_at").default(sql`NOW()`),
});

// Todos table
export const todos = pgTable("todos", {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
        .references(() => users.id)
        .notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    description: varchar("description", { length: 1024 }),
    taskTypeId: integer("task_type_id").references(() => taskTypes.id),
    isPinned: boolean("is_pinned").default(false),
    isCompleted: boolean("is_completed").default(false),
    createdAt: timestamp("created_at").default(sql`NOW()`),
    updatedAt: timestamp("updated_at").default(sql`NOW()`),
});

// TaskTypes table
export const taskTypes = pgTable("task_types", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    imageUrl: varchar("image_url", { length: 255 }),
});

// Documents table
export const documents = pgTable("documents", {
    id: serial("id").primaryKey(),
    fileName: varchar("file_name", { length: 255 }).notNull(),
    fileUrl: varchar("file_url", { length: 1024 }).notNull(),
    createdAt: timestamp("created_at").default(sql`NOW()`),
    updatedAt: timestamp("updated_at").default(sql`NOW()`),
});

// Join table for many-to-many relationship between todos and documents
export const todoDocuments = pgTable("todo_documents", {
    id: serial("id").primaryKey(),
    todoId: integer("todo_id")
        .references(() => todos.id)
        .notNull(),
    documentId: integer("document_id")
        .references(() => documents.id)
        .notNull(),
    createdAt: timestamp("created_at").default(sql`NOW()`),
    updatedAt: timestamp("updated_at").default(sql`NOW()`),
});

// Relations for users
export const usersRelations = relations(users, ({ many }) => ({
    todos: many(todos), // A user can have many todos
}));

// Relations for taskTypes
export const taskTypesRelations = relations(taskTypes, ({ many }) => ({
    todos: many(todos), // A task type can have many todos
}));

// Relations for todos
export const todosRelations = relations(todos, ({ one, many }) => ({
    user: one(users, {
        fields: [todos.userId],
        references: [users.id],
    }),
    taskType: one(taskTypes, {
        fields: [todos.taskTypeId],
        references: [taskTypes.id],
    }),
    documents: many(todoDocuments), // A todo can be associated with many documents via todoDocuments
}));

// Relations for documents
export const documentsRelations = relations(documents, ({ many }) => ({
    todos: many(todoDocuments), // A document can be associated with many todos via todoDocuments
}));

// Relations for the todoDocuments join table
export const todoDocumentsRelations = relations(todoDocuments, ({ one }) => ({
    todo: one(todos, {
        fields: [todoDocuments.todoId],
        references: [todos.id],
    }),
    document: one(documents, {
        fields: [todoDocuments.documentId],
        references: [documents.id],
    }),
}));
