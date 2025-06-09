import type { Clinic, VaccineStock, AqiData, CommunityTip, Milestone, ImmunizationAlert } from './types';

export const mockClinics: Clinic[] = [
  {
    id: 'clinic1',
    name: 'Little Angels Pediatric Clinic',
    address: '123 Sunshine Avenue, Mumbai, Maharashtra',
    phone: '+91 22 1234 5678',
    waitTime: '10 min',
    services: ['General Checkup', 'Vaccinations', 'Emergency Care'],
  },
  {
    id: 'clinic2',
    name: 'Healthy Baby Wellness Center',
    address: '456 Rainbow Road, Delhi, NCR',
    phone: '+91 11 9876 5432',
    waitTime: '25 min',
    services: ['Vaccinations', 'Growth Monitoring', 'Nutrition Advice'],
  },
];

export const mockVaccineStock: VaccineStock[] = [
  { id: 'vac1', name: 'BCG', availability: 'In Stock', lastUpdated: new Date().toISOString() },
  { id: 'vac2', name: 'Polio (OPV)', availability: 'Low Stock', lastUpdated: new Date().toISOString() },
  { id: 'vac3', name: 'Hepatitis B', availability: 'In Stock', lastUpdated: new Date().toISOString() },
  { id: 'vac4', name: 'MMR', availability: 'Out of Stock', lastUpdated: new Date().toISOString() },
];

export const mockAqiData: AqiData[] = [
  {
    city: 'Mumbai',
    aqi: 75,
    level: 'Moderate',
    recommendation: 'Sensitive individuals should limit outdoor exertion.',
  },
  {
    city: 'Delhi',
    aqi: 155,
    level: 'Unhealthy',
    recommendation: 'Everyone may begin to experience health effects; sensitive groups may experience more serious health effects. Avoid prolonged outdoor exertion.',
  },
  {
    city: 'Bangalore',
    aqi: 45,
    level: 'Good',
    recommendation: 'Air quality is satisfactory, and air pollution poses little or no risk.',
  }
];

export const mockCommunityTips: CommunityTip[] = [
  {
    id: 'tip1',
    author: 'Aisha S.',
    avatarUrl: 'https://placehold.co/40x40.png',
    tipText: 'For mild colic, try gently bicycling your baby\'s legs. It helped my little one in Pune!',
    location: 'Pune',
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    symptoms: ['Colic', 'Gas'],
    ageRange: '0-6 months',
    categories: ['Health', 'Comfort'],
    isVerified: true,
  },
  {
    id: 'tip2',
    author: 'Rohan K.',
    avatarUrl: 'https://placehold.co/40x40.png',
    tipText: 'A lukewarm bath with a few drops of coconut oil can soothe dry skin. Common in Chennai during winter.',
    location: 'Chennai',
    timestamp: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
    symptoms: ['Dry Skin', 'Itching'],
    ageRange: 'All ages',
    categories: ['Skincare', 'Home Remedies'],
    isVerified: true,
  },
  {
    id: 'tip3',
    author: 'Priya M.',
    tipText: 'If your baby is teething, a chilled (not frozen) teething ring can provide relief. We used this in Hyderabad.',
    location: 'Hyderabad',
    timestamp: new Date(Date.now() - 3 * 86400000).toISOString(), // 3 days ago
    symptoms: ['Teething Pain', 'Irritability'],
    ageRange: '4-12 months',
    categories: ['Teething', 'Comfort'],
    isVerified: false,
  },
];

export const mockMilestones: Milestone[] = [
  { id: 'ms1', title: 'Social Smile', ageMonths: 2, description: 'Smiles spontaneously, especially at people.', achieved: true, dateAchieved: new Date(Date.now() - 30 * 86400000).toISOString() },
  { id: 'ms2', title: 'Rolls Over', ageMonths: 4, description: 'Rolls from tummy to back and back to tummy.', achieved: false },
  { id: 'ms3', title: 'Sits Without Support', ageMonths: 6, description: 'Sits independently for short periods.', achieved: false },
  { id: 'ms4', title: 'First Words', ageMonths: 12, description: 'Says "mama" or "dada" with meaning.', achieved: false },
];

export const mockImmunizationAlerts: ImmunizationAlert[] = [
  { id: 'im1', vaccineName: 'DTwP Booster 1', dueDate: new Date(Date.now() + 14 * 86400000).toISOString(), status: 'Upcoming', notes: 'Scheduled at City Clinic' },
  { id: 'im2', vaccineName: 'MMR Dose 2', dueDate: new Date(Date.now() - 5 * 86400000).toISOString(), status: 'Due', notes: 'Check local availability' },
  { id: 'im3', vaccineName: 'Varicella Dose 1', dueDate: new Date(Date.now() - 40 * 86400000).toISOString(), status: 'Overdue' },
];

export const mockFirstAidInstructions: { [key: string]: string[] } = {
  choking: [
    "If baby is coughing, encourage them to continue coughing.",
    "If baby cannot breathe, cough, or make sounds: For babies under 1 year, give 5 back blows followed by 5 chest thrusts.",
    "Repeat until the object is expelled or baby starts to breathe.",
    "Call emergency services immediately if baby becomes unresponsive."
  ],
  fever: [
    "Dress baby lightly.",
    "Give a lukewarm sponge bath.",
    "Ensure baby drinks plenty of fluids (breast milk or formula).",
    "Consult a doctor if fever is high or persists, or if baby is very young (under 3 months)."
  ],
  minor_burn: [
    "Immediately hold burned area under cool (not cold) running water for 10-15 minutes.",
    "Cover the burn with a sterile non-adhesive bandage or clean cloth.",
    "Do not apply ice, butter, or ointments to the burn.",
    "Seek medical attention for burns larger than a coin, or burns on face, hands, feet, or genitals."
  ]
};
