/* initialize jsPsych */
var jsPsych = initJsPsych({
    on_finish: function() {
        saveData(jsPsych.data.get().csv());
    }
});

function saveData(data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '../resources/write_data.php'); // 'write_data.php' is the path to the php file.
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({filedata: data}));
}

/* display data */
// var jsPsych = initJsPsych({
//     on_finish: function() {
//         jsPsych.data.displayData('csv');
//     }
// })


/* create timeline */
var timeline = [];

// generate random sequence of 10 characters as subject ID
var theSubject = jsPsych.randomization.randomID(10);

// and add it to the data being saved
jsPsych.data.addProperties({ subjectId: theSubject });
jsPsych.data.addProperties({ group_name: "group1" });

var audio = [
    'audio/filler_nf_1.mp3',
    'audio/filler_nf_2.mp3',
    'audio/filler_nf_3.mp3',
    'audio/filler_nf_4.mp3',
    'audio/filler_nf_5.mp3',
    'audio/filler_op_1.mp3',
    'audio/filler_op_2.mp3',
    'audio/filler_op_3.mp3',
    'audio/filler_ungr_1.mp3',
    'audio/filler_ungr_2.mp3',
    'audio/filler_ungr_3.mp3',
    'audio/filler_ungr_4.mp3',
    'audio/filler_ungr_5.mp3',
    'audio/filler_ungr_6.mp3',
    'audio/item1_pl_pl.mp3',
    'audio/item1_sg_sg.mp3',
    'audio/item1_sg_pl.mp3',
    'audio/item1_pl_sg.mp3',
    'audio/item2_pl_pl.mp3',
    'audio/item2_sg_sg.mp3',
    'audio/item2_sg_pl.mp3',
    'audio/item2_pl_sg.mp3',
    'audio/item3_pl_pl.mp3',
    'audio/item3_sg_sg.mp3',
    'audio/item3_sg_pl.mp3',
    'audio/item3_pl_sg.mp3',
    'audio/item4_pl_pl.mp3',
    'audio/item4_sg_sg.mp3',
    'audio/item4_sg_pl.mp3',
    'audio/item4_pl_sg.mp3',
    'audio/item5_sg_sg.mp3',
    'audio/item5_pl_pl.mp3',
    'audio/item5_sg_pl.mp3',
    'audio/item5_pl_sg.mp3',
    'audio/item6_sg_sg.mp3',
    'audio/item6_pl_pl.mp3',
    'audio/item6_sg_pl.mp3',
    'audio/item6_pl_sg.mp3',
    'audio/item7_sg_sg.mp3',
    'audio/item7_pl_pl.mp3',
    'audio/item7_sg_pl.mp3',
    'audio/item7_pl_sg.mp3',
    'audio/item8_sg_sg.mp3',
    'audio/item8_pl_pl.mp3',
    'audio/item8_sg_pl.mp3',
    'audio/item8_pl_sg.mp3',
    'audio/item9_sg_sg.mp3',
    'audio/item9_pl_pl.mp3',
    'audio/item9_sg_pl.mp3',
    'audio/item9_pl_sg.mp3',
    'audio/item10_sg_sg.mp3',
    'audio/item10_pl_pl.mp3',
    'audio/item10_sg_pl.mp3',
    'audio/item10_pl_sg.mp3',
    'audio/item11_sg_sg.mp3',
    'audio/item11_sg_pl.mp3',
    'audio/item11_pl_pl.mp3',
    'audio/item11_pl_sg.mp3',
    'audio/item12_sg_sg.mp3',
    'audio/item12_pl_pl.mp3',
    'audio/item12_sg_pl.mp3',
    'audio/item12_pl_sg.mp3'
];

/* preload audio */
var preload = {
    type: jsPsychPreload,
    audio: audio
};

timeline.push(preload);


function play() {
    var audio_intro = new Audio('audio/intro.mp3');
    audio_intro.play();
}


// set up instructions, reading "instructions_text" from instructions.js
var instructions_block = {
    type: jsPsychInstructions,
    show_clickable_nav: true,
    pages: instructions_text,
    data: { questionId: "instructions" }
};

