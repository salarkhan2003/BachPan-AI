# **App Name**: PulseCare AI

## Core Features:

- Voice Triage: AI-powered symptom triage with voice input and responses using Vosk for offline and GPT-4 API for online modes; LLM is used as a tool to incorporate the available data and recommend best practices and advices based on data.
- Rash Scanner: Image-based rash analysis using MobileNet (offline) to identify and assess skin conditions; the VLMs serves as a tool to inform the decisions and deliver a list of next steps to the user
- Connectivity Detection: Hybrid mode with automatic switching between offline and online functionalities based on network connectivity.
- Emergency Protocol: Emergency SMS trigger to alert contacts and display nearby clinic data in offline mode when user speaks "help".
- Real-Time Updates: Display real-time data for vaccine stock availability, clinic wait times, and local AQI.
- Community Tips: Community Micro-Tip Feed with culturally relevant remedies approved by pediatricians.
- Health Alerts: Milestone tracking and geofenced immunization alerts using government health data.

## Style Guidelines:

- Primary color: Soft blue (#A7D1FF) to evoke a sense of trust and serenity, aligning with healthcare themes.
- Background color: Very light blue (#F0F8FF), providing a clean and calming backdrop for the UI.
- Accent color: Pale violet (#D0BFFF), used sparingly for interactive elements and to draw attention without overwhelming the user.
- Headline font: 'Space Grotesk' (sans-serif) for headlines and short amounts of body text; body text font: 'Inter' (sans-serif)
- Code font: 'Source Code Pro' for displaying API responses or code snippets.
- Use clear and intuitive icons that are easily recognizable and universally understood, consistent with healthcare applications.
- Clean and intuitive layout with a focus on accessibility and ease of use, especially in offline mode where the interface must be self-explanatory.