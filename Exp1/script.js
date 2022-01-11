/* initialize jsPsych */
var jsPsych = initJsPsych({
  on_finish: function() {
    jsPsych.data.displayData();
  }
});

/* create timeline */
var timeline = [];

// generate random sequence of 10 characters as subject ID
var theSubject = jsPsych.randomization.randomID(10);

// and add it to the data being saved
jsPsych.data.addProperties({ subjectId: theSubject });
jsPsych.data.addProperties({ group_name: "group1" });

var audio = ['audio/Audio1.mp3', 'audio/Audio2.mp3', 'audio/Audio3.mp3', 'audio/Audio4.mp3', 'audio/Audio5.mp3', 'audio/Audio6.mp3'];

var preload = {
  type: jsPsychPreload,
  audio: audio 
};

timeline.push(preload);

// set up instructions, reading "instructions_text" from instructions.js
var instructions_block = {
  type: jsPsychInstructions,
  show_clickable_nav: true,
  pages: instructions_text,
  data: { questionId: "instructions" }
};

timeline.push(instructions_block);

var practice_block = {
type: jsPsychAudioSliderResponse,
stimulus: "audio/Audio1.mp3",
prompt: "<p>How confident are you that the sentence was uttered by a native speaker of Akan?</p>",
    min: 1,
    max: 4,
    start: 1,
    labels: ["not very confident", "very confident"],
    step: 1
}

timeline.push(practice_block)

// set up instructions, reading "instructions_text" from instructions.js
var continue_block = {
  type: jsPsychInstructions,
  show_clickable_nav: true,
  pages: continue_next,
  data: { questionId: "practice" }
};

timeline.push(continue_block);

var practice_block2 = {
  type: jsPsychAudioSliderResponse,
  stimulus: "audio/Audio6.mp3",
  prompt: "<p>How confident are you that the sentence was uttered by a native speaker of Akan?</p>",
      min: 1,
      max: 4,
      start: 1,
      labels: ["not very confident", "very confident"],
      step: 1,
  }
  
  timeline.push(practice_block2)

  var continue_block2 = {
    type: jsPsychInstructions,
    show_clickable_nav: true,
    pages: continue_next2,
    data: { questionId: "practice2" }
  };
  
  timeline.push(continue_block2);


// create a trial to assess an inference
var scale = {
    type: jsPsychAudioSliderResponse,
    stimulus: jsPsych.timelineVariable('audio'),
    require_movement: true,
    data: {
      id: jsPsych.timelineVariable('id'),
      sentence: jsPsych.timelineVariable('sentence'),
      type: jsPsych.timelineVariable('type'),
    },
    prompt: "<p>How confident are you that the sentence was uttered by a native speaker of Akan?</p>",
    min: 1,
    max: 4,
    start: 1,
    labels: ["not very confident", "very confident"],
    step: 1
  };


  var comment = {
    type: jsPsychSurveyText,
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

timeline.push(test_procedure);

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
jsPsych.run(timeline);
