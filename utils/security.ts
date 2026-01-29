/**
 * Security utilities for input sanitization and validation
 */

/**
 * Sanitizes user input to prevent XSS attacks
 * Removes HTML tags and dangerous characters
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and >
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers like onclick=
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Validates and sanitizes email address
 */
export function sanitizeEmail(email: string): string {
  const sanitized = sanitizeInput(email);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(sanitized)) {
    throw new Error('Invalid email format');
  }
  
  return sanitized.toLowerCase();
}

/**
 * Validates and sanitizes phone number
 */
export function sanitizePhone(phone: string): string {
  if (!phone) return '';
  
  const sanitized = sanitizeInput(phone);
  const phoneRegex = /^[\d\s\-\(\)]+$/;
  const digitsOnly = sanitized.replace(/\D/g, '');
  
  if (!phoneRegex.test(sanitized) || digitsOnly.length < 10) {
    throw new Error('Invalid phone number format');
  }
  
  return sanitized;
}

/**
 * Validates and sanitizes name
 */
export function sanitizeName(name: string): string {
  const sanitized = sanitizeInput(name);
  
  if (sanitized.length < 1) {
    throw new Error('Name is required');
  }
  
  if (sanitized.length > 100) {
    throw new Error('Name is too long (max 100 characters)');
  }
  
  return sanitized;
}

/**
 * Validates and sanitizes text area (recipient field)
 */
export function sanitizeText(text: string, maxLength: number = 500): string {
  const sanitized = sanitizeInput(text);
  
  if (sanitized.length < 1) {
    throw new Error('This field is required');
  }
  
  if (sanitized.length > maxLength) {
    throw new Error(`Text is too long (max ${maxLength} characters)`);
  }
  
  return sanitized;
}

/**
 * Rate limiting helper - stores submission timestamps in localStorage
 */
export class RateLimiter {
  private key: string;
  private maxRequests: number;
  private windowMs: number;

  constructor(key: string, maxRequests: number = 3, windowMs: number = 60000) {
    this.key = `rate_limit_${key}`;
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  canSubmit(): boolean {
    try {
      const stored = localStorage.getItem(this.key);
      if (!stored) return true;

      const timestamps: number[] = JSON.parse(stored);
      const now = Date.now();
      const validTimestamps = timestamps.filter(ts => now - ts < this.windowMs);

      if (validTimestamps.length >= this.maxRequests) {
        return false;
      }

      return true;
    } catch {
      return true; // If localStorage fails, allow submission
    }
  }

  recordSubmission(): void {
    try {
      const stored = localStorage.getItem(this.key);
      const timestamps: number[] = stored ? JSON.parse(stored) : [];
      const now = Date.now();
      
      const validTimestamps = timestamps.filter(ts => now - ts < this.windowMs);
      validTimestamps.push(now);
      
      localStorage.setItem(this.key, JSON.stringify(validTimestamps));
    } catch {
      // Silently fail if localStorage is unavailable
    }
  }

  getTimeUntilNextSubmission(): number {
    try {
      const stored = localStorage.getItem(this.key);
      if (!stored) return 0;

      const timestamps: number[] = JSON.parse(stored);
      const now = Date.now();
      const validTimestamps = timestamps.filter(ts => now - ts < this.windowMs);

      if (validTimestamps.length >= this.maxRequests && validTimestamps.length > 0) {
        const oldestTimestamp = Math.min(...validTimestamps);
        return Math.max(0, this.windowMs - (now - oldestTimestamp));
      }

      return 0;
    } catch {
      return 0;
    }
  }
}
