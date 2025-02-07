/*
// Get ID from URL
PROLIFIC_PID = jsPsych.data.getURLVariable('subject')

// if no PROLIFIC_PID in URL, define as 9999 (so data will write)
if (typeof PROLIFIC_PID !== 'undefined') {
} else {
  PROLIFIC_PID = 9999 //  define 
}
*/

let timeline = [];

//need a transition in between solocircle and group square 


/* 

1 = SoloCircleHigh + GroupSquareLow 
2 = GroupSquareLow + SoloCircleHigh

3 = SoloCircleLow + GroupSquareHigh
4 = GroupSquareHigh + SoloCircleLow

5 = SoloSquareHigh + GroupCircleLow 
6 = GroupCircleLow + SoloSquareHigh 

7 = SoloSquareLow + GroupCircleHigh 
8 = GroupCircleHigh + SoloSquareLow

*/


const commonTimeline = [
 //   game.intro.preMessage,
 //  p.intro.r1part1,
 //   p.task.round1Avatars,
    p.intro.r1part2,
    p.intro.r1solo,
    p.intro.r1soloHigh,
 //   p.intro.r1part2,
];


const taskConfigurations = {
    1: [p.task.round1Intro, p.task.SoloCircleHigh, p.findingPartner, p.foundPartner, p.partnerAvatar, p.partnerRevealAvatar, p.task.round2Intro, p.task.GroupSquareLow], //1
    2: [p.findingPartner, p.foundPartner, p.partnerAvatar, p.partnerRevealAvatar, p.task.round1Intro, p.task.GroupSquareLow, p.task.round2Intro, p.task.SoloCircleHigh], //2
    3: [p.task.round1Intro, p.task.SoloCircleLow, p.findingPartner, p.foundPartner, p.partnerAvatar, p.partnerRevealAvatar, p.task.round2Intro, p.task.GroupSquareHigh], //3
    4: [p.findingPartner, p.foundPartner, p.partnerAvatar, p.partnerRevealAvatar, p.task.round1Intro, p.task.GroupSquareHigh, p.task.round2Intro, p.task.SoloCircleLow], //4 
    5: [p.task.round1Intro, p.task.SoloSquareHigh, p.findingPartner, p.foundPartner, p.partnerAvatar, p.partnerRevealAvatar, p.task.round2Intro, p.task.GroupCircleLow], //5 
    6: [p.findingPartner, p.foundPartner, p.partnerAvatar, p.partnerRevealAvatar, p.task.round1Intro, p.task.GroupCircleLow, p.task.round2Intro, p.task.SoloSquareHigh], //6 
    7: [p.task.round1Intro, p.task.SoloSquareLow, p.findingPartner, p.foundPartner, p.partnerAvatar, p.partnerRevealAvatar, p.task.round2Intro, p.task.GroupCircleHigh], //7 
    8: [p.findingPartner, p.foundPartner, p.partnerAvatar, p.partnerRevealAvatar, p.task.round1Intro, p.task.GroupCircleHigh, p.task.round2Intro, p.task.SoloSquareLow], //8 

};

// Set the timeline based on random assignment
timeline = [...commonTimeline, ...taskConfigurations[randomAssignment] || []];


/*

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
    game.task.Solo,
    ]
}; */


//const timeline = [p.avatars,game.task.round1];


//var exp = new MakeTimeline(streakGame);

jsPsych.run(timeline);




