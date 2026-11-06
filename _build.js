// Generates all pages: node _build.js
const fs=require('fs');
const A='<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const SOL=[
 {f:'accountingbox',n:'AccountingBox',d:'Poslovni sistem v oblaku za podjetja in računovodske servise'},
 {f:'documentbox',n:'DocumentBox',d:'Samodejni zajem podatkov iz računov in e-arhiv'},
 {f:'lekarnisko-poslovanje',n:'ProLIS',d:'Lekarniški informacijski sistem, vodilni v Sloveniji'},
 {f:'blagovno-poslovanje',n:'ProBP3',d:'Blagovno poslovanje s fakturiranjem in skladišči'},
 {f:'place-in-kadri',n:'ProHRM',d:'Obračun plač in kadrovska evidenca'},
 {f:'progost',n:'ProGOST',d:'Elektronska knjiga gostov za sobodajalce'},
 {f:'ostale-resitve',n:'Ostale rešitve',d:'Poslovna inteligenca, vinske kleti, sejmi, študentski servisi'},
];

const head=(title,desc)=>`<!doctype html>
<html lang="sl" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="robots" content="noindex">
<link rel="icon" href="assets/img/favicon.svg">
<link rel="preload" href="assets/fonts/GeneralSans-500.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/styles.css">
<script>document.documentElement.classList.remove('no-js')</script>
<script>
(function () {
  if (!/[?&]r=/.test(location.search)) return;
  var s = document.createElement('script');
  s.async = true;
  s.referrerPolicy = 'no-referrer';
  s.setAttribute('data-landing', location.href);
  s.src = 'https://phplaravel-758037-6569212.cloudwaysapps.com/v/script.js';
  document.head.appendChild(s);
})();
</script>
</head>
<body>`;

const nav=(cur)=>`
<div class="loader" aria-hidden="true"><i></i></div>
<header class="nav">
  <a class="logo" href="index.html" aria-label="PRONET Kranj, domov"><img src="assets/img/pronet-logo.png" alt="PRONET Choose the future"></a>
  <ul>
    <li><button data-mega aria-expanded="false">Rešitve</button></li>
    <li><a href="o-podjetju.html"${cur==='o'?' class="on"':''}>O podjetju</a></li>
    <li><a href="reference.html"${cur==='r'?' class="on"':''}>Reference</a></li>
    <li><a href="partnerji.html"${cur==='p'?' class="on"':''}>Partnerji</a></li>
    <li><a href="zaposlitev.html"${cur==='z'?' class="on"':''}>Zaposlitev</a></li>
    <li><a href="kontakt.html"${cur==='k'?' class="on"':''}>Kontakt</a></li>
  </ul>
  <div class="act">
    <a class="lg-only" href="https://app.accountingbox.si" target="_blank" rel="noopener">Prijava</a>
    <a class="btn lg-only" href="kontakt.html"><span class="d"></span>Predstavitev</a>
    <button class="burger" aria-label="Meni" aria-expanded="false"><i></i><i></i></button>
  </div>
</header>
<div class="mega" role="menu">
  <div class="intro"><div class="h-s">Rešitve za vsak poslovni proces</div><p>Od nabave materiala do izdelave bilance stanja. Spletno, varno in skladno z zakonodajo.</p></div>
  <div class="grid">
    ${SOL.map(s=>`<a href="${s.f}.html"><i class="dot"></i><div><b>${s.n}</b><br><span>${s.d}</span></div></a>`).join('')}
    <a href="kontakt.html" style="background:var(--red);color:#fff"><i class="dot" style="background:#fff"></i><div><b>Predstavitev</b><br><span style="color:#ffd9d9">Dogovorite se za brezplačen posvet</span></div></a>
  </div>
</div>
<div class="mega-veil"></div>
<nav class="mm">
  ${['index:Domov','o-podjetju:O podjetju','reference:Reference','partnerji:Partnerji','zaposlitev:Zaposlitev','kontakt:Kontakt'].map(x=>{const[a,b]=x.split(':');return `<a class="big" href="${a}.html">${b}</a>`}).join('')}
  <div class="sub">${SOL.map(s=>`<a href="${s.f}.html">${s.n}</a>`).join('')}</div>
  <a class="btn" href="kontakt.html" style="align-self:flex-start"><span class="d"></span>Predstavitev</a>
</nav>
<main>`;

const cta=(t='Vas zanima več?',l='Izpolnite obrazec in z veseljem odgovorimo na vaša vprašanja. Lahko se dogovorimo tudi za obširnejšo predstavitev, ob skodelici kave ali čaja.')=>`
<section class="sec" id="kontakt"><div class="cta-sec">
  <div>
    <h2 class="h-l sl">${t}</h2>
    <p class="lead rv" style="margin-top:28px">${l}</p>
    <div class="cinfo rv">
      <div><small>Email</small><a href="mailto:info@pronet-kr.si">info@pronet-kr.si</a></div>
      <div><small>Telefon</small><a href="tel:+38642800800">04 2 800 800</a></div>
    </div>
  </div>
  <form class="form rv">
    <div class="fi row2"><input required placeholder="Ime in priimek" aria-label="Ime in priimek"><input placeholder="Podjetje" aria-label="Podjetje"></div>
    <input class="fi" type="email" required placeholder="Email" aria-label="Email">
    <textarea class="fi" placeholder="Kaj vas zanima?" aria-label="Sporočilo"></textarea>
    <button class="btn light fi" style="align-self:flex-start"><span class="d"></span>Pošljite sporočilo</button>
    <div class="ok">Hvala. Oglasimo se vam v enem delovnem dnevu.</div>
  </form>
</div></section>`;

const foot=`
</main>
<footer class="foot">
  <div class="top">
    <div class="addr">
      <p>PRONET, Kranj, d.o.o.<br>Ljubljanska cesta 24b<br>4000 Kranj</p>
      <p style="margin-top:16px"><a href="mailto:info@pronet-kr.si">info@pronet-kr.si</a><br><a href="tel:+38642800800">+386 (0)4 2 800 800</a></p>
    </div>
    <div><h5>Rešitve</h5><ul>${SOL.map(s=>`<li><a href="${s.f}.html">${s.n}</a></li>`).join('')}</ul></div>
    <div><h5>Podjetje</h5><ul><li><a href="o-podjetju.html">Predstavitev</a></li><li><a href="reference.html">Reference</a></li><li><a href="partnerji.html">Partnerji</a></li><li><a href="zaposlitev.html">Zaposlitev</a></li><li><a href="kontakt.html">Kontakt</a></li></ul></div>
    <div><h5>Koristne povezave</h5><ul><li><a href="https://app.accountingbox.si" target="_blank" rel="noopener">Prijava v AccountingBox</a></li><li><a href="https://portal.pronet-kr.si" target="_blank" rel="noopener">Prijava v PRONET Portal</a></li><li><a href="#">Navodila AccountingBox</a></li><li><a href="https://www.linkedin.com/company/pronet-kranj" target="_blank" rel="noopener">LinkedIn</a></li><li><a href="https://www.facebook.com/pronetkranj" target="_blank" rel="noopener">Facebook</a></li></ul></div>
  </div>
  <div class="huge"><img src="assets/img/pronet-logo.png" alt="PRONET Choose the future" loading="lazy"></div>
  <div class="bot">
    <span>© ${new Date().getFullYear()} PRONET Kranj</span>
    <span><a href="#">Politika zasebnosti</a> &nbsp;·&nbsp; <a href="#">Splošni pogoji</a></span>
    <span class="eu"><img src="assets/img/3EUlogotipi_white-2020-stran.png" alt="Evropski skladi" loading="lazy"></span>
  </div>
</footer>
<script src="assets/js/gsap.min.js"></script>
<script src="assets/js/ScrollTrigger.min.js"></script>
<script src="assets/js/lenis.min.js"></script>
<script src="assets/main.js"></script>
</body></html>`;

