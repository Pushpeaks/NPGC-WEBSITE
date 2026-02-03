const {COLLEGE_MAP} = require('../constants/nlpNormalizer');
function normalize(text = "") {
  let t = text.toLowerCase().trim();
  const sortedKeys = Object.keys(COLLEGE_MAP).sort((a, b) => b.length - a.length);

  for (const word of sortedKeys) {
    const regex = new RegExp(`(^|\\s)${word}($|\\s)`, "gi");
    
    t = t.replace(regex, (match, p1, p2) => `${p1}${COLLEGE_MAP[word]}${p2}`);
  }

  return t.replace(/\s+/g, " ").trim();
}

module.exports = {normalize};