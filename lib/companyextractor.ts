export function extractCompany(
  subject: string,
  from: string
) {
  const text = `${subject} ${from}`.toLowerCase();

  const companies = [
    "google",
    "microsoft",
    "amazon",
    "openai",
    "meta",
    "netflix",
    "uber",
    "adobe",
    "atlassian",
  ];

  const found = companies.find((company) =>
    text.includes(company.toLowerCase())
  );

  return found || null;
}