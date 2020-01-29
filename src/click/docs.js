export const getHtmlExample = (texts) => {
  return `
    <h4>${texts.audio}</h4>
    <p class="box">
      ${texts.audioDescription}<br/>
      <audio controls>
        <source src="https://handsfreeforweb.com/hfw-assets/audio.mp3" type="audio/mpeg">
      </audio>
    </p>
    <h4>${texts.button}</h4>
    <p class="box">
      ${texts.buttonDescription}<br/>
      <button>${texts.clickHere}</button>
    </p>
    <h4>${texts.checkbox}</h4>
    <p class="box">
      ${texts.checkboxDescription}<br />
      <input type="checkbox" /> ${texts.option}
    </p>
    <h4>${texts.color}</h4>
    <p class="box">
      ${texts.colorDescription} <br />
      <input type="color" />
    </p>
    <h4>${texts.dates}</h4>
    <p class="box">
      ${texts.datesDescription}<br/>
      <input type="date" />
    </p>
    <h4>${texts.file}</h4>
    <p class="box">
      ${texts.fileDescription}<br/>
      <input type="file" />
    </p>
    <h4>${texts.image}</h4>
    <p class="box">
      ${texts.imageDescription}<br/>
      <img src="https://handsfreeforweb.com/hfw-assets/image.png" />
    </p>
    <h4>${texts.link}</h4>
    <p class="box">
      ${texts.linkDescription}<br/>
      <a href="#">Click here</a>
    </p>
    <h4>${texts.range}</h4>
    <p class="box">
      ${texts.rangeDescription} <br/>
      <input type="range" width="100"/>
    </p>
    <h4>${texts.radioButtons}</h4>
    <p class="box">
      ${texts.radioButtonsDescription}<br/>
      <input type="radio" name="option" value="a"> ${texts.radioButton} A<br>
      <input type="radio" name="option" value="b"> ${texts.radioButton} B
    </p>
    <h4>${texts.select}</h4>
    <p class="box">
      ${texts.selectDescription}<br/>
      <select>
        <option value="a">${texts.option} A</option>
        <option value="b">${texts.option} B</option>
      </select>
    </p>
    <h4>${texts.text}</h4>
    <p class="box">
      ${texts.textDescription}<br/>
      <input type="text" />
    </p>
    <h4>${texts.video}</h4>
    <p class="box">
      ${texts.videoDescription}<br/>
      <video width="320" height="240" controls>
        <source src="https://handsfreeforweb.com/hfw-assets/video.mp4" type="video/mp4">
      </video>
    </p>
  `;
};
