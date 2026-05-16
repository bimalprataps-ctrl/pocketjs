window.Pocket = {
  createBottomSheet(config = {}) {
    if (!document.getElementById('pocketjs-styles')) {
      const style = document.createElement('style')
      style.id = 'pocketjs-styles'
      style.innerHTML = `
        .pocket-overlay{
          position:fixed;
          inset:0;
          background:rgba(0,0,0,.28);
          backdrop-filter:blur(10px);
          z-index:9998;
        }

        .pocket-sheet{
          position:fixed;
          left:0;
          right:0;
          bottom:0;
          z-index:9999;
          padding:18px 24px 34px;
          border-radius:30px 30px 0 0;
          background:rgba(255,255,255,.92);
          font-family:-apple-system,BlinkMacSystemFont,system-ui,sans-serif;
          box-shadow:0 -24px 70px rgba(0,0,0,.22);
          animation:pocketSheetUp .25s ease;
        }

        .pocket-handle{
          width:44px;
          height:5px;
          border-radius:999px;
          background:rgba(0,0,0,.2);
          margin:0 auto 20px;
        }

        .pocket-sheet h2{
          margin:0 0 12px;
          font-size:30px;
          letter-spacing:-.04em;
          color:#111;
        }

        .pocket-sheet p{
          color:#6e6e73;
          font-size:17px;
          line-height:1.5;
        }

        .pocket-close{
          border:0;
          border-radius:999px;
          padding:14px 22px;
          background:#007aff;
          color:white;
          font-size:16px;
        }

        @keyframes pocketSheetUp{
          from{transform:translateY(100%);}
          to{transform:translateY(0);}
        }
      `
      document.head.appendChild(style)
    }

    const sheetRoot = document.createElement('div')

    sheetRoot.innerHTML = `
      <div class="pocket-overlay"></div>
      <section class="pocket-sheet">
        <div class="pocket-handle"></div>
        <h2>${config.title || 'Pocket Sheet'}</h2>
        <p>${config.text || 'This is a PocketJS bottom sheet.'}</p>
        <button class="pocket-close">Done</button>
      </section>
    `

    document.body.appendChild(sheetRoot)

    sheetRoot.querySelector('.pocket-overlay').onclick = () => sheetRoot.remove()
    sheetRoot.querySelector('.pocket-close').onclick = () => sheetRoot.remove()
  }
}