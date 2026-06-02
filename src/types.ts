/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Program {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  includes: string[];
  ctaText: string;
  badge?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  result: string;
  quote: string;
  metricLabel: string;
  metricValue: string;
}

export interface BookingDetails {
  date: string;
  time: string;
  name: string;
  email: string;
  companyName: string;
  revenue: string;
  bottleneck: string;
}

export interface AssessmentResult {
  scalePotentialScore: number; // 0 - 100
  burnoutRiskScore: number;    // 0 - 100
  growthMultiplier: number;    // e.g. 2.4
  annualGain: number;          // dollar amount
  recommendedProgramId: string;
  insights: string[];
}
