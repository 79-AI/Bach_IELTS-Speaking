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
  let recordedBlob = null, recordedExt = "webm";

  // iOS Safari can ONLY record audio/mp4 — it does NOT support audio/webm.
  // Pick the first mime type the device actually supports so playback/saving works everywhere.
  function pickAudioMime() {
    const candidates = [
      { mime: "audio/webm;codecs=opus", ext: "webm" },
      { mime: "audio/webm", ext: "webm" },
      { mime: "audio/mp4", ext: "m4a" },
      { mime: "audio/mp4;codecs=mp4a.40.2", ext: "m4a" },
      { mime: "audio/aac", ext: "aac" },
      { mime: "audio/ogg;codecs=opus", ext: "ogg" },
    ];
    const supports = window.MediaRecorder && typeof MediaRecorder.isTypeSupported === "function";
    for (const c of candidates) {
      if (supports && MediaRecorder.isTypeSupported(c.mime)) return c;
    }
    return { mime: "", ext: "m4a" }; // let the browser choose its default (iOS → mp4)
  }

  let lastPart = "Part 1", lastQuestion = "", lastTranscript = "", lastScore = null;
  function loadPromptAndRecord(partLabel, question) {
    $("#rec-prompt-title").textContent = partLabel + " question";
    $("#rec-prompt-text").textContent = "“" + question + "”";
    lastPart = partLabel; lastQuestion = question;
    resetScore();
    goToTab("record");
  }
  function resetScore() {
    $("#score-panel").classList.add("hidden");
    $("#score-panel").innerHTML = "";
    finalTranscript = ""; interim = "";
    $("#rec-transcript").innerHTML = '<span class="placeholder">Your transcribed words will appear here as you speak…</span>';
    const aiCard = $("#ai-card");
    if (aiCard) { aiCard.classList.add("hidden"); $("#ai-output").innerHTML = ""; }
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
    $("#rec-save").classList.add("hidden");
    $("#rec-save").disabled = true;
    $("#rec-save-hint").classList.add("hidden");
    recordedBlob = null;
    elapsedMs = 0;
    resetScore();
    $("#rec-status").textContent = "";
  });

  // Save / download the recorded audio to the device.
  $("#rec-save").addEventListener("click", () => {
    if (!recordedBlob) { alert("Record something first, then tap Save."); return; }
    const stamp = new Date().toISOString().slice(0, 16).replace(/[:T]/g, "-");
    const fname = `ielts-speaking-${stamp}.${recordedExt}`;
    const url = URL.createObjectURL(recordedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fname;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    $("#rec-save-hint").classList.remove("hidden");
  });

  async function startRecording() {
    resetScore();
    recordedBlob = null;
    $("#rec-save").classList.add("hidden");
    $("#rec-save").disabled = true;
    $("#rec-save-hint").classList.add("hidden");
    // audio capture (best-effort)
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) {
      alert("Audio recording isn't supported in this browser. On iPhone, please use Safari and make sure iOS is up to date.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const chosen = pickAudioMime();
      recordedExt = chosen.ext;
      try {
        mediaRecorder = chosen.mime ? new MediaRecorder(stream, { mimeType: chosen.mime }) : new MediaRecorder(stream);
      } catch (e) {
        mediaRecorder = new MediaRecorder(stream); // fallback: browser default
      }
      audioChunks = [];
      mediaRecorder.ondataavailable = (e) => { if (e.data && e.data.size) audioChunks.push(e.data); };
      mediaRecorder.onstop = () => {
        // Use the recorder's real mime type (iOS reports audio/mp4) so the file is playable & savable.
        const realType = (mediaRecorder && mediaRecorder.mimeType) || chosen.mime || "audio/mp4";
        if (/mp4|aac/.test(realType)) recordedExt = "m4a";
        else if (/webm/.test(realType)) recordedExt = "webm";
        else if (/ogg/.test(realType)) recordedExt = "ogg";
        recordedBlob = new Blob(audioChunks, { type: realType.split(";")[0] });
        const url = URL.createObjectURL(recordedBlob);
        const a = $("#rec-audio");
        a.src = url; a.classList.remove("hidden");
        $("#rec-save").classList.remove("hidden");
        $("#rec-save").disabled = false;
        stream.getTracks().forEach((t) => t.stop());
      };
      mediaRecorder.start();
    } catch (e) {
      alert("Microphone access was blocked. Please allow the mic to record (Settings → Safari → Microphone on iPhone).");
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
      lastTranscript = text;
      lastScore = null;
      if (!SR) {
        showScoreUnavailable("Speech recognition isn't supported in this browser, so an automatic band score can't be generated. Your recording is ready to play back above.");
      } else if (text.split(/\s+/).filter(Boolean).length < 8) {
        showScoreUnavailable("Not enough speech was captured to score (try speaking for at least 20–30 seconds, clearly and close to the mic).");
      } else {
        lastScore = scoreAnswer(text, elapsedMs / 1000);
        renderScore(lastScore);
      }
      showAICard(text);
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

  /* ============================================ AI COACH (improve answer) */
  // ── No-key mode: paste your Cloudflare Worker URL below (see SETUP-AI-PROXY.md).
  //    When set, the app calls your worker (which holds the key) and NOBODY needs
  //    to enter an API key. Leave "" to use paste-your-own-key mode instead.
  const AI_PROXY_URL = "";

  const AI_KEY_STORE = "ielts_ai_key", AI_MODEL_STORE = "ielts_ai_model";
  function getKey() { try { return localStorage.getItem(AI_KEY_STORE) || ""; } catch (e) { return ""; } }
  function getModel() { try { return localStorage.getItem(AI_MODEL_STORE) || ""; } catch (e) { return ""; } }

  function showAICard(text) {
    const card = $("#ai-card");
    if (!card) return;
    card.classList.remove("hidden");
    $("#ai-input").value = text || "";
    $("#ai-output").innerHTML = "";
    // No-key (proxy) mode: hide all key UI — nobody needs a key.
    if (AI_PROXY_URL) {
      $("#ai-settings").classList.add("hidden");
      $("#ai-settings-btn").classList.add("hidden");
      $("#ai-key-status").textContent = "";
      return;
    }
    // reflect saved key state
    const k = getKey();
    $("#ai-key-status").textContent = k ? "✓ key saved" : "no key yet";
    if (!k) $("#ai-settings").classList.remove("hidden");
  }

  // very small, safe markdown → HTML (headings, bold, bullets, paragraphs)
  function miniMarkdown(md) {
    const lines = String(md).replace(/\r/g, "").split("\n");
    let html = "", inList = false;
    const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/\*(.+?)\*/g, "<em>$1</em>");
    for (let raw of lines) {
      const line = raw.trimEnd();
      const h = line.match(/^(#{2,4})\s+(.*)$/);
      const li = line.match(/^[-*]\s+(.*)$/) || line.match(/^\d+\.\s+(.*)$/);
      if (h) { if (inList) { html += "</ul>"; inList = false; } html += `<h5 class="ai-h">${inline(h[2])}</h5>`; }
      else if (li) { if (!inList) { html += '<ul class="ai-ul">'; inList = true; } html += `<li>${inline(li[1])}</li>`; }
      else if (line === "") { if (inList) { html += "</ul>"; inList = false; } }
      else { if (inList) { html += "</ul>"; inList = false; } html += `<p class="ai-p">${inline(line)}</p>`; }
    }
    if (inList) html += "</ul>";
    return html;
  }

  function buildAIPrompt(part, question, transcript, score) {
    const target = /Part 2/i.test(part) ? "about 160–200 words (a 1.5–2 minute long turn)"
      : /Part 3/i.test(part) ? "about 70–110 words (3–6 developed sentences)"
      : "about 40–70 words (2–4 natural sentences)";
    let est = "";
    if (score) {
      const c = {}; score.criteria.forEach((x) => (c[x.key] = x.band));
      est = `The app's rough automatic estimate was: overall ${score.overall}, Fluency&Coherence ${c.FC}, Lexical Resource ${c.LR}, Grammatical Range&Accuracy ${c.GRA}. Treat these as a loose guide only.`;
    }
    return [
      "You are an expert IELTS Speaking examiner and tutor coaching a Vietnamese learner.",
      `The learner answered this ${part} question: "${question || "(free practice)"}"`,
      "Here is an auto-transcript of what they ACTUALLY said (speech-to-text, so ignore minor transcription errors and missing punctuation):",
      `"""${transcript}"""`,
      est,
      "",
      "Respond in GitHub-flavoured markdown using EXACTLY these four sections and headings:",
      "",
      "## Your improved Band 8 answer",
      `Rewrite THEIR answer, keeping their ideas and personal details. Make it sound like natural SPOKEN Band 8 English (contractions, light fillers, flow) — not a written essay. Length: ${target}.`,
      "",
      "## What I upgraded",
      "3–4 bullet points. In each, quote a phrase they said and show the better version, and name the criterion it helps (Fluency & Coherence, Lexical Resource, or Grammatical Range & Accuracy). Format: \"you said X\" → \"try Y\" (criterion).",
      "",
      "## 3 vocabulary upgrades",
      "Three bullets, each: **word/collocation** — short English meaning (Vietnamese gloss in parentheses) — a short example.",
      "",
      "## One thing to practise next",
      "One concrete, encouraging next step.",
      "",
      "Keep it warm, concise and practical. Do not invent facts the learner didn't imply.",
    ].filter(Boolean).join("\n");
  }

  async function callAI(key, model, prompt) {
    // No-key mode: send to your proxy, which holds the key server-side.
    if (AI_PROXY_URL) {
      const res = await fetch(AI_PROXY_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error(await readErr(res));
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      return (data.text || "").trim();
    }
    const isAnthropic = /^sk-ant-/.test(key);
    if (isAnthropic) {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": key,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: model || "claude-sonnet-4-6",
          max_tokens: 1300,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      if (!res.ok) throw new Error(await readErr(res));
      const data = await res.json();
      return (data.content || []).map((b) => b.text || "").join("").trim();
    } else {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "content-type": "application/json", authorization: "Bearer " + key },
        body: JSON.stringify({
          model: model || "gpt-4o-mini",
          max_tokens: 1300,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      if (!res.ok) throw new Error(await readErr(res));
      const data = await res.json();
      return ((data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || "").trim();
    }
  }
  async function readErr(res) {
    let detail = "";
    try { const j = await res.json(); detail = (j.error && (j.error.message || j.error.type)) || JSON.stringify(j); } catch (e) {}
    if (res.status === 401) return "Invalid or unauthorised API key (401). Check the key and try again.";
    if (res.status === 429) return "Rate limit or quota reached (429). Wait a moment or check your account balance.";
    return `Request failed (${res.status}). ${detail}`;
  }

  // ---- AI event wiring ----
  (function bindAI() {
    const card = $("#ai-card");
    if (!card) return;
    $("#ai-settings-btn").addEventListener("click", () => {
      const s = $("#ai-settings");
      s.classList.toggle("hidden");
      if (!s.classList.contains("hidden")) { $("#ai-key").value = getKey(); $("#ai-model").value = getModel(); }
    });
    $("#ai-key-save").addEventListener("click", () => {
      const k = $("#ai-key").value.trim();
      const m = $("#ai-model").value.trim();
      try {
        if (k) localStorage.setItem(AI_KEY_STORE, k);
        localStorage.setItem(AI_MODEL_STORE, m);
      } catch (e) {}
      $("#ai-key-status").textContent = k ? "✓ key saved" : "no key yet";
      if (k) $("#ai-settings").classList.add("hidden");
    });
    $("#ai-key-clear").addEventListener("click", () => {
      try { localStorage.removeItem(AI_KEY_STORE); } catch (e) {}
      $("#ai-key").value = "";
      $("#ai-key-status").textContent = "no key yet";
    });
    $("#ai-go").addEventListener("click", async () => {
      const key = getKey();
      const out = $("#ai-output");
      const transcript = $("#ai-input").value.trim();
      if (!AI_PROXY_URL && !key) {
        out.innerHTML = '<div class="notice">Add your API key first — tap <b>⚙ API key</b> above.</div>';
        $("#ai-settings").classList.remove("hidden");
        return;
      }
      if (transcript.split(/\s+/).filter(Boolean).length < 5) {
        out.innerHTML = '<div class="notice">Please record (or type) a longer answer first.</div>';
        return;
      }
      const btn = $("#ai-go");
      const label = btn.textContent;
      btn.disabled = true; btn.textContent = "✨ Thinking…";
      out.innerHTML = '<div class="notice">Asking the AI examiner to rewrite your answer… this usually takes a few seconds.</div>';
      try {
        const prompt = buildAIPrompt(lastPart, lastQuestion, transcript, lastScore);
        const md = await callAI(key, getModel(), prompt);
        out.innerHTML = md
          ? `<div class="ai-result">${miniMarkdown(md)}</div>`
          : '<div class="notice">The AI returned an empty response — please try again.</div>';
      } catch (e) {
        out.innerHTML = `<div class="notice" style="background:var(--red-soft);">⚠ ${esc(e.message || String(e))}</div>`;
      } finally {
        btn.disabled = false; btn.textContent = label;
      }
    });
  })();

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
