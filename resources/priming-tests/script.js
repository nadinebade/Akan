var timeline = [];

// uncomment one of the following functions to run the corresponding experiment
runExp1a();
// runExp1b();
// runExp1c(group=1);
// runExp1c(group=2);
// runExp1c(group=3);

function runExp1a() {
  // arguments: # of prime items, # of target probe items, # of control probe items, # of control items
  var generator_exp1a = new PrimingGeneratorExp1a(40, 12, 12, 24);
  generator_exp1a.generate();

  for (let i = 0; i < generator_exp1a.prime_items.length; i++) {
    var item = {
      type: "prime-images",
      target_sentence: generator_exp1a.prime_items[i].structure + generator_exp1a.prime_items[i].target_sentence,
      prompt: "<p>Exp 1a Prime item</p>",
      responses: ["Yes", "No", "Maybe"],
      images: generator_exp1a.prime_items[i].images,
      colors: generator_exp1a.prime_items[i].colors,
    };
  
    timeline.push(item);
  }
  
  for (let i = 0; i < generator_exp1a.probe_target_items.length; i++) {
    var item = {
      type: "prime-images",
      target_sentence: generator_exp1a.control_items[i*2].structure + generator_exp1a.control_items[i*2].target_sentence,
      prompt: "<p>Exp 1a Control item</p>",
      responses: ["Yes", "No", "Maybe"],
      images: generator_exp1a.control_items[i*2].images,
      colors: generator_exp1a.control_items[i*2].colors,
    };
  
    timeline.push(item);
  
    item = {
      type: "prime-images",
      target_sentence: generator_exp1a.probe_control_items[i].structure + generator_exp1a.probe_control_items[i].target_sentence,
      prompt: "<p>Exp 1a Probe Control item</p>",
      responses: ["Yes", "No", "Maybe"],
      images: generator_exp1a.probe_control_items[i].images,
      colors: generator_exp1a.probe_control_items[i].colors,
    };
  
    timeline.push(item);
  
    item = {
      type: "prime-images",
      target_sentence: generator_exp1a.control_items[i*2+1].structure + generator_exp1a.control_items[i*2+1].target_sentence,
      prompt: "<p>Exp 1a Control item</p>",
      responses: ["Yes", "No", "Maybe"],
      images: generator_exp1a.control_items[i*2+1].images,
      colors: generator_exp1a.control_items[i*2+1].colors,
    };
  
    timeline.push(item);
  
    item = {
      type: "prime-images",
      target_sentence: generator_exp1a.probe_target_items[i].structure + generator_exp1a.probe_target_items[i].target_sentence,
      prompt: "<p>Exp 1a Probe Target item</p>",
      responses: ["Yes", "No", "Maybe"],
      images: generator_exp1a.probe_target_items[i].images,
      colors: generator_exp1a.probe_target_items[i].colors,
    };
  
    timeline.push(item);
  }
}

function runExp1b() {
  // arguments: # of prime items, # of target probe items, # of control probe items, # of control items
  var generator_exp1b = new PrimingGeneratorExp1b(20, 12, 12, 24);
  generator_exp1b.generate();

  for (let i = 0; i < generator_exp1b.prime_items.length; i++) {
    var item = {
      type: "prime-images",
      target_sentence: generator_exp1b.prime_items[i].structure + generator_exp1b.prime_items[i].target_sentence,
      prompt: "<p>Exp 1b Prime item</p>",
      responses: ["Yes", "No", "Maybe"],
      images: generator_exp1b.prime_items[i].images,
      colors: generator_exp1b.prime_items[i].colors,
    };

    timeline.push(item);
  }

  for (let i = 0; i < generator_exp1b.probe_target_items.length; i++) {
    var item = {
      type: "prime-images",
      target_sentence: generator_exp1b.control_items[i*2].structure + generator_exp1b.control_items[i*2].target_sentence,
      prompt: "<p>Exp 1b Control item</p>",
      responses: ["Yes", "No", "Maybe"],
      images: generator_exp1b.control_items[i*2].images,
      colors: generator_exp1b.control_items[i*2].colors,
    };
  
    timeline.push(item);
  
    item = {
      type: "prime-images",
      target_sentence: generator_exp1b.probe_control_items[i].structure + generator_exp1b.probe_control_items[i].target_sentence,
      prompt: "<p>Exp 1b Probe Control item</p>",
      responses: ["Yes", "No", "Maybe"],
      images: generator_exp1b.probe_control_items[i].images,
      colors: generator_exp1b.probe_control_items[i].colors,
    };
  
    timeline.push(item);
  
    item = {
      type: "prime-images",
      target_sentence: generator_exp1b.control_items[i*2+1].structure + generator_exp1b.control_items[i*2+1].target_sentence,
      prompt: "<p>Exp 1b Control item</p>",
      responses: ["Yes", "No", "Maybe"],
      images: generator_exp1b.control_items[i*2+1].images,
      colors: generator_exp1b.control_items[i*2+1].colors,
    };
  
    timeline.push(item);
  
    item = {
      type: "prime-images",
      target_sentence: generator_exp1b.probe_target_items[i].structure + generator_exp1b.probe_target_items[i].target_sentence,
      prompt: "<p>Exp 1b Probe Target item</p>",
      responses: ["Yes", "No", "Maybe"],
      images: generator_exp1b.probe_target_items[i].images,
      colors: generator_exp1b.probe_target_items[i].colors,
    };
  
    timeline.push(item);
  }
}

