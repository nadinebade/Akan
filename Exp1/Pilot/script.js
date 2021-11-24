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

// var trial_block = {
//   type: "instructions",
//   show_clickable_nav: true,
//   pages: practice_text,
//   data: { questionId: "practice"},
//   on_load: function () {
//     var theSlider = document.getElementById("jspsych-audio-slider-response-response");
//     var rangeBullet = document.getElementById("rs-bullet");

//     function sliderValueUpdater() {
//       rangeBullet.innerHTML = theSlider.value;
//       var bulletPosition = ((theSlider.value - 1)/(theSlider.max - 1));
//       rangeBullet.style.left = (bulletPosition * 478) + "px";
//     }

//     theSlider.addEventListener("input", sliderValueUpdater, false);
//   }
// }


// create a trial to assess an inference
var trial_creator = function(stimulus) {
  return {
    type: jsPsychAudioSliderResponse,
    stimulus: stimulus.stim,
    require_movement: true,
    data: stimulus.data,
    prompt: "<p>How likely was the sentence uttered by an Akan speaker?</p>",
    min: 1,
    max: 4,
    start: 1,
    labels: ["very unlikely", "very likely"],
    step: 1
  };
};

// these functions create the stimuli to be passed to inferenceCreator
// each of them corresponds to a different participants groups and a different
// format of inferences.

// allowed(A and B), A: B?
var critical_maker = function(material) {
  var stimulus = material.audio 
  var data = {
    id: material.id,
    expect: material.type,
    nickname: material.sentence
  };

  return {stim: stimulus,
          data: data};
};


var trial_maker = critical_maker;

var stimuli_set = new Array;

for (var i in material) {
  stimuli_set.push(trial_creator(trial_maker(material[i])));
}


stimuli_set = jsPsych.randomization.shuffle(stimuli_set);


for (var i in stimuli_set) {
  timeline.push(stimuli_set[i]);
}

timeline.push(demographics_block);

// and this starts the experiment
jsPsych.run(timeline);
