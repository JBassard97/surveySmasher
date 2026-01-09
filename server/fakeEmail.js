export function generateFakeEmail() {
  const providers = ["gmail.com", "yahoo.com", "outlook.com", "icloud.com"];
  const chars = "abcdefghijklmnopqrstuvwxyz";
  const lastNames = [
    "smith",
    "johnson",
    "black",
    "miller",
    "wilson",
    "conners",
    "brown",
    "davis",
    "garcia",
    "lopez",
    "martinez",
    "schmidt",
    "simmons",
    ];
    
    return `${chars.charAt(Math.floor(Math.random() * chars.length))}${lastNames[
      Math.floor(Math.random() * lastNames.length)
    ]}${Math.floor(Math.random() * 1000)}@${
      providers[Math.floor(Math.random() * providers.length)]
    }`;
}