function runExp1c(group) {
  // arguments: group #, # of prime items, # of target probe items, # of control probe items, # of control items
  var generator_exp1c = new PrimingGeneratorExp1c(group, 20, 12, 12, 24);
  generator_exp1c.generate();

  for (let i = 0; i < generator_exp1c.prime_items.length; i++) {
    var item = {
      type: "prime-images",
      target_sentence: generator_exp1c.prime_items[i].structure + generator_exp1c.prime_items[i].target_sentence,
      prompt: "<p>Exp 1c Prime item</p>",
      responses: ["Yes", "No", "Maybe"],
      images: generator_exp1c.prime_items[i].images,
      colors: generator_exp1c.prime_items[i].colors,
    };

    timeline.push(item);
  }

  for (let i = 0; i < generator_exp1c.probe_target_items.length; i++) {
    var item = {
      type: "prime-images",
      target_sentence: generator_exp1c.control_items[i*2].structure + generator_exp1c.control_items[i*2].target_sentence,
      prompt: "<p>Exp 1c Control item</p>",
      responses: ["Yes", "No", "Maybe"],
      images: generator_exp1c.control_items[i*2].images,
      colors: generator_exp1c.control_items[i*2].colors,
    };
  
    timeline.push(item);
  
    item = {
      type: "prime-images",
      target_sentence: generator_exp1c.probe_control_items[i].structure + generator_exp1c.probe_control_items[i].target_sentence,
      prompt: "<p>Exp 1c Probe Control item</p>",
      responses: ["Yes", "No", "Maybe"],
      images: generator_exp1c.probe_control_items[i].images,
      colors: generator_exp1c.probe_control_items[i].colors,
    };
  
    timeline.push(item);
  
    item = {
      type: "prime-images",
      target_sentence: generator_exp1c.control_items[i*2+1].structure + generator_exp1c.control_items[i*2+1].target_sentence,
      prompt: "<p>Exp 1c Control item</p>",
      responses: ["Yes", "No", "Maybe"],
      images: generator_exp1c.control_items[i*2+1].images,
      colors: generator_exp1c.control_items[i*2+1].colors,
    };
  
    timeline.push(item);
  
    item = {
      type: "prime-images",
      target_sentence: generator_exp1c.probe_target_items[i].structure + generator_exp1c.probe_target_items[i].target_sentence,
      prompt: "<p>Exp 1c Probe Target item</p>",
      responses: ["Yes", "No", "Maybe"],
      images: generator_exp1c.probe_target_items[i].images,
      colors: generator_exp1c.probe_target_items[i].colors,
    };
  
    timeline.push(item);
  }
}

