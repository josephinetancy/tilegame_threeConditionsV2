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

//need a tansition in between solocircle and group square 


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
    p.avatars,
    //p.roundIntroV1 // Includes the intro for round1 "get ready for the first round"
];

const taskConfigurations = {
    1: [p.task.SoloCircleHigh, p.partnerAvatar, p.partnerRevealAvatar, p.task.GroupSquareLow], //1
    2: [p.partnerAvatar, p.partnerRevealAvatar, p.task.GroupSquareLow, p.task.SoloCircleHigh], //2
    3: [p.task.SoloCircleLow, p.partnerAvatar, p.partnerRevealAvatar, p.task.GroupSquareHigh], //3
    4: [p.partnerAvatar, p.partnerRevealAvatar, p.task.GroupSquareHigh,  p.task.SoloCircleLow], //4 
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