/* ---------- mini UIs ---------- */
const dash=`<div class="ui"><div class="bar"><i></i><i></i><i></i><span>AccountingBox · Pregled poslovanja</span></div>
<div class="dash"><aside><b>Lepa afna d.o.o.</b><span class="on">Pregled</span><span>Izdani računi</span><span>Prejeti računi</span><span>DocumentBox</span><span>Glavna knjiga</span><span>DDV</span><span>Plače</span><span>Potni nalogi</span></aside>
<main><div class="kpis"><div><small>Prihodki, oktober</small><b>84.210 €</b></div><div><small>Odprte terjatve</small><b>12.940 €</b></div><div><small>Zajeti računi</small><b>318</b></div></div>
<div class="chart">${[38,52,44,61,57,70,64,78,72,88,81,96].map((h,i)=>`<i style="height:${h}%"${i===11?' class="r"':''}></i>`).join('')}</div>
<div class="rows"><div><span>Račun 2024-0412 · Merkur d.o.o.</span><span class="ok">Plačano</span></div><div><span>Račun 2024-0413 · Kuli d.o.o.</span><span>1.240,00 €</span></div><div><span>Prejeti račun · A1 Slovenija</span><span class="ok">Knjiženo</span></div></div></main></div></div>`;
const inv=`<div class="inv scan"><div class="scanl"></div>
<div style="display:flex;justify-content:space-between"><b style="font-size:15px">RAČUN</b><span style="width:34px;height:34px;border-radius:50%;background:var(--ink)"></span></div>
<div class="hl" style="margin-top:6px;font-size:12px">Št. 2024-118</div><div class="ln" style="width:60%"></div><div class="ln" style="width:44%"></div>
<div class="hl" style="margin-top:12px;font-size:12px">Datum 04. 11.</div><div class="ln"></div><div class="ln"></div><div class="ln" style="width:80%"></div><div class="ln"></div><div class="ln" style="width:70%"></div>
<div class="hl" style="margin-top:auto;font-size:12px;display:flex;justify-content:space-between"><span>DDV 22 %</span><span>228,80 €</span></div>
<div class="hl" style="font-size:14px;font-weight:600;display:flex;justify-content:space-between"><span>Skupaj</span><span>1.268,80 €</span></div></div>`;
const pills=`<div class="pill-ui"><div class="ui"><span>eRecept · ZZZS</span><span class="tag r">Prevzeto</span></div><div class="ui"><span>Kartica KZZ</span><span class="tag">Preverjeno</span></div><div class="ui"><span>Posodobitev CBZ</span><span class="tag">Danes 06:00</span></div><div class="ui"><span>Zaloga, enota Trnje</span><span class="tag">142 kos</span></div></div>`;
const stock=`<div class="ui stock">${[['Skladišče A',82,''],['Maloprodaja',46,''],['Veleprodaja',68,''],['Konsignacija',22,'r']].map(([a,b,c])=>`<div class="it"><span>${a}</span><span class="b"><i class="${c}" style="width:${b}%"></i></span><b>${b} %</b></div>`).join('')}</div>`;
const slip=`<div class="ui slip"><div class="t"><b>Plačilna lista</b><span class="g">November</span></div><div class="t"><span>Bruto plača</span><span>2.450,00 €</span></div><div class="t"><span>Regres</span><span>1.254,00 €</span></div><div class="t"><span>Prispevki</span><span>−542,15 €</span></div><div class="t"><span>Akontacija dohodnine</span><span>−318,40 €</span></div><div class="t tot"><span>Neto</span><span class="r">2.843,45 €</span></div></div>`;
const guests=`<div class="pill-ui"><div class="ui"><span>Gost · Apartma Bled 2</span><span class="tag">3 nočitve</span></div><div class="ui"><span>Poročilo eTurizem</span><span class="tag r">Oddano</span></div><div class="ui"><span>Račun sobodajalca</span><span class="tag">Davčno potrjen</span></div></div>`;

const clients=['dhl-logo.png','nucleus-logo.png','RadgonskeGorice.png','nijz-logotip.jpg','zd-novo-mesto-logotip.jpg','tosama-logotip.jpg','summit-logotip.jpg','bdo.jpg','lepa-afna-logo.jpg','KNMtravel-logo.jpg','KZ-metlika-logo.png','PS-Logatec.png','city-express.png','oph.png','sta_logo_osnovni.jpg','src-infonet-logo.jpg','kokos-logo.jpg','spirit-slovenija-javna-agencija-logo.png'];

const TESTI=[
 ['Lea Filipovič','Lepa afna, d.o.o.','Z uvedbo AccountingBox in povezavo z ostalimi podpornimi sistemi se nam je poslovanje bistveno poenostavilo. Kar nam je manjkalo, ste uredili. Z lahkoto priporočim naprej.'],
 ['Ksenija Prosen','Direktorica, Nucleus Plus d.o.o.','Račune sedaj samo poskeniramo, podatki iz računa pa se nam avtomatsko evidentirajo v računovodskem programu. Tako prihranimo čas in zmanjšamo možnost napak.'],
 ['Marjeta Krvina','Vodja FRS, SPIRIT Slovenija','Z uporabo njihovih aplikacij je naše poslovanje postalo hitrejše in bolj prilagodljivo. Enostavnost, preglednost in hitra odprava težav so le nekatere izmed prednosti.'],
 ['Tamara Gerdej','DHL Global Forwarding','AccountingBox Potni nalogi je zelo preprost in super za uporabo. Skrbniki sistema so res pripravljeni pomagati. Pohvala celotnemu timu!'],
 ['Borut Cvetkovič','Radgonske gorice d.d.','Za uspešen e-prehod je nujno zaupanje v e-arhive in ustrezna strokovna podpora, ki jo PRONET Kranj naši družbi celostno uspešno nudi že nekaj let.'],
 ['Janja Vončina','OPH Oktal Pharma d.o.o.','AccountingBox je poenotil sprejemanje naročil naših strank, z avtomatizacijo odpravil napake pri vnosu in bistveno zmanjšal čas za obdelavo naročil.'],
];
const testi=(list=TESTI)=>`<div class="testi"><nav>${list.map(t=>`<button><span><b>${t[0]}</b><small>${t[1]}</small></span></button>`).join('')}</nav>
<div class="q">${list.map(t=>`<blockquote><span class="mk">“</span>${t[2]}<span class="mk">”</span></blockquote>`).join('')}</div></div>`;