// in case you want to check each item once, call displayEachItem()
function displayEachItem() {
  let generator_exp1a = new PrimingGeneratorExp1a(8, 2, 4, 4);
  let generator_exp1b = new PrimingGeneratorExp1a(4, 2, 4, 2);
  let generator_exp1c = new PrimingGeneratorExp1c(1, 2, 2, 4, 4);

  timeline = [];

  // experiment 1a
  for (let i = 0; i < generator_exp1a.prime_items.length; i++) {
    var item = {
      type: "prime-images",
      target_sentence: generator_exp1a.prime_items[i].structure + generator_exp1a.prime_items[i].target_sentence,
      prompt: "<p>Exp 1a Prime item</p>",
      responses: ["Yes", "No", "Maybe"],
      images: generator_exp1a.prime_items[i].images,
      colors: generator_exp1a.prime_items[i].colors,
    };
  
    timeline.push(item);
  }
  
  for (let i = 0; i < generator_exp1a.probe_target_items.length; i++) {
    var item = {
      type: "prime-images",
      target_sentence: generator_exp1a.probe_target_items[i].structure + generator_exp1a.probe_target_items[i].target_sentence,
      prompt: "<p>Exp 1a Probe Target item</p>",
      responses: ["Yes", "No", "Maybe"],
      images: generator_exp1a.probe_target_items[i].images,
      colors: generator_exp1a.probe_target_items[i].colors,
    };

    timeline.push(item);
  }

  for (let i = 0; i < generator_exp1a.probe_control_items.length; i++) {
    var item = {
      type: "prime-images",
      target_sentence: generator_exp1a.probe_control_items[i].structure + generator_exp1a.probe_control_items[i].target_sentence,
      prompt: "<p>Exp 1a Probe Control item</p>",
      responses: ["Yes", "No", "Maybe"],
      images: generator_exp1a.probe_control_items[i].images,
      colors: generator_exp1a.probe_control_items[i].colors,
    };

    timeline.push(item);
  }

  for (let i = 0; i < generator_exp1a.control_items.length; i++) {
    var item = {
      type: "prime-images",
      target_sentence: generator_exp1a.control_items[i].structure + generator_exp1a.control_items[i].target_sentence,
      prompt: "<p>Exp 1a Control item</p>",
      responses: ["Yes", "No", "Maybe"],
      images: generator_exp1a.control_items[i].images,
      colors: generator_exp1a.control_items[i].colors,
    };

    timeline.push(item);
  }

  // experiment 1b
  for (let i = 0; i < generator_exp1b.prime_items.length; i++) {
    var item = {
      type: "prime-images",
      target_sentence: generator_exp1b.prime_items[i].structure + generator_exp1b.prime_items[i].target_sentence,
      prompt: "<p>Exp 1b Prime item</p>",
      responses: ["Yes", "No", "Maybe"],
      images: generator_exp1b.prime_items[i].images,
      colors: generator_exp1b.prime_items[i].colors,
    };

    timeline.push(item);
  }

  for (let i = 0; i < generator_exp1b.control_items.length; i++) {
    var item = {
      type: "prime-images",
      target_sentence: generator_exp1b.control_items[i].structure + generator_exp1b.control_items[i].target_sentence,
      prompt: "<p>Exp 1b Control item</p>",
      responses: ["Yes", "No", "Maybe"],
      images: generator_exp1b.control_items[i].images,
      colors: generator_exp1b.control_items[i].colors,
    };

    timeline.push(item);
  }

  // experiment 1c
  for (let i = 0; i < generator_exp1c.prime_items.length; i++) {
    var item = {
      type: "prime-images",
      target_sentence: generator_exp1c.prime_items[i].structure + generator_exp1c.prime_items[i].target_sentence,
      prompt: "<p>Exp 1c Prime item</p>",
      responses: ["Yes", "No", "Maybe"],
      images: generator_exp1c.prime_items[i].images,
      colors: generator_exp1c.prime_items[i].colors,
    };

    timeline.push(item);
  }

  for (let i = 0; i < generator_exp1c.probe_target_items.length; i++) {
    var item = {
      type: "prime-images",
      target_sentence: generator_exp1c.probe_target_items[i].structure + generator_exp1c.probe_target_items[i].target_sentence,
      prompt: "<p>Exp 1c Probe Target item</p>",
      responses: ["Yes", "No", "Maybe"],
      images: generator_exp1c.probe_target_items[i].images,
      colors: generator_exp1c.probe_target_items[i].colors,
    };

    timeline.push(item);
  }

  for (let i = 0; i < generator_exp1c.probe_control_items; i++) {
    var item = {
      type: "prime-images",
      target_sentence: generator_exp1c.probe_control_items[i].structure + generator_exp1c.probe_control_items[i].target_sentence,
      prompt: "<p>Exp 1c Probe Control item</p>",
      responses: ["Yes", "No", "Maybe"],
      images: generator_exp1c.probe_control_items[i].images,
      colors: generator_exp1c.probe_control_items[i].colors,
    };

    timeline.push(item);
  }

  for (let i = 0; i < generator_exp1c.control_items.length; i++) {
    var item = {
      type: "prime-images",
      target_sentence: generator_exp1c.control_items[i].structure + generator_exp1c.control_items[i].target_sentence,
      prompt: "<p>Exp 1c Control item</p>",
      responses: ["Yes", "No", "Maybe"],
      images: generator_exp1c.control_items[i].images,
      colors: generator_exp1c.control_items[i].colors,
    };

    timeline.push(item);
  }
}

// To see this change timeline below to [feedback_test]
// var feedback_test = {
//   type: "prime-images",
//   target_sentence: "<p>Things and stuff.</p>",
//   target_sentence_type: "cool_target",
//   responses: ["Yes", "For sure"],
//   prompt: "<p>Pick an answer, please.</p>",
//   images: generator_exp1a.probe_target_items[0].images,
//   colors: generator_exp1a.probe_target_items[0].colors,
//   feedback_function: function(a, b, c, d) {
//     console.log("Participant saw images " + a + " in colors " + b + ", for sentence-type " + c + ".  They responded with " + d + ".");
//     return "Feedback here, see console!"; }
// };

jsPsych.init({
  timeline: timeline,
  on_finish: function(data) {
    jsPsych.data.displayData();
  }
});
