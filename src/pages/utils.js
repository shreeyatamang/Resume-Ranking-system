const preprocessText = (text) => {
    const stopWords = new Set(['the', 'is', 'in', 'and', 'to', 'a', 'of', 'for', 'with', 'on', 'at', 'by', 'an', 'be', 'this', 'that', 'it', 'from', 'as', 'or', 'are', 'was', 'were', 'but', 'not', 'have', 'has', 'had', 'will', 'would', 'can', 'could', 'should', 'may', 'might', 'must', 'shall']);
    const tokens = text.toLowerCase().split(/\W+/);
    return tokens.filter(token => !stopWords.has(token));
  };
  
  const rankResumes = (jobDescription, resumes) => {
    const jobTokens = preprocessText(jobDescription);
    const rankedResumes = resumes.map((resume, index) => {
      const resumeTokens = preprocessText(resume);
      const score = jobTokens.reduce((acc, token) => acc + (resumeTokens.includes(token) ? 1 : 0), 0);
      return { resume, score };
    });
  
    return rankedResumes.sort((a, b) => b.score - a.score);
  };
  
  export { preprocessText, rankResumes };