/* ---------- HOME ---------- */
const home=head('PRONET Kranj · Poslovne rešitve, ki jim zaupa 6000 uporabnikov','AccountingBox, DocumentBox, ProLIS in druge poslovne rešitve podjetja PRONET Kranj.')+nav('h')+`
<section class="hero wrap intro">
  <div class="sphere" aria-hidden="true"></div>
  <div class="chip c1"><span class="ic ok">✓</span><span><b>Račun 2024-118 zajet</b><small>DocumentBox · 2 s</small></span></div>
  <div class="chip c2"><span class="ic rd">€</span><span><b>DDV evidenca pripravljena</b><small>AccountingBox · oktober</small></span></div>
  <div class="chip c3"><span class="ic">Z</span><span><b>e-Zdenka</b><small>Vaš virtualni poslovni asistent</small></span></div>
  <h1 class="h-xl sl">Sveže ideje, spremenjene v učinkovito poslovanje.</h1>
  <div class="row">
    <p class="lead rv">Smo ekipa računalniških strokovnjakov iz Kranja. Že več kot 25 let razvijamo rešitve, s katerimi podjetja, lekarne in računovodski servisi poslujejo hitreje.</p>
    <div class="cta rv"><a class="btn" href="kontakt.html"><span class="d"></span>Dogovorite se za predstavitev</a><a class="btn ghost" href="#resitve">Rešitve</a></div>
  </div>
</section>

<section class="marq">
  <div class="lbl"><span class="h-s">Zaupa nam več kot <span class="r">6000</span> uporabnikov</span><a class="link" href="reference.html">Vse reference ${A}</a></div>
  <div class="track">${[...clients,...clients].map(c=>`<img src="assets/logos/${c}" alt="" loading="lazy">`).join('')}</div>
</section>

<section class="sec wrap" id="resitve">
  <div class="shead"><h2 class="h-l sl">Ena ekipa. <span class="g">Rešitve za vsak poslovni proces.</span></h2><p class="lead rv">Od izdaje računa do bilance stanja, od lekarniškega recepta do knjige gostov. Vse povezano, v oblaku in skladno z zakonodajo.</p></div>
  <div class="bento">
    <a class="card s8 rv" href="accountingbox.html"><span class="go">${A}</span>
      <div><img class="plogo" src="assets/img/accountingbox.png" alt="AccountingBox" style="height:clamp(56px,4.4vw,92px);margin:-14px 0 0 -18px;mix-blend-mode:multiply"><p>Najsodobnejši poslovni sistem v oblaku. Računovodski servisi in podjetja v njem spremljajo poslovanje in enostavno sodelujejo.</p></div>
      <div class="vis">${dash}</div></a>
    <a class="card s4 dark rv" href="documentbox.html"><span class="go" style="color:var(--ink)">${A}</span>
      <div><h3>DocumentBox</h3><p>Inteligentni zajem podatkov iz računov. Poskenirate, sistem knjiži.</p></div>
      <div class="vis">${inv}</div></a>
    <a class="card s4 rv" href="lekarnisko-poslovanje.html"><span class="go">${A}</span>
      <div><h3>ProLIS za lekarne</h3><p>Vodilni lekarniški informacijski sistem v Sloveniji.</p></div><div class="vis">${pills}</div></a>
    <a class="card s4 rv" href="blagovno-poslovanje.html"><span class="go">${A}</span>
      <div><h3>Blagovno poslovanje</h3><p>Popoln pregled in nadzor nad skladišči, maloprodajo in veleprodajo.</p></div><div class="vis">${stock}</div></a>
    <a class="card s4 rv" href="place-in-kadri.html"><span class="go">${A}</span>
      <div><h3>Plače in kadri</h3><p>Obračun plač, regresa in drugih prejemkov ter kadrovska evidenca.</p></div><div class="vis">${slip}</div></a>
    <a class="card s6 red rv" href="progost.html"><span class="go" style="color:var(--ink)">${A}</span>
      <div><h3>ProGOST</h3><p>Elektronska knjiga gostov za sobodajalce, povezana s portalom eTurizem.</p></div><div class="vis">${guests}</div></a>
    <a class="card s6 rv" href="ostale-resitve.html"><span class="go">${A}</span>
      <div><h3>Imate specifičen proces?</h3><p>Prilagojene rešitve smo razvili že za sejme, vinske kleti in študentske servise. Skupaj najdemo ali ustvarimo pravo tudi za vas.</p></div>
      <div class="vis" style="justify-content:flex-start;align-items:flex-end"><div class="chips"><span>Poslovna inteligenca BI3</span><span>Vinska klet ProVK3</span><span>Komerciala sejma</span><span>Študentski servis</span></div></div></a>
  </div>
</section>

<section class="story">
  <div class="pin">
    <div>
      <div class="steps">
        <div class="step"><h2 class="h-m">Račun poskenirate.</h2><p>Podjetnikom dokumentacije ni več treba ročno dostavljati v računovodski servis. Fotografija ali sken je dovolj.</p></div>
        <div class="step"><h2 class="h-m">DocumentBox ga prebere.</h2><p>Sistem prepozna izdajatelja, številko, datum, DDV in znesek. Brez pretipkavanja in brez napak pri vnosu.</p></div>
        <div class="step"><h2 class="h-m">Podatki so že knjiženi.</h2><p>Glavna knjiga, saldakonti in DDV evidence so pripravljeni samodejno, dokument pa je hkrati e-arhiviran.</p></div>
      </div>
      <div class="prog"><i><b></b></i><i><b></b></i><i><b></b></i></div>
    </div>
    <div class="stage">
      <div class="inv"><div class="scanl"></div>
        <div class="hd"><div><b style="font-size:1.3em">RAČUN</b><br><span style="color:var(--mute)">Merkur trgovina d.o.o.</span></div><span style="width:40px;height:40px;border-radius:50%;background:var(--ink)"></span></div>
        <div class="f"><span>Izdajatelj</span><b>Merkur trgovina d.o.o.</b></div>
        <div class="f"><span>Davčna št.</span><b>SI 12345678</b></div>
        <div class="f"><span>Številka</span><b>2024-118</b></div>
        <div class="f"><span>Datum</span><b>04. 11. 2026</b></div>
        <div class="ln" style="margin:6px 8px"></div><div class="ln" style="margin:0 8px;width:70%"></div><div class="ln" style="margin:6px 8px;width:84%"></div>
        <div class="f" style="margin-top:auto"><span>DDV 22 %</span><b>228,80 €</b></div>
        <div class="f"><span>Za plačilo</span><b>1.268,80 €</b></div>
      </div>
      <div class="ui ledger"><div class="bar"><i></i><i></i><i></i><span>Glavna knjiga</span></div>
        <div class="rw"><span>4000 · Material</span><b>1.040,00 €</b></div>
        <div class="rw"><span>1600 · Vstopni DDV</span><b>228,80 €</b></div>
        <div class="rw"><span>2200 · Dobavitelj</span><b>1.268,80 €</b></div>
        <div class="rw" style="color:#1f9d55"><span>E-arhiv</span><b>Shranjeno ✓</b></div>
      </div>
    </div>
  </div>
  <div class="big h-s" style="display:none"></div>
</section>

<section class="sec wrap">
  <div class="shead"><h2 class="h-l sl">60 do 80 % manj časa <span class="g">za prepisovanje podatkov.</span></h2><p class="lead rv">Toliko v povprečju prihranijo računovodje z DocumentBoxom. Ta čas raje namenijo strankam.</p></div>
  <div class="stats">
    <div class="rv"><b data-count="6000">0<em>+</em></b><span>uporabnikov naših rešitev</span></div>
    <div class="rv"><b data-count="500">0<em>+</em></b><span>naročnikov iz vseh panog</span></div>
    <div class="rv"><b data-count="100">0<em>+</em></b><span>partnerjev</span></div>
    <div class="rv"><b data-count="25">0<em>+</em></b><span>let izkušenj</span></div>
  </div>
  <div class="awards rv"><img src="assets/img/platinasta-AAA-boniteta.png" alt="Platinasta bonitetna odličnost AAA" loading="lazy"><img src="assets/img/certifikat-SME-1.png" alt="Excellent SME" loading="lazy"><p>Od leta 2019 izpolnjujemo kriterije za platinasto bonitetno odličnost, najvišjo bonitetno oceno. Od 2016 smo prejemniki nagrad Excellent SME in Boniteta odličnosti.</p></div>
</section>

<section class="wrap">
  <div class="shead"><h2 class="h-l sl">Rezultati, <span class="g">ki jih stranke merijo v urah.</span></h2></div>
  <div class="cases">
    <a class="case rv" href="blagovno-poslovanje.html">
      <img class="lg" src="assets/img/OKTAL-PHARMA.png" alt="OPH Oktal Pharma" loading="lazy">
      <div class="m">1,5 h<small>prihranka vsak dan pri obdelavi naročil</small></div>
      <div><q>Tovrstna izmenjava podatkov nam prihrani veliko časa in energije, minimalizira možnost napak in zgubljenih dokumentov.</q><div class="who">Janja Vončina, OPH Oktal Pharma</div></div>
    </a>
    <a class="case dark rv" href="lekarnisko-poslovanje.html">
      <img class="lg" src="assets/img/lekarna-mackovec.png" alt="Lekarna Mačkovec" loading="lazy" style="mix-blend-mode:normal;background:#fff;border-radius:12px;padding:8px 14px">
      <div class="m">50 %<small>manj ur za inventuro in 4 osebe manj</small></div>
      <div><q>Delo s terminali pomeni avtomatski izvoz zalog, odčitavanje kod in samodejni seštevek vseh vnosov.</q><div class="who">Sabina Repše, mag. farm., Lekarna Mačkovec</div></div>
    </a>
  </div>
</section>

<section class="sec wrap">
  <div class="shead"><h2 class="h-l sl">Naši uporabniki <span class="g">so navdušeni.</span></h2></div>
  ${testi()}
</section>

<section class="trust" style="overflow:hidden">
  <div class="word">Zaupanje<i></i></div>
  <div class="wrap">
    <div class="cols">
      <div class="rv"><h4>Oseben pristop</h4><p>Poslovne procese stranke spoznamo že na začetku sodelovanja. Z ekipo izkušenih strokovnjakov poiščemo pravo rešitev za vsak problem.</p></div>
      <div class="rv"><h4>Širina znanja</h4><p>Poznamo procese velikih podjetij, javne uprave in mikro podjetij. Zato dobro prakso prenašamo iz enega sistema v drugega.</p></div>
      <div class="rv"><h4>Najboljša blagovna znamka</h4><p>Kakovost storitev, korekten odnos in posluh za težave so v 25 letih iz zaupanja naredili najboljšo blagovno znamko podjetja PRONET.</p></div>
    </div>
    <a class="photo rv" href="o-podjetju.html" style="display:block"><img src="assets/img/ekipa-pronet-kranj.jpg" alt="Ekipa PRONET Kranj" loading="lazy"><span class="cap">Spoznajte ekipo</span></a>
  </div>
</section>

<section class="sec wrap">
  <div class="shead"><h2 class="h-l sl">Partnerji, <span class="g">s katerimi si delimo vizijo.</span></h2><p class="lead rv"><a class="link" href="partnerji.html">Vsi partnerji ${A}</a></p></div>
  <div class="plogos">${['Microsoft-logotip.png','oracle-logotip.png','A1-logotip.png','ALSO.png','iStor-logotip.png','bizbox.png','logotip-vsr.png','Intrix-logotip.png'].map(l=>`<a class="rv" href="partnerji.html"><img src="assets/logos/${l}" alt="" loading="lazy"></a>`).join('')}</div>
</section>
${cta()}
`+foot;
fs.writeFileSync('index.html',home);

