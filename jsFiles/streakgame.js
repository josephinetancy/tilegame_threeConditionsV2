//randomAssignment
// const randomAssignment = Math.floor(Math.random() * 8) + 1; 
randomAssignment = 1;
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


let isSecondTime = false; 

var textNew = {
    game1: randomAssignment % 2 === 1 ? 'Circle Game' : 'Square Game',
    shape1: randomAssignment % 2 === 1 ? 'circle' : 'square',
    game2: randomAssignment % 2 === 1 ? 'Square Game' : 'Circle Game',
    Old: randomAssignment % 2 === 1 ? 'Circle Game' : 'Square Game',
    shape2: randomAssignment % 2 === 1 ? 'square' : 'circle',
    group: randomAssignment % 2 === 1 ? 'randomly' : 'by someone else', //odd numbers = alone, even = group
    group2: randomAssignment % 2 === 1 ? 'by someone else' : 'randomly' , //odd numbers = alone, even = group
    groupNext: randomAssignment % 2 === 1 ? 'random chance' : `your partner's performance`, //odd numbers = alone, even = group
    groupNext2: randomAssignment % 2 === 1 ? `your partner's performance` : 'random chance', //odd numbers = alone, even = group
    groupAgain: randomAssignment % 2 === 1 ? 'randomly' : '', //
    groupAgain2: randomAssignment % 2 === 1 ? '' : 'randomly', //
    color: randomAssignment % 2 === 1 ? 'yellow' : `#2669ee`, //odd numbers = alone, even = group
    color2: randomAssignment % 2 === 1 ? `#2669ee` : 'yellow', //odd numbers = alone, even = group
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
                <div class="avatar-selection" style="display: inline-block; justify-content: center; gap: 20px;">
                    <img src="./avatar/1.jpg" class="avatar-option" data-choice="0">
                    <img src="./avatar/2.jpg" class="avatar-option" data-choice="1">
                    <img src="./avatar/3.jpg" class="avatar-option" data-choice="2">
                </div>
            </div>`,
        choices: [],
        response_ends_trial: true,
        on_load: () => {
            // Ensure jsPsych wrapper allows interaction
            let wrapper = document.querySelector(".jspsych-content-wrapper");
            if (wrapper) {
                wrapper.style.pointerEvents = "auto"; 
            }

            // Add click functionality
            document.querySelectorAll('.avatar-option').forEach(img => {
                img.addEventListener('click', function() {
                    let selectedColor = this.getAttribute('data-choice');
                    let avatarResponse; 

                    if (selectedColor === '0') {
                        avatarResponse = '#ff00fe';
                    } else if (selectedColor === '1') {
                        avatarResponse = '#90CD4C';
                    } else if (selectedColor === '2') {
                        avatarResponse = '#800000';
                    }

                    jsPsych.data.addProperties({ avatarResponse });
                    jsPsych.data.addProperties({ isSecondTime: isSecondTime });
                    console.log(isSecondTime + 'this is secondtime')
                    console.log(avatarResponse);
                    
                    jsPsych.finishTrial({ response: selectedColor });
                });
            });
        }
    };
}
/*
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
                </div>`,

                `<div class='parent'>
                <p> For both games, you'll earn points. </p>
                <p>Each point is worth 2 cents in bonus money. </p>
                You'll keep all the bonus money you earn on top of the $X you earn for your participation. </p>
                <p>To maximize your earnings, earn as many points as possible!</p>
                </div>`
                ],

                part2: [
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

                part3: [
                `<div class='parent'>
                <p>The outer ${textNew.shape1} will activate\u2014or not\u2014${textNew.group}. </p> 
                <p>If the outer ${textNew.shape1} ${textNew.groupAgain} activates, it will look like this, otherwise it will turn gray. </p> 
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
                <p> You'll see one of four possible outcomes depending on: </p> <p> (i) whether you activate the inner ${textNew.shape1} and </p> <p>and (ii) whether the outer ${textNew.shape1} ${textNew.groupAgain} activates. </p><p></p>
                <div id="shape-wrapper" style="display: flex; gap: 40px; justify-content: center; align-items: center; margin-bottom: 50px;">

            <div class="game-container" style="display: flex; flex-direction: column; align-items: center; text-align: center;",>
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
soloPage: [
    `<div class='specialOnly'>
        <p>You'll earn points based on these rules. Remember that each point is worth 2 cents. </p> 
        <div id="shape-wrapper" style="display: flex; justify-content: center;">
        <div class="table-container">
            <table style="border-collapse: collapse; text-align: center;">
                <!-- First row: Empty first column, Shapes start from the second column -->
                <tr>
                    <td style="padding: 10px;"></td> <!-- Empty first column -->
                    <td style="padding: 10px;">
                        <div class="outer-container">
                            <div id="outer-shape" class="${textNew.shape1}" 
                                 style="background-color: ${textNew.color}; width: 100px; height: 100px;">
                                <div id="inner-shape" class="${textNew.shape1}" 
                                     style="background-color: {{avatarResponse}}; width: 66px; height: 66px; margin: auto;"></div>
                            </div>
                        </div>
                    </td>
                    <td style="padding: 10px;">
                        <div class="outer-container">
                            <div id="outer-shape" class="${textNew.shape1}" 
                                 style="background-color: grey; width: 100px; height: 100px;">
                                <div id="inner-shape" class="${textNew.shape1}" 
                                     style="background-color: {{avatarResponse}}; width: 66px; height: 66px; margin: auto;"></div>
                            </div>
                        </div>
                    </td>
                    <td style="padding: 10px;">
                        <div class="outer-container">
                            <div id="outer-shape" class="${textNew.shape1}" 
                                 style="background-color: ${textNew.color}; width: 100px; height: 100px;">
                                <div id="inner-shape" class="${textNew.shape1}" 
                                     style="background-color: grey; width: 66px; height: 66px; margin: auto;"></div>
                            </div>
                        </div>
                    </td>
                    <td style="padding: 10px;">
                        <div class="outer-container">
                            <div id="outer-shape" class="${textNew.shape1}" 
                                 style="background-color: grey; width: 100px; height: 100px;">
                                <div id="inner-shape" class="${textNew.shape1}" 
                                     style="background-color: grey; width: 66px; height: 66px; margin: auto;"></div>
                            </div>
                        </div>
                    </td>
                </tr>

                <!-- Row with points -->
                <tr>
                    <td></td> <!-- Empty first column -->
                    <td><b>+8</b></td>
                    <td><b>${textNew.WL}</b></td>
                    <td><b>+4</b></td>
                    <td><b>${textNew.LL}</b></td>
                </tr>
            </table>
        </div>
    </div>
      <p style="text-align: center; margin-top: 20px; margin-bottom: 50px; "><b>Please take a moment to memorize these rules.</b></p>`
],
groupPage: [
`<div class='parent'>
        <p>You'll earn points based on these rules. Remember that each point is worth 2 cents.</p> 
        <div id="shape-wrapper" style="display: flex; justify-content: center;">
        <div class="table-container" style="display: block; clear: both;">
            <table style="border-collapse: collapse; text-align: center;">
                <!-- First row: Empty first column, Shapes start from the second column -->
                <tr>
                    <td style="padding: 10px;"></td> <!-- Empty first column -->
                    <td style="padding: 10px;">
                        <div class="outer-container">
                            <div id="outer-shape" class="${textNew.shape1}" 
                                 style="background-color: ${textNew.color}; width: 100px; height: 100px;">
                                <div id="inner-shape" class="${textNew.shape1}" 
                                     style="background-color: {{avatarResponse}}; width: 66px; height: 66px; margin: auto;"></div>
                            </div>
                        </div>
                    </td>
                    <td style="padding: 10px;">
                        <div class="outer-container">
                            <div id="outer-shape" class="${textNew.shape1}" 
                                 style="background-color: grey; width: 100px; height: 100px;">
                                <div id="inner-shape" class="${textNew.shape1}" 
                                     style="background-color: {{avatarResponse}}; width: 66px; height: 66px; margin: auto;"></div>
                            </div>
                        </div>
                    </td>
                    <td style="padding: 10px;">
                        <div class="outer-container">
                            <div id="outer-shape" class="${textNew.shape1}" 
                                 style="background-color: ${textNew.color}; width: 100px; height: 100px;">
                                <div id="inner-shape" class="${textNew.shape1}" 
                                     style="background-color: grey; width: 66px; height: 66px; margin: auto;"></div>
                            </div>
                        </div>
                    </td>
                    <td style="padding: 10px;">
                        <div class="outer-container">
                            <div id="outer-shape" class="${textNew.shape1}" 
                                 style="background-color: grey; width: 100px; height: 100px;">
                                <div id="inner-shape" class="${textNew.shape1}" 
                                     style="background-color: grey; width: 66px; height: 66px; margin: auto;"></div>
                            </div>
                        </div>
                    </td>
                </tr>

                <!-- Second row: Points with avatar 3 -->
                <tr>
                    <td rowspan="1" style="padding: 2px; vertical-align: middle;">
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <img src="{{avatar1}}" style="width: 80px; height: auto;">
                            <span style="font-size: 12px; font-weight: bold;">(you)</span>
                        </div>
                    </td>
                    <td><b>+8</b></td>
                    <td><b>${textNew.WL}</b></td>
                    <td><b>+4</b></td>
                    <td><b>${textNew.LL}</b></td>
                </tr>

                <!-- Third row: Points with avatar 4 -->
                <tr>
                    <td rowspan="1" style="padding: 2px; vertical-align: middle; text-align: left;">
                        <div style="display: flex; flex-direction: column; align-items: center;">
                            <img src="./avatar/4.jpg" style="width: 80px; height: auto;">
                            <span style="font-size: 12px; font-weight: bold;">(your partner)</span>
                        </div>
                    </td>
                    <td><b>+8</b></td>
                    <td><b>${textNew.WL}</b></td>
                    <td><b>+4</b></td>
                    <td><b>${textNew.LL}</b></td>
                </tr>
            </table>
        </div>
    </div>
          <div style="margin-top: 20px; margin-bottom: 50px; text-align: center; width: 100%; display: block; clear: both;">
       <p style="font-size: 18px; font-weight: bold;">Please take a moment to memorize these rules.</p>
</div>`
]
            }
        };

    // constructor function for round 1 comprehension check loop
function MakeLoop(group, round, attnChkDiv) {


        const correctAnswers = {
            attnChk0 : randomAssignment % 2 === 1 ? `Random chance` : `My partner's performance`, 
            attnChk1 : `My performance`, 
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
    let selectedAvatar = avatarChoices.find(avatar => avatar.code === avatarResponse);
    let selectedAvatarImg = selectedAvatar ? selectedAvatar.img : null;
    let attnChkDiv = randomAssignment % 2 === 1 ? `parent` : `attnChkGrp`;

    const sologroupPages = (randomAssignment % 2 === 1) ? pages.r1.soloPage : pages.r1.groupPage;

       let preambleText = `
        <div class='${attnChkDiv}'> 
            <p> To recap, in the ${textNew.game1}: </p>
            <p> The outer ${textNew.shape1} is activated depending on ${textNew.groupNext}. </p> 
            <p> You activate the inner ${textNew.shape1} with your SPACE BAR. </p>

    `;

    // Replace placeholders in sologroupPages
    const updatedPages = sologroupPages.map(page => 
        page
            .replace(/{{avatarResponse}}/g, avatarResponse)
            .replace(/{{avatar1}}/g, selectedAvatarImg)
            .replace(/Please take a moment to memorize these rules/g, `Before you continue, please answer the following questions`)
            .replace(/specialOnly/g, `special`)
    ).join(""); // Join all the updated HTML sections into a single string

    // Append the updated pages inside a new div to ensure layout stacking
    preambleText += `
            ${updatedPages}
            </div>` 
/*
    // Check if the `updatedPages` is `groupPage` and apply styles
    if (sologroupPages === pages.r1.groupPage) {
        preambleText += `
            <style>
                .group-page #jspsych-survey-multi-choice-form {
                    margin-top: 470px;
                }
            </style>
        `;
    }
*/
    return preambleText;
},
            questions: [
                {
                    prompt: `What determines how the outer ${textNew.shape1} is activated?`, 
                    name: `attnChk0`, 
                    options: ['My performance', `My partner's performance`,'Random chance'],
                },
                {
                    prompt: `What determines how the inner ${textNew.shape1} is activated?`,
                    name: `attnChk1`, 
                    options: ['My performance', `My partner's performance`, 'Random chance'],
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

function escapeRegExp(string) {
    return string.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, '\\$&'); // Escape special characters
}

function makeIntroPart2(isSecondTime) {
    return {
        type: jsPsychInstructions,
        pages: () => {
            const isSecondTime = jsPsych.data.get().last(1).values()[0].isSecondTime;
            const avatarResponse = jsPsych.data.get().filter({trial_type: 'html-button-response'}).last(1).values()[0].avatarResponse; 

            const updatedPages = pages.r1.part2.map(page => {
                let updatedPage = page.replace(/{{avatarResponse}}/g, avatarResponse);
                
                // Only replace "first" → "second" and game1 → game2 if isSecondTime is true
                if (isSecondTime) {
                    updatedPage = updatedPage
                    .replace("first", "second")
                        .replace(new RegExp(escapeRegExp(textNew.game1), 'g'), textNew.game2) // Use escapeRegExp for safe replacement
                        .replace(new RegExp(escapeRegExp(textNew.shape1), 'g'), textNew.shape2); // Use escapeRegExp for safe replacement
     
                }

                return updatedPage;
            });

            return updatedPages;
        },
        show_clickable_nav: true,
        post_trial_gap: 500,
    };
}


function makeR1Part3(isSecondTime) {
    return {
        type: jsPsychInstructions,
        pages: () => {
            const isSecondTime = jsPsych.data.get().last(1).values()[0].isSecondTime;
            const avatarResponse = jsPsych.data.get().filter({trial_type: 'html-button-response'}).last(1).values()[0].avatarResponse; 

            const updatedPages = pages.r1.part3.map(page => {
                let updatedPage = page.replace(/{{avatarResponse}}/g, avatarResponse);
                
                // Only replace "first" → "second" and game1 → game2 if isSecondTime is true
                if (isSecondTime) {
                    updatedPage = updatedPage
                    .replace("first", "second")
                        .replace(new RegExp(escapeRegExp(textNew.game1), 'g'), textNew.game2) // Use escapeRegExp for safe replacement
                        .replace(new RegExp(escapeRegExp(textNew.shape1), 'g'), textNew.shape2) // Use escapeRegExp for safe replacement
                        .replace(new RegExp(escapeRegExp(textNew.group), 'g'), textNew.group2) // Use escapeRegExp for safe replacement
                        .replace(new RegExp(escapeRegExp(textNew.groupNext), 'g'), textNew.groupNext2)
                        .replace(new RegExp(escapeRegExp(textNew.color), 'g'), textNew.color2) // Use escapeRegExp for safe replacement
                        .replace(new RegExp(escapeRegExp(textNew.groupAgain), 'g'), textNew.groupAgain2); // Use escapeRegExp for safe replacement
 
     
                }

                return updatedPage;
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
            let lastTrial = jsPsych.data.get().filter({trial_type: 'html-button-response'}).last(1).values()[0];
            let avatarResponse = lastTrial.avatarResponse; 
            let selectedAvatar = avatarChoices.find(avatar => avatar.code === avatarResponse);
            let selectedAvatarImg = selectedAvatar ? selectedAvatar.img : null;

            const sologroupPages = (randomAssignment % 2 === 1) ? pages.r1.soloPage : pages.r1.groupPage;
            console.log(sologroupPages)

            const updatedPages = sologroupPages.map(page => {
                return page
                    .replace(/{{avatarResponse}}/g, avatarResponse)  // Replace with the actual color
                    .replace(/{{avatar1}}/g, selectedAvatarImg);  // Replace with the actual avatar image
            });

            return updatedPages;
        },      
        show_clickable_nav: true,
        post_trial_gap: 500,
    };
}

    p.intro.r1check = new MakeLoop('R1', 'Solo', 'textNew.attnChkClass');

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

/*
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
}; */

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

/*
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
};*/

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
        introR1Part3 = makeR1Part3(),
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

    p.intro.r1part3 = {
        timeline: [introR1Part3],
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

    const FlowScale = ['0<br>Not at all', '1<br>', '2<br>', '3<br>', '4<br>', '5<br>', '6<br>', '7<br>','8<br>Extremely'];
    
p.flowMeasure = {
    type: jsPsychSurveyLikert,
    preamble: `<div style='padding-top: 50px; width: 900px; font-size:16px'> 
            <p> Throughout the ${textNew.game1}, to what extent did you feel immersed 
        and engaged in what you were doing? 
        <p>To report how immersed and engaged you felt, please answer the following questions.</p>
            </div>`,
    questions: [
        // Update the questions with the dynamic round text
            {
                prompt: `How immersed did you feel playing the ${textNew.game1}?`,
                name: `flow_0`,
                labels: FlowScale,
                required: true,
            },
            {
                prompt: `How engaged did you feel playing the ${textNew.game1}?`,
                name: `flow_1`,
                labels: FlowScale,
                required: true,
            },
            {
                prompt: `How engrossed did you feel playing the ${textNew.game1}?`,
                name: `flow_2`,
                labels: FlowScale,
                required: true,
            },
            {
                prompt: `How absorbed did you feel playing the ${textNew.game1}?`,
                name: `flow_3`,
                labels: FlowScale,
                required: true,
            },
            {
                prompt: `How bored did you feel playing the ${textNew.game1}?`,
                name: `flow_4`,
                labels: FlowScale,
                required: true,
            },
        ],
    randomize_question_order: false,
    scale_width: 600,
    on_finish: () => {
        isSecondTime = true;
        jsPsych.data.addProperties({ isSecondTime: isSecondTime });
        console.log(isSecondTime)
    }
};



    /*

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
    }; */


const html = {        
    postTask: [
            `<div class='parent'>
                <p>Thank you!</p>
                <p>To finish this study, please continue to answer a few final questions.</p>
            </div>`
        ]
}


 p.demographics = (function() {


        const taskComplete = {
            type: jsPsychInstructions,
            pages: html.postTask,
            show_clickable_nav: true,
            post_trial_gap: 500,
        };

        const gender = {
            type: jsPsychHtmlButtonResponse,
            stimulus: '<p>What is your gender?</p>',
            choices: ['Male', 'Female', 'Other'],
            on_finish: (data) => {
                data.gender = data.response;
            }
        };

        const age = {
            type: jsPsychSurveyText,
            questions: [{prompt: "Age:", name: "age"}],
            on_finish: (data) => {
                saveSurveyData(data); 
            },
        }; 

        const ethnicity = {
            type: jsPsychHtmlButtonResponse,
            stimulus: '<p>What is your race?</p>',
            choices: ['White / Caucasian', 'Black / African American','Asian / Pacific Islander', 'Hispanic', 'Native American', 'Other'],
            on_finish: (data) => {
                data.ethnicity = data.response;
            }
        };

        const english = {
            type: jsPsychHtmlButtonResponse,
            stimulus: '<p>Is English your native language?:</p>',
            choices: ['Yes', 'No'],
            on_finish: (data) => {
                data.english = data.response;
            }
        };  

        const finalWord = {
            type: jsPsychSurveyText,
            questions: [{prompt: "Questions? Comments? Complaints? Provide your feedback here!", rows: 10, columns: 100, name: "finalWord"}],
            on_finish: (data) => {
                saveSurveyData(data); 
            },
        }; 

        const pid = {
            type: jsPsychSurveyText,
            questions: [{prompt: "Please enter your Prolific ID in the space below to receive payment.", rows: 1, columns: 50, name: "pid"}],
            on_finish: (data) => {
                saveSurveyData(data); 
            },
        }; 

        const demos = {
            timeline: [taskComplete, gender, age, ethnicity, english, finalWord, pid]
        };

        return demos;

    }());


    return p;

}());
