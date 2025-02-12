//randomAssignment
// const randomAssignment = Math.floor(Math.random() * 8) + 1; 
randomAssignment = 2;
console.log(randomAssignment + " randomAssignment")

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


// Define Stimuli
let p = {};

var streakGame = (function() {

    var settings = {
        colorOrder: 0,
        pM: .5, //probability?
        pEM: [10, 10],///???
        gameTypeOrder: 0,
        val: 10, //how much they earn
        nTrials: 62, //number of trials per condition
        basePay: 10,
    };


    var text = {
        game1: settings.colorOrder == 1 ? 'Green Game' : 'Blue Game', //text.game1 = blue game
        color1: settings.colorOrder == 1 ? 'green' : 'blue', 
        hex1: settings.colorOrder == 1 ? '#00aa00' : '#1067e8',
        span1: settings.colorOrder == 1 ? 'a-span' : 'b-span',
        game2: settings.colorOrder == 0 ? 'Green Game' : 'Blue Game',
        color2: settings.colorOrder == 0 ? 'green' : 'blue',
        hex2: settings.colorOrder == 0 ? '#00aa00' : '#1067e8',
        span2: settings.colorOrder == 0 ? 'a-span' : 'b-span',
        value: settings.val.toString(),
        plural: settings.val == 1 ? '' : 's', 
        wasWere: settings.val == 1 ? 'was' : 'were'
    }; 


var textNew = {
    game1: randomAssignment % 2 === 1 ? '<b>Circle Game</b>' : '<b>Square Game</b>',
    shape1: randomAssignment % 2 === 1 ? 'circle' : 'square',
    game2: randomAssignment % 2 === 1 ? 'Square Game' : 'Circle Game',
    shape2: randomAssignment % 2 === 1 ? 'square' : 'circle',
    group: randomAssignment % 2 === 1 ? 'randomly' : 'by someone else', //odd numbers = alone, even = group
    groupNext: randomAssignment % 2 === 1 ? 'on random chance' : `someone else's performance`, //odd numbers = alone, even = group
    groupAgain: randomAssignment % 2 === 1 ? 'randomly' : '', //
    color: randomAssignment % 2 === 1 ? 'yellow' : `#2669ee`, //odd numbers = alone, even = group
    WL: [1, 4, 5, 8].includes(randomAssignment) ? `+6` : `+4`,
    LL: [1, 4, 5, 8].includes(randomAssignment) ? `+2` : `+4`,
}


/*
///
AVATAR 
CHOICE 
///
*/



function MakeAvatarSelection() {
    return {
        type: jsPsychHtmlButtonResponse,
        stimulus: `
            <div class='parent'>
                <p> For both games, you'll be playing as one of the following 3 players. </p>
                <p> Please choose a player: </p>
                 <div class="avatar-selection" style="display: flex; justify-content: center; gap: 20px;">
                    <img src="./avatar/1.jpg" class="avatar-option" data-choice="0" style="width:200px; cursor:pointer;">
                    <img src="./avatar/2.jpg" class="avatar-option" data-choice="1" style="width:200px; cursor:pointer;">
                    <img src="./avatar/3.jpg" class="avatar-option" data-choice="2" style="width:200px; cursor:pointer;">
                </div>
            </div>`,
        choices: [], // No text buttons needed
        response_ends_trial: true, // Ensure trial ends on image selection
        on_load: () => {
            document.querySelectorAll('.avatar-option').forEach(img => {
                img.addEventListener('click', function() {
                    let selectedColor = this.getAttribute('data-choice'); // Get the selected avatar index
                    let avatarResponse; 

                    if (selectedColor === '0') {
                        avatarResponse = '#ff00fe'; // Pink
                    } else if (selectedColor === '1') {
                        avatarResponse = '#90CD4C'; // Green
                    } else if (selectedColor === '2') {
                        avatarResponse = '#800000'; // Red
                    }

                    jsPsych.data.addProperties({ avatarResponse });
                    console.log(avatarResponse);
                    
                    jsPsych.finishTrial({ response: selectedColor }); // Manually end trial with response
                });
            });
        }
    };
}

   /*
    *
    *   INSTRUCTIONS
    *
    */

let avatarResponse = '#2669ee';

    p.intro = {}

    // temporary data
    var compAns1,
        compAns2,
        pages = {
            r1: {
                part1: [
        `<div class='parent'>
          <p> Welcome! </p>
          <p>We're interested in what makes some games more immersive and engaging than others. </p>
          <p> To help us, you'll play two games. </p>
                </div>`
                ],

                part2: [
                `<div class='parent'>
                <p> For both games, you'll earn points. </p>
                <p>Each point is worth 2 cents in bonus money. </p>
                You'll keep all the bonus money you earn on top of the $X you earn for your participation. </p>
                <p>To maximize your winnings, earn as many points as possible!</p>
                </div>`,

                `<div class='parent'>
                <p> The first game is called the ${textNew.game1}. </p>
                <p> Click "Next" to learn about the ${textNew.game1}. </p>
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape1}">
                <div id="inner-shape" class="${textNew.shape1}"></div>
                </div>
                </div>
                </div>`,

                `<div class='parent'>
                <p> In the ${textNew.game1}, ${textNew.shape1}s will appear on your screen. 
                <p> Initially, the inner ${textNew.shape1} and the outer ${textNew.shape1} are white. </p>
                <p> Your job is to activate the inner ${textNew.shape1}. </p>
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape1}">
                    <div id="inner-shape" class="${textNew.shape1}"></div>
                </div>
                </div>
                </div>`,

                 `<div class='parent'>
                <p>To activate the inner ${textNew.shape1}, press your SPACE BAR as soon as the ${textNew.shape1}s appear on your screen. </p>
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape1}">
                    <div id="inner-shape" class="${textNew.shape1}"></div>
                </div>
                </div>
                </div>`,

                `<div class='parent'>
                <p> If you press your SPACE BAR fast enough, the inner ${textNew.shape1} will activate like this. </p>
                <p></p>
                <p></p>
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape1}">
                <div id="inner-shape" class="${textNew.shape1}" style="background-color: {{avatarResponse}};"></div>
                </div>
                </div>
                </div>`,

                `<div class='parent'>
                <p>If you're too slow, the inner ${textNew.shape1} will turn gray.</p> 
                <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape1}">
                <div id="inner-shape" class="${textNew.shape1}" style="background-color: gray;"></div>
                </div>
                </div>
                </div>`
                ],

                solo: [
                `<div class='parent'>
                <p>The outer ${textNew.shape1} will activate\u2014or\u2014not ${textNew.group}. </p> 
                <p>If the outer ${textNew.shape1} ${textNew.groupAgain}activates, it will look like this, otherwise it will turn gray. </p> 
                <p>Whether the outer ${textNew.shape1} activates or not depends on ${textNew.groupNext}.</p>
           <div id="shape-wrapper">
              <div class="game-container">
            <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape1}" style="background-color: ${textNew.color};">
                <div id="inner-shape" class="${textNew.shape1}"></div>
                </div>
            </div>
        </div>

        <div class="game-container">
            <div class="outer-container">
                <div id="outer-shape" class="${textNew.shape1}" style="background-color: gray;">
                <div id="inner-shape" class="${textNew.shape1}"></div>
                </div>
                </div>
                </div>
                </div>
                </div>`,

                `<div class='parent'>
                <p> Depending on  (i) whether you activate the inner ${textNew.shape1}, </p> <p>and (ii) whether the outer ${textNew.shape1} randomly activates, you'll see four possible outcomes. </p>
                <div id="shape-wrapper" style="display: flex; gap: 40px; justify-content: center; align-items: center;">
            
            <div class="game-container" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                <div class="outer-container">
                    <div id="outer-shape" class="${textNew.shape1}" style="background-color: ${textNew.color};">
                        <div id="inner-shape" class="${textNew.shape1}" style="background-color: {{avatarResponse}};"></div>
                    </div>
                </div>
                <b><p style="margin-top: 10px;"></p></b>
            </div>

            <div class="game-container" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                <div class="outer-container">
                    <div id="outer-shape" class="${textNew.shape1}" style="background-color: grey;">
                     <div id="inner-shape" class="${textNew.shape1}" style="background-color: {{avatarResponse}};"></div>
                    </div>
                </div>
                <b><p style="margin-top: 10px;"></p></b>
            </div>

            <div class="game-container" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                <div class="outer-container">
                    <div id="outer-shape" class="${textNew.shape1}" style="background-color: ${textNew.color};">
                        <div id="inner-shape" class="${textNew.shape1}" style="background-color: grey;"></div>
                    </div>
                </div>
                <b><p style="margin-top: 10px;"></p></b>
            </div>

            <div class="game-container" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                <div class="outer-container">
                    <div id="outer-shape" class="${textNew.shape1}" style="background-color: grey;">
                        <div id="inner-shape" class="${textNew.shape1}" style="background-color: grey;"></div>
                    </div>
                </div>
                <b><p style="margin-top: 10px;"></p></b>
            </div>
        </div>`
                ],

soloHigh: [
    `<div class='parent'>
        <p>You'll earn points based on these rules:</p> 
        <div id="shape-wrapper" style="display: flex; justify-content: center;">
            <table style="border-collapse: collapse; text-align: center;">
                <!-- First row: Empty first column, Shapes start from the second column -->
                <tr>
                    <td style="padding: 10px;"></td> <!-- Empty first column -->
                    <td style="padding: 10px;">
                        <div class="outer-container">
                            <div id="outer-shape" class="${textNew.shape1}" style="background-color: ${textNew.color};">
                                <div id="inner-shape" class="${textNew.shape1}" style="background-color: {{avatarResponse}};"></div>
                            </div>
                        </div>
                    </td>
                    <td style="padding: 10px;">
                        <div class="outer-container">
                            <div id="outer-shape" class="${textNew.shape1}" style="background-color: grey;">
                                <div id="inner-shape" class="${textNew.shape1}" style="background-color: {{avatarResponse}};"></div>
                            </div>
                        </div>
                    </td>
                    <td style="padding: 10px;">
                        <div class="outer-container">
                            <div id="outer-shape" class="${textNew.shape1}" style="background-color: ${textNew.color};">
                                <div id="inner-shape" class="${textNew.shape1}" style="background-color: grey;"></div>
                            </div>
                        </div>
                    </td>
                    <td style="padding: 10px;">
                        <div class="outer-container">
                            <div id="outer-shape" class="${textNew.shape1}" style="background-color: grey;">
                                <div id="inner-shape" class="${textNew.shape1}" style="background-color: grey;"></div>
                            </div>
                        </div>
                    </td>
                </tr>

                <!-- Second row: Points with avatar 3 -->
                <tr>
                    <td rowspan="1" style="padding: 2px; vertical-align: middle;">
                        <img src="./avatar/3.jpg" style="width: 80px; height: auto;">
                    </td>
                    <td><b>+8</b></td>
                    <td><b>${textNew.WL}</b></td>
                    <td><b>+4</b></td>
                    <td><b>${textNew.LL}</b></td>
                </tr>

                <!-- Third row: Points with avatar 4 -->
                <tr>
                    <td rowspan="1" style="padding: 2px; vertical-align: middle;">
                        <img src="./avatar/4.jpg" style="width: 80px; height: auto;">
                    </td>
                    <td><b>+8</b></td>
                    <td><b>${textNew.WL}</b></td>
                    <td><b>+4</b></td>
                    <td><b>${textNew.LL}</b></td>
                </tr>
            </table>
        </div>
    </div>`
]


            }
        };

/*

                ],

                part2Bern: [`<div class='parent'>
                <p>To earn money, you must achieve wins.<br>
                The more wins you achieve, the more money you'll earn.</p>
                </div>`,

                `<div class='parent'>
                <p>To achieve wins, you'll try to "activate" tiles like this one.<br>
                Activating a tile results in a win.</p>
                <div class='box' style='background-color:gray'></div>
                </div>`,

                `<div class='parent'>
                <p>Wins are worth money. The more tiles you activate, the more money you'll earn.<br>
                Specifically, ${settings.val} cent will be added to your bonus fund for each tile you activate.</p>               
                <div class='box' style='background-color:gray'></div>
                </div>`,

                `<div class='parent'>
                <p>Tiles will appear on your screen, then disappear very quickly. To activate a tile, you must press your SPACE BAR 
                before it disappears; whenever you see a tile, you should press your SPACE BAR as fast as possible.</p>
                <div class='box' style='background-color:gray'></div>
                </div>`,

                `<div class='parent'>
                <p>In the tiles turn 
                when activated.</p>
                <div class='box' style='background-color:#1067e8'></div>
                </div>`,

                `<div class='parent'>
                <p>If you miss a tile, you'll see that no money was added to your bonus fund.<br>
                The next tile will appear immediately after.</p>
                <div style='font-size:35px'><p>You missed</p><p>+0 cents</p><p><br></p><p>(Get ready for the next tile!)</p></div>
                </div>`],

                part3: [`<div class='parent'>
                <p>You are now ready to play the <span class='${text.span1}'>${text.game1}</span>.</p>
                <p>Once you proceed, the <span class='${text.span1}'>${text.game1}</span> will start immediately, 
                so get ready to press your SPACEBAR.</p>
                <p>Continue to the next screen to begin.</p>
                </div>`]
            },
            r2: {
                part1: [`<div class='parent'>
                <p>Thank you for playing the <span class='${text.span1}'>${text.game1}</span>!</p>
                When you're ready, continue to learn about and play the <span class='${text.span2}'>${text.game2}</span>.</p>
                </div>`,

                `<div class='parent'>
                <p>The <span class='${text.span2}'>${text.game2}</span> is identical to the 
                <span class='${text.span1}'>${text.game1}</span> with three exceptions.</p>
                </div>`],

                part2Chunk: [`<div class='parent'>
                <p>First, in the <span class='${text.span2}'>${text.game2}</span>, tiles turn <span class='${text.span2}'>${text.color2}</span> 
                when activated.</p>
                <div class='box' style='background-color:${text.hex2}'></div>
                </div>`,

                `<div class='parent'>
                <p>Second, the <span class='${text.span2}'>${text.game2}</span> is divided into multiple, short rounds.</p>
                <p>In each round, you'll have five chances to activate a tile.<br>
                If you activate a tile before your five chances are up, you'll win the round.</p>
                </div>`,

                `<div class='parent'>
                <p>The more rounds you win, the more money you'll earn.<br>
                Specifically, ${settings.val} cent${text.plural} will be added to your bonus fund for each round you win.</p>               
                </div>`,

                `<div class='parent'>
                <p>If you activate a tile before your five chances are up, you'll see that you won the round<br>
                and ${text.value} cent${text.plural} ${text.wasWere} to your bonus fund. The next round will start immediately after.</p>
                <div style='font-size:35px'><p>You won the round!</p><p>+${settings.val} cent${text.plural}</p><p><br></p><p>(Get ready for the next round!)</p></div>
                </div>`,

                `<div class='parent'>
                <p>If you fail to activate a tile before your five chances are up, you'll see that you lost the round<br>
                and no money was added to your bonus fund. The next round will start immediately after.</p>
                <div style='font-size:35px'><p>You lost the round</p><p>+0 cents</p><p><br></p><p>(Get ready for the next round!)</p></div>
                </div>`,

                `<div class='parent'>
                <p>Each time you miss a tile, you'll see how many more chances you have left in the current round.<br>
                For example, if you have three chances left to activate a tile in the current round, you'll see this message:</p>
                <div style='font-size:35px'><p><span style='color:${text.color2}; font-size:60px'>3</span></p><p>Chances left</p></div>
                </div>`],

                part2Bern: [`<div class='parent'>
                <p>First, in the <span class='${text.span2}'>${text.game2}</span>, tiles turn <span class='${text.span2}'>${text.color2}</span> 
                when activated.</p>
                <div class='box' style='background-color:${text.hex2}'></div>
                </div>`,

                `<div class='parent'>
                <p>Second the <span class='${text.span2}'>${text.game2}</span> is not divided into multiple, short rounds.<br>
                Instead, it in played in a single, long round.<p>
                </div>`,

                `<div class='parent'>
                <p>Throughout the single, long round of the <span class='${text.span2}'>${text.game2}</span>,<br>you'll earn ${settings.val} cent${text.plural} for each tile you activate.<br>
                </div>`,

                `<div class='parent'>
                <p>Each time you activate a tile, you'll see that ${text.value} cent${text.plural} ${text.wasWere} added to your bonus fund.<br>
                The next tile will appear immediately after.</p>
                <div style='font-size:35px'><p>You activated it!</p><p>+${settings.val} cent${text.plural}</p><p><br></p><p>(Get ready for the next tile!)</p></div>
                </div>`,

                `<div class='parent'>
                <p>Each time you miss a tile, you'll see that no money was added to your bonus fund.<br>
                The next tile will appear immediately after.</p>
                <div style='font-size:35px'><p>You missed</p><p>+0 cents</p><p><br></p><p>(Get ready for the next tile!)</p></div>
                </div>`],

                part3: [`<div class='parent'>
                <p>You are now ready to play the <span class='${text.span2}'>${text.game2}</span>.</p>
                <p>Once you proceed, the <span class='${text.span2}'>${text.game2}</span> will start immediately, 
                so get ready to press your SPACEBAR.</p>
                <p>Continue to the next screen to begin.</p>
                </div>`]
            }
        }; */


    // constructor function for round 1 comprehension check loop
function MakeLoop(group, round) {

        const correctAnswers = {
            attnChk0 : randomAssignment % 2 === 1 ? `Random chance` : `My partner`, 
            attnChk1 : `My space bar`, 
            attnChk2: `+8`,
            attnChk3: [1, 4, 5, 8].includes(randomAssignment) ? `+6` : `+4`,
            attnChk4: `+4`,
            attnChk5: [1, 4, 5, 8].includes(randomAssignment) ? `+2` : `+4`,
        };

        const errorMessage = {
            type: jsPsychInstructions,
            pages: [`<div class='parent'><p>You provided the wrong answer.<br>To make sure you understand the game, please re-read the instructions.</p></div>`],
            show_clickable_nav: true,
            allow_keys: false,
        };


        const attnChk = {
            type: jsPsychSurveyMultiChoice,
               preamble: () => {
            const avatarResponse = jsPsych.data.get().filter({trial_type: 'html-button-response'}).last(1).values()[0].avatarResponse; 
            console.log(avatarResponse + " in makeintropart2");
         
            let preambleText = `
                <div class='parent'>
                    <p> To recap, in the ${textNew.game1}: </p>
                    <p> The outer ${textNew.shape1} is activated depending on ${textNew.groupNext}. </p> 
                    <p> You activate the inner ${textNew.shape1} with your SPACE BAR. </p>
                    <div id="shape-wrapper" style="display: flex; gap: 40px; justify-content: center; align-items: center;">
                        
                        <div class="game-container" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                            <div class="outer-container">
                                <div id="outer-shape" class="${textNew.shape1}" style="background-color: ${textNew.color};">
                                    <div id="inner-shape" class="${textNew.shape1}" style="background-color: {{avatarResponse}};"></div>
                                </div>
                            </div>
                            <b><p style="margin-top: 10px;">+8</p></b>
                        </div>
            
                        <div class="game-container" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                            <div class="outer-container">
                                <div id="outer-shape" class="${textNew.shape1}" style="background-color: grey;">
                                    <div id="inner-shape" class="${textNew.shape1}" style="background-color: {{avatarResponse}};"></div>
                                </div>
                            </div>
                            <b><p style="margin-top: 10px;">${textNew.WL}</p></b>
                        </div>
            
                        <div class="game-container" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                            <div class="outer-container">
                                <div id="outer-shape" class="${textNew.shape1}" style="background-color: ${textNew.color};">
                                    <div id="inner-shape" class="${textNew.shape1}" style="background-color: grey;"></div>
                                </div>
                            </div>
                            <b><p style="margin-top: 10px;">+4</p></b>
                        </div>
            
                        <div class="game-container" style="display: flex; flex-direction: column; align-items: center; text-align: center;">
                            <div class="outer-container">
                                <div id="outer-shape" class="${textNew.shape1}" style="background-color: grey;">
                                    <div id="inner-shape" class="${textNew.shape1}" style="background-color: grey;"></div>
                                </div>
                            </div>
                            <b><p style="margin-top: 10px;">${textNew.LL}</p></b>
                        </div>
                    </div>
                    <div style="margin-top: 0px; text-align: center;">
                        <p style="font-size: 18px; font-weight: bold;">Before you continue, please answer the following questions:</p>
                    </div>
                </div>
            `;

            // Dynamically replace the color placeholders with avatarResponse
            preambleText = preambleText.replace(/{{avatarResponse}}/g, avatarResponse); // Replace red with avatarResponse

            return preambleText;
        },
            questions: [
                {
                    prompt: `What decides how the outer ${textNew.shape1} is activated?`, 
                    name: `attnChk0`, 
                    options: ['Random chance', 'My space bar', 'My partner'],
                },
                {
                    prompt: `What decides how the inner ${textNew.shape1} is activated?`,
                    name: `attnChk1`, 
                    options: ['Random chance', 'My space bar', 'My partner'],
                },
                {
                    prompt: `How many points do you get when the inner ${textNew.shape1} and the outer ${textNew.shape1} are activated?`,
                    name: `attnChk2`, 
                    options: ['+2', '+4', '+6', '+8'],
                },
                {
                    prompt: `How many points do you get when the inner ${textNew.shape1} is activated but the outer ${textNew.shape1} is NOT activated?`, 
                    name: `attnChk3`, 
                    options: ['+2', '+4', '+6', '+8'],
                },
                {
                    prompt: `How many points do you get when the inner ${textNew.shape1} is NOT activated but the outer ${textNew.shape1} is activated?`, 
                    name: `attnChk4`, 
                    options: ['+2', '+4', '+6', '+8'],
                },
                {
                    prompt: `How many points do you get when the inner ${textNew.shape1} and the outer ${textNew.shape1} are NOT activated?`, 
                    name: `attnChk5`, 
                    options: ['+2', '+4', '+6', '+8'],
                },
            ],
            randomize_question_order: false,
            scale_width: 500,
            on_finish: (data) => {
                  const totalErrors = getTotalErrors(data.response, correctAnswers);
                  data.totalErrors = totalErrors;
            },
        };

        function getTotalErrors(response, correctAnswers) {
            let errorCount = 0;

            // Compare each response with correct answers
            for (const key in correctAnswers) {
                if (response[key] !== correctAnswers[key]) {
                    errorCount++;
                }
            }
            return errorCount;
        }


        const conditionalNode = {
          timeline: [errorMessage],
          conditional_function: () => {
            const fail = jsPsych.data.get().last(1).select('totalErrors').sum() > 0 ? true : false;
            return fail;
          },
        };

        const instLoop = {
          timeline: [attnChk, conditionalNode],
          loop_function: () => {
            const fail = jsPsych.data.get().last(2).select('totalErrors').sum() > 0 ? true : false;
            return fail;
          },
        };



        const introTimeline = {
            timeline: [instLoop],
        }

        this.timeline = [introTimeline];
    }

    // consent form

    const consent = `
    <div class='parent' style='height: 1000px; width: 1000px'>
    <p><b>Consent Form<br>

    <p><b>Description</b><br>
    You are invited to participate in a research study on how humans enjoy different tasks. You'll be asked to participate in a short game that involves hitting a space bar to activate a tile. Then you'll be asked to answer various questions about your experience./p>

    <p><b>Time Involvement</b><br>
    Your participation will take approximately 20 minutes. 

    <p><b>Risks and Benefits</b><br>
    The risks associated with this study are not anticipated to be beyond those involved in normal, daily computer use. There are no foreseeable psychological risks and benefits beyond those involved in normal, daily life. The benefits which may reasonably be expected to result from this study are none. We cannot and do not guarantee or promise that you will receive any benefits from this study.
    
    <p><b>Payment</b><br>
    You will receive $4.60 payment for your participation.

     <p><b>Payment</b><br>
    If you have read this form and have decided to participate in this project, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at any time without penalty or loss of benefits to which you are otherwise entitled. The alternative is not to participate. You have the right to refuse to answer particular questions. The results of this research study may be presented at scientific or professional meetings or published in scientific journals. Your individual privacy will be maintained in all published and written data resulting from the study.
    In accordance with scientific norms, the data from this study may be used or shared with other researchers for future research (after removing personally identifying information) without additional consent from you.

    <p><b>Contact Information:</b><br>
    Questions: If you have any questions, concerns or complaints about this research, its procedures, risks and benefits, contact the Protocol Director, Josephine Tan (josetan@stanford.edu) or Assistant Professor David Melnikoff (dmelnik@stanford.edu).
    Independent Contact: If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at (650)-723-2480 or toll free at 1-866-680-2906, or email at irbnonmed@stanford.edu. You can also write to the Stanford IRB, Stanford University, 1705 El Camino Real, Palo Alto, CA 94306.
    If you agree to participate, press the "Next" button to indicate that you consent to participate in the study.</p>`


    // create instruction variables
    p.intro.preMessage = {
        type: jsPsychInstructions,
        pages: [consent],
        show_clickable_nav: true,
        post_trial_gap: 500,
    };

    p.intro.r1part1 = {
        type: jsPsychInstructions,
        pages: pages.r1.part1,
        show_clickable_nav: true,
        post_trial_gap: 500,
    };


function makeIntroPart2() {
    return {
        type: jsPsychInstructions,
        pages: () => {
            const avatarResponse = jsPsych.data.get().filter({trial_type: 'html-button-response'}).last(1).values()[0].avatarResponse; 
            console.log(avatarResponse + " in makeintropart2");
            const updatedPages = pages.r1.part2.map(page => {
                return page.replace(/{{avatarResponse}}/g, avatarResponse);  // Replace with the actual color
            });

            return updatedPages;
        },      
        show_clickable_nav: true,
        post_trial_gap: 500,
    };
}


function makeR1Solo() {
    return {
        type: jsPsychInstructions,
        pages: () => {
            const avatarResponse = jsPsych.data.get().filter({trial_type: 'html-button-response'}).last(1).values()[0].avatarResponse; 
            const updatedPages = pages.r1.solo.map(page => {
                return page.replace(/{{avatarResponse}}/g, avatarResponse);  // Replace with the actual color
            });

            return updatedPages;
        },      
        show_clickable_nav: true,
        post_trial_gap: 500,
    };
}


function makeR1SoloHigh() {
    return {
        type: jsPsychInstructions,
        pages: () => {
            const avatarResponse = jsPsych.data.get().filter({trial_type: 'html-button-response'}).last(1).values()[0].avatarResponse; 
            const updatedPages = pages.r1.soloHigh.map(page => {
                return page.replace(/{{avatarResponse}}/g, avatarResponse);  // Replace with the actual color
            });

            return updatedPages;
        },      
        show_clickable_nav: true,
        post_trial_gap: 500,
    };
}

    p.intro.r1check = new MakeLoop('R1', 'Solo');

 //   p.intro.r2part2 = new MakeLoop(text.span2, text.game2, text.color2, 'R2');

   /*
    *
    *   TASK
    *
    */

    p.task = {}

/*
///
variables for plugins
///
*/

let noOfTrials = 5;

///fake participant's activation time for WL and LL trials, that far exceeds trial duration
let partner_rtL = 20000; //for when partner "loses".

let delayTime = 400;

//trial duration times for WW and WL times: this is the time 
let trialforWins = 750;

//trial duration times for LL and LW times 
let trialforLose = 250;

/* 
//
FOR WW TRIAL WITH PLUG IN 
///
*/


function WWTrial(shape, group) {
    let trialStartTime;
    let trialEndTime;
  
    // Set the shape classes based on the input parameter
    const outerShapeClass = shape;
    const innerShapeClass = shape; 

    return {
        type: jsPsychWWHtmlKeyboardResponse,
        data: { Trial_Type: shape }, // Use the shape passed to the function
        stimulus: `
                <div id="outer-container">
                    <div id="outer-shape" class="${outerShapeClass}"></div>
                    <div id="inner-shape" class="${innerShapeClass}"></div>
                </div>
            `,
        choices: [" "],
        response_duration: trialforWins, 
        selected_color: () => {
            let avatarResponse = jsPsych.data.get().filter({trial_type: 'html-button-response'}).last(1).values()[0].avatarResponse; 
            return avatarResponse;
        },
        trial_duration: 2000, // Fallback duration if no response from participant
        partner_rt: function forWW(min = 225, max = 400) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        ending_time: delayTime, // Must be larger than partner_rt
        on_start: function (trial) {
            trialStartTime = Date.now();
            console.log('Selected color:', trial.selected_color); // Log the selected color

            let color = group === 'solo' ? '#FFFF00' : '#2669ee';

            jsPsych.pluginAPI.setTimeout(() => {
                const outerCircle = document.getElementById('outer-shape');
                if (outerCircle) {
                    outerCircle.style.backgroundColor = color;
                } else {
                    console.log('outer-shape element not found');
                }
            }, trial.partner_rt);
        },
        on_finish: function (data) {
            trialEndTime = Date.now();
            const trialDuration = trialEndTime - trialStartTime;
            data.trial_duration = trialDuration;
            data.partner_outcome = true;
            console.log('Reaction time: ' + data.rt);
            console.log('Trial duration: ' + trialDuration);
            console.log('Partner RT: ' + data.partner_rt);
        },
    };
}


/* 
//
FOR WL TRIAL WITH PLUG IN 
///
*/

// WL trial
function WLTrial(shape) {
    let trialStartTime;
    let trialEndTime;

    // Set the shape classes based on the input parameter
    const outerShapeClass = shape;
    const innerShapeClass = shape; 

    return {
        type: jsPsychWWHtmlKeyboardResponse,
        data: { Trial_Type: shape },
        stimulus: `
            <div id="outer-container">
                <div id="outer-shape" class="${outerShapeClass}"></div>
                <div id="inner-shape" class="${innerShapeClass}"></div>
            </div>
        `,
        choices: [" "],
        response_duration: trialforWins,
        selected_color: () => {
            let avatarResponse = jsPsych.data.get().filter({trial_type: 'html-button-response'}).last(1).values()[0].avatarResponse; 
            return avatarResponse;
        },
        trial_duration: 2000,
        partner_rt: function forWW(min = 0, max = 100) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        ending_time: delayTime,
        on_finish: function(data) {
            trialEndTime = Date.now();
            const trialDuration = trialEndTime - trialStartTime;
            data.trial_duration = trialDuration;
            data.partner_outcome = false;

            console.log("Reaction time: " + data.rt);
            console.log("Trial duration: " + trialDuration);
            console.log("Partner RT: " + data.partner_rt);
        },
    };
}


/* 
//
FOR LW TRIAL WITH PLUG IN 
///
*/


// LW trial
function LWTrial(shape, group) {
    let trialStartTime;
    let trialEndTime;

    const outerShapeClass = shape;
    const innerShapeClass = shape;

    return {
        type: jsPsychLWHtmlKeyboardResponse,
        data: { Trial_Type: shape },
        stimulus: `
            <div id="outer-container">
                <div id="outer-shape" class="${outerShapeClass}"></div>
                <div id="inner-shape" class="${innerShapeClass}"></div>
            </div>
        `,
        choices: [" "],
        trial_duration: 2000, // Fallback duration if no response from participant
        response_duration: trialforLose, // Ensure trialforLose is defined globally or passed properly

        selected_color: function() {
            const lastTrial = jsPsych.data.get().filter({ trial_type: 'html-button-response' }).last(1).values()[0];
            return lastTrial ? lastTrial.avatarResponse : null;
        },

        partner_rt: function(min = 225, max = 235) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        on_start: function(trial) {
            trialStartTime = Date.now();
            let color = group === 'solo' ? '#FFFF00' : '#2669ee';

            jsPsych.pluginAPI.setTimeout(() => {
                const outerCircle = document.getElementById('outer-shape');
                if (outerCircle) {
                    outerCircle.style.backgroundColor = color;
                } else {
                    console.log('outer-shape element not found');
                }
            }, trial.partner_rt);
        },

        on_finish: function(data) {
            trialEndTime = Date.now();
            const trialDuration = trialEndTime - trialStartTime;
            data.trial_duration = trialDuration;
            data.partner_outcome = true;

            console.log('Reaction time: ' + data.rt);
            console.log('Trial duration: ' + trialDuration);
            console.log('Partner RT: ' + data.partner_rt);
        }
    };
}

/* 
//
FOR LL TRIAL WITH PLUG IN 
///
*/

// LL trial
function LLTrial(shape) {
    let trialStartTime;
    let trialEndTime;

    const outerShapeClass = shape;
    const innerShapeClass = shape; 

    return {
        type: jsPsychLWHtmlKeyboardResponse,
        data: { Trial_Type: shape },
        stimulus: `
            <div id="outer-container">
                <div id="outer-shape" class="${outerShapeClass}"></div>
                <div id="inner-shape" class="${innerShapeClass}"></div>
            </div>
        `,
        choices: [" "],
        response_duration: trialforLose, // Fallback duration if no response from participant
        selected_color: () => {
            let avatarResponse = jsPsych.data.get().filter({trial_type: 'html-button-response'}).last(1).values()[0].avatarResponse; 
            return avatarResponse;
        },
        trial_duration: 2000, // Fallback duration if no response from participant
        partner_rt: partner_rtL,
        response_ends_trial: false,
        on_start: function(trial) {
            trialStartTime = Date.now(); 
            console.log('Outer circle becomes highlighted at partner reaction time: ' + trial.partner_rt);

            jsPsych.pluginAPI.setTimeout(function() {
                const outerCircle = document.getElementById('outer-shape');
                if (outerCircle) {
                    outerCircle.style.backgroundColor = 'grey';
                } else {
                    console.log('outer-circle element not found');
                }
            }, trialforLose);
        },
        on_finish: function(data) {
            trialEndTime = Date.now();
            const trialDuration = trialEndTime - trialStartTime;
            data.trial_duration = trialDuration;
            data.partner_outcome = false;
            console.log('Reaction time: ' + data.rt);
            console.log('Trial duration: ' + trialDuration);
            console.log('Partner RT: ' + data.partner_rt);
        }
    };
}


function generateAvatarFeedback(avatar1, avatar1Text, avatar2Text, avatar1Points, avatar2Points) {
    return `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px;">
            <!-- Left Avatar -->
            <div style="text-align: center;">
                <img src="${avatar1}" style="width: 200px; height: 200px; margin: 0 10px;">
                <div style="width: 100%; height: 40px; background-color: #ddd; display: flex; justify-content: center; align-items: center; font-size: 20px;">
                    ${avatar1Text}
                </div>
                <!-- Second text box for accumulating points -->
                <div style="width: 100%; height: 40px; background-color: #ddd; display: flex; justify-content: center; align-items: center; font-size: 20px;">
                    ${avatar1Points} Points
                </div>
            </div>
            <!-- Right Avatar -->
            <div style="text-align: center;">
                <img src="./avatar/4.jpg" style="width: 200px; height: 200px; margin: 0 10px;">
                <div style="width: 100%; height: 40px; background-color: #ddd; display: flex; justify-content: center; align-items: center; font-size: 20px;">
                    ${avatar2Text}
                </div>
                <!-- Second text box for accumulating points -->
                <div style="width: 100%; height: 40px; background-color: #ddd; display: flex; justify-content: center; align-items: center; font-size: 20px;">
                    ${avatar2Points} Points
                </div>
            </div>
        </div>
        <!-- Line at the bottom -->
        <div style="text-align: center; margin-top: 20px; font-size: 24px; font-weight: bold;">
            Get ready for the next tile!
        </div>
    `;
}

function generateSoloAvatarFeedback(avatar1, avatar1Text, avatar1Points) {
    return `
          <div style="display: flex; flex-direction: column; align-items: center;">
                <img src="${avatar1}" style="width: 200px; height: 200px;">
                <div style="width: 100%; height: 40px; background-color: #ddd; display: flex; justify-content: center; align-items: center; font-size: 20px;">
                    ${avatar1Text}
                </div>
                <!-- Second text box for accumulating points -->
                <div style="width: 100%; height: 40px; background-color: #ddd; display: flex; justify-content: center; align-items: center; font-size: 20px;">
                    ${avatar1Points} Points
                </div>
            </div>
        </div>
        <!-- Line at the bottom -->
        <div style="text-align: center; margin-top: 20px; font-size: 24px; font-weight: bold;">
            Get ready for the next tile!
        </div>
    `;
}


const avatarChoices = [
    { color: 'Pink', code: '#ff00fe', img: './avatar/1.jpg' },
    { color: 'Green', code: '#90CD4C', img: './avatar/2.jpg' },
    { color: 'Red', code: '#800000', img: './avatar/3.jpg' }
];

function MakeFeedback(mode) {

    let avatar1TotalPoints = 0;
    let avatar2TotalPoints = 0;

    return {
        type: jsPsychHtmlKeyboardResponse,
        data: { Trial_Type: `feedback_${mode}` },
        stimulus: () => {
            const lastTrialData = jsPsych.data.get().last(1).values()[0];
            let avatarResponse = jsPsych.data.get().filter({trial_type: 'html-button-response'}).last(1).values()[0].avatarResponse;
            let selectedAvatar = avatarChoices.find(avatar => avatar.code === avatarResponse);
            let selectedAvatarImg = selectedAvatar ? selectedAvatar.img : null;
            console.log(selectedAvatarImg);

            const partner_rt = lastTrialData.partner_rt;
            const partner_outcome = lastTrialData.partner_outcome;

            let feedbackText = '';

                 if (mode === 'groupHigh') {
                const partner_outcome = lastTrialData.partner_outcome;

                if (lastTrialData.outcome && !partner_outcome) {
                    avatar1TotalPoints += 6;
                    avatar2TotalPoints += 4;
                    feedbackText = generateAvatarFeedback(selectedAvatarImg, '+6', '+4', avatar1TotalPoints, avatar2TotalPoints); // You activated it, they didn’t
                } else if (lastTrialData.outcome && partner_outcome) {
                    avatar1TotalPoints += 8;
                    avatar2TotalPoints += 8;
                    feedbackText = generateAvatarFeedback(selectedAvatarImg, '+8', '+8', avatar1TotalPoints, avatar2TotalPoints); // Both activated
                } else if (!lastTrialData.outcome && !partner_outcome) {
                    avatar1TotalPoints += 2;
                    avatar2TotalPoints += 2;
                    feedbackText = generateAvatarFeedback(selectedAvatarImg, '+2', '+2', avatar1TotalPoints, avatar2TotalPoints); // Both lose
                } else if (!lastTrialData.outcome && partner_outcome) { 
                    avatar1TotalPoints += 4;
                    avatar2TotalPoints += 6;
                    feedbackText = generateAvatarFeedback(selectedAvatarImg, '+4', '+6', avatar1TotalPoints, avatar2TotalPoints); // They activated, you didn’t
                }
            } if (mode === 'soloHigh') {
                // Solo feedback (ignoring partner outcome)
                if (lastTrialData.outcome && !partner_outcome) {
                    avatar1TotalPoints += 6;
                    feedbackText = generateSoloAvatarFeedback(selectedAvatarImg, '+6', avatar1TotalPoints); // You activated it, they didn’t
                } else if (lastTrialData.outcome && partner_outcome) {
                    avatar1TotalPoints += 8;
                    feedbackText = generateSoloAvatarFeedback(selectedAvatarImg, '+8', avatar1TotalPoints); // Both activated
                } else if (!lastTrialData.outcome && !partner_outcome) {
                    avatar1TotalPoints += 2;
                    feedbackText = generateSoloAvatarFeedback(selectedAvatarImg, '+2', avatar1TotalPoints); // Both lose
                } else if (!lastTrialData.outcome && partner_outcome) { 
                    avatar1TotalPoints += 4;
                    feedbackText = generateSoloAvatarFeedback(selectedAvatarImg, '+4', avatar1TotalPoints); // They activated, you didn’t
                } 
            } if (mode === 'groupLow') {
                const partner_outcome = lastTrialData.partner_outcome;

                if (lastTrialData.outcome && !partner_outcome) {
                    avatar1TotalPoints += 4;
                    avatar2TotalPoints += 4;
                    feedbackText = generateAvatarFeedback(selectedAvatarImg, '+4', '+4', avatar1TotalPoints, avatar2TotalPoints); // You activated it, they didn’t
                } else if (lastTrialData.outcome && partner_outcome) {
                    avatar1TotalPoints += 8;
                    avatar2TotalPoints += 8;
                    feedbackText = generateAvatarFeedback(selectedAvatarImg, '+8', '+8', avatar1TotalPoints, avatar2TotalPoints); // Both activated
                } else if (!lastTrialData.outcome && !partner_outcome) {
                    avatar1TotalPoints += 4;
                    avatar2TotalPoints += 4;
                    feedbackText = generateAvatarFeedback(selectedAvatarImg, '+4', '+4', avatar1TotalPoints, avatar2TotalPoints); // Both lose
                } else if (!lastTrialData.outcome && partner_outcome) { 
                    avatar1TotalPoints += 4;
                    avatar2TotalPoints += 4;
                    feedbackText = generateAvatarFeedback(selectedAvatarImg, '+4', '+4', avatar1TotalPoints, avatar2TotalPoints); // They activated, you didn’t
                }
            } if (mode === 'soloLow') {
                // Solo feedback (ignoring partner outcome)
                if (lastTrialData.outcome && !partner_outcome) {
                    avatar1TotalPoints += 4;
                    feedbackText = generateSoloAvatarFeedback(selectedAvatarImg, '+4', avatar1TotalPoints); // You activated it, they didn’t
                } else if (lastTrialData.outcome && partner_outcome) {
                    avatar1TotalPoints += 8;
                    feedbackText = generateSoloAvatarFeedback(selectedAvatarImg, '+8', avatar1TotalPoints); // Both activated
                } else if (!lastTrialData.outcome && !partner_outcome) {
                    avatar1TotalPoints += 4;
                    feedbackText = generateSoloAvatarFeedback(selectedAvatarImg, '+4', avatar1TotalPoints); // Both lose
                } else if (!lastTrialData.outcome && partner_outcome) { 
                    avatar1TotalPoints += 4;
                    feedbackText = generateSoloAvatarFeedback(selectedAvatarImg, '+4', avatar1TotalPoints); // They activated, you didn’t
                }

            }
            return feedbackText;
        },
        choices: "NO_KEYS",
        trial_duration: 3500,
        on_finish: (data) => {
            data.trialNumber = (data.trialNumber || 0) + 1; // Update trial number
            console.log(data);
        }
    };
}

function MakeRoundIntro(round) {
    return {
        type: jsPsychHtmlKeyboardResponse,
        data: { Trial_Type: `firstRoundIntro_${round}` },
        stimulus: () => {
            if (round === "V1") {
                return `<div style='font-size:35px'><p>Get ready to press your SPACE BAR!</p></div>`; 
            } else {
                return `<div style='font-size:35px'><p>Get ready to press your SPACE BAR!</p></div>`;
            }
        },
        choices: "NO_KEYS",
        trial_duration: 2000,
    };
} 

/*
function MakeRoundIntro(round) {
    return {
        type: jsPsychHtmlKeyboardResponse,
        data: { Trial_Type: `firstRoundIntro_${round}` },
        stimulus: () => {
            if (round == 'V1') {
                return settings.gameTypeOrder == 0  
                    ? `<div style='font-size:35px'><p>Get ready for the first round!</p></div>` 
                    : `<div style='font-size:35px'><p>Get ready for the first tile!</p></div>`;
            } else {
                return settings.gameTypeOrder == 0  
                    ? `<div style='font-size:35px'><p>Get ready for the first tile!</p></div>` 
                    : `<div style='font-size:35px'><p>Get ready for the first round!</p></div>`;
            }
        },
        choices: "NO_KEYS",
        trial_duration: 2000,
    };
} */

var ITI = [250, 500, 750, 1000, 1250, 1500, 1750, 2000]

function MakeDelay(round) {
    return {
        type: jsPsychHtmlKeyboardResponse,
        data: { Trial_Type: `ITI_${round}` },
        stimulus: "",
        choices: [' '],  // Spacebar response
        trial_duration: () => jsPsych.randomization.sampleWithoutReplacement(ITI, 1)[0],
        on_finish: (data) => {
            data.TooFast = data.response === " " ? 1 : 0;
        }
    };
}

function MakeTooFast(round) {
    return {
        type: jsPsychHtmlKeyboardResponse,
        data: { Trial_Type: `tooFastMessage_${round}` },
        choices: [],  // Disables any response
        stimulus: () => {
            const lastKeyPress = jsPsych.data.get().last(2).values()[0].response;
            return lastKeyPress === " " ? `<div style='font-size: 20px'><p>Too Fast!</p><p>Please wait for the tile to appear before pressing your SPACEBAR! </p></div>` : '';
        },
        trial_duration: () => {
            const lastKeyPress = jsPsych.data.get().last(1).values()[0].response;
            return lastKeyPress === " " ? 2500 : 0;
        },
        post_trial_gap: () => {
            const lastKeyPress = jsPsych.data.get().last(1).values()[0].response;
            return lastKeyPress === " " ? 1000 : 0;
        }
    };
}

p.foundPartner = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div style="font-size: 24px; text-align: center;">
            <p id="loading-text"> Get ready. Loading game now...</p>
            <div class="loading-bar-container">
                <div class="loading-bar"></div>
            </div>
        </div>
    `,
    choices: "NO_KEYS",
    trial_duration: 10000,  // Total time for loading screen
    on_load: () => {
        const css = `
            #loading-text {
                width: 250px;
                margin: 0 auto;
            }
            .loading-bar-container {
                width: 100%;
                height: 20px;
                background-color: #f3f3f3;
                border-radius: 10px;
                overflow: hidden;
                margin: 20px auto;
            }
            .loading-bar {
                width: 0;
                height: 100%;
                background-color: #6b6d6e;
                animation: load 3s forwards;
            }
            @keyframes load {
                0% { width: 0; }
                100% { width: 100%; }
            }
        `;
        const style = document.createElement('style');
        style.innerHTML = css;
        document.head.appendChild(style);
    },
    on_finish: (data) => {
        data.loading_completed = true;
    }
};

p.findingPartner = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div style="font-size: 24px; text-align: center;">
            <p id="loading-text"> Please be patient. <p> <p>This could take a few minutes. </p>
            <div class="spinner-container">
                <div class="spinner-wheel"></div>
            </div>
        </div>
    `,
    choices: "NO_KEYS",
    trial_duration: 10000,  // Duration of the loading screen in milliseconds
    on_load: () => {
        const css = `
            #loading-text {
                width: 250px;
                margin: 0 auto;
            }
            .spinner-container {
                display: flex;
                justify-content: center;
                align-items: center;
                margin: 20px auto;
            }
            .spinner-wheel {
                width: 50px;
                height: 50px;
                border: 6px solid #f3f3f3;
                border-top: 6px solid #6b6d6e;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        const style = document.createElement('style');
        style.innerHTML = css;
        document.head.appendChild(style);
    },
    on_finish: (data) => {
        data.loading_completed = true;
    }
};


p.partnerAvatar = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div style="font-size: 24px; text-align: center;">
            <p id="loading-text"> Now, waiting for your partner to choose their color of their avatar.</p>
            <div class="loading-bar-container">
                <div class="loading-bar"></div>
            </div>
        </div>
    `,
    choices: "NO_KEYS",
    trial_duration: 2000,  // Duration of the loading screen in milliseconds, 15 seconds
    on_load: () => {
        const css = `
            #loading-text {
                width: 250px;
                margin: 0 auto;
            }
            .loading-bar-container {
                width: 100%;
                height: 20px;
                background-color: #f3f3f3;
                border-radius: 10px;
                overflow: hidden;
                margin: 20px auto;
            }
            .loading-bar {
                width: 0;
                height: 100%;
                background-color: #6b6d6e;
                animation: load 1.5s forwards;
            }
            @keyframes load {
                0% { width: 0; }
                80% { width: 80%; }
                100% { width: 100%; }
            }
        `;
        const style = document.createElement('style');
        style.innerHTML = css;
        document.head.appendChild(style);

    },
    on_finish: (data) => {
        console.log(data);
        data.loading_completed = true;
    }
};

p.partnerRevealAvatar = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
        <div style="font-size: 24px; text-align: center;">
            <p id="loading-text"> Your partner chose this color: </p>
            <img src="./avatar/4.jpg" style="width: 200px; height: 200px; margin: 0 10px">
            </div>
        </div>
    `,
    choices: "NO_KEYS",
    trial_duration: 2000,  // Duration of the loading screen in milliseconds, 15 seconds
    on_finish: (data) => {
        console.log(data);
        data.loading_completed = true;
    }
};

    // trial variables
    var LLTrialCircle = new LLTrial('circle'),
        LLTrialSquare = new LLTrial('square'),
        LWTrialCircleGroup = new LWTrial('circle', 'group'),
        LWTrialCircleSolo = new LWTrial('circle', 'solo'),
        LWTrialSquareGroup = new LWTrial('square', 'group'),
        LWTrialSquareSolo = new LWTrial('square', 'solo'),
        WLTrialCircle = new WLTrial('circle'),
        WLTrialSquare = new WLTrial('square'),
        WWTrialCircleGroup = new WWTrial('circle', 'group'),
        WWTrialCircleSolo = new WWTrial('circle', 'solo'),
        WWTrialSquareGroup = new WWTrial('square', 'group'),
        WWTrialSquareSolo = new WWTrial('square', 'solo'),
        feedbackGroupHigh = new MakeFeedback('groupHigh'),
        feedbackGroupLow = new MakeFeedback('groupLow'),
        feedbackSoloHigh = new MakeFeedback('soloHigh'),
        feedbackSoloLow = new MakeFeedback('soloLow'),
        avatarChoice1 = new MakeAvatarSelection(),
        delayR1 = new MakeDelay('R1'),
        delayR2 = new MakeDelay('R2'),
        tooFastR1 = new MakeTooFast('R1'),
        tooFastR2 = new MakeTooFast('R2'),
        roundIntroV1 = new MakeRoundIntro('V1'),
        roundIntroV2 = new MakeRoundIntro('V2'),
        introPart2 = makeIntroPart2(),
        introR1Solo = makeR1Solo(),
        introR1SoloHigh = makeR1SoloHigh()

    const delayLoopR1 = {
        timeline:[delayR1, tooFastR1],
        loop_function: function(data) {
            let tooFastArray = jsPsych.data.get().select('TooFast').values;
            let loop = tooFastArray[tooFastArray.length - 1];
            console.log(tooFastArray, loop);
            if (loop) { return true }
            return false
        }
    }

    const delayLoopR2 = {
        timeline:[delayR2, tooFastR2],
        loop_function: function(data) {
            let tooFastArray = jsPsych.data.get().select('TooFast').values;
            let loop = tooFastArray[tooFastArray.length - 1];
            console.log(tooFastArray, loop);
            if (loop) { return true }
            return false
        }
    }

    p.task.round1Intro = {
        timeline: [roundIntroV1],
    }; 

    p.task.round2Intro = {
        timeline: [roundIntroV2],
    }; 

    p.intro.r1part2 = {
        timeline: [introPart2],
    }; 

    p.intro.r1solo = {
        timeline: [introR1Solo],
    }; 

    p.intro.r1soloHigh = {
        timeline: [introR1SoloHigh],
    }; 

    p.intro.round1Avatars = {
        timeline: [avatarChoice1],
    }; 
 

//Solo Squares - High
 const LLLoopSoloSquareHigh = {
     timeline: [delayLoopR1, LLTrialSquare, feedbackSoloHigh] 
    };  

    const WWLoopSoloSquareHigh = {
     timeline: [delayLoopR1, WWTrialSquareSolo, feedbackSoloHigh] 
    };

    const LWLoopSoloSquareHigh = {
     timeline: [delayLoopR1, LWTrialSquareSolo, feedbackSoloHigh]
    };  

    const WLLoopSoloSquareHigh = {
     timeline: [delayLoopR1, WLTrialSquare, feedbackSoloHigh]
    };  

//Solo Squares - Low
 const LLLoopSoloSquareLow = {
     timeline: [delayLoopR1, LLTrialSquare, feedbackSoloLow]
    };  

    const WWLoopSoloSquareLow = {
     timeline: [delayLoopR1, WWTrialSquareSolo, feedbackSoloLow] 
    };

    const LWLoopSoloSquareLow = {
     timeline: [delayLoopR1, LWTrialSquareSolo, feedbackSoloLow]
    };  

    const WLLoopSoloSquareLow = {
     timeline: [delayLoopR1, WLTrialSquare, feedbackSoloLow]
    };  

//Group Squares - High
    const LLLoopGroupSquareHigh = {
     timeline: [delayLoopR1, LLTrialSquare, feedbackGroupHigh]
    };  

    const WWLoopGroupSquareHigh = {
     timeline: [delayLoopR1, WWTrialSquareGroup, feedbackGroupHigh]
    };

    const LWLoopGroupSquareHigh = {
     timeline: [delayLoopR1, LWTrialSquareGroup, feedbackGroupHigh]
    };  

    const WLLoopGroupSquareHigh = {
     timeline: [delayLoopR1, WLTrialSquare, feedbackGroupHigh]
    };


//Group Squares - Low
    const LLLoopGroupSquareLow = {
     timeline: [delayLoopR1, LLTrialSquare, feedbackGroupLow]
    }; 

    const WWLoopGroupSquareLow = {
     timeline: [delayLoopR1, WWTrialSquareGroup, feedbackGroupLow] 
    };

    const LWLoopGroupSquareLow = {
     timeline: [delayLoopR1, LWTrialSquareGroup, feedbackGroupLow] 
    };  

    const WLLoopGroupSquareLow = {
     timeline: [delayLoopR1, WLTrialSquare, feedbackGroupLow]
    };

//Solo Circles - High
    const LLLoopSoloCircleHigh = {
     timeline: [delayLoopR1, LLTrialCircle, feedbackSoloHigh]
    };

    const WWLoopSoloCircleHigh = {
     timeline: [delayLoopR1, WWTrialCircleSolo, feedbackSoloHigh]
    };

    const LWLoopSoloCircleHigh = {
     timeline: [delayLoopR1, LWTrialCircleSolo, feedbackSoloHigh]
    };  

    const WLLoopSoloCircleHigh = {
     timeline: [delayLoopR1, WLTrialCircle, feedbackSoloHigh]
    };  

//Solo Circles - Low
    const LLLoopSoloCircleLow = {
     timeline: [delayLoopR1, LLTrialCircle, feedbackSoloLow]
    };

    const WWLoopSoloCircleLow = {
     timeline: [delayLoopR1, WWTrialCircleSolo, feedbackSoloLow]
    };

    const LWLoopSoloCircleLow = {
     timeline: [delayLoopR1, LWTrialCircleSolo, feedbackSoloLow]
    };  

    const WLLoopSoloCircleLow = {
     timeline: [delayLoopR1, WLTrialCircle, feedbackSoloLow] 
    };  

//Group Circle High

    const LLLoopGroupCircleHigh = {
     timeline: [delayLoopR1, LLTrialCircle, feedbackGroupHigh]
    };  

    const WWLoopGroupCircleHigh = {
     timeline: [delayLoopR1, WWTrialCircleGroup, feedbackGroupHigh]
    };

    const LWLoopGroupCircleHigh = {
     timeline: [delayLoopR1, LWTrialCircleGroup, feedbackGroupHigh]
    };  

    const WLLoopGroupCircleHigh = {
     timeline: [delayLoopR1, WLTrialCircle, feedbackGroupHigh]
    };

  //Group Circle Low  

    const LLLoopGroupCircleLow = {
     timeline: [delayLoopR1, LLTrialCircle, feedbackGroupLow]
    };  

    const WWLoopGroupCircleLow = {
     timeline: [delayLoopR1, WWTrialCircleGroup, feedbackGroupLow]
    };

    const LWLoopGroupCircleLow = {
     timeline: [delayLoopR1, LWTrialCircleGroup, feedbackGroupLow]
    };  

    const WLLoopGroupCircleLow = {
     timeline: [delayLoopR1, WLTrialCircle, feedbackGroupLow]
    };


    p.task.SoloCircleLow = {
        timeline: [WWLoopSoloCircleLow, LLLoopSoloCircleLow, LWLoopSoloCircleLow, WLLoopSoloCircleLow],
        randomize_order: true,
        repetitions: noOfTrials,
    };

    p.task.SoloCircleHigh = {
        timeline: [WWLoopSoloCircleHigh, LLLoopSoloCircleHigh, LWLoopSoloCircleHigh, WLLoopSoloCircleHigh],
        randomize_order: true,
        repetitions: noOfTrials,
    }; 

    p.task.GroupCircleLow = {
        timeline: [WWLoopGroupCircleLow, LLLoopGroupCircleLow, LWLoopGroupCircleLow,  WLLoopGroupCircleLow],
        randomize_order: true,
        repetitions: noOfTrials,
    };

    p.task.GroupCircleHigh = {
        timeline: [WWLoopGroupCircleHigh, LLLoopGroupCircleHigh, LWLoopGroupCircleHigh,  WLLoopGroupCircleHigh],
        randomize_order: true,
        repetitions: noOfTrials,
    };

    p.task.SoloSquareLow = {
        timeline: [WWLoopSoloSquareLow, LLLoopSoloSquareLow, LWLoopSoloSquareLow, WLLoopSoloSquareLow],
        randomize_order: true,
        repetitions: noOfTrials,
    };

    p.task.SoloSquareHigh = {
        timeline: [WWLoopSoloSquareHigh, LLLoopSoloSquareHigh, LWLoopSoloSquareHigh, WLLoopSoloSquareHigh],
        randomize_order: true,
        repetitions: noOfTrials,
    };  

    p.task.GroupSquareLow = {
        timeline: [WWLoopGroupSquareLow, LLLoopGroupSquareLow, LWLoopGroupSquareLow,  WLLoopGroupSquareLow],
        randomize_order: true,
        repetitions: noOfTrials,
    };

    p.task.GroupSquareHigh = {
        timeline: [WWLoopGroupSquareHigh, LLLoopGroupSquareHigh, LWLoopGroupSquareHigh,  WLLoopGroupSquareHigh],
        randomize_order: true,
        repetitions: noOfTrials,
    };


   /*
    *
    *   QUESTIONS
    *
    */

    p.Qs = {};

    // scales
    var zeroToExtremely = ['0<br>A little', '1', '2', '3', '4', '5', '6', '7', '8<br>Extremely'];
    var zeroToALot = ['0<br>A little', '1', '2', '3', '4', '5', '6', '7', '8<br>A lot'];

    // constructor functions
    var flowQs = function(span, name, round) {
        this.type = 'survey-likert';
        this.preamble = `<div style='padding-top: 50px; width: 850px; font-size:16px'>

        <p>Thank you for completing the <span class='${span}'>${name}</span>!</strong></p>

        <p>During the <span class='${span}'>${name}</span>, to what extent did you feel immersed 
        and engaged in what you were doing?<br>Report how immersed and engaged you felt by 
        answering the following questions.</p></div>`;
        this.questions = [
            {prompt: `During the <span class='${span}'>${name}</span>, to what extent did you feel absorbed in what you were doing?`,
            name: `absorbed_${round}`,
            labels: zeroToExtremely},
            {prompt: `During <span class='${span}'>${name}</span>, to what extent did you feel immersed in what you were doing?`,
            name: `immersed_${round}`,
            labels: zeroToExtremely},
            {prompt: `During <span class='${span}'>${name}</span>, to what extent did you feel engaged in what you were doing?`,
            name: `engaged_${round}`,
            labels: zeroToExtremely},
            {prompt: `During <span class='${span}'>${name}</span>, to what extent did you feel engrossed in what you were doing?`,
            name: `engrossed_${round}`,
            labels: zeroToExtremely},
        ];
        this.randomize_question_order = false;
        this.scale_width = 500;
    };

    var enjoyQs = function(span, name, round) {
        this.type = 'survey-likert';
        this.preamble = `<div style='padding-top: 50px; width: 850px; font-size:16px'>

        <p>Below are a few more questions about the <span class='${span}'>${name}</span>.</p><p>Instead of asking about immersion and
        engagement, these questions ask about <strong>enjoyment</strong>.<br>Report how much you <strong>enjoyed</strong> 
        the <span class='${span}'>${name}</span> by answering the following questions.</p></div>`;
        this.questions = [
            {prompt: `How much did you enjoy playing the <span class='${span}'>${name}</span>?`,
            name: `enjoyable_${round}`,
            labels: zeroToALot},
            {prompt: `How much did you like playing the <span class='${span}'>${name}</span>?`,
            name: `like_${round}`,
            labels: zeroToALot},
            {prompt: `How much did you dislike playing the <span class='${span}'>${name}</span>?`,
            name: `dislike_${round}`,
            labels: zeroToALot},
            {prompt: `How much fun did you have playing the <span class='${span}'>${name}</span>?`,
            name: `fun_${round}`,
            labels: zeroToALot},
            {prompt: `How entertaining was the <span class='${span}'>${name}</span>?`,
            name: `entertaining_${round}`,
            labels: zeroToExtremely},
        ];
        this.randomize_question_order = false;
        this.scale_width = 500;
    };

    var pMQ = function (span, name, round) {
        this.type = 'survey-html-form';
        this.preamble = `<p>In the <span class='${span}'>${name}</span>, you attempted to activate many tiles. 
        <br>What percentage of the tiles do you think you activated successfully?</p>
        <p>In the space below, type a number from 0 to 100<br>indicating the percentage of tiles you think you activated successfully.`;
        this.html = `<p>%<input name="pMBlief_${round}" type="text" /></p>`;
    };
    
    p.Qs.round1 = {
        timeline: [new flowQs(text.span1, text.game1, 'R1'), new enjoyQs(text.span1, text.game1, 'R1'), new pMQ(text.span1, text.game1, 'R1')]
    };

    p.Qs.round2 = {
        timeline: [new flowQs(text.span2, text.game2, 'R2'), new enjoyQs(text.span2, text.game2, 'R2'), new pMQ(text.span2, text.game2, 'R2')]
    };

    p.Qs.demographics = (function() {
        var gender = {
            type: 'html-button-response',
            stimulus: '<p>Gender:</p>',
            choices: ['Male', 'Female', 'Other'],
        };
        var age = {
            type: 'survey-text',
            questions: [{prompt: "Age:", name: "age"}],
        }; 
        var ethnicity = {
            type: 'html-button-response',
            stimulus: '<p>Ethnicity:</p>',
            choices: ['White / Caucasian', 'Black / African American','Asian / Pacific Islander', 'Hispanic', 'Native American', 'Other'],
        };
        var english = {
            type: 'html-button-response',
            stimulus: '<p>Is English your native language?:</p>',
            choices: ['Yes', 'No'],
        };  
        var finalWord = {
            type: 'survey-text',
            questions: [{prompt: "Questions? Comments? Complains? Provide your feedback here!", rows: 10, columns: 100, name: "finalWord"}],
            on_finish: function(data){
                totalJackpotsR1 = jsPsych.data.get().filter({Trial_Type: 'feedback_R1', Jackpot: true}).count();
                totalJackpotsR2 = jsPsych.data.get().filter({Trial_Type: 'feedback_R2', Jackpot: true}).count();
                totalJackpots = totalJackpotsR1 + totalJackpotsR2;
                data.totalJackpots = totalJackpots;
            },
        }; 
        var email = {
            type: "instructions",
            pages: function() {
                var bonusDollars = Math.ceil( (totalJackpots * settings.val) / 100);
                var totalDollars = bonusDollars + 10
                var text = `<p>Thank you for participating!</p><p>In total, you won <b>${bonusDollars} cents</b> in bonus money!
                <br>To receive your earnings, please give the following code to the administrator: <b>DM${totalDollars*2}</b>.</p>`;
                return [text];
            },
            show_clickable_nav: true,
            post_trial_gap: 500,
        };

        var demos = {
            timeline: [gender, age, ethnicity, english, finalWord]
        };

        return demos;
    }());


    return p;

}());
