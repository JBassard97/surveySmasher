function generateFakeEmail() {
  const providers = [
    "gmail.com",
    "hotmail.com",
    "live.com",
    "yahoo.com",
    "outlook.com",
    "icloud.com",
    "comcast.net",
  ];
  const chars = "abcdefghijklmnopqrstuvwxyz";
  const lastNames = [
    "white",
    "nelson",
    "jones",
    "smith",
    "johnson",
    "black",
    "miller",
    "wilson",
    "conners",
    "brown",
    "davis",
    "garcia",
    "rodriguez",
    "hernandez",
    "gonzalez",
    "moore",
    "wright",
    "taylor",
    "lopez",
    "martinez",
    "schmidt",
    "simmons",
  ];

  return `${chars.charAt(Math.floor(Math.random() * chars.length))}${
    lastNames[Math.floor(Math.random() * lastNames.length)]
  }${Math.floor(Math.random() * 1000)}@${
    providers[Math.floor(Math.random() * providers.length)]
  }`;
}

module.exports = { generateFakeEmail };