/* ---------- solution page template ---------- */
const crumb=n=>`<div class="crumb rv"><a href="index.html">Domov</a><span>·</span><a href="index.html#resitve">Rešitve</a><span>·</span><span style="color:var(--ink)">${n}</span></div>`;
const sol=(o)=>head(`${o.title} · PRONET Kranj`,o.desc)+nav('s')+`
<section class="phero wrap intro">${crumb(o.name)}
  <h1 class="h-xl sl">${o.h1}</h1>
  <div class="row"><p class="lead rv">${o.lead}</p><div class="cta rv"><a class="btn" href="#kontakt"><span class="d"></span>${o.cta||'Dogovorite se za predstavitev'}</a></div></div>
</section>
<div class="pvis rv"><div class="sph"></div><div class="bigui" style="display:flex;justify-content:center">${o.vis}</div></div>
<section class="sec wrap">
  <div class="shead"><h2 class="h-m sl">${o.fh}</h2><div class="body rv">${o.body}</div></div>
  <div class="feat">${o.feat.map(f=>`<div class="rv"><h4>${f[0]}</h4>${f[1]?`<p>${f[1]}</p>`:''}</div>`).join('')}</div>
</section>
${o.two?`<section class="wrap"><div class="two">${o.two.map((c,i)=>`<div class="card ${i?'dark':''} rv"><div><h3>${c[0]}</h3><p style="max-width:44ch">${c[1]}</p></div>${c[2]?`<div class="vis" style="justify-content:flex-start;align-items:flex-end">${c[2]}</div>`:''}</div>`).join('')}</div></section>`:''}
${o.case?`<section class="sec wrap"><div class="shead"><h2 class="h-l sl">${o.case.t}</h2></div><div class="case-full rv">
  <div class="res">${o.case.res.map(r=>`<div><b>${r[0]}</b><span>${r[1]}</span></div>`).join('')}${o.case.logo?`<img src="assets/img/${o.case.logo}" alt="" style="height:clamp(36px,3vw,60px);width:auto;mix-blend-mode:multiply;align-self:flex-start;margin-top:12px">`:''}</div>
  <div class="blocks">${o.case.blocks.map(b=>`<div><h4>${b[0]}</h4><p>${b[1]}</p></div>`).join('')}</div></div></section>`:'<div class="sec-t"></div>'}
${o.quotes?`<section class="${o.case?'':'sec '}wrap" style="padding-bottom:clamp(96px,11vw,240px)"><div class="shead"><h2 class="h-l sl">${o.quotesT||'Kaj pravijo uporabniki'}</h2></div><div class="qwall">${o.quotes.map(q=>`<figure class="rv"><blockquote>${q[2]}</blockquote><figcaption><b>${q[0]}</b><span>${q[1]}</span></figcaption></figure>`).join('')}</div></section>`:''}
<section class="wrap" style="padding-bottom:clamp(40px,4vw,80px)"><div class="shead" style="margin-bottom:clamp(28px,3vw,56px)"><h2 class="h-m sl">Druge rešitve</h2></div>
<div class="bento">${SOL.filter(s=>s.f!==o.f).slice(0,3).map(s=>`<a class="card s4 rv" href="${s.f}.html" style="min-height:clamp(220px,16vw,320px)"><span class="go">${A}</span><div></div><div><h3>${s.n}</h3><p>${s.d}</p></div></a>`).join('')}</div></section>
${cta(o.ctaT)}
`+foot;

