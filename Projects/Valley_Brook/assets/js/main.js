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

  /* ---- Pan / zoom viewer with marker overlay ---- */
  function makeViewer(el) {
    var img = el.querySelector("img");
    var stage = document.createElement("div");
    stage.className = "stage";
    var mkl = document.createElement("div");
    mkl.className = "mklayer";
    el.insertBefore(stage, img);
    stage.appendChild(img);
    stage.appendChild(mkl);

    var natW = 1, natH = 1;
    var baseW = 1, baseH = 1, offX = 0, offY = 0;
    var scale = 1, tx = 0, ty = 0;
    var MINF = 1, MAXF = 7;
    var drag = false, sx = 0, sy = 0, otx = 0, oty = 0;
    var markerHover = null;

    function layout() {
      var vw = el.clientWidth, vh = el.clientHeight;
      var fit = Math.min(vw / natW, vh / natH);
      baseW = natW * fit; baseH = natH * fit;
      offX = (vw - baseW) / 2; offY = (vh - baseH) / 2;
      stage.style.left = offX + "px";
      stage.style.top = offY + "px";
      stage.style.width = baseW + "px";
      stage.style.height = baseH + "px";
      apply();
    }
    function clamp() {
      var vw = el.clientWidth, vh = el.clientHeight;
      var sw = baseW * scale, sh = baseH * scale;
      if (sw <= vw + 0.5) tx = 0;
      else tx = Math.min(-offX, Math.max(vw - sw - offX, tx));
      if (sh <= vh + 0.5) ty = 0;
      else ty = Math.min(-offY, Math.max(vh - sh - offY, ty));
    }
    function apply() {
      clamp();
      stage.style.transform = "translate(" + tx + "px," + ty + "px) scale(" + scale + ")";
      stage.style.setProperty("--inv", 1 / scale);
    }
    function zoomAt(cx, cy, factor) {
      var ns = Math.min(MAXF, Math.max(MINF, scale * factor));
      if (ns === scale) return;
      var r = el.getBoundingClientRect();
      var lx = cx - r.left - offX, ly = cy - r.top - offY;
      var localX = (lx - tx) / scale, localY = (ly - ty) / scale;
      scale = ns;
      tx = lx - localX * scale; ty = ly - localY * scale;
      apply();
    }

    el.addEventListener("wheel", function (e) {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, e.deltaY < 0 ? 1.2 : 1 / 1.2);
    }, { passive: false });
    el.addEventListener("pointerdown", function (e) {
      if (e.target.closest(".mk")) return;
      drag = true; el.classList.add("grabbing");
      sx = e.clientX; sy = e.clientY; otx = tx; oty = ty;
      el.setPointerCapture(e.pointerId);
    });
    el.addEventListener("pointermove", function (e) {
      if (!drag) return;
      tx = otx + (e.clientX - sx); ty = oty + (e.clientY - sy); apply();
    });
    function end() { drag = false; el.classList.remove("grabbing"); }
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);
    el.addEventListener("dblclick", function (e) {
      if (scale > 1.01) { scale = 1; tx = 0; ty = 0; apply(); }
      else zoomAt(e.clientX, e.clientY, 2.6);
    });
    window.addEventListener("resize", layout);

    mkl.addEventListener("mouseover", function (e) {
      var m = e.target.closest(".mk");
      if (m && markerHover) markerHover(m.getAttribute("data-k"), true);
    });
    mkl.addEventListener("mouseout", function (e) {
      var m = e.target.closest(".mk");
      if (m && markerHover) markerHover(m.getAttribute("data-k"), false);
    });

    return {
      zoom: function (f) {
        var r = el.getBoundingClientRect();
        zoomAt(r.left + r.width / 2, r.top + r.height / 2, f);
      },
      reset: function () { scale = 1; tx = 0; ty = 0; apply(); },
      setImage: function (src) {
        scale = 1; tx = 0; ty = 0;
        img.style.opacity = 0;
        var pre = new Image();
        pre.onload = function () {
          natW = pre.naturalWidth; natH = pre.naturalHeight;
          img.src = src; img.style.opacity = 1; layout();
        };
        pre.src = src;
      },
      setMarkers: function (list) {
        mkl.innerHTML = "";
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
        mkl.querySelectorAll('.mk[data-k="' + key + '"]').forEach(function (d) {
          d.classList.toggle("on", on);
        });
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

    var viewer = makeViewer(root.querySelector(".viewer"));
    var rail = root.querySelector(".hole-rail");
    var info = root.querySelector("#hole-info");

    viewer.onMarkerHover(function (k, on) {
      var li = info.querySelector('li[data-k="' + k + '"]');
      if (li) li.classList.toggle("hl", on);
    });

    var ob = document.createElement("button");
    ob.className = "overall"; ob.textContent = "Overall Plan";
    ob.addEventListener("click", function () { state.overall = true; state.filter = null; render(); });
    rail.appendChild(ob);
    holes.forEach(function (h, i) {
      var b = document.createElement("button");
      b.textContent = h.n;
      b.addEventListener("click", function () {
        state.overall = false; state.idx = i; state.fema = !!h.flood; state.filter = null; render();
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

    function render() {
      Array.prototype.forEach.call(rail.children, function (c) { c.classList.remove("active"); });
      rail.children[state.overall ? 0 : state.idx + 1].classList.add("active");
      root.classList.toggle("ov", state.overall);

      if (state.overall) {
        viewer.setImage(img("overall.webp"));
        viewer.setMarkers([]);
        var oh = '<div class="hole-head"><h2>Overall Plan</h2></div>' +
          legend(state.filter) + '<div class="ov-list">';
        holes.forEach(function (h, i) {
          var vis = h.notes.filter(function (n) {
            return !state.filter || n.c.indexOf(state.filter) !== -1;
          });
          oh += '<div class="ov-hole' + (vis.length ? "" : " empty") + '">' +
            '<button class="ov-hd" data-go="' + i + '">' +
            '<span class="h">Hole ' + h.n + '</span>' +
            '<span class="meta">Par ' + h.par + ' &middot; ' + h.yards.back + '/' + h.yards.middle + '/' + h.yards.forward + ' &middot; ' + vis.length + ' of ' + h.notes.length + '</span></button>' +
            '<ol class="notes">';
          h.notes.forEach(function (n) {
            var dim = state.filter && n.c.indexOf(state.filter) === -1;
            oh += '<li class="' + (dim ? "dim" : "") + '"><span class="key">' + n.k + '</span>' +
              '<div class="txt">' + dots(n.c) + n.t + '</div></li>';
          });
          oh += '</ol></div>';
        });
        info.innerHTML = oh + '</div>';
        return;
      }

      var h = holes[state.idx];
      var fema = h.flood && state.fema;
      viewer.setImage(img(fema ? "hole13_fema.webp" : "hole" + pad(h.n) + ".webp"));

      if (fema) {
        viewer.setMarkers([]);
      } else {
        var ms = [];
        var hm = MARK[h.n] || {};
        Object.keys(hm).forEach(function (k) {
          hm[k].forEach(function (p) { ms.push({ k: k, x: p[0], y: p[1] }); });
        });
        viewer.setMarkers(ms);
      }

      var html = '<div class="hole-head"><h2>Hole ' + h.n + '</h2><span class="par">Par ' + h.par + '</span></div>' +
        '<div class="yard-set">' +
        '<div><div class="y">' + h.yards.back + '</div><div class="t">Back</div></div>' +
        '<div><div class="y">' + h.yards.middle + '</div><div class="t">Middle</div></div>' +
        '<div><div class="y">' + h.yards.forward + '</div><div class="t">Forward</div></div></div>';

      var ACT = ' style="background:var(--ink);color:var(--paper)"';
      if (h.flood) {
        html += '<div class="fema-toggle">' +
          '<button class="btn" data-fema="1"' + (fema ? ACT : "") + '>FEMA Flood Map</button>' +
          '<button class="btn" data-fema="0"' + (!fema ? ACT : "") + '>Hole Plan &rarr;</button></div>';
      }

      var N = window.HOLE13_NARRATIVE;

      if (fema) {
        html += '<div class="prose flood-text" style="margin-top:1.4rem">' +
            '<p>' + N.intro + '</p><p>' + N.fema + '</p></div>' +
          '<div class="elev-row" aria-label="Base flood elevations along the corridor">' +
            N.elevations.map(function (e) { return '<span>BFE ' + e + '</span>'; }).join("") +
          '</div>' +
          '<div class="prose flood-text" style="margin-top:1.4rem">' +
            '<p>' + N.consequences + '</p><p>' + N.alternatives + '</p></div>';
      } else {
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

        if (h.flood && N) {
          html += '<div class="flood-note"><h3>The Proposed Approach</h3>' +
            '<p>' + N.solution + '</p>' +
            '<p style="margin-bottom:0">' + N.result + '</p></div>';
        }
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
        state.fema = !!holes[state.idx].flood; state.filter = null; render();
        root.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      var nv = e.target.closest("[data-nav]");
      if (nv) {
        state.idx = (state.idx + parseInt(nv.getAttribute("data-nav"), 10) + holes.length) % holes.length;
        state.fema = !!holes[state.idx].flood; state.filter = null; render();
        root.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      var fm = e.target.closest("[data-fema]");
      if (fm) { state.fema = fm.getAttribute("data-fema") === "1"; render(); }
    });

    info.addEventListener("mouseover", function (e) {
      var li = e.target.closest("li[data-k]");
      if (li) { li.classList.add("hl"); viewer.highlight(li.getAttribute("data-k"), true); }
    });
    info.addEventListener("mouseout", function (e) {
      var li = e.target.closest("li[data-k]");
      if (li) { li.classList.remove("hl"); viewer.highlight(li.getAttribute("data-k"), false); }
    });

    var zin = root.querySelector("[data-zin]"),
        zout = root.querySelector("[data-zout]"),
        zre = root.querySelector("[data-zreset]");
    if (zin) zin.addEventListener("click", function () { viewer.zoom(1.4); });
    if (zout) zout.addEventListener("click", function () { viewer.zoom(1 / 1.4); });
    if (zre) zre.addEventListener("click", function () { viewer.reset(); });

    var q = new URLSearchParams(location.search).get("hole");
    if (q && +q >= 1 && +q <= 18) state.idx = +q - 1;
    state.fema = !!holes[state.idx].flood;
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
