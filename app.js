/* ===========================================================================
   IELTS Speaking Coach — App logic
   - tab navigation
   - Part 1/3 practice, Part 2 cue cards with timers
   - recording (MediaRecorder) + speech-to-text (Web Speech API)
   - automatic band estimate (FC / LR / GRA / P proxies)
   - Band 7/8/9 model answers + band-descriptor reference
   =========================================================================== */
(function () {
  "use strict";
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* -------------------------------------------------------- tab navigation */
  $$("#tabs button").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$("#tabs button").forEach((b) => b.classList.remove("active"));
      $$(".view").forEach((v) => v.classList.remove("active"));
      btn.classList.add("active");
      $("#view-" + btn.dataset.view).classList.add("active");
    });
  });
  function goToTab(name) {
    const btn = $(`#tabs button[data-view="${name}"]`);
    if (btn) btn.click();
  }

  /* ============================================ PRACTICE (Part 1 & Part 3) */
  let practicePart = "1";
  function practiceData() {
    return practicePart === "1" ? DATA.PART1 : DATA.PART3;
  }
  function practiceTopicName(item) {
    return practicePart === "1" ? item.topic : item.theme;
  }
  function renderPracticeTopics() {
    const wrap = $("#practice-topic-chips");
    wrap.innerHTML = practiceData()
      .map((it, i) => `<button class="chip${i === 0 ? " active" : ""}" data-i="${i}">${esc(practiceTopicName(it))}</button>`)
      .join("");
    $$("#practice-topic-chips .chip").forEach((c) =>
      c.addEventListener("click", () => {
        $$("#practice-topic-chips .chip").forEach((x) => x.classList.remove("active"));
        c.classList.add("active");
        renderPracticeQuestions(+c.dataset.i);
      })
    );
    renderPracticeQuestions(0);
  }
  function renderPracticeQuestions(i) {
    const item = practiceData()[i];
    const qs = item.questions;
    let html = `<div class="card"><h3>${esc(practiceTopicName(item))}</h3><ul class="qlist">`;
    qs.forEach((q, n) => {
      html += `<li><span class="qtext"><span class="q-num">${n + 1}</span>${esc(q)}</span>
        <button class="btn btn-ghost btn-sm" data-q="${esc(q)}">Practise this 🎙️</button></li>`;
    });
    html += `</ul></div>`;
    $("#practice-questions").innerHTML = html;
    $$("#practice-questions [data-q]").forEach((b) =>
      b.addEventListener("click", () => loadPromptAndRecord(`Part ${practicePart}`, b.dataset.q))
    );
  }
  $$("#practice-part-chips .chip").forEach((c) =>
    c.addEventListener("click", () => {
      $$("#practice-part-chips .chip").forEach((x) => x.classList.remove("active"));
      c.classList.add("active");
      practicePart = c.dataset.part;
      renderPracticeTopics();
    })
  );

  /* ===================================================== CUE CARDS (Part 2) */
  function renderCueChips() {
    const wrap = $("#cue-chips");
    wrap.innerHTML = DATA.PART2.map(
      (c, i) => `<button class="chip${i === 0 ? " active" : ""}" data-i="${i}">${esc(c.category)}</button>`
    ).join("");
    $$("#cue-chips .chip").forEach((c) =>
      c.addEventListener("click", () => {
        $$("#cue-chips .chip").forEach((x) => x.classList.remove("active"));
        c.classList.add("active");
        renderCue(+c.dataset.i);
      })
    );
    renderCue(0);
  }
  let cueTimer = null;
  function renderCue(i) {
    const c = DATA.PART2[i];
    let html = `<div class="cue">
      <h3>${esc(c.title)}</h3>
      <p class="rubric">You should say:</p>
      <ul>${c.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
    </div>
    <div class="card timer-wrap" style="margin-top:16px;">
      <div class="timer-label" id="cue-phase">Preparation</div>
      <div class="timer prep" id="cue-clock">1:00</div>
      <div class="btn-row" style="justify-content:center;">
        <button class="btn btn-primary" id="cue-start">Start 1-min prep</button>
        <button class="btn btn-ghost" id="cue-skip">Skip to speaking</button>
        <button class="btn btn-ghost" id="cue-reset">Reset</button>
      </div>
      <div class="btn-row" style="justify-content:center; margin-top:12px;">
        <button class="btn btn-ghost btn-sm" id="cue-practise">Record this answer 🎙️</button>
      </div>
    </div>`;
    $("#cue-content").innerHTML = html;
    stopCueTimer();
    bindCueTimer(c);
  }
  function stopCueTimer() {
    if (cueTimer) { clearInterval(cueTimer); cueTimer = null; }
  }
  function bindCueTimer(card) {
    const clock = $("#cue-clock");
    const phase = $("#cue-phase");
    function setClock(sec) {
      const m = Math.floor(sec / 60), s = sec % 60;
      clock.textContent = `${m}:${s.toString().padStart(2, "0")}`;
    }
    function runPhase(label, seconds, cls, onDone) {
      stopCueTimer();
      phase.textContent = label;
      clock.className = "timer " + cls;
      let left = seconds;
      setClock(left);
      cueTimer = setInterval(() => {
        left--;
        setClock(Math.max(left, 0));
        if (left <= 0) { stopCueTimer(); if (onDone) onDone(); }
      }, 1000);
    }
    const startSpeaking = () => {
      try { new Audio("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=").play().catch(()=>{}); } catch (e) {}
      runPhase("Speaking (aim for 1–2 min)", 120, "speak", () => { phase.textContent = "Time's up — round off your answer"; });
    };
    $("#cue-start").addEventListener("click", () => runPhase("Preparation — make notes", 60, "prep", startSpeaking));
    $("#cue-skip").addEventListener("click", startSpeaking);
    $("#cue-reset").addEventListener("click", () => { stopCueTimer(); phase.textContent = "Preparation"; clock.className = "timer prep"; clock.textContent = "1:00"; });
    $("#cue-practise").addEventListener("click", () => loadPromptAndRecord("Part 2", card.title));
  }

  /* ============================================== RECORD & SCORE (core) */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let mediaRecorder = null, audioChunks = [], recognition = null;
  let recording = false, finalTranscript = "", interim = "";
  let startTime = 0, elapsedMs = 0, statusTimer = null;

  function loadPromptAndRecord(partLabel, question) {
    $("#rec-prompt-title").textContent = partLabel + " question";
    $("#rec-prompt-text").textContent = "“" + question + "”";
    resetScore();
    goToTab("record");
  }
  function resetScore() {
    $("#score-panel").classList.add("hidden");
    $("#score-panel").innerHTML = "";
    finalTranscript = ""; interim = "";
    $("#rec-transcript").innerHTML = '<span class="placeholder">Your transcribed words will appear here as you speak…</span>';
  }

  if (!SR) {
    $("#speech-support-note").innerHTML =
      "<b>Note:</b> your browser doesn't support live speech-to-text, so automatic scoring is unavailable here. " +
      "You can still record and play back your audio. For scoring, open this app in <b>Google Chrome</b> or <b>Microsoft Edge</b> on desktop.";
  }

  $("#rec-btn").addEventListener("click", async () => {
    if (recording) { stopRecording(); return; }
    await startRecording();
  });
  $("#rec-clear").addEventListener("click", () => {
    $("#rec-audio").classList.add("hidden");
    $("#rec-audio").src = "";
    $("#rec-clear").disabled = true;
    elapsedMs = 0;
    resetScore();
    $("#rec-status").textContent = "";
  });

  async function startRecording() {
    resetScore();
    // audio capture (best-effort)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(stream);
      audioChunks = [];
      mediaRecorder.ondataavailable = (e) => { if (e.data.size) audioChunks.push(e.data); };
      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        const a = $("#rec-audio");
        a.src = url; a.classList.remove("hidden");
        stream.getTracks().forEach((t) => t.stop());
      };
      mediaRecorder.start();
    } catch (e) {
      alert("Microphone access was blocked. Please allow the mic to record.");
      return;
    }
    // speech recognition (for scoring)
    finalTranscript = "";
    if (SR) {
      recognition = new SR();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";
      recognition.onresult = (ev) => {
        interim = "";
        for (let i = ev.resultIndex; i < ev.results.length; i++) {
          const t = ev.results[i][0].transcript;
          if (ev.results[i].isFinal) finalTranscript += t + " ";
          else interim += t;
        }
        renderTranscript();
      };
      recognition.onerror = () => {};
      recognition.onend = () => { if (recording) try { recognition.start(); } catch (e) {} };
      try { recognition.start(); } catch (e) {}
    }
    recording = true;
    startTime = Date.now();
    $("#rec-btn").textContent = "■ Stop & score";
    $("#rec-btn").classList.add("recording");
    $("#rec-clear").disabled = true;
    statusTimer = setInterval(() => {
      const s = Math.floor((Date.now() - startTime) / 1000);
      $("#rec-status").textContent = `Recording… ${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
    }, 250);
  }

  function stopRecording() {
    recording = false;
    elapsedMs = Date.now() - startTime;
    clearInterval(statusTimer);
    if (mediaRecorder && mediaRecorder.state !== "inactive") mediaRecorder.stop();
    if (recognition) { try { recognition.stop(); } catch (e) {} }
    $("#rec-btn").textContent = "● Start recording";
    $("#rec-btn").classList.remove("recording");
    $("#rec-clear").disabled = false;
    $("#rec-status").textContent = "Processing…";
    // give recognition a moment to flush final results
    setTimeout(() => {
      $("#rec-status").textContent = "";
      const text = (finalTranscript + " " + interim).trim();
      if (!SR) {
        showScoreUnavailable("Speech recognition isn't supported in this browser, so an automatic band score can't be generated. Your recording is ready to play back above.");
      } else if (text.split(/\s+/).filter(Boolean).length < 8) {
        showScoreUnavailable("Not enough speech was captured to score (try speaking for at least 20–30 seconds, clearly and close to the mic).");
      } else {
        renderScore(scoreAnswer(text, elapsedMs / 1000));
      }
    }, 700);
  }

  function renderTranscript() {
    const el = $("#rec-transcript");
    const f = esc(finalTranscript);
    const i = esc(interim);
    if (!f && !i) { el.innerHTML = '<span class="placeholder">Listening…</span>'; return; }
    el.innerHTML = f + '<span style="color:#94a3b8;">' + i + "</span>";
  }

  function showScoreUnavailable(msg) {
    const p = $("#score-panel");
    p.classList.remove("hidden");
    p.innerHTML = `<div class="notice">${esc(msg)}</div>`;
  }

  /* ----------------------------------------------- SCORING ENGINE -------- */
  // Measurable proxies for the 4 IELTS criteria. This is practice guidance,
  // NOT an official score — pronunciation especially cannot be judged from text.
  const FILLERS = ["um", "uh", "er", "erm", "ah", "like", "you know", "i mean", "basically", "actually", "sort of", "kind of"];
  const LINKERS = ["because", "however", "although", "though", "therefore", "moreover", "furthermore", "whereas",
    "on the other hand", "for example", "for instance", "in addition", "as a result", "firstly", "secondly",
    "in contrast", "meanwhile", "overall", "in conclusion", "that said", "on the whole", "while", "since",
    "so that", "in order to", "as long as", "even though", "despite", "nevertheless"];
  const ADVANCED = ["arguably", "inevitably", "fundamentally", "predominantly", "consequently", "undoubtedly",
    "notably", "essentially", "ultimately", "presumably", "considerably", "significantly", "genuinely",
    "double-edged", "outdated", "burnout", "recharge", "isolate", "accountability", "sustainable",
    "breathtaking", "sentimental", "wealth", "open-minded", "forward-looking", "blend", "crucial",
    "drawn", "gravitate", "treasure", "unwind", "sap", "blessing", "phenomenon", "tendency",
    "perspective", "compelling", "alleviate", "mitigate", "prevalent", "nuance"];
  const COMPLEX_MARKERS = [
    /\bif\b.+\bwould\b/i, /\bwould\b/i, /\bcould\b/i, /\bmight\b/i,           // conditionals/modals
    /\bwhich\b/i, /\bwho\b/i, /\bwhose\b/i, /\bwhom\b/i, /\bwhere\b/i,         // relative clauses
    /\bhave been\b|\bhas been\b|\bhad been\b/i,                                 // perfect/passive
    /\bhave\b \w+ed\b|\bhas\b \w+ed\b/i,                                        // present perfect
    /\bbeing\b/i, /\bwhereas\b/i, /\balthough\b/i, /\bdespite\b/i,
  ];

  function clampBand(b) { return Math.max(4, Math.min(9, b)); }
  function roundHalf(b) { return Math.round(b * 2) / 2; }

  function scoreAnswer(text, seconds) {
    const clean = text.toLowerCase().replace(/[^a-z'\s]/g, " ").replace(/\s+/g, " ").trim();
    const words = clean.split(" ").filter(Boolean);
    const wc = words.length;
    seconds = Math.max(seconds, 1);
    const wpm = (wc / seconds) * 60;

    // sentences (rough: by recognition we lack punctuation, so estimate via linkers + length)
    const sentencesGuess = Math.max(1, Math.round(wc / 14));

    // ---- Fluency & Coherence ----
    let fillerCount = 0;
    FILLERS.forEach((f) => { const m = clean.match(new RegExp("\\b" + f.replace(/ /g, "\\s") + "\\b", "g")); if (m) fillerCount += m.length; });
    const fillerRatio = fillerCount / wc;
    let linkerCount = 0;
    LINKERS.forEach((l) => { if (clean.includes(l)) linkerCount++; });

    let fc = 5;
    if (wpm >= 110 && wpm <= 175) fc += 1.5; else if (wpm >= 90 && wpm < 110) fc += 0.8; else if (wpm > 175) fc += 0.5; else fc += 0.2;
    if (wc >= 70) fc += 1.0; else if (wc >= 45) fc += 0.6; else if (wc >= 25) fc += 0.3;
    if (fillerRatio < 0.03) fc += 1.0; else if (fillerRatio < 0.06) fc += 0.5; else if (fillerRatio > 0.12) fc -= 0.6;
    if (linkerCount >= 4) fc += 0.8; else if (linkerCount >= 2) fc += 0.4;
    fc = clampBand(fc);

    // ---- Lexical Resource ----
    const unique = new Set(words);
    // type-token ratio is unreliable on very short samples, so trust it less when wc is small
    const ttrRaw = unique.size / wc;
    const ttr = wc < 30 ? Math.min(ttrRaw, 0.55) : ttrRaw;
    let advCount = 0; ADVANCED.forEach((a) => { if (clean.includes(a)) advCount++; });
    let lr = 5;
    if (ttr >= 0.62) lr += 1.6; else if (ttr >= 0.52) lr += 1.0; else if (ttr >= 0.42) lr += 0.5;
    if (advCount >= 4) lr += 1.4; else if (advCount >= 2) lr += 0.9; else if (advCount >= 1) lr += 0.4;
    if (wc >= 60 && unique.size >= 45) lr += 0.5;
    // short answers can't demonstrate lexical range — cap the score
    if (wc < 20) lr = Math.min(lr, 5.5); else if (wc < 35) lr = Math.min(lr, 6.5);
    lr = clampBand(lr);

    // ---- Grammatical Range & Accuracy ----
    let complexHits = 0;
    COMPLEX_MARKERS.forEach((re) => { if (re.test(text)) complexHits++; });
    const avgSentLen = wc / sentencesGuess;
    let gra = 5;
    if (complexHits >= 5) gra += 1.7; else if (complexHits >= 3) gra += 1.1; else if (complexHits >= 1) gra += 0.5;
    if (avgSentLen >= 12 && avgSentLen <= 22) gra += 0.9; else if (avgSentLen > 8) gra += 0.4;
    if (wc >= 60) gra += 0.4;
    gra = clampBand(gra);

    // ---- Pronunciation (cannot be heard from text) ----
    // Estimated conservatively from fluency proxies; flagged as inferred.
    let p = clampBand((fc + lr) / 2 - 0.3);

    const overall = roundHalf((fc + lr + gra + p) / 4);

    return {
      overall,
      criteria: [
        { key: "FC", name: "Fluency & Coherence", band: roundHalf(fc), note: fcNote(wpm, fillerRatio, linkerCount, wc) },
        { key: "LR", name: "Lexical Resource", band: roundHalf(lr), note: lrNote(ttr, advCount) },
        { key: "GRA", name: "Grammatical Range & Accuracy", band: roundHalf(gra), note: graNote(complexHits) },
        { key: "P", name: "Pronunciation", band: roundHalf(p), note: "Estimated from fluency only — text can't capture sounds, stress or intonation. Record &amp; listen back, or ask a teacher to judge this." },
      ],
      metrics: {
        words: wc, seconds: Math.round(seconds), wpm: Math.round(wpm),
        fillers: fillerCount, linkers: linkerCount, unique: unique.size,
        ttr: (ttr * 100).toFixed(0) + "%", complex: complexHits,
      },
      tips: buildTips(wpm, fillerRatio, linkerCount, ttr, advCount, complexHits, wc),
    };
  }
  function fcNote(wpm, fr, lk, wc) {
    const bits = [];
    bits.push(wpm < 90 ? "Pace is a little slow." : wpm > 175 ? "Pace is very fast — slow down for clarity." : "Good speaking pace.");
    if (fr > 0.1) bits.push("Quite a few fillers — try to pause silently instead.");
    bits.push(lk >= 3 ? "Nice use of linking words." : "Add more linkers (because, however, for example).");
    if (wc < 45) bits.push("Extend your answer — keep developing your ideas.");
    return bits.join(" ");
  }
  function lrNote(ttr, adv) {
    const bits = [];
    bits.push(ttr >= 0.55 ? "Good vocabulary range." : "Try not to repeat the same words — paraphrase.");
    bits.push(adv >= 2 ? "Includes less-common/idiomatic words — great." : "Add some less-common vocabulary and collocations.");
    return bits.join(" ");
  }
  function graNote(complex) {
    return complex >= 3
      ? "Good range of complex structures (conditionals, relative clauses, perfect tenses)."
      : "Use more complex structures: 'if I were…', 'which means…', 'I've always…'.";
  }
  function buildTips(wpm, fr, lk, ttr, adv, complex, wc) {
    const t = [];
    if (wc < 50) t.push("Speak longer — aim for 40+ words in Part 1 and a full 1–2 minutes in Part 2.");
    if (wpm > 175) t.push("Slow down slightly; speaking too fast hurts clarity and pronunciation marks.");
    if (fr > 0.08) t.push("Replace fillers (um, like, you know) with short silent pauses.");
    if (lk < 3) t.push("Weave in more linkers: because, although, on the other hand, for example.");
    if (ttr < 0.5) t.push("Avoid repeating words — paraphrase with synonyms.");
    if (adv < 2) t.push("Add 1–2 idioms or less-common phrases (e.g. 'a double-edged sword', 'hands down').");
    if (complex < 3) t.push("Show grammar range: try a conditional ('if I had…'), a relative clause ('…which is why…') and the present perfect.");
    if (t.length === 0) t.push("Strong answer! Keep this level up and focus on natural intonation and stress.");
    return t.slice(0, 5);
  }

  function renderScore(r) {
    const p = $("#score-panel");
    p.classList.remove("hidden");
    const critHtml = r.criteria.map((c) => `
      <div class="crit">
        <div class="top"><span class="cname">${c.name}</span><span class="cband">${c.band.toFixed(1)}</span></div>
        <div class="bar"><span style="width:${(c.band / 9) * 100}%"></span></div>
        <div class="cnote">${c.note}</div>
      </div>`).join("");
    const m = r.metrics;
    const metricHtml = `
      <span class="metric"><b>${m.words}</b> words</span>
      <span class="metric"><b>${m.seconds}s</b> spoken</span>
      <span class="metric"><b>${m.wpm}</b> words/min</span>
      <span class="metric"><b>${m.unique}</b> unique words</span>
      <span class="metric"><b>${m.ttr}</b> range</span>
      <span class="metric"><b>${m.fillers}</b> fillers</span>
      <span class="metric"><b>${m.linkers}</b> linkers</span>
      <span class="metric"><b>${m.complex}</b> complex structures</span>`;
    const tips = r.tips.map((t) => `<li>${esc(t)}</li>`).join("");
    p.innerHTML = `
      <div class="score-overall">
        <div class="lbl">Estimated overall band</div>
        <div class="big">${r.overall.toFixed(1)}</div>
        <div class="lbl">practice guidance — not an official score</div>
      </div>
      <div class="criteria-grid">${critHtml}</div>
      <div class="card" style="margin-top:14px;">
        <h4 class="notes" style="margin:0 0 8px;">Measured from your speech</h4>
        <div class="metrics">${metricHtml}</div>
      </div>
      <div class="card">
        <h4 class="notes" style="margin:0 0 8px;">How to push your band higher</h4>
        <ul class="qlist" style="list-style:none;">${tips.replace(/<li>/g, '<li style="background:var(--green-soft);">').replace(/<\/li>/g, "</li>")}</ul>
      </div>
      <div class="notice">Pronunciation can't be judged from text. Play back your recording above and listen for clear final consonants, word stress and intonation.</div>`;
    p.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ================================================ MODEL ANSWERS ======== */
  let modelPart = "1";
  function modelData() {
    return modelPart === "1" ? DATA.PART1 : modelPart === "2" ? DATA.PART2 : DATA.PART3;
  }
  function modelTopicName(it) {
    return modelPart === "1" ? it.topic : modelPart === "2" ? it.title : it.theme;
  }
  $$("#model-part-chips .chip").forEach((c) =>
    c.addEventListener("click", () => {
      $$("#model-part-chips .chip").forEach((x) => x.classList.remove("active"));
      c.classList.add("active");
      modelPart = c.dataset.part;
      renderModelTopics();
    })
  );
  function renderModelTopics() {
    $("#model-topic-chips").innerHTML = modelData()
      .map((it, i) => `<button class="chip${i === 0 ? " active" : ""}" data-i="${i}">${esc(modelTopicName(it))}</button>`)
      .join("");
    $$("#model-topic-chips .chip").forEach((c) =>
      c.addEventListener("click", () => {
        $$("#model-topic-chips .chip").forEach((x) => x.classList.remove("active"));
        c.classList.add("active");
        renderModel(+c.dataset.i);
      })
    );
    renderModel(0);
  }
  let currentBand = 8;
  function vocabTable(vocab) {
    if (!vocab || !vocab.length) return "";
    return `<div class="notes"><h4>Key vocabulary &amp; collocations</h4><table class="vocab">${vocab
      .map((x) => `<tr><td class="w">${esc(x.word)}</td><td class="vi">${esc(x.vi)}</td><td>${esc(x.collocation)}</td></tr>`)
      .join("")}</table></div>`;
  }
  function grammarTags(g) {
    if (!g || !g.length) return "";
    return `<div class="notes"><h4>Grammar highlights</h4><div class="tags">${g.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div></div>`;
  }
  function renderModel(i) {
    const it = modelData()[i];
    let html = "";
    if (modelPart === "2") {
      html = `<div class="cue"><h3>${esc(it.title)}</h3><p class="rubric">You should say:</p>
        <ul>${it.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul></div>
        <div class="card" style="margin-top:14px;">
          <h4 class="notes" style="margin:0 0 8px;">Band 8 model answer (≈1.5–2 min spoken)</h4>
          <div class="model-text">${esc(it.model8)}</div>
          ${vocabTable(it.vocab)}${grammarTags(it.grammar)}
        </div>`;
    } else {
      // Part 1 or 3: show a question + band toggle
      const q = modelPart === "1" ? it.questions[1] : it.sample.q;
      const models = modelPart === "1" ? it.models : { 8: it.sample[8] };
      const hasAll = modelPart === "1";
      html = `<div class="card">
        <h3>${esc(modelTopicName(it))}</h3>
        <p class="section-intro" style="margin:0 0 14px;"><b>Q:</b> ${esc(q)}</p>`;
      if (hasAll) {
        html += `<div class="band-toggle" id="band-toggle">
          ${[7, 8, 9].map((b) => `<button data-b="${b}"${b === currentBand ? ' class="active"' : ""}>Band ${b}</button>`).join("")}
        </div>`;
      }
      html += `<div class="model-text" id="model-answer-text">${esc(hasAll ? models[currentBand] : models[8])}</div>
        ${vocabTable(it.vocab)}${grammarTags(it.grammar)}</div>`;
    }
    $("#model-content").innerHTML = html;
    if (modelPart === "1") {
      $$("#band-toggle button").forEach((b) =>
        b.addEventListener("click", () => {
          currentBand = +b.dataset.b;
          $$("#band-toggle button").forEach((x) => x.classList.remove("active"));
          b.classList.add("active");
          $("#model-answer-text").textContent = it.models[currentBand];
        })
      );
    }
  }

  /* ================================================= BAND GUIDE =========== */
  function renderBands() {
    const d = DATA.BAND_DESCRIPTORS;
    $("#bands-criteria").innerHTML =
      "<h3>The four scoring criteria</h3>" +
      d.criteria.map((c) => `<div class="crit-ref"><h4>${esc(c.name)} (${c.key})</h4><p>${esc(c.desc)}</p></div>`).join("");
    $("#bands-levels").innerHTML =
      "<h3>What Band 7 vs 8 vs 9 sounds like</h3>" +
      d.bands.map((b) => `<div class="bandrow"><div class="bandbadge">${b.band}</div><div><p style="margin:0;">${esc(b.summary)}</p></div></div>`).join("");
    $("#bands-pron").innerHTML =
      "<h3>Pronunciation focus (for Vietnamese speakers)</h3>" +
      `<table class="vocab">${d.pronTips
        .map((t) => `<tr><td class="w">${esc(t.en)}</td><td class="vi">${esc(t.vi)}</td><td>${esc(t.note)}</td></tr>`)
        .join("")}</table>`;
  }

  /* ===================================================== INIT ============= */
  renderPracticeTopics();
  renderCueChips();
  renderModelTopics();
  renderBands();
})();
