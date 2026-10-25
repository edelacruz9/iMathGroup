/*! (c) 2026 Elliot De la Cruz and iMath Group. All rights reserved. Proprietary and confidential. Licensed for use only; copying, modification, reverse engineering, redistribution or use as a template is prohibited without written permission. */
(function (R) {
  const y = {
    mammoth: "https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.13.0/mammoth.browser.min.js",
    pdf: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js",
    worker: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"
  };
  const k = W => String(W == null ? "" : W).replace(/[&<>"]/g, z => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;"
  })[z]);
  const S = {};
  function x(W) {
    if (S[W]) {
      return S[W];
    } else {
      return S[W] = new Promise((z, M) => {
        const N = document.createElement("script");
        N.src = W;
        N.onload = z;
        N.onerror = () => {
          delete S[W];
          M(new Error("Could not load " + W));
        };
        document.head.appendChild(N);
      });
    }
  }
  const H = {
    B: "b",
    STRONG: "b",
    I: "i",
    EM: "i",
    U: "u",
    A: "a",
    BR: "br",
    SUP: "sup",
    SUB: "sub",
    SPAN: ""
  };
  function X(W) {
    let z = "";
    W.childNodes.forEach(M => {
      if (M.nodeType === 3) {
        z += k(M.nodeValue);
      } else if (M.nodeType === 1) {
        const N = H[M.tagName];
        const Q = X(M);
        if (N === "br") {
          z += "<br>";
        } else if (N === "a") {
          const F = M.getAttribute("href") || "";
          z += /^(https?:|mailto:|tel:)/i.test(F) ? "<a href=\"" + k(F) + "\">" + Q + "</a>" : Q;
        } else if (N) {
          z += "<" + N + ">" + Q + "</" + N + ">";
        } else if (M.tagName !== "IMG") {
          z += Q;
        }
      }
    });
    return z.replace(/\s+/g, " ");
  }
  const D = W => W.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").trim();
  function b(W) {
    const z = new DOMParser().parseFromString("<div>" + W + "</div>", "text/html");
    const M = [];
    const N = Q => {
      Q.childNodes.forEach(F => {
        if (F.nodeType !== 1) {
          if (F.nodeType === 3 && F.nodeValue.trim()) {
            M.push({
              t: "p",
              html: k(F.nodeValue.trim())
            });
          }
          return;
        }
        const A = F.tagName;
        if (/^H[1-6]$/.test(A)) {
          const v = Math.min(3, +A[1]);
          const Z = X(F).trim();
          if (Z) {
            M.push(F.classList.contains("doctitle") ? {
              t: "h1",
              html: Z,
              title: true
            } : {
              t: "h" + v,
              html: Z
            });
          }
        } else if (A === "P" && F.classList.contains("docsub")) {
          const L = X(F).trim();
          if (L) {
            M.push({
              t: "p",
              html: L,
              subtitle: true
            });
          }
        } else if (A === "P") {
          F.querySelectorAll("img").forEach(K => {
            const J = K.getAttribute("src") || "";
            if (/^data:image\//.test(J)) {
              M.push({
                t: "img",
                src: J,
                alt: K.getAttribute("alt") || ""
              });
            }
          });
          const C = X(F).trim();
          if (D(C)) {
            M.push({
              t: "p",
              html: C
            });
          }
        } else if (A === "UL" || A === "OL") {
          M.push({
            t: A.toLowerCase(),
            items: [...F.children].filter(K => K.tagName === "LI").map(K => X(K).trim()).filter(K => D(K))
          });
        } else if (A === "TABLE") {
          const K = [...F.querySelectorAll("tr")].map(J => [...J.children].map(P => X(P).trim()));
          if (K.length) {
            M.push({
              t: "table",
              rows: K,
              head: !!F.querySelector("th") || true
            });
          }
        } else if (A === "BLOCKQUOTE") {
          M.push({
            t: "quote",
            html: X(F).trim()
          });
        } else if (A === "IMG") {
          const J = F.getAttribute("src") || "";
          if (/^data:image\//.test(J)) {
            M.push({
              t: "img",
              src: J
            });
          }
        } else if (A === "HR") {
          M.push({
            t: "hr"
          });
        } else {
          N(F);
        }
      });
    };
    N(z.body.firstChild);
    return B(M);
  }
  function Y(W) {
    const z = [];
    const M = String(W || "").replace(/\r/g, "").split("\n");
    let N = [];
    let Q = null;
    const F = () => {
      if (N.length) {
        z.push({
          t: "p",
          html: O(N.join(" "))
        });
        N = [];
      }
    };
    const A = () => {
      if (Q) {
        z.push(Q);
        Q = null;
      }
    };
    M.forEach(v => {
      const Z = v.trim();
      let L;
      if (Z) {
        if (L = Z.match(/^(#{1,3})\s+(.*)$/)) {
          F();
          A();
          z.push({
            t: "h" + L[1].length,
            html: O(L[2])
          });
          return;
        } else if (L = Z.match(/^[-*•▪●◦]\s+(.*)$/)) {
          F();
          if (!Q || Q.t !== "ul") {
            A();
            Q = {
              t: "ul",
              items: []
            };
          }
          Q.items.push(O(L[1]));
          return;
        } else if (L = Z.match(/^\d{1,2}[.)]\s+(.*)$/)) {
          F();
          if (!Q || Q.t !== "ol") {
            A();
            Q = {
              t: "ol",
              items: []
            };
          }
          Q.items.push(O(L[1]));
          return;
        } else if (/^>\s?/.test(Z)) {
          F();
          A();
          z.push({
            t: "quote",
            html: O(Z.replace(/^>\s?/, ""))
          });
          return;
        } else if (/^(-{3,}|\*{3,}|_{3,})$/.test(Z)) {
          F();
          A();
          z.push({
            t: "hr"
          });
          return;
        } else if (!N.length && Z.length < 70 && (/^[A-Z0-9][A-Z0-9 &,'’/()-]{3,}$/.test(Z) || /:$/.test(Z)) && !/[.!?]$/.test(Z)) {
          A();
          z.push({
            t: "h2",
            html: O(Z.replace(/:$/, ""))
          });
          return;
        } else {
          A();
          N.push(Z);
          return;
        }
      } else {
        F();
        A();
        return;
      }
    });
    F();
    A();
    return B(z);
  }
  function O(W) {
    return k(W).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>").replace(/__(.+?)__/g, "<b>$1</b>").replace(/(^|[^*])\*(?!\s)(.+?)\*(?!\*)/g, "$1<i>$2</i>").replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, "<a href=\"$2\">$1</a>");
  }
  async function j(W, z) {
    await x(y.pdf);
    const M = R.pdfjsLib;
    M.GlobalWorkerOptions.workerSrc = y.worker;
    const N = await M.getDocument({
      data: W,
      isEvalSupported: false
    }).promise;
    const Q = [];
    for (let w = 1; w <= N.numPages; w++) {
      if (z) {
        z("Reading page " + w + " of " + N.numPages);
      }
      const U = await N.getPage(w);
      const G = U.getViewport({
        scale: 1
      });
      const T = await U.getTextContent();
      const n0 = new Map();
      T.items.forEach(n1 => {
        if (!n1.str || !n1.str.trim() && !n1.hasEOL) {
          return;
        }
        const n2 = Math.round(G.height - n1.transform[5]);
        const n3 = Math.round(Math.hypot(n1.transform[2], n1.transform[3]) * 10) / 10;
        const n4 = [...n0.keys()].find(n6 => Math.abs(n6 - n2) <= 2) ?? n2;
        const n5 = n0.get(n4) || {
          y: n4,
          parts: [],
          size: 0,
          bold: false
        };
        n5.parts.push({
          x: n1.transform[4],
          s: n1.str
        });
        n5.size = Math.max(n5.size, n3);
        if (/bold|black|heavy|semibold/i.test(n1.fontName || "") || /bold/i.test((T.styles[n1.fontName] || {}).fontFamily || "")) {
          n5.bold = true;
        }
        n0.set(n4, n5);
      });
      [...n0.values()].sort((n1, n2) => n1.y - n2.y).forEach(n1 => {
        const n2 = n1.parts.sort((n3, n4) => n3.x - n4.x).map(n3 => n3.s).join(" ").replace(/\s+/g, " ").trim();
        if (n2) {
          Q.push({
            page: w,
            y: n1.y,
            ph: G.height,
            size: n1.size,
            text: n2,
            bold: n1.bold,
            x: Math.min(...n1.parts.map(n3 => n3.x))
          });
        }
      });
    }
    const F = {};
    Q.forEach(n1 => {
      const n2 = n1.text.replace(/\d+/g, "#");
      F[n2] = (F[n2] || 0) + 1;
    });
    const A = N.numPages;
    const v = Q.filter(n1 => !(n2 => n2.y < n2.ph * 0.09 || n2.y > n2.ph * 0.91)(n1) || (!(A > 2) || !(F[n1.text.replace(/\d+/g, "#")] >= Math.ceil(A * 0.6))) && !/^(page\s*)?\d+(\s*(of|\/)\s*\d+)?$/i.test(n1.text));
    const Z = v.map(n1 => n1.size).sort((n1, n2) => n1 - n2);
    const L = Z[Math.floor(Z.length / 2)] || 11;
    const C = [];
    let K = null;
    let J = null;
    const P = () => {
      if (K) {
        C.push({
          t: "p",
          html: k(K.text)
        });
        K = null;
      }
      if (J) {
        C.push(J);
        J = null;
      }
    };
    v.forEach((n1, n2) => {
      const n3 = v[n2 - 1];
      const n4 = n3 && n3.page === n1.page ? n1.y - n3.y : 99;
      const n5 = L * 1.9;
      let n6;
      if (n1.size >= L * 1.18 && n1.text.length < 90) {
        P();
        C.push({
          t: n1.size >= L * 1.6 ? "h1" : "h2",
          html: k(n1.text)
        });
        return;
      }
      if (n1.bold && n1.text.length < 70 && !/[.,;]$/.test(n1.text) && n4 > n5 * 0.9) {
        P();
        C.push({
          t: "h3",
          html: k(n1.text)
        });
        return;
      }
      if ((n6 = n1.text.match(/^([•▪●◦‣⁃–-]|\d{1,2}[.)])\s*(.+)$/)) && (!/\d/.test(n6[1]) || /^\d{1,2}[.)]\s/.test(n1.text))) {
        if (K) {
          C.push({
            t: "p",
            html: k(K.text)
          });
          K = null;
        }
        const n7 = /\d/.test(n6[1]) ? "ol" : "ul";
        if (!J || J.t !== n7) {
          if (J) {
            C.push(J);
          }
          J = {
            t: n7,
            items: []
          };
        }
        J.items.push(k(n6[2]));
        return;
      }
      if (J && n4 < n5 && n1.x > (n3 ? n3.x : 0) + 4) {
        J.items[J.items.length - 1] += " " + k(n1.text);
      } else if (K && n4 < n5 && n4 > 0) {
        K.text += (K.text.endsWith("-") ? "" : " ") + n1.text;
      } else {
        P();
        K = {
          text: n1.text
        };
      }
    });
    P();
    return B(C);
  }
  function B(W) {
    const z = [];
    W.forEach(M => {
      if ((M.t !== "p" && !/^h\d$/.test(M.t) || D(M.html || "")) && (M.t !== "ul" && M.t !== "ol" || M.items.length)) {
        z.push(M);
      }
    });
    return z;
  }
  function E(W) {
    const z = document.createElement(W.t === "ul" || W.t === "ol" ? W.t : W.t === "table" ? "table" : W.t === "img" ? "figure" : W.t === "quote" ? "blockquote" : W.t === "hr" ? "hr" : W.t === "p" ? "p" : W.t);
    if (W.t === "ul" || W.t === "ol") {
      if (W.start > 1) {
        z.setAttribute("start", W.start);
      }
      z.innerHTML = W.items.map(M => "<li>" + M + "</li>").join("");
    } else if (W.t === "table") {
      const [M, ...N] = W.rows;
      z.innerHTML = (W.head !== false && M ? "<thead><tr>" + M.map(Q => "<th>" + Q + "</th>").join("") + "</tr></thead>" : "") + ("<tbody>" + (W.head !== false ? N : W.rows).map(Q => "<tr>" + Q.map(F => "<td>" + F + "</td>").join("") + "</tr>").join("") + "</tbody>");
    } else if (W.t === "img") {
      z.innerHTML = "<img src=\"" + W.src + "\" alt=\"" + k(W.alt || "") + "\">";
    } else if (W.t !== "hr") {
      z.innerHTML = W.html || "";
    }
    z.className = "db-" + W.t;
    return z;
  }
  const V = W => W.scrollHeight > W.clientHeight + 1;
  function q(W, z) {
    const M = W.match(/<[^>]+>|[^<\s]+\s*|\s+/g) || [];
    let N = 0;
    let Q = "";
    let F = 0;
    const A = [];
    for (; F < M.length && N < z; F++) {
      const v = M[F];
      Q += v;
      if (v[0] === "<") {
        if (v[1] === "/") {
          A.pop();
        } else if (!/^<br/i.test(v)) {
          A.push(v.match(/^<(\w+)/)[1]);
        }
      } else if (v.trim()) {
        N++;
      }
    }
    return [Q + A.slice().reverse().map(Z => "</" + Z + ">").join(""), A.map(Z => "<" + Z + ">").join("") + M.slice(F).join("")];
  }
  function I(W, z) {
    if (W.t === "p" || W.t === "quote") {
      M = W.html;
      const N = (D(M).match(/\S+/g) || []).length;
      let Q = 0;
      let F = N;
      while (Q < F) {
        const Z = Math.ceil((Q + F) / 2);
        const L = E({
          t: W.t,
          html: q(W.html, Z)[0]
        });
        z.appendChild(L);
        const C = V(z);
        z.removeChild(L);
        if (C) {
          F = Z - 1;
        } else {
          Q = Z;
        }
      }
      if (Q < Math.min(12, N * 0.25)) {
        return null;
      }
      const [A, v] = q(W.html, Q);
      return [{
        t: W.t,
        html: A
      }, {
        t: W.t,
        html: v,
        cont: true
      }];
    }
    var M;
    if (W.t === "ul" || W.t === "ol") {
      let K = 0;
      while (K < W.items.length) {
        const J = E({
          t: W.t,
          items: W.items.slice(0, K + 1),
          start: W.start
        });
        z.appendChild(J);
        const P = V(z);
        z.removeChild(J);
        if (P) {
          break;
        }
        K++;
      }
      if (K) {
        return [{
          t: W.t,
          items: W.items.slice(0, K),
          start: W.start
        }, {
          t: W.t,
          items: W.items.slice(K),
          start: (W.start || 1) + K
        }];
      } else {
        return null;
      }
    }
    if (W.t === "table") {
      const w = W.head !== false ? [W.rows[0]] : [];
      const U = W.head !== false ? W.rows.slice(1) : W.rows;
      let G = 0;
      while (G < U.length) {
        const T = E({
          t: "table",
          rows: w.concat(U.slice(0, G + 1)),
          head: W.head
        });
        z.appendChild(T);
        const n0 = V(z);
        z.removeChild(T);
        if (n0) {
          break;
        }
        G++;
      }
      if (G) {
        return [{
          t: "table",
          rows: w.concat(U.slice(0, G)),
          head: W.head
        }, {
          t: "table",
          rows: w.concat(U.slice(G)),
          head: W.head
        }];
      } else {
        return null;
      }
    }
    return null;
  }
  R.iMathDoc = {
    parseFile: async function (W, z) {
      const M = W.name || "document";
      const N = (M.split(".").pop() || "").toLowerCase();
      const Q = M.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").replace(/\s+/g, " ").trim();
      if (N === "docx") {
        if (z) {
          z("Reading your Word document");
        }
        await x(y.mammoth);
        return {
          title: Q,
          blocks: b((await R.mammoth.convertToHtml({
            arrayBuffer: await W.arrayBuffer()
          }, {
            styleMap: ["p[style-name='Title'] => h1.doctitle:fresh", "p[style-name='Subtitle'] => p.docsub:fresh"],
            convertImage: R.mammoth.images.imgElement(F => F.read("base64").then(A => ({
              src: "data:" + F.contentType + ";base64," + A
            })))
          })).value),
          kind: "Word"
        };
      }
      if (N === "pdf") {
        return {
          title: Q,
          blocks: await j(await W.arrayBuffer(), z),
          kind: "PDF"
        };
      }
      if (N === "doc") {
        throw new Error("Older .doc files cannot be read here. Open it in Word or Google Docs and save it as .docx or PDF first.");
      }
      if (/^(txt|md|markdown|text)$/.test(N) || W.type.startsWith("text/")) {
        return {
          title: Q,
          blocks: Y(await W.text()),
          kind: "Text"
        };
      }
      if (/^(html?|htm)$/.test(N)) {
        return {
          title: Q,
          blocks: b(await W.text()),
          kind: "Web page"
        };
      }
      throw new Error("That file type is not supported. Use Word (.docx), PDF, or a text file.");
    },
    fromText: Y,
    fromHtml: b,
    paginate: function (W, z) {
      let M = z();
      let N = 1;
      const Q = W.slice();
      while (Q.length) {
        const F = Q.shift();
        const A = E(F);
        M.body.appendChild(A);
        if (F.t === "img") {
          const C = A.querySelector("img");
          if (C) {
            C.complete;
          }
        }
        if (!V(M.body)) {
          continue;
        }
        M.body.removeChild(A);
        const v = M.body.children.length ? I(F, M.body) : null;
        if (v) {
          M.body.appendChild(E(v[0]));
          Q.unshift(v[1]);
        } else if (M.body.children.length) {
          Q.unshift(F);
        } else if (F.t === "img") {
          A.classList.add("fitpage");
          M.body.appendChild(A);
        } else {
          const K = I(F, M.body);
          if (K) {
            M.body.appendChild(E(K[0]));
            Q.unshift(K[1]);
          } else {
            M.body.appendChild(A);
          }
        }
        M.body.lastElementChild;
        const Z = [];
        let L = M.body.lastElementChild;
        while (L && /^db-h[1-3]$/.test(L.className) && M.body.children.length > 1) {
          Z.unshift(L);
          M.body.removeChild(L);
          L = M.body.lastElementChild;
        }
        M = z();
        N++;
        Z.forEach(J => M.body.appendChild(J));
      }
      return N;
    },
    blockEl: E,
    textOf: D,
    esc: k,
    load: x,
    CDN: y
  };
})(typeof window != "undefined" ? window : globalThis);
