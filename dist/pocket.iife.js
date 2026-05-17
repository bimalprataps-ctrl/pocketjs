var Pocket=(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:`Module`});function t(e={}){let{message:t=`PocketJS toast`,duration:n=2500,position:r=`bottom`}=e,i=document.createElement(`div`);return i.className=`pocket-toast pocket-toast-${r}`,i.textContent=t,document.body.appendChild(i),requestAnimationFrame(()=>{i.classList.add(`show`)}),setTimeout(()=>{i.classList.remove(`show`),setTimeout(()=>i.remove(),300)},n),i}function n(e={}){let{title:t=``,content:n=``}=e,r=document.createElement(`div`);r.className=`pocket-modal-overlay`;let i=document.createElement(`div`);i.className=`pocket-modal`,i.innerHTML=`
    <div class="pocket-modal-header">
      <h2>${t}</h2>

      <button class="pocket-modal-close">
        ✕
      </button>
    </div>

    <div class="pocket-modal-content">
      ${n}
    </div>
  `,r.appendChild(i),document.body.appendChild(r),requestAnimationFrame(()=>{r.classList.add(`show`),i.classList.add(`show`)});function a(){r.classList.remove(`show`),i.classList.remove(`show`),setTimeout(()=>{r.remove()},250)}return i.querySelector(`.pocket-modal-close`).onclick=a,r.onclick=e=>{e.target===r&&a()},{close:a}}function r(e={}){let{items:t=[{label:`Home`,icon:`⌂`},{label:`Search`,icon:`⌕`},{label:`Profile`,icon:`◉`}],active:n=0,onChange:r=()=>{}}=e,i=document.createElement(`nav`);return i.className=`pocket-tab-bar`,i.innerHTML=t.map((e,t)=>`
    <button class="pocket-tab-bar-item ${t===n?`active`:``}" data-index="${t}">
      <span class="pocket-tab-bar-icon">${e.icon}</span>
      <span class="pocket-tab-bar-label">${e.label}</span>
    </button>
  `).join(``),document.body.appendChild(i),i.querySelectorAll(`.pocket-tab-bar-item`).forEach(e=>{e.onclick=()=>{i.querySelectorAll(`.pocket-tab-bar-item`).forEach(e=>{e.classList.remove(`active`)}),e.classList.add(`active`);let n=Number(e.dataset.index);r(n,t[n])}}),{destroy(){i.remove()}}}function i(e={}){let{container:t,cards:n=[]}=e,r=typeof t==`string`?document.querySelector(t):t;if(!r||!n.length)return;let i=0;r.classList.add(`pocket-swipe-root`),r.innerHTML=n.map((e,t)=>`
    <div class="pocket-swipe-card" data-index="${t}">
      ${e.content}
    </div>
  `).join(``);let a=[...r.querySelectorAll(`.pocket-swipe-card`)];function o(){a.forEach((e,t)=>{let n=t-i;if(e.style.transition=`0.3s ease`,n<0){e.style.opacity=`0`,e.style.pointerEvents=`none`,e.style.transform=`translateX(-120%) rotate(-18deg)`,e.style.zIndex=`0`;return}if(n>3){e.style.opacity=`0`,e.style.pointerEvents=`none`,e.style.transform=`translateY(90px) scale(0.76)`,e.style.zIndex=`0`;return}e.style.opacity=`1`,e.style.zIndex=String(100-n),e.style.pointerEvents=n===0?`auto`:`none`,e.style.transform=`
        translateY(${n*28}px)
        scale(${1-n*.06})
      `})}o(),a.forEach((e,t)=>{let r=0,a=0,s=!1;e.addEventListener(`pointerdown`,n=>{t===i&&(s=!0,r=n.clientX,a=r,e.setPointerCapture(n.pointerId),e.style.transition=`none`)}),e.addEventListener(`pointermove`,n=>{if(!s||t!==i)return;a=n.clientX;let o=a-r;e.style.transform=`
        translateX(${o}px)
        rotate(${o*.05}deg)
      `}),e.addEventListener(`pointerup`,()=>{if(!s||t!==i)return;s=!1;let c=a-r;if(c<-100&&i<n.length-1){e.style.transition=`0.35s ease`,e.style.transform=`translateX(-120%) rotate(-18deg)`,e.style.opacity=`0`,i+=1,setTimeout(o,220);return}if(c>100&&i>0){--i,o();return}o()})})}var a={createToast:t,createModal:n,createTabBar:r,createSwipeCards:i};return typeof window<`u`&&(window.Pocket=a),e.Pocket=a,e})({});