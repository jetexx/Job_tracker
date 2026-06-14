export function classifyEmail(
  subject: string,
  body: string
):
  | "Applied"
  | "Assessment"
  | "Interview"
  | "Offer"
  | "Rejected"
  | null {
  const text = `${subject} ${body}`.toLowerCase();

  const offerKeywords = [
    "offer",
    "offer letter",
    "job offer",
    "employment offer",
    "congratulations",
    "selected",
    "welcome aboard",
    "we are pleased to offer",
    "pleased to offer",
    "join our team",
    "offer package",
    "compensation package",
    "hired",
  ];

  const interviewKeywords = [
    "interview",
    "interview invitation",
    "technical interview",
    "behavioral interview",
    "virtual interview",
    "onsite interview",
    "final round",
    "manager round",
    "hr round",
    "recruiter call",
    "schedule an interview",
    "interview scheduled",
    "interview confirmation",
    "meeting invite",
    "zoom interview",
    "google meet",
    "microsoft teams",
    "next round",
  ];

  const assessmentKeywords = [
    "assessment",
    "online assessment",
    "coding assessment",
    "hackerrank",
    "codility",
    "codesignal",
    "testgorilla",
    "technical test",
    "skill assessment",
    "take-home assignment",
    "take home assignment",
    "evaluation",
    "coding challenge",
    "complete the test",
    "complete your assessment",
  ];

  const rejectionKeywords = [
    "unfortunately",
    "regret to inform",
    "regret",
    "not moving forward",
    "not selected",
    "rejected",
    "other candidates",
    "position has been filled",
    "we will not proceed",
    "unable to offer",
    "application was unsuccessful",
    "thank you for your interest",
    "decided to move forward with other candidates",
  ];

  const appliedKeywords = [
    "application received",
    "thank you for applying",
    "application submitted",
    "application confirmation",
    "we received your application",
    "your application has been received",
    "candidate profile created",
    "application under review",
    "reviewing your application",
    "thank you for your application",
  ];

  // Priority order matters

  if (
    offerKeywords.some((k) =>
      text.includes(k)
    )
  ) {
    return "Offer";
  }

  if (
    rejectionKeywords.some((k) =>
      text.includes(k)
    )
  ) {
    return "Rejected";
  }

  if (
    interviewKeywords.some((k) =>
      text.includes(k)
    )
  ) {
    return "Interview";
  }

  if (
    assessmentKeywords.some((k) =>
      text.includes(k)
    )
  ) {
    return "Assessment";
  }

  if (
    appliedKeywords.some((k) =>
      text.includes(k)
    )
  ) {
    return "Applied";
  }

  return null;
}