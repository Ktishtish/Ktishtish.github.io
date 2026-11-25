(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Matrix rain background */
  var cv = document.getElementById('rain');
  var btn = document.getElementById('rain-toggle');
  var on = !reduce, timer = null;
  try { if (localStorage.getItem('rain') === 'off') on = false; } catch (e) {}
  if (cv) {
    var ctx = cv.getContext('2d'), size = 16, cols = 0, drops = [];
    var chars = '01<>/{}[]$#%&*+=';
    var resize = function () {
      cv.width = window.innerWidth; cv.height = window.innerHeight;
      cols = Math.ceil(cv.width / size); drops = [];
      for (var i = 0; i < cols; i++) drops.push(Math.random() * cv.height / size);
    };
    var draw = function () {
      ctx.fillStyle = 'rgba(7,11,18,.12)'; ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = '#39ff88'; ctx.font = size + 'px "JetBrains Mono",monospace';
      for (var i = 0; i < cols; i++) {
        ctx.fillText(chars.charAt(Math.floor(Math.random() * chars.length)), i * size, drops[i] * size);
        if (drops[i] * size > cv.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    var start = function () { resize(); cv.style.display = 'block'; if (!timer) timer = setInterval(draw, 70); };
    var stop = function () { clearInterval(timer); timer = null; cv.style.display = 'none'; };
    var label = function () {
      if (!btn) return;
      btn.textContent = 'Matrix rain: ' + (on ? 'on' : 'off');
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    };
    if (on) start(); else stop();
    label();
    window.addEventListener('resize', function () { if (on) resize(); });
    document.addEventListener('visibilitychange', function () {
      if (!on) return;
      if (document.hidden) { clearInterval(timer); timer = null; } else if (!timer) timer = setInterval(draw, 70);
    });
    if (btn) btn.addEventListener('click', function () {
      on = !on; if (on) start(); else stop(); label();
      try { localStorage.setItem('rain', on ? 'on' : 'off'); } catch (e) {}
    });
  }

  /* Interactive terminal */
  var body = document.getElementById('tbody');
  var form = document.getElementById('tform');
  var input = document.getElementById('tin');
  if (!body || !form || !input) return;

  var hist = [], hi = 0;
  var esc = function (s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var line = function (html) {
    var d = document.createElement('div'); d.className = 'tl'; d.innerHTML = html;
    body.appendChild(d); body.scrollTop = body.scrollHeight;
  };
  var out = function (arr) { arr.forEach(line); };

  var cmds = {
    help: function () { out([
      'Available commands:',
      '  whoami     who I am',
      '  projects   what I am building',
      '  skills     tools and focus areas',
      '  certs      certificates and badges',
      '  contact    how to reach me',
      '  cv         download my CV',
      '  clear      clear the screen',
      'Tip: try  sudo hire-me']); },
    whoami: function () { out([
      'keziah',
      'Information Security Engineer | Digital Forensics | Data Protection',
      'BSc Information Security and Forensics, KCA University (First Class Honours)']); },
    ls: function () { out(['about  projects  skills  certs  contact  cv']); },
    projects: function () { out([
      '[1] Phishing domain and fake loan app monitor   (in progress)',
      '[2] Agentic SOC simulator                        (in progress)',
      '[3] CTI strategy against financial fraud, Kenya  (research)',
      '<a href="#projects">Jump to projects</a>']); },
    skills: function () { out([
      'Junior penetration testing | Digital forensics analysis',
      'Wireshark | Metasploit | Nmap | Windows | Linux',
      'SIEM, EDR and SOAR exposure | Data protection and privacy compliance']); },
    certs: function () { out([
      'Program certificates, course completion certificates and Credly badges.',
      '<a href="certificates.html">Open certifications and badges</a>']); },
    contact: function () { out([
      'email    <a href="mailto:keziahtisher@gmail.com">keziahtisher@gmail.com</a>',
      'linkedin <a href="https://www.linkedin.com/in/keziah-tisher/">/in/keziah-tisher</a>',
      'github   <a href="https://github.com/Ktishtish">@Ktishtish</a>']); },
    cv: function () { out(['<a href="assets/images/KEZIAH_TISHER_CV.pdf" download>Download KEZIAH_TISHER_CV.pdf</a>']); },
    nmap: function () { out(['Starting scan... only systems I am authorised to test. Ethical hacking only.']); },
    clear: function () { body.innerHTML = ''; }
  };

  var run = function (raw) {
    var cmd = raw.trim();
    line('<span class="u">┌──(keziah㉿kali)-[~]</span>');
    line('<span class="u">└─$</span> ' + esc(raw));
    if (!cmd) return;
    var key = cmd.toLowerCase();
    if (key === 'sudo hire-me') {
      out(['[sudo] password for recruiter: ********', 'Access granted. Opening contact details...']);
      setTimeout(function () { window.location.hash = '#contact'; }, 700);
    } else if (cmds[key]) cmds[key]();
    else line('bash: ' + esc(cmd) + ': command not found. Type <b>help</b>.');
  };

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = input.value; input.value = '';
    if (v.trim()) { hist.push(v); hi = hist.length; }
    run(v);
  });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowUp' && hist.length) { e.preventDefault(); hi = Math.max(0, hi - 1); input.value = hist[hi]; }
    if (e.key === 'ArrowDown' && hist.length) { e.preventDefault(); hi = Math.min(hist.length, hi + 1); input.value = hist[hi] || ''; }
  });
  body.addEventListener('click', function () { input.focus(); });

  line('Welcome. This is an interactive shell. Type <b>help</b> to see what I can do.');
  if (reduce) { cmds.whoami(); return; }
  var demo = 'whoami', i = 0;
  var typer = setInterval(function () {
    if (input.value !== demo.slice(0, i) && i > 0) { clearInterval(typer); return; }
    i++; input.value = demo.slice(0, i);
    if (i === demo.length) { clearInterval(typer); setTimeout(function () { if (input.value === demo) { input.value = ''; run(demo); } }, 350); }
  }, 120);
})();
