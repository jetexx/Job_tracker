export function extractCompany(
  subject: string,
  from: string
): string | null {
  const text = `${subject} ${from}`.toLowerCase();

  // Known companies
  const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "OpenAI",
    "Meta",
    "Netflix",
    "Uber",
    "Adobe",
    "Atlassian",
    "Apple",
    "Tesla",
    "Nvidia",
    "Oracle",
    "Salesforce",
    "Intel",
    "IBM",
    "Cisco",
    "LinkedIn",
    "Spotify",
    "Airbnb",
    "Stripe",
    "PayPal",
    "Coinbase",
    "Cloudflare",
    "Datadog",
    "Twilio",
    "Shopify",
    "Accenture",
    "TCS",
    "Infosys",
    "Wipro",
    "HCL",
    "Tech Mahindra",
    "Capgemini",
    "Cognizant",
    "Deloitte",
    "EY",
    "PwC",
    "KPMG",
    "Goldman Sachs",
    "JPMorgan",
    "Morgan Stanley",
    "American Express",
    "Flipkart",
    "Swiggy",
    "Zomato",
    "Razorpay",
    "PhonePe",
    "Paytm",
    "Meesho",
    "Myntra",
    "Zepto",
    "Blinkit",
  ];

  // Step 1: Check known companies
  const knownCompany = companies.find((company) =>
    text.includes(company.toLowerCase())
  );

  if (knownCompany) {
    return knownCompany;
  }

  // Step 2: Extract email address
  const emailMatch = from.match(
    /[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/
  );

  if (emailMatch) {
    const domain = emailMatch[1].toLowerCase();

    // Ignore common email providers
    const ignoredDomains = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
      "icloud.com",
      "proton.me",
      "protonmail.com",
    ];

    if (!ignoredDomains.includes(domain)) {
      const companyPart = domain.split(".")[0];

      const cleanedCompany = companyPart
        .replace(/[-_]/g, " ")
        .replace(/\b(inc|corp|careers|jobs|hr|recruiting)\b/gi, "")
        .trim()
        .split(" ")
        .map(
          (word) =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");

      if (cleanedCompany.length > 1) {
        return cleanedCompany;
      }
    }
  }

  // Step 3: Try extracting sender name
  const senderNameMatch = from.match(/^"?([^"<]+)"?\s*</);

  if (senderNameMatch) {
    const senderName = senderNameMatch[1].trim();

    if (
      senderName.length > 2 &&
      !senderName.toLowerCase().includes("recruiter") &&
      !senderName.toLowerCase().includes("hr")
    ) {
      return senderName;
    }
  }

  return null;
}