const pages=[
{f:'accountingbox',name:'AccountingBox',title:'AccountingBox',desc:'Sodoben sistem za vodenje poslovanja v oblaku.',
 h1:'Sodoben sistem za vodenje poslovanja.',
 lead:'AccountingBox je rešitev v oblaku, ki računovodskim servisom in podjetjem zagotavlja učinkovito spremljanje poslovanja in enostavno medsebojno sodelovanje.',
 cta:'Preizkusite AccountingBox',vis:dash,
 fh:'Pomaga tudi tistim, <span class="g">ki niso računovodski strokovnjaki.</span>',
 body:'<p>Rešitev AccountingBox vključuje inteligentni sistem za avtomatski zajem podatkov in virtualno poslovno asistenco, ki podjetniku pomaga pri delu.</p>',
 feat:[['Spletna rešitev, dostopna kjerkoli in kadarkoli','Brez namestitve, na računalniku, tablici ali telefonu.'],['Optični zajem DocumentBox in elektronski arhiv','Prejeti računi se zajamejo in arhivirajo samodejno.'],['Podpora virtualne asistentke e-Zdenke','Vodi vas skozi naloge, opomni na roke in odgovori na vprašanja.']],
 two:[['Za podjetnike','V sistem je vključen modul za enostavno in hitro izdajanje računov, tudi z mobilne naprave. Vključena je tudi (mobilna) davčna blagajna.',`<div class="chips"><span>Izdani računi</span><span>Davčna blagajna</span><span>Potni nalogi</span></div>`],['Za računovodje','AccountingBox vključuje vse module za celovito vodenje računovodstva. Primeren je za podjetja, ki računovodstvo vodijo sama, in za računovodske servise.',`<div class="chips"><span>Glavna knjiga</span><span>Saldakonti</span><span>DDV</span><span>Osnovna sredstva</span><span>Plače</span></div>`]],
 quotes:[TESTI[0],TESTI[3],TESTI[2],TESTI[5]]},
{f:'documentbox',name:'DocumentBox',title:'DocumentBox',desc:'Inteligentni zajem podatkov iz računov in e-arhiviranje.',
 h1:'Računi, ki se knjižijo sami.',
 lead:'DocumentBox je inteligentni sistem za prepoznavo in zajem podatkov iz glave računov. Vsi podatki se samodejno zavedejo v poslovno-računovodske in ostale ERP programe.',
 cta:'Preizkusite DocumentBox',vis:`<div style="display:flex;gap:clamp(20px,3vw,64px);align-items:center;flex-wrap:wrap;justify-content:center">${inv}<div class="ui ledger" style="width:min(100%,360px);position:static;opacity:1"><div class="bar"><i></i><i></i><i></i><span>Zajeti podatki</span></div><div class="rows" style="padding:4px 16px 10px"><div><span>Izdajatelj</span><b>Merkur d.o.o.</b></div><div><span>Številka</span><b>2024-118</b></div><div><span>Datum</span><b>04. 11.</b></div><div><span>DDV 22 %</span><b>228,80 €</b></div><div><span>Skupaj</span><b>1.268,80 €</b></div><div><span>Status</span><span class="ok">Knjiženo ✓</span></div></div></div></div>`,
 fh:'Vašega računovodskega programa <span class="g">ni treba menjati.</span>',
 body:'<p>Zagotovljeno je tudi večstopenjsko potrjevanje dokumentov oziroma likvidacija. DocumentBox je namenjen podjetnikom, malim in srednje velikim podjetjem ter računovodjem in računovodskim servisom, ne glede na velikost.</p>',
 feat:[['Občutno manj časa za vnos in prepis podatkov',''],['Brez napak pri vnašanju',''],['Dokumentacija je hkrati e-arhivirana','Dostop od kjerkoli in kadarkoli.']],
 two:[['Za podjetnike','Najbolj navdušeni so nad dejstvom, da dokumentacije ne bo več treba ročno dostavljati v računovodski servis.'],['Za računovodje','Podatkov iz prejetih računov ni več treba pretipkavati. Sistem v povprečju prihrani 60 do 80 % časa in samodejno pripravi knjižbe za glavno knjigo, saldakonte in DDV evidence.',`<div class="h-l r" style="font-weight:500">60–80 %</div>`]],
 quotes:[TESTI[1],TESTI[4]]},
{f:'lekarnisko-poslovanje',name:'ProLIS',title:'ProLIS · Lekarniški informacijski sistem',desc:'Celovit informacijski sistem za lekarne.',
 h1:'Vi skrbite za paciente. ProLIS za poslovanje.',
 lead:'ProLIS je celovit informacijski sistem za vodenje poslovanja lekarne do segmenta finančnega računovodstva. Spremlja prodajo, izdajo na recepte in naročilnice, nabavo in proizvodnjo.',
 vis:pills,
 fh:'Vodilna rešitev <span class="g">v bolnišničnih lekarnah v Sloveniji.</span>',
 body:'<p>Namenjen je zasebnim lekarnam, javnim lekarniškim zavodom, galenskim laboratorijem in bolnišničnim lekarnam. Z dolgoletnimi izkušnjami in strokovnim kadrom bo vaša lekarna vedno na vrhu tehnologije.</p>',
 feat:[['Samodejni obračun storitev in prodajne cene','Izdela račune ter dnevna in mesečna poročila.'],['Kartica KZZ in povezava z ZZZS','Online komunikacija ter računalniška izmenjava podatkov in dokumentov (RIP).'],['Samodejni uvoz sprememb iz CBZ','Vgrajeni so vsi podatki o zdravilih, ki jih potrebujete pri delu.']],
 two:[['Izmenjava podatkov z zavarovalnicami','Z RIP vsi izvajalci zdravstvenih storitev v javnem zdravstvu na enostaven način izmenjujejo podatke o obračunanih storitvah, usklajeno z ZZZS in komercialnimi zavarovalnicami.'],['Za rast vaše lekarne','Verjamemo v napredno in uporabniku prijazno programsko opremo po stroškovno najučinkovitejši ceni, da lahko ustvarjate večje dobičke v najkrajšem času.']],
 case:{t:'Lekarna Mačkovec je <span class="g">prepolovila čas inventure.</span>',logo:'lekarna-mackovec.png',res:[['50 %','manj ur za celotno inventuro'],['4','osebe manj pri štetju zalog']],blocks:[['Izziv','Inventura je osem let pomenila veliko obremenitev. Štetje in seštevanje odčitkov več skupin je zahtevalo veliko časa, ročno seštevanje pa je bilo nagnjeno k napakam.'],['Rešitev','Delo s terminali: avtomatski izvoz zalog v prenosne terminale, odčitavanje kod artiklov in samodejni seštevek vseh vnosov. Sledi izvoz v znani program inventure.'],['Učinek','Inventura je cenejša, izvede jo manj ljudi v bistveno krajšem času.'],['Sabina Repše, mag. farm.','Lekarna Mačkovec']]},
 quotesT:'Izjave zadovoljnih lekarn',
 quotes:[['Urška Žbontar','Lekarna Mlaka','Programe in rešitve podjetje Pronet ves čas redno posodablja in sledi sodobnim smernicam. Razvili so številne funkcije, ki nam pri izdaji zdravil prihranijo ogromno časa.'],['Mateja Novak','Lekarna NOVAK','Vpogled v zalogo druge enote je velika časovna pridobitev. Prihranila sem čas, pa tudi kupce na ta način lažje ohranimo v naših lekarnah.'],['Tanja Polovič','Lekarna Trnje','Modul za samodejno komunikacijo z DSO deluje odlično. Skozi cel dan spremljamo predpis eRp iz DSO in imamo večino receptov obdelanih, ko pridejo prevzet zdravila.'],['Marjan Jurjevčič','Lekarna Štepanjsko naselje','S sistemom ROWA v povezavi s programi PRONET smo zelo zadovoljni. Več časa se lahko posvetimo strankam, pospravljanja je dvakrat manj.']]},
{f:'blagovno-poslovanje',name:'Blagovno poslovanje',title:'ProBP3 · Blagovno poslovanje',desc:'Blagovno poslovanje s fakturiranjem.',
 h1:'Popoln pregled in nadzor nad skladišči.',
 lead:'ProBP3 je namenjen obdelavam blagovnega knjigovodstva in skladiščnega poslovanja. Z njim vodite količinske in vrednostne podatke o prometu artiklov na skladiščih.',
 vis:stock,
 fh:'Za maloprodajo <span class="g">in veleprodajo.</span>',
 body:'<p>Program je namenjen vodenju maloprodajnih skladišč, povezanih z modulom Registrska blagajna, in veleprodajnih skladišč z veliko izbiro prodajnih elementov po partnerjih, skupinah, konsignaterjih, komercialistih in profitnih centrih.</p>',
 feat:[['Pregled nad zalogami','Informacije za potrebe skladišča v vsakem trenutku.'],['Vrednotenje zalog','Zbir in analiza prejemov ter izdaj po različnih kriterijih.'],['Registrska blagajna','Čitalec črtne kode, POS tiskalnik, blagajniški predal in prikazovalnik so vključeni v osnovno verzijo.']],
 case:{t:'Oktal Pharma je <span class="g">avtomatizirala naročila strank.</span>',logo:'OKTAL-PHARMA.png',res:[['1,5 h','prihranka dela vsak dan'],['10.000+','artiklov brez ročnega pretipkavanja']],blocks:[['Izziv','Zamuden proces obdelave naročil, ki jih stranke oddajajo po e-pošti, v Excelu in na druge načine. Vodstvo je potrebovalo ažuren pregled nad poslovanjem.'],['Rešitev','Z AccountingBoxom stranke naročila oddajajo prek posebnega modula. Tiste, ki ga ne želijo uporabljati, pošljejo prilogo na e-naslov, sistem pa jo sam prebere in pretvori v naročilo.'],['Rezultat','Brez dvojnih vnosov, brez pretipkavanja in z ažurnimi podatki o prodaji, naročilih in vmesnih bilancah.']]},
 quotes:[TESTI[5]]},
{f:'place-in-kadri',name:'Plače in kadri',title:'ProHRM · Plače in kadri',desc:'Obračun plač in kadrovska evidenca.',
 h1:'Obračun plač in kadrovska evidenca.',
 lead:'ProHRM zagotavlja vse zakonsko predpisane evidence in obrazce. Zaradi odprte zasnove ponuja praktično neomejene možnosti pri pripravi internih analiz obračunov.',
 vis:slip,
 fh:'Vse spremembe <span class="g">so vodene kronološko.</span>',
 body:'<p>Vedno lahko ugotovite stanje, ki je veljalo v danem obdobju. Seznamom in dokumentom se uporabniki lotijo sami, pri tem pa jim pomagajo že izdelani čarovniki.</p>',
 feat:[['Plače za podjetnike, zavode in javni sektor','Izračun za samostojne podjetnike ter javno proračunske uporabnike.'],['Prenos podatkov na banke, AJPES in FURS','Po standardu XML ali ASCII.'],['Visoka zanesljivost, varnost in tajnost podatkov','Modula za plače in kadrovsko evidenco sta na voljo tudi ločeno.']],
 two:[['Enostaven obračun','Plače, regres, odpravnine, jubilejne nagrade, poračuni in drugi prejemki, tudi podjemne in avtorske pogodbe, najemnine in sejnine.'],['Kadrovska evidenca','Vsi zakonsko potrebni in za podjetje pomembni podatki o zaposlenih, s predpisanimi obrazci in odprtimi analizami.']],
 quotes:[TESTI[2]]},
{f:'progost',name:'ProGOST',title:'ProGOST · Knjiga gostov',desc:'Elektronsko vodenje knjige gostov za sobodajalce.',
 h1:'Elektronska knjiga gostov.',
 lead:'Spletna rešitev ProGOST je namenjena vsem manjšim sobodajalcem, ki želijo hitro, enostavno in pregledno vodenje knjige gostov.',
 vis:guests,
 fh:'Vsak podatek vnesete <span class="g">samo enkrat.</span>',
 body:'<p>Zagotovite si popoln pregled nad gosti, zmanjšajte število napak, prihranite pri času in znižajte stroške poslovanja. ProGOST omogoča hiter dostop do iskanih podatkov in je izredno enostaven za uporabo.</p>',
 feat:[['Prijava gostov in elektronska knjiga gostov',''],['Poročanje o gostih in prenočitvah','Neposredna povezava s portalom eTurizem.'],['Izdaja računov gostom','Skladno z zakonskimi zahtevami.']],
 two:[['Davčna blagajna za sobodajalce','Naj bo urejenost vaših apartmajev vidna tudi na računu. Poslujte elegantno in skladno z zakonodajo.'],['Pregled nad gosti','Hiter dostop do vseh podatkov o gostih in nočitvah, kadarkoli jih potrebujete.']]},
{f:'ostale-resitve',name:'Ostale rešitve',title:'Prilagojene rešitve',desc:'Prilagojene rešitve za specifične poslovne procese.',
 h1:'Imate specifičen poslovni proces?',
 lead:'Naše rešitve pokrivajo večino poslovnih procesov, od nabave materiala do bilance stanja. Za posebnosti vašega podjetja skupaj najdemo ali ustvarimo pravo rešitev.',
 cta:'Opišite nam svoj proces',vis:`<div class="chips" style="justify-content:center;max-width:900px">${['Poslovna inteligenca BI3','Vinska klet ProVK3','Komerciala sejma ProKSF','Študentski servis','CRM integracija','E-poslovanje','Analitične kocke'].map(c=>`<span style="padding:18px 28px;font-size:clamp(17px,1.4vw,26px)">${c}</span>`).join('')}</div>`,
 fh:'Izkušena ekipa <span class="g">za projekte vseh velikosti.</span>',
 body:'<p>Uspešne projekte informatizacije smo izpeljali v podjetjih najrazličnejših velikosti in panog. Izdelali smo že številne prilagojene rešitve za organizacijo sejmov, proizvodnjo vina in vodenje študentskih servisov.</p>',
 feat:[['Poslovna inteligenca','Finančne podatke združi v analitične kocke. Izredna hitrost dela, praktično neodvisna od količine podatkov.'],['Študentski servis','Celovita podpora poslovanju z integriranim e-poslovanjem in možnostjo povezave s spletnim portalom.'],['Vinska klet','ProVK3 pokriva nabavo, proizvodnjo, prodajo, računovodstvo in kadre, razvit skupaj s strokovnjaki agronomije.'],['Komerciala sejma','ProKSF zajame vse poslovne dogodke sejma in fakturiranje razstavljalcem, povezano z računovodstvom in CRM.']],
 ctaT:'Posredujte nam svoje želje'},
];
pages.forEach(p=>fs.writeFileSync(p.f+'.html',sol(p)));

