import { config } from 'dotenv';
config();

import '@/ai/flows/voice-triage.ts';
import '@/ai/flows/rash-analysis.ts';
import '@/ai/flows/community-tip-categorization.ts';