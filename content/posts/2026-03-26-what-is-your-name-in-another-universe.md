+++
date = '2026-03-27'
draft = false
title = 'What Is Your Name in Another Universe?'
categories = ['persona']
tags = ['fun', 'security']
usekatex = false
usethreejs = false
+++

Weekend articles should be lighter and fun.

Not everything has to be an argument, a deep dive, or ~~a small~~ your average frustration disguised as an essay. 

Sometimes I just want to build a tiny piece of nonsense, the sort of harmless interactive bullshit that feels vaguely `old internet` and ~~slightly~~ very unnecessary.

So this `name generator` is exactly that:

<div class="alias-generator">
  <div class="alias-generator-card">
    <p class="alias-generator-note">
      Fill in the form below to discover who your character would be in the selected universe.
    </p>
    <form id="got-generator-form" class="alias-generator-form">
      <label for="got-theme">
        Select the Universe:
      </label>
      <select id="got-theme" name="theme">
        <option value="got">Game of Thrones</option>
        <option value="starwars">Star Wars</option>
        <option value="dune">Dune</option>
        <option value="lotr">Lord of the Rings</option>
      </select>
      <label for="got-mother">
        1. What is your mother's maiden name?
      </label>
      <input id="got-mother" name="mother" type="text" autocomplete="off" required />
      <label for="got-pet">
        2. What was the name of your first pet?
      </label>
      <input id="got-pet" name="pet" type="text" autocomplete="off" required />
      <label for="got-street">
        3. What street did you grow up on?
      </label>
      <input id="got-street" name="street" type="text" autocomplete="off" required />
      <label for="got-school">
        4. Who was your childhood best friend?
      </label>
      <input id="got-school" name="school" type="text" autocomplete="off" required />
      <button type="submit" id="got-generate">Generate</button>
    </form>
    <div class="alias-followup" id="got-followup" hidden>
      <p class="alias-followup-glitch" id="alias-followup-glitch" hidden></p>
      <p class="alias-followup-note" id="alias-followup-note" hidden>
        Almost there. For reveal of your glorious <span id="alias-reveal-copy">Westerosi alias</span> we are needing next informations for verification proces. Please comply with request:
      </p>
      <form id="got-followup-form" class="alias-generator-form">
        <label for="got-email">
          5. What is your email address?
        </label>
        <input id="got-email" name="email" type="text" autocomplete="off" required />
        <label for="got-phone">
          6. What is your phone number?
        </label>
        <input id="got-phone" name="phone" type="text" autocomplete="off" required />
        <button type="submit" id="got-reveal">Reveal result</button>
      </form>
    </div>
    <div class="alias-result" id="got-result" hidden>
      <p class="alias-result-label">Your Westerosi alias:</p>
      <p class="alias-result-name" id="got-result-name"></p>
      <p class="alias-result-line" id="got-result-line"></p>
    </div>
    <div class="alias-warning" id="alias-warning" hidden>
      <p>Do you really think it is a good idea to share this kind of information across the web?</p>
      <p>Don't worry, this was a joke.</p>
      <p>Everything happened locally in your browser. No information was actually shared anywhere.</p>
      <label class="alias-warning-label" for="alias-warning-birthday">When is your birthday ?</label>
      <input class="alias-warning-input" id="alias-warning-birthday" type="date" value="1946-06-14" />
      <button type="button" class="alias-warning-dismiss" id="alias-warning-dismiss">Click to dismiss.</button>
    </div>
  </div>
</div>

