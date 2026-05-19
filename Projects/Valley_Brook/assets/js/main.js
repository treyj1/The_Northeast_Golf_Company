/* Valley Brook Master Plan — shared site behaviour */
(function () {
  "use strict";

  /* ---- Mobile nav ---- */
  document.addEventListener("click", function (e) {
    if (e.target.closest(".nav-toggle")) {
      var nav = document.querySelector("nav.main");
      if (nav) nav.classList.toggle("open");
    }
  });

  /* ---- Reveal on scroll ---- */
  function initReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("in"); });
      return;
    }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- Lightbox ---- */
  function initLightbox() {
    var box = document.createElement("div");
    box.className = "lightbox";
    box.innerHTML = '<button class="x" aria-label="Close">&times;</button><img alt="">';
    document.body.appendChild(box);
    var img = box.querySelector("img");
    function close() { box.classList.remove("open"); }
    box.addEventListener("click", function (e) {
      if (e.target === box || e.target.classList.contains("x")) close();
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    document.addEventListener("click", function (e) {
      var z = e.target.closest("[data-zoom]");
      if (z) { img.src = z.getAttribute("data-zoom"); box.classList.add("open"); }
    });
  }

  /* ---- Flat (non-zoom) image view for holes / FEMA ---- */
  function makeFlat(fig) {
    var img = fig.querySelector("img");
    var mkl = fig.querySelector(".mklayer");
    var spot = fig.querySelector(".spot");
    var ovl = fig.querySelector(".ovl");
    var markerHover = null;
    var VB_W = 1000, VB_H = 934; // overall.webp aspect 2600:2428 -> 1000:934
    mkl.addEventListener("mouseover", function (e) {
      var m = e.target.closest(".mk");
      if (m && markerHover) markerHover(m.getAttribute("data-k"), true);
    });
    mkl.addEventListener("mouseout", function (e) {
      var m = e.target.closest(".mk");
      if (m && markerHover) markerHover(m.getAttribute("data-k"), false);
    });
    return {
      setImage: function (src) {
        img.style.opacity = 0;
        var pre = new Image();
        pre.onload = function () { img.src = src; img.style.opacity = 1; };
        pre.src = src;
      },
      setOverall: function (data, onPick) {
        if (!ovl || !data) return;
        fig.classList.remove("ovl-on");
        var svg = '<svg class="ovsvg" viewBox="0 0 ' + VB_W + ' ' + VB_H +
          '" preserveAspectRatio="none" aria-hidden="true"><defs>' +
          '<filter id="ovblur" filterUnits="userSpaceOnUse" x="-120" y="-120" ' +
          'width="' + (VB_W + 240) + '" height="' + (VB_H + 240) + '">' +
          '<feGaussianBlur stdDeviation="34"/></filter>' +
          '<mask id="ovmask" maskUnits="userSpaceOnUse" x="0" y="0" width="' +
          VB_W + '" height="' + VB_H + '">' +
          '<rect width="' + VB_W + '" height="' + VB_H + '" fill="#fff"/>' +
          '<polyline class="ovcut" points="" fill="none" stroke="#000" ' +
          'stroke-width="92" stroke-linecap="round" stroke-linejoin="round" ' +
          'filter="url(#ovblur)"/></mask></defs>' +
          '<rect class="ovdim" width="' + VB_W + '" height="' + VB_H +
          '" fill="rgb(255,252,244)" fill-opacity="0.6" mask="url(#ovmask)"/></svg>';
        var btns = "";
        Object.keys(data).forEach(function (n) {
          var L = data[n].label;
          btns += '<button class="ovnum" data-h="' + n + '" style="left:' +
            (L[0] * 100) + "%;top:" + (L[1] * 100) + '%">' + n + "</button>";
        });
        ovl.innerHTML = svg + btns;
        var cut = ovl.querySelector(".ovcut");
        ovl.onmouseover = function (e) {
          var b = e.target.closest(".ovnum");
          if (!b) return;
          var pts = data[b.getAttribute("data-h")].line.map(function (p) {
            return (p[0] * VB_W).toFixed(1) + "," + (p[1] * VB_H).toFixed(1);
          }).join(" ");
          cut.setAttribute("points", pts);
          fig.classList.add("ovl-on");
        };
        ovl.onmouseout = function (e) {
          if (e.target.closest(".ovnum")) fig.classList.remove("ovl-on");
        };
        ovl.onclick = function (e) {
          var b = e.target.closest(".ovnum");
          if (b && onPick) onPick(+b.getAttribute("data-h"));
        };
      },
      setMarkers: function (list) {
        mkl.innerHTML = "";
        if (ovl) { ovl.innerHTML = ""; ovl.onmouseover = ovl.onmouseout = ovl.onclick = null; }
        fig.classList.remove("spot-on");
        fig.classList.remove("ovl-on");
        list.forEach(function (m) {
          var d = document.createElement("div");
          d.className = "mk";
          d.setAttribute("data-k", m.k);
          d.style.left = (m.x * 100) + "%";
          d.style.top = (m.y * 100) + "%";
          mkl.appendChild(d);
        });
      },
      highlight: function (key, on) {
        var marks = mkl.querySelectorAll('.mk[data-k="' + key + '"]');
        marks.forEach(function (d) { d.classList.toggle("on", on); });
        if (!spot) return;
        if (on && marks.length) {
          // One clear circle per marker (a key can have several, e.g. Hole 13's
          // two D labels). mask-composite:intersect keeps the dim only outside
          // *every* circle, so all markers get a spotlight.
          var grads = [].map.call(marks, function (m) {
            return "radial-gradient(circle 150px at " + m.style.left + " " + m.style.top +
              ", rgba(0,0,0,0) 0, rgba(0,0,0,0) 78px, #000 150px)";
          }).join(",");
          spot.style.webkitMaskImage = grads;
          spot.style.maskImage = grads;
          spot.style.webkitMaskComposite = "source-in";
          spot.style.maskComposite = "intersect";
          fig.classList.add("spot-on");
        } else if (!on) {
          fig.classList.remove("spot-on");
        }
      },
      onMarkerHover: function (fn) { markerHover = fn; }
    };
  }

  /* ---- Course explorer ---- */
  function initExplorer() {
    var root = document.getElementById("explorer");
    if (!root || !window.HOLES) return;

    var holes = window.HOLES, CAT = window.CATEGORIES;
    var MARK = window.HOLE_MARKERS || {};
    var state = { idx: 0, overall: false, fema: false, filter: null };

    var flat = makeFlat(root.querySelector(".flatview"));
    var rail = root.querySelector(".hole-rail");
    var info = root.querySelector("#hole-info");
    var lead = root.querySelector("#hole-lead");

    flat.onMarkerHover(function (k, on) {
      var li = info.querySelector('li[data-k="' + k + '"]');
      if (li) li.classList.toggle("hl", on);
    });

    var ob = document.createElement("button");
    ob.className = "overall"; ob.textContent = "Overall Plan";
    ob.addEventListener("click", function () {
      state.overall = true; state.filter = null; histPush(); render();
    });
    rail.appendChild(ob);
    holes.forEach(function (h, i) {
      var b = document.createElement("button");
      b.textContent = h.n;
      b.addEventListener("click", function () {
        state.overall = false; state.idx = i; state.fema = !!h.flood; state.filter = null;
        histPush(); render();
      });
      rail.appendChild(b);
    });

    function img(n) { return "assets/img/holes/" + n; }
    function pad(n) { return n < 10 ? "0" + n : "" + n; }
    function dots(cs) {
      return '<span class="ndots">' + cs.map(function (c) {
        return '<span class="dot" style="background:' + CAT[c].color + '" title="' + CAT[c].label + '"></span>';
      }).join("") + '</span>';
    }
    function legend(active) {
      var h = '<div class="filters"><button data-f="" class="' + (!active ? "on" : "") + '">All</button>';
      Object.keys(CAT).forEach(function (c) {
        h += '<button data-f="' + c + '" class="' + (active === c ? "on" : "") + '">' +
          '<span class="dot" style="background:' + CAT[c].color + '"></span>' + CAT[c].label + "</button>";
      });
      return h + "</div>";
    }

    /* ---- browser history: keep Back/Forward inside the explorer ---- */
    function urlFor() {
      if (state.overall) return location.pathname;
      return location.pathname + "?hole=" + (state.idx + 1) +
        (state.fema ? "&fema=1" : "");
    }
    function histState() {
      return { i: state.idx, o: state.overall, f: state.fema };
    }
    function histPush() {
      try { history.pushState(histState(), "", urlFor()); } catch (e) {}
    }
    function histReplace() {
      try { history.replaceState(histState(), "", urlFor()); } catch (e) {}
    }
    function applyHistState(s) {
      if (!s) {
        var q = +new URLSearchParams(location.search).get("hole");
        if (q >= 1 && q <= 18) {
          s = { i: q - 1, o: false,
                f: location.search.indexOf("fema=1") > -1 && !!holes[q - 1].flood };
        } else {
          s = { i: 0, o: true, f: false };
        }
      }
      state.overall = !!s.o;
      state.idx = (typeof s.i === "number" && s.i >= 0 && s.i < holes.length) ? s.i : 0;
      state.fema = !!s.f;
      state.filter = null;
      render();
    }
    window.addEventListener("popstate", function (e) { applyHistState(e.state); });

    function render() {
      Array.prototype.forEach.call(rail.children, function (c) { c.classList.remove("active"); });
      rail.children[state.overall ? 0 : state.idx + 1].classList.add("active");
      root.classList.toggle("ov", state.overall);
      if (lead) lead.innerHTML = "";
      try {
        sessionStorage.setItem("vbExplorer",
          JSON.stringify({ i: state.idx, o: state.overall, f: state.fema }));
      } catch (e) {}

      if (state.overall) {
        flat.setImage(img("overall.webp"));
        flat.setMarkers([]);
        flat.setOverall(window.OVERALL_HOLES, function (n) {
          state.overall = false;
          state.idx = n - 1;
          state.fema = !!holes[state.idx].flood;
          state.filter = null;
          histPush();
          render();
          root.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        function ovHole(h, i) {
          var vis = h.notes.filter(function (n) {
            return !state.filter || n.c.indexOf(state.filter) !== -1;
          });
          var s = '<div class="ov-hole' + (vis.length ? "" : " empty") + '">' +
            '<button class="ov-hd" data-go="' + i + '">' +
            '<span class="h">Hole ' + h.n + '</span>' +
            '<span class="meta">Par ' + h.par + ' &middot; ' + h.yards.back + '/' + h.yards.middle + '/' + h.yards.forward + ' &middot; ' + vis.length + ' of ' + h.notes.length + '</span></button>' +
            '<ol class="notes">';
          h.notes.forEach(function (n) {
            var dim = state.filter && n.c.indexOf(state.filter) === -1;
            s += '<li class="' + (dim ? "dim" : "") + '"><span class="key">' + n.k + '</span>' +
              '<div class="txt">' + dots(n.c) + n.t + '</div></li>';
          });
          return s + '</ol></div>';
        }
        var left = "", right = "";
        holes.forEach(function (h, i) {
          if (i < 9) left += ovHole(h, i); else right += ovHole(h, i);
        });
        info.innerHTML = '<div class="hole-head"><h2>Overall Plan</h2></div>' +
          legend(state.filter) +
          '<div class="ov-list">' +
          '<div class="ov-col"><p class="ov-coltitle">Front Nine</p>' + left + '</div>' +
          '<div class="ov-col"><p class="ov-coltitle">Back Nine</p>' + right + '</div>' +
          '</div>';
        return;
      }

      var h = holes[state.idx];
      var fema = h.flood && state.fema;
      flat.setImage(img(fema ? "hole13_fema.webp" : "hole" + pad(h.n) + ".webp"));

      if (fema) {
        flat.setMarkers([]);
      } else {
        var ms = [];
        var hm = MARK[h.n] || {};
        Object.keys(hm).forEach(function (k) {
          hm[k].forEach(function (p) { ms.push({ k: k, x: p[0], y: p[1] }); });
        });
        flat.setMarkers(ms);
      }

      var html = '<div class="hole-head"><h2>Hole ' + h.n + '</h2><span class="par">Par ' + h.par + '</span></div>' +
        '<div class="yard-set">' +
        '<div><div class="y">' + h.yards.back + '</div><div class="t">Back</div></div>' +
        '<div><div class="y">' + h.yards.middle + '</div><div class="t">Middle</div></div>' +
        '<div><div class="y">' + h.yards.forward + '</div><div class="t">Forward</div></div></div>';

      var ACT = ' style="background:var(--ink);color:var(--paper)"';
      var femaToggle = "";
      if (h.flood) {
        femaToggle = '<div class="fema-toggle">' +
          '<button class="btn" data-fema="1"' + (fema ? ACT : "") + '>FEMA Flood Map</button>' +
          '<button class="btn" data-fema="0"' + (!fema ? ACT : "") + '>Hole Plan &rarr;</button></div>';
      }

      var N = window.HOLE13_NARRATIVE;

      if (fema) {
        if (h.flood && lead) {
          lead.innerHTML = femaToggle + (N ?
            '<p class="eyebrow">Hole ' + h.n + '</p>' +
            '<h2 class="approach-title">FEMA Flood Map</h2>' +
            '<div class="prose approach-body">' +
            '<p>' + N.intro + '</p><p>' + N.fema + '</p>' +
            '<p>' + N.consequences + '</p><p>' + N.alternatives + '</p></div>' : "");
        }
      } else {
        if (h.flood && lead) {
          lead.innerHTML = femaToggle + (N ?
            '<p class="eyebrow">Hole ' + h.n + '</p>' +
            '<h2 class="approach-title">The Proposed Approach</h2>' +
            '<div class="prose approach-body">' +
            '<p>' + N.solution + '</p>' +
            '<p>' + N.result + '</p></div>' : "");
        }
        html += legend(state.filter);
        html += '<p class="hint-line">Hover a recommendation to find its marker on the plan.</p>';
        html += '<ol class="notes">';
        h.notes.forEach(function (n) {
          var dim = state.filter && n.c.indexOf(state.filter) === -1;
          html += '<li class="' + (dim ? "dim" : "") + '" data-k="' + n.k + '">' +
            '<span class="key">' + n.k + '</span>' +
            '<div class="txt">' + dots(n.c) + n.t + '</div></li>';
        });
        html += '</ol>';

        if (h.extra) html += '<div class="hole-extra"><strong>Other notes&nbsp;&mdash;&nbsp;</strong>' + h.extra + '</div>';
      }

      html += '<div class="hole-prevnext">' +
        '<button class="btn" data-nav="-1">&larr; Prev</button>' +
        '<button class="btn" data-nav="1">Next &rarr;</button></div>';

      info.innerHTML = html;
    }

    info.addEventListener("click", function (e) {
      var f = e.target.closest("[data-f]");
      if (f) { state.filter = f.getAttribute("data-f") || null; render(); return; }
      var go = e.target.closest("[data-go]");
      if (go) {
        state.overall = false; state.idx = +go.getAttribute("data-go");
        state.fema = !!holes[state.idx].flood; state.filter = null;
        histPush(); render();
        root.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      var nv = e.target.closest("[data-nav]");
      if (nv) {
        state.idx = (state.idx + parseInt(nv.getAttribute("data-nav"), 10) + holes.length) % holes.length;
        state.fema = !!holes[state.idx].flood; state.filter = null;
        histPush(); render();
        root.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      var fm = e.target.closest("[data-fema]");
      if (fm) {
        state.fema = fm.getAttribute("data-fema") === "1";
        histReplace(); render();
      }
    });

    if (lead) lead.addEventListener("click", function (e) {
      var fm = e.target.closest("[data-fema]");
      if (fm) {
        state.fema = fm.getAttribute("data-fema") === "1";
        histReplace(); render();
      }
    });

    info.addEventListener("mouseover", function (e) {
      var li = e.target.closest("li[data-k]");
      if (li) { li.classList.add("hl"); flat.highlight(li.getAttribute("data-k"), true); }
    });
    info.addEventListener("mouseout", function (e) {
      var li = e.target.closest("li[data-k]");
      if (li) { li.classList.remove("hl"); flat.highlight(li.getAttribute("data-k"), false); }
    });

    var q = new URLSearchParams(location.search).get("hole");
    if (q && +q >= 1 && +q <= 18) {
      // Explicit deep link wins.
      state.overall = false;
      state.idx = +q - 1;
      state.fema = !!holes[state.idx].flood;
    } else {
      var nav = (window.performance && performance.getEntriesByType &&
                 performance.getEntriesByType("navigation")[0]) || {};
      var saved = null;
      try { saved = JSON.parse(sessionStorage.getItem("vbExplorer")); } catch (e) {}
      if ((nav.type === "reload" || nav.type === "back_forward") && saved) {
        // Reloading / returning: stay where the user was.
        state.overall = !!saved.o;
        state.idx = (typeof saved.i === "number" && saved.i >= 0 &&
                     saved.i < holes.length) ? saved.i : 0;
        state.fema = !!saved.f;
      } else {
        // Fresh navigation here (nav link, etc.): open to the overall plan.
        state.overall = true;
      }
    }
    histReplace();
    render();
  }

  /* ---- Scorecard ---- */
  function initScorecard() {
    var root = document.getElementById("scorecard");
    if (!root || !window.HOLES) return;
    var holes = window.HOLES, TEES = window.TEES;
    var active = "back";

    function build() {
      var front = holes.slice(0, 9), back = holes.slice(9, 18);
      function cells(list, fn) { return list.map(fn).join(""); }
      function parSum(l) { return l.reduce(function (s, h) { return s + h.par; }, 0); }
      function ySum(l, t) { return l.reduce(function (s, h) { return s + h.yards[t]; }, 0); }

      var h = '<div class="tee-pick">';
      TEES.forEach(function (t) {
        h += '<button data-tee="' + t.id + '" class="' + (t.id === active ? "on" : "") + '">' +
          t.label + " &middot; " + t.total.toLocaleString() + "</button>";
      });
      h += '</div><div class="sc-wrap"><table class="scorecard"><thead><tr>' +
        '<th class="lab">Hole</th>' +
        cells(front, function (x) { return "<th>" + x.n + "</th>"; }) +
        '<th class="sum">Out</th>' +
        cells(back, function (x) { return "<th>" + x.n + "</th>"; }) +
        '<th class="sum">In</th><th class="sum">Tot</th></tr></thead><tbody>';

      TEES.forEach(function (t) {
        h += '<tr class="tee ' + (t.id === active ? "active" : "") + '"><td class="lab">' + t.label + "</td>" +
          cells(front, function (x) { return "<td>" + x.yards[t.id] + "</td>"; }) +
          '<td class="sum">' + ySum(front, t.id) + "</td>" +
          cells(back, function (x) { return "<td>" + x.yards[t.id] + "</td>"; }) +
          '<td class="sum">' + ySum(back, t.id) + "</td>" +
          '<td class="sum">' + t.total.toLocaleString() + "</td></tr>";
      });

      h += '<tr class="par"><td class="lab">Par</td>' +
        cells(front, function (x) { return "<td>" + x.par + "</td>"; }) +
        '<td class="sum">' + parSum(front) + "</td>" +
        cells(back, function (x) { return "<td>" + x.par + "</td>"; }) +
        '<td class="sum">' + parSum(back) + "</td>" +
        '<td class="sum">' + (parSum(front) + parSum(back)) + "</td></tr>";

      h += "</tbody></table></div>";
      root.innerHTML = h;
    }
    root.addEventListener("click", function (e) {
      var b = e.target.closest("[data-tee]");
      if (b) { active = b.getAttribute("data-tee"); build(); }
    });
    build();
  }

  document.addEventListener("DOMContentLoaded", function () {
    initReveal();
    initLightbox();
    initExplorer();
    initScorecard();
  });
})();
