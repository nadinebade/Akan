var instructions_text = new Array;
var practice_text = new Array;

instructions_text.push(
  "<h1>Instructions</h1><p>This experiment is about reasoning. You will be presented with two sentences on the screen. Assuming that the first sentence is true, we will ask you <strong>to what extent you think the second sentence is compatible with the first.</strong> You will provide your answer on a sliding scale.</p><p>We will now give you <strong>two examples</strong> of the kinds of questions you will be asked.</p>");

var html = "<h2>Example 1</h2><p class = center-content>Assume the text below is true:</p><p class=center-content><strong>Mike is an NFL player.</strong></p><p class=center-content><i>Question:</i></p><p class=center-content>How compatible is that with: <strong>Mike is athletic.</strong></p><p class=center-content><i>Answer:</i></p><p class=center-content>Totally compatible. (Because only top athletes make it into the NFL.)</p>"
  + '<div class="range-slider">'
  + '<span id="rs-bullet" class="rs-label" style="left: 478px;">7</span>'
  + '<input id="jspsych-html-slider-response-response" class="rs-range" type="range" value=7 min=1 max=7 step=1 style="width: 500px;" disabled>'
  + '<div class="box-minmax"><span>Incompatible</span><span>Totally compatible</span></div></div>';

instructions_text.push(html);

html = "<h2>Example 2</h2><p class = center-content>Assume the text below is true:</p><p class=center-content><strong>Mark studies literature.</strong></p><p class=center-content><i>Question:</i></p><p class=center-content>How compatible is that with: <strong>Mark has eight kids.</strong></p><p class=center-content><i>Answer:</i></p><p class=center-content>Fairly compatible. (Studying literature is not incompatible with <br> having 8 kids but it's also hard to say that they are totally compatible)</p><div class=\"range-slider\"><span id=\"rs-bullet\" class=\"rs-label\" style=\"left: 239px;\">5</span><input id=\"jspsych-html-slider-response-response\" class=\"rs-range\" type=\"range\" value=5 min=1 max=7 step=1 style=\"width: 500px;\" disabled><div class=\"box-minmax\"><span>Incompatible</span><span>Totally compatible</span></div></div>";

instructions_text.push(html);

html = "<p class='center-content'>Please take a moment to familiarize yourself with the sliding scale.<br>There are seven points on it, ranging from 1 to 7.<br>Try moving the slider below a few times.<br>Click 'Next' when you are ready to start the experiment.</p>";
html += '<div class="range-slider">';
html += '<span id="rs-bullet" class="rs-label">1</span>';
html += '<input id="jspsych-html-slider-response-response" class="rs-range" type="range" value="1" min="1" max="7" step="1" style="width: 500px;">';
html += '<div class="box-minmax"><span>Incompatible</span><span>Totally compatible</span></div>'
html += '</div>';

practice_text.push(html);
