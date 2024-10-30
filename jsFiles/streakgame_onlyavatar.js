// Define Stimuli

let p = {};

/*
let selectedAvatarColor = 'blue';

// Define the avatar selection task with shuffled images
const avatars = ['avatar/1.jpeg', 'avatar/2.jpeg', 'avatar/3.jpeg'];

const avatarChoices = [
    { color: 'Yellow', img: 'avatar/1.jpeg' },
    { color: 'Green', img: 'avatar/2.jpeg' },
    { color: 'Navy', img: 'avatar/3.jpeg' }
];

// Create the stimulus HTML for the avatars (without buttons)
const avatarImages = avatarChoices.map(choice => 
    `<img src="${choice.img}" style="width: 200px; height: 200px; margin: 0 10px;" alt="${choice.color}">`).join('');
*/
// Define the task
p.avatars = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `<div class='parent'>
               <p>Now, you'll choose the color of your avatar to play the game.</p>
               <p>Choose 1 avatar out of the 3 colors below:</p>
               <div class="avatar-selection" style="display: flex; justify-content: center;">
                    <img src="./avatar/avatarsAll.jpg">
               </div>
               </div>`,
    choices: ['Yellow', 'Green', 'Navy'],
    on_finish: (data) => {
        selectedColor = data.response;
        console.log(data.response);
/*
        let backgroundColor = '';
        if (selectedColor === 'Yellow') {
            backgroundColor = '#FFA827';
        } else if (selectedColor === 'Green') {
            backgroundColor = '#90CD4C';
        } else if (selectedColor === 'Navy') {
            backgroundColor = '#1E2B4D';
        } 

        updateStimColors(backgroundColor);

        const selectedChoice = avatarChoices.find(choice => choice.color === selectedColor);
        data.selected_avatar = selectedChoice ? selectedChoice.img : null;*/
    }
};

