import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// Database file path
const dbPath = path.join(process.cwd(), "data", "metalcraft.db");
const dbDir = path.dirname(dbPath);

// Ensure data directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Initialize database connection
let db: Database.Database | null = null;

function getDatabase(): Database.Database {
  if (!db) {
    db = new Database(dbPath);
    db.pragma("journal_mode = WAL"); // Better concurrency
    initializeDatabase(db);
  }
  return db;
}

function initializeDatabase(database: Database.Database) {
  // Contact submissions table
  database.exec(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      project_type TEXT,
      budget INTEGER,
      preferred_contact TEXT,
      appointment_date TEXT,
      message TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Quote submissions table
  database.exec(`
    CREATE TABLE IF NOT EXISTS quote_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      phone TEXT,
      project_type TEXT NOT NULL,
      material TEXT NOT NULL,
      length REAL NOT NULL,
      width REAL NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      estimated_price REAL NOT NULL,
      price_min REAL,
      price_max REAL,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Admin credentials table
  database.exec(`
    CREATE TABLE IF NOT EXISTS admin_credentials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE DEFAULT 'admin',
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create indexes for better query performance
  database.exec(`
    CREATE INDEX IF NOT EXISTS idx_contact_email ON contact_submissions(email);
    CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at);
    CREATE INDEX IF NOT EXISTS idx_quote_email ON quote_submissions(email);
    CREATE INDEX IF NOT EXISTS idx_quote_created ON quote_submissions(created_at);
  `);
}

export interface ContactSubmission {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  projectType?: string;
  budget?: number;
  preferredContact?: string;
  appointmentDate?: string;
  message: string;
  createdAt?: string;
}

export interface QuoteSubmission {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  projectType: string;
  material: string;
  length: number;
  width: number;
  quantity: number;
  estimatedPrice: number;
  priceMin?: number;
  priceMax?: number;
  notes?: string;
  createdAt?: string;
}

export function saveContactSubmission(data: Omit<ContactSubmission, "id" | "createdAt">): number {
  const database = getDatabase();
  const stmt = database.prepare(`
    INSERT INTO contact_submissions 
    (name, email, phone, project_type, budget, preferred_contact, appointment_date, message)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    data.name,
    data.email,
    data.phone || null,
    data.projectType || null,
    data.budget || null,
    data.preferredContact || null,
    data.appointmentDate || null,
    data.message
  );

  return result.lastInsertRowid as number;
}

export function saveQuoteSubmission(data: Omit<QuoteSubmission, "id" | "createdAt">): number {
  const database = getDatabase();
  const stmt = database.prepare(`
    INSERT INTO quote_submissions 
    (name, email, phone, project_type, material, length, width, quantity, estimated_price, price_min, price_max, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    data.name || null,
    data.email || null,
    data.phone || null,
    data.projectType,
    data.material,
    data.length,
    data.width,
    data.quantity,
    data.estimatedPrice,
    data.priceMin || null,
    data.priceMax || null,
    data.notes || null
  );

  return result.lastInsertRowid as number;
}

export function getContactSubmissions(limit: number = 100): ContactSubmission[] {
  const database = getDatabase();
  const stmt = database.prepare(`
    SELECT 
      id,
      name,
      email,
      phone,
      project_type as projectType,
      budget,
      preferred_contact as preferredContact,
      appointment_date as appointmentDate,
      message,
      created_at as createdAt
    FROM contact_submissions
    ORDER BY created_at DESC
    LIMIT ?
  `);

  return stmt.all(limit) as ContactSubmission[];
}

export function getQuoteSubmissions(limit: number = 100): QuoteSubmission[] {
  const database = getDatabase();
  const stmt = database.prepare(`
    SELECT 
      id,
      name,
      email,
      phone,
      project_type as projectType,
      material,
      length,
      width,
      quantity,
      estimated_price as estimatedPrice,
      price_min as priceMin,
      price_max as priceMax,
      notes,
      created_at as createdAt
    FROM quote_submissions
    ORDER BY created_at DESC
    LIMIT ?
  `);

  return stmt.all(limit) as QuoteSubmission[];
}

// Admin authentication functions
export function getAdminPasswordHash(): string | null {
  const database = getDatabase();
  const stmt = database.prepare("SELECT password_hash FROM admin_credentials WHERE username = 'admin' LIMIT 1");
  const result = stmt.get() as { password_hash: string } | undefined;
  return result?.password_hash || null;
}

export function setAdminPasswordHash(passwordHash: string): void {
  const database = getDatabase();
  const stmt = database.prepare(`
    INSERT INTO admin_credentials (username, password_hash)
    VALUES ('admin', ?)
    ON CONFLICT(username) DO UPDATE SET
      password_hash = ?,
      updated_at = CURRENT_TIMESTAMP
  `);
  stmt.run(passwordHash, passwordHash);
}

// Close database connection (useful for cleanup)
export function closeDatabase() {
  if (db) {
    db.close();
    db = null;
  }
}

