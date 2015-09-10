var thru = require('through2');

var ans = [
   "it is certain",
   "it is decidedly so",
   "without a doubt",
   "yes definitely",
   "you may rely on it",
   "as i see it, yes",
   "most likely",
   "outlook good",
   "yes",
   "signs point to yes",
   "reply hazy try again",
   "ask again later",
   "better not tell you now",
   "cannot predict now",
   "concentrate and ask again",
   "don't count on it",
   "my reply is no",
   "my sources say no",
   "outlook not so good",
   "very doubtful"
];
process.stdout.write("ask me something\n");
var stream = thru(ins);
process.stdin.pipe(stream).pipe(process.stdout);

function ins (buff, enc, nxt) {
   this.push(ans[randomInt(0, ans.length)] + "\n");
   nxt();
}

function randomIntInc (low, high) {
   return Math.floor(Math.random() * (high - low + 1) + low);
}

function randomInt (low, high) {
   return Math.floor(Math.random() * (high - low) + low);
}