/* ---------- O PODJETJU ---------- */
const TEAM=[
['Slavko Frelih','direktor podjetja. Skrbi, da naša barka pluje v pravo smer in da so uporabniki zadovoljni.','Ljubiteljski nogometaš in profesionalni obiskovalec Sv. Jošta nad Kranjem.','slavko-frelih.png','slavko.frelih@pronet-kr.si'],
['Aleš Gašperšič','direktor razvoja, ki je idejo AccountingBoxa spremenil v najnaprednejšo aplikacijo.','Ljubitelj gora, morja ter vsega lepega in dobrega vmes.','ales-gaspersic.jpg','ales.gaspersic@pronet-kr.si'],
['Anže Štembergar Zupan','direktor marketinga. Skrbi, da se dober glas o AccountingBoxu sliši daleč naokoli.','Bere, filozofira in se sprehaja s psičko Koko.','ASZ.png','anze.s.zupan@pronet-kr.si'],
['Janez Vengušt','direktor projektov in vodja digitalnih poslovnih rešitev.','Strasten tehnični in jamski potapljač, član Jamarske reševalne službe.','JV.jpg','janez.vengust@pronet-kr.si'],
['Primož Smolkovič','vodja tehnične podpore in svetovanja. Poskrbi, da je prehod na nove sisteme čim manj stresen.','V službo najraje pride s kolesom.','primoz-smolkovic.jpg','podpora@pronet-kr.si'],
['Anže Nunar','vodja razvoja in programer, ki vsak izziv reši v najprimernejšem jeziku.','Nenehna vprašanja so ključ do odgovorov.','AN.png',''],
['Sara Zupanc Frelih','skrbi za organizacijo študentov, računovodske zadeve in redna plačila faktur.','Večino prostega časa posveti psoma Johnnyju in Appi.','sz-slika.jpg',''],
['Gregor Šturm','sistemski analitik in vodja projektov.','Navdih išče v domači hobi delavnici.','gregor-sturm.jpg','podpora@pronet-kr.si'],
['Andrej Lahovec','sistemski analitik in vzdrževalec informacijskih sistemov.','V prostem času amaterski podiralec kegljev.','andrej-lahovec.jpg','podpora@pronet-kr.si'],
['Mile Karlaš','svetovalec za tehnično in vsebinsko pomoč uporabnikom.','V prostem času rad hodi v naravo.','mile-karlas.jpg','podpora@pronet-kr.si'],
['Anja Pogačnik','del podporne ekipe AccountingBox, od fakturiranja do dokumentnega sistema.','Navdušenka nad namiznimi igrami in velika ljubiteljica mačk.','AP.jpg','podpora@pronet-kr.si'],
['Danijel Logar','produktni vodja in vodja projektov, most med uporabniki, podporo in razvijalci.','Rad odkriva naravo, bere in odpotuje kam daleč.','DL.jpg','podpora@pronet-kr.si'],
['Žan Frelih','del podporne ekipe AccountingBox in administracija uporabnikov.','Obožuje 2 psa, 3 mačke in želvo.','zan-frelih.jpg','podpora@pronet-kr.si'],
['Marko Koren','sistemska podpora strankam in delovno okolje, ki deluje.','Ljubiteljski odbojkaš in tonski tehnik v Prešernovem gledališču.','marko-koren.jpg','podpora@pronet-kr.si'],
['Damjan Žakelj','del svetovalne ekipe za pomoč uporabnikom.','Javni sektor je zamenjal za nov izziv.','DZ.png','podpora@pronet-kr.si'],
['David Peklenik Urbanč','programer spletnih aplikacij v PHP, JavaScript in SQL.','Disk golf, gore in zvest pes.','DPU.jpg',''],
['Tomaž Eržen','sistemski analitik in programer.','Jadralno padalski odvisnež.','tomaz-erzen.jpg',''],
['Rosanda Potrebuješ','programerka v PHP, JS, CSS in HTML.','Akvariji, bradata agama in leopardji gekon.','RP.png',''],
['Tomaž Tepina','razvijalec IT sistemov, predvsem za Oracle bazo.','Brade ni pustil rasti, pivo pa vseeno vari sam.','tomaz-topina.png',''],
['Tomaž Šenk','programer za Oracle PL/SQL, Delphi in SQL.','Občasno se v službo pripelje z mopedom.','tomaz-senk.png',''],
['Damir Bečić','programer v PHP, Java, JavaScript, HTML in CSS.','Dober koncert ali zanimiva nogometna tekma.','DB.jpg',''],
['Radosav Marković','programer v C#, SQL, JavaScript in PHP, z žilico za oblikovanje.','Rad bere, kolesari in ohranja tekmovalni duh.','radoslav-markovic.jpg',''],
['Nejc Robič','programer spletnih aplikacij v PHP, JavaScript, Java in SQL.','Poleti tenis, pozimi smučišče.','NR.jpg',''],
['Ardian Reshani','programer spletnih aplikacij v PHP, JavaScript in SQL.','Narava, potovanja in nove tehnologije.','AR.jpg',''],
];
const about=head('O podjetju · PRONET Kranj','Ekipa PRONET Kranj.')+nav('o')+`
<section class="phero wrap intro"><div class="crumb rv"><a href="index.html">Domov</a><span>·</span><span style="color:var(--ink)">O podjetju</span></div>
  <h1 class="h-xl sl">Z vami že več kot 25 let.</h1>
  <div class="row"><p class="lead rv">Smo ekipa računalniških strokovnjakov, ki na temeljih sodobne informacijske tehnologije razvija edinstvene poslovne modele.</p><div class="cta rv"><a class="btn" href="#ekipa"><span class="d"></span>Spoznajte ekipo</a></div></div>
</section>
<div class="wrap"><div class="photo rv" style="margin-top:0"><img src="assets/img/ekipa-pronet-kranj.jpg" alt="Ekipa PRONET Kranj"></div></div>
<section class="sec wrap">
  <div class="stats" style="grid-template-columns:repeat(3,1fr)">
    <div class="rv"><b data-count="6000">0<em>+</em></b><span>uporabnikov</span></div>
    <div class="rv"><b data-count="100">0<em>+</em></b><span>partnerjev</span></div>
    <div class="rv"><b data-count="25">0<em>+</em></b><span>zaposlenih</span></div>
  </div>
</section>
<section class="wrap"><div class="split">
  <h2 class="h-l sl">Naša vizija je <span class="g">skrajšati čas poslovnih procesov.</span></h2>
  <div class="body rv"><p>Vodilo, spoznati poslovne procese stranke že na začetku sodelovanja, lahko zagotovimo samo z osebnim pristopom. Z ekipo izkušenih strokovnjakov poiščemo pravo rešitev za vsak problem.</p><p>Poslovni procesi so vse bolj zahtevni. Hiter odziv na spremembe je mogoč samo s popolnim obvladovanjem informacij. Prav hitro in kakovostno obvladovanje informacij je osnovno načelo naših programov in našega podjetja.</p><p>Zaupanje je osnova vsakega odnosa, tudi odnosa med kupcem in stranko. Kakovost, korekten odnos in posluh za težave so v 25 letih iz zaupanja naredili najboljšo blagovno znamko podjetja PRONET.</p></div>
</div></section>
<section class="sec wrap"><div class="case-full rv">
  <div><h2 class="h-m">Da delamo dobro, <span class="g">nam povedo tudi nagrade.</span></h2><p class="body" style="margin-top:24px">Od leta 2016 smo prejemniki nagrad in certifikatov, kot sta Excellent SME in Boniteta odličnosti. Od 2019 izpolnjujemo kriterije za platinasto bonitetno odličnost, najvišjo bonitetno vrednost in posebno priznanje.</p></div>
  <div class="awards" style="margin-top:0;justify-content:center"><img src="assets/img/platinasta-AAA-boniteta.png" alt="Platinasta AAA boniteta"><img src="assets/img/certifikat-SME-1.png" alt="Excellent SME"><img src="assets/img/25-let-pronet-kranj.png" alt="25 let PRONET Kranj"></div>
</div></section>
<section class="wrap" id="ekipa"><div class="shead"><h2 class="h-l sl">Spoznajte <span class="g">ekipo.</span></h2><p class="lead rv">Poleg znanj smo razvijali tudi ekipo. Danes imamo v svojih vrstah številne strokovnjake, ki našim strankam pomagajo dosegati njihove cilje.</p></div>
<div class="team">${TEAM.map(t=>`<div class="person rv"><div class="ph"><img src="assets/team/${t[3]}" alt="${t[0]}" loading="lazy"><div class="hob">${t[2]}</div></div><h4>${t[0]}</h4><p>Je ${t[1]}</p>${t[4]?`<a href="mailto:${t[4]}">${t[4]}</a>`:''}</div>`).join('')}</div></section>
<section class="sec wrap"><div class="split">
  <h2 class="h-m sl">Osnovni podatki</h2>
  <div class="facts rv" style="grid-template-columns:1fr">${[['Naziv','PRONET, Kranj, d.o.o.'],['Naslov','Ljubljanska cesta 24b, 4000 Kranj'],['Telefon','+386 (0)4 2 800 800'],['Fax','+386 (0)4 2 800 860'],['Poslovni račun','SI56 2900 0005 0759 957'],['Davčna številka','35884193'],['Matična številka','5548586000']].map(f=>`<div><span>${f[0]}</span><b>${f[1]}</b></div>`).join('')}</div>
</div></section>
${cta('Bi nas želeli spoznati v živo?','Dogovorimo se za pogovor in posvet ob skodelici kave ali čaja.')}
`+foot;
fs.writeFileSync('o-podjetju.html',about);

