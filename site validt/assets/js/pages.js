(function () {
  const { money, toast } = window.VALIDT_UI;
  const courses = window.VALIDT.courses;
  const page = document.body.dataset.page;
  const base = document.body.dataset.shell === "app" ? "../" : "";

  function card(c) {
    return `
      <a class="course-card" href="${base}curso.html?id=${c.id}">
        <div class="course-cover" style="--cover:${c.cover}"></div>
        <div class="course-body">
          <div class="badges">
            ${c.launch ? '<span class="badge">Lançamento</span>' : ""}
            <span class="badge level">${c.category} · ${c.level}</span>
            ${c.certificate ? '<span class="badge ok">Certificado</span>' : ""}
          </div>
          <h3>${c.title}</h3>
          <p class="meta">${c.instructor} · ${c.students} alunos · ${c.hours}h · ${c.lessons} aulas</p>
          <div class="price">${money(c.price)}${c.oldPrice ? `<s>${money(c.oldPrice)}</s>` : ""}</div>
        </div>
      </a>`;
  }

  if (page === "inicio") {
    // Página institucional renderizada em HTML estático.
  }

  if (page === "cursos") {
    const grid = document.getElementById("catalog");
    const q = document.getElementById("q");
    const level = document.getElementById("level");
    const cat = document.getElementById("cat");
    const free = document.getElementById("free");
    const cert = document.getElementById("cert");
    const sort = document.getElementById("sort");
    const count = document.getElementById("count");
    if (cat) {
      const cats = [...new Set(courses.map((c) => c.category))];
      cat.innerHTML = `<option value="todas">Todas as categorias</option>` + cats.map((c) => `<option>${c}</option>`).join("");
    }
    function apply() {
      let list = courses.filter((c) => {
        const text = (c.title + c.category + c.summary).toLowerCase();
        if (q.value && !text.includes(q.value.toLowerCase())) return false;
        if (level.value !== "todos" && c.level !== level.value) return false;
        if (cat && cat.value !== "todas" && c.category !== cat.value) return false;
        if (free.checked && c.price !== 0) return false;
        if (cert.checked && !c.certificate) return false;
        return true;
      });
      if (sort.value === "preco") list = list.slice().sort((a, b) => a.price - b.price);
      if (sort.value === "horas") list = list.slice().sort((a, b) => b.hours - a.hours);
      count.textContent = `${list.length} curso(s)`;
      grid.innerHTML = list.map(card).join("") || "<p>Nenhum curso com esses filtros.</p>";
    }
    [q, level, cat, free, cert, sort].forEach((el) => el && el.addEventListener("input", apply));
    document.getElementById("clear").onclick = () => {
      q.value = "";
      level.value = "todos";
      if (cat) cat.value = "todas";
      free.checked = false;
      cert.checked = false;
      sort.value = "relevantes";
      apply();
    };
    apply();
  }

  if (page === "curso") {
    const id = new URLSearchParams(location.search).get("id") || courses[0].id;
    const c = courses.find((x) => x.id === id) || courses[0];
    const owned = JSON.parse(localStorage.getItem("validt_owned") || "[]");
    document.getElementById("crumb-name").textContent = c.title;
    document.getElementById("course-main").innerHTML = `
      <p class="kicker">${c.category}</p>
      <h1>${c.title}</h1>
      <p class="lead">${c.summary}</p>
      <p class="meta">${c.students} alunos · ${c.hours} h · ${c.level} · ${c.instructor}</p>
      <h2>O que você vai aprender</h2>
      <ul class="checklist">${c.outcomes.map((o) => `<li>${o}</li>`).join("")}</ul>
      <h2>Ementa</h2>
      <div class="syllabus">${c.modules.map((m, i) => `
        <details ${i === 0 ? "open" : ""}>
          <summary>${m.title} · ${m.lessons.length} aulas</summary>
          <ol>${m.lessons.map((l) => `<li>${l}</li>`).join("")}</ol>
        </details>`).join("")}</div>
      <h2>Materiais de complemento</h2>
      <p class="meta">Liberados após a compra</p>
      <ul>${c.materials.map((m) => `<li class="locked">${m}</li>`).join("")}</ul>
      <h2>Para quem é</h2>
      <ul>${c.audience.map((a) => `<li>${a}</li>`).join("")}</ul>
      <h2>Requisitos</h2>
      <ul>${c.requirements.map((a) => `<li>${a}</li>`).join("")}</ul>
      <button class="btn btn-outline" type="button" id="copy-link">Copiar link</button>
    `;
    document.getElementById("buy-card").innerHTML = owned.includes(c.id)
      ? `<p class="kicker">Matriculado</p><a class="btn btn-primary btn-lg" style="width:100%" href="area/aprender.html?id=${c.id}">Continuar aulas</a>`
      : `<div class="price" style="font-size:1.6rem">${money(c.price)}</div>
         ${c.oldPrice ? `<p class="meta">de <s>${money(c.oldPrice)}</s></p>` : ""}
         <p><a class="btn btn-primary btn-lg" style="width:100%;margin:12px 0" href="checkout.html?id=${c.id}">Comprar agora</a></p>
         <button class="btn btn-outline" style="width:100%" type="button" id="fav">Adicionar aos favoritos</button>
         <ul class="checklist">
           <li>${c.lessons} aulas em vídeo</li>
           <li>${c.hours} h de conteúdo</li>
           <li>${c.certificate ? "Certificado de conclusão" : "Sem certificado"}</li>
           <li>Acesso vitalício (mock)</li>
         </ul>`;
    document.getElementById("copy-link").onclick = async () => {
      await navigator.clipboard.writeText(location.href);
      toast("Link copiado.");
    };
    const fav = document.getElementById("fav");
    if (fav) {
      fav.onclick = () => {
        const list = JSON.parse(localStorage.getItem("validt_fav") || "[]");
        if (!list.includes(c.id)) list.push(c.id);
        localStorage.setItem("validt_fav", JSON.stringify(list));
        toast("Adicionado aos favoritos.");
      };
    }
  }

  if (page === "certificado") {
    document.getElementById("validate").onclick = () => {
      const code = document.getElementById("code").value.trim();
      const out = document.getElementById("result");
      if (code.toUpperCase() === "VALIDT-DEMO") {
        out.innerHTML = `<div class="tile"><strong>Certificado válido</strong><p>Aluno: Maria Exemplo<br>Curso: Inspeção visual de qualidade na linha<br>Código: VALIDT-DEMO</p></div>`;
      } else {
        out.innerHTML = "<p>Código não encontrado. Tente <strong>VALIDT-DEMO</strong>.</p>";
      }
    };
  }

  if (page === "entrar" || page === "criar") {
    document.getElementById("auth-form").onsubmit = (e) => {
      e.preventDefault();
      localStorage.setItem("validt_user", document.getElementById("email").value || "aluno@validt.local");
      location.href = "area/index.html";
    };
  }

  if (page === "contato") {
    document.getElementById("contact-form").onsubmit = (e) => {
      e.preventDefault();
      toast("Mensagem enviada (mock).");
      e.target.reset();
    };
  }

  if (page === "checkout") {
    const id = new URLSearchParams(location.search).get("id") || courses[0].id;
    const c = courses.find((x) => x.id === id) || courses[0];
    document.getElementById("checkout-summary").innerHTML = `<h2>${c.title}</h2><p class="price">${money(c.price)}</p><p class="meta">Pagamento simulado. Nenhum dado é enviado.</p>`;
    document.getElementById("pay").onclick = () => {
      const owned = JSON.parse(localStorage.getItem("validt_owned") || "[]");
      if (!owned.includes(c.id)) owned.push(c.id);
      localStorage.setItem("validt_owned", JSON.stringify(owned));
      const contracts = JSON.parse(localStorage.getItem("validt_contracts") || "[]");
      contracts.push({ id: c.id, title: c.title, at: new Date().toLocaleString("pt-BR"), version: "v1" });
      localStorage.setItem("validt_contracts", JSON.stringify(contracts));
      if (!localStorage.getItem("validt_user")) localStorage.setItem("validt_user", "aluno@validt.local");
      location.href = "area/aprender.html?id=" + c.id;
    };
  }

  if (page === "mentoria") {
    const terms = document.getElementById("terms");
    const sub = document.getElementById("subscribe");
    if (terms && sub) {
      terms.onchange = () => { sub.disabled = !terms.checked; };
      sub.onclick = () => {
        if (!localStorage.getItem("validt_user")) localStorage.setItem("validt_user", "aluno@validt.local");
        localStorage.setItem("validt_mentor", "1");
        location.href = "area/mentoria.html";
      };
    }
  }

  if (page === "area-home") {
    const owned = JSON.parse(localStorage.getItem("validt_owned") || "[]");
    const mine = courses.filter((c) => owned.includes(c.id));
    const hours = mine.reduce((s, c) => s + c.hours * 0.35, 0);
    document.getElementById("stat-courses").textContent = mine.length;
    document.getElementById("stat-certs").textContent = "0";
    document.getElementById("stat-hours").textContent = hours.toFixed(1) + "h";
    const empty = document.getElementById("empty-courses");
    const list = document.getElementById("continue-courses");
    if (mine.length) {
      empty.style.display = "none";
      list.innerHTML = mine.map((c) => `
        <div class="tile">
          <h3>${c.title}</h3>
          <div class="progress"><span style="width:35%"></span></div>
          <p><a class="btn btn-primary" href="aprender.html?id=${c.id}">Continuar</a></p>
        </div>`).join("");
    }
    document.getElementById("buy-grid").innerHTML = courses.slice(0, 6).map(card).join("");
  }

  if (page === "area-cursos") {
    const owned = JSON.parse(localStorage.getItem("validt_owned") || "[]");
    const mine = courses.filter((c) => owned.includes(c.id));
    const box = document.getElementById("list-box");
    function render() {
      box.innerHTML = mine.length
        ? mine.map((c) => `<div class="tile"><h3>${c.title}</h3><p class="meta">${c.category}</p><a class="btn btn-primary" href="aprender.html?id=${c.id}">Abrir</a></div>`).join("")
        : `<div class="empty-box">Nenhum curso nesta lista.</div>`;
    }
    document.querySelectorAll(".tab").forEach((tab) => {
      tab.onclick = () => {
        document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        render();
      };
    });
    render();
  }

  if (page === "area-fav") {
    const fav = JSON.parse(localStorage.getItem("validt_fav") || "[]");
    const list = courses.filter((c) => fav.includes(c.id));
    document.getElementById("fav-box").innerHTML = list.length
      ? `<div class="course-grid">${list.map(card).join("")}</div>`
      : `<div class="empty-box">Você ainda não tem cursos favoritos.</div>`;
  }

  if (page === "area-cert") {
    const owned = JSON.parse(localStorage.getItem("validt_owned") || "[]");
    document.getElementById("cert-box").innerHTML = owned.length
      ? `<div class="tile"><h3>Certificado disponível ao concluir</h3><p>Código de demonstração: VALIDT-DEMO</p><a class="btn btn-outline" href="../certificado.html">Validar publicamente</a></div>`
      : `<div class="empty-box">Nenhum certificado emitido. Conclua um curso para desbloquear.</div>`;
  }

  if (page === "area-cont") {
    const contracts = JSON.parse(localStorage.getItem("validt_contracts") || "[]");
    document.getElementById("cont-box").innerHTML = contracts.length
      ? contracts.map((c) => `<div class="tile"><h3>${c.title}</h3><p class="meta">${c.at} · ${c.version}</p></div>`).join("")
      : `<div class="empty-box">
           <div class="empty-icon">📄</div>
           <h2>Nenhum contrato ainda</h2>
           <p>Ao adquirir um curso, o contrato aceito aparecerá aqui.</p>
           <a class="btn btn-primary" href="../cursos.html">Ver cursos</a>
         </div>`;
  }

  if (page === "area-perfil") {
    const pf = document.getElementById("pf");
    const pj = document.getElementById("pj");
    const block = document.getElementById("legal-fields");
    function legal(type) {
      pf.classList.toggle("active", type === "pf");
      pj.classList.toggle("active", type === "pj");
      block.innerHTML = type === "pf"
        ? `<label>CPF<input class="field" placeholder="000.000.000-00" /></label>`
        : `<label>Razão social<input class="field" /></label>
           <label>CNPJ<input class="field" placeholder="00.000.000/0000-00" /></label>
           <label>Representante legal<input class="field" /></label>
           <label>CPF do representante<input class="field" /></label>`;
    }
    pf.onclick = () => legal("pf");
    pj.onclick = () => legal("pj");
    legal("pf");
    document.getElementById("save-profile").onclick = (e) => {
      e.preventDefault();
      toast("Alterações salvas (mock).");
    };
  }

  if (page === "aula") {
    const id = new URLSearchParams(location.search).get("id") || courses[0].id;
    const c = courses.find((x) => x.id === id) || courses[0];
    const lessons = c.modules.flatMap((m) => m.lessons);
    const i = Number(new URLSearchParams(location.search).get("aula") || 0);
    document.getElementById("video-title").textContent = lessons[i] || c.title;
    document.getElementById("lesson-list").innerHTML = lessons.map((l, idx) =>
      `<a class="${idx === i ? "active" : ""}" href="aprender.html?id=${c.id}&aula=${idx}">${idx + 1}. ${l}</a>`
    ).join("");
    document.getElementById("materials").innerHTML = c.materials.map((m) => `<li>${m}</li>`).join("");
    document.getElementById("emit").onclick = () => toast("Certificado emitido (mock). Código VALIDT-DEMO");
  }
})();
