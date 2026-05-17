(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e={}){let{message:t=`PocketJS toast`,duration:n=2500,position:r=`bottom`}=e,i=document.createElement(`div`);return i.className=`pocket-toast pocket-toast-${r}`,i.textContent=t,document.body.appendChild(i),requestAnimationFrame(()=>{i.classList.add(`show`)}),setTimeout(()=>{i.classList.remove(`show`),setTimeout(()=>i.remove(),300)},n),i}function t(e={}){let{title:t=``,content:n=``}=e,r=document.createElement(`div`);r.className=`pocket-modal-overlay`;let i=document.createElement(`div`);i.className=`pocket-modal`,i.innerHTML=`
    <div class="pocket-modal-header">
      <h2>${t}</h2>

      <button class="pocket-modal-close">
        ✕
      </button>
    </div>

    <div class="pocket-modal-content">
      ${n}
    </div>
  `,r.appendChild(i),document.body.appendChild(r),requestAnimationFrame(()=>{r.classList.add(`show`),i.classList.add(`show`)});function a(){r.classList.remove(`show`),i.classList.remove(`show`),setTimeout(()=>{r.remove()},250)}return i.querySelector(`.pocket-modal-close`).onclick=a,r.onclick=e=>{e.target===r&&a()},{close:a}}function n(e={}){let{items:t=[{label:`Home`,icon:`⌂`},{label:`Search`,icon:`⌕`},{label:`Profile`,icon:`◉`}],active:n=0,onChange:r=()=>{}}=e,i=document.createElement(`nav`);return i.className=`pocket-tab-bar`,i.innerHTML=t.map((e,t)=>`
    <button class="pocket-tab-bar-item ${t===n?`active`:``}" data-index="${t}">
      <span class="pocket-tab-bar-icon">${e.icon}</span>
      <span class="pocket-tab-bar-label">${e.label}</span>
    </button>
  `).join(``),document.body.appendChild(i),i.querySelectorAll(`.pocket-tab-bar-item`).forEach(e=>{e.onclick=()=>{i.querySelectorAll(`.pocket-tab-bar-item`).forEach(e=>{e.classList.remove(`active`)}),e.classList.add(`active`);let n=Number(e.dataset.index);r(n,t[n])}}),{destroy(){i.remove()}}}function r(e={}){let{container:t,cards:n=[]}=e,r=typeof t==`string`?document.querySelector(t):t;if(!r)return;let i=n.length-1;r.classList.add(`pocket-swipe-root`),r.innerHTML=n.map((e,t)=>`
    <div class="pocket-swipe-card" data-index="${t}">
      ${e.content}
    </div>
  `).join(``);let a=[...r.querySelectorAll(`.pocket-swipe-card`)];function o(){a.forEach((e,t)=>{let n=i-t;e.style.zIndex=t,e.style.opacity=n<0?`0`:`1`,e.style.transform=`
        scale(${1-Math.max(n,0)*.04})
        translateY(${Math.max(n,0)*10}px)
      `})}o(),a.forEach((e,t)=>{let n=0,r=0;e.addEventListener(`touchstart`,r=>{t===i&&(n=r.touches[0].clientX,e.style.transition=`none`)}),e.addEventListener(`touchmove`,a=>{if(t!==i)return;r=a.touches[0].clientX;let o=r-n;e.style.transform=`
        translateX(${o}px)
        rotate(${o*.05}deg)
      `}),e.addEventListener(`touchend`,()=>{if(t!==i)return;let a=r-n;Math.abs(a)>120?(e.style.transition=`0.35s ease`,e.style.transform=`
          translateX(${a>0?1e3:-1e3}px)
          rotate(${a>0?20:-20}deg)
        `,e.style.opacity=`0`,--i,setTimeout(o,250)):(e.style.transition=`0.35s ease`,o())})})}var i={createToast:e,createModal:t,createTabBar:n,createSwipeCards:r};typeof window<`u`&&(window.Pocket=i),document.querySelector(`#app`).innerHTML=`
  <main>
    <h1>PocketJS</h1>

    <button id="toastBtn">Show Toast</button>
    <button id="modalBtn">Show Modal</button>

    <div id="swipeDemo"></div>
  </main>
`,document.querySelector(`#toastBtn`).onclick=()=>{i.createToast({message:`PocketJS is running`})},document.querySelector(`#modalBtn`).onclick=()=>{i.createModal({title:`PocketJS Modal`,content:`<p>Modal working properly.</p>`})},i.createSwipeCards({container:`#swipeDemo`,cards:[{content:`Swipe me`},{content:`PocketJS`},{content:`Mobile UI`}]}),i.createTabBar();