/*! (c) 2026 Elliot De la Cruz and iMath Group. All rights reserved. Proprietary and confidential. Licensed for use only; copying, modification, reverse engineering, redistribution or use as a template is prohibited without written permission. */
(function (B) {
  const Y = "#002e5e";
  const J = "#6bc063";
  const W = "#62666a";
  const w = "#8a8f94";
  const v = "Arial,Helvetica,sans-serif";
  const L = V => String(V == null ? "" : V).replace(/[&<>"]/g, Q => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;"
  })[Q]);
  const I = [["instagram", "Instagram", "https://instagram.com/"], ["facebook", "Facebook", "https://facebook.com/"], ["linkedin", "LinkedIn", "https://linkedin.com/in/"], ["tiktok", "TikTok", "https://tiktok.com/@"], ["youtube", "YouTube", "https://youtube.com/@"], ["zillow", "Zillow", "https://www.zillow.com/profile/"]];
  function q(V, Q) {
    if (V = String(V || "").trim()) {
      if (/^https?:\/\//i.test(V)) {
        return V;
      } else if (/^[\w.-]+\.[a-z]{2,}(\/|$)/i.test(V)) {
        return "https://" + V;
      } else if (Q) {
        return Q + V.replace(/^@/, "");
      } else {
        return "https://" + V;
      }
    } else {
      return "";
    }
  }
  const F = V => "tel:+1" + String(V || "").replace(/[^0-9]/g, "").replace(/^1(?=\d{10}$)/, "");
  function j(V) {
    const Q = [];
    if (V.website) {
      Q.push(["website", q(V.website)]);
    }
    if (V.email) {
      Q.push(["email", "mailto:" + V.email]);
    }
    (V.links || []).forEach(T => {
      if (T && T.label && T.url) {
        Q.push([T.label, q(T.url)]);
      }
    });
    I.forEach(([T, K, O]) => {
      if (V.socials && V.socials[T]) {
        Q.push([K, q(V.socials[T], O)]);
      }
    });
    return Q;
  }
  function G(V, Q, T, K) {
    K = K || {};
    const O = j(V).filter(U => !(K.skip || []).includes(U[0]));
    if (!O.length) {
      return "";
    }
    const H = "<span style=\"color:" + (K.sepColor || Q) + "\">&nbsp;&nbsp;|&nbsp;&nbsp;</span>";
    return O.map(([U, P]) => "<a href=\"" + L(P) + "\" style=\"color:" + Q + ";text-decoration:none;font-weight:bold\">" + L(U) + "</a>").join(H);
  }
  const N = "United Real Estate Gallery";
  function C(V) {
    const Q = T => "<span style=\"white-space:nowrap\">" + T + "</span>";
    return [Q(L(N) + " (Rayson Partners, LLC)"), Q("FL Lic. CQ1066513"), Q(V.lang === "es" ? "Igualdad de oportunidades en la vivienda" : "Equal Housing Opportunity")].join("&nbsp;&nbsp;| ");
  }
  const k = V => V.bilingual ? "Se habla español" : "";
  function R(V, Q, T, K, O, H) {
    if (!V) {
      return "";
    }
    const U = "<img src=\"" + L(V) + "\" width=\"" + Q + "\"" + (T ? " height=\"" + T + "\"" : "") + " alt=\"" + L(K) + "\" style=\"display:block;border:0;outline:none;width:" + Q + "px;" + (T ? "height:" + T + "px;" : "height:auto;") + (H || "") + "\">";
    if (O) {
      return "<a href=\"" + L(O) + "\" style=\"text-decoration:none\">" + U + "</a>";
    } else {
      return U;
    }
  }
  const M = (V, Q) => "<table cellpadding=\"0\" cellspacing=\"0\" border=\"0\" role=\"presentation\" style=\"border-collapse:collapse;font-family:" + v + ";" + (Q || "") + "\">" + V + "</table>";
  const S = (V, Q) => "<div style=\"margin:0;font-family:" + v + ";" + Q + "\">" + V + "</div>";
  const A = V => q(V.website) || "https://imathgroup.com";
  const Z = V => V.showAddress && V.officeAddress ? L(String(V.officeAddress).trim()) : "";
  const z = [{
    id: "classic",
    name: "iMath Classic",
    note: "Our current iMath Group signature layout, built for realtors.",
    photoW: 85,
    html(V, Q) {
      const T = V.showPhoto && Q.photo;
      const K = M("<tr>" + (T ? "<td style=\"padding:0 15px 8px 0;vertical-align:top;width:85px\">" + R(Q.photo, 85, 85, V.agentName, A(V)) + "</td>" : "") + "<td style=\"vertical-align:top\">" + S("<b>" + L(V.agentName) + "</b>", "font-size:13px;line-height:17px;color:" + Y) + S("<i>" + L(V.agentTitle) + "</i>" + (k(V) ? "&nbsp;&nbsp;<span style=\"color:" + J + ";font-style:normal;font-weight:bold\">" + k(V) + "</span>" : ""), "font-size:12px;line-height:16px;color:" + W) + ("<div style=\"padding-top:8px\">" + R(Q.logo, 170, 0, "iMath Group | United Real Estate Gallery", A(V)) + "</div></td></tr>"));
      const O = function (U) {
        if (!U.showAddress || !U.officeAddress) {
          return "";
        }
        const P = String(U.officeAddress).split(/\s*,\s*/).filter(Boolean);
        if (P.length < 3) {
          return L(P.join(", "));
        } else {
          return L(P.slice(0, -2).join(" | ") + " | " + P.slice(-2).join(", "));
        }
      }(V);
      const H = (O ? "<tr><td style=\"padding:0 0 6px 0\">" + S(O, "font-size:12px;line-height:16px;color:" + W) + "</td></tr>" : "") + (V.phone ? "<tr><td>" + S("<b>C:</b> <a href=\"" + F(V.phone) + "\" style=\"color:" + W + ";text-decoration:none\">" + L(V.phone) + "</a>", "font-size:12px;line-height:18px;color:" + W) + "</td></tr>" : "") + ("<tr><td style=\"padding:4px 0 9px 0;white-space:nowrap\">" + S(G(V, Y), "font-size:11px;line-height:17px;color:" + Y) + "</td></tr>") + ("<tr><td style=\"padding-top:2px\">" + S(C(V), "font-size:10px;line-height:14px;color:" + w) + "</td></tr>");
      return K + M(H);
    }
  }, {
    id: "split",
    name: "Modern Split",
    note: "Photo, a green divider, and your details side by side.",
    photoW: 96,
    html(V, Q) {
      const T = V.showPhoto && Q.photo;
      const K = Z(V);
      const O = (E, D, X) => D ? "<tr><td style=\"padding:1px 8px 1px 0;font-size:12px;line-height:17px;font-weight:bold;color:" + J + ";font-family:" + v + "\">" + E + "</td><td style=\"padding:1px 0;font-size:12px;line-height:17px;font-family:" + v + "\">" + (X ? "<a href=\"" + L(X) + "\" style=\"color:" + Y + ";text-decoration:none\">" + L(D) + "</a>" : "<span style=\"color:" + W + "\">" + L(D) + "</span>") + "</td></tr>" : "";
      const H = S(L(V.agentName), "font-size:18px;line-height:22px;font-weight:bold;color:" + Y) + S(L(String(V.agentTitle || "").toUpperCase()) + (k(V) ? "&nbsp;&nbsp;<span style=\"color:" + J + "\">•&nbsp;&nbsp;" + k(V).toUpperCase() + "</span>" : ""), "font-size:10px;line-height:15px;letter-spacing:1.5px;color:" + W + ";padding-bottom:8px") + M(O("C", V.phone, F(V.phone)) + O("E", V.email, V.email ? "mailto:" + V.email : "") + O("W", V.website, q(V.website)) + (K ? O("A", String(V.officeAddress).trim()) : "")) + ("<div style=\"padding-top:10px\">" + R(Q.logo, 175, 0, "iMath Group | United Real Estate Gallery", A(V)) + "</div>");
      const U = "<tr>" + (T ? "<td style=\"vertical-align:top;padding:2px 16px 0 0;width:96px\">" + R(Q.photo, 96, 96, V.agentName, A(V)) + "</td>" : "") + "<td style=\"width:3px;background:" + J + "\" bgcolor=\"" + J + "\"></td><td style=\"vertical-align:top;padding:0 0 0 16px\">" + H + "</td></tr>";
      const P = G(V, Y, 0, {
        skip: ["website", "email"]
      });
      return M(U) + (P ? M("<tr><td style=\"padding-top:10px\">" + S(P, "font-size:11px;line-height:16px;color:" + Y) + "</td></tr>") : "") + M("<tr><td style=\"padding-top:8px\">" + S(C(V), "font-size:10px;line-height:14px;color:" + w) + "</td></tr>");
    }
  }, {
    id: "bar",
    name: "Navy Bar",
    note: "Your contact info on a bold navy bar. Easy to spot in any inbox.",
    photoW: 80,
    html(V, Q) {
      const T = V.showPhoto && Q.photo;
      const K = Z(V);
      const O = M("<tr>" + (T ? "<td style=\"vertical-align:middle;padding:0 14px 10px 0;width:80px\">" + R(Q.photo, 80, 80, V.agentName, A(V)) + "</td>" : "") + "<td style=\"vertical-align:middle;padding:0 0 10px 0\">" + S(L(V.agentName), "font-size:19px;line-height:23px;font-weight:bold;color:" + Y) + S(L(V.agentTitle) + (k(V) ? "&nbsp;&nbsp;|&nbsp;&nbsp;<b style=\"color:" + J + "\">" + k(V) + "</b>" : ""), "font-size:12px;line-height:17px;color:" + W) + "</td></tr>");
      const H = [V.phone ? "<a href=\"" + F(V.phone) + "\" style=\"color:#ffffff;text-decoration:none;font-weight:bold\">" + L(V.phone) + "</a>" : "", V.email ? "<a href=\"mailto:" + L(V.email) + "\" style=\"color:#ffffff;text-decoration:none\">" + L(V.email) + "</a>" : "", V.website ? "<a href=\"" + L(q(V.website)) + "\" style=\"color:#ffffff;text-decoration:none\">" + L(V.website) + "</a>" : ""].filter(Boolean).join("<span style=\"color:" + J + "\">&nbsp;&nbsp;|&nbsp;&nbsp;</span>");
      const U = M("<tr><td bgcolor=\"" + Y + "\" style=\"background:" + Y + ";padding:9px 14px;border-left:4px solid " + J + "\">" + S(H, "font-size:12px;line-height:17px;color:#ffffff") + "</td></tr>", "width:100%;max-width:480px");
      const P = G(V, Y, 0, {
        skip: ["website", "email"]
      });
      return O + U + M("<tr><td style=\"vertical-align:middle;padding:10px 16px 0 0\">" + R(Q.logo, 160, 0, "iMath Group | United Real Estate Gallery", A(V)) + "</td><td style=\"vertical-align:middle;padding-top:10px\">" + (K ? S(K, "font-size:11px;line-height:15px;color:" + W) : "") + (P ? S(P, "font-size:11px;line-height:16px;color:" + Y + ";padding-top:3px") : "") + "</td></tr>") + M("<tr><td style=\"padding-top:8px\">" + S(C(V), "font-size:10px;line-height:14px;color:" + w) + "</td></tr>");
    }
  }, {
    id: "minimal",
    name: "Clean Minimal",
    note: "Light and simple. Looks right on every phone and inbox.",
    photoW: 56,
    html(V, Q) {
      const T = V.showPhoto && Q.photo;
      const K = Z(V);
      const O = [V.phone ? "<a href=\"" + F(V.phone) + "\" style=\"color:" + Y + ";text-decoration:none\">" + L(V.phone) + "</a>" : "", V.email ? "<a href=\"mailto:" + L(V.email) + "\" style=\"color:" + Y + ";text-decoration:none\">" + L(V.email) + "</a>" : ""].filter(Boolean).join("<span style=\"color:" + J + "\">&nbsp;&nbsp;•&nbsp;&nbsp;</span>");
      const H = S("<b>" + L(V.agentName) + "</b>", "font-size:14px;line-height:19px;color:" + Y) + S(L(V.agentTitle) + "&nbsp;&nbsp;|&nbsp;&nbsp;" + ("iMath Group | " + L(N)) + (k(V) ? "&nbsp;&nbsp;|&nbsp;&nbsp;" + k(V) : ""), "font-size:12px;line-height:17px;color:" + W) + S(O, "font-size:12px;line-height:18px;color:" + Y + ";padding-top:4px") + (K ? S(K, "font-size:11px;line-height:16px;color:" + W) : "") + S(G(V, W, 0, {
        skip: ["email"]
      }), "font-size:11px;line-height:16px;color:" + W + ";padding-top:4px");
      return M("<tr>" + (T ? "<td style=\"vertical-align:top;padding:2px 12px 0 0;width:56px\">" + R(Q.photo, 56, 56, V.agentName, A(V)) + "</td>" : "") + "<td style=\"vertical-align:top;border-left:2px solid " + J + ";padding-left:12px\">" + H + "</td></tr>") + M("<tr><td style=\"padding-top:10px\">" + R(Q.logo, 130, 0, "iMath Group | United Real Estate Gallery", A(V)) + "</td></tr><tr><td style=\"padding-top:6px\">" + S(C(V), "font-size:10px;line-height:14px;color:" + w) + "</td></tr>");
    }
  }, {
    id: "stack",
    name: "Mobile Stack",
    note: "A big friendly photo on top. Stacks neatly on phones.",
    photoW: 110,
    html(V, Q) {
      const T = V.showPhoto && Q.photo;
      const K = Z(V);
      const O = [];
      if (T) {
        O.push("<tr><td style=\"padding-bottom:10px\">" + R(Q.photo, 110, 110, V.agentName, A(V)) + "</td></tr>");
      }
      O.push("<tr><td>" + S(L(V.agentName), "font-size:19px;line-height:23px;font-weight:bold;color:" + Y) + S(L(V.agentTitle) + (k(V) ? "&nbsp;&nbsp;|&nbsp;&nbsp;<b style=\"color:" + J + "\">" + k(V) + "</b>" : ""), "font-size:12px;line-height:17px;color:" + W) + "</td></tr>");
      O.push("<tr><td style=\"padding:8px 0 8px 0\">" + M("<tr><td width=\"44\" height=\"3\" bgcolor=\"" + J + "\" style=\"width:44px;height:3px;background:" + J + ";font-size:0;line-height:0\">&nbsp;</td><td width=\"14\" style=\"width:14px;font-size:0\">&nbsp;</td><td width=\"22\" height=\"3\" bgcolor=\"" + W + "\" style=\"width:22px;height:3px;background:" + W + ";font-size:0;line-height:0\">&nbsp;</td></tr>") + "</td></tr>");
      if (V.phone) {
        O.push("<tr><td>" + S("<a href=\"" + F(V.phone) + "\" style=\"color:" + Y + ";text-decoration:none;font-weight:bold\">" + L(V.phone) + "</a>", "font-size:14px;line-height:20px") + "</td></tr>");
      }
      if (V.email) {
        O.push("<tr><td>" + S("<a href=\"mailto:" + L(V.email) + "\" style=\"color:" + Y + ";text-decoration:none\">" + L(V.email) + "</a>", "font-size:12px;line-height:18px") + "</td></tr>");
      }
      if (K) {
        O.push("<tr><td>" + S(K, "font-size:11px;line-height:16px;color:" + W) + "</td></tr>");
      }
      O.push("<tr><td style=\"padding-top:10px\">" + R(Q.logo, 180, 0, "iMath Group | United Real Estate Gallery", A(V)) + "</td></tr>");
      const H = G(V, Y, 0, {
        skip: ["email"]
      });
      if (H) {
        O.push("<tr><td style=\"padding-top:8px\">" + S(H, "font-size:11px;line-height:17px;color:" + Y) + "</td></tr>");
      }
      O.push("<tr><td style=\"padding-top:8px\">" + S(C(V), "font-size:10px;line-height:14px;color:" + w) + "</td></tr>");
      return M(O.join(""), "max-width:340px");
    }
  }];
  B.iMathSig = {
    STYLES: z,
    SOCIAL: I,
    html: function (V, Q, T) {
      const K = z.find(H => H.id === V) || z[0];
      const O = "<div style=\"font-family:" + v + ";color:" + Y + "\">" + K.html(Q, T) + "</div>";
      if (window.iMathTheme) {
        return window.iMathTheme.mapText(O);
      } else {
        return O;
      }
    },
    text: function (V) {
      const Q = [];
      Q.push(V.agentName);
      Q.push([V.agentTitle, "iMath Group | " + N].filter(Boolean).join(" | "));
      if (V.bilingual) {
        Q.push("Se habla español");
      }
      if (V.phone) {
        Q.push("C: " + V.phone);
      }
      if (V.email) {
        Q.push(V.email);
      }
      if (V.website) {
        Q.push(q(V.website).replace(/^https?:\/\//, ""));
      }
      if (V.showAddress && V.officeAddress) {
        Q.push(V.officeAddress);
      }
      j(V).filter(T => !["website", "email"].includes(T[0])).forEach(([T, K]) => Q.push(T + ": " + K.replace(/^https?:\/\//, "")));
      Q.push(N + " (Rayson Partners, LLC) | FL Lic. CQ1066513 | " + (V.lang === "es" ? "Igualdad de oportunidades en la vivienda" : "Equal Housing Opportunity"));
      return Q.join("\n");
    },
    links: j,
    url: q
  };
})(typeof window != "undefined" ? window : globalThis);
