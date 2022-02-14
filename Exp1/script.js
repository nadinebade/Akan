/* create timeline */
var timeline = [];

// create project name

var projectName = "Akan-exp1";

// generate random sequence of 10 characters as subject ID
var theSubject = jsPsych.randomization.randomID(10);

// and add it to the data being saved
jsPsych.data.addProperties({ subjectId: theSubject });
jsPsych.data.addProperties({ group_name: list });

var audio = ['audio/filler_1_1.mp3', 'audio/filler_1_2.mp3', 'audio/filler_1_3.mp3','audio/filler_1_4.mp3','audio/filler_1_5.mp3', 'audio/filler_2_1.mp3', 'audio/filler_2_2.mp3', 'audio/filler_2_3.mp3', 'audio/filler_3_1.mp3', 'audio/filler_3_2.mp3', 'audio/filler_3_3.mp3', 'audio/filler_3_4.mp3','audio/filler_3_5.mp3','audio/filler_3_6.mp3', 'audio/item_1_1.mp3','audio/item_1_2.mp3', 'audio/item_1_3.mp3', 'audio/item_1_4.mp3', 'audio/item_1_5.mp3', 'audio/item_1_6.mp3','audio/item_1_7.mp3', 'audio/item_1_8.mp3', 'audio/item_1_9.mp3', 'audio/item_1_10.mp3', 'audio/item_1_11.mp3', 'audio/item_1_12.mp3', 'audio/item_2_1.mp3', 'audio/item_2_2.mp3', 'audio/item_2_3.mp3', 'audio/item_2_4.mp3', 'audio/item_2_5.mp3', 'audio/item_2_6.mp3', 'audio/item_2_7.mp3', 'audio/item_2_8.mp3', 'audio/item_2_9.mp3', 'audio/item_2_10.mp3', 'audio/item_2_11.mp3', 'audio/item_2_12.mp3', 'audio/item_3_1.mp3', 'audio/item_3_2.mp3', 'audio/item_3_3.mp3', 'audio/item_3_4.mp3', 'audio/item_3_5.mp3', 'audio/item_3_6.mp3', 'audio/item_3_7.mp3', 'audio/item_3_8.mp3', 'audio/item_3_9.mp3', 'audio/item_3_10.mp3', 'audio/item_3_11.mp3', 'audio/item_3_12.mp3', 'audio/item_4_1.mp3', 'audio/item_4_2.mp3', 'audio/item_4_3.mp3', 'audio/item_4_4.mp3', 'audio/item_4_5.mp3', 'audio/item_4_6.mp3', 'audio/item_4_7.mp3', 'audio/item_4_8.mp3', 'audio/item_4_9.mp3', 'audio/item_4_10.mp3', 'audio/item_4_11.mp3', 'audio/item_4_12.mp3',];



function play() {
  var audio_intro = new Audio('audio/Intro.mp3');
  audio_intro.play();
};


// set up instructions, reading "instructions_text" from instructions.js
var instructions_block = {
  type: "instructions",
  show_clickable_nav: true,
  pages: instructions_text,
  data: { questionId: "instructions" }
};



// set up instoduction in Akan
var instructions_block2 = {
  type: "instructions",
  show_clickable_nav: true,
  pages: [
    'Welcome to our experiment! Click on "PLAY" to hear a description of the experiment in Akan. <p class = "center-content"><input type="button" value="PLAY" onclick="play()"></><p class = "center-content">Click "Next" to continue to further instructions.</>'
    ], 
  data: { questionId: "instructions" }
};

timeline.push(instructions_block2);
timeline.push(instructions_block);




var practice_block = {
type: "audio-slider-response",
stimulus: "audio/Training_Gram.mp3",
prompt: "<p>How confident are you that the sentence is uttered by a speaker of Akan?</p>",
    min: 1,
    max: 4,
    start: 1,
    labels: ["not very confident", "very confident"],
    step: 1
}

timeline.push(practice_block)

// set up instructions, reading "instructions_text" from instructions.js
var continue_block = {
  type: "instructions",
  show_clickable_nav: true,
  pages: continue_next,
  data: { questionId: "practice" }
};

timeline.push(continue_block);

var practice_block2 = {
  type: "audio-slider-response",
  stimulus: "audio/Training_Ungram.mp3",
  prompt: "<p>How confident are you that the sentence was uttered by a speaker of Akan?</p>",
      min: 1,
      max: 4,
      start: 1,
      labels: ["not at all confident", "very confident"],
      step: 1,
  }
  
  timeline.push(practice_block2)

  var continue_block2 = {
    type: "instructions",
    show_clickable_nav: true,
    pages: continue_next2,
    data: { questionId: "practice2" }
  };
  
  timeline.push(continue_block2);


// create a trial to assess an inference
var scale = {
    type: "audio-slider-response",
    stimulus: jsPsych.timelineVariable('audio'),
    require_movement: true,
    data: {
      id: jsPsych.timelineVariable('id'),
      sentence: jsPsych.timelineVariable('sentence'),
      type: jsPsych.timelineVariable('type'),
    },
    prompt: "<p>How confident are you that the sentence is uttered by a speaker of Akan?</p>",
    min: 1,
    max: 4,
    start: 1,
    labels: ["not at all confident", "very confident"],
    step: 1
  };

  var attention1 = {
    type: "audio-button-response",
    stimulus: 'audio/Attention_1_Question.mp3',
    choices: ['his mother', 'his sister', 'his brother'],
    prompt: "<p class='center-content'>Who did Kofi call?</p>"
  };

  var attention2 = {
    type: "audio-button-response",
    stimulus: 'audio/Attention_2_Question.mp3',
    choices: ['Ebo', 'Yaw', 'Mensah'],
    prompt: "<p class='center-content'>Who planted the seeds?</p>"
  };


  var comment = {
    type: "survey-text",
    name: "Comments",
    questions: [ {prompt:  'Why and how did you make your last choice?' } ],
    data: {
      id: jsPsych.timelineVariable('id'),
      sentence: jsPsych.timelineVariable('sentence'),
      type: jsPsych.timelineVariable('type'),
    }
  };


var test_procedure = {
  timeline: [scale, comment],
  timeline_variables: material,
  randomize_order: true,
  repetitions: 1
};

// var test_procedure2 = {
//   timeline: [test_procedure, attention1, attention2],
//   randomize_order: true,
//   repetitions: 1
// };




timeline.push(test_procedure);

timeline.push(attention2);
timeline.push(attention1);

// var critical_maker = function(material) {
//   var stimulus = material.audio 
//   var data = {
//     id: material.id,
//     expect: material.type,
//     nickname: material.sentence
//   };

//   return {stim: stimulus,
//           data: data};
// };


// var trial_maker = critical_maker;

// var stimuli_set = new Array;

// for (var i in material) {
//   stimuli_set.push(trial_creator(trial_maker(material[i])));
// }


// stimuli_set = jsPsych.randomization.shuffle(stimuli_set);


// for (var i in stimuli_set) {
//   timeline.push(stimuli_set[i]);
// }


// and this starts the experiment


// and this starts the experiment
jsPsych.init({
  timeline: timeline,
  show_progress_bar: true,
 on_finish: function(data){ SaveData(projectName,
                                     theSubject,
                                     jsPsych.data.get().csv);
                             $(".jspsych-content").html("<center><p>Thank you for completing the experiment.  <strong>Please enter the code below on Prolific.</strong></p></center></p></center><center><p> 60088B0F </p></center>"); }
//   on_finish: function(data){ jsPsych.data.displayData("json"); }
});
