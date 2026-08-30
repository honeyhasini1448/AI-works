export interface User {
  id: string;
  name: string;
  email: string;
}

export enum AppView {
  LANDING = 'LANDING',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  DASHBOARD = 'DASHBOARD',
}

export enum ProcessingStatus {
  IDLE = 'IDLE',
  PROCESSING = 'PROCESSING',
  COMPLETE = 'COMPLETE',
  ERROR = 'ERROR',
}

export interface ProcessingResult {
  originalUrl: string;
  processedUrl: string;
  timestamp: number;
}

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

// Global definition for jsPDF loaded via CDN
declare global {
  interface Window {
    jspdf: {
      jsPDF: any;
    };
  }
}