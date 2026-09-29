import { PROMO_CSS } from './promo';

// The TV player. Plain old JavaScript on purpose: TV browsers are often years out of date.
export const TV_CSS = `
html,body{margin:0;height:100%;background:#000;color:#fff;overflow:hidden;cursor:none;font-family:'Nunito',Verdana,sans-serif}
#stage{position:absolute;top:0;left:0;right:0;bottom:0}
.layer{position:absolute;top:0;left:0;right:0;bottom:0;opacity:0;transition:opacity .9s ease;background:#000;overflow:hidden}
.layer.on{opacity:1}
.fill{position:absolute;top:0;left:0;width:100%;height:100%}
.blur{background-size:cover;background-position:center;filter:blur(40px) brightness(.55);transform:scale(1.15)}
.fit{object-fit:contain;background-size:contain;background-repeat:no-repeat;background-position:center}
.center{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;width:84vw}
.center h1{font-family:'Grandstander','Nunito',Verdana,sans-serif;font-size:5vw;margin:0 0 2vh;line-height:1.05}
.center p{font-size:2.2vw;opacity:.8;margin:0}
.idle{background:#2E2140}
.idle .brand{position:absolute;bottom:4vh;left:0;right:0;text-align:center;font-size:1.4vw;letter-spacing:.2em;text-transform:uppercase;opacity:.45}
#net{position:absolute;right:1.4vw;bottom:1.4vw;width:1vw;height:1vw;border-radius:50%;background:#C23A64;display:none;opacity:.8}
${PROMO_CSS}`;

