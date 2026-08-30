import { User } from '../types';

export const generateReport = async (
  originalImage: string,
  processedImage: string,
  user: User
): Promise<void> => {
  // Use jsPDF from window object (loaded via CDN)
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  // --- Branding & Header ---
  doc.setFillColor(15, 23, 42); // Slate-950
  doc.rect(0, 0, pageWidth, 45, 'F');
  
  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(26);
  doc.setFont('helvetica', 'bold');
  doc.text('FORENSIC TRACE REPORT', margin, 22);
  
  // Subtitle
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(148, 163, 184); // Slate-400
  doc.text('AUTOMATED BIOMETRIC ANALYSIS SYSTEM', margin, 32);

  // Right-aligned Case Number in Header
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  const caseId = `CASE-${Math.floor(Math.random() * 1000000)}`;
  doc.text(caseId, pageWidth - margin - 35, 22);
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text('CONFIDENTIAL', pageWidth - margin - 25, 32);

  // --- Metadata Section ---
  const metaY = 60;
  doc.setTextColor(30, 41, 59); // Slate-800
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('EXAMINATION DETAILS', margin, metaY);
  
  doc.setDrawColor(203, 213, 225); // Slate-300
  doc.line(margin, metaY + 3, pageWidth - margin, metaY + 3);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  // Column 1
  doc.text(`Analyst:`, margin, metaY + 12);
  doc.setFont('helvetica', 'bold');
  doc.text(user.name, margin + 25, metaY + 12);
  
  doc.setFont('helvetica', 'normal');
  doc.text(`Date:`, margin, metaY + 18);
  doc.text(new Date().toLocaleDateString(), margin + 25, metaY + 18);

  doc.text(`Time:`, margin, metaY + 24);
  doc.text(new Date().toLocaleTimeString(), margin + 25, metaY + 24);

  // Column 2
  const col2X = pageWidth / 2;
  doc.text(`Unit ID:`, col2X, metaY + 12);
  doc.text('FT-LAB-01', col2X + 25, metaY + 12);

  doc.text(`Algorithm:`, col2X, metaY + 18);
  doc.text('Adaptive Thresholding v2.1', col2X + 25, metaY + 18);

  doc.text(`Security:`, col2X, metaY + 24);
  doc.text('Encrypted / Local', col2X + 25, metaY + 24);

  // --- Evidence Section ---
  const imgY = 100;
  const imgGap = 10;
  const availableWidth = pageWidth - (margin * 2) - imgGap;
  const imgWidth = availableWidth / 2;
  const imgHeight = 90; // Fixed height box

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(71, 85, 105);
  doc.text('EVIDENCE A: ORIGINAL SPECIMEN', margin, imgY - 5);
  doc.text('EVIDENCE B: PROCESSED TRACE', margin + imgWidth + imgGap, imgY - 5);

  // Draw placeholder boxes
  doc.setDrawColor(226, 232, 240);
  doc.setFillColor(248, 250, 252);
  doc.rect(margin, imgY, imgWidth, imgHeight, 'FD');
  doc.rect(margin + imgWidth + imgGap, imgY, imgWidth, imgHeight, 'FD');

  try {
    // We assume the images are data URLs
    // Fit image inside box maintaining aspect ratio is complex in pure jsPDF without calculation
    // We will just stretch to fit box for this demo, or use 'contain' logic if available.
    // jsPDF addImage arguments: data, format, x, y, w, h
    doc.addImage(originalImage, 'JPEG', margin + 2, imgY + 2, imgWidth - 4, imgHeight - 4, undefined, 'FAST');
    doc.addImage(processedImage, 'PNG', margin + imgWidth + imgGap + 2, imgY + 2, imgWidth - 4, imgHeight - 4, undefined, 'FAST');
  } catch (e) {
    console.error("Error adding images to PDF", e);
    doc.setTextColor(255, 0, 0);
    doc.text("Error rendering image evidence.", margin + 5, imgY + 20);
  }

  // --- Footer ---
  const bottomY = pageHeight - 30;
  doc.setDrawColor(30, 41, 59);
  doc.setLineWidth(0.5);
  doc.line(margin, bottomY, pageWidth - margin, bottomY);

  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('ForensicTrace Generated Report', margin, bottomY + 8);
  doc.text(`Ref: ${Math.random().toString(36).substring(2, 15)}`, pageWidth - margin - 40, bottomY + 8);

  doc.setFontSize(7);
  doc.setTextColor(150, 150, 150);
  const disclaimer = 'This document is computer-generated and is valid without a signature. It contains sensitive biometric data intended solely for forensic analysis purposes.';
  const splitText = doc.splitTextToSize(disclaimer, contentWidth);
  doc.text(splitText, margin, bottomY + 16);

  // Save
  const fileName = `ForensicTrace_${caseId}_${Date.now()}.pdf`;
  doc.save(fileName);
};