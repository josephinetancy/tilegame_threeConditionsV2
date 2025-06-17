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

1 = IndCircle + IntSquareLow
2 = IntSquareLow + IndCircle

3 = IndCircle + IntSquareHigh 
4 = IntSquareHigh + IndCircle

5 = IndSquare + IntCircleLow
6 = IntCircleLow + IndSquare

7 = IndSquare + IntCircleHigh 
8 = IntCircleHigh + IndSquare


*/

const commonTimeline = [
   p.intro.preMessage,
    p.intro.r1part1,
    p.intro.round1Avatars,
   p.intro.r1part1a,
   p.intro.r1part2,
   p.intro.r1soloHigh, 
   p.intro.r1check, 
   p.intro.deduction, 
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
    1: [p.task.round1Intro, p.flowMeasure, p.intro.r2part1a, p.intro.r2part1, p.intro.r1soloHigh, p.intro.r1check, p.findingPartner, p.partnerNext, p.task.round2Intro, p.flowMeasure, p.demographics, p.save_data, p.end],
    2: [p.findingPartner, p.partnerNext, p.task.round1Intro, p.flowMeasure, p.intro.r2part1a, p.intro.r2part1, p.intro.r1soloHigh, p.intro.r1check, p.task.round2Intro, p.flowMeasure, p.demographics, p.save_data, p.end],
    3: [p.task.round1Intro, p.flowMeasure, p.intro.r2part1a, p.intro.r2part1, p.intro.r1soloHigh, p.intro.r1check, p.findingPartner, p.partnerNext, p.task.round2Intro, p.flowMeasure, p.demographics, p.save_data, p.end],
    4: [p.findingPartner, p.partnerNext, p.task.round1Intro, p.flowMeasure, p.intro.r2part1a, p.intro.r2part1, p.intro.r1soloHigh, p.intro.r1check, p.task.round2Intro, p.flowMeasure, p.demographics, p.save_data, p.end],
    5: [p.task.round1Intro, p.flowMeasure,  p.intro.r2part1a, p.intro.r2part1, p.intro.r1soloHigh, p.intro.r1check, p.findingPartner, p.partnerNext, p.task.round2Intro, p.flowMeasure, p.demographics, p.save_data, p.end],
    6: [p.findingPartner, p.partnerNext, p.task.round1Intro, p.flowMeasure, p.intro.r2part1a, p.intro.r2part1, p.intro.r1soloHigh, p.intro.r1check, p.task.round2Intro, p.flowMeasure, p.demographics, p.save_data, p.end],
    7: [p.task.round1Intro, p.flowMeasure, p.intro.r2part1a, p.intro.r2part1, p.intro.r1soloHigh, p.intro.r1check, p.findingPartner, p.partnerNext, p.task.round2Intro, p.flowMeasure, p.demographics, p.save_data, p.end],
    8: [p.findingPartner, p.partnerNext, p.task.round1Intro, p.flowMeasure, p.intro.r2part1a, p.intro.r2part1, p.intro.r1soloHigh, p.intro.r1check, p.task.round2Intro, p.flowMeasure, p.demographics, p.save_data, p.end],
}; 


/*with tasks */



const taskConfigurations = {
    1: [p.findingPartner, p.partnerNext, p.task.round1Intro, p.task.SoloCircleHigh, p.flowMeasure, p.enjoymentMeasure, p.intro.r2part1a, p.intro.r2part1, p.intro.r1soloHigh, p.intro.r1check, p.intro.deduction, p.findingPartner, p.task.round2Intro, p.task.GroupSquareLow, p.flowMeasure, p.enjoymentMeasure, p.demographics, p.save_data, p.end],
    2: [p.findingPartner, p.partnerNext, p.task.round1Intro, p.task.GroupSquareLow, p.flowMeasure, p.enjoymentMeasure, p.intro.r2part1a, p.intro.r2part1, p.intro.r1soloHigh, p.intro.r1check, p.intro.deduction, p.findingPartner, p.task.round2Intro, p.task.SoloCircleHigh, p.flowMeasure, p.enjoymentMeasure, p.demographics, p.save_data, p.end],
    3: [p.findingPartner, p.partnerNext, p.task.round1Intro, p.task.SoloCircleLow, p.flowMeasure, p.enjoymentMeasure, p.intro.r2part1a, p.intro.r2part1, p.intro.r1soloHigh, p.intro.r1check, p.intro.deduction, p.findingPartner, p.task.round2Intro, p.task.GroupSquareHigh, p.flowMeasure, p.enjoymentMeasure, p.demographics, p.save_data, p.end],
    4: [p.findingPartner, p.partnerNext, p.task.round1Intro, p.task.GroupSquareHigh, p.flowMeasure, p.enjoymentMeasure, p.intro.r2part1a, p.intro.r2part1, p.intro.r1soloHigh, p.intro.r1check, p.intro.deduction, p.findingPartner, p.task.round2Intro, p.task.SoloCircleLow, p.flowMeasure, p.enjoymentMeasure, p.demographics, p.save_data, p.end],
    5: [p.findingPartner, p.partnerNext, p.task.round1Intro, p.task.SoloSquareHigh, p.flowMeasure, p.enjoymentMeasure, p.intro.r2part1a, p.intro.r2part1, p.intro.r1soloHigh, p.intro.r1check, p.intro.deduction,p.findingPartner, p.task.round2Intro, p.task.GroupCircleLow, p.flowMeasure, p.enjoymentMeasure, p.demographics, p.save_data, p.end],
    6: [p.findingPartner, p.partnerNext, p.task.round1Intro, p.task.GroupCircleLow, p.flowMeasure, p.enjoymentMeasure, p.intro.r2part1a, p.intro.r2part1, p.intro.r1soloHigh, p.intro.r1check, p.intro.deduction, p.findingPartner, p.task.round2Intro, p.task.SoloSquareHigh, p.flowMeasure, p.enjoymentMeasure, p.demographics, p.save_data, p.end],
    7: [p.findingPartner, p.partnerNext, p.task.round1Intro, p.task.SoloSquareLow, p.flowMeasure, p.enjoymentMeasure, p.intro.r2part1a, p.intro.r2part1, p.intro.r1soloHigh, p.intro.r1check, p.intro.deduction,p.findingPartner, p.task.round2Intro, p.task.GroupCircleHigh, p.flowMeasure, p.enjoymentMeasure, p.demographics, p.save_data, p.end],
    8: [p.findingPartner, p.partnerNext, p.task.round1Intro, p.task.GroupCircleHigh, p.flowMeasure, p.enjoymentMeasure, p.intro.r2part1a, p.intro.r2part1, p.intro.r1soloHigh, p.intro.r1check, p.intro.deduction,p.findingPartner, p.task.round2Intro, p.task.SoloSquareLow, p.flowMeasure, p.enjoymentMeasure,p.demographics, p.save_data, p.end],
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




