export function classifyEmail(
  subject: string,
  body: string
) {
  const text =
    `${subject} ${body}`.toLowerCase();

  const offerKeywords = [
    "offer",
    "congratulations",
    "selected",
    "offer letter",
    "welcome aboard",
  ];

  const interviewKeywords = [
    "interview",
    "assessment",
    "technical round",
    "coding round",
    "next round",
    "interview invitation",
  ];

  const rejectionKeywords = [
    "regret",
    "unfortunately",
    "not moving forward",
    "rejected",
    "not selected",
  ];

  if (
    offerKeywords.some((k) =>
      text.includes(k)
    )
  ) {
    return "Offer";
  }

  if (
    interviewKeywords.some((k) =>
      text.includes(k)
    )
  ) {
    return "Interview";
  }

  if (
    rejectionKeywords.some((k) =>
      text.includes(k)
    )
  ) {
    return "Rejected";
  }

  return null;
}