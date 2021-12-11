// Dumb fun stuff to use in your bot, if you want.


// Get a random item from an array.
function randomItem(arr) {
    return arr[Math.floor(Math.random()*arr.length)];
}

// Return a random magic eight ball phrase.
function eightBall() {
    return randomItem([
        "It is certain.",
        "It is decidedly so.",
        "Without a doubt.",
        "Yes definitely.",
        "You may rely on it.",
        "As I see it, yes.",
        "Most likely.",
        "Outlook good.",
        "Yes.",
        "Signs point to yes.",
        "Reply hazy, try again.",
        "Ask again later.",
        "Better not tell you now.",
        "Cannot predict now.",
        "Concentrate and ask again.",
        "Don't count on it.",
        "My reply is no.",
        "My sources say no.",
        "Outlook not so good.",
        "Very doubtful.",
    ]);
}

// Generate semi-random strings from a corpus of text using a Markov chain.
//
// Example:
//
//     const foober = new Markov(2, [
//         'round and around and around we go',
//         'we go to the round table',
//     ]);
//     say(foober.generate(10)); // "And around we go to the round table table around."
//
class Markov {
    constructor(matchLength, corpus) {
        // {
        //     [matchString: string]: {
        //         word: string,
        //         weight: number, // 0 to 1, sum of all item weights is 1
        //     }[]
        // }
        this.table = {};
        this.allWords = [];
        this.matchLength = matchLength;

        // Build generator table
        for (const entry of corpus) {
            const words = entry.split(' ').map(w => w.trim()).filter(w => w.length > 0); // yes, map and filter, I know, I'm sorry, it only runs on startup anyway
            this.allWords.push(...words);

            // Make matches for all lengths below the requested
            for (let len = matchLength; len >= 1; len--) {
                for (let i = 0; i < words.length - len; i++) {
                    const matchString = _makeMarkovMatchString(words, i, len);
                    if (!this.table[matchString]) {
                        this.table[matchString] = [];
                    }

                    const nextWord = words[i+len];
                    let isNewWord = true;
                    for (const wordItem of this.table[matchString]) {
                        if (wordItem.word === nextWord) {
                            isNewWord = false;
                            wordItem.weight += 1;
                        }
                    }
                    if (isNewWord) {
                        this.table[matchString].push({
                            word: nextWord,
                            weight: 1,
                        });
                    }
                }
            }
        }

        // Normalize weights in table
        for (const entry of Object.values(this.table)) {
            let totalWeight = 0;
            for (const wordItem of entry) {
                totalWeight += wordItem.weight;
            }
            for (const wordItem of entry) {
                wordItem.weight /= totalWeight;
            }
        }
    }

    generate(length) {
        const result = [];

        // seed the result
        const startIndex = Math.floor(Math.random()*(this.allWords.length-this.matchLength));
        for (let i = 0; i < this.matchLength; i++) {
            result.push(this.allWords[startIndex+i]);
        }

        for (let i = result.length; i < length; i++) {
            let didGenNext = false;
        genNext:
            for (let ml = this.matchLength; ml >= 1; ml--) {
                const matchString = _makeMarkovMatchString(result, i-ml, ml);
                const nextWords = this.table[matchString] || [];
                if (nextWords.length === 0) {
                    continue
                }
                let remainingWeight = Math.random();
                for (const wordItem of nextWords) {
                    remainingWeight -= wordItem.weight;
                    if (remainingWeight <= 0) {
                        result.push(wordItem.word);
                        didGenNext = true;
                        break genNext;
                    }
                }
            }

            if (!didGenNext) {
                // matched none of the existing patterns, pick a random word
                result.push(randomItem(this.allWords));
            }
        }

        let resultStr = result.join(' ');
        resultStr = resultStr.charAt(0).toUpperCase() + resultStr.slice(1) // uppercase first letter
        if (resultStr.charAt(resultStr.length-1).match(/[a-zA-Z0-9]/)) {
            resultStr += '.';
        }

        return resultStr;
    }
}

function _makeMarkovMatchString(arr, i, len) {
    let res = arr[i];
    for (let j = 1; j <= len-1; j++) {
        res += ' ' + arr[i+j];
    }
    return res;
}
