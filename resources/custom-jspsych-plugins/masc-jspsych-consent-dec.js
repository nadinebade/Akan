/**
 * consent-dec
 * Salvador Mascarenhas
 *
 * based on Mathias Sablé-Meyer's external consent form
**/

jsPsych.plugins['consent-dec'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'consent-dec',
    description: 'Show a standard consent form for DEC, collect consent',
    parameters: {
      platform: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Platform',
        default: "MTurk",
        description: "Platform on which the experiment is run."
      }
    }
  };

  plugin.trial = function(display_element, trial) {
    
    switch (trial.platform) {
      case "MTurk":
        var theForm = "<div id=\"consent\"><section id=\"consent_body\"><h1>ENS Department of Cognitive Studies</h1><p>We invite you to participate in a research study being conducted by investigators from Ecole Normale Sup&eacute;rieure.  The purpose of the study is to learn about reasoning.</p><p>We will ask you to fill out a questionnaire in English, involving such tasks as reading sentences or words, naming pictures or describing scenes, deciding what sentences follow from other sentences, or participating in simple language games.</p><p>If you have read this form and have decided to participate in this experiment, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at any time.  However, please note that in order to validate the HIT you need to complete the experiment and type in the code you will get at the end on the HIT's page on Mechanical Turk.  Otherwise we have no way to process your payment.</p><p>There are no risks or benefits of any kind involved in this study. You will be paid for your participation at the posted rate.</p><ul class=\"left\"><li>Your participation in this study will remain confidential.</li><li>Your individual privacy will be maintained in all published and written data resulting from this study.</li><li>You may print this form for your records.</li></ul><p>By ticking the box and clicking on the button at the bottom of this page you indicate that you are at least <strong>18 years of age</strong>, that you understand this statement, and that you agree to <strong>complete this HIT voluntarily</strong>.</p></section><section id=\"consent_form\"><input type=\"checkbox\" id=\"consent_checkbox\" class=\"checkbox-custom\" onClick=\"document.getElementById('start').disabled ^= true;\"/><label for=\"consent_checkbox\" id=\"consent_label\">I agree to participate in this experiment</label> <br/><button type=\"button\" class=\"jspsych-btn\" id=\"start\" disabled=\"true\">Start the experiment</button></section></div>";
        break;
      case "Prolific":
        var theForm = "<div id=\"consent\"><section id=\"consent_body\"><h1>ENS Department of Cognitive Studies</h1><p>We invite you to participate in a research study being conducted by investigators from Ecole Normale Sup&eacute;rieure.  The purpose of the study is to learn about reasoning.</p><p>We will ask you to fill out a questionnaire in English, involving such tasks as reading sentences or words, naming pictures or describing scenes, deciding what sentences follow from other sentences, or participating in simple language games.</p><p>If you have read this form and have decided to participate in this experiment, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at any time.  However, please note that in order to validate the task you need to complete the experiment and type in the code you will get at the end into Prolific or click the link you will get at the end.  Otherwise we have no way to process your payment.</p><p>There are no risks or benefits of any kind involved in this study. You will be paid for your participation at the posted rate.</p><ul class=\"left\"><li>Your participation in this study will remain confidential.</li><li>Your individual privacy will be maintained in all published and written data resulting from this study.</li><li>You may print this form for your records.</li></ul><p>By ticking the box and clicking on the button at the bottom of this page you indicate that you are at least <strong>18 years of age</strong>, that you understand this statement, and that you agree to <strong>complete this experiment voluntarily</strong>.</p></section><section id=\"consent_form\"><input type=\"checkbox\" id=\"consent_checkbox\" class=\"checkbox-custom\" onClick=\"document.getElementById('start').disabled ^= true;\"/><label for=\"consent_checkbox\" id=\"consent_label\">I agree to participate in this experiment</label> <br/><button type=\"button\" class=\"jspsych-btn\" id=\"start\" disabled=\"true\">Start the experiment</button></section></div>";
        break;
      default:
        
    }

    display_element.innerHTML = theForm;

    var t0 = (new Date()).getTime();
    var finish = function() {
      var trial_data = {
        rt: (new Date()).getTime() - t0
      };
      display_element.innerHTML = '';
      jsPsych.finishTrial(trial_data);
    };
    display_element.querySelector('#start').addEventListener('click', finish);
  };

  return plugin;
})();
