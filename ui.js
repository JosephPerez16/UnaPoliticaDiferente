/* =========================================================
   UI.JS — Interacciones de interfaz
   Modo claro/oscuro (guardado en users.theme de Supabase),
   sidebar, navegación, notificaciones.
   Sin localStorage. Sin sessionStorage.
   ========================================================= */

/* ── THEME: carga inicial ─────────────────────────────── */
// Al arrancar la página no hay sesión aún; se usa 'light' por defecto.
// El tema real del usuario se aplica en script.js tras el login
// vía applyTheme(profile.theme).
(function initTheme() {
  document.documentElement.setAttribute("data-theme", "light");
  updateThemeIcons("light");
})();

function updateThemeIcons(theme) {
  var sun  = document.getElementById("themeIconSun");
  var moon = document.getElementById("themeIconMoon");
  if (!sun || !moon) return;
  if (theme === "dark") { sun.style.display = "none"; moon.style.display = ""; }
  else                  { sun.style.display = "";     moon.style.display = "none"; }
}

// Exponer para que script.js llame a updateThemeIcons al aplicar el tema
window.updateThemeIcons = updateThemeIcons;

document.addEventListener("DOMContentLoaded", function () {

  /* ── THEME TOGGLE ──────────────────────────────────── */
  var themeBtn = document.getElementById("themeToggleBtn");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme") || "light";
      var next    = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      updateThemeIcons(next);

      // Guardar preferencia en Supabase (users.theme)
      var session = typeof window.getSession === "function" ? window.getSession() : null;
      if (session && window.supabase) {
        window.supabase
          .from("users")
          .update({ theme: next })
          .eq("id", session.id)
          .then(function (res) {
            if (res.error) console.warn("theme save:", res.error.message);
            else if (session) session.theme = next; // actualizar en memoria
          });
      }
    });
  }

  /* ── SIDEBAR NAVIGATION ───────────────────────────── */
  var TOPBAR_H = 64; // altura topbar + margen

  var navItems = document.querySelectorAll(".nav-item[data-panel]");
  var panelMap = {
    overview:  document.getElementById("panelOverview"),
    registro:  document.getElementById("panelRegistro"),
    consulta:  document.getElementById("panelConsulta"),
    usuarios:  document.getElementById("usersSection"),
    auditoria: document.getElementById("panelAudit"),
  };

  function activateNavItem(targetPanel) {
    navItems.forEach(function (item) {
      item.classList.toggle("active", item.dataset.panel === targetPanel);
    });
  }

  function scrollToPanel(el) {
    if (!el) return;
    var top = el.getBoundingClientRect().top + window.pageYOffset - TOPBAR_H;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }

  navItems.forEach(function (item) {
    item.addEventListener("click", function () {
      var panel = item.dataset.panel;
      if (!panel) return;

      if (panel === "usuarios" || panel === "auditoria") {
        var target2 = panelMap[panel];
        if (target2 && target2.classList.contains("section-hidden")) {
          showNotif("Acceso restringido", "Solo el Administrador puede acceder a esta sección.", "error");
          return;
        }
      }

      activateNavItem(panel);
      scrollToPanel(panelMap[panel]);
      closeSidebar();
    });
  });

  /* ── NAV GROUP COLLAPSE ───────────────────────────── */
  document.querySelectorAll(".nav-group-header[data-target]").forEach(function (hdr) {
    hdr.addEventListener("click", function () {
      var group = document.getElementById(hdr.dataset.target);
      if (!group) return;
      var isOpen = hdr.classList.contains("open");
      if (isOpen) {
        hdr.classList.remove("open");
        hdr.setAttribute("aria-expanded", "false");
        group.classList.add("collapsed");
      } else {
        hdr.classList.add("open");
        hdr.setAttribute("aria-expanded", "true");
        group.classList.remove("collapsed");
      }
    });
    hdr.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); hdr.click(); }
    });
  });

  /* ── SIDEBAR MOBILE ────────────────────────────────── */
  var sidebar   = document.getElementById("appSidebar");
  var overlay   = document.getElementById("sidebarOverlay");
  var toggleBtn = document.getElementById("sidebarToggleBtn");

  function openSidebar() {
    if (!sidebar) return;
    sidebar.classList.add("open");
    overlay  && overlay.classList.add("visible");
    toggleBtn && toggleBtn.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    if (!sidebar) return;
    sidebar.classList.remove("open");
    overlay  && overlay.classList.remove("visible");
    toggleBtn && toggleBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (toggleBtn) toggleBtn.addEventListener("click", function () {
    sidebar && sidebar.classList.contains("open") ? closeSidebar() : openSidebar();
  });
  if (overlay) overlay.addEventListener("click", closeSidebar);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sidebar && sidebar.classList.contains("open")) closeSidebar();
  });

  /* ── TOPBAR SEARCH SYNC ─────────────────────────────── */
  var topbarSearch = document.getElementById("topbarSearchInput");
  var mainSearch   = document.getElementById("searchInput");
  if (topbarSearch && mainSearch) {
    topbarSearch.addEventListener("input", function () {
      mainSearch.value = topbarSearch.value;
      mainSearch.dispatchEvent(new Event("input", { bubbles: true }));
    });
  }

  /* ── INTERSECTION OBSERVER para nav highlighting ──── */
  var observerOptions = { root: null, rootMargin: "-68px 0px -55% 0px", threshold: 0 };
  var sectionPanelMap = {
    panelOverview: "overview",
    panelRegistro: "registro",
    panelConsulta: "consulta",
    usersSection:  "usuarios",
    panelAudit:    "auditoria",
  };

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var panel = sectionPanelMap[entry.target.id];
        if (panel) activateNavItem(panel);
      }
    });
  }, observerOptions);

  Object.keys(sectionPanelMap).forEach(function (id) {
    var el = document.getElementById(id);
    if (el) observer.observe(el);
  });

});