/* ---------- REFERENCE ---------- */
const names=['12media d.o.o.','Bauta d.o.o.','GEM Motors d.o.o.','B. Makovec Transport d.o.o.','Toyota Center Ljubljana','Kuli, d.o.o.','S.O.S. sejemske rešitve','Union hoteli d.d.','Labena d.o.o.','GRS d.o.o.','Sconto d.o.o.','Lineal d.o.o.','Dekon.si d.o.o.','Agencija Renee d.o.o.','Ultra-AS, d.o.o.','Davčna oaza','Cosinus d.o.o.','Tehbo d.o.o.','DAG d.o.o. Koper','PIŠK Murska Sobota','Elektroinstalacije Gebit','MN Biro d.o.o.','Studio Matevljič d.o.o.','SIPOS d.o.o.','Zavod za turizem Cerklje','VPD, Bled, d.o.o.','Keune Adria d.o.o.','AVC Group d.o.o.','Fitnes zveza Slovenije','Dolinšek-S d.o.o.','Monicolor d.o.o.','Splošna bolnišnica Celje','Onkološki inštitut Ljubljana','Vetconsult Pharma d.o.o.','Psihiatrična klinika Ljubljana','Ortopedska bolnišnica Valdoltra','Door Tech Group d.o.o.','TA-BU investicije d.o.o.'];
const ref=head('Reference · PRONET Kranj','Naši naročniki.')+nav('r')+`
<section class="phero wrap intro"><div class="crumb rv"><a href="index.html">Domov</a><span>·</span><span style="color:var(--ink)">Reference</span></div>
  <h1 class="h-xl sl">Ponosni smo na vsakega uporabnika.</h1>
  <div class="row"><p class="lead rv">Naši naročniki prihajajo iz najrazličnejših industrij in panog. Razlikujejo se po velikosti, poslovnih procesih, lokacijah in tipih svojih strank.</p></div>
</section>
<section class="wrap"><div class="lgrid">${[...clients,'photo.jpg'].map(c=>`<div class="rv"><img src="assets/logos/${c}" alt="" loading="lazy"></div>`).join('')}</div></section>
<section class="sec wrap"><div class="namewall rv">${names.map(n=>`<span>${n}</span>`).join('')}<span class="r">in več kot 500 drugih.</span></div></section>
<section class="wrap" style="padding-bottom:clamp(96px,11vw,240px)"><div class="shead"><h2 class="h-l sl">Kaj pravijo <span class="g">naše stranke.</span></h2></div>${testi()}</section>
${cta()}
`+foot;
fs.writeFileSync('reference.html',ref);

/* ---------- ZAPOSLITEV ---------- */
const offer=['redno zaposlitev za nedoločen čas s 6-mesečno poskusno dobo','pridobivanje novih znanj ter karierni in osebni razvoj','prilagodljiv delovnik z možnostjo dela od doma','odlične pogoje v dinamičnem in proaktivnem kolektivu'];
const JOBS=[
['Strokovni sodelavec v prodaji (m/ž)',['obdelava povpraševanj, priprava ponudb in pogodb','komunikacija s potencialnimi naročniki','izvajanje prodajnih sestankov in skupinskih predstavitev','nadgrajevanje strokovnega znanja in prodajnih veščin','skrb za obstoječe stranke in dolgoročne odnose'],['samoiniciativnost in pozitivna naravnanost','razvite komunikacijske, tržne in pogajalske sposobnosti','poznavanje poslovnih procesov v podjetjih','vsaj 3 leta izkušenj v prodaji','vozniški izpit B in lastno prevozno sredstvo','najmanj V. stopnja izobrazbe']],
['Tehnična podpora, svetovanje in vodenje projektov (m/ž)',['komunikacija s strankami in svetovanje pri izzivih','vodenje projektov','interna in eksterna komunikacija','razvoj odnosov z obstoječimi strankami','nenehno učenje novih znanj in veščin'],['poznavanje procesov v segmentu SOHO in SMB, zaželeno trgovinskih','3 leta izkušenj s tehnično podporo uporabnikom','organizacijske, komunikacijske in pogajalske sposobnosti','vsaj osnovno poznavanje orodij za analize baz, npr. PL/SQL','vozniški izpit B in lastno prevozno sredstvo','najmanj V. stopnja izobrazbe']],
['Programer, razvijalec ali drug razvojni profil (m/ž)',['razvoj spletnih aplikacij v PHP, Laravel je plus','delo s podatkovnimi bazami in SQL poizvedbami','uporabniški vmesnik v HTML, CSS, Bootstrap, TypeScript in Vue.js','koda v SVN in GIT, povezave prek REST API in SOAP','iščemo tudi arhitekte, testerje in DevOps inženirje'],['samostojno delo in komunikacija v skupini','veselje do učenja in reševanja težkih problemov','organiziranost, vztrajnost in natančnost','smisel za podrobnosti in analizo','starost in spol nista pomembna']],
];
const jobs=head('Zaposlitev · PRONET Kranj','Prosta delovna mesta.')+nav('z')+`
<section class="phero wrap intro"><div class="crumb rv"><a href="index.html">Domov</a><span>·</span><span style="color:var(--ink)">Zaposlitev</span></div>
  <h1 class="h-xl sl">Združimo moči!</h1>
  <div class="row"><p class="lead rv">Iščete razgiban in fleksibilen delovnik, priložnosti za rast, motivirano ekipo in delo z najnaprednejšimi informacijskimi rešitvami? Kot nalašč smo eden za drugega.</p><div class="cta rv"><a class="btn" href="mailto:info@pronet-kr.si"><span class="d"></span>info@pronet-kr.si</a></div></div>
</section>
<section class="wrap"><div class="feat">${['Prilagodljiv delovnik z možnostjo dela od doma','Redna zaposlitev za nedoločen čas','Karierni in osebni razvoj'].map(f=>`<div class="rv"><h4>${f}</h4></div>`).join('')}</div></section>
<section class="sec wrap"><div class="shead"><h2 class="h-l sl">Razpisana <span class="g">delovna mesta.</span></h2><p class="lead rv">Pošljite CV in motivacijsko pismo na info@pronet-kr.si.</p></div>
${JOBS.map(j=>`<div class="job rv"><button aria-expanded="false"><h3>${j[0]}</h3><span class="pm"></span></button><div class="bd"><div><div class="cols">
<div><h5>Če uživaš v nalogah</h5><ul>${j[1].map(x=>`<li>${x}</li>`).join('')}</ul></div>
<div><h5>In imaš te lastnosti</h5><ul>${j[2].map(x=>`<li>${x}</li>`).join('')}</ul></div>
<div><h5>Te vabimo v okolje, kjer nudimo</h5><ul>${offer.map(x=>`<li>${x}</li>`).join('')}</ul><a class="btn" href="mailto:info@pronet-kr.si?subject=${encodeURIComponent(j[0])}" style="margin-top:28px"><span class="d"></span>Prijavite se</a></div>
</div></div></div></div>`).join('')}
</section>
${cta('Ni razpisanega mesta zate?','Vseeno nam piši na info@pronet-kr.si in povej, kako bi lahko najbolj prispeval ali prispevala k uspešnosti podjetja. Dodaj motivacijsko pismo in življenjepis.')}
`+foot;
fs.writeFileSync('zaposlitev.html',jobs);

