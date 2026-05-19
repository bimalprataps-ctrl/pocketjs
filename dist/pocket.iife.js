var Pocket=(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:`Module`});function t(e={}){let{message:t=`Pocket Touch toast`,duration:n=2500,position:r=`bottom`}=e,i=document.createElement(`div`);return i.className=`pocket-toast pocket-toast-${r}`,i.textContent=t,document.body.appendChild(i),requestAnimationFrame(()=>{i.classList.add(`show`)}),setTimeout(()=>{i.classList.remove(`show`),setTimeout(()=>i.remove(),300)},n),i}function n(e={}){let{title:t=``,content:n=``}=e,r=document.createElement(`div`);r.className=`pocket-modal-overlay`;let i=document.createElement(`div`);i.className=`pocket-modal`,i.innerHTML=`
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
      `}),e.addEventListener(`pointerup`,()=>{if(!s||t!==i)return;s=!1;let c=a-r;if(c<-100&&i<n.length-1){e.style.transition=`0.35s ease`,e.style.transform=`translateX(-120%) rotate(-18deg)`,e.style.opacity=`0`,i+=1,setTimeout(o,220);return}if(c>100&&i>0){--i,o();return}o()})})}function a({trigger:e,sheet:t,backdrop:n,snapPoints:r=[`peek`,`middle`,`full`]}){let i=document.querySelector(e),a=document.querySelector(t),o=n?document.querySelector(n):null;if(!i||!a){console.warn(`Pocket Touch BottomSheet: Missing trigger or sheet`);return}let s=0,c={peek:72,middle:38,full:0};function l(e){a.style.transform=`translateY(${e}%)`}function u(e){s=e;let t=c[r[e]]??72;a.style.transition=`transform 700ms cubic-bezier(0.22, 1, 0.36, 1)`,l(t),o&&(e===0?(o.style.opacity=`0`,o.style.pointerEvents=`none`):(o.style.opacity=`1`,o.style.pointerEvents=`auto`))}i.addEventListener(`click`,()=>{s=(s+1)%r.length,u(s)}),o&&o.addEventListener(`click`,()=>{s=0,u(0)});let d=0,f=0,p=!1;a.addEventListener(`pointerdown`,e=>{p=!0,d=e.clientY,f=0,a.style.transition=`none`,a.setPointerCapture(e.pointerId)}),a.addEventListener(`pointermove`,e=>{p&&(f=e.clientY-d,l((s===0?c.peek:s===1?c.middle:c.full)+f/10))});function m(){p&&(p=!1,f<-60&&(s=Math.min(s+1,r.length-1)),f>60&&(s=Math.max(s-1,0)),u(s))}return a.addEventListener(`pointerup`,m),a.addEventListener(`pointercancel`,m),a.style.willChange=`transform`,a.style.touchAction=`none`,o&&(o.style.transition=`opacity 400ms ease`,o.style.opacity=`0`,o.style.pointerEvents=`none`),u(0),{open(){s=2,u(2)},close(){s=0,u(0)},snap(e){s=Math.max(0,Math.min(e,r.length-1)),u(s)},destroy(){i.replaceWith(i.cloneNode(!0)),a.replaceWith(a.cloneNode(!0)),o&&o.replaceWith(o.cloneNode(!0))}}}var o={createToast:t,createModal:n,createTabBar:r,createSwipeCards:i,createBottomSheet:a};return typeof window<`u`&&(window.Pocket=o),e.Pocket=o,e.createBottomSheet=a,e.createModal=n,e.createSwipeCards=i,e.createTabBar=r,e.createToast=t,e})({});