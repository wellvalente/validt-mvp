(function () {
  const path = location.pathname.replace(/\\/g, "/");
  const inArea = /\/area\//.test(path);
  const prefix = inArea ? "../" : "";
  const logged = localStorage.getItem("validt_user");
  const page = document.body.dataset.page;
  const shell = document.body.dataset.shell;

  function money(v) {
    if (v === 0) return "Gratuito";
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function toast(text) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = text;
    el.style.display = "block";
    setTimeout(() => { el.style.display = "none"; }, 2200);
  }

  window.VALIDT_UI = { money, prefix, logged, toast };

  const accountMenu = logged
    ? `<div class="drop" id="account-drop">
         <button class="btn btn-outline" type="button" id="minha-area">Minha área</button>
         <div class="drop-menu">
           <a href="${prefix}area/index.html">Dashboard</a>
           <a href="${prefix}area/perfil.html">Meu perfil</a>
           <button type="button" id="logout">Sair</button>
         </div>
       </div>`
    : `<a class="btn btn-ghost" href="${prefix}entrar.html">Entrar</a>
       <a class="btn btn-primary" href="${prefix}criar-conta.html">Criar conta</a>`;

  if (shell !== "app") {
    const header = document.getElementById("site-header");
    if (header) {
      header.innerHTML = `
        <a class="skip" href="#conteudo">Pular para o conteúdo</a>
        <div class="header-inner">
          <a class="brand" href="${prefix}index.html"><img class="brand-mark" src="${prefix}assets/img/logo-validt.png" alt="Validt" /><span>VALIDT</span></a>
          <nav class="nav-main">
            <a href="${prefix}index.html" data-nav="inicio">Início</a>
            <a href="${prefix}cursos.html" data-nav="cursos">Cursos</a>
            <a href="${prefix}mentoria.html" data-nav="mentoria">Mentoria</a>
            <a href="${prefix}sobre.html" data-nav="sobre">Sobre</a>
            <a href="${prefix}contato.html" data-nav="contato">Contato</a>
          </nav>
          <div class="header-actions">
            <button class="icon-btn" type="button" id="open-search" title="Buscar cursos">⌕</button>
            ${accountMenu}
          </div>
        </div>`;
      header.querySelectorAll("[data-nav]").forEach((a) => {
        if (a.dataset.nav === page) a.classList.add("active");
      });
    }

    const footer = document.getElementById("site-footer");
    if (footer) {
      footer.innerHTML = `
        <div class="footer-inner">
          <div>
            <div class="brand"><img class="brand-mark" src="${prefix}assets/img/logo-validt-dark.png" alt="Validt" /><span>VALIDT</span></div>
            <p>Validt Consultoria e Treinamentos — precisão, crescimento e excelência industrial.</p>
          </div>
          <div>
            <h3>Plataforma</h3>
            <p><a href="${prefix}cursos.html">Cursos</a></p>
            <p><a href="${prefix}certificado.html">Validar certificado</a></p>
          </div>
          <div>
            <h3>Institucional</h3>
            <p><a href="${prefix}sobre.html">Sobre a Validt</a></p>
            <p><a href="${prefix}contato.html">Contato</a></p>
          </div>
          <div>
            <h3>Legal</h3>
            <p><a href="${prefix}termos.html">Termos e privacidade</a></p>
            <p><a href="${prefix}cursos-livres.html">Cursos livres</a></p>
          </div>
        </div>
        <div class="legal">© 2026 Validt Consultoria e Treinamentos</div>`;
    }
  }

  if (shell === "app") {
    const nav = [
      ["index.html", "area-home", "▦", "Visão geral"],
      ["cursos.html", "area-cursos", "▤", "Meus cursos"],
      ["favoritos.html", "area-fav", "♡", "Favoritos"],
      ["certificados.html", "area-cert", "✦", "Certificados"],
      ["contratos.html", "area-cont", "☰", "Contratos"],
      ["mentoria.html", "area-ment", "💬", "Mentoria"],
      ["perfil.html", "area-perfil", "👤", "Meu perfil"]
    ];
    const extra = [
      ["perfil.html#seguranca", "Segurança"],
      ["perfil.html#notificacoes", "Notificações"],
      ["../contato.html", "Suporte"]
    ];
    const shellEl = document.getElementById("app-shell");
    if (shellEl) {
      shellEl.innerHTML = `
        <div class="overlay" id="overlay"></div>
        <aside class="sidebar" id="sidebar">
          <a class="brand" href="index.html" style="margin: 0 8px 18px"><img class="brand-mark" src="../assets/img/logo-validt-dark.png" alt="Validt" /><span>VALIDT</span></a>
          ${nav.map(([href, key, icon, label]) =>
            `<a class="${page === key ? "active" : ""}" href="${href}">${icon} ${label}</a>`
          ).join("")}
          <div class="sep"></div>
          ${extra.map(([href, label]) => `<a href="${href}">${label}</a>`).join("")}
          <button class="nav-btn" type="button" id="logout">Sair</button>
        </aside>`;
    }
    const top = document.getElementById("app-top");
    if (top) {
      top.innerHTML = `
        <button class="icon-btn" type="button" id="menu-btn" aria-label="Menu">☰</button>
        <a class="brand" href="index.html"><img class="brand-mark" src="../assets/img/logo-validt.png" alt="Validt" /><span>VALIDT</span></a>`;
    }
  }

  document.addEventListener("click", (e) => {
    if (e.target.id === "minha-area") {
      document.getElementById("account-drop")?.classList.toggle("open");
    } else if (!e.target.closest(".drop")) {
      document.getElementById("account-drop")?.classList.remove("open");
    }
    if (e.target.id === "logout") {
      localStorage.removeItem("validt_user");
      location.href = prefix + "index.html";
    }
    if (e.target.id === "menu-btn" || e.target.id === "overlay") {
      document.getElementById("sidebar")?.classList.toggle("open");
      document.getElementById("overlay")?.classList.toggle("open");
    }
  });

  const modal = document.createElement("div");
  modal.className = "search-modal";
  modal.innerHTML = `<div class="search-box"><input class="search-field" id="search-input" placeholder="Buscar cursos..." /><div class="search-results" id="search-results"></div></div>`;
  document.body.appendChild(modal);

  const toastEl = document.createElement("div");
  toastEl.className = "toast";
  toastEl.id = "toast";
  document.body.appendChild(toastEl);

  document.addEventListener("click", (e) => {
    if (e.target.id === "open-search") {
      modal.classList.add("open");
      document.getElementById("search-input").focus();
    } else if (e.target === modal) {
      modal.classList.remove("open");
    }
  });

  document.addEventListener("input", (e) => {
    if (e.target.id !== "search-input") return;
    const q = e.target.value.toLowerCase();
    const hits = (window.VALIDT.courses || []).filter((c) =>
      (c.title + c.category + c.summary).toLowerCase().includes(q)
    );
    document.getElementById("search-results").innerHTML = hits.length
      ? hits.map((c) => `<a href="${prefix}curso.html?id=${c.id}">${c.title}</a>`).join("")
      : "<p class='meta'>Nenhum curso encontrado.</p>";
  });
})();
