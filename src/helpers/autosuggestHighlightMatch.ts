const specialCharsRegex = /[.*+?^${}()|[\]\\]/g;
const whitespacesRegex = /\s+/;

function escapeRegexCharacters(str: any) {
  return str.replace(specialCharsRegex, '\\$&');
}

export const match = (text: any, query: any) => {
  if (text === 'Opps... Nothing found') {
    return;
  }
  return query
    .trim()
    .split(whitespacesRegex)
    .reduce((result: any, word: string) => {
      if (!word || !word.length) {
        return result;
      }
      const wordLen = word.length;
      const regex = new RegExp(escapeRegexCharacters(word), 'i');
      const { index = -1 } = text.match(regex);
      if (index > -1) {
        result.push([index, index + wordLen]);

        // Replace what we just found with spaces so we don't find it again.
        text =
          text.slice(0, index) +
          new Array(wordLen + 1).join(' ') +
          text.slice(index + wordLen);
      }

      return result;
    }, [])
    .sort((match1: any, match2: any) => {
      return match1[0] - match2[0];
    });
};