// set up instoduction in Akan
var instructions_block2 = {
    type: jsPsychInstructions,
    show_clickable_nav: true,
    pages: [
        'Welcome to our experiment! Click on "PLAY" to hear a description of the experiment in Akan. <p class = "center-content"><input type="button" value="PLAY" onclick="play()"></><p class = "center-content">Click "Next" to continue to further instructions.</>'
    ],
    data: { questionId: "instructions" }
};

timeline.push(instructions_block2);
timeline.push(instructions_block);


var practice_block = {
    type: jsPsychAudioSliderResponse,
    stimulus: "audio/training_1.mp3",
    prompt: "<p>How good was the sentence in Akan?</p>",
    min: 1,
    max: 4,
    start: 1,
    labels: ["not at all good", "very good"],
    step: 1,
    response_allowed_while_playing: false,
};

timeline.push(practice_block);

// set up instructions, reading "instructions_text" from instructions.js
var continue_block = {
    type: jsPsychInstructions,
    show_clickable_nav: true,
    pages: continue_next,
    data: { questionId: "continue" }
};

timeline.push(continue_block);

var practice_block2 = {
    type: jsPsychAudioSliderResponse,
    stimulus: "audio/training_2.mp3",
    prompt: "<p>How good was the sentence in Akan?</p>",
    min: 1,
    max: 4,
    start: 1,
    labels: ["not at all good", "very good"],
    step: 1,
    response_allowed_while_playing: false,
};

timeline.push(practice_block2);

var continue_block2 = {
    type: jsPsychInstructions,
    show_clickable_nav: true,
    pages: continue_next2,
    data: { questionId: "practice2" }
};

timeline.push(continue_block2);

/* enable and select microphone */
var mic = {
    type: jsPsychInitializeMicrophone
};

timeline.push(mic);


// create a trial to assess an inference
var scale = {
    type: jsPsychAudioSliderResponse,
    stimulus: jsPsych.timelineVariable('audio'),
    data: {
      id: jsPsych.timelineVariable('id'),
      sentence: jsPsych.timelineVariable('sentence'),
      type: jsPsych.timelineVariable('type'),
    },
    prompt: "<p>How good was the sentence in Akan?</p>",
    min: 1,
    max: 4,
    start: 1,
    labels: ["not at all good", "very good"],
    step: 1,
    response_allowed_while_playing: false,
};

var attention1 = {
    type: jsPsychAudioButtonResponse,
    stimulus: "audio/attention_3.mp3",
    choices: ['his mother', 'his sister', 'his brother'],
    prompt: "<p class='center-content'>Who did Kofi call?</p>"
};

var attention2 = {
    type: jsPsychAudioButtonResponse,
    stimulus: "audio/attention_4.mp3",
    choices: ['Yaw', 'Ebo', 'Mensah'],
    prompt: "<p class='center-content'>Who planted the seeds?</p>"
};


// var comment = {
//   type: jsPsychSurveyText,
//   name: "Comments",
//   questions: [ {prompt:  'Why and how did you make your last choice?' } ],
//   data: {
//     id: jsPsych.timelineVariable('id'),
//     sentence: jsPsych.timelineVariable('sentence'),
//     type: jsPsych.timelineVariable('type'),
//   }
// };

var comment = {
    type: jsPsychHtmlAudioResponse,
    stimulus: "<p>How would you have said the last sentence in Akan? Use the 'Start' button to start the recording and the 'Stop' button to stop it. You can listen to your recording afterwards and re-record if necessary.</p>",
    recording_duration: 5000,
    start_recording_automatically: false,
    allow_playback: true
};

var test_procedure_first_block = {
    timeline: [scale, comment],
    timeline_variables: material_first_block,
    randomize_order: true,
    repetitions: 1
};

var test_procedure_second_block = {
    timeline: [scale, comment],
    timeline_variables: material_second_block,
    randomize_order: true,
    repetitions: 1
};

timeline.push(test_procedure_first_block);
timeline.push(attention1);

timeline.push(test_procedure_second_block);
timeline.push(attention2);


// set up outro, reading "outro_text" from text.js
var outro_block = {
  type: jsPsychInstructions,
  show_clickable_nav: false,
  pages: outro_text,
  data: { questionId: "outro" }
};

timeline.push(outro_block);


/* start the experiment */
jsPsych.run(timeline);
