/**
 * jspsych-html-slider-response
 * a jspsych plugin for free response survey questions
 *
 * Josh de Leeuw
 *
 * adapted by Salvador Mascarenhas
 * further adapted by Nadine Bade
 *
 * documentation: docs.jspsych.org
 *
 */


jsPsych.plugins['html-slider-response'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'html-slider-response',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The HTML string to be displayed'
      },
      slider_delay: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'slider delay',
        default: null,
        description: 'Delay until slider is shown.'
      },
      container_delay: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'container delay',
        default: null,
        description: 'Delay until container is shown.'
      },
      button_delay: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'button delay',
        default: null,
        description: 'Delay until button is shown.'
      },
      min: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Min slider',
        default: 0,
        description: 'Sets the minimum value of the slider.'
      },
      max: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Max slider',
        default: 100,
        description: 'Sets the maximum value of the slider',
      },
      start: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Slider starting value',
        default: 50,
        description: 'Sets the starting value of the slider',
      },
      step: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Step',
        default: 1,
        description: 'Sets the step of the slider'
      },
      labels: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        pretty_name:'Labels',
        default: [],
        array: true,
        description: 'Labels of the slider.',
      },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        array: false,
        description: 'Label of the button to advance.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the slider.'
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide the stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show the trial.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when user makes a response.'
      },
    }
  }

  plugin.trial = function(display_element, trial) {

    var html = '<div id="masc-html-slider-response-wrapper" style="margin: 30px 0px;">';
    html += '<div id="masc-html-slider-response-stimulus">' + trial.stimulus + '</div>';
    html += '<div id="masc-html-slider-response-container-slider" class="masc-html-slider-response-container" style="position:relative;">';
    html += '<div class="masc-html-slider-response-value" id="html-slider-response-value">' + trial.start + '</div>';
    html += '<input type="range" value="'+trial.start+'" min="'+trial.min+'" max="'+trial.max+'" step="'+trial.step+'" style="width: 100%;" id="jspsych-html-slider-response-response"></input>';
    html += '<div>';
    for(var j=0; j < trial.labels.length; j++){
      var width = 100/(trial.labels.length-1);
      var left_offset = (j * (100 /(trial.labels.length - 1))) - (width/2);
      html += '<div style="display: inline-block; position: absolute; left:'+left_offset+'%; text-align: center; width: '+width+'%;">';
      html += '<span style="text-align: center; font-size: 80%;">'+trial.labels[j]+'</span>';
      html += '</div>';
    }
    html += '</div>';
    html += '</div>';
    html += '</div>';
    
    if (trial.prompt !== null){
      html += trial.prompt;
    }

    // add submit button
    html += '<button id="jspsych-html-slider-response-next" class="jspsych-btn">'+trial.button_label+'</button>';

    display_element.innerHTML = html;

// add delay options

    document.getElementById("masc-html-slider-response-stimulus").style.visibility = "hidden";
    document.getElementById("masc-html-slider-response-container-slider").style.visibility = "hidden";
    document.getElementById("jspsych-html-slider-response-next").style.visibility = "hidden";
 
  
    if (trial.slider_delay !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#masc-html-slider-response-stimulus').style.visibility = "visible";
      }, trial.slider_delay);
    } else { display_element.querySelector('#masc-html-slider-response-stimulus').style.visibility = "visible"; }

    if (trial.container_delay !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#masc-html-slider-response-container-slider').style.visibility = "visible";
      }, trial.container_delay);
    } else { display_element.querySelector('#masc-html-slider-response-container-slider').style.visibility = "visible"; }

    if (trial.container_delay !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-html-slider-response-next').style.visibility = "visible";
      }, trial.container_delay);
    } else { display_element.querySelector('#jspsych-html-slider-response-next').style.visibility = "visible"; }
  

    // SM: set up value display
    var theSlider = display_element.querySelector('input[type="range"]');

    var sliderValueUpdater = function () {
      var sliderValue = display_element.querySelector('#html-slider-response-value');
      var newValue = theSlider.value + "";
      sliderValue.innerHTML = newValue;
    };

    theSlider.addEventListener("input", sliderValueUpdater);

    if (trial.require_movement == true) {
      document.getElementById("jspsych-html-slider-response-next").disabled = true;

      theSlider.addEventListener("click", buttonUpdater);
      theSlider.addEventListener("change", buttonUpdater);
    }

    function buttonUpdater () {
      document.getElementById("jspsych-html-slider-response-next").disabled =
        false;
    };

    var response = {
      rt: null,
      response: null
    };

    display_element.querySelector('#jspsych-html-slider-response-next').addEventListener('click', function() {
      // measure response time
      var endTime = (new Date()).getTime();
      response.rt = endTime - startTime;
      response.response = display_element.querySelector('#jspsych-html-slider-response-response').value;

      if(trial.response_ends_trial){
        end_trial();
      } else {
        display_element.querySelector('#jspsych-html-slider-response-next').disabled = true;
      }

    });

    function end_trial(){

      clicks = parseInt(document.getElementById("clicks").innerHTML)

      selected = document.querySelector('input[name="switch-one"]:checked').value;

      jsPsych.pluginAPI.clearAllTimeouts();

      // save data
      var trialdata = {
        "rt": response.rt,
        "responses": response.response,
        "clicks": clicks,
        "button_response": selected,
        // "stimulus": trial.stimulus
      };

      display_element.innerHTML = '';

      // next trial
      jsPsych.finishTrial(trialdata);
    }

    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-html-slider-response-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }

    var startTime = (new Date()).getTime();
  };

  return plugin;
})();
