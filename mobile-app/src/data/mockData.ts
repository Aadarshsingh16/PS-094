export interface CaseItem {
  id: string;
  name: string;
  category: string;
  stage: string;
  risk: 'Critical' | 'High' | 'Medium' | 'Low';
  score: number;
  scoreChange: string;
  lastCheckin: string;
  sla: string;
  avatarColor: string;
  assignedCounsellor: string;
}

export interface CheckinQuestion {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  icon: string;
  estimatedTime: string;
  options: string[];
}

export const MOCK_QUESTIONS: CheckinQuestion[] = [
  {
    id: 1,
    category: "SAFETY",
    title: "Do you feel safe where you are staying right now?",
    subtitle: "There are no right or wrong answers. You can skip any question.",
    icon: "shield",
    estimatedTime: "~3 min left",
    options: [
      "Yes, completely safe",
      "Mostly safe",
      "A little anxious or unsure",
      "I feel unsafe right now",
      "I would rather not answer"
    ]
  },
  {
    id: 2,
    category: "MOOD",
    title: "How has your mood been feeling over today?",
    subtitle: "Your answers help your counsellor understand your day.",
    icon: "smile",
    estimatedTime: "~2.5 min left",
    options: [
      "Calm and relaxed",
      "Generally okay",
      "Tense or unsettled",
      "Overwhelmed or low",
      "I would rather not answer"
    ]
  },
  {
    id: 3,
    category: "SLEEP",
    title: "How well did you sleep last night?",
    subtitle: "There are no right or wrong answers. You can skip any question.",
    icon: "moon",
    estimatedTime: "~2 min left",
    options: [
      "Very well",
      "Fairly well",
      "Not very well",
      "Poorly",
      "I could not sleep"
    ]
  },
  {
    id: 4,
    category: "FEAR",
    title: "Have you felt afraid or worried about upcoming events?",
    subtitle: "Take your time. You are in a safe place.",
    icon: "alert-triangle",
    estimatedTime: "~1.5 min left",
    options: [
      "Not at all",
      "A little bit worried",
      "Frequently on edge",
      "Constantly afraid of what might happen",
      "I would rather not answer"
    ]
  },
  {
    id: 5,
    category: "SUPPORT",
    title: "Do you feel supported by the people around you?",
    subtitle: "This stays completely confidential.",
    icon: "heart",
    estimatedTime: "~1 min left",
    options: [
      "Yes, have good support",
      "Somewhat supported",
      "Feeling quite isolated",
      "Completely on my own",
      "I would rather not answer"
    ]
  },
  {
    id: 6,
    category: "ENGAGEMENT",
    title: "Have you been able to do your daily meals and routines?",
    subtitle: "Every small step counts.",
    icon: "activity",
    estimatedTime: "~45s left",
    options: [
      "Yes, managing normally",
      "Managing with some effort",
      "Skipped meals or struggling to get up",
      "Could not do anything today",
      "I would rather not answer"
    ]
  },
  {
    id: 7,
    category: "PHYSICAL",
    title: "How is your physical body feeling (headache, heartbeat, fatigue)?",
    subtitle: "Physical symptoms often reflect emotional stress.",
    icon: "zap",
    estimatedTime: "~30s left",
    options: [
      "Feeling physically fine",
      "Slight fatigue or restlessness",
      "Heavy fatigue, racing heartbeat, or headache",
      "Severe physical pain or distress",
      "I would rather not answer"
    ]
  },
  {
    id: 8,
    category: "THOUGHTS",
    title: "Is there anything specific you would like your counsellor to know?",
    subtitle: "Final question · you did wonderfully today.",
    icon: "message-circle",
    estimatedTime: "~10s left",
    options: [
      "Everything is okay for now",
      "I want to ask about my next court date",
      "I need help with safety / discreet transport",
      "Please call me today between 4–6 pm",
      "I would rather not answer"
    ]
  }
];

export const MOCK_PRIORITY_CASES: CaseItem[] = [
  {
    id: "#USR-7844",
    name: "Asha (Threatened Witness)",
    category: "Threatened Witness",
    stage: "Hearing postponed",
    risk: "Critical",
    score: 72,
    scoreChange: "+18 in 14d",
    lastCheckin: "2h ago",
    sla: "00:42",
    avatarColor: "bg-emerald-100 text-emerald-800",
    assignedCounsellor: "Priya Sharma"
  },
  {
    id: "#USR-5120",
    name: "Meera K.",
    category: "Sexual Violence",
    stage: "Investigation ongoing",
    risk: "High",
    score: 66,
    scoreChange: "+12 in 14d",
    lastCheckin: "2h ago",
    sla: "01:58",
    avatarColor: "bg-emerald-100 text-emerald-800",
    assignedCounsellor: "Priya Sharma"
  },
  {
    id: "#USR-3391",
    name: "Rajesh S.",
    category: "Caste-based Violence",
    stage: "Relief disbursement pending",
    risk: "Medium",
    score: 51,
    scoreChange: "+4 in 14d",
    lastCheckin: "2h ago",
    sla: "03:20",
    avatarColor: "bg-emerald-100 text-emerald-800",
    assignedCounsellor: "Priya Sharma"
  }
];

export const MOCK_TREND_DATA = [
  { week: "W1", score: 28 },
  { week: "W2", score: 32 },
  { week: "W3", score: 35 },
  { week: "W4", score: 42 },
  { week: "W5", score: 48 },
  { week: "W6", score: 55 },
  { week: "W7", score: 64 },
  { week: "W8", score: 72 }
];
