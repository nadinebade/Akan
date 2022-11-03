/**
 * plugin-audio-slider-response
 * Andreas Niemann
 *
 * Plugin for presenting an audio stimulus and getting an audio slider response.
 * Extends the originial plugin with the option to replay the audio.
 *
 **/

var jsPsychAudioSliderResponse = (function (jspsych) {
    'use strict';

    const info = {
        name: "audio-slider-response",
        parameters: {
            /** The audio file to be played. */
            stimulus: {
                type: jspsych.ParameterType.AUDIO,
                pretty_name: "Stimulus",
                default: undefined,
            },
            /** Sets the minimum value of the slider. */
            min: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Min slider",
                default: 0,
            },
            /** Sets the maximum value of the slider */
            max: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Max slider",
                default: 100,
            },
            /** Sets the starting value of the slider */
            slider_start: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Slider starting value",
                default: 50,
            },
            /** Sets the step of the slider */
            step: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Step",
                default: 1,
            },
            /** Array containing the labels for the slider. Labels will be displayed at equidistant locations along the slider. */
            labels: {
                type: jspsych.ParameterType.HTML_STRING,
                pretty_name: "Labels",
                default: [],
                array: true,
            },
            /** Width of the slider in pixels. */
            slider_width: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Slider width",
                default: null,
            },
            /** Label of the button to advance. */
            button_label: {
                type: jspsych.ParameterType.STRING,
                pretty_name: "Button label",
                default: "Continue",
                array: false,
            },
            /** EXTENSION: Label of the button to replay. */
            replay_button_label: {
                type: jspsych.ParameterType.STRING,
                default: "Play audio",
            },
            /** If true, the participant will have to move the slider before continuing. */
            require_movement: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Require movement",
                default: false,
            },
            /** Any content here will be displayed below the slider. */
            prompt: {
                type: jspsych.ParameterType.HTML_STRING,
                pretty_name: "Prompt",
                default: null,
            },
            /** EXTENSION: Time until prompt appears. */
            prompt_delay: {
                type: jspsych.ParameterType.INT,
                default: null,
            },
            /** EXTENSION: Time until button appears. */
            button_delay: {
                type: jspsych.ParameterType.INT,
                default: null,
            },
            /** How long to show the trial. */
            trial_duration: {
                type: jspsych.ParameterType.INT,
                pretty_name: "Trial duration",
                default: null,
            },
            /** If true, trial will end when user makes a response. */
            response_ends_trial: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Response ends trial",
                default: true,
            },
            /** If true, then the trial will end as soon as the audio file finishes playing. */
            trial_ends_after_audio: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Trial ends after audio",
                default: false,
            },
            /** If true, then responses are allowed while the audio is playing. If false, then the audio must finish playing before a response is accepted. */
            response_allowed_while_playing: {
                type: jspsych.ParameterType.BOOL,
                pretty_name: "Response allowed while playing",
                default: true,
            },
        },
    };
    /**
     * **audio-slider-response**
     *
     * jsPsych plugin for playing audio and getting a slider response
     *
     * @author Josh de Leeuw
     * @see {@link https://www.jspsych.org/plugins/jspsych-audio-slider-response/ audio-slider-response plugin documentation on jspsych.org}
     */
    class AudioSliderResponsePlugin {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
        }

        trial(display_element, trial, on_load) {
            // hold the .resolve() function from the Promise that ends the trial
            let trial_complete;
            // half of the thumb width value from jspsych.css, used to adjust the label positions
            var half_thumb_width = 7.5;
            // setup stimulus
            var context = this.jsPsych.pluginAPI.audioContext();
            // record webaudio context start time
            var startTime;
            // for storing data related to response
            var response;
            // load audio file
            this.jsPsych.pluginAPI
                .getAudioBuffer(trial.stimulus)
                .then((buffer) => {
                    if (context !== null) {
                        this.audio = context.createBufferSource();
                        this.audio.buffer = buffer;
                        this.audio.connect(context.destination);
                    }
                    else {
                        this.audio = buffer;
                        this.audio.currentTime = 0;
                    }
                    setupTrial();
                })
                .catch((err) => {
                console.error(`Failed to load audio file "${trial.stimulus}". Try checking the file path. We recommend using the preload plugin to load audio files.`);
                console.error(err);
            });

            const setupTrial = () => {
                // set up end event if trial needs it
                if (trial.trial_ends_after_audio) {
                    this.audio.addEventListener("ended", end_trial);
                }
                // enable slider after audio ends if necessary
                if (!trial.response_allowed_while_playing && !trial.trial_ends_after_audio) {
                    this.audio.addEventListener("ended", enable_slider);
                }
                var html = '<div id="jspsych-audio-slider-response-wrapper" style="margin: 100px 0px;">';

                /* EXTENSION: Place prompt above the slider */
                if (trial.prompt !== null) {
                    html += '<div id="jspsych-audio-slider-response-prompt" style="text-align: center">' + trial.prompt + "</div>";
                  }
                //

                html +=
                    '<div class="jspsych-audio-slider-response-container" style="position:relative; margin: 0 auto 3em auto; width:';
                if (trial.slider_width !== null) {
                    html += trial.slider_width + "px;";
                }
                else {
                    html += "auto;";
                }
                html += '">';
                html +=
                    '<input type="range" class="jspsych-slider" value="' +
                        trial.slider_start +
                        '" min="' +
                        trial.min +
                        '" max="' +
                        trial.max +
                        '" step="' +
                        trial.step +
                        '" id="jspsych-audio-slider-response-response"';
                if (!trial.response_allowed_while_playing) {
                    html += " disabled";
                }
                html += "></input><div>";
                for (var j = 0; j < trial.labels.length; j++) {
                    var label_width_perc = 100 / (trial.labels.length - 1);
                    var percent_of_range = j * (100 / (trial.labels.length - 1));
                    var percent_dist_from_center = ((percent_of_range - 50) / 50) * 100;
                    var offset = (percent_dist_from_center * half_thumb_width) / 100;
                    html +=
                        '<div style="border: 1px solid transparent; display: inline-block; position: absolute; ' +
                            "left:calc(" +
                            percent_of_range +
                            "% - (" +
                            label_width_perc +
                            "% / 2) - " +
                            offset +
                            "px); text-align: center; width: " +
                            label_width_perc +
                            '%;">';
                    html += '<span style="text-align: center; font-size: 80%;">' + trial.labels[j] + "</span>";
                    html += "</div>";
                }
                html += "</div>";
                html += "</div>";
                html += "</div>";

                /* EXTENSION: add replay button */
                html += '<button id="jspsych-audio-slider-response-replay" class="jspsych-btn" data-audio_is_playing="false">' + trial.replay_button_label + '</button>';
                //
                
                // add submit button
                var next_disabled_attribute = "";
                if (trial.require_movement || !trial.response_allowed_while_playing) {
                    next_disabled_attribute = "disabled";
                }
                html +=
                    '<button id="jspsych-audio-slider-response-next" class="jspsych-btn" ' +
                        next_disabled_attribute +
                        ">" +
                        trial.button_label +
                        "</button>";
                display_element.innerHTML = html;

                /* EXTENSION: delay for prompt and replay button */
                // prompt delay
                if (trial.prompt_delay !== null) {
                    document.getElementById("jspsych-audio-slider-response-prompt").style.visibility = "hidden";
                    jsPsych.pluginAPI.setTimeout(function() {
                        display_element.querySelector("#jspsych-audio-slider-response-prompt").style.visibility = "visible";
                    }, trial.prompt_delay);
                }

                // replay button delay
                if (trial.button_delay !== null) {
                    document.getElementById("jspsych-audio-slider-response-replay").style.visibility = "hidden";
                    jsPsych.pluginAPI.setTimeout(function() {
                        display_element.querySelector("#jspsych-audio-slider-response-replay").style.visibility = "visible";
                    }, trial.button_delay);
                }
                //

                response = {
                    rt: null,
                    response: null,
                };
                if (!trial.response_allowed_while_playing) {
                    display_element.querySelector("#jspsych-audio-slider-response-response").disabled = true;
                    display_element.querySelector("#jspsych-audio-slider-response-next").disabled = true;
                }
                if (trial.require_movement) {
                    const enable_button = () => {
                        display_element.querySelector("#jspsych-audio-slider-response-next").disabled = false;
                    };
                    display_element
                        .querySelector("#jspsych-audio-slider-response-response")
                        .addEventListener("mousedown", enable_button);
                    display_element
                        .querySelector("#jspsych-audio-slider-response-response")
                        .addEventListener("touchstart", enable_button);
                    display_element
                        .querySelector("#jspsych-audio-slider-response-response")
                        .addEventListener("change", enable_button);
                }
                display_element
                    .querySelector("#jspsych-audio-slider-response-next")
                    .addEventListener("click", () => {
                    // measure response time
                    var endTime = performance.now();
                    var rt = Math.round(endTime - startTime);
                    if (context !== null) {
                        endTime = context.currentTime;
                        rt = Math.round((endTime - startTime) * 1000);
                    }
                    response.rt = rt;
                    response.response = display_element.querySelector("#jspsych-audio-slider-response-response").valueAsNumber;
                    if (trial.response_ends_trial) {
                        end_trial();
                    }
                    else {
                        display_element.querySelector("#jspsych-audio-slider-response-next").disabled = true;
                    }
                });
                
                /* ORIGINAL: audio plays automatically
                startTime = performance.now();
                // start audio
                if (context !== null) {
                    startTime = context.currentTime;
                    this.audio.start(startTime);
                }
                else {
                    this.audio.play();
                }
                */

                /* EXTENSION: Start audio when replay button is clicked */
                const play_button = display_element.querySelector("#jspsych-audio-slider-response-replay");
                this.current_audio = undefined;

                play_button.addEventListener("click", () => {
                    if (context !== null) {
                        // start the audio if it is not already playing
                        if (play_button.dataset.audio_is_playing === "false") {
                            // load audio
                            this.jsPsych.pluginAPI
                                .getAudioBuffer(trial.stimulus)
                                .then((buffer) => {
                                    this.audio = context.createBufferSource();
                                    this.audio.buffer = buffer;
                                    this.audio.connect(context.destination);
                                })
                                .catch((err) => {
                                    console.error(`Failed to load audio file "${trial.stimulus}". Try checking the file path. We recommend using the preload plugin to load audio files.`);
                                    console.error(err);
                                });
                            
                            // start audio
                            startTime = context.currentTime;
                            this.audio.start(startTime);
                            this.current_audio = this.audio;
                            play_button.dataset.audio_is_playing = "true";

                            this.jsPsych.pluginAPI.setTimeout(() => {
                                play_button.dataset.audio_is_playing = "false";
                            }, this.audio.buffer.duration * 1000);
                        }
                    }
                    else {
                        this.audio.play();
                    }
                });
                //

                // end trial if trial_duration is set
                if (trial.trial_duration !== null) {
                    this.jsPsych.pluginAPI.setTimeout(() => {
                        end_trial();
                    }, trial.trial_duration);
                }
                on_load();
            };
            // function to enable slider after audio ends
            function enable_slider() {
                document.querySelector("#jspsych-audio-slider-response-response").disabled =
                    false;
                if (!trial.require_movement) {
                    document.querySelector("#jspsych-audio-slider-response-next").disabled =
                        false;
                }
            }

            const end_trial = () => {
                // kill any remaining setTimeout handlers
                this.jsPsych.pluginAPI.clearAllTimeouts();

                // stop the audio file if it is playing
                if (context !== null) {
                    /* CHANGE: stop current audio */
                    // this.audio.stop();
                    if (this.current_audio !== undefined) {
                        this.current_audio.stop();
                    }
                }
                else {
                    this.audio.pause();
                }

                // remove end event listeners if they exist
                this.audio.removeEventListener("ended", end_trial);
                this.audio.removeEventListener("ended", enable_slider);

                // save data
                var trialdata = {
                    rt: response.rt,
                    stimulus: trial.stimulus,
                    slider_start: trial.slider_start,
                    response: response.response,
                };
                display_element.innerHTML = "";
                
                // next trial
                this.jsPsych.finishTrial(trialdata);
                trial_complete();
            };
            return new Promise((resolve) => {
                trial_complete = resolve;
            });
        }
    }
    AudioSliderResponsePlugin.info = info;
  
    return AudioSliderResponsePlugin;
  
  })(jsPsychModule);
  