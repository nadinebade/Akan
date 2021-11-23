// generate random sequence of 10 characters as subject ID
var theSubject = jsPsych.randomization.randomID(10);

// and add it to the data being saved
jsPsych.data.addProperties({ subjectId: theSubject });
jsPsych.data.addProperties({ group_name: "group1" });

var preload = {
  type: jsPsychPreload,
  auto_preload: true 
};

// set up instructions, reading "instructions_text" from instructions.js
var instructions_block = {
  type: "instructions",
  show_clickable_nav: true,
  pages: instructions_text,
  data: { questionId: "instructions" }
};

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

// set up consent form
var consent_block = {
  type: "consent-dec",
  data: { questionId: "consent" }
};

// create a trial to assess an inference
var trial_creator = function(stimulus) {
  return {
    type: "audio-slider-response",
    stimulus: stimulus.stim,
    require_movement: true,
    data: stimulus.data,
    min: 1,
    max: 4,
    start: 1,
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

var timeline = new Array;

timeline.push(preload);

timeline.push(consent_block);
timeline.push(instructions_block);
//timeline.push(trial_block);

for (var i in stimuli_set) {
  timeline.push(stimuli_set[i]);
}

timeline.push(demographics_block);

// and this starts the experiment
jsPsych.init({
  timeline: timeline,
  show_progress_bar: true,
  on_finish: function(data){ SaveData("possibility-modals-ii",
                                      theSubject,
                                      jsPsych.data.get().csv);
                             $(".jspsych-content").html("<center><p>Thank you for completing the experiment.  <strong>Please enter the code below into mTurk</strong>.  Your payment will be processed <strong>within 24 hours</strong>.</p></center><div class='jspsych-submit-code'>" + theSubject + "</div>");
                             }

});
