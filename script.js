(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const navButtons = [...document.querySelectorAll(".nav-item")];
  const views = [...document.querySelectorAll(".view")];
  const viewRegistry = new Map([
    ["overview", { title: "Overview" }],
    ["password-generator", { title: "Password generator" }],
    ["name-generator", { title: "Name generator" }],
    ["google-search", { title: "Google search" }],
    ["strength-checker", { title: "Strength checker" }],
    ["file-hash", { title: "File hash" }],
    ["security-quiz", { title: "Security quiz" }],
    ["cyber-tips", { title: "Cyber tips" }]
  ]);

  $("themeToggle").addEventListener("click", () => {
    const lightMode = document.documentElement.dataset.theme !== "light";
    document.documentElement.dataset.theme = lightMode ? "light" : "dark";
    $("themeToggle").setAttribute("aria-pressed", String(lightMode));
    $("themeToggle").setAttribute("aria-label", lightMode ? "Switch to dark mode" : "Switch to light mode");
    $("themeToggleIcon").textContent = lightMode ? "☾" : "☼";
    $("themeToggleLabel").textContent = lightMode ? "DARK MODE" : "LIGHT MODE";
  });

  function showView(name) {
    const registeredView = viewRegistry.get(name);
    if (!registeredView) return;
    views.forEach((view) => {
      const active = view.id === name;
      view.classList.toggle("active", active);
      view.hidden = !active;
    });
    navButtons.forEach((button) => {
      const active = button.dataset.panel === name;
      button.classList.toggle("active", active);
      button.setAttribute("aria-current", active ? "page" : "false");
    });
    $("currentLocation").textContent = registeredView.title;
    window.scrollTo(0, 0);
  }
  navButtons.forEach((button) => button.addEventListener("click", () => showView(button.dataset.panel)));
  document.querySelectorAll("[data-open]").forEach((button) => button.addEventListener("click", () => showView(button.dataset.open)));
  const googleQuery = $("googleQuery");
  let currentFrameUrl = "";
  $("googleSearchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const query = googleQuery.value.trim();
    if (!query) { googleQuery.focus(); return; }
    googleQuery.value = query;
    const results = $("googleResults");
    const loading = $("googleLoading");
    currentFrameUrl = `https://www.google.com/search?igu=1&output=embed&q=${encodeURIComponent(query)}`;
    loading.classList.remove("hidden");
    loading.textContent = "LOADING GOOGLE RESULTS...";
    results.classList.add("hidden");
    $("googleFrameFallback").classList.add("hidden");
    results.src = currentFrameUrl;
  });
  $("googleResults").addEventListener("load", () => {
    $("googleLoading").classList.add("hidden");
    $("googleResults").classList.remove("hidden");
    $("googleFrameFallback").classList.add("hidden");
  });
  $("websiteSearchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const websiteInput = $("websiteUrl");
    let websiteUrl = websiteInput.value.trim();
    if (!websiteUrl) { websiteInput.focus(); return; }
    if (!/^https?:\/\//i.test(websiteUrl)) websiteUrl = `https://${websiteUrl}`;
    try {
      const parsedUrl = new URL(websiteUrl);
      if (!["http:", "https:"].includes(parsedUrl.protocol)) throw new Error("Unsupported protocol");
      currentFrameUrl = parsedUrl.href;
      websiteInput.value = parsedUrl.href;
      $("googleLoading").classList.remove("hidden");
      $("googleLoading").textContent = "LOADING WEBSITE...";
      $("googleResults").classList.add("hidden");
      $("googleResults").src = currentFrameUrl;
      $("googleFrameFallback").classList.add("hidden");
      window.setTimeout(() => {
        $("googleLoading").classList.add("hidden");
        $("googleResults").classList.remove("hidden");
        $("googleFrameFallback").classList.remove("hidden");
      }, 2500);
    } catch {
      $("googleFrameMessage").textContent = "Enter a valid website address, such as example.com.";
      $("googleFrameFallback").classList.remove("hidden");
    }
  });
  $("openCurrentTab").addEventListener("click", () => {
    if (currentFrameUrl) window.location.assign(currentFrameUrl);
  });
  document.querySelectorAll(".quick-search").forEach((button) => {
    button.addEventListener("click", () => {
      googleQuery.value = button.dataset.query;
      googleQuery.focus();
      $("googleSearchForm").requestSubmit();
    });
  });

  const passwordLength = $("passwordLength");
  const characterSets = [
    { id: "includeUppercase", chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
    { id: "includeLowercase", chars: "abcdefghijklmnopqrstuvwxyz" },
    { id: "includeNumbers", chars: "0123456789" },
    { id: "includeSymbols", chars: "!@#$%^&*()-_=+[]{};:,.?/~" }
  ];
  function secureIndex(max) {
    const limit = Math.floor(0x100000000 / max) * max;
    const value = new Uint32Array(1);
    do { window.crypto.getRandomValues(value); } while (value[0] >= limit);
    return value[0] % max;
  }
  function generatePassword() {
    const length = Number(passwordLength.value);
    const enabledSets = characterSets.filter((set) => $(set.id).checked);
    $("lengthValue").textContent = String(length);
    if (!enabledSets.length) {
      $("generatorMessage").textContent = "Select at least one character type.";
      $("generatedPassword").value = "";
      return;
    }
    const allChars = enabledSets.map((set) => set.chars).join("");
    const chars = enabledSets.map((set) => set.chars[secureIndex(set.chars.length)]);
    while (chars.length < length) chars.push(allChars[secureIndex(allChars.length)]);
    for (let i = chars.length - 1; i > 0; i--) {
      const j = secureIndex(i + 1);
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    $("generatedPassword").value = chars.join("");
    $("generatorMessage").textContent = "Generated securely on this device.";
  }
  $("generatePassword").addEventListener("click", generatePassword);
  $("generatePasswordMain").addEventListener("click", generatePassword);
  passwordLength.addEventListener("input", () => { $("lengthValue").textContent = passwordLength.value; generatePassword(); });
  characterSets.forEach((set) => $(set.id).addEventListener("change", generatePassword));
  const nameStyleWords = {
    general: ["Orbit", "Comet", "Echo", "Maple", "Sparrow", "Atlas", "Pioneer"],
    professional: ["Summit", "Sterling", "Meridian", "Crest", "Horizon"],
    modern: ["Nova", "Luma", "Aero", "Vanta", "Nexa"],
    tech: ["Byte", "Pixel", "Nexus", "Quantum", "Circuit"],
    anime: ["Kitsune", "Ronin", "Shinobi", "Hoshi", "Kairo"],
    cyber: ["Cipher", "Ghost", "Neon", "Phantom", "Rogue"]
  };
  const shortNameStyleWords = {
    general: ["Echo", "Nova", "Aero", "Luma"],
    professional: ["Apex", "Crest", "Pact", "Noble"],
    modern: ["Nova", "Luma", "Aero", "Nexa"],
    tech: ["Byte", "Code", "Data", "Nex"],
    anime: ["Kiro", "Rin", "Yuki", "Hoshi"],
    cyber: ["Neon", "Null", "Rift", "Hex"]
  };
  const nameCategory = $("nameCategory");
  const nameKeyword = $("nameKeyword");
  const nameResults = $("nameResults");
  const nameGeneratorMessage = $("nameGeneratorMessage");
  function choose(items) { return items[secureIndex(items.length)]; }
  function generateNames() {
    const category = nameCategory.value;
    const filters = [...document.querySelectorAll(".name-filter-grid input:checked")].map((input) => input.value);
    const short = filters.includes("short");
    const oneWord = filters.includes("one-word");
    const selectedStyles = filters.filter((filter) => nameStyleWords[filter]);
    const styleWordSets = short ? shortNameStyleWords : nameStyleWords;
    const styleWords = selectedStyles.length
      ? selectedStyles.flatMap((style) => styleWordSets[style])
      : [...styleWordSets.general, ...styleWordSets.modern];

    const keywordInput = nameKeyword.value.trim();
    let keywordParts = keywordInput
      .split(/\s+/)
      .map((word) => word.replace(/[^\p{L}\p{N}]/gu, ""))
      .filter(Boolean)
      .map((word) => word[0].toLocaleUpperCase() + word.slice(1));
    keywordParts = [Array.from(keywordParts.join("")).slice(0, short ? 4 : 22).join("")].filter(Boolean);
    const usableKeyword = keywordParts.length > 0;
    const separators = oneWord ? "" : " ";
    const suffixes = {
      brand: short ? ["Co", "HQ"] : ["Studio", "Works", "Collective"],
      startup: short ? ["AI", "X"] : ["Labs", "Systems", "Ventures"],
      gaming: short ? ["GG", "X"] : ["GG", "Plays", "Gaming"],
      youtube: short ? ["TV", "HQ"] : ["TV", "Plays", "Studio", "Media"]
    };
    const domains = [".com", ".io", ".net", ".co"];
    const suggestions = new Set();
    let attempts = 0;
    while (suggestions.size < 6 && attempts < 100) {
      attempts++;
      const styleWord = choose(styleWords);
      const coreParts = usableKeyword
        ? [choose(keywordParts), styleWord]
        : [styleWord, choose(nameStyleWords.general)];
      const orderedParts = secureIndex(2) ? [...coreParts].reverse() : coreParts;
      const core = orderedParts.join(separators);
      let suggestion;
      if (category === "username") suggestion = coreParts.join("") + String(secureIndex(90) + 10);
      else if (category === "brand" || category === "startup" || category === "youtube") suggestion = core + separators + choose(suffixes[category]);
      else if (category === "gaming") suggestion = coreParts.join("") + choose(suffixes.gaming);
      else suggestion = coreParts.join("") + choose(domains);
      suggestions.add(suggestion);
    }
    let fallbackIndex = 1;
    while (suggestions.size < 6) {
      const firstSuggestion = [...suggestions][0];
      const fallback = category === "domain"
        ? firstSuggestion.replace(/\.[^.]+$/, "") + fallbackIndex++ + ".com"
        : firstSuggestion + fallbackIndex++;
      suggestions.add(fallback);
    }

    nameResults.replaceChildren(...[...suggestions].map((suggestion, index) => {
      const item = document.createElement("div");
      item.className = "name-suggestion";
      const number = document.createElement("span");
      number.className = "suggestion-number";
      number.textContent = String(index + 1).padStart(2, "0");
      const label = document.createElement("strong");
      label.textContent = suggestion;
      const copy = document.createElement("button");
      copy.className = "secondary-button";
      copy.type = "button";
      copy.textContent = "COPY";
      copy.setAttribute("aria-label", "Copy " + suggestion);
      copy.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(suggestion);
          nameGeneratorMessage.textContent = "Copied “" + suggestion + "” to clipboard.";
        } catch (error) {
          nameGeneratorMessage.textContent = "Clipboard access failed. Select and copy the suggestion manually.";
        }
      });
      item.append(number, label, copy);
      return item;
    }));
    nameGeneratorMessage.textContent = keywordInput && !usableKeyword
      ? "Keyword had no usable letters or numbers. Generated random suggestions instead."
      : "Generated 6 suggestions locally.";
  }
  $("generateNames").addEventListener("click", generateNames);
  generateNames();

  $("copyPassword").addEventListener("click", async () => {
    const password = $("generatedPassword").value;
    if (!password) { $("generatorMessage").textContent = "Generate a password before copying."; return; }
    try {
      await navigator.clipboard.writeText(password);
      $("generatorMessage").textContent = "Copied to clipboard. Remember to save it in a password manager.";
    } catch (error) {
      $("generatorMessage").textContent = "Clipboard access failed. Select and copy the password manually.";
    }
  });
  generatePassword();

  function estimateStrength(password) {
    let pool = 0;
    if (/[a-z]/.test(password)) pool += 26;
    if (/[A-Z]/.test(password)) pool += 26;
    if (/\d/.test(password)) pool += 10;
    if (/[^A-Za-z0-9]/.test(password)) pool += 33;
    const uniqueChars = new Set(password).size;
    let entropy = password.length * Math.log2(Math.max(pool, 1));
    if (uniqueChars <= 2 && password.length > 3) entropy *= 0.4;
    if (/(.)\1{2,}/.test(password)) entropy *= 0.75;
    if (/password|qwerty|letmein|welcome|admin|123456/i.test(password)) entropy *= 0.45;
    if (/(?:0123|1234|2345|abcd|qwer)/i.test(password)) entropy *= 0.75;
    return Math.max(0, Math.round(entropy));
  }
  function updateStrength() {
    const password = $("passwordToCheck").value;
    const meter = $("strengthFill");
    const list = $("strengthFeedback");
    if (!password) {
      meter.style.width = "0";
      $("strengthLabel").textContent = "Waiting for input";
      $("strengthBits").textContent = "";
      list.replaceChildren(Object.assign(document.createElement("li"), { textContent: "Enter a password to see suggestions." }));
      return;
    }
    const bits = estimateStrength(password);
    const level = password.length < 8 || bits < 28 ? "Weak" : bits < 55 ? "Fair" : bits < 80 ? "Good" : "Strong";
    const colors = { Weak: "#ff7070", Fair: "#ffbf66", Good: "#7cc8ff", Strong: "#83f5a1" };
    meter.style.width = Math.min(100, Math.max(8, bits / 1.1)) + "%";
    meter.style.background = colors[level];
    $("strengthLabel").textContent = level + " (estimate)";
    $("strengthBits").textContent = "≈ " + bits + " bits";
    const suggestions = [];
    if (password.length < 14) suggestions.push("Try making it longer — 14+ characters is a useful target.");
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) suggestions.push("Mix uppercase and lowercase letters.");
    if (!/\d/.test(password)) suggestions.push("Add numbers or symbols, or use a longer passphrase.");
    if (/(.)\1{2,}|1234|qwerty|password|welcome|admin/i.test(password)) suggestions.push("Avoid repeated characters and common patterns.");
    if (!suggestions.length) suggestions.push("Looks more robust. Use it for one account only and store it safely.");
    list.replaceChildren(...suggestions.map((text) => Object.assign(document.createElement("li"), { textContent: text })));
  }
  $("passwordToCheck").addEventListener("input", updateStrength);
  $("togglePasswordVisibility").addEventListener("click", (event) => {
    const input = $("passwordToCheck");
    const visible = input.type === "password";
    input.type = visible ? "text" : "password";
    event.currentTarget.textContent = visible ? "HIDE" : "SHOW";
    event.currentTarget.setAttribute("aria-label", visible ? "Hide password" : "Show password");
  });

  const fileInput = $("fileInput");
  const dropZone = $("fileDrop");
  const fileStatus = $("fileStatus");
  const hashResult = $("hashResult");
  let currentHash = "";
  async function hashFile(file) {
    hashResult.classList.add("hidden");
    $("hashError").textContent = "";
    currentHash = "";
    if (!file) return;
    if (!window.crypto || !window.crypto.subtle) {
      $("hashError").textContent = "SHA-256 is unavailable. Use a modern browser in a secure context (HTTPS or localhost).";
      return;
    }
    fileStatus.textContent = "Calculating SHA-256 for " + file.name + "…";
    try {
      const digest = await window.crypto.subtle.digest("SHA-256", await file.arrayBuffer());
      currentHash = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
      $("hashValue").textContent = currentHash;
      hashResult.classList.remove("hidden");
      fileStatus.textContent = file.name + " · " + formatBytes(file.size);
    } catch (error) {
      fileStatus.textContent = "Files are read locally and are not uploaded.";
      $("hashError").textContent = "Could not read or hash this file. Please try another file.";
    }
  }
  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + " B";
    const units = ["KB", "MB", "GB", "TB"];
    let value = bytes / 1024;
    let unit = 0;
    while (value >= 1024 && unit < units.length - 1) { value /= 1024; unit++; }
    return value.toFixed(1) + " " + units[unit];
  }
  fileInput.addEventListener("change", () => hashFile(fileInput.files[0]));
  ["dragenter", "dragover"].forEach((name) => dropZone.addEventListener(name, (event) => { event.preventDefault(); dropZone.classList.add("dragging"); }));
  ["dragleave", "drop"].forEach((name) => dropZone.addEventListener(name, (event) => { event.preventDefault(); dropZone.classList.remove("dragging"); }));
  dropZone.addEventListener("drop", (event) => hashFile(event.dataTransfer.files[0]));
  $("copyHash").addEventListener("click", async () => {
    if (!currentHash) return;
    try {
      await navigator.clipboard.writeText(currentHash);
      fileStatus.textContent = "SHA-256 hash copied to clipboard.";
    } catch (error) {
      $("hashError").textContent = "Clipboard access failed. Select and copy the hash manually.";
    }
  });

  const questions = [
    { question: "You receive an unexpected email asking you to verify your account through a link. What is the safest next step?", options: ["Click the link and check if the page looks real", "Open the service using its official app or a saved address", "Reply and ask whether the message is genuine"], answer: 1, explanation: "Go to the service directly using its official app or a known address. Unexpected links can lead to convincing fake sign-in pages." },
    { question: "A website you use announces a data breach. What should you do first?", options: ["Change that site's password and any reused passwords", "Wait to see if you notice unusual activity", "Delete the notification email"], answer: 0, explanation: "Change the affected password promptly, and change it anywhere else you reused it. Unique passwords limit damage from a breach." },
    { question: "You need to sign in to an important account. Which extra step helps protect it?", options: ["Use a longer username", "Enable multifactor authentication", "Save the password in a draft email"], answer: 1, explanation: "Multifactor authentication adds another verification step if a password is exposed. A passkey or authenticator is a good option." },
    { question: "A stranger messages you a QR code to claim a prize. What should you do?", options: ["Scan it, but do not enter your password", "Avoid scanning and verify the offer through an official channel", "Forward it to friends to ask if it is real"], answer: 1, explanation: "QR codes can hide links to phishing pages or harmful downloads. Verify the offer independently instead of trusting an unsolicited code." },
    { question: "You are using public Wi-Fi. Which action is the best everyday precaution?", options: ["Turn off device updates permanently", "Avoid sensitive tasks unless using a trusted connection and official HTTPS sites", "Use the same password everywhere so it is easier to remember"], answer: 1, explanation: "Use trusted networks for sensitive activity when possible, keep your device updated, and check that sites use HTTPS. A VPN is not a substitute for caution." }
  ];
  let quizIndex = 0;
  let quizScore = 0;
  let chosenAnswer = null;
  let answered = false;
  function renderQuestion() {
    const question = questions[quizIndex];
    $("quizStep").textContent = "QUESTION " + String(quizIndex + 1).padStart(2, "0") + " / " + String(questions.length).padStart(2, "0");
    $("quizProgress").style.width = ((quizIndex + 1) / questions.length * 100) + "%";
    $("quizQuestion").textContent = question.question;
    $("quizFeedback").textContent = "";
    $("quizNext").textContent = "CHECK ANSWER";
    $("quizNext").disabled = true;
    chosenAnswer = null;
    answered = false;
    $("quizComplete").classList.add("hidden");
    $("quizQuestion").classList.remove("hidden");
    $("quizOptions").classList.remove("hidden");
    $("quizOptions").replaceChildren(...question.options.map((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "quiz-option";
      button.textContent = option;
      button.addEventListener("click", () => {
        if (answered) return;
        chosenAnswer = index;
        $("quizOptions").querySelectorAll(".quiz-option").forEach((item) => item.classList.remove("selected"));
        button.classList.add("selected");
        $("quizNext").disabled = false;
      });
      return button;
    }));
  }
  $("quizNext").addEventListener("click", () => {
    if (chosenAnswer === null) return;
    const question = questions[quizIndex];
    if (!answered) {
      answered = true;
      const options = [...$("quizOptions").querySelectorAll(".quiz-option")];
      options.forEach((option, index) => { option.disabled = true; if (index === question.answer) option.classList.add("correct"); });
      if (chosenAnswer === question.answer) { quizScore++; $("quizFeedback").textContent = "Correct. " + question.explanation; }
      else { options[chosenAnswer].classList.add("incorrect"); $("quizFeedback").textContent = "Not quite. " + question.explanation; }
      $("quizNext").textContent = quizIndex === questions.length - 1 ? "SEE RESULTS" : "NEXT QUESTION";
      return;
    }
    quizIndex++;
    if (quizIndex < questions.length) { renderQuestion(); return; }
    $("quizQuestion").classList.add("hidden");
    $("quizOptions").classList.add("hidden");
    $("quizFeedback").classList.add("hidden");
    $("quizNext").classList.add("hidden");
    $("quizComplete").classList.remove("hidden");
    $("quizScore").textContent = quizScore + " / " + questions.length;
    $("quizSummary").textContent = quizScore === questions.length ? "Excellent instincts. Keep those habits going." : "A little practice goes a long way. Review the explanations and try again.";
  });
  $("quizRestart").addEventListener("click", () => {
    quizIndex = 0;
    quizScore = 0;
    $("quizFeedback").classList.remove("hidden");
    $("quizNext").classList.remove("hidden");
    renderQuestion();
  });
  renderQuestion();

  const tips = [
    { title: "Give every account its own password.", description: "When one service is breached, attackers often try those credentials elsewhere. A password manager makes unique, strong passwords easier to use." },
    { title: "Turn on multifactor authentication.", description: "Add a second step to protect important accounts. Prefer a passkey or authenticator app when available, and keep recovery options up to date." },
    { title: "Pause before opening unexpected links.", description: "Check who sent the message and whether you were expecting it. Visit the organization directly instead of signing in through a message link." },
    { title: "Install updates from official sources.", description: "Updates fix security issues as well as bugs. Turn on automatic updates for your operating system, browser, and everyday apps." },
    { title: "Back up the files you cannot replace.", description: "Keep a current backup separate from your main device. A disconnected or versioned backup can help recover from device loss or ransomware." },
    { title: "Review app permissions now and then.", description: "Remove access an app no longer needs, such as location, microphone, contacts, or camera. Uninstall apps you no longer use." },
    { title: "Lock your screen when you step away.", description: "Use a strong device passcode and a short automatic lock timeout. It is a small step that helps protect your data if your device is unattended." }
  ];
  let tipIndex = 0;
  function showTip() {
    const tip = tips[tipIndex];
    $("tipTitle").textContent = tip.title;
    $("tipDescription").textContent = tip.description;
    $("tipCount").textContent = "FIELD NOTE " + String(tipIndex + 1).padStart(2, "0") + " / " + String(tips.length).padStart(2, "0");
  }
  $("nextTip").addEventListener("click", () => { tipIndex = (tipIndex + 1) % tips.length; showTip(); });
  showTip();
})();