/* ── UPDATE SIDEBAR USER INFO ─────────────────────────── */
function updateSidebarUser(session) {
  if (!session) return;
  var avatar = document.getElementById("sidebarAvatar");
  var nameEl = document.getElementById("sidebarUserName");
  var roleEl = document.getElementById("sidebarUserRole");

  if (avatar) {
    var initials = (session.name || "U").trim().split(" ").map(function (w) {
      return w[0] || "";
    }).slice(0, 2).join("").toUpperCase();
    avatar.textContent = initials;
  }
  if (nameEl) nameEl.textContent = session.name || session.username || "Usuario";
  if (roleEl) roleEl.textContent = session.role || "—";
}

/* ── NOTIFICATIONS ────────────────────────────────────── */
function showNotif(title, message, type) {
  type = type || "info";
  var container = document.getElementById("notifContainer");
  if (!container) return;

  var icons = {
    success: '<svg class="notif-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    error:   '<svg class="notif-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
    warning: '<svg class="notif-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    info:    '<svg class="notif-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
  };

  var el = document.createElement("div");
  el.className = "notif " + type;
  el.setAttribute("role", "status");
  el.innerHTML =
    (icons[type] || icons.info) +
    '<div class="notif-body">' +
      '<div class="notif-title">' + escapeNotifHtml(title)   + '</div>' +
      '<div class="notif-msg">'   + escapeNotifHtml(message) + '</div>' +
    '</div>' +
    '<button class="notif-dismiss" type="button" aria-label="Cerrar notificación">×</button>';

  container.appendChild(el);
  el.querySelector(".notif-dismiss").addEventListener("click", function () { dismissNotif(el); });
  setTimeout(function () { dismissNotif(el); }, 4500);
}

function dismissNotif(el) {
  if (!el || !el.parentNode) return;
  el.classList.add("notif-leaving");
  setTimeout(function () { el.parentNode && el.parentNode.removeChild(el); }, 240);
}

function escapeNotifHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/* ── PATCHES (se aplican en load, cuando script.js ya corrió) ── */
window.addEventListener("load", function () {

  /* ── Interceptar showMessage para mostrar notif también ── */
  var origShowMessage = window.showMessage;
  if (typeof origShowMessage === "function") {
    window.showMessage = function (element, message, type) {
      origShowMessage(element, message, type);
      var typeMap = { success: "success", error: "error", info: "info" };
      if (message) showNotif(
        type === "success" ? "Operación exitosa" : type === "error" ? "Error" : "Aviso",
        message,
        typeMap[type] || "info"
      );
    };
  }

  /* ── Parchear loadDashboard para actualizar sidebar y auditoría ── */
  var origLoadDashboard = window.loadDashboard;
  if (typeof origLoadDashboard === "function") {
    window.loadDashboard = async function () {
      await origLoadDashboard();
      var session = typeof window.getSession === "function" ? window.getSession() : null;
      if (session) updateSidebarUser(session);
      // @ts-ignore
      if (typeof window.updateAuditAccess === "function") window.updateAuditAccess();
    };
  }

  /* ── Parchear updateAdminAccess para refrescar acceso a auditoría ── */
  var origUpdateAdminAccess = window.updateAdminAccess;
  if (typeof origUpdateAdminAccess === "function") {
    window.updateAdminAccess = function () {
      origUpdateAdminAccess();
      // @ts-ignore
      if (typeof window.updateAuditAccess === "function") window.updateAuditAccess();
    };
  }

  /* ── Actualizar sidebar si ya hay sesión activa ─────── */
  var session = typeof window.getSession === "function" ? window.getSession() : null;
  if (session) {
    updateSidebarUser(session);
    // @ts-ignore
    if (typeof window.updateAuditAccess === "function") window.updateAuditAccess();
  }

  /* ── Redibujar gráfica al cambiar de tema ───────────── */
  var themeToggle = document.getElementById("themeToggleBtn");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      setTimeout(function () {
        if (typeof window.drawProvinceChart === "function") window.drawProvinceChart();
      }, 240);
    });
  }

});
