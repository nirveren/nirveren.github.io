function getRandomInt(e,t){return Math.floor(Math.random()*(t-e))+e}(()=>{const e={backgroundPlayers:()=>{const e=[30881,179657,176977,316145,7429],t=[131356,63932,121175,69621,6733,88404,51985,84945,103404,91345],a=document.querySelector(".sidePlayer__img.left");if(a){const t=e[getRandomInt(0,e.length)];a.setAttribute("src",`/uploads/players/transparent/${t}.png`)}const l=document.querySelector(".sidePlayer__img.right");if(l){const e=t[getRandomInt(0,t.length)];l.setAttribute("src",`/uploads/players/transparent/${e}.png`)}},february:()=>{const e=(new Date).getDate();1===(new Date).getMonth()&&6===e&&document.body.classList.add("munich58")},localizeMatchTime:()=>{const e=document.querySelectorAll("[data-matchDatetime]");if(!e)return;const t=["вс","пн","вт","ср","чт","пт","сб"];Array.from(e).forEach((e=>{const a=e.getAttribute("data-matchDatetime"),l=window.MU1.i18n.parseMatchTime(a),n=e.querySelector("[data-matchDate]"),o=e.querySelector("[data-matchTime]");n.textContent=`\n          ${l.getDate()}\n          ${window.MU1.i18n.monthTranslate(l.getMonth(),!0)},\n          ${t[l.getDay()]}\n        `,o&&(o.textContent=`${l.getHours()}:${(l.getMinutes()<10?"0":"")+l.getMinutes()}`)}))},scrollToTopClickHandler:()=>{document.querySelector("#scrollToHead").addEventListener("click",(()=>{document.querySelector("header").scrollIntoView({behavior:"smooth"})}))},highlightTag:()=>{const e=document.querySelector(`a[href="${location.pathname}"]`);if(e){e.classList.add("active");const t=document.querySelector(".tagTitle");t&&(t.textContent=t?e.textContent:"Поиск по тэгу")}},scrollHandler:()=>{let e=!1;const t=document.getElementById("scrollToHead");let a;window.onscroll=()=>{a||(a=setInterval((()=>{clearInterval(a),a=void 0;const l=window.pageYOffset||document.documentElement.scrollTop;l>=400&&!e?(t.classList.add("visible"),e=!0):l<400&&e&&(t.classList.remove("visible"),e=!1)}),200))}},replaceQuotes:()=>{[...document.querySelectorAll(".card-title .title, .card-content h3, .card-content h5")].forEach((e=>{const t=e.textContent.trim().replace(/\x27/g,'"').replace(/(\w)\x22(\w)/g,"$1'$2").replace(/(^)\x22(\s)/g,"$1»$2").replace(/(^|\s|\()"/g,"$1«").replace(/"(\;|\!|\?|\:|\.|\,|$|\)|\s)/g,"»$1");e.textContent=t}))},popupsHandlers:()=>{[...document.querySelectorAll("[data-open]")].forEach((e=>{e.addEventListener("click",(e=>{document.querySelector(`[data-popup="${e.currentTarget.getAttribute("data-open")}"]`).classList.toggle("show")}))}))}},t={replaceTitles:()=>{const e=(e,t)=>{const a=JSON.parse(localStorage.getItem("getCommonInfo"))||{},{response:{clubs:l}}=a;if(!l)return;const n=l.find((t=>t.term===e));return n?t?n.name:n.short_name:e};Array.from(document.querySelectorAll("[data-club]")).forEach((t=>{const a=t.getAttribute("data-club"),l=e(a)||a;t.innerText=l})),Array.from(document.querySelectorAll("[data-club_full]")).forEach((t=>{t.innerText=e(t.getAttribute("data-club_full"),!0)}))}};Object.keys(e).forEach((t=>{try{e[t]()}catch(e){console.log("Invokation error:",e)}})),window.MU1.Api.onLoad(t),window.MU1.Api.get("getCommonInfo")})(),(()=>{const e={};function t(e=1){var t;t=()=>{for(let t=0;t<e;t++){const e=document.createElement("script");e.innerHTML="(adsbygoogle = window.adsbygoogle || []).push({})",document.head.appendChild(e)}const t=document.createElement("script");t.setAttribute("async","async"),t.type="text/javascript",t.src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",document.head.appendChild(t)},"complete"===document.readyState||"interactive"===document.readyState?setTimeout(t,1):document.addEventListener("DOMContentLoaded",t)}const a={tableTransfers:e=>{const t=document.querySelector('[data-table="transfers"]');if(!t)return;const a=e=>{return`<div class="infoTable__tableRow">\n            <div class="infoTable__tableCell IT__transferCell--name">\n              ${e.name}\n              <span class="IT__transferCell--price">\n                ${t=e.price,t&&0!==parseInt(t,10)?t.length===parseInt(t,10).toString().length?`£${t}m`:t:""}\n              </span>\n            </div>\n            <div class="infoTable__tableCell IT__transferCell--club">${e.club}</div>\n            <div class="infoTable__tableCell IT__transferCell--prob IT__transferCell--prob${e.dynamic}">${e.probability}%</div>\n          </div>`;var t},l=e.transfers.buy.filter((e=>e.probability)).sort(((e,t)=>t.probability-e.probability)).map((e=>a(e))).join(""),n=e.transfers.sell.filter((e=>e.probability)).sort(((e,t)=>t.probability-e.probability)).map((e=>a(e))).join(""),o=e=>`<div class="infoTable__tableRow infoTable__tableRow--head">\n              <div class="infoTable__tableCell">${e}</div>\n              <div class="infoTable__tableCell"></div>\n              <div class="infoTable__tableCell"></div>\n            </div>`,s=[];l&&(s.push(o("Покупка")),s.push(l)),n&&(s.push(o("Продажа")),s.push(n)),t.innerHTML=s.join("")},loadAdsense:()=>t(0),tableBombardiers:e=>{const t=document.querySelector('[data-table="scorers"]');if(!e.goalsAndAssists||!t)return;let a=e.goalsAndAssists.slice(0,10).map((e=>`<div class="infoTable__tableRow">\n          <div class="infoTable__tableCell--maxWidth infoTable__tableCell"><a href="/${e.name_eng}.html" target="_blank">${e.name}</a></div>\n          <div class="infoTable__tableCell">${e.goals}</div>\n          <div class="infoTable__tableCell">${e.assists}</div>\n          <div class="infoTable__tableCell">${e.total}</div>\n        </div>`));a.unshift('<div class="infoTable__tableRow infoTable__tableRow--head">\n        <div class="infoTable__tableCell--maxWidth infoTable__tableCell">Игрок</div>\n        <div class="infoTable__tableCell">Голы</div>\n        <div class="infoTable__tableCell">Пер.</div>\n        <div class="infoTable__tableCell">Г+П</div>\n      </div>'),a=a.join(""),t.innerHTML=a},tableEpl:e=>{if(!e.stats||!e.stats.table)return;let t='<div class="infoTable__tableRow infoTable__tableRow--head">\n        <div class="infoTable__tableCell">#</div>\n        <div class="infoTable__tableCell--maxWidth infoTable__tableCell"></div>\n        <div class=" infoTable__tableCell">Матчей</div>\n        <div class="infoTable__tableCell">Очков</div>\n      </div>';e.stats.table.sort(((e,t)=>Number(e.pos)>Number(t.pos)?1:-1)).forEach((e=>{t+=`<div class="infoTable__tableRow ${"Манчестер Юнайтед"===e.name?"infoTable__tableRow--active":""} ">\n          <div class="infoTable__tableCell">${e.pos}</div>\n          <div class="infoTable__tableCell--maxWidth infoTable__tableCell">${e.name}</div>\n          <div class="infoTable__tableCell">${e.games}</div>\n          <div class="infoTable__tableCell">${e.points}</div>\n        </div>`}));const a=document.createElement("div");a.innerHTML=t,document.querySelector('[data-table="apl"]').appendChild(a)},tableResults:e=>{const t=(e,t)=>{if(!e||!e.length){return void document.querySelector(t).parentElement.remove()}const a={};e.forEach((e=>{a[e.date]||(a[e.date]=[]),a[e.date].push(e)}));const l=Object.keys(a).sort(((e,t)=>{const a=new Date(e),l=new Date(t);a.setHours(18),l.setHours(18);return Math.abs(Date.now()-a.getTime())<Math.abs(Date.now()-l.getTime())?-1:1}));let n,o="";for(let e=0;e<l.length;e++)for(let t=0;t<a[l[e]].length;t++){const s=a[l[e]][t];s.date!==n&&(n=s.date,o+=`<div class="infoTable__tableRow infoTable__tableRow--head">\n                <div class="infoTable__tableCell">${new Date(s.date).toLocaleDateString("ru",{day:"numeric",month:"long"})}</div>\n                <div class="infoTable__tableCell"></div><div class="infoTable__tableCell"></div>\n              </div>`),o+=`<div class="infoTable__tableRow">\n              <div class="FR_home infoTable__tableCell">${s.home}</div>\n              <div class="infoTable__tableCell FR_timescore">${s.score?s.score:"-"}</div>\n              <div class="TR_away infoTable__tableCell">${s.away}</div>\n            </div>`}const s=document.createElement("div");s.innerHTML=o,document.querySelector(t).appendChild(s)};e.stats&&(t(e.stats.results,'[data-table="epl_results"]'),t(e.stats.fixtures,'[data-table="epl_fixtures"]'))}};Object.keys(e).forEach((t=>{e[t]()})),window.MU1.Api.get("getCommonInfo",a)})();