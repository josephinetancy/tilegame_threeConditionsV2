/*
// Get ID from URL
PROLIFIC_PID = jsPsych.data.getURLVariable('subject')

// if no PROLIFIC_PID in URL, define as 9999 (so data will write)
if (typeof PROLIFIC_PID !== 'undefined') {
} else {
  PROLIFIC_PID = 9999 //  define 
}
*/


function MakeTimeline(game) {
    this.timeline = [
 //  game.intro.preMessage,
  //  game.intro.r1part1,
  // game.findingPartner, 
  //  game.foundPartner, 
    game.avatars,
    game.partnerAvatar,
    game.partnerRevealAvatar, 
    game.task.round1Intro, //this is including the intro for the round1 "get ready for the first round"
    game.task.round1,
    ]
};


//const timeline = [p.avatars,game.task.round1];


var exp = new MakeTimeline(streakGame);

jsPsych.run(exp.timeline);




