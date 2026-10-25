/*! (c) 2026 Elliot De la Cruz and iMath Group. All rights reserved. Proprietary and confidential. Licensed for use only; copying, modification, reverse engineering, redistribution or use as a template is prohibited without written permission. */
(function (j) {
  const H = "#002e5e";
  const R = "#6bc063";
  const I = "#3f8f39";
  const F = "#62666a";
  const V = "#1a2b3d";
  const Z = "Montserrat, \"Arial Black\", Arial, sans-serif";
  const D = "\"Open Sans\", Arial, sans-serif";
  const C = "United Real Estate Gallery  |  FL Lic. CQ1066513  |  Equal Housing Opportunity";
  const Q = (J, G, U, M) => {
    J.font = G + " " + Math.round(U) + "px " + M;
  };
  function w(J, G, U) {
    const M = [];
    String(G || "").split(/\n/).forEach(j0 => {
      const j1 = j0.split(/\s+/).filter(Boolean);
      let j2 = "";
      j1.forEach(j3 => {
        const j4 = j2 ? j2 + " " + j3 : j3;
        if (J.measureText(j4).width > U && j2) {
          M.push(j2);
          j2 = j3;
        } else {
          j2 = j4;
        }
      });
      M.push(j2);
    });
    return M;
  }
  function O(J, G, U, M, j0, j1, j2) {
    let j3 = w(J, G, j0);
    if (j2 && j3.length > j2) {
      j3 = j3.slice(0, j2);
      j3[j2 - 1] = j3[j2 - 1].replace(/\s*\S*$/, "") + "...";
    }
    j3.forEach((j4, j5) => J.fillText(j4, U, M + j5 * j1));
    return j3.length * j1;
  }
  function B(J, G, U, M, j0, j1, j2) {
    let j3 = M;
    for (Q(J, j1, j3, j2); j3 > j0 && J.measureText(G).width > U;) {
      j3 -= 2;
      Q(J, j1, j3, j2);
    }
    return j3;
  }
  function N(J, G, U, M, j0) {
    let j1 = U;
    for (const j2 of String(G)) {
      J.fillText(j2, j1, M);
      j1 += J.measureText(j2).width + j0;
    }
    return j1 - U;
  }
  function P(J, G, U, M, j0, j1, j2, j3) {
    if (!G) {
      return;
    }
    const j4 = G.videoWidth || G.naturalWidth || G.width;
    const j5 = G.videoHeight || G.naturalHeight || G.height;
    if (!j4 || !j5) {
      return;
    }
    const j6 = Math.max(j0 / j4, j1 / j5);
    const j7 = j0 / j6;
    const j8 = j1 / j6;
    const j9 = (j4 - j7) * (j2 == null ? 0.5 : j2);
    const jj = (j5 - j8) * (j3 == null ? 0.5 : j3);
    J.drawImage(G, j9, jj, j7, j8, U, M, j0, j1);
  }
  function z(J, G, U, M, j0, j1) {
    J.beginPath();
    if (J.roundRect) {
      J.roundRect(G, U, M, j0, j1);
    } else {
      J.rect(G, U, M, j0);
    }
  }
  function E(J, G, U, M, j0, j1) {
    J.save();
    J.beginPath();
    J.arc(U, M, j0, 0, Math.PI * 2);
    J.closePath();
    J.fillStyle = H;
    J.fill();
    J.clip();
    if (G) {
      if (G.__cut) {
        const j2 = G.naturalWidth || G.width;
        const j3 = G.naturalHeight || G.height;
        const j4 = j0 * 2 / Math.max(j2, j3) * 1.05;
        J.drawImage(G, U - j2 * j4 / 2, M - j0 * 0.92, j2 * j4, j3 * j4);
      } else {
        P(J, G, U - j0, M - j0, j0 * 2, j0 * 2, 0.5, 0.25);
      }
    }
    J.restore();
    if (j1) {
      J.lineWidth = j0 * 0.07;
      J.strokeStyle = j1;
      J.beginPath();
      J.arc(U, M, j0 * 1.04, 0, Math.PI * 2);
      J.stroke();
    }
  }
  const q = J => String(J || "iM").split(/\s+/).filter(Boolean).map(G => G[0]).slice(0, 2).join("").toUpperCase();
  function W(J, G, U, M, j0, j1) {
    if (!G) {
      return 0;
    }
    const j2 = (G.naturalWidth || G.width) * j0 / (G.naturalHeight || G.height);
    J.drawImage(G, j1 ? U - j2 : U, M, j2, j0);
    return j2;
  }
  const L = {
    Listings: ["photo", "photo", "details", "contact"],
    "Agent Brand": ["content", "content", "contact"],
    Education: ["content", "content", "content", "contact"],
    "Brand and Seasonal": ["content", "contact"]
  };
  function Y(J, G, U, M, j0, j1) {
    J.fillStyle = M ? H : "#f2f5f9";
    J.fillRect(0, 0, G, U);
    const j2 = G / 1080;
    J.fillStyle = M ? "#001f40" : H;
    J.beginPath();
    J.moveTo(G * 0.8, 0);
    J.lineTo(G, 0);
    J.lineTo(G, G * 0.2);
    J.closePath();
    J.fill();
    J.strokeStyle = R;
    J.lineWidth = j2 * 8;
    J.beginPath();
    J.moveTo(G * 0.8 - j2 * 22, 0);
    J.lineTo(G, G * 0.2 + j2 * 22);
    J.stroke();
    const j3 = U - j2 * 150;
    J.fillStyle = M ? "rgba(255,255,255,.16)" : "rgba(0,46,94,.12)";
    J.fillRect(0, j3, G, j2 * 4);
    J.fillStyle = R;
    J.fillRect(0, j3, G * (j0 + 1) / j1, j2 * 4);
  }
  function K(J, G, U, M, j0, j1) {
    const j2 = G / 1080;
    Q(J, 800, j2 * 26, Z);
    J.fillStyle = j0 ? "#fff" : H;
    J.fillText(String(U + 1).padStart(2, "0"), j2 * 72, j2 * 108);
    J.fillStyle = R;
    Q(J, 800, j2 * 26, Z);
    J.fillText(" / " + String(M).padStart(2, "0"), j2 * 72 + J.measureText("00").width + 2, j2 * 108);
    if (j1) {
      Q(J, 800, j2 * 22, Z);
      J.fillStyle = j0 ? R : I;
      N(J, j1, j2 * 72, j2 * 158, j2 * 5);
    }
  }
  function k(J, G, U, M, j0, j1) {
    const j2 = G / 1080;
    const j3 = U - j2 * 118;
    W(J, j0 ? M.lockupHRev : M.lockupH, j2 * 72, j3, j2 * 54);
    Q(J, 400, j2 * 17, D);
    J.fillStyle = j0 ? "#c9d6e4" : F;
    J.fillText(C, j2 * 72, U - j2 * 38);
    if (!j1) {
      Q(J, 800, j2 * 22, Z);
      J.fillStyle = j0 ? "#fff" : H;
      J.textAlign = "right";
      N(J, "", 0, 0, 0);
      J.fillText("SWIPE", G - j2 * 118, j3 + j2 * 36);
      J.textAlign = "left";
      J.fillStyle = R;
      J.beginPath();
      J.arc(G - j2 * 88, j3 + j2 * 28, j2 * 22, 0, Math.PI * 2);
      J.fill();
      J.strokeStyle = H;
      J.lineWidth = j2 * 4;
      J.beginPath();
      J.moveTo(G - j2 * 94, j3 + j2 * 18);
      J.lineTo(G - j2 * 83, j3 + j2 * 28);
      J.lineTo(G - j2 * 94, j3 + j2 * 38);
      J.stroke();
    }
  }
  function X(J, G, U, M, j0, j1) {
    let j2 = M;
    for (Q(J, j0, j2, j1 || Z); j2 > 14 && J.measureText(G).width > U;) {
      j2 -= 2;
      Q(J, j0, j2, j1 || Z);
    }
    return j2;
  }
  j.iMathSocialX = {
    defaultSlides: function (J, G, U) {
      const M = U === "es";
      const j0 = (L[J.cat] || ["content", "contact"]).slice();
      const j1 = {
        photo: [M ? "Cada detalle cuenta" : "Every detail counts", M ? "Agregue una foto de la cocina, la sala o el patio." : "Add a kitchen, living room or backyard photo."],
        details: [M ? "Lo que obtiene" : "What you get", ""],
        contact: [M ? "¿Listo para verla?" : "Want the full story?", M ? "Envíeme un mensaje hoy." : "Send me a message today."]
      };
      const j2 = {
        Education: [[M ? "Paso 1" : "Step 1", M ? "Explique la primera idea en una o dos frases." : "Explain the first idea in one or two sentences."], [M ? "Paso 2" : "Step 2", M ? "Agregue el siguiente consejo práctico." : "Add the next practical tip."], [M ? "Paso 3" : "Step 3", M ? "Cierre con lo que deben hacer ahora." : "Close with what they should do now."]],
        "Agent Brand": [[M ? "Cómo trabajo" : "How I work", M ? "Cuente cómo guía a sus clientes paso a paso." : "Share how you guide clients step by step."], [M ? "Por qué lo hago" : "Why I do this", M ? "Una frase sobre lo que le motiva." : "One line about what drives you."]],
        "Brand and Seasonal": [[M ? "Nuestro compromiso" : "Our promise", M ? "Un mensaje breve para su comunidad." : "A short message for your community."]]
      }[J.cat] || [];
      let j3 = 0;
      let j4 = 0;
      const j5 = [[M ? "La cocina" : "The kitchen", M ? "Cuente lo mejor de esta habitación en una frase." : "Tell them the best thing about this room in one line."], [M ? "Espacio exterior" : "Outdoor space", M ? "Patio, porche o vista: muéstrelo aquí." : "Backyard, porch or view: show it off here."], [M ? "La sala" : "Living space", M ? "Luz natural, espacio y detalles." : "Natural light, space and finishes."]];
      return j0.map(j6 => {
        if (j6 === "content") {
          const j8 = j2[j3++] || ["", ""];
          return {
            kind: j6,
            title: j8[0],
            body: j8[1]
          };
        }
        if (j6 === "photo") {
          const j9 = j5[j4++ % 3];
          return {
            kind: j6,
            title: j9[0],
            body: j9[1]
          };
        }
        const j7 = j1[j6] || ["", ""];
        return {
          kind: j6,
          title: j7[0],
          body: j7[1],
          features: j6 === "details" ? M ? "Cocina actualizada\nPatio cercado\nCerca de escuelas" : "Updated kitchen\nFenced backyard\nClose to schools" : ""
        };
      });
    },
    drawSlide: function (J, j0) {
      const j1 = j0.size;
      J.width = j1.w;
      J.height = j1.h;
      const j2 = J.getContext("2d");
      const j3 = j1.w;
      const j4 = j1.h;
      const j5 = j3 / 1080;
      const j6 = j0.slide;
      const j7 = j0.assets || {};
      const j8 = j0.profile || {};
      const j9 = j0.data || {};
      const jj = j0.index;
      const jH = j0.count;
      const jR = jj === jH - 1;
      const jS = j5 * 72;
      const jI = j3 - jS * 2;
      const jv = String(j0.eyebrow || "").toUpperCase();
      j2.textBaseline = "alphabetic";
      if (j6.kind === "contact") {
        Y(j2, j3, j4, true, jj, jH);
        K(j2, j3, jj, jH, true, jv);
        const ju = Math.min(j5 * 170, j4 * 0.13);
        const jD = j4 * 0.34;
        E(j2, j7.headshot, j3 / 2, jD, ju, R);
        if (!j7.headshot) {
          Q(j2, 900, ju * 0.7, Z);
          j2.fillStyle = "#fff";
          j2.textAlign = "center";
          j2.fillText(q(j8.agentName), j3 / 2, jD + ju * 0.25);
          j2.textAlign = "left";
        }
        j2.textAlign = "center";
        let jr = jD + ju + j5 * 90;
        const jl = B(j2, j6.title || "", jI, j5 * 68, j5 * 40, 900, Z);
        j2.fillStyle = "#fff";
        j2.fillText(j6.title || "", j3 / 2, jr);
        jr += jl * 0.5;
        if (j6.body) {
          Q(j2, 400, j5 * 32, D);
          j2.fillStyle = "#dbe5ef";
          jr += j5 * 20;
          jr += O(j2, j6.body, j3 / 2, jr + j5 * 20, jI, j5 * 44, 2);
        }
        jr += j5 * 40;
        j2.fillStyle = R;
        j2.fillRect(j3 / 2 - j5 * 40, jr, j5 * 80, j5 * 5);
        jr += j5 * 70;
        Q(j2, 800, X(j2, j8.agentName || "Your Name", jI, j5 * 48, 800), Z);
        j2.fillStyle = "#fff";
        j2.fillText(j8.agentName || "Your Name", j3 / 2, jr);
        jr += j5 * 46;
        Q(j2, 600, j5 * 26, D);
        j2.fillStyle = "#9fc0e0";
        j2.fillText([j8.agentTitle, j8.bilingual ? "Se habla español" : ""].filter(Boolean).join("  |  "), j3 / 2, jr);
        jr += j5 * 54;
        Q(j2, 700, j5 * 34, D);
        j2.fillStyle = "#fff";
        [j8.phone, j8.email].filter(Boolean).forEach(ji => {
          Q(j2, 700, X(j2, ji, jI, j5 * 34, 700, D), D);
          j2.fillText(ji, j3 / 2, jr);
          jr += j5 * 48;
        });
        j2.textAlign = "left";
        k(j2, j3, j4, j7, true, true);
        return;
      }
      Y(j2, j3, j4, false, jj, jH);
      K(j2, j3, jj, jH, false, jv);
      const jp = j5 * 210;
      const jF = j4 - j5 * 190;
      if (j6.kind === "photo") {
        const ji = j6.img || null;
        const jC = (jF - jp) * 0.72;
        j2.save();
        z(j2, jS, jp, jI, jC, j5 * 26);
        j2.clip();
        if (ji) {
          P(j2, ji, jS, jp, jI, jC);
        } else {
          j2.fillStyle = "#dfe7ef";
          j2.fillRect(jS, jp, jI, jC);
          Q(j2, 800, j5 * 30, Z);
          j2.fillStyle = F;
          j2.textAlign = "center";
          j2.fillText("ADD A PHOTO", j3 / 2, jp + jC / 2);
          j2.textAlign = "left";
        }
        j2.restore();
        let jQ = jp + jC + j5 * 70;
        B(j2, j6.title || "", jI, j5 * 56, j5 * 36, 900, Z);
        j2.fillStyle = H;
        j2.fillText(j6.title || "", jS, jQ);
        jQ += j5 * 16;
        Q(j2, 400, j5 * 30, D);
        j2.fillStyle = F;
        O(j2, j6.body, jS, jQ + j5 * 36, jI, j5 * 42, Math.max(1, Math.floor((jF - jQ) / (j5 * 42)) - 1));
        return k(j2, j3, j4, j7, false, jR);
      }
      if (j6.kind === "details") {
        let jw = jp + j5 * 40;
        B(j2, j6.title || "", jI, j5 * 76, j5 * 44, 900, Z);
        j2.fillStyle = H;
        j2.fillText(j6.title || "", jS, jw + j5 * 40);
        jw += j5 * 90;
        j2.fillStyle = R;
        j2.fillRect(jS, jw, j5 * 90, j5 * 6);
        jw += j5 * 50;
        const jO = [[j9.beds, j0.lang === "es" ? "Hab." : "Beds"], [j9.baths, j0.lang === "es" ? "Baños" : "Baths"], [j9.sqft, j0.lang === "es" ? "Pies²" : "Sq Ft"]].filter(jA => jA[0]);
        const jB = (jI - j5 * 30 * (jO.length - 1)) / Math.max(1, jO.length);
        jO.forEach((jA, jN) => {
          const jP = jS + jN * (jB + j5 * 30);
          j2.fillStyle = "#fff";
          z(j2, jP, jw, jB, j5 * 170, j5 * 18);
          j2.fill();
          j2.fillStyle = H;
          B(j2, String(jA[0]), jB - j5 * 40, j5 * 70, j5 * 30, 900, Z);
          j2.fillText(String(jA[0]), jP + j5 * 28, jw + j5 * 95);
          Q(j2, 700, j5 * 22, Z);
          j2.fillStyle = F;
          N(j2, jA[1].toUpperCase(), jP + j5 * 28, jw + j5 * 138, j5 * 3);
        });
        if (jO.length) {
          jw += j5 * 220;
        }
        if (j9.price) {
          Q(j2, 700, j5 * 24, Z);
          j2.fillStyle = F;
          N(j2, j0.lang === "es" ? "PRECIO" : "OFFERED AT", jS, jw, j5 * 4);
          B(j2, j9.price, jI, j5 * 84, j5 * 40, 900, Z);
          j2.fillStyle = I;
          j2.fillText(j9.price, jS, jw + j5 * 86);
          jw += j5 * 175;
        }
        Q(j2, 600, j5 * 34, D);
        String(j6.features || "").split(/\n/).map(jA => jA.trim()).filter(Boolean).forEach(jA => {
          if (!(jw > jF - j5 * 40)) {
            j2.fillStyle = R;
            j2.beginPath();
            j2.arc(jS + j5 * 12, jw - j5 * 11, j5 * 10, 0, Math.PI * 2);
            j2.fill();
            j2.fillStyle = V;
            j2.fillText(jA, jS + j5 * 44, jw);
            jw += j5 * 58;
          }
        });
        if (j6.body && jw < jF - j5 * 60) {
          Q(j2, 400, j5 * 30, D);
          j2.fillStyle = F;
          O(j2, j6.body, jS, jw + j5 * 10, jI, j5 * 42, 3);
        }
        return k(j2, j3, j4, j7, false, jR);
      }
      Q(j2, 400, j5 * 40, D);
      const jV = w(j2, j6.body, jI).length;
      const jg = String(j6.title || "");
      const jo = Math.min(j5 * 96, Math.max(j5 * 52, j5 * 96 - Math.max(0, jg.length - 18) * 1.6 * j5));
      Q(j2, 900, jo, Z);
      const jd = Math.min(3, w(j2, jg, jI).length) * jo * 1.08 + j5 * 92 + (j6.img ? Math.min(j5 * 420, (jF - jp) * 0.4) + j5 * 50 : 0) + jV * 56 * j5;
      let jT = jp + Math.max(j5 * 60, (jF - jp - jd) * 0.42);
      const jn = String(j6.title || "");
      const jZ = Math.min(j5 * 96, Math.max(j5 * 52, j5 * 96 - Math.max(0, jn.length - 18) * 1.6 * j5));
      Q(j2, 900, jZ, Z);
      j2.fillStyle = H;
      jT += O(j2, jn, jS, jT + jZ * 0.8, jI, jZ * 1.08, 3);
      jT += j5 * 30;
      j2.fillStyle = R;
      j2.fillRect(jS, jT, j5 * 90, j5 * 6);
      jT += j5 * 56;
      if (j6.img) {
        const jA = Math.min(j5 * 420, (jF - jT) * 0.5);
        j2.save();
        z(j2, jS, jT, jI, jA, j5 * 22);
        j2.clip();
        P(j2, j6.img, jS, jT, jI, jA);
        j2.restore();
        jT += jA + j5 * 50;
      }
      Q(j2, 400, j5 * 40, D);
      j2.fillStyle = V;
      O(j2, j6.body, jS, jT + j5 * 20, jI, j5 * 56, Math.max(1, Math.floor((jF - jT) / (j5 * 54))));
      k(j2, j3, j4, j7, false, jR);
    },
    drawVideoFrame: function (J, G, U) {
      const j0 = U.W;
      const j1 = U.H;
      const j2 = Math.min(j0, j1) / 1080;
      const j3 = U.opt || {};
      const j4 = U.assets || {};
      const j5 = U.profile || {};
      const j6 = U.t || 0;
      const j7 = U.dur || 0;
      const j8 = j3.fine || C;
      const j9 = (jV, jg) => {
        let jo = jV;
        for (Q(J, 400, jo, D); J.measureText(j8).width > jg && jo > jV * 0.55;) {
          jo -= 1;
          Q(J, 400, jo, D);
        }
      };
      const jj = Math.max(0.2, Math.min(1, j3.softness == null ? 0.85 : j3.softness));
      J.fillStyle = "#000";
      J.fillRect(0, 0, j0, j1);
      if (G) {
        if (j3.fit === "contain") {
          const jV = G.videoWidth;
          const jg = G.videoHeight;
          if (jV && jg) {
            const jo = Math.min(j0 / jV, j1 / jg);
            J.save();
            J.filter = "blur(28px) brightness(.55)";
            P(J, G, -40, -40, j0 + 80, j1 + 80);
            J.restore();
            J.drawImage(G, (j0 - jV * jo) / 2, (j1 - jg * jo) / 2, jV * jo, jg * jo);
          }
        } else {
          P(J, G, 0, 0, j0, j1);
        }
      }
      const jH = jd => Math.max(0, Math.min(1, jd));
      const jR = j3.intro ? jH(1 - (j6 - 2.2) / 0.5) : 0;
      const jS = j3.outro && j7 > 6 ? jH((j6 - (j7 - 3.2)) / 0.5) : 0;
      const jI = j2 * 60;
      const jv = j2 * 150;
      const jp = j2 * 170;
      if (j3.header) {
        J.save();
        J.globalAlpha = jj;
        const jd = J.createLinearGradient(0, 0, 0, jv * 1.6);
        jd.addColorStop(0, "rgba(0,26,54,.78)");
        jd.addColorStop(1, "rgba(0,26,54,0)");
        J.fillStyle = jd;
        J.fillRect(0, 0, j0, jv * 1.6);
        J.restore();
        J.save();
        J.globalAlpha = Math.min(1, jj + 0.1);
        W(J, j4.lockupHRev, jI, jI * 0.8, j2 * 58);
        J.restore();
      }
      if (j3.bug && j4.iconReverse) {
        J.save();
        J.globalAlpha = jj * 0.55 + 0.2;
        W(J, j4.iconReverse, j0 - jI, j3.header ? jI * 0.8 : jI, j2 * 64, true);
        J.restore();
      }
      if (j3.banner && (j3.bannerWhen === "start" ? j6 < 6 : j3.bannerWhen !== "end" || j6 > j7 - 6) && (j3.headline || j3.subline)) {
        const jT = (j3.subline ? 150 : 104) * j2;
        const jn = j3.pos === "upper" ? j1 * 0.2 : j1 - (j3.footer ? jp : jI) - jT - j2 * 40;
        const jZ = jI;
        Q(J, 900, j2 * 52, Z);
        const ju = J.measureText(j3.headline || "").width;
        Q(J, 600, j2 * 32, D);
        const jD = J.measureText(j3.subline || "").width;
        const jr = Math.min(j0 - jI * 2, Math.max(ju, jD) + j2 * 90);
        const jl = j3.bannerWhen === "end" ? jH((j6 - (j7 - 6)) / 0.4) : jH(j6 / 0.4);
        const ji = (1 - jl) * 40 * j2;
        J.save();
        J.globalAlpha = jj * jl;
        J.fillStyle = j3.style === "glass" ? "rgba(255,255,255,.82)" : j3.style === "green" ? "rgba(63,143,57,.9)" : "rgba(0,46,94,.86)";
        z(J, jZ - ji, jn, jr, jT, j2 * 18);
        J.fill();
        J.fillStyle = j3.style === "green" ? "#fff" : R;
        J.fillRect(jZ - ji, jn, j2 * 10, jT);
        J.restore();
        J.save();
        J.globalAlpha = Math.min(1, jj + 0.15) * jl;
        const jC = j3.style === "glass" ? H : "#fff";
        Q(J, 900, j2 * 52, Z);
        J.fillStyle = jC;
        J.fillText(j3.headline || "", jZ + j2 * 40 - ji, jn + (j3.subline ? 70 : 72) * j2);
        if (j3.subline) {
          Q(J, 600, j2 * 32, D);
          J.fillStyle = j3.style === "glass" ? F : "#dbe5ef";
          J.fillText(j3.subline, jZ + j2 * 40 - ji, jn + j2 * 118);
        }
        J.restore();
      }
      let jF = false;
      if (j3.footer) {
        J.save();
        J.globalAlpha = jj;
        const jQ = J.createLinearGradient(0, j1 - jp * 1.5, 0, j1);
        jQ.addColorStop(0, "rgba(0,26,54,0)");
        jQ.addColorStop(1, "rgba(0,26,54,.85)");
        J.fillStyle = jQ;
        J.fillRect(0, j1 - jp * 1.5, j0, jp * 1.5);
        J.restore();
        let jw = jI;
        const jO = j1 - jp * 0.62;
        J.save();
        J.globalAlpha = Math.min(1, jj + 0.15);
        if (j3.headshot) {
          const jB = j2 * 48;
          E(J, j4.headshot, jw + jB, jO - j2 * 6, jB, R);
          if (!j4.headshot) {
            Q(J, 900, jB * 0.7, Z);
            J.fillStyle = "#fff";
            J.textAlign = "center";
            J.fillText(q(j5.agentName), jw + jB, jO + j2 * 18);
            J.textAlign = "left";
          }
          jw += jB * 2 + j2 * 26;
        }
        Q(J, 800, j2 * 38, Z);
        J.fillStyle = "#fff";
        J.fillText(j5.agentName || "", jw, jO - j2 * 8);
        Q(J, 600, j2 * 28, D);
        J.fillStyle = "#dbe5ef";
        J.fillText([j5.phone, j5.agentTitle].filter(Boolean).join("  |  "), jw, jO + j2 * 32);
        Q(J, 400, j2 * 19, D);
        J.fillStyle = "#c9d6e4";
        j9(j2 * 19, j0 - jI * 2);
        J.fillText(j8, jI, j1 - j2 * 30);
        jF = true;
        J.restore();
      }
      if (jR > 0) {
        J.save();
        J.globalAlpha = jR * 0.92;
        J.fillStyle = H;
        J.fillRect(0, 0, j0, j1);
        J.globalAlpha = jR;
        J.fillStyle = R;
        J.fillRect(j0 / 2 - j2 * 50, j1 / 2 + j2 * 20, j2 * 100, j2 * 6);
        J.textAlign = "center";
        X(J, j3.headline || "iMath Group", j0 - jI * 2, j2 * 84, 900);
        J.fillStyle = "#fff";
        J.fillText(j3.headline || "", j0 / 2, j1 / 2 - j2 * 20);
        if (j3.subline) {
          Q(J, 600, j2 * 34, D);
          J.fillStyle = "#dbe5ef";
          J.fillText(j3.subline, j0 / 2, j1 / 2 + j2 * 90);
        }
        J.textAlign = "left";
        W(J, j4.lockupHRev, j0 / 2 + (j4.lockupHRev ? (j4.lockupHRev.naturalWidth || j4.lockupHRev.width) * -60 * j2 / (j4.lockupHRev.naturalHeight || j4.lockupHRev.height) / 2 : 0), j1 * 0.72, j2 * 60);
        J.restore();
      }
      if (jS > 0) {
        J.save();
        J.globalAlpha = jS * 0.95;
        J.fillStyle = H;
        J.fillRect(0, 0, j0, j1);
        J.globalAlpha = jS;
        const jA = j2 * 120;
        E(J, j4.headshot, j0 / 2, j1 * 0.36, jA, R);
        J.textAlign = "center";
        if (!j4.headshot) {
          Q(J, 900, jA * 0.7, Z);
          J.fillStyle = "#fff";
          J.fillText(q(j5.agentName), j0 / 2, j1 * 0.36 + jA * 0.25);
        }
        let jN = j1 * 0.36 + jA + j2 * 90;
        X(J, j5.agentName || "", j0 - jI * 2, j2 * 60, 900);
        J.fillStyle = "#fff";
        J.fillText(j5.agentName || "", j0 / 2, jN);
        jN += j2 * 56;
        Q(J, 600, j2 * 34, D);
        J.fillStyle = "#dbe5ef";
        [j5.agentTitle, j5.phone, j5.email].filter(Boolean).forEach(jP => {
          J.fillText(jP, j0 / 2, jN);
          jN += j2 * 50;
        });
        J.textAlign = "left";
        W(J, j4.lockupHRev, j0 / 2 - (j4.lockupHRev ? (j4.lockupHRev.naturalWidth || j4.lockupHRev.width) * 60 * j2 / (j4.lockupHRev.naturalHeight || j4.lockupHRev.height) : 0) / 2, jN + j2 * 30, j2 * 60);
        Q(J, 400, j2 * 20, D);
        J.fillStyle = "#c9d6e4";
        J.textAlign = "center";
        j9(j2 * 19, j0 - jI * 2);
        J.fillText(j8, j0 / 2, j1 - j2 * 40);
        J.textAlign = "left";
        jF = true;
        J.restore();
      }
      if (!j3.header && !jF) {
        J.save();
        J.globalAlpha = 0.85;
        Q(J, 600, j2 * 19, D);
        j9(j2 * 19, j0 - jI * 2 - j2 * 24);
        const jP = J.measureText(j8).width;
        J.fillStyle = "rgba(0,26,54,.55)";
        z(J, jI - j2 * 12, j1 - j2 * 58, jP + j2 * 24, j2 * 36, j2 * 8);
        J.fill();
        J.fillStyle = "#fff";
        J.fillText(j8, jI, j1 - j2 * 34);
        J.restore();
      }
    },
    FINE: C
  };
})(typeof window != "undefined" ? window : globalThis);