export const TV_JS = `
(function () {
  var C = window.DS, stage = document.getElementById('stage'), net = document.getElementById('net');
  var KEY = 'ds_feed_' + C.slug;
  var feed = null, idx = -1, timer = null, current = null, lastSig = '';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  function get(url, done) {
    var x = new XMLHttpRequest();
    x.open('GET', url, true);
    x.timeout = 15000;
    x.onreadystatechange = function () {
      if (x.readyState !== 4) return;
      var d = null; try { d = JSON.parse(x.responseText); } catch (e) {}
      done(x.status, d);
    };
    x.send();
  }

  function load() {
    get(C.feed + '&_=' + new Date().getTime(), function (status, d) {
      if (status === 404 && d && d.error === 'unpaired') { gone(); return; }
      if (status !== 200 || !d) { net.style.display = 'block'; if (!feed) useCache(); return; }
      net.style.display = 'none';
      feed = d;
      try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {}
      if (!current) next();
    });
  }
  function useCache() {
    try { var d = JSON.parse(localStorage.getItem(KEY)); if (d) { feed = d; if (!current) next(); } } catch (e) {}
  }
  function gone() {
    clearTimeout(timer);
    try { localStorage.removeItem(KEY); } catch (e) {}
    show(idleLayer('This TV was disconnected', 'Connecting it again in a moment...'));
    setTimeout(function () { location.replace('/tv'); }, 8000);
  }

  // Local time at the venue, even if the TV's own clock zone is wrong.
  function now() {
    var d = new Date();
    try {
      var p = new Intl.DateTimeFormat('en-US', { timeZone: feed.tz || 'Pacific/Auckland', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false }).formatToParts(d);
      var o = {}; for (var i = 0; i < p.length; i++) o[p[i].type] = p[i].value;
      var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(o.weekday);
      if (day >= 0) return { day: day, min: (Number(o.hour) % 24) * 60 + Number(o.minute) };
    } catch (e) {}
    return { day: d.getDay(), min: d.getHours() * 60 + d.getMinutes() };
  }
  function has(days, d) { if (!days) return true; for (var i = 0; i < days.length; i++) if (days[i] === d) return true; return false; }
  function onNow(s, t) {
    if (s.start_min == null || s.end_min == null) return has(s.days, t.day);
    if (s.start_min < s.end_min) return has(s.days, t.day) && t.min >= s.start_min && t.min < s.end_min;
    // Crosses midnight, e.g. 21:00-02:00: the part after midnight belongs to the day before.
    return (has(s.days, t.day) && t.min >= s.start_min) || (has(s.days, (t.day + 6) % 7) && t.min < s.end_min);
  }
  function playlist() {
    if (!feed || !feed.on) return [];
    var t = now(), out = [];
    for (var i = 0; i < feed.slides.length; i++) if (onNow(feed.slides[i], t)) out.push(feed.slides[i]);
    return out;
  }

  function layer(cls) { var el = document.createElement('div'); el.className = 'layer' + (cls ? ' ' + cls : ''); return el; }
  function idleLayer(title, sub) {
    var el = layer('idle');
    el.innerHTML = '<div class="center"><h1>' + esc(title) + '</h1><p>' + esc(sub || '') + '</p></div><div class="brand">' + esc(C.product) + '</div>';
    return el;
  }
  function show(el) {
    stage.appendChild(el);
    el.offsetWidth; // start the fade from 0
    el.className += ' on';
    var old = current; current = el;
    if (old) setTimeout(function () { if (old.parentNode) { var v = old.getElementsByTagName('video')[0]; if (v) { v.pause(); v.removeAttribute('src'); v.load(); } old.parentNode.removeChild(old); } }, 1000);
  }

  function next() {
    clearTimeout(timer);
    var list = playlist();
    if (!feed) { timer = setTimeout(next, 5000); return; }
    if (!list.length) {
      var sig = 'idle' + feed.on;
      if (lastSig !== sig) show(idleLayer(feed.venue || '', feed.on ? '' : 'This screen is paused'));
      lastSig = sig;
      timer = setTimeout(next, 30000);
      return;
    }
    idx = (idx + 1) % list.length;
    var s = list[idx], secs = (s.seconds || feed.seconds || 10) * 1000;
    var sig2 = s.id + ':' + list.length;
    if (list.length === 1 && lastSig === sig2 && s.kind !== 'video') { timer = setTimeout(next, secs); return; }
    lastSig = sig2;
    var el;
    if (s.kind === 'promo') {
      var p = s.promo || {};
      el = layer('');
      el.innerHTML = '<div class="promo ' + esc(p.style || 'berry') + '"><div class="p-dot d1"></div><div class="p-dot d2"></div>'
        + '<h2 class="p-head">' + esc(p.headline) + '</h2>'
        + (p.price ? '<div class="p-price">' + esc(p.price) + '</div>' : '')
        + (p.detail ? '<div class="p-detail">' + esc(p.detail) + '</div>' : '')
        + '<div class="p-venue">' + esc(feed.venue) + '</div></div>';
      show(el); timer = setTimeout(next, secs);
    } else if (s.kind === 'image') {
      var img = new Image(), done = false;
      img.onload = function () {
        if (done) return; done = true;
        el = layer('');
        el.innerHTML = '<div class="fill blur" style="background-image:url(\\'' + s.media_url + '\\')"></div><div class="fill fit" style="background-image:url(\\'' + s.media_url + '\\')"></div>';
        show(el); timer = setTimeout(next, secs);
      };
      img.onerror = function () { if (!done) { done = true; timer = setTimeout(next, 500); } };
      img.src = s.media_url;
      setTimeout(function () { if (!done) { done = true; next(); } }, 20000);
    } else {
      el = layer('');
      var v = document.createElement('video');
      v.className = 'fill fit'; v.muted = true; v.autoplay = true; v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
      v.preload = 'auto'; v.src = s.media_url;
      var ended = false;
      function fin() { if (!ended) { ended = true; next(); } }
      v.onended = fin; v.onerror = fin;
      el.appendChild(v); show(el);
      var pr = v.play && v.play(); if (pr && pr['catch']) pr['catch'](function () {});
      // Videos play to the end, or for the slide time if one was set. Never more than 5 minutes.
      timer = setTimeout(fin, s.seconds ? secs : 300000);
    }
  }

  useCache();
  load();
  setInterval(load, 45000);
  // Fresh start every night at about 3am, clears any memory build-up on cheap TV sticks.
  setInterval(function () { var d = new Date(); if (d.getHours() === 3 && d.getMinutes() < 2 && performance.now() > 3600000) location.reload(); }, 60000);
})();`;