<sub>References: [this](https://www.teenvogue.com/story/royal-wedding-name-generator-online-security-threat), [this](https://www.bbb.org/article/scams/16992-bbb-scam-alert-bored-think-before-taking-that-facebook-quiz) and [this](https://rikkiprince.wordpress.com/2014/01/29/name-generator-memes-as-security-answer-harvesting/).</sub>

<style>
.alias-generator {
  margin: 2rem 0;
}

.alias-generator-card {
  border: 1px solid #000;
  background: #f3f3f3;
  padding: 1rem;
}

.alias-generator-note {
  margin-top: 0;
  color: #333;
  font-size: 0.95rem;
}

.alias-generator-form {
  display: grid;
  gap: 0.65rem;
}

.alias-generator-form label {
  font-weight: 600;
  margin-top: 0.4rem;
}

.alias-generator-form input {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #000;
  border-radius: 0;
  padding: 0.55rem 0.65rem;
  font: inherit;
  background: #fff;
  color: #000;
}

.alias-generator-form select {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #000;
  border-radius: 0;
  padding: 0.55rem 0.65rem;
  font: inherit;
  font-size: 16px;
  background: #fff;
  color: #000;
  appearance: none;
  -webkit-appearance: none;
}

.alias-generator-form button {
  margin-top: 0.8rem;
  width: fit-content;
  border: 1px solid #000;
  background: #fff;
  color: #000;
  padding: 0.55rem 0.9rem;
  font: inherit;
}

.alias-generator-form button:hover {
  background: #000;
  color: #fff;
}

.alias-followup {
  margin-top: 1rem;
  border-top: 1px solid #000;
  padding-top: 1rem;
}

.alias-followup-glitch {
  margin-top: 0;
  color: #222;
  letter-spacing: 0.08em;
}

.alias-followup-note {
  margin-top: 0;
  color: #222;
  animation: alias-blink 1.2s step-start infinite;
}

.alias-result {
  margin-top: 1rem;
  border-top: 1px solid #000;
  padding-top: 1rem;
}

.alias-result-label {
  margin: 0;
  color: #333;
}

.alias-result-name {
  margin: 0.2rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
}

.alias-result-line {
  margin: 0.45rem 0 0;
  color: #333;
  font-style: italic;
}

.alias-warning {
  margin-top: 1rem;
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  border: 1px solid #700;
  background: #b00020;
  color: #fff;
  padding: 0.85rem 1rem;
  font: inherit;
  cursor: pointer;
  overflow-wrap: break-word;
}

.alias-warning p {
  margin: 0 0 0.45rem 0;
}

.alias-warning p:last-child {
  margin-bottom: 0;
}

.alias-warning-label {
  display: block;
  margin: 0.2rem 0 0.35rem 0;
  font-size: 0.9rem;
}

.alias-warning-input {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #fff;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  padding: 0.45rem 0.55rem;
  font: inherit;
  margin-bottom: 0.6rem;
}

.alias-warning-input::placeholder {
  color: rgba(255, 255, 255, 0.8);
}

.alias-warning:hover {
  background: #8d0018;
}

.alias-warning-dismiss {
  border: 1px solid #fff;
  background: transparent;
  color: #fff;
  padding: 0.35rem 0.55rem;
  font: inherit;
  cursor: pointer;
}

.alias-warning-dismiss:hover {
  background: rgba(255, 255, 255, 0.15);
}

@keyframes alias-blink {
  50% {
    opacity: 0.35;
  }
}

@media (max-width: 640px) {
  .alias-generator-card {
    padding: 0.8rem;
  }

  .alias-generator-form {
    gap: 0.55rem;
  }

  .alias-generator-form button,
  .alias-warning-dismiss {
    width: 100%;
  }

  .alias-result-name {
    font-size: 1.25rem;
  }

  .alias-followup-glitch,
  .alias-followup-note {
    line-height: 1.4;
  }
}
</style>

<script>
(function () {
  const form = document.getElementById("got-generator-form");
  const followup = document.getElementById("got-followup");
  const followupForm = document.getElementById("got-followup-form");
  const followupGlitch = document.getElementById("alias-followup-glitch");
  const followupNote = document.getElementById("alias-followup-note");
  const result = document.getElementById("got-result");
  const revealCopy = document.getElementById("alias-reveal-copy");
  const resultLabel = document.querySelector(".alias-result-label");
  const resultName = document.getElementById("got-result-name");
  const resultLine = document.getElementById("got-result-line");
  const warning = document.getElementById("alias-warning");
  const warningDismiss = document.getElementById("alias-warning-dismiss");
  let pendingResult = null;
  let warningTimer = null;
  let followupTimer = null;

  const themes = {
    got: {
      label: "Your Westerosi alias:",
      reveal: "Westerosi alias",
      partA: [
        "Aelys", "Alaric", "Brynden", "Cassana", "Corwyn", "Daenor",
        "Elira", "Gwayne", "Jorel", "Lyarra", "Maelor", "Nymera",
        "Orys", "Rhaella", "Rowan", "Saelle", "Theomar", "Vaella"
      ],
      partB: [
        "Ashenbrook", "Blackmere", "Crowhill", "Duskwater", "Emberfall", "Frostmere",
        "Glimmerstone", "Greyfen", "Hawkridge", "Ironvale", "Mournwood", "Nightharbor",
        "Ravenwatch", "Redwyne", "Stormmere", "Thornfield", "Valehart", "Wintermere"
      ],
      partC: [
        "the Quiet", "the Unburnt", "the Patient", "the Mild", "the Unruly", "the Watchful",
        "the Silver Tongued", "the Lantern-Bearer", "the Ink-Stained", "the Wandering",
        "the Late", "the Unbroken", "the Slightly Suspicious", "the Moon-Blessed"
      ],
      partD: [
        "the riverlands", "the stormlands", "the crownlands", "the narrow sea",
        "the frost roads", "the western hills", "the dusk coast", "the salt marshes",
        "the red keep's shadow", "the old kingsroad", "the whispering woods", "the blackwater"
      ],
      formatName: (a, b) => `${a} of House ${b}`,
      formatLine: (c, d) => `${c}, sworn by rumor to ${d}.`
    },
    starwars: {
      label: "Your galactic alias:",
      reveal: "galactic alias",
      partA: [
        "Axo", "Beren", "Cyra", "Doran", "Eiko", "Fenn",
        "Jara", "Kael", "Lysa", "Marek", "Niva", "Orin",
        "Pax", "Rynn", "Sira", "Tovan", "Vexa", "Zerin"
      ],
      partB: [
        "Antares", "Coruscant", "Dathomir", "Endovar", "Kessel", "Mandalor",
        "Nabrex", "Ordassa", "Ryloth", "Selvaris", "Taris", "Vandor",
        "Velaris", "Xebor", "Yalara", "Zeltros"
      ],
      partC: [
        "smuggler of", "watcher of", "pilot from", "drifter of", "cipher of", "shadow of",
        "cartographer of", "mechanic of", "wanderer of", "envoy to", "scavenger of", "keeper of"
      ],
      partD: [
        "the outer rim", "the mid rim", "a forgotten moon", "the spice lanes",
        "the trade routes", "the old republic", "the hollow asteroids", "the lower docks",
        "the twin suns", "a rebel outpost", "the imperial fringe", "deep hyperspace"
      ],
      formatName: (a, b) => `${a} ${b}`,
      formatLine: (c, d) => `${c} ${d}.`
    },
    dune: {
      label: "Your desert-world alias:",
      reveal: "desert-world alias",
      partA: [
        "Adab", "Cyres", "Damar", "Farid", "Hadi", "Ilyan",
        "Kaelis", "Leto", "Nayla", "Orbas", "Rami", "Selim",
        "Tarek", "Veyra", "Yasmin", "Zahir"
      ],
      partB: [
        "al-Raqis", "of Arrakeen", "of Sietch Tabr", "of the Deep Erg", "ibn Corin", "of Salusa",
        "al-Hadar", "of Caladan", "of Kaitain", "al-Sahra", "of the Shield Wall", "of Tuono Basin"
      ],
      partC: [
        "reader of", "keeper of", "listener in", "dreamer beneath", "walker across", "witness of",
        "collector of", "student of", "prophet in", "cipher of", "stranger to", "survivor of"
      ],
      partD: [
        "the spice wind", "the open desert", "the long night", "the hidden sietch",
        "the maker's shadow", "the dry horizon", "the old imperium", "the emperor's court",
        "the dunes of memory", "the silence between storms", "the water discipline", "the far erg"
      ],
      formatName: (a, b) => `${a} ${b}`,
      formatLine: (c, d) => `${c} ${d}.`
    },
    lotr: {
      label: "Your Middle-earth alias:",
      reveal: "Middle-earth alias",
      partA: [
        "Amdir", "Beleg", "Calen", "Daeron", "Elen", "Finwe",
        "Galdor", "Haleth", "Isil", "Luthon", "Maeron", "Nimril",
        "Orophin", "Rhovan", "Sael", "Thalion", "Voron", "Wistan"
      ],
      partB: [
        "Greenleaf", "Oakenshade", "Stormwarden", "Underhill", "Dawnriver", "Ironbough",
        "Nightbrook", "Starcloak", "Mithrend", "Ashenhelm", "Silvermere", "Farwalker",
        "Deepdelver", "Westsong", "Hillwarden", "Stonehand"
      ],
      partC: [
        "friend of", "walker beneath", "keeper of", "singer in", "watcher of", "wanderer beyond",
        "guest of", "shield of", "listener to", "seer of", "torchbearer in", "guardian of"
      ],
      partD: [
        "the Shire", "the White City", "the western woods", "the Misty Mountains",
        "the last homely house", "the old forest road", "the grey havens", "the plains of Rohan",
        "the halls of stone", "the northern wilds", "the silver streams", "the fading west"
      ],
      formatName: (a, b) => `${a} ${b}`,
      formatLine: (c, d) => `${c} ${d}.`
    }
  };

  // Those are actually nice things
  // that mean something
  // if you come this far, please translate them if 
  // you are not familiar with the languages.
  const glitchLines = [
    "У нас одна биология, независимо от идеологии.",
    "Мы все люди, даже если верим в разное.",
    "Представь мир без границ в голове.",
    "Небо одно, мечты тоже одни.",
    "我们共享同样的生物本性，不论意识形态如何。",
    "想象一下，人们活着不必彼此划分。",
    "天空还是天空，分别只是人造的。",
    "没有边界的想法，也许更像未来。"
  ];

  function normalize(value) {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
  }

  // is there a better way to do this in js ?
  function hashText(value) {
    let hash = 2166136261;
    for (let i = 0; i < value.length; i += 1) {
      hash ^= value.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function pick(list, seed, offset) {
    return list[(seed + offset) % list.length];
  }

  function currentTheme() {
    const themeKey = String(form.elements.theme.value || "got");
    return themes[themeKey] || themes.got;
  }

  function updateRevealCopy() {
    revealCopy.textContent = currentTheme().reveal;
  }

  function clearWarningTimer() {
    if (warningTimer) {
      window.clearTimeout(warningTimer);
      warningTimer = null;
    }
  }

  function clearFollowupTimer() {
    if (followupTimer) {
      window.clearTimeout(followupTimer);
      followupTimer = null;
    }
  }

  function scheduleWarning() {
    clearWarningTimer();
    warning.hidden = true;
    warningTimer = window.setTimeout(() => {
      warning.hidden = false;
    }, 2000);
  }

  function buildResult() {
    const mother = normalize(form.elements.mother.value);
    const pet = normalize(form.elements.pet.value);
    const street = normalize(form.elements.street.value);
    const school = normalize(form.elements.school.value);
    const theme = currentTheme();

    const joined = [mother, pet, street, school].join("|");
    const seed = hashText(joined);

    const firstName = pick(theme.partA, seed, 0);
    const houseName = pick(theme.partB, seed, 7);
    const epithet = pick(theme.partC, seed, 13);
    const region = pick(theme.partD, seed, 23);

    return {
      label: theme.label,
      name: theme.formatName(firstName, houseName),
      line: theme.formatLine(epithet, region)
    };
  }

  function renderPendingResult() {
    if (!pendingResult) return;
    resultLabel.textContent = pendingResult.label;
    resultName.textContent = pendingResult.name;
    resultLine.textContent = pendingResult.line;
  }

  function showFollowupSequence() {
    clearFollowupTimer();
    followup.hidden = false;
    followupGlitch.textContent = glitchLines[Math.floor(Math.random() * glitchLines.length)];
    followupGlitch.hidden = false;
    followupNote.hidden = true;
    followupTimer = window.setTimeout(() => {
      followupGlitch.hidden = true;
      followupNote.hidden = false;
    }, 450);
  }

  function resetFlow({ preserveTheme = false } = {}) {
    pendingResult = null;
    const selectedTheme = form.elements.theme.value;
    form.reset();
    if (preserveTheme) {
      form.elements.theme.value = selectedTheme;
    }
    followup.hidden = true;
    followupGlitch.hidden = true;
    followupNote.hidden = true;
    result.hidden = true;
    warning.hidden = true;
    clearWarningTimer();
    clearFollowupTimer();
    followupForm.reset();
    resultName.textContent = "";
    resultLine.textContent = "";
    updateRevealCopy();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    pendingResult = buildResult();
    showFollowupSequence();
    result.hidden = true;
  });

  form.elements.theme.addEventListener("change", () => {
    resetFlow({ preserveTheme: true });
  });

  followupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!pendingResult) return;

    renderPendingResult();
    result.hidden = false;
    scheduleWarning();
  });

  warningDismiss.addEventListener("click", () => {
    resetFlow();
  });

  updateRevealCopy();
})();
</script>
