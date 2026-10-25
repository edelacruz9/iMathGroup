/*! (c) 2026 Elliot De la Cruz and iMath Group. All rights reserved. Proprietary and confidential. Licensed for use only; copying, modification, reverse engineering, redistribution or use as a template is prohibited without written permission. */
(function (h) {
  const Y = ["Active", "Active Under Contract", "Coming Soon", "Pending", "Closed", "Expired", "Withdrawn", "Cancelled"];
  const M = ["Active", "Active Under Contract", "Coming Soon", "Pending"];
  const T = D => JSON.stringify(D);
  const X = D => String(D == null ? "" : D).toLowerCase().replace(/[^a-z0-9]/g, "");
  const l = D => String(D).trim().replace(/^'([\s\S]*)'$/, "$1").replace(/''/g, "'");
  function I(D) {
    const j = D.match(/^(\S+)\s+(Eq|Ne|Gt|Ge|Lt|Le|Bt)\s+([\s\S]+)$/);
    if (!j) {
      return () => true;
    }
    const [, A, K, b] = j;
    if (A === "Location") {
      const v = b.match(/radius\(\s*'([-\d.]+)\s+([-\d.]+)'\s*,\s*([\d.]+)\s*\)/);
      if (!v) {
        return () => true;
      }
      const k = +v[1];
      const q = +v[2];
      const Q = +v[3];
      return Z => Z.Latitude != null && Z.Longitude != null && ((H, F, E, V) => {
        const w = C => C * Math.PI / 180;
        const y = Math.sin(w(E - H) / 2) ** 2 + Math.cos(w(H)) * Math.cos(w(E)) * Math.sin(w(V - F) / 2) ** 2;
        return Math.asin(Math.sqrt(y)) * 7917.6;
      })(k, q, +Z.Latitude, +Z.Longitude) <= Q + 1e-9;
    }
    const B = Z => A === "StreetAddress" ? String(Z.UnparsedAddress || "").split(",")[0] : Z[A];
    let N = b.match(/^(contains|startswith|endswith)\('([\s\S]*)'\)$/i);
    if (N) {
      const Z = X(l("'" + N[2] + "'"));
      const H = N[1].toLowerCase();
      return F => {
        const E = X(B(F));
        return !!E && (H === "contains" ? E.includes(Z) : H === "startswith" ? E.startsWith(Z) : E.endsWith(Z));
      };
    }
    let W = b.match(/^(days|months|years)\((-?\d+)\)$/i);
    const J = W ? ((F, E) => {
      const V = new Date();
      if (E === "months") {
        V.setMonth(V.getMonth() + F);
      } else if (E === "years") {
        V.setFullYear(V.getFullYear() + F);
      } else {
        V.setDate(V.getDate() + F);
      }
      return V.toISOString().slice(0, 10);
    })(+W[2], W[1].toLowerCase()) : null;
    if (K === "Bt") {
      const [F, E] = b.split(",").map(V => l(V));
      return V => {
        const w = B(V);
        if (w == null || w === "") {
          return false;
        }
        const y = +w;
        if (isNaN(+F)) {
          return String(w) >= F && String(w) <= E;
        } else {
          return y >= +F && y <= +E;
        }
      };
    }
    const O = J ?? l(b);
    return V => {
      const w = (y => {
        const C = B(y);
        if (C == null || C === "") {
          return null;
        }
        if (J != null) {
          if (String(C).slice(0, 10) < O) {
            return -1;
          } else if (String(C).slice(0, 10) > O) {
            return 1;
          } else {
            return 0;
          }
        }
        if (!isNaN(+O) && !isNaN(+C) && String(O).trim() !== "") {
          if (+C < +O) {
            return -1;
          } else if (+C > +O) {
            return 1;
          } else {
            return 0;
          }
        }
        if (A === "StreetAddress") {
          const g = X(C);
          const U = X(O);
          if (g === U || g.startsWith(U) || U.startsWith(g)) {
            return 0;
          } else {
            return 1;
          }
        }
        if (X(C) === X(O)) {
          return 0;
        } else {
          return 1;
        }
      })(V);
      if (w == null) {
        return K === "Ne";
      } else if (K === "Eq") {
        return w === 0;
      } else if (K === "Ne") {
        return w !== 0;
      } else if (K === "Gt") {
        return w > 0;
      } else if (K === "Ge") {
        return w >= 0;
      } else if (K === "Lt") {
        return w < 0;
      } else {
        return w <= 0;
      }
    };
  }
  h.iMathCMAChat = {
    prompt: function (D) {
      const j = String(D.address || "").trim();
      const A = /^#?\d{5,9}$/.test(j) ? j.replace("#", "") : "";
      const K = String(D.zip || "").trim();
      return "I am a real estate agent using the iMath Marketing Studio. Please pull MLS data for a CMA with my RealMLS connector and give it back as one data block I can paste into the studio. Do not analyze or value the home; just collect the data exactly as described. Do not invent or estimate any value: copy fields exactly as RealMLS returns them.\n\nProperty: " + j + (K ? ", ZIP " + K : "") + "\n\nUse these exact tool arguments. Skip the metadata lookup steps; the codes below are already correct for realMLS.\n\n1. SUBJECT. Call " + (A ? "ListingsListingSearch with _filter \"ListingId Eq '" + A + "'\"" : "ListingsListingSearch with _filter \"StreetAddress Eq '<number and street of the address>'\" and, if that finds nothing, \"StreetNumber Eq '<number>' And StreetName Eq contains('<main street word>')" + (K ? " And PostalCode Eq '" + K + "'" : "") + "\"") + ", property_type_codes " + T(["A", "B", "C", "D", "E", "F"]) + ", status_values " + T(Y) + ", _limit 5, _orderby \"-ListingContractDate\", _select \"ListingId,ListingKey,UnparsedAddress,StreetNumber,StreetName,MlsStatus,PropertyType,PropertySubType,ListPrice,OriginalListPrice,ClosePrice,CloseDate,ListingContractDate,BedsTotal,BathsTotal,BathsFull,BathsHalf,LivingArea,YearBuilt,LotSizeAcres,Latitude,Longitude,PostalCode,City,SubdivisionName,DaysOnMarket,CumulativeDaysOnMarket,PublicRemarks,GarageSpaces,PoolFeatures,Sewer,WaterSource,Roof,ConcessionsAmount,BuyerFinancing,PhotosCount,StatusChangeTimestamp,TaxAmount,TaxYear,CountyOrParish,GarageYN,ParkingFeatures,Heating,Cooling,ConstructionMaterials,Stories,WaterFrontYN,WaterfrontFeatures,AssociationFee,AssociationFeeFrequency,ElementarySchool,MiddleOrJuniorSchool,HighSchool,ParcelNumber,Flooring,Appliances,InteriorFeatures\".\n   If several records match, keep the newest one for this exact address. If nothing matches, set \"subject\" to [] and still do steps 2 to 4 around the address using ZIP or city searches you can make.\n   From the subject, note LAT, LON, TYPE (PropertyType code, for example A), SUB (PropertySubType) and SQFT (LivingArea).\n\n2. CLOSED SALES. Call ListingsListingSearch with _filter \"Location Eq radius('LAT LON',2) And CloseDate Ge months(-12)\" plus \" And PropertySubType Eq 'SUB'\" when SUB is known and \" And LivingArea Bt LOW,HIGH\" when SQFT is known (LOW is SQFT times 0.7 and HIGH is SQFT times 1.3, rounded to whole numbers), property_type_codes [TYPE], status_values [\"Closed\"], _limit 25, _orderby \"-CloseDate\", _select \"ListingId,ListingKey,UnparsedAddress,StreetNumber,StreetName,MlsStatus,PropertyType,PropertySubType,ListPrice,OriginalListPrice,ClosePrice,CloseDate,ListingContractDate,BedsTotal,BathsTotal,BathsFull,BathsHalf,LivingArea,YearBuilt,LotSizeAcres,Latitude,Longitude,PostalCode,City,SubdivisionName,DaysOnMarket,CumulativeDaysOnMarket,PublicRemarks,GarageSpaces,PoolFeatures,ConcessionsAmount,BuyerFinancing,WaterFrontYN\". Get pages 1 and 2 (_page 2) when there are more. If fewer than 10 sales come back, repeat with radius 5 and months(-24), without the PropertySubType and LivingArea parts. Keep at most 50 sales, newest first.\n\n3. ACTIVE AND PENDING. Same radius 2 search as step 2, keeping the PropertySubType and LivingArea parts but without the CloseDate part, status_values " + T(M) + ", _orderby \"-ListingContractDate\", one page of 25.\n\n4. RENTALS. Call ListingsListingSearch with _filter \"Location Eq radius('LAT LON',2.5) And CloseDate Ge months(-12)\", property_type_codes [\"F\"], status_values [\"Closed\"], _limit 25, _orderby \"-CloseDate\", _select \"ListingId,ListingKey,UnparsedAddress,PropertyType,ClosePrice,CloseDate,ListPrice,BedsTotal,BathsTotal,LivingArea,YearBuilt,Latitude,Longitude,DaysOnMarket,PropertySubType\". One page.\n\n5. MARKET STATS for the subject ZIP (skip if unknown), each with LocationField \"PostalCode\", LocationValue \"<ZIP>\", PropertyTypeCode \"<TYPE>\":\n   price: MarketStatisticsPrice, Options \"SoldMedianSoldPrice,ActiveMedianListPrice\"\n   abs: MarketStatisticsAbsorption, Options \"AbsorptionRate\"\n   dom: MarketStatisticsDaysOnMarket, Options \"AverageDom,AverageCdom\"\n   ratio: MarketStatisticsRatio, Options \"SaleToOriginalListPriceRatio,SaleToListPriceRatio\"\n   inv: MarketStatisticsInventory, Options \"ActiveListings,NewListings,PendedListings,SoldListings\"\n   If a stats call times out, try it once more, then leave it out.\n\nOUTPUT. Reply with only this, in one code block, no other text:\nIMATHCMA1\n{\"v\":1,\"address\":" + T(j) + ",\"pulled\":\"<today YYYY-MM-DD>\",\"subject\":[<StandardFields of the subject>],\"closed\":{\"cols\":[<field names>],\"rows\":[[<values in the same order>]]},\"live\":{\"cols\":[...],\"rows\":[...]},\"rent\":{\"cols\":[...],\"rows\":[...]},\"stats\":{\"price\":<the tool's JSON result>,\"abs\":...,\"dom\":...,\"ratio\":...,\"inv\":...}}\nEND IMATHCMA1\nRules for the block: valid JSON; numbers as numbers; leave out empty fields; shorten PublicRemarks to its first 300 characters; for closed, live and rent use the cols and rows form so it stays compact. If a step returned nothing, use an empty list.";
    },
    parse: function (D) {
      let j = String(D || "");
      const A = j.match(/IMATHCMA1\s*([\s\S]*?)\s*END IMATHCMA1/);
      if (A) {
        j = A[1];
      }
      j = j.replace(/^```[a-z]*\s*/i, "").replace(/```\s*$/, "");
      const K = j.indexOf("{");
      const b = j.lastIndexOf("}");
      if (K < 0 || b < K) {
        throw new Error("No data block found. Copy Claude's whole answer, starting with IMATHCMA1.");
      }
      let B;
      try {
        B = JSON.parse(j.slice(K, b + 1));
      } catch (J) {
        throw new Error("The data block is incomplete or cut off. Ask Claude to send the block again, then copy all of it.");
      }
      const N = O => O ? Array.isArray(O) ? O : Array.isArray(O.cols) && Array.isArray(O.rows) ? O.rows.map(v => Object.fromEntries(O.cols.map((k, q) => [k, v[q]]).filter(([, k]) => k != null && k !== ""))) : [] : [];
      const W = {
        address: B.address || "",
        pulled: B.pulled || "",
        subject: N(B.subject).map(O => O.StandardFields || O),
        closed: N(B.closed),
        live: N(B.live),
        rent: N(B.rent).map(O => Object.assign({
          PropertyType: "F"
        }, O)),
        stats: B.stats || {}
      };
      W.subject.forEach(O => {
        O.MlsStatus ||= "Active";
      });
      W.closed.forEach(O => {
        O.MlsStatus ||= "Closed";
      });
      W.rent.forEach(O => {
        O.MlsStatus ||= "Closed";
      });
      if (!W.subject.length && !W.closed.length) {
        throw new Error("Claude's answer has no subject and no sales. Check the address and run it again.");
      }
      return W;
    },
    replay: function (D) {
      const j = new Set();
      const A = [];
      [].concat(D.subject, D.closed, D.live, D.rent).forEach(b => {
        const B = b.ListingKey || b.ListingId || JSON.stringify(b).slice(0, 80);
        if (!j.has(B)) {
          j.add(B);
          A.push(b);
        }
      });
      const K = {
        MarketStatisticsPrice: "price",
        MarketStatisticsAbsorption: "abs",
        MarketStatisticsDaysOnMarket: "dom",
        MarketStatisticsRatio: "ratio",
        MarketStatisticsInventory: "inv"
      };
      return async function (b, B, N) {
        if (b === "ListingsListingSearch") {
          const W = function (F) {
            const E = [];
            let V = false;
            let w = "";
            for (let y = 0; y < F.length; y++) {
              const C = F[y];
              if (C === "'") {
                if (V && F[y + 1] === "'") {
                  w += "''";
                  y++;
                  continue;
                }
                V = !V;
              }
              if (V || F.substr(y, 5) !== " And ") {
                w += C;
              } else {
                E.push(w.trim());
                w = "";
                y += 4;
              }
            }
            if (w.trim()) {
              E.push(w.trim());
            }
            return E;
          }(String(B._filter || "")).map(I);
          const J = B.property_type_codes;
          const O = B.status_values;
          let v = A.filter(F => (!J || !F.PropertyType || J.includes(String(F.PropertyType))) && (!O || !F.MlsStatus || O.includes(String(F.MlsStatus))) && W.every(E => E(F)));
          const k = String(B._orderby || "");
          if (k) {
            const F = k[0] === "-";
            const E = k.replace(/^[-+]/, "");
            v = v.slice().sort((V, w) => {
              const y = V[E] || "";
              const C = w[E] || "";
              return (y < C ? -1 : y > C ? 1 : 0) * (F ? -1 : 1);
            });
          }
          const q = B._limit || 10;
          const Q = B._page || 1;
          const Z = v.length;
          const H = v.slice((Q - 1) * q, Q * q);
          return {
            total_entries: Z,
            total_pages: Math.max(1, Math.ceil(Z / q)),
            results: H.map(V => ({
              Id: V.ListingKey || V.ListingId,
              StandardFields: V
            }))
          };
        }
        if (K[b]) {
          const V = D.stats && D.stats[K[b]];
          if (!V) {
            throw {
              code: "tool_error",
              message: "Not in the chat data"
            };
          }
          if (typeof V == "string") {
            return JSON.parse(V);
          } else {
            return V;
          }
        }
        if (b === "ListingsListPhotos") {
          return {
            photos: []
          };
        }
        if (b === "ListingsShowPhoto") {
          if (N && N.raw) {
            return {
              content: []
            };
          } else {
            return null;
          }
        }
        throw {
          code: "tool_error",
          message: "Not available in chat mode"
        };
      };
    },
    _clause: I
  };
})(typeof window != "undefined" ? window : globalThis);
