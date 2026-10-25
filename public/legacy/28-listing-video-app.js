/*! (c) 2026 Elliot De la Cruz and iMath Group. All rights reserved. Proprietary and confidential. Licensed for use only; copying, modification, reverse engineering, redistribution or use as a template is prohibited without written permission. */
(function () {
  const r0 = window.iMathLV;
  let r1 = null;
  const r2 = c5 => document.querySelector(c5);
  const r3 = c5 => String(c5 == null ? "" : c5).replace(/[&<>"]/g, c6 => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;"
  })[c6]);
  const r4 = {
    mode: "tour",
    info: {
      head: "listed",
      address: "",
      city: "",
      price: "",
      beds: "",
      baths: "",
      sqft: "",
      courtesy: "",
      remarks: ""
    },
    tour: {
      fmt: "9x16",
      style: "cinematic",
      trans: "mix",
      photoDur: 3.2,
      captions: true,
      lang: "en",
      unbranded: false,
      intro: true,
      outro: true
    },
    polish: {
      fmt: "auto",
      bright: 0,
      contrast: 0,
      warm: 0,
      sat: 0,
      steady: true,
      captions: true,
      lang: "en",
      unbranded: false,
      intro: true,
      outro: true,
      orig: false,
      threeD: false
    },
    audio: {
      tour: {
        music: "none",
        track: "bright",
        voice: "none",
        script: ""
      },
      polish: {
        music: "none",
        track: "calm",
        voice: "none",
        script: ""
      }
    },
    items: [],
    mls: ""
  };
  const r5 = {
    tour: {
      musicBuf: null,
      musicName: "",
      voiceBuf: null,
      voiceName: ""
    },
    polish: {
      musicBuf: null,
      musicName: "",
      voiceBuf: null,
      voiceName: ""
    }
  };
  const r6 = {
    v: null,
    ready: false,
    A: null,
    stab: null,
    scenes: [],
    poster: null,
    file: ""
  };
  const r7 = () => {
    c5 = "imath_lv";
    c6 = {
      info: r4.info,
      tour: r4.tour,
      polish: Object.assign({}, r4.polish, {
        threeD: false
      }),
      audio: r4.audio,
      mls: r4.mls
    };
    return r1.store.set(c5, c6);
    var c5;
    var c6;
  };
  const r8 = (c5, c6) => {
    const c7 = r2(c6 === "polish" ? "#lp_status" : "#lt_status");
    if (c7) {
      c7.textContent = c5 || "";
    }
  };
  const r9 = c5 => r0.TXT[c5 === "es" ? "es" : "en"];
  const rr = c5 => String(c5 || "").toLowerCase().replace(/\b([a-z])/g, c6 => c6.toUpperCase()).replace(/\b(Ne|Nw|Se|Sw|Fl)\b/g, c6 => c6.toUpperCase());
  const rc = c5 => Math.floor(c5 / 60) + ":" + String(Math.floor(c5 % 60)).padStart(2, "0");
  let rl = null;
  const rE = () => {
    if (!rl) {
      const c5 = window.AudioContext || window.webkitAudioContext;
      rl = new c5();
    }
    return rl;
  };
  const rN = new WeakMap();
  function rw(c5) {
    const c6 = r4.info;
    const c7 = Object.keys(r0.TXT.en.heads);
    c5.innerHTML = "<b class=\"fun-mini\">Listing details</b><div class=\"fun-grid\"><label>Headline<select data-i=\"head\">" + c7.map(c8 => "<option value=\"" + c8 + "\"" + (c6.head === c8 ? " selected" : "") + ">" + r3(r0.TXT.en.heads[c8]) + "</option>").join("") + "</select></label>" + [["address", "Street address"], ["city", "City, state"], ["price", "Price"], ["beds", "Beds"], ["baths", "Baths"], ["sqft", "Square feet"]].map(([c8, c9]) => "<label>" + c9 + "<input type=\"text\" data-i=\"" + c8 + "\" value=\"" + r3(c6[c8]) + "\"></label>").join("") + ("<label class=\"fun-wide\">Listing office, if not ours (shows \"Listing courtesy of\")<input type=\"text\" data-i=\"courtesy\" value=\"" + r3(c6.courtesy) + "\" placeholder=\"Leave empty for our own listings\"></label></div>");
    c5.querySelectorAll("[data-i]").forEach(c8 => c8[c8.tagName === "SELECT" ? "onchange" : "oninput"] = () => {
      r4.info[c8.dataset.i] = c8.value;
      r7();
      document.querySelectorAll(".lv-details").forEach(c9 => {
        if (c9 !== c5) {
          rw(c9);
        }
      });
      rI();
      rh();
    });
  }
  function rd(c5, c6, c7, c8, c9) {
    const cr = "g" + Math.random().toString(36).slice(2, 7);
    c5.insertAdjacentHTML("beforeend", "<div class=\"lv-seg\"><b class=\"fun-mini\">" + r3(c6) + "</b><div class=\"seg\" id=\"" + cr + "\">" + c7.map(([cc, cl]) => "<button type=\"button\" class=\"chip\" data-v=\"" + cc + "\" aria-pressed=\"" + (String(cc) === String(c8())) + "\">" + r3(cl) + "</button>").join("") + "</div></div>");
    c5.querySelectorAll("#" + cr + " .chip").forEach(cc => cc.onclick = () => {
      c9(cc.dataset.v);
      c5.querySelectorAll("#" + cr + " .chip").forEach(cl => cl.setAttribute("aria-pressed", String(cl === cc)));
      r7();
    });
  }
  function rY(c5, c6, c7, c8) {
    c5.insertAdjacentHTML("beforeend", "<div class=\"toggles\">" + c6.map(([c9, cr]) => "<label><input type=\"checkbox\" data-k=\"" + c9 + "\"" + (c7[c9] ? " checked" : "") + "> " + r3(cr) + "</label>").join("") + "</div>");
    c5.querySelectorAll(".toggles:last-child input[data-k]").forEach(c9 => c9.onchange = () => {
      c7[c9.dataset.k] = c9.checked;
      r7();
      if (c8) {
        c8();
      }
    });
  }
  async function rC(c5) {
    const c6 = await c5.arrayBuffer();
    return await rE().decodeAudioData(c6);
  }
  function rb(c5) {
    const c6 = r2(c5 === "tour" ? "#lt_audio" : "#lp_audio");
    const c7 = r4.audio[c5];
    const c8 = r5[c5];
    c6.innerHTML = "<p class=\"note\">Most agents add trending music inside Instagram or TikTok. Leave music off for that.</p>\n      <label>Music<select data-a=\"music\"><option value=\"none\">No music (add it in your social app)</option><option value=\"track\">Original iMath track, no licensing needed</option><option value=\"mine\">My own licensed music</option></select></label>\n      <div data-a=\"trackBox\" class=\"lv-sub\"><div class=\"seg\">" + r0.TRACKS.map(([cE, cN]) => "<button type=\"button\" class=\"chip\" data-track=\"" + cE + "\" aria-pressed=\"" + (c7.track === cE) + "\">" + r3(cN) + "</button>").join("") + "</div><button class=\"mini\" type=\"button\" data-a=\"hear\">Hear a preview</button></div>\n      <div data-a=\"mineBox\" class=\"lv-sub file\"><span data-a=\"mineName\">" + r3(c8.musicName || "Upload an MP3, M4A or WAV you have the rights to") + "</span><input type=\"file\" accept=\"audio/*\" data-a=\"mineIn\" aria-label=\"Upload music\"></div>\n      <label style=\"margin-top:10px\">Voiceover<select data-a=\"voice\"><option value=\"none\">No voiceover</option><option value=\"upload\">Upload a recording</option><option value=\"record\">Record it here</option></select></label>\n      <div data-a=\"voiceBox\" class=\"lv-sub\"><div class=\"actions\"><button class=\"btn ghost\" type=\"button\" data-a=\"write\">Write a script with Claude</button><button class=\"mini\" type=\"button\" data-a=\"copy\">Copy script</button></div>\n        <textarea data-a=\"script\" placeholder=\"Your voiceover script. Describe the home, never the buyer.\">" + r3(c7.script) + "</textarea><ul class=\"lv-fh\" data-a=\"fh\"></ul>\n        <div data-a=\"upBox\" class=\"file\"><span data-a=\"voiceName\">" + r3(c8.voiceName || "Upload your voiceover (record it on your phone)") + "</span><input type=\"file\" accept=\"audio/*\" data-a=\"voiceIn\" aria-label=\"Upload voiceover\"></div>\n        <div data-a=\"recBox\" class=\"actions\"><button class=\"btn\" type=\"button\" data-a=\"rec\">Start recording</button><span class=\"note\" data-a=\"recNote\">" + (c8.voiceBuf && c7.voice === "record" ? "Recording saved." : "") + "</span></div></div>";
    const c9 = cE => c6.querySelector("[data-a=\"" + cE + "\"]");
    c9("music").value = c7.music;
    c9("voice").value = c7.voice;
    const cr = () => {
      c9("trackBox").hidden = c7.music !== "track";
      c9("mineBox").hidden = c7.music !== "mine";
      c9("voiceBox").hidden = c7.voice === "none";
      c9("upBox").hidden = c7.voice !== "upload";
      c9("recBox").hidden = c7.voice !== "record";
      cc();
    };
    const cc = () => {
      const cE = r0.fhCheck(c7.script);
      c9("fh").innerHTML = cE.map(cN => "<li><b>\"" + r3(cN.term) + "\"</b>: " + r3(cN.why) + ". " + r3(cN.fix) + ".</li>").join("");
      rh();
    };
    c9("music").onchange = cE => {
      c7.music = cE.target.value;
      r7();
      cr();
      rh();
    };
    c9("voice").onchange = cE => {
      c7.voice = cE.target.value;
      r7();
      cr();
      rh();
    };
    c6.querySelectorAll("[data-track]").forEach(cE => cE.onclick = () => {
      c7.track = cE.dataset.track;
      c6.querySelectorAll("[data-track]").forEach(cN => cN.setAttribute("aria-pressed", String(cN === cE)));
      r7();
    });
    c9("hear").onclick = async () => {
      try {
        const cE = await r0.makeMusic(c7.track, 12);
        const cN = rE().createBufferSource();
        cN.buffer = cE;
        cN.connect(rE().destination);
        await rE().resume();
        cN.start();
      } catch (cw) {
        r8("Audio preview is not available in this browser.", c5);
      }
    };
    c9("mineIn").onchange = async cE => {
      const cN = cE.target.files[0];
      if (cN) {
        try {
          c8.musicBuf = await rC(cN);
          c8.musicName = cN.name;
          c9("mineName").textContent = "Music: " + cN.name;
        } catch (cw) {
          r8("That audio file could not be read. Try an MP3 or M4A.", c5);
        }
        cE.target.value = "";
        rh();
      }
    };
    c9("voiceIn").onchange = async cE => {
      const cN = cE.target.files[0];
      if (cN) {
        try {
          c8.voiceBuf = await rC(cN);
          c8.voiceName = cN.name;
          c9("voiceName").textContent = "Voiceover: " + cN.name + (" (" + Math.round(c8.voiceBuf.duration) + " s)");
        } catch (cw) {
          r8("That audio file could not be read. Try an MP3 or M4A.", c5);
        }
        cE.target.value = "";
        rh();
      }
    };
    c9("script").oninput = cE => {
      c7.script = cE.target.value;
      r7();
      cc();
    };
    c9("copy").onclick = () => r1.copyText(c7.script || "", cE => r8(cE, c5), "Script copied. Record it on your phone, then upload it.");
    c9("write").onclick = () => async function (cE, cN, cw) {
      const cd = r1.sampler;
      if (!cd) {
        r8("Claude is not available in this view. Write your own script, or open the studio from its claude.ai link.", cE);
        return;
      }
      const cY = cE === "tour" ? r4.tour.lang : r4.polish.lang;
      const cC = cE === "tour" ? r4.items.filter(cu => cu.keep).map(cu => cu.room) : r6.scenes.filter(cu => cu.keep).map(cu => cu.room);
      const cb = Math.round(cE === "tour" ? rm().total : rv().total) || 45;
      const cD = r4.info;
      r8("Claude is writing your script...", cE);
      try {
        const cu = await cd.json("Write a warm, natural voiceover script for a real estate listing tour video, in " + (cY === "es" ? "Spanish" : "English") + ", about " + Math.max(15, cb - 6) + " seconds when read aloud (about " + Math.round((cb - 6) * 2.3) + " words).\nFollow the room order: " + ([...new Set(cC)].filter(cs => cs !== "other" && cs !== "hallway").join(", ") || "a general tour") + ".\nFacts you may use (use nothing else, never invent features): " + JSON.stringify({
          address: cD.address,
          city: cD.city,
          price: cD.price,
          beds: cD.beds,
          baths: cD.baths,
          sqft: cD.sqft,
          remarks: String(cD.remarks || "").slice(0, 1200)
        }) + "\nFair Housing: describe the home and its features only, never the buyer or the neighbors. No words about family status, age, religion, race, national origin, sex, disability, or \"safe\" or \"exclusive\" neighborhoods. Say \"primary suite\", not \"master\". No prices or rates other than the list price. End with one short friendly invitation to schedule a showing.\nReply with only JSON: {\"script\":\"\"}", {
          modelTier: "default"
        });
        if (cu && cu.script) {
          r4.audio[cE].script = String(cu.script).trim();
          cN.value = r4.audio[cE].script;
          r7();
          cw();
          r8("Script ready. Edit it, record it, then add it under Voiceover.", cE);
        } else {
          r8("No script came back. Try again.", cE);
        }
      } catch (cs) {
        r8("Claude could not write the script right now. Try again in a moment.", cE);
      }
    }(c5, c9("script"), cc);
    let cl = null;
    c9("rec").onclick = async () => {
      const cE = c9("rec");
      if (cl) {
        cl.stop();
      } else {
        try {
          const cN = await navigator.mediaDevices.getUserMedia({
            audio: true
          });
          const cw = [];
          cl = new MediaRecorder(cN);
          cl.ondataavailable = cd => cw.push(cd.data);
          cl.onstop = async () => {
            cN.getTracks().forEach(cd => cd.stop());
            cl = null;
            cE.textContent = "Record again";
            try {
              c8.voiceBuf = await rC(new Blob(cw));
              c9("recNote").textContent = "Recording saved (" + Math.round(c8.voiceBuf.duration) + " s).";
            } catch (cd) {
              c9("recNote").textContent = "The recording could not be read. Upload a file instead.";
            }
            rh();
          };
          cl.start();
          cE.textContent = "Stop recording";
          c9("recNote").textContent = "Recording... read your script, then press Stop.";
        } catch (cd) {
          c9("recNote").textContent = "The microphone is blocked in this view. Record on your phone (Voice Memos works) and choose Upload a recording.";
        }
      }
    };
    cr();
  }
  const rD = () => {
    const c5 = r1.P();
    return {
      name: c5.agentName,
      title: c5.agentTitle,
      phone: c5.phone,
      email: c5.email,
      photo: r1.A.headshot || null
    };
  };
  const ru = c5 => {
    const c6 = r4.info;
    return {
      head: r9(c5).heads[c6.head] || c6.head,
      address: c6.address,
      city: c6.city,
      price: c6.price,
      beds: c6.beds,
      baths: c6.baths,
      sqft: c6.sqft
    };
  };
  function rs() {
    const c5 = r4.tour;
    let c6 = null;
    const c7 = r4.items.filter(c8 => c8.keep).map(c8 => {
      const c9 = c8.room === c6 ? "" : r0.roomLabel(c8.room, c5.lang);
      c6 = c8.room;
      const cr = c8.label ?? c9;
      if (c8.clip) {
        return {
          type: "clip",
          video: c8.clip,
          dur: c8.clipDur,
          label: cr,
          staged: c8.staged,
          room: c8.room
        };
      } else {
        return {
          type: "photo",
          img: c8.img,
          label: cr,
          staged: c8.staged,
          room: c8.room
        };
      }
    });
    return {
      fmt: c5.fmt,
      style: c5.style,
      trans: c5.trans,
      photoDur: +c5.photoDur,
      captions: c5.captions,
      lang: c5.lang,
      unbranded: c5.unbranded,
      intro: c5.intro,
      outro: c5.outro,
      items: c7,
      info: ru(c5.lang),
      agent: rD(),
      lock: {
        dark: r1.A.lockupHRev,
        light: r1.A.lockupH
      },
      courtesy: r4.info.courtesy.trim(),
      disclosure: r9(c5.lang).ai
    };
  }
  let rR = null;
  const rm = () => rR = r0.timeline(rs());
  function rT(c5, c6, c7) {
    c5.segs.forEach(c8 => {
      if (c8.kind !== "clip") {
        return;
      }
      const c9 = c8.it.video;
      const cr = c6 - c8.start;
      if (cr >= -0.1 && cr < c8.dur) {
        if (c7) {
          if (c9.paused) {
            c9.currentTime = Math.max(0, cr);
            c9.play().catch(() => {});
          } else if (Math.abs(c9.currentTime - cr) > 0.35) {
            c9.currentTime = Math.max(0, cr);
          }
        } else if (Math.abs(c9.currentTime - cr) > 0.05) {
          c9.currentTime = Math.max(0, cr);
        }
      } else if (!c9.paused) {
        c9.pause();
      }
    });
  }
  const rG = {
    tour: {
      t: 0,
      playing: false,
      t0: 0,
      raf: 0
    },
    polish: {
      t: 0,
      playing: false,
      t0: 0,
      raf: 0
    }
  };
  function rf() {
    const c5 = r2("#lt_canvas");
    const [c6, c7] = r0.FORMATS[r4.tour.fmt];
    if (c5.width !== c6 || c5.height !== c7) {
      c5.width = c6;
      c5.height = c7;
    }
    return c5;
  }
  function re(c5) {
    const c6 = rf().getContext("2d");
    if (!r4.items.some(c9 => c9.keep)) {
      rS(c6, "Add listing photos", "Pull them from RealMLS or upload them in step 1");
      return;
    }
    const c7 = rs();
    const c8 = r0.timeline(c7);
    rR = c8;
    rT(c8, c5, rG.tour.playing);
    r0.frame(c6, c7, c8, Math.min(c5, c8.total - 0.001));
    r2("#lt_time").textContent = rc(c5) + " / " + rc(c8.total);
    if (!rG.tour.drag) {
      r2("#lt_seek").value = Math.round(c5 / Math.max(0.1, c8.total) * 1000);
    }
  }
  function rS(c5, c6, c7) {
    const c8 = c5.canvas.width;
    const c9 = c5.canvas.height;
    const cr = Math.min(c8, c9) / 1080;
    c5.fillStyle = "#002e5e";
    c5.fillRect(0, 0, c8, c9);
    c5.fillStyle = "#fff";
    c5.textAlign = "center";
    c5.font = "900 " + cr * 60 + "px Montserrat, Arial";
    c5.fillText(c6, c8 / 2, c9 / 2);
    c5.font = "600 " + cr * 30 + "px \"Open Sans\", Arial";
    c5.fillStyle = "rgba(255,255,255,.75)";
    c5.fillText(c7, c8 / 2, c9 / 2 + cr * 60);
    c5.fillStyle = "#6bc063";
    c5.beginPath();
    c5.arc(c8 / 2, c9 / 2 + cr * 110, cr * 9, 0, 7);
    c5.fill();
    c5.textAlign = "left";
  }
  function rV(c5, c6) {
    const c7 = rG[c5];
    c7.playing = c6;
    r2(c5 === "tour" ? "#lt_play" : "#lp_play").textContent = c6 ? "Pause" : "Play";
    cancelAnimationFrame(c7.raf);
    if (c6) {
      c7.t0 = performance.now() - c7.t * 1000;
      const c8 = c9 => {
        if (!c7.playing) {
          return;
        }
        c7.t = (c9 - c7.t0) / 1000;
        const cr = c5 === "tour" ? rR ? rR.total : 0 : rv().total;
        if (c7.t >= cr) {
          c7.t = 0;
          rV(c5, false);
          if (c5 === "polish" && r6.v) {
            r6.v.pause();
          }
          rL(c5);
          return;
        }
        rL(c5);
        c7.raf = requestAnimationFrame(c8);
      };
      c7.raf = requestAnimationFrame(c8);
    } else {
      if (c5 === "polish" && r6.v) {
        r6.v.pause();
      }
      r4.items.forEach(c9 => {
        if (c9.clip && !c9.clip.paused) {
          c9.clip.pause();
        }
      });
      rL(c5);
    }
  }
  const rL = c5 => c5 === "tour" ? re(rG.tour.t) : ra(rG.polish.t, rG.polish.playing);
  let rW = 0;
  function rI() {
    cancelAnimationFrame(rW);
    rW = requestAnimationFrame(() => {
      if (r4.mode === "tour" && !rG.tour.playing) {
        re(rG.tour.t);
      }
      if (r4.mode !== "tour" && !rG.polish.playing) {
        ra(rG.polish.t, false);
      }
    });
  }
  async function ro(c5) {
    return new Promise((c6, c7) => {
      const c8 = new Image();
      c8.onload = () => c6(c8);
      c8.onerror = c7;
      c8.src = c5;
    });
  }
  function rk(c5) {
    const c6 = document.createElement("canvas");
    const c7 = 150 / Math.max(c5.naturalWidth || c5.width, c5.naturalHeight || c5.height);
    c6.width = Math.round((c5.naturalWidth || c5.width) * c7);
    c6.height = Math.round((c5.naturalHeight || c5.height) * c7);
    c6.getContext("2d").drawImage(c5, 0, 0, c6.width, c6.height);
    return c6.toDataURL("image/jpeg", 0.7);
  }
  let rZ = 1;
  async function rq(c5, c6) {
    const c7 = await ro(c5);
    const c8 = await async function (cr) {
      const cc = cr.naturalWidth;
      const cl = cr.naturalHeight;
      const cE = Math.min(1, 2048 / Math.max(cc, cl));
      const cN = document.createElement("canvas");
      cN.width = Math.round(cc * cE);
      cN.height = Math.round(cl * cE);
      cN.getContext("2d").drawImage(cr, 0, 0, cN.width, cN.height);
      const cw = await new Promise(cd => cN.toBlob(cd, "image/jpeg", 0.9));
      return URL.createObjectURL(cw);
    }(c7);
    const c9 = await ro(c8);
    r4.items.push(Object.assign({
      id: rZ++,
      img: c9,
      thumb: rk(c9),
      room: "other",
      label: null,
      staged: false,
      keep: true,
      star: false,
      clip: null
    }, c6));
  }
  async function rz() {
    const c5 = r2("#lt_mls").value.trim().replace(/[^0-9A-Za-z]/g, "");
    if (!c5) {
      r8("Type the MLS number first.");
      return;
    }
    if (!r2("#lt_ok").checked) {
      r8("First check the box that you have the right to use these photos for marketing.");
      return;
    }
    const c6 = window.iMathCMA || {};
    const c7 = r2("#lt_pull");
    c7.disabled = true;
    r4.mls = c5;
    r7();
    try {
      r8("Finding the listing in RealMLS...");
      const c8 = await r1.mlsCall("ListingsListingSearch", {
        _filter: "ListingId Eq '" + c5 + "'",
        _select: "ListingId,ListingKey,UnparsedAddress,City,ListPrice,ClosePrice,BedsTotal,BathsTotal,LivingArea,MlsStatus,ListOfficeName,PublicRemarks",
        _limit: 5,
        property_type_codes: c6.TYPES || ["A", "B", "C", "D", "E", "F"],
        status_values: c6.ALL_STATUS || ["Active", "Pending", "Closed"]
      });
      const c9 = c8 && c8.results && c8.results[0];
      if (!c9) {
        r8("No listing with that MLS number was found. Check the number, or upload photos instead.");
        return;
      }
      const cr = c9.StandardFields || {};
      const cc = cr.ListingKey || c9.Id;
      const cl = String(cr.UnparsedAddress || "").split(",")[0];
      const cE = String(cr.MlsStatus || "");
      r4.info = Object.assign(r4.info, {
        address: rr(cl),
        city: cr.City ? rr(cr.City) + ", FL" : r4.info.city,
        price: String((cE === "Closed" ? cr.ClosePrice : cr.ListPrice) || ""),
        beds: cr.BedsTotal != null ? String(cr.BedsTotal) : "",
        baths: cr.BathsTotal != null ? String(cr.BathsTotal) : "",
        sqft: cr.LivingArea ? String(cr.LivingArea) : "",
        remarks: cr.PublicRemarks || "",
        head: /closed/i.test(cE) ? "sold" : /pending|contract/i.test(cE) ? "contract" : /coming/i.test(cE) ? "coming" : "listed",
        courtesy: /united real estate gallery/i.test(cr.ListOfficeName || "") ? "" : rr(cr.ListOfficeName || "")
      });
      document.querySelectorAll(".lv-details").forEach(rw);
      r7();
      r8("Getting the photo list...");
      const cN = await r1.mlsCall("ListingsListPhotos", {
        listing_key: cc
      });
      const cw = (cN && cN.photos || []).slice().sort((cY, cC) => (cC.Primary ? 1 : 0) - (cY.Primary ? 1 : 0)).slice(0, Math.max(0, 40 - r4.items.length));
      if (!cw.length) {
        r8("This listing has no photos in RealMLS. Upload photos instead.");
        return;
      }
      let cd = 0;
      for (const cY of cw) {
        cd++;
        r8("Downloading photo " + cd + " of " + cw.length + " from RealMLS...");
        try {
          const cC = await r1.mlsCall("ListingsShowPhoto", {
            listing_key: cc,
            photo_id: cY.Id
          }, {
            raw: true
          });
          const cb = cC && cC.content && cC.content.find(cu => cu.type === "image");
          if (!cb) {
            continue;
          }
          const cD = cY.Tags && cY.Tags.Room;
          await rq("data:" + (cb.mimeType || "image/jpeg") + ";base64," + cb.data, {
            name: cY.Caption || "Photo " + cd,
            room: r0.mlsRoom(cD, cY.Caption),
            staged: /virtual/i.test(cY.Caption || ""),
            primary: !!cY.Primary
          });
        } catch (cu) {}
        rF();
        rI();
      }
      r8(r4.items.length + " photos pulled for " + (r4.info.address || "this listing") + ". Click Sort with Claude for walkthrough order." + (r4.info.courtesy ? " This is another office's listing: get the listing broker's permission before posting." : ""));
      rh();
    } catch (cs) {
      const cR = cs && cs.code;
      r8(cR === "not_granted" || cR === "server_not_connected" || cR === "not_connected" ? "RealMLS is not connected in this view. Open the CMA tab and follow the RealMLS setup guide, or upload photos instead." : "RealMLS did not answer. Try again in a moment, or upload photos instead.");
    } finally {
      c7.disabled = false;
    }
  }
  function rQ(c5) {
    const c6 = r4.items.filter(c8 => c8.keep);
    const c7 = r4.items.filter(c8 => !c8.keep);
    c6.sort((c8, c9) => r0.roomOrder(c8.room) - r0.roomOrder(c9.room) || (c9.primary ? 1 : 0) - (c8.primary ? 1 : 0));
    r4.items = c6.concat(c7);
    rF();
    rI();
  }
  async function rO(c5, c6) {
    const c7 = [];
    for (let c8 = 0; c8 < c5.length; c8 += 12) {
      const c9 = c5.slice(c8, c8 + 12);
      const cr = document.createElement("canvas");
      const cc = 320;
      const cl = 213;
      const cE = 4;
      const cN = Math.ceil(c9.length / cE);
      cr.width = cc * cE;
      cr.height = cl * cN;
      const cw = cr.getContext("2d");
      cw.fillStyle = "#fff";
      cw.fillRect(0, 0, cr.width, cr.height);
      for (let cd = 0; cd < c9.length; cd++) {
        const cY = c9[cd];
        const cC = cY.naturalWidth || cY.width;
        const cb = cY.naturalHeight || cY.height;
        const cD = Math.min(cc / cC, cl / cb);
        const cu = cd % cE * cc;
        const cs = Math.floor(cd / cE) * cl;
        cw.drawImage(cY, cu + (cc - cC * cD) / 2, cs + (cl - cb * cD) / 2, cC * cD, cb * cD);
        cw.fillStyle = "#002e5e";
        cw.fillRect(cu + 4, cs + 4, 64, 34);
        cw.fillStyle = "#fff";
        cw.font = "800 22px Arial";
        cw.fillText(c6(c8 + cd), cu + 10, cs + 30);
        cw.strokeStyle = "#fff";
        cw.lineWidth = 4;
        cw.strokeRect(cu, cs, cc, cl);
      }
      c7.push(await new Promise(cR => cr.toBlob(cR, "image/jpeg", 0.8)));
    }
    return c7;
  }
  async function rH() {
    const c5 = r1.sampler;
    if (!r4.items.length) {
      r8("Add photos first.");
      return;
    }
    const c6 = c5 && c5.limits ? await c5.limits().catch(() => null) : null;
    if (!c5 || !c6 || !c6.images) {
      rQ();
      r8("Claude cannot look at photos in this view, so the photos were sorted by their room tags. Fix any label by hand.");
      return;
    }
    const c7 = r2("#lt_sort");
    c7.disabled = true;
    r8("Claude is looking at your photos...");
    try {
      const c8 = r4.items.map(cd => cd.img);
      const c9 = await rO(c8, cd => String(cd + 1));
      const cr = c6.images.maxCount || 4;
      if (c9.length > cr) {
        c9.length = cr;
      }
      const cc = Math.min(r4.items.length, c9.length * 12);
      const cl = r4.items.slice(0, cc).map((cd, cY) => cY + 1 + ":" + cd.room + (cd.staged ? " staged" : "")).join(", ");
      const cE = await c5.json("These images are contact sheets of " + cc + " real estate listing photos. Each photo has its number in the top left corner.\nFor every photo number return: room (exactly one of: " + r0.ROOM_KEYS.join(", ") + "), keep (false for near duplicates, blurry, dark or tilted shots, floor plans, maps, text graphics, and any photo showing people), quality 1 to 5, staged (true if it looks virtually staged or says so), and a short reason when keep is false.\nThen list \"order\": the numbers to keep in walkthrough order: front of home first, then entry, living areas, kitchen, dining, office, primary suite and bath, other bedrooms and baths, laundry, bonus and garage, then patio, pool, backyard, views and aerials last. Keep the best 12 to 24 photos when there are that many, best of each room. Only report what you can see.\nRoom tags from the MLS or file names, which may be wrong: " + cl + "\nReply with only JSON: {\"photos\":[{\"n\":1,\"room\":\"kitchen\",\"keep\":true,\"quality\":4,\"staged\":false,\"why\":\"\"}],\"order\":[1,2]}", {
        images: c9,
        modelTier: "default"
      });
      if (!cE || !Array.isArray(cE.photos)) {
        throw new Error("bad");
      }
      cE.photos.forEach(cd => {
        const cY = r4.items[(+cd.n || 0) - 1];
        if (cY) {
          if (r0.ROOM_KEYS.includes(cd.room)) {
            cY.room = cd.room;
          }
          cY.keep = cd.keep !== false;
          cY.staged = cY.staged || !!cd.staged;
          cY.why = cd.keep === false ? String(cd.why || "").slice(0, 80) : "";
          cY.label = null;
        }
      });
      const cN = (Array.isArray(cE.order) ? cE.order : []).map(cd => r4.items[(+cd || 0) - 1]).filter(Boolean);
      const cw = new Set(cN);
      cN.forEach(cd => cd.keep = true);
      r4.items = cN.concat(r4.items.filter(cd => !cw.has(cd)).map(cd => {
        cd.keep = false;
        return cd;
      }).sort((cd, cY) => r0.roomOrder(cd.room) - r0.roomOrder(cY.room)));
      if (!cN.length) {
        rQ();
      }
      rF();
      rI();
      rh();
      r8("Sorted. " + r4.items.filter(cd => cd.keep).length + " photos in the tour, " + r4.items.filter(cd => !cd.keep).length + " set aside. Check the order and labels, then press Play.");
    } catch (cd) {
      rQ();
      r8("Claude could not sort the photos right now, so they were sorted by room tags. Try again in a moment.");
    } finally {
      c7.disabled = false;
    }
  }
  function rF() {
    const c5 = r2("#lt_list");
    const c6 = r4.tour.lang;
    const c7 = r4.items.filter(c8 => c8.keep).length;
    c5.innerHTML = r4.items.length ? r4.items.map((c8, c9) => "<div class=\"lv-item" + (c8.keep ? "" : " off") + "\" data-id=\"" + c8.id + "\"><img src=\"" + c8.thumb + "\" alt=\"\"><div class=\"lv-item-b\"><div class=\"lv-item-r\"><select data-f=\"room\" aria-label=\"Room\">" + r0.ROOMS.map(cr => "<option value=\"" + cr[0] + "\"" + (c8.room === cr[0] ? " selected" : "") + ">" + r3(cr[1] || "Other") + "</option>").join("") + "</select><input type=\"text\" data-f=\"label\" placeholder=\"" + r3(r0.roomLabel(c8.room, c6) || "No label") + "\" value=\"" + (c8.label != null ? r3(c8.label) : "") + "\" aria-label=\"Label on screen\"></div>\n      <div class=\"lv-item-r small\"><label><input type=\"checkbox\" data-f=\"keep\"" + (c8.keep ? " checked" : "") + "> In tour</label><label><input type=\"checkbox\" data-f=\"staged\"" + (c8.staged ? " checked" : "") + "> Virtually staged</label><button type=\"button\" class=\"lv-star" + (c8.star ? " on" : "") + "\" data-f=\"star\" title=\"Standout AI clip\" aria-pressed=\"" + !!c8.star + "\">&#9733;</button>" + (c8.clip ? "<span class=\"tag\">AI clip</span>" : "") + (c8.why ? "<span class=\"note\">" + r3(c8.why) + "</span>" : "") + "</div></div>\n      <div class=\"lv-move\"><button type=\"button\" data-mv=\"-1\" aria-label=\"Move up\">&#9650;</button><button type=\"button\" data-mv=\"1\" aria-label=\"Move down\">&#9660;</button><button type=\"button\" data-rm aria-label=\"Remove photo\">&times;</button></div></div>").join("") + ("<p class=\"note\">" + c7 + " in the tour, about " + Math.round(rm().total) + " seconds.</p>") : "<p class=\"note\">No photos yet.</p>";
    c5.querySelectorAll(".lv-item").forEach(c8 => {
      const c9 = r4.items.find(cr => cr.id === +c8.dataset.id);
      c8.querySelectorAll("[data-f]").forEach(cr => {
        const cc = cr.dataset.f;
        if (cc === "star") {
          cr.onclick = () => {
            if (!c9.star && r4.items.filter(cl => cl.star).length >= 3) {
              r8("Up to 3 standout clips per tour.");
            } else {
              c9.star = !c9.star;
              rF();
              rM();
            }
          };
        } else {
          cr[cr.tagName === "SELECT" || cr.type === "checkbox" ? "onchange" : "oninput"] = () => {
            if (cr.type === "checkbox") {
              c9[cc] = cr.checked;
            } else if (cc === "label") {
              c9.label = cr.value === "" ? null : cr.value;
            } else {
              c9.room = cr.value;
              c9.label = null;
            }
            if (cc !== "label") {
              rF();
            }
            rI();
            rh();
          };
        }
      });
      c8.querySelectorAll("[data-mv]").forEach(cr => cr.onclick = () => {
        const cc = r4.items.indexOf(c9);
        const cl = cc + +cr.dataset.mv;
        if (!(cl < 0) && !(cl >= r4.items.length)) {
          [r4.items[cc], r4.items[cl]] = [r4.items[cl], r4.items[cc]];
          rF();
          rI();
        }
      });
      c8.querySelector("[data-rm]").onclick = () => {
        r4.items.splice(r4.items.indexOf(c9), 1);
        rF();
        rM();
        rI();
        rh();
      };
    });
  }
  function rM() {
    const c5 = r2("#lt_gem");
    const c6 = r4.items.filter(c7 => c7.star);
    c5.innerHTML = c6.length ? c6.map((c7, c8) => "<div class=\"lv-gem\" data-id=\"" + c7.id + "\"><img src=\"" + c7.thumb + "\" alt=\"\"><div><b>" + r3(r0.roomLabel(c7.room, "en") || "Photo") + "</b><div class=\"actions\"><button class=\"mini\" type=\"button\" data-g=\"dl\">1. Download photo</button><button class=\"mini\" type=\"button\" data-g=\"copy\">2. Copy motion instructions</button><a class=\"mini\" href=\"https://gemini.google.com/app\" target=\"_blank\" rel=\"noopener\" data-g=\"open\">3. Open Gemini</a></div>\n      <div class=\"file\"><span>" + (c7.clip ? "Clip added" : "4. Upload the clip Gemini made") + "</span><input type=\"file\" accept=\"video/*\" data-g=\"in\" aria-label=\"Upload clip\"></div>" + (c7.clip ? "<button class=\"mini\" type=\"button\" data-g=\"photo\">Use the photo instead</button>" : "") + "</div></div>").join("") + "<p class=\"note\">Video in the Gemini app may need a Google AI Pro plan. If Gemini will not make it, skip this step: the tour still moves smoothly.</p>" : "<p class=\"note\">No standout photos picked yet. Tap the star on up to 3 photos in step 2.</p>";
    c5.querySelectorAll(".lv-gem").forEach(c7 => {
      const c8 = r4.items.find(cc => cc.id === +c7.dataset.id);
      const c9 = cc => c7.querySelector("[data-g=\"" + cc + "\"]");
      c9("dl").onclick = async () => {
        const cc = document.createElement("canvas");
        cc.width = c8.img.naturalWidth;
        cc.height = c8.img.naturalHeight;
        cc.getContext("2d").drawImage(c8.img, 0, 0);
        cc.toBlob(cl => r1.save("iMath_tour_photo_" + c8.id + ".jpg", cl, cE => r8(cE)), "image/jpeg", 0.93);
      };
      c9("copy").onclick = () => r1.copyText("Animate the photo I attached into a 5 second real estate video clip.\nCamera motion only: " + ["a slow, smooth push in toward the center of the room", "a slow, smooth pan from left to right", "a slow, gentle dolly forward with a slight turn to the right"][r4.items.indexOf(c8) % 3] + ", steady like a gimbal.\nKeep every detail exactly as it is in the photo. Do not add, remove, move, restyle or change anything: furniture, walls, floors, windows, views, colors, lighting and decor stay the same. No people, pets, text, logos or watermarks.\nPhotorealistic, same framing as the photo, no fisheye, no warping of straight lines.", cc => r8(cc), "Motion instructions copied. In Gemini, attach the photo, paste, and send.");
      c9("in").onchange = async cc => {
        const cl = cc.target.files[0];
        if (!cl) {
          return;
        }
        const cE = document.createElement("video");
        cE.muted = true;
        cE.playsInline = true;
        cE.preload = "auto";
        cE.src = URL.createObjectURL(cl);
        try {
          await new Promise((cN, cw) => {
            cE.onloadeddata = cN;
            cE.onerror = cw;
          });
          c8.clip = cE;
          c8.clipDur = Math.min(8, cE.duration || 5);
          r8("AI clip added. It replaces that photo in the tour.");
        } catch (cN) {
          r8("That clip did not play here. Try an MP4.");
        }
        rF();
        rM();
        rI();
        rh();
      };
      const cr = c9("photo");
      if (cr) {
        cr.onclick = () => {
          c8.clip = null;
          rF();
          rM();
          rI();
          rh();
        };
      }
    });
  }
  function rh() {
    const c5 = r2("#lt_checks");
    const c6 = r2("#lp_checks");
    if (!c5) {
      return;
    }
    const c7 = (cl, cE) => "<li class=\"" + (cl === true ? "ok" : cl === false ? "bad" : "") + "\">" + r3(cE) + "</li>";
    const c8 = [r4.audio.tour.script, ...r4.items.filter(cl => cl.keep && cl.label).map(cl => cl.label)].join(" . ");
    const c9 = r0.fhCheck(c8);
    const cr = r4.items.filter(cl => cl.keep).length;
    const cc = r4.items.filter(cl => cl.keep && cl.staged).length;
    c5.innerHTML = c7(r2("#lt_ok").checked, r2("#lt_ok").checked ? "Photo rights confirmed" : "Confirm you have the right to use the photos (step 1)") + c7(cr >= 3, cr >= 3 ? cr + " photos in the tour" : "Add at least 3 photos") + c7(!c9.length, c9.length ? "Fair Housing: fix " + c9.map(cl => "\"" + cl.term + "\"").join(", ") : "Fair Housing word check passed") + c7(true, "AI disclosure label is on: \"" + r9(r4.tour.lang).ai + "\"") + (cc ? c7(true, cc + " virtually staged photo" + (cc > 1 ? "s" : "") + " keep their tag on screen") : "") + (r4.info.courtesy ? c7(null, "Another office's listing: get the listing broker's permission. The end card credits " + r4.info.courtesy) : "") + c7(null, r4.tour.unbranded ? "MLS version: no logos or agent info" : "For an MLS virtual tour link, turn on the MLS version") + (r4.audio.tour.music === "mine" ? c7(null, "Use only music you have the rights to") : "") + c7(null, "Northeast Florida MLS rules for altered media apply; confirm with the board before using it in the MLS");
    if (c6) {
      const cl = r0.fhCheck(r4.audio.polish.script);
      c6.innerHTML = c7(r2("#lp_ok").checked, r2("#lp_ok").checked ? "Video rights confirmed" : "Confirm you have the right to use the video (step 1)") + c7(r6.ready, r6.ready ? "Video loaded" : "Add a video") + c7(!cl.length, cl.length ? "Fair Housing: fix " + cl.map(cE => "\"" + cE.term + "\"").join(", ") : "Fair Housing word check passed") + c7(true, r4.polish.threeD ? "Disclosure label is on: \"" + r9(r4.polish.lang).three + "\"" : "Real footage, edits are trims, speed, color and steadying only") + c7(null, r4.polish.unbranded ? "MLS version: no logos or agent info" : "For an MLS virtual tour link, turn on the MLS version");
    }
    return {
      tour: !c9.length && cr >= 3 && r2("#lt_ok").checked,
      fh: c9
    };
  }
  async function rK(c5) {
    const c6 = c5.canvas;
    if (!window.MediaRecorder || !c6.captureStream) {
      throw {
        code: "unsupported"
      };
    }
    const c7 = c6.captureStream(30);
    const c8 = window.MediaRecorder && ["video/mp4;codecs=avc1.42E01E,mp4a.40.2", "video/mp4;codecs=avc1", "video/mp4", "video/webm;codecs=vp9,opus", "video/webm;codecs=vp8,opus", "video/webm"].find(cD => MediaRecorder.isTypeSupported(cD)) || "";
    const c9 = rE();
    await c9.resume();
    const cr = c9.createMediaStreamDestination();
    const cc = [];
    let cl = false;
    const cE = (cD, cu, cs) => {
      if (!cD) {
        return;
      }
      const cR = c9.createBufferSource();
      cR.buffer = cD;
      const cm = c9.createGain();
      cm.gain.value = cu;
      cR.connect(cm);
      cm.connect(cr);
      cc.push([cR, cs || 0]);
      cl = true;
    };
    cE(c5.music, c5.voice ? 0.32 : 0.85);
    cE(c5.voice, 1, c5.voiceAt || 0.8);
    if (c5.media) {
      let cD = rN.get(c5.media);
      if (!cD) {
        cD = c9.createMediaElementSource(c5.media);
        rN.set(c5.media, cD);
      }
      cD.connect(cr);
      cl = true;
      c5.media.muted = false;
    }
    if (cl) {
      const cu = cr.stream.getAudioTracks()[0];
      if (cu) {
        c7.addTrack(cu);
      }
    }
    const cN = [];
    const cw = new MediaRecorder(c7, Object.assign({
      videoBitsPerSecond: 8000000
    }, c8 ? {
      mimeType: c8
    } : {}));
    cw.ondataavailable = cs => {
      if (cs.data && cs.data.size) {
        cN.push(cs.data);
      }
    };
    const cd = new Promise(cs => cw.onstop = cs);
    c5.draw(0);
    cw.start(250);
    const cY = performance.now();
    const cC = c9.currentTime + 0.05;
    cc.forEach(([cs, cR]) => cs.start(cC + cR));
    if (c5.start) {
      c5.start();
    }
    await new Promise(cs => {
      const cR = () => {
        const cm = (performance.now() - cY) / 1000;
        if (cm >= c5.duration) {
          c5.draw(c5.duration - 0.001);
          cs();
          return;
        }
        c5.draw(cm);
        if (c5.progress) {
          c5.progress(cm / c5.duration);
        }
        requestAnimationFrame(cR);
      };
      requestAnimationFrame(cR);
    });
    await new Promise(cs => setTimeout(cs, 300));
    cw.stop();
    await cd;
    cc.forEach(([cs]) => {
      try {
        cs.stop();
      } catch (cR) {}
    });
    if (c5.media) {
      try {
        rN.get(c5.media).disconnect();
      } catch (cs) {}
      c5.media.muted = true;
    }
    const cb = (c8 || "video/webm").split(";")[0];
    return {
      blob: new Blob(cN, {
        type: cb
      }),
      ext: cb.includes("mp4") ? "mp4" : "webm"
    };
  }
  const rP = (c5, c6) => "iMath_" + String(r4.info.address || "listing").replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 40) + "_" + c5 + "_" + c6 + (c5 === "tour" ? r4.tour.unbranded ? "_MLS" : "" : r4.polish.unbranded ? "_MLS" : "");
  async function rn(c5, c6) {
    const c7 = r4.audio[c5];
    if (c7.music === "track") {
      return await r0.makeMusic(c7.track, c6);
    } else if (c7.music === "mine") {
      return r5[c5].musicBuf;
    } else {
      return null;
    }
  }
  async function ri() {
    const c5 = rh();
    if (!c5.tour) {
      r8(r2("#lt_ok").checked ? c5.fh.length ? "Fix the Fair Housing words listed under Before you post, then try again." : "Add at least 3 photos to the tour." : "Confirm you have the right to use the photos (step 1) before making the video.");
      return;
    }
    const c6 = r2("#lt_export");
    c6.disabled = true;
    rV("tour", false);
    try {
      const c7 = rs();
      const c8 = r0.timeline(c7);
      const c9 = rf();
      const cr = c9.getContext("2d");
      r8("Getting the sound ready...");
      const cc = await rn("tour", c8.total);
      const cl = r4.audio.tour.voice !== "none" ? r5.tour.voiceBuf : null;
      rG.tour.playing = true;
      const cE = await rK({
        canvas: c9,
        duration: c8.total,
        music: cc,
        voice: cl,
        draw: cN => {
          rT(c8, cN, true);
          r0.frame(cr, c7, c8, cN);
        },
        progress: cN => r8("Recording your tour: " + Math.round(cN * 100) + "%. Keep this tab open and visible.")
      });
      rG.tour.playing = false;
      r4.items.forEach(cN => cN.clip && cN.clip.pause());
      await r1.save(rP("tour", r4.tour.fmt) + "." + cE.ext, cE.blob, cN => r8(cN));
      if (cE.ext === "webm") {
        r8("Saved as WebM, the format this browser records. Instagram needs MP4: use Chrome, Safari or the Claude desktop app for MP4.");
      }
    } catch (cN) {
      console.error(cN);
      r8(cN && cN.code === "unsupported" ? "Video export is not supported in this browser. Try Chrome, Edge, Safari or the Claude desktop app." : "The video could not be made. Reload the page and try again.");
    } finally {
      rG.tour.playing = false;
      c6.disabled = false;
    }
  }
  const rA = () => {
    if (r4.polish.fmt !== "auto") {
      return r4.polish.fmt;
    }
    const c5 = r6.v;
    if (!c5 || !c5.videoWidth) {
      return "9x16";
    }
    const c6 = c5.videoWidth / c5.videoHeight;
    if (c6 > 1.2) {
      return "16x9";
    } else if (c6 > 0.85) {
      return "1x1";
    } else {
      return "9x16";
    }
  };
  function rv() {
    const c5 = r4.polish;
    const c6 = [];
    let c7 = 0;
    const c8 = r6.scenes.length ? r6.scenes.filter(cr => cr.keep) : r6.ready ? [{
      in: 0,
      out: r6.v.duration,
      speed: 1,
      room: "other"
    }] : [];
    if (c5.intro && c8.length) {
      c6.push({
        kind: "intro",
        start: 0,
        dur: 3.4
      });
      c7 = 3.4;
    }
    let c9 = null;
    c8.forEach(cr => {
      const cc = (cr.out - cr.in) / (cr.speed || 1);
      if (!(cc < 0.2)) {
        c6.push({
          kind: "video",
          start: c7,
          dur: cc,
          in: cr.in,
          out: cr.out,
          speed: cr.speed || 1,
          label: cr.room !== c9 && cr.room !== "other" && cr.room !== "hallway" ? r0.roomLabel(cr.room, c5.lang) : ""
        });
        c9 = cr.room;
        c7 += cc;
      }
    });
    if (c5.outro && c8.length) {
      c6.push({
        kind: "outro",
        start: c7,
        dur: 4.6
      });
      c7 += 4.6;
    }
    return {
      parts: c6,
      total: c7
    };
  }
  let rU = null;
  let rB = null;
  let rp = -9;
  let rj = null;
  let rg = 0;
  function ra(c5, c6) {
    const c7 = r2("#lp_canvas");
    const [c8, c9] = r0.FORMATS[rA()];
    if (c7.width !== c8 || c7.height !== c9) {
      c7.width = c8;
      c7.height = c9;
    }
    const cr = c7.getContext("2d");
    const cc = r6.v;
    if (!r6.ready) {
      rS(cr, "Add a phone video", "Upload it in step 1");
      return;
    }
    const cl = rv();
    const cE = function () {
      const cw = r4.polish;
      return {
        fmt: rA(),
        style: "gentle",
        lang: cw.lang,
        unbranded: cw.unbranded,
        info: ru(cw.lang),
        agent: rD(),
        lock: {
          dark: r1.A.lockupHRev,
          light: r1.A.lockupH
        },
        courtesy: r4.info.courtesy.trim(),
        disclosure: cw.threeD ? r9(cw.lang).three : "",
        captions: cw.captions
      };
    }();
    const cN = cl.parts.find(cw => c5 >= cw.start && c5 < cw.start + cw.dur) || cl.parts[cl.parts.length - 1];
    if (cN) {
      if (cN !== rj) {
        if (rj && c6) {
          rB ||= document.createElement("canvas");
          rB.width = c8;
          rB.height = c9;
          rB.getContext("2d").drawImage(c7, 0, 0);
          rp = c5;
        }
        rj = cN;
        if (cN.kind === "video") {
          cc.playbackRate = cN.speed;
          cc.currentTime = cN.in + (c5 - cN.start) * cN.speed;
          if (c6) {
            cc.play().catch(() => {});
          }
        } else if (!cc.paused) {
          cc.pause();
        }
      }
      if (cN.kind === "video") {
        const cw = cN.in + (c5 - cN.start) * cN.speed;
        if (c6) {
          if (cc.paused) {
            cc.play().catch(() => {});
          }
          if (Math.abs(cc.currentTime - cw) > 0.4) {
            cc.currentTime = cw;
          }
        } else if (Math.abs(cc.currentTime - cw) > 0.04 && performance.now() - rg > 80) {
          rg = performance.now();
          cc.currentTime = cw;
        }
        cr.fillStyle = "#000";
        cr.fillRect(0, 0, c8, c9);
        (function (cY, cC, cb, cD) {
          const cu = r4.polish;
          const cs = cD.videoWidth;
          const cR = cD.videoHeight;
          if (!cs) {
            return;
          }
          const cm = cC / cb;
          const cT = cs / cR;
          const cG = Math.max(cm / cT, cT / cm) > 1.3;
          if (cG) {
            rU ||= document.createElement("canvas");
            rU.width = 48;
            rU.height = Math.round(cb * 48 / cC);
            const cI = rU.getContext("2d");
            r0.cover(cI, cD, rU.width, rU.height, 1.2, 0, 0);
            cY.save();
            cY.imageSmoothingQuality = "low";
            cY.globalAlpha = 0.65;
            cY.drawImage(rU, 0, 0, cC, cb);
            cY.restore();
            cY.fillStyle = "rgba(0,20,45,.35)";
            cY.fillRect(0, 0, cC, cb);
          }
          const cf = cu.steady ? 1.08 : 1;
          const ce = cG ? Math.min(cC / cs, cb / cR) : Math.max(cC / cs, cb / cR) * cf;
          let cS = 0;
          let cV = 0;
          if (cu.steady && r6.stab) {
            const co = r6.stab(cD.currentTime);
            cS = co[0] * ce;
            cV = co[1] * ce;
          }
          cY.save();
          if ("filter" in cY) {
            cY.filter = "brightness(" + (1 + cu.bright / 100) + ") contrast(" + (1 + cu.contrast / 100) + ") saturate(" + (1 + cu.sat / 100) + ")";
          }
          if (cG) {
            cY.beginPath();
            cY.rect((cC - cs * ce) / 2, (cb - cR * ce) / 2, cs * ce, cR * ce);
            cY.clip();
          }
          const cL = cs * ce * (cG ? cf : 1);
          const cW = cR * ce * (cG ? cf : 1);
          cY.drawImage(cD, (cC - cL) / 2 + cS, (cb - cW) / 2 + cV, cL, cW);
          cY.restore();
          if (cu.warm) {
            cY.save();
            cY.globalCompositeOperation = "soft-light";
            cY.fillStyle = cu.warm > 0 ? "rgba(255,150,60," + cu.warm / 100 * 0.45 + ")" : "rgba(60,140,255," + -cu.warm / 100 * 0.45 + ")";
            cY.fillRect(0, 0, cC, cb);
            cY.restore();
          }
        })(cr, c8, c9, cc);
        const cd = c5 - cN.start;
        if (cE.captions && cN.label) {
          (function (cY, cC, cb, cD, cu, cs, cR) {
            const cm = Math.min(cs, cR) / 1080;
            const cT = Math.max(0, Math.min((cD - 0.2) / 0.4, (cu - cD) / 0.4, 1));
            if (cT <= 0) {
              return;
            }
            const cG = cR - (cC.fmt === "9x16" ? 330 : 120) * cm;
            const cf = cm * 56;
            cY.save();
            cY.globalAlpha = cT;
            cY.font = "800 " + cm * 44 + "px Montserrat, Arial";
            const ce = cY.measureText(cb).width + cm * 60;
            const cS = cm * 82;
            cY.fillStyle = "rgba(0,26,54,.78)";
            cY.beginPath();
            if (cY.roundRect) {
              cY.roundRect(cf, cG - cS, ce, cS, cm * 12);
            } else {
              cY.rect(cf, cG - cS, ce, cS);
            }
            cY.fill();
            cY.fillStyle = "#6bc063";
            cY.fillRect(cf, cG - cS, cm * 9, cS);
            cY.fillStyle = "#fff";
            cY.textBaseline = "middle";
            cY.fillText(cb, cf + cm * 32, cG - cS / 2 + 2);
            cY.restore();
          })(cr, cE, cN.label, cd, Math.min(3.2, cN.dur), c8, c9);
        }
        r0.bugAndLabel(cr, cE, c8, c9, false);
      } else {
        const cY = {
          kind: cN.kind,
          dur: cN.dur,
          ref: {
            type: "photo",
            img: r6.poster || null
          }
        };
        if (cN.kind === "intro") {
          r0.drawIntro(cr, cE, cY, c5 - cN.start, c8, c9);
        } else {
          r0.drawOutro(cr, cE, cY, c5 - cN.start, c8, c9);
        }
        r0.bugAndLabel(cr, cE, c8, c9, true);
      }
      if (c6 && rB && c5 - rp < 0.35 && c5 >= rp) {
        cr.save();
        cr.globalAlpha = 1 - (c5 - rp) / 0.35;
        cr.drawImage(rB, 0, 0);
        cr.restore();
      }
      r2("#lp_time").textContent = rc(c5) + " / " + rc(cl.total);
      if (!rG.polish.drag) {
        r2("#lp_seek").value = Math.round(c5 / Math.max(0.1, cl.total) * 1000);
      }
    }
  }
  async function rX(c5, c6) {
    const c7 = r6.v;
    r6.ready = false;
    r6.A = null;
    r6.stab = null;
    r6.scenes = [];
    rj = null;
    r4.polish.threeD = !!c6;
    if (c6) {
      r4.polish.steady = false;
    }
    r6.file = c5.name;
    const c8 = new Promise((c9, cr) => {
      c7.onloadeddata = c9;
      c7.onerror = cr;
    });
    c7.muted = true;
    c7.src = URL.createObjectURL(c5);
    try {
      await c8;
    } catch (c9) {
      r8("That video format did not play here. Try an MP4 (H.264), or export from your phone as \"Most compatible\".", "polish");
      return;
    }
    if (c7.duration > 300.5) {
      r8("This video is longer than 5 minutes. Trim it on your phone first.", "polish");
    }
    r6.ready = true;
    r2("#lp_inName").textContent = (c6 ? "3D fly through: " : "Video: ") + c5.name + (" (" + Math.round(c7.duration) + " s)");
    r2("#lp_kind").textContent = c6 ? "3D fly through: steadying is off (it is already smooth) and the 3D disclosure label is on." : c7.videoWidth + " x " + c7.videoHeight + ". " + (c7.videoWidth > c7.videoHeight ? "Horizontal" : "Vertical") + " clip.";
    try {
      c7.currentTime = Math.min(1, c7.duration / 3);
      await new Promise(cc => {
        c7.onseeked = cc;
        setTimeout(cc, 1500);
      });
      c7.onseeked = null;
      const cr = document.createElement("canvas");
      cr.width = c7.videoWidth;
      cr.height = c7.videoHeight;
      cr.getContext("2d").drawImage(c7, 0, 0);
      r6.poster = cr;
    } catch (cc) {}
    rJ();
    rx();
    rh();
    ra(0, false);
    r8("Video loaded. Click Find the best parts to trim, label and steady it, or press Play to preview.", "polish");
  }
  async function ry() {
    if (!r6.ready) {
      r8("Add a video first.", "polish");
      return;
    }
    const c5 = r2("#lp_analyze");
    c5.disabled = true;
    rV("polish", false);
    try {
      const c6 = await r0.analyzeVideo(r6.v, {
        onProgress: cc => r8("Scanning your video: " + Math.round(cc * 100) + "%", "polish")
      });
      r6.A = c6;
      r6.stab = r0.stabilizer(c6, r6.v.videoWidth);
      let c7 = null;
      const c8 = r1.sampler;
      const c9 = c8 && c8.limits ? await c8.limits().catch(() => null) : null;
      if (c8 && c9 && c9.images && c6.thumbs.length) {
        r8("Claude is labeling the rooms...", "polish");
        try {
          const cc = await Promise.all(c6.thumbs.map(cY => ro(cY.url)));
          const cl = await rO(cc, cY => rc(c6.thumbs[cY].t));
          const cE = c9.images.maxCount || 4;
          const cN = cl.slice(0, cE);
          const cw = Math.min(c6.thumbs.length, cN.length * 12);
          const cd = await c8.json("These contact sheets show " + cw + " frames from a phone video walking through a home for sale, in time order. Each frame has its time (minutes:seconds) in the top left corner.\nFor each frame return its number (1 is the first frame, counting left to right, top to bottom), the room (exactly one of: " + r0.ROOM_KEYS.join(", ") + "; use hallway for hallways, stairs and doorways between rooms), and bad=true only if the frame shows mostly ceiling or floor, a person or a reflection of the person filming, is very dark or very blurry.\nReply with only JSON: {\"frames\":[{\"n\":1,\"room\":\"front\",\"bad\":false,\"why\":\"\"}]}", {
            images: cN,
            modelTier: "default"
          });
          if (cd && Array.isArray(cd.frames)) {
            c7 = cd.frames.map(cY => {
              const cC = c6.thumbs[(+cY.n || 0) - 1];
              if (cC) {
                return {
                  t: cC.t,
                  room: r0.ROOM_KEYS.includes(cY.room) ? cY.room : "other",
                  bad: !!cY.bad,
                  why: cY.why ? String(cY.why).slice(0, 60) : ""
                };
              } else {
                return null;
              }
            }).filter(Boolean);
          }
        } catch (cY) {
          c7 = null;
        }
      }
      r6.scenes = r0.scenes(c6, c7);
      rJ();
      ra(0, false);
      rh();
      const cr = r6.scenes.filter(cC => cC.keep);
      r8("Done. " + r6.scenes.length + " parts found, " + cr.length + " kept. " + (c7 ? "" : "Room labels need Claude; set them by hand below. ") + "Your video is about " + Math.round(rv().total) + " seconds. Press Play to check it.", "polish");
    } catch (cC) {
      console.error(cC);
      r8("The scan did not finish in this browser. You can still trim by hand: press Play to preview the whole clip.", "polish");
    } finally {
      c5.disabled = false;
    }
  }
  function rJ() {
    const c5 = r2("#lp_scenes");
    const c6 = r6.A;
    if (r6.scenes.length) {
      c5.innerHTML = r6.scenes.map((c7, c8) => "<div class=\"lv-item" + (c7.keep ? "" : " off") + "\" data-i=\"" + c8 + "\"><img src=\"" + (c9 => {
        if (!c6 || !c6.thumbs.length) {
          return "";
        }
        let cr = c6.thumbs[0];
        c6.thumbs.forEach(cc => {
          if (cc.t <= c9 + 0.5) {
            cr = cc;
          }
        });
        return cr.url;
      })((c7.in + c7.out) / 2) + "\" alt=\"\"><div class=\"lv-item-b\"><div class=\"lv-item-r\"><select data-f=\"room\" aria-label=\"Room\">" + r0.ROOMS.map(c9 => "<option value=\"" + c9[0] + "\"" + (c7.room === c9[0] ? " selected" : "") + ">" + r3(c9[1] || "Other") + "</option>").join("") + "</select><select data-f=\"speed\" aria-label=\"Speed\">" + [1, 1.5, 2, 3].map(c9 => "<option value=\"" + c9 + "\"" + (+c7.speed === c9 ? " selected" : "") + ">" + c9 + "x speed</option>").join("") + "</select></div>\n      <div class=\"lv-item-r small\"><label><input type=\"checkbox\" data-f=\"keep\"" + (c7.keep ? " checked" : "") + "> Keep</label><span class=\"tag\">" + rc(c7.in) + " to " + rc(c7.out) + "</span>" + (c7.why ? "<span class=\"note\">" + r3(c7.why) + "</span>" : "") + "</div></div></div>").join("");
      c5.querySelectorAll(".lv-item").forEach(c7 => {
        const c8 = r6.scenes[+c7.dataset.i];
        c7.querySelectorAll("[data-f]").forEach(c9 => c9.onchange = () => {
          const cr = c9.dataset.f;
          if (cr === "keep") {
            c8.keep = c9.checked;
          } else if (cr === "speed") {
            c8.speed = +c9.value;
          } else {
            c8.room = c9.value;
          }
          rj = null;
          rJ();
          ra(rG.polish.t, false);
        });
      });
    } else {
      c5.innerHTML = r6.ready ? "<p class=\"note\">The whole clip is used until you scan it.</p>" : "";
    }
  }
  function rx() {
    const c5 = r2("#lp_style");
    c5.innerHTML = "";
    const c6 = r4.polish;
    rd(c5, "Shape", [["auto", "Same as my video"], ["9x16", "Vertical 9:16"], ["1x1", "Square"], ["16x9", "Wide 16:9"]], () => c6.fmt, c7 => {
      c6.fmt = c7;
      rj = null;
      rI();
    });
    rd(c5, "Language on screen", [["en", "English"], ["es", "Español"]], () => c6.lang, c7 => {
      c6.lang = c7;
      rI();
    });
    c5.insertAdjacentHTML("beforeend", "<div class=\"fun-grid\">" + [["bright", "Brightness"], ["contrast", "Contrast"], ["warm", "Warmth"], ["sat", "Color"]].map(([c7, c8]) => "<label>" + c8 + " <span class=\"tag\" data-v=\"" + c7 + "\">" + (c6[c7] > 0 ? "+" : "") + c6[c7] + "</span><input type=\"range\" min=\"-40\" max=\"40\" step=\"1\" data-k2=\"" + c7 + "\" value=\"" + c6[c7] + "\"></label>").join("") + "</div>");
    c5.querySelectorAll("[data-k2]").forEach(c7 => c7.oninput = () => {
      c6[c7.dataset.k2] = +c7.value;
      c5.querySelector("[data-v=\"" + c7.dataset.k2 + "\"]").textContent = (+c7.value > 0 ? "+" : "") + c7.value;
      r7();
      rI();
    });
    rY(c5, [["steady", "Steady small wobbles (scan first)"], ["captions", "Room labels"], ["intro", "Intro with address and price"], ["outro", "End card"], ["orig", "Keep the original sound"], ["unbranded", "MLS version (no branding)"]], c6, () => {
      rj = null;
      rI();
      rh();
    });
  }
  async function c0() {
    if (!r6.ready) {
      r8("Add a video first.", "polish");
      return;
    }
    if (!r2("#lp_ok").checked) {
      r8("Confirm you have the right to use the video (step 1) before making the MP4.", "polish");
      return;
    }
    if (r0.fhCheck(r4.audio.polish.script).length) {
      r8("Fix the Fair Housing words in your script, then try again.", "polish");
      return;
    }
    const c5 = r2("#lp_export");
    c5.disabled = true;
    rV("polish", false);
    const c6 = r2("#lp_canvas");
    try {
      const c7 = rv();
      r8("Getting the sound ready...", "polish");
      const c8 = await rn("polish", c7.total);
      const c9 = r4.audio.polish.voice !== "none" ? r5.polish.voiceBuf : null;
      rj = null;
      rG.polish.playing = true;
      const cr = await rK({
        canvas: c6,
        duration: c7.total,
        music: c8,
        voice: c9,
        media: r4.polish.orig ? r6.v : null,
        draw: cc => ra(cc, true),
        progress: cc => r8("Recording your video: " + Math.round(cc * 100) + "%. Keep this tab open and visible.", "polish")
      });
      rG.polish.playing = false;
      r6.v.pause();
      await r1.save(rP(r4.polish.threeD ? "3D_tour" : "video", rA()) + "." + cr.ext, cr.blob, cc => r8(cc, "polish"));
      if (cr.ext === "webm") {
        r8("Saved as WebM, the format this browser records. Instagram needs MP4: use Chrome, Safari or the Claude desktop app for MP4.", "polish");
      }
    } catch (cc) {
      console.error(cc);
      r8(cc && cc.code === "unsupported" ? "Video export is not supported in this browser. Try Chrome, Edge, Safari or the Claude desktop app." : "The video could not be made. Reload the page and try again.", "polish");
    } finally {
      rG.polish.playing = false;
      c5.disabled = false;
    }
  }
  function c1(c5) {
    r4.mode = c5;
    ["tour", "polish", "three", "guide"].forEach(c6 => r2("#lv_" + c6).hidden = c6 !== c5);
    document.querySelectorAll("#lv_mode .chip").forEach(c6 => c6.setAttribute("aria-pressed", String(c6.dataset.v === c5)));
    rV("tour", false);
    if (r6.ready) {
      rV("polish", false);
    }
    rI();
  }
  function c2(c5) {
    const c6 = c5 === "tour" ? "lt" : "lp";
    r2("#" + c6 + "_play").onclick = () => rV(c5, !rG[c5].playing);
    const c7 = r2("#" + c6 + "_seek");
    c7.oninput = () => {
      rG[c5].drag = true;
      const c8 = c5 === "tour" ? rm().total : rv().total;
      rG[c5].t = +c7.value / 1000 * c8;
      if (rG[c5].playing) {
        rG[c5].t0 = performance.now() - rG[c5].t * 1000;
      } else {
        rL(c5);
      }
    };
    c7.onchange = () => {
      rG[c5].drag = false;
    };
  }
  let c3 = false;
  function c4() {
    rI();
    rh();
  }
  window.iMathLVApp = {
    init: function () {
      if (c3) {
        c4();
        return;
      }
      c3 = true;
      r1 = window.__studioCtx;
      c6 = "imath_lv";
      const c5 = r1.store.get(c6) || {};
      var c6;
      ["info", "tour", "polish"].forEach(c7 => {
        if (c5[c7]) {
          Object.assign(r4[c7], c5[c7]);
        }
      });
      if (c5.audio) {
        ["tour", "polish"].forEach(c7 => Object.assign(r4.audio[c7], c5.audio[c7] || {}));
      }
      if (c5.mls) {
        r4.mls = c5.mls;
        r2("#lt_mls").value = c5.mls;
      }
      if (!r4.info.address && !r4.info.city) {
        r4.info.city = "Jacksonville, FL";
      }
      r6.v = r2("#lp_src");
      document.querySelectorAll("#lv_mode .chip").forEach(c7 => c7.onclick = () => c1(c7.dataset.v));
      document.querySelectorAll(".lv-details").forEach(rw);
      (function () {
        const c7 = r2("#lt_style");
        c7.innerHTML = "";
        const c8 = r4.tour;
        rd(c7, "Shape", Object.keys(r0.FORMATS).map(c9 => [c9, {
          "9x16": "Vertical 9:16",
          "1x1": "Square",
          "16x9": "Wide 16:9"
        }[c9]]), () => c8.fmt, c9 => {
          c8.fmt = c9;
          rI();
        });
        rd(c7, "Camera motion", [["gentle", "Gentle"], ["cinematic", "Cinematic"], ["energetic", "Energetic"]], () => c8.style, c9 => {
          c8.style = c9;
          rI();
        });
        rd(c7, "Transitions", [["mix", "Mix"], ["fade", "Fade"], ["slide", "Slide"], ["zoom", "Zoom"], ["cut", "Quick cuts"]], () => c8.trans, c9 => {
          c8.trans = c9;
          rI();
          rF();
        });
        rd(c7, "Language on screen", [["en", "English"], ["es", "Español"]], () => c8.lang, c9 => {
          c8.lang = c9;
          rF();
          rI();
        });
        c7.insertAdjacentHTML("beforeend", "<label>Seconds per photo <span class=\"tag\" id=\"lt_durV\">" + (+c8.photoDur).toFixed(1) + " s</span><input type=\"range\" id=\"lt_dur\" min=\"2.2\" max=\"5\" step=\"0.1\" value=\"" + c8.photoDur + "\"></label>");
        r2("#lt_dur").oninput = c9 => {
          c8.photoDur = +c9.target.value;
          r2("#lt_durV").textContent = c8.photoDur.toFixed(1) + " s";
          r7();
          rI();
        };
        rY(c7, [["captions", "Room labels"], ["intro", "Intro with address and price"], ["outro", "End card"], ["unbranded", "MLS version (no branding)"]], c8, () => {
          rI();
          rh();
        });
      })();
      rx();
      rb("tour");
      rb("polish");
      rF();
      rM();
      rJ();
      c2("tour");
      c2("polish");
      r2("#lt_pull").onclick = rz;
      r2("#lt_mls").addEventListener("keydown", c7 => {
        if (c7.key === "Enter") {
          rz();
        }
      });
      r2("#lt_in").onchange = c7 => {
        (async function (c8) {
          if (!r2("#lt_ok").checked) {
            r8("First check the box that you have the right to use these photos.");
            return;
          }
          const c9 = [...c8].filter(cc => /^image\//.test(cc.type)).slice(0, 40 - r4.items.length);
          if (!c9.length) {
            r8("That is the most photos one tour can use (40).");
            return;
          }
          let cr = 0;
          for (const cc of c9) {
            cr++;
            r8("Adding photo " + cr + " of " + c9.length + "...");
            try {
              const cl = URL.createObjectURL(cc);
              await rq(cl, {
                name: cc.name,
                room: r0.mlsRoom(cc.name.replace(/[_\-.]/g, " "))
              });
              URL.revokeObjectURL(cl);
            } catch (cE) {}
          }
          r2("#lt_inName").textContent = r4.items.length + " photos added";
          r8(r4.items.length + " photos in the tour. Click Sort with Claude to put them in walkthrough order.");
          rF();
          rI();
          rh();
        })(c7.target.files);
        c7.target.value = "";
      };
      r2("#lt_sort").onclick = rH;
      r2("#lt_sortBasic").onclick = () => {
        rQ();
        r8("Sorted by room tags. Fix any label by hand.");
      };
      r2("#lt_export").onclick = ri;
      ["#lt_ok", "#lp_ok"].forEach(c7 => r2(c7).onchange = rh);
      r2("#lp_in").onchange = c7 => {
        const c8 = c7.target.files[0];
        if (c8) {
          rX(c8, false);
        }
        c7.target.value = "";
      };
      r2("#lp_analyze").onclick = ry;
      r2("#lp_export").onclick = c0;
      r2("#l3_in").onchange = c7 => {
        const c8 = c7.target.files[0];
        if (c8) {
          r2("#l3_name").textContent = "3D fly through: " + c8.name;
          c1("polish");
          rX(c8, true);
          c7.target.value = "";
        }
      };
      r1.onProfile(() => {
        if (r1.isVideo && r1.isVideo()) {
          rI();
        }
      });
      c1("tour");
      rh();
    },
    refresh: c4,
    get state() {
      return r4;
    },
    get polish() {
      return r6;
    },
    tourP: rs,
    polishParts: rv,
    setMode: c1
  };
})();
