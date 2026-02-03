
function findBestMatch(userMsg, dataList, keyProperty) {
    let bestMatch = null;
    let maxScore = -1;
     let bestUniqueCount = 0;
    dataList.forEach(item => {
        const dbName = item[keyProperty].toLowerCase();
        const cleanDbName = dbName.replace(/[()./&,-]/g, ' ');
        const cleanUserMsg = userMsg.toLowerCase().replace(/[()./&,-]/g, ' ');

        const dbWords = cleanDbName.split(/\s+/).filter(w => w.length > 1);
        const userWords = cleanUserMsg.split(/\s+/).filter(w => w.length > 1);

        let currentScore = 0;
       let currentUniqueMatches = 0;
        dbWords.forEach(word => {
            if (userWords.includes(word)) {
                const isGeneric = ['department','bachelor', 'master', 'diploma', 'certificate', 'course', 'of', 'in', 'and',].includes(word);
                if (!isGeneric) {
                    currentScore += 10;
                    currentUniqueMatches++;
                } else {
                    currentScore += 1;
                }
            }
        });

        const acronymMatch = dbName.match(/\(([^)]+)\)/); 
        if (acronymMatch && userMsg.includes(acronymMatch[1].toLowerCase())) currentScore += 30; 

        if (currentScore > maxScore) {
            maxScore = currentScore;
            bestMatch = item;
            bestUniqueCount = currentUniqueMatches;
        } 

        else if (currentScore === maxScore && bestMatch) {
            if (dbName.length < bestMatch[keyProperty].toLowerCase().length) {
                bestMatch = item;
                bestUniqueCount = currentUniqueMatches;
            }
        }
    });

    return (maxScore <= 2 || bestUniqueCount===0) ? { bestMatch: null, score: maxScore } : { bestMatch, score: maxScore };
}

module.exports = {findBestMatch};