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
    p.intro.r1part1,
    p.intro.round1Avatars,
    p.intro.r1part1a,
    p.intro.r1part2,
 //   p.intro.r1part3,
    p.intro.r1soloHigh, 
   p.intro.r1check,
];

/*
// If randomAssignment is 2, add p.partnerRevealAvatar after p.intro.round1Avatars
if (randomAssignment === 2) {
    const avatarIndex = commonTimeline.indexOf(p.intro.round1Avatars);
    if (avatarIndex !== -1) {
        commonTimeline.splice(avatarIndex + 1, 0, p.partnerRevealAvatar);
    }
} */

/*without tasks */ 
/*
const taskConfigurations = {
    1: [p.task.round1Intro, p.flowMeasure, p.intro.r2part1, p.intro.r2part2, p.intro.r1soloHigh, p.intro.r1check, p.findingPartner, p.task.round2Intro, p.flowMeasure, p.demographics],
    2: [p.findingPartner, p.task.round1Intro, p.flowMeasure, p.intro.r2part1, p.intro.r2part2, p.intro.r1soloHigh, p.intro.r1check, p.task.round2Intro,  p.flowMeasure, p.demographics],
    3: [p.task.round1Intro, p.flowMeasure, p.intro.r2part1, p.intro.r2part2, p.intro.r1soloHigh, p.intro.r1check, p.findingPartner, p.task.round2Intro, p.flowMeasure, p.demographics],
    4: [p.findingPartner, p.task.round1Intro, p.flowMeasure, p.intro.r2part1, p.intro.r2part2, p.intro.r1soloHigh, p.intro.r1check, p.task.round2Intro, p.flowMeasure, p.demographics],
    5: [p.task.round1Intro, p.flowMeasure, p.intro.r2part1, p.intro.r2part2, p.intro.r1soloHigh, p.intro.r1check, p.findingPartner, p.task.round2Intro, p.flowMeasure, p.demographics],
    6: [p.findingPartner, p.task.round1Intro, p.flowMeasure, p.intro.r2part1, p.intro.r2part2, p.intro.r1soloHigh, p.intro.r1check, p.task.round2Intro,  p.flowMeasure, p.demographics],
    7: [p.task.round1Intro,  p.flowMeasure, p.intro.r2part1, p.intro.r2part2, p.intro.r1soloHigh, p.intro.r1check, p.findingPartner, p.task.round2Intro, p.flowMeasure, p.demographics],
    8: [p.findingPartner, p.task.round1Intro, p.task.GroupCircleHigh, p.flowMeasure, p.intro.r2part1, p.intro.r2part2, p.intro.r1soloHigh, p.intro.r1check, p.task.round2Intro, p.flowMeasure, p.demographics],
};
*/


/*with tasks */
const taskConfigurations = {
    1: [p.task.round1Intro, p.task.SoloCircleHigh, p.flowMeasure, p.intro.r2part1, p.intro.r2part2, p.intro.r1soloHigh, p.intro.r1check, p.findingPartner, p.task.round2Intro, p.task.GroupSquareLow, p.flowMeasure, p.demographics, p.save_data, p.end],
    2: [p.findingPartner, p.task.round1Intro, p.task.GroupSquareLow, p.flowMeasure, p.intro.r2part1, p.intro.r2part2, p.intro.r1soloHigh, p.intro.r1check, p.task.round2Intro, p.task.SoloCircleHigh, p.flowMeasure, p.demographics, p.save_data, p.end],
    3: [p.task.round1Intro, p.task.SoloCircleLow, p.flowMeasure, p.intro.r2part1, p.intro.r2part2, p.intro.r1soloHigh, p.intro.r1check, p.findingPartner, p.task.round2Intro, p.task.GroupSquareHigh, p.flowMeasure, p.demographics, p.save_data, p.end],
    4: [p.findingPartner, p.task.round1Intro, p.task.GroupSquareHigh, p.flowMeasure, p.intro.r2part1, p.intro.r2part2, p.intro.r1soloHigh, p.intro.r1check, p.task.round2Intro, p.task.SoloCircleLow, p.flowMeasure, p.demographics, p.save_data, p.end],
    5: [p.task.round1Intro, p.task.SoloSquareHigh, p.flowMeasure, p.intro.r2part1, p.intro.r2part2, p.intro.r1soloHigh, p.intro.r1check, p.findingPartner, p.task.round2Intro, p.task.GroupCircleLow, p.flowMeasure, p.demographics, p.save_data, p.end],
    6: [p.findingPartner, p.task.round1Intro, p.task.GroupCircleLow, p.flowMeasure, p.intro.r2part1, p.intro.r2part2, p.intro.r1soloHigh, p.intro.r1check, p.task.round2Intro, p.task.SoloSquareHigh, p.flowMeasure, p.demographics, p.save_data, p.end],
    7: [p.task.round1Intro, p.task.SoloSquareLow, p.flowMeasure, p.intro.r2part1, p.intro.r2part2, p.intro.r1soloHigh, p.intro.r1check, p.findingPartner, p.task.round2Intro, p.task.GroupCircleHigh, p.flowMeasure, p.demographics, p.save_data, p.end],
    8: [p.findingPartner, p.task.round1Intro, p.task.GroupCircleHigh, p.flowMeasure, p.intro.r2part1, p.intro.r2part2, p.intro.r1soloHigh, p.intro.r1check, p.task.round2Intro, p.task.SoloSquareLow, p.flowMeasure, p.demographics, p.save_data, p.end],
}; 
// Set the timeline based on random assignment
timeline = [...commonTimeline, ...(taskConfigurations[randomAssignment] || [])];


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




