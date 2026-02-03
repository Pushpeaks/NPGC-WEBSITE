function detectRuleBasedIntent(userMsg) {
    if (userMsg.includes("eligibility")) {
      bestIntent = { Intent: "ADMISSION_ELIGIBILITY" };
      highestScore = 1;
    }

    if (
      userMsg.includes("entrance") ||
      userMsg.includes("entrance exam") ||
      userMsg.includes("admission test")
    ) {
      bestIntent = { Intent: "ADMISSION_ENTRANCE_EXAM" };
      highestScore = 1;
    }

    if (
      userMsg.includes("seat") ||
      userMsg.includes("seats") ||
      userMsg.includes("vacancy")
    ) {
      bestIntent = { Intent: "ADMISSION_SEATS" };
      highestScore = 1;
    }

    if (
      userMsg.includes("fee") ||
      userMsg.includes("fees") ||
      userMsg.includes("price") ||
      userMsg.includes("cost")
    ) {
      bestIntent = { Intent: "FEE_QUERY" };
      highestScore = 1;
    }

    if (userMsg.includes("faculty") && userMsg.includes("department")) {
      bestIntent = { Intent: "FACULTY_BY_DEPT" };
      highestScore = 1;
    }

    if (
      userMsg.includes("library") ||
      userMsg.includes("book") ||
      userMsg.includes("issue") ||
      userMsg.includes("return")
    ) {
      bestIntent = { Intent: "LIBRARY_QUERY" };
      highestScore = 1;
    }

    if (
      userMsg.includes("marks") ||
      userMsg.includes("score") ||
      userMsg.includes("result") ||
      userMsg.includes("cgpa") ||
      userMsg.includes("sgpa")
    ) {
      bestIntent = { Intent: "MARKS_QUERY" };
      highestScore = 1;
    }

    if (
      userMsg.includes("attendance") ||
      userMsg.includes("present") ||
      userMsg.includes("absent") ||
      userMsg.includes("leave")
    ) {
      bestIntent = { Intent: "ATTENDANCE_QUERY" };
      highestScore = 1;
    }

    if (
      userMsg.includes("placement") ||
      userMsg.includes("job") ||
      userMsg.includes("company") ||
      userMsg.includes("package") ||
      userMsg.includes("salary") ||
      userMsg.includes("internship")
    ) {
      bestIntent = { Intent: "PLACEMENT_QUERY" };
      highestScore = 1;
    }

    if (
      userMsg.includes("deadline") ||
      userMsg.includes("last date") ||
      userMsg.includes("closing date") ||
      userMsg.includes("apply till")
    ) {
      bestIntent = { Intent: "ADMISSION_DEADLINE" };
      highestScore = 1;
    }

    
    const isWhoIsName =
      /^who is\s+[a-z]{3,}/i.test(userMsg) && !userMsg.includes("department");
    if (isWhoIsName) {
      bestIntent = { Intent: "FACULTY_BY_NAME" };
      highestScore = 1;
    }

  return null;
}

module.exports = { detectRuleBasedIntent };