/* ---------- PARTNERJI ---------- */
const PART=[['Microsoft d.o.o.','Microsoft-logotip.png','Vodilni svetovni ponudnik programske opreme. S partnerstvom zagotavljamo integracijo naših rešitev z Microsoft izdelki, kot je Office 365.',''],['ORACLE Software d.o.o.','oracle-logotip.png','Izbrani ponudnik podatkovnih baz, na katerih stojijo naše rešitve. Zanesljivost je zagotovljena.','info_si@oracle.com'],['ALSO d.o.o.','ALSO.png','Povezuje ponudnike in kupce v panogi IKT. Njihova tržnica vključuje več kot 188.000 izdelkov približno 500 ponudnikov.','prodaja@also.si'],['iStor d.o.o.','iStor-logotip.png','Varnost podatkov jemljemo resno. iStor ponuja vrhunsko storitev varnostnega shranjevanja podatkov.','info@istor.net'],['ZZI d.o.o.','bizbox.png','bizBox je platforma za varno in enostavno izmenjavo e-računov in drugih e-dokumentov med podjetji in z državo.','info@zzi.si'],['A1 Slovenija d.o.o.','A1-logotip.png','Vodilni zasebni ponudnik celovitih komunikacijskih storitev v Sloveniji z več kot 700 tisoč uporabniki.','info@a1.si'],['Visoka šola za računovodstvo','logotip-vsr.png','Izmenjujemo znanje, predavamo in organiziramo dogodke, da so računovodje in podjetniki oboroženi z znanjem za uspeh.','info@vsr.si'],['Intera d.o.o.','Intrix-logotip.png','S spletno rešitvijo Intrix vodilni slovenski ponudnik CRM aplikacije in komplementaren partner naši ponudbi.','info@intera.si']];
const more=['RCIKT-logotip.png','Abakus-logotip.png','Mega-M-logotip.png','SRC-Infonet-logotip.png','IT-Group-logotip.png','IHC-logo.png','Abak-logotip.png','DAP-ING-logotip.png','taxgroup-logo.png','sinhro-logo.jpg','Hermes-logo.jpg','genis-logo.png','infotrans-logotip.jpg'];
const part=head('Partnerji · PRONET Kranj','Partnerji PRONET Kranj.')+nav('p')+`
<section class="phero wrap intro"><div class="crumb rv"><a href="index.html">Domov</a><span>·</span><span style="color:var(--ink)">Partnerji</span></div>
  <h1 class="h-xl sl">Skupaj na poti k uspehu.</h1>
  <div class="row"><p class="lead rv">Pomagajo nam številna podjetja, s katerimi si delimo vrednote in vizijo prihodnosti poslovanja. Veseli smo, da jih lahko štejemo za svoje partnerje.</p></div>
</section>
<section class="wrap"><div class="plist">${PART.map(p=>`<article class="rv"><div class="lg"><img src="assets/logos/${p[1]}" alt="${p[0]}" loading="lazy"></div><div><h3>${p[0]}</h3><p>${p[2]}</p>${p[3]?`<a href="mailto:${p[3]}">${p[3]}</a>`:''}</div></article>`).join('')}</div></section>
<section class="sec wrap"><div class="shead"><h2 class="h-m sl">In tudi</h2></div><div class="lgrid">${more.map(c=>`<div class="rv"><img src="assets/logos/${c}" alt="" loading="lazy"></div>`).join('')}</div></section>
${cta('Postanite naš partner')}
`+foot;
fs.writeFileSync('partnerji.html',part);

/* ---------- KONTAKT ---------- */
const kon=head('Kontakt · PRONET Kranj','Kontaktirajte PRONET Kranj.')+nav('k')+`
<section class="phero wrap intro"><div class="crumb rv"><a href="index.html">Domov</a><span>·</span><span style="color:var(--ink)">Kontakt</span></div>
  <h1 class="h-xl sl">Z veseljem se vam posvetimo.</h1>
</section>
<section class="wrap"><div class="split">
  <div>
    <div class="facts rv" style="grid-template-columns:1fr">${[['Email','<a href="mailto:info@pronet-kr.si">info@pronet-kr.si</a>'],['Telefon','<a href="tel:+38642800800">+386 (0)4 2 800 800</a>'],['Fax','+386 (0)4 2 800 860'],['Naslov','Ljubljanska cesta 24b, 4000 Kranj'],['Podpora','<a href="mailto:podpora@pronet-kr.si">podpora@pronet-kr.si</a>']].map(f=>`<div><span>${f[0]}</span><b>${f[1]}</b></div>`).join('')}</div>
    <div class="dir rv"><h4>Iz smeri Ljubljana</h4><p>Avtocesto zapustite na izvozu Kranj vzhod. Prvo krožišče zapustite na tretjem izvozu proti Kranju, drugo krožišče ob TC Mercator na tretjem izvozu proti Škofji Loki. Peljete mimo Tuša in Qlandie, čez Delavski most, skozi dva semaforja in mimo podjetja Iskratel. Vhod je skozi drugi, zahodni vhod kompleksa Iskratel, nasproti kamionskega vhoda v Savo. Nahajamo se v sektorju E10 na desni strani poslovne stavbe.</p>
    <h4>Iz smeri Jesenice</h4><p>Iz smeri Bleda zapeljete na izvoz Kranj vzhod in sledite zgornjim usmeritvam.</p></div>
  </div>
  <div>
    <form class="form lightf rv"><h2 class="h-s fi" style="margin-bottom:12px">Pošljite nam sporočilo</h2>
      <div class="fi row2"><input required placeholder="Ime in priimek" aria-label="Ime in priimek"><input placeholder="Podjetje" aria-label="Podjetje"></div>
      <div class="fi row2"><input type="email" required placeholder="Email" aria-label="Email"><input placeholder="Telefon" aria-label="Telefon"></div>
      <select class="fi" aria-label="Rešitev"><option>Zanima me rešitev</option>${SOL.map(s=>`<option>${s.n}</option>`).join('')}</select>
      <textarea class="fi" placeholder="Sporočilo" aria-label="Sporočilo"></textarea>
      <button class="btn fi" style="align-self:flex-start"><span class="d"></span>Pošljite</button>
      <div class="ok">Hvala. Oglasimo se vam v enem delovnem dnevu.</div>
    </form>
    <div class="map rv" style="margin-top:var(--gap)"><iframe title="Zemljevid PRONET Kranj" loading="lazy" src="https://www.openstreetmap.org/export/embed.html?bbox=14.335%2C46.232%2C14.365%2C46.248&layer=mapnik&marker=46.2405%2C14.3497"></iframe></div>
  </div>
</div></section>
<div class="sec-t"></div>
`+foot;
fs.writeFileSync('kontakt.html',kon);
console.log('built');
