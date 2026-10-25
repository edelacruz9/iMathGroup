window.__IMATH_LIB = [{
  id: "lib_heloc_compare",
  name: "HELOC vs fixed mortgage comparison",
  desc: "Fixed rate loan vs a first lien, interest only HELOC: interest, points, payoff and full amortization.",
  by: "Elliot De la Cruz",
  approved: "2026-10-02",
  kind: "tool",
  spec: {
    name: "HELOC vs fixed mortgage comparison",
    subtitle: "A fixed rate loan next to a first lien, interest only HELOC, month by month",
    category: "HELOC comparison",
    model: "helocCompare",
    inputs: [{
      id: "loan",
      label: "Loan amount",
      type: "currency",
      default: 400000
    }, {
      id: "start",
      label: "First payment",
      type: "month",
      default: "",
      help: "Month of the first payment on both loans."
    }, {
      id: "fixedTerm",
      label: "Fixed loan term",
      type: "years",
      default: 30
    }, {
      id: "fixedRate",
      label: "Fixed interest rate",
      type: "percent",
      default: 6.5,
      step: 0.125
    }, {
      id: "fixedPts",
      label: "Fixed loan points",
      type: "percent",
      default: 0,
      step: 0.125,
      help: "Percent of the loan paid at closing."
    }, {
      id: "helocRate",
      label: "HELOC starting rate",
      type: "percent",
      default: 7,
      step: 0.125
    }, {
      id: "helocPts",
      label: "HELOC points",
      type: "percent",
      default: 0,
      step: 0.125,
      help: "Percent of the line paid at closing."
    }, {
      id: "ioYears",
      label: "Interest only period",
      type: "years",
      default: 10
    }, {
      id: "repayYears",
      label: "Repayment period",
      type: "years",
      default: 20
    }, {
      id: "strategy",
      label: "HELOC payment plan",
      type: "select",
      default: 1,
      options: [{
        label: "Match fixed payment",
        value: 1,
        desc: "Pay the HELOC the same as the fixed payment, or the minimum if higher"
      }, {
        label: "HELOC minimum",
        value: 0,
        desc: "Interest only first, then the payment that pays it off over the repayment period"
      }],
      help: "Match fixed payment sends the fixed loan payment to the HELOC (or the minimum if higher). HELOC minimum pays interest only, then amortizes."
    }, {
      id: "extra",
      label: "Extra to the HELOC each month",
      type: "currency",
      default: 0
    }, {
      id: "annual",
      label: "Yearly principal payment to the HELOC",
      type: "currency",
      default: 0,
      help: "Paid every 12th month, like a bonus or a tax refund."
    }],
    outputs: [{
      id: "diff10o",
      label: "HELOC interest advantage, first 10 years",
      expr: "diff10",
      format: "currency",
      highlight: true,
      help: "Fixed interest minus HELOC interest. Below zero means the fixed loan costs less."
    }, {
      id: "ptsDiffO",
      label: "Points, HELOC minus fixed",
      expr: "ptsDiff",
      format: "currency",
      highlight: true,
      help: "Below zero means the HELOC costs less at closing."
    }, {
      id: "recoupO",
      label: "Point cost recoup",
      expr: "recoup",
      highlight: true,
      help: "When the lower interest pays back the extra points."
    }, {
      id: "net10o",
      label: "HELOC advantage after points, 10 years",
      expr: "net10",
      format: "currency",
      highlight: true
    }, {
      id: "fRate",
      label: "Fixed rate",
      expr: "fixedRate",
      format: "percent",
      group: "Fixed mortgage"
    }, {
      id: "fPI",
      label: "Principal and interest",
      expr: "fixedPI",
      format: "currency",
      group: "Fixed mortgage"
    }, {
      id: "fPts",
      label: "Points at closing",
      expr: "fixedPtsCost",
      format: "currency",
      group: "Fixed mortgage"
    }, {
      id: "fOff",
      label: "Projected payoff",
      expr: "fixedPayoff",
      format: "monthyear",
      group: "Fixed mortgage"
    }, {
      id: "fTime",
      label: "Time to payoff",
      expr: "fixedMonths",
      format: "duration",
      group: "Fixed mortgage"
    }, {
      id: "fInt",
      label: "Total interest",
      expr: "fixedInt",
      format: "currency",
      group: "Fixed mortgage"
    }, {
      id: "hRate",
      label: "Starting rate",
      expr: "helocRate",
      format: "percent",
      group: "First lien HELOC"
    }, {
      id: "hMin",
      label: "Interest only minimum to start",
      expr: "helocIOMin",
      format: "currency",
      group: "First lien HELOC"
    }, {
      id: "hFirst",
      label: "Modeled first payment",
      expr: "helocFirst",
      format: "currency",
      group: "First lien HELOC"
    }, {
      id: "hPts",
      label: "Points at closing",
      expr: "helocPtsCost",
      format: "currency",
      group: "First lien HELOC"
    }, {
      id: "hOff",
      label: "Projected payoff",
      expr: "helocPayoff",
      format: "monthyear",
      group: "First lien HELOC"
    }, {
      id: "hTime",
      label: "Time to payoff",
      expr: "helocMonths",
      format: "duration",
      group: "First lien HELOC"
    }, {
      id: "hInt",
      label: "Total interest",
      expr: "helocInt",
      format: "currency",
      group: "First lien HELOC"
    }],
    tables: [{
      title: "Cumulative interest milestones",
      series: "milestones",
      columns: [{
        id: "c0",
        label: "Year",
        expr: "label"
      }, {
        label: "Fixed interest",
        expr: "fCum",
        format: "currency0"
      }, {
        label: "HELOC interest",
        expr: "hCum",
        format: "currency0"
      }, {
        label: "HELOC advantage",
        expr: "diff",
        format: "currency0"
      }, {
        label: "After points",
        expr: "net",
        format: "currency0"
      }]
    }, {
      title: "Yearly amortization",
      group: "Amortization schedule",
      tab: "Yearly",
      series: "annual",
      note: "Fixed mortgage columns first, then the HELOC. Paid means total payments that year.",
      columns: [{
        label: "Year",
        expr: "label"
      }, {
        label: "Fixed paid",
        expr: "fPay",
        format: "currency"
      }, {
        label: "Fixed principal",
        expr: "fPrin",
        format: "currency"
      }, {
        label: "Fixed interest",
        expr: "fInt",
        format: "currency"
      }, {
        label: "Fixed balance",
        expr: "fBal",
        format: "currency"
      }, {
        label: "HELOC paid",
        expr: "hPay",
        format: "currency"
      }, {
        label: "HELOC principal",
        expr: "hPrin",
        format: "currency"
      }, {
        label: "HELOC interest",
        expr: "hInt",
        format: "currency"
      }, {
        label: "HELOC balance",
        expr: "hBal",
        format: "currency"
      }]
    }, {
      title: "Monthly amortization",
      group: "Amortization schedule",
      tab: "Monthly",
      series: "monthly",
      columns: [{
        label: "Month",
        expr: "label"
      }, {
        label: "Fixed payment",
        expr: "fPay",
        format: "currency"
      }, {
        label: "Fixed principal",
        expr: "fPrin",
        format: "currency"
      }, {
        label: "Fixed interest",
        expr: "fInt",
        format: "currency"
      }, {
        label: "Fixed balance",
        expr: "fBal",
        format: "currency"
      }, {
        label: "HELOC payment",
        expr: "hPay",
        format: "currency"
      }, {
        label: "HELOC principal",
        expr: "hPrin",
        format: "currency"
      }, {
        label: "HELOC interest",
        expr: "hInt",
        format: "currency"
      }, {
        label: "HELOC balance",
        expr: "hBal",
        format: "currency"
      }]
    }],
    notes: ["This is a constant rate illustration. A HELOC rate is variable and can change, so real payments and interest will differ.", "HELOC interest is shown on the monthly balance. Lenders figure HELOC interest on the daily balance, so their numbers will differ a little.", "Future draws, rate changes, taxes, insurance, mortgage insurance and closing costs other than points are not included.", "Match fixed payment sends the fixed loan payment to the HELOC (or the HELOC minimum if higher) plus any extra payments. HELOC minimum pays interest only during the interest only period, then the payment that pays it off over the repayment period."],
    disclaimer: "Estimates for illustration only. Not a commitment to lend and not a rate guarantee. Rates, terms, programs and HELOC availability are subject to change, credit approval, property eligibility and program limits.",
    datasheet: {
      title: "HELOC vs fixed mortgage",
      eyebrow: "HELOC comparison",
      sections: [{
        type: "summary",
        label: "Your scenario",
        items: [{
          label: "Loan amount",
          input: "loan"
        }, {
          label: "First payment",
          input: "start"
        }, {
          label: "Fixed rate",
          input: "fixedRate"
        }, {
          label: "Fixed term",
          input: "fixedTerm"
        }, {
          label: "HELOC starting rate",
          input: "helocRate"
        }, {
          label: "Interest only period",
          input: "ioYears"
        }, {
          label: "Repayment period",
          input: "repayYears"
        }, {
          label: "HELOC payment plan",
          input: "strategy"
        }]
      }, {
        type: "lead",
        when: "extra + annual > 0",
        text: "Extra payments to the HELOC are included: {extra|currency} each month and {annual|currency} once a year."
      }, {
        type: "tiles",
        items: [{
          label: "HELOC interest advantage, first 10 years",
          expr: "diff10",
          format: "currency"
        }, {
          label: "Points, HELOC minus fixed",
          expr: "ptsDiff",
          format: "currency"
        }, {
          label: "Point cost recoup",
          expr: "recoup"
        }, {
          label: "HELOC advantage after points, 10 years",
          expr: "net10",
          format: "currency"
        }]
      }, {
        type: "cards",
        title: "Side by side",
        groups: [{
          label: "Fixed mortgage",
          items: [{
            label: "Rate",
            input: "fixedRate"
          }, {
            label: "Principal and interest",
            expr: "fixedPI",
            format: "currency"
          }, {
            label: "Points at closing",
            expr: "fixedPtsCost",
            format: "currency"
          }, {
            label: "Projected payoff",
            expr: "fixedPayoff",
            format: "monthyear"
          }, {
            label: "Total interest",
            expr: "fixedInt",
            format: "currency"
          }]
        }, {
          label: "First lien HELOC",
          items: [{
            label: "Starting rate",
            input: "helocRate"
          }, {
            label: "Interest only minimum to start",
            expr: "helocIOMin",
            format: "currency"
          }, {
            label: "Modeled first payment",
            expr: "helocFirst",
            format: "currency"
          }, {
            label: "Points at closing",
            expr: "helocPtsCost",
            format: "currency"
          }, {
            label: "Projected payoff",
            expr: "helocPayoff",
            format: "monthyear"
          }, {
            label: "Total interest",
            expr: "helocInt",
            format: "currency"
          }]
        }]
      }, {
        type: "table",
        table: 0,
        title: "Cumulative interest milestones",
        sub: "HELOC advantage is fixed interest minus HELOC interest"
      }]
    },
    extraSheets: [{
      button: "Download amortization schedule (PDF)",
      file: "Amortization_Schedule",
      datasheet: {
        title: "HELOC vs fixed amortization",
        eyebrow: "Amortization schedule",
        sections: [{
          type: "summary",
          label: "Your scenario",
          items: [{
            label: "Loan amount",
            input: "loan"
          }, {
            label: "First payment",
            input: "start"
          }, {
            label: "Fixed rate",
            input: "fixedRate"
          }, {
            label: "Fixed term",
            input: "fixedTerm"
          }, {
            label: "HELOC starting rate",
            input: "helocRate"
          }, {
            label: "Interest only period",
            input: "ioYears"
          }, {
            label: "Repayment period",
            input: "repayYears"
          }, {
            label: "HELOC payment plan",
            input: "strategy"
          }]
        }, {
          type: "table",
          table: 1,
          title: "Yearly amortization"
        }, {
          type: "page"
        }, {
          type: "table",
          table: 2,
          title: "Monthly amortization"
        }]
      }
    }]
  }
}];
window.__IMATH_ROSTER = window.__IMATH_ROSTER || {
  name: "iMath Group Roster",
  updated: "",
  defaults: {
    title: "REALTOR®"
  },
  people: []
};
