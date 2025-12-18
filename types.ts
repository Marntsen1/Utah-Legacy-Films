import { ReactNode } from 'react';

export interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
  className?: string;
}

export interface ValueCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  delay?: number;
}

export interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  image?: string;
}