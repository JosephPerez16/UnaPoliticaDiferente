const DOM = {
  showLogin: document.getElementById("showLogin"),
  showRegister: document.getElementById("showRegister"),
  loginForm: document.getElementById("loginForm"),
  registerForm: document.getElementById("registerForm"),
  authMessage: document.getElementById("authMessage"),
  authSection: document.getElementById("authSection"),
  dashboardSection: document.getElementById("dashboardSection"),
  currentUserInfo: document.getElementById("currentUserInfo"),
  logoutBtn: document.getElementById("logoutBtn"),
  exportBtn: document.getElementById("exportBtn"),
  manageUsersBtn: document.getElementById("manageUsersBtn"),
  voterForm: document.getElementById("voterForm"),
  voterMessage: document.getElementById("voterMessage"),
  votersTableBody: document.getElementById("votersTableBody"),
  usersTableBody: document.getElementById("usersTableBody"),
  searchResults: document.getElementById("searchResults"),
  filteredCountBadge: document.getElementById("filteredCountBadge"),
  userPermissionsNote: document.getElementById("userPermissionsNote"),
  searchInput: document.getElementById("searchInput"),
  filterProvince: document.getElementById("filterProvince"),
  filterMunicipio: document.getElementById("filterMunicipio"),
  filterSector: document.getElementById("filterSector"),
  filterMesa: document.getElementById("filterMesa"),
  filterRole: document.getElementById("filterRole"),
  filterRegistrar: document.getElementById("filterRegistrar"),
  clearFiltersBtn: document.getElementById("clearFiltersBtn"),
  totalVoters: document.getElementById("totalVoters"),
  totalUsers: document.getElementById("totalUsers"),
  todayVoters: document.getElementById("todayVoters"),
  activeProvinces: document.getElementById("activeProvinces"),
  editingUserId: document.getElementById("editingUserId"),
  registerFormTitle: document.getElementById("registerFormTitle"),
  saveUserBtn: document.getElementById("saveUserBtn"),
  cancelEditUserBtn: document.getElementById("cancelEditUserBtn"),
  firstUserHint: document.getElementById("firstUserHint"),
  registerName: document.getElementById("registerName"),
  registerUsername: document.getElementById("registerUsername"),
  registerRole: document.getElementById("registerRole"),
  registerEmail: document.getElementById("registerEmail"),
  registerPhone: document.getElementById("registerPhone"),
  registerProvince: document.getElementById("registerProvince"),
  registerRegion: document.getElementById("registerRegion"),
  registerMunicipio: document.getElementById("registerMunicipio"),
  registerDistrito: document.getElementById("registerDistrito"),
  registerZone: document.getElementById("registerZone"),
  registerPassword: document.getElementById("registerPassword"),
  registerPasswordConfirm: document.getElementById("registerPasswordConfirm"),
  voterName: document.getElementById("voterName"),
  voterCedula: document.getElementById("voterCedula"),
  voterPhone: document.getElementById("voterPhone"),
  voterProvince: document.getElementById("voterProvince"),
  voterRegion: document.getElementById("voterRegion"),
  voterMunicipio: document.getElementById("voterMunicipio"),
  voterDistrito: document.getElementById("voterDistrito"),
  voterZone: document.getElementById("voterZone"),
  voterSector: document.getElementById("voterSector"),
  voterMesa: document.getElementById("voterMesa"),
  voterRecinto: document.getElementById("voterRecinto"),
  voterObservation: document.getElementById("voterObservation"),
  provinceChart: document.getElementById("provinceChart"),
  provinceRanking: document.getElementById("provinceRanking"),
  chartSummaryBadge: document.getElementById("chartSummaryBadge"),
  usersSection: document.getElementById("usersSection"),
  voterActionsHead: document.getElementById("voterActionsHead"),
  editingVoterId: document.getElementById("editingVoterId"),
  voterFormTitle: document.getElementById("voterFormTitle"),
  voterFormDescription: document.getElementById("voterFormDescription"),
  saveVoterBtn: document.getElementById("saveVoterBtn"),
  cancelEditVoterBtn: document.getElementById("cancelEditVoterBtn"),
  userEditModal: document.getElementById("userEditModal"),
  closeUserEditModalBtn: document.getElementById("closeUserEditModalBtn"),
  cancelUserEditBtn: document.getElementById("cancelUserEditBtn"),
  userEditForm: document.getElementById("userEditForm"),
  userEditMessage: document.getElementById("userEditMessage"),
  editUserId: document.getElementById("editUserId"),
  editUserName: document.getElementById("editUserName"),
  editUserUsername: document.getElementById("editUserUsername"),
  editUserEmail: document.getElementById("editUserEmail"),
  editUserPhone: document.getElementById("editUserPhone"),
  editUserRole: document.getElementById("editUserRole"),
  editUserProvince: document.getElementById("editUserProvince"),
  editUserRegion: document.getElementById("editUserRegion"),
  editUserMunicipio: document.getElementById("editUserMunicipio"),
  editUserDistrito: document.getElementById("editUserDistrito"),
  editUserZone: document.getElementById("editUserZone")
};

const RD_PROVINCES = ['Azua', 'Bahoruco', 'Barahona', 'Dajabón', 'Distrito Nacional', 'Duarte', 'Elías Piña', 'El Seibo', 'Espaillat', 'Hato Mayor', 'Hermanas Mirabal', 'Independencia', 'La Altagracia', 'La Romana', 'La Vega', 'María Trinidad Sánchez', 'Monseñor Nouel', 'Monte Cristi', 'Monte Plata', 'Pedernales', 'Peravia', 'Puerto Plata', 'Samaná', 'San Cristóbal', 'San José de Ocoa', 'San Juan', 'San Pedro de Macorís', 'Sánchez Ramírez', 'Santiago', 'Santiago Rodríguez', 'Santo Domingo', 'Valverde'];

const ROLES = ['Administrador', 'Coordinador Nacional', 'Coordinador Regional', 'Coordinador Provincial', 'Coordinadores Municipales', 'Coordinadores Distritales', 'Coordinadores de Zona', 'Secretario Nacional', 'Encargado Organizacion', 'Secretario de Planificacion', 'Secretario de Disciplina'];

function getUsers() {
  return JSON.parse(localStorage.getItem("jupc_users")) || [];
}

function setUsers(users) {
  localStorage.setItem("jupc_users", JSON.stringify(users));
}

function getVoters() {
  return JSON.parse(localStorage.getItem("jupc_voters")) || [];
}

function setVoters(voters) {
  localStorage.setItem("jupc_voters", JSON.stringify(voters));
}

function getSession() {
  return JSON.parse(localStorage.getItem("jupc_session")) || null;
}

function setSession(user) {
  localStorage.setItem("jupc_session", JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem("jupc_session");
}

function generateId() {
  if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
  return `id_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function escapeHtml(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function normalizeText(value) {
  return String(value || "").trim();
}

function normalizeCedula(value) {
  return String(value || "").replace(/[^\d]/g, "");
}

function formatPhone(value) {
  const digits = String(value || "").replace(/[^\d]/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function isValidPhone(value) {
  return String(value || "").replace(/[^\d]/g, "").length === 10;
}

function formatCedula(value) {
  const digits = String(value || "").replace(/[^\d]/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 10) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 10)}-${digits.slice(10)}`;
}

function isValidCedula(value) {
  return String(value || "").replace(/[^\d]/g, "").length === 11;
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function nowISO() {
  return new Date().toISOString();
}

function formatDateDisplay(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("es-DO", { dateStyle: "short", timeStyle: "short" }).format(date);
}

function getTodayDateKey() {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

function getDateKey(isoString) {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function uniqueSortedValues(values) {
  return [...new Set(values.filter(Boolean).map(value => value.trim()))].sort((a, b) => a.localeCompare(b, "es"));
}

function populateSelect(selectElement, values, defaultLabel) {
  if (!selectElement) return;
  const currentValue = selectElement.value;
  selectElement.innerHTML = `<option value="">${defaultLabel}</option>`;
  values.forEach(value => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    selectElement.appendChild(option);
  });
  if (values.includes(currentValue)) selectElement.value = currentValue;
}

function populateProvinceSelects() {
  populateSelect(DOM.registerProvince, RD_PROVINCES, "Seleccione una provincia");
  populateSelect(DOM.voterProvince, RD_PROVINCES, "Seleccione una provincia");
  populateSelect(DOM.editUserProvince, RD_PROVINCES, "Seleccione una provincia");
}

function populateRoleSelects() {
  if (DOM.registerRole) {
    const currentValue = DOM.registerRole.value;
    DOM.registerRole.innerHTML = `<option value="">Seleccione</option>${ROLES.map(role => `<option value="${role}">${role}</option>`).join("")}`;
    if (ROLES.includes(currentValue)) DOM.registerRole.value = currentValue;
  }
  if (DOM.editUserRole) {
    const currentValue = DOM.editUserRole.value;
    DOM.editUserRole.innerHTML = `<option value="">Seleccione</option>${ROLES.map(role => `<option value="${role}">${role}</option>`).join("")}`;
    if (ROLES.includes(currentValue)) DOM.editUserRole.value = currentValue;
  }
  populateSelect(DOM.filterRole, ROLES, "Todos");
}

function normalizeUsers() {
  const users = getUsers();
  let changed = false;

  const normalized = users.map(user => {
    const updatedUser = { ...user };
    if (!updatedUser.id) {
      updatedUser.id = generateId();
      changed = true;
    }
    if (!updatedUser.email) {
      updatedUser.email = "";
      changed = true;
    }
    if (!updatedUser.status) {
      updatedUser.status = "Pendiente";
      changed = true;
    }
    if (!updatedUser.region) {
      updatedUser.region = "";
      changed = true;
    }
    if (!updatedUser.municipio) {
      updatedUser.municipio = "";
      changed = true;
    }
    if (!updatedUser.distrito) {
      updatedUser.distrito = "";
      changed = true;
    }
    return updatedUser;
  });

  if (changed) {
    setUsers(normalized);
    const session = getSession();
    if (session) {
      const refreshedSession = normalized.find(user => user.id === session.id);
      if (refreshedSession) setSession(refreshedSession);
    }
  }
}

function showMessage(element, message, type) {
  if (!element) return;
  element.textContent = message;
  element.className = `status-message show ${type}`;
  setTimeout(() => {
    element.className = "status-message";
    element.textContent = "";
  }, 3500);
}

function switchTab(mode) {
  if (mode === "login") {
    DOM.showLogin?.classList.add("active");
    DOM.showRegister?.classList.remove("active");
    DOM.loginForm?.classList.add("active");
    DOM.registerForm?.classList.remove("active");
  } else {
    DOM.showRegister?.classList.add("active");
    DOM.showLogin?.classList.remove("active");
    DOM.registerForm?.classList.add("active");
    DOM.loginForm?.classList.remove("active");
  }
}

function getCurrentSession() {
  return getSession();
}

function isAdmin() {
  const session = getCurrentSession();
  return !!session && session.role === "Administrador";
}

function hasGlobalAccess(role) {
  return ["Administrador", "Coordinador Nacional", "Secretario Nacional", "Encargado Organizacion", "Secretario de Planificacion", "Secretario de Disciplina"].includes(role);
}

function updateAdminAccess() {
  if (DOM.manageUsersBtn) DOM.manageUsersBtn.classList.toggle("hidden", !isAdmin());
}

function goToUsersModule() {
  if (!isAdmin()) {
    alert("Solo el Administrador puede acceder a la gestión de usuarios.");
    return;
  }
  DOM.usersSection?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function updateInitialHint() {
  const approvedAdmins = getUsers().filter(user => user.role === "Administrador" && user.status === "Aprobado").length;
  if (!DOM.firstUserHint) return;
  if (approvedAdmins === 0) {
    DOM.firstUserHint.textContent = "Si aún no existe un Administrador aprobado, el primer Administrador se activará para iniciar la plataforma.";
    return;
  }
  DOM.firstUserHint.textContent = "Los nuevos usuarios quedan pendientes hasta ser aprobados por un Administrador.";
}

function resetUserForm() {
  DOM.registerForm?.reset();
  if (!DOM.editingUserId) return;
  DOM.editingUserId.value = "";
  DOM.registerFormTitle.textContent = "Crear nuevo usuario";
  DOM.saveUserBtn.textContent = "Crear usuario";
  DOM.cancelEditUserBtn.classList.add("hidden");
  DOM.registerProvince.value = "";
  DOM.registerPasswordConfirm.value = "";
  populateRoleSelects();
}

function resetUserEditModal() {
  DOM.userEditForm?.reset();
  if (DOM.editUserId) DOM.editUserId.value = "";
  if (DOM.editUserRole) DOM.editUserRole.value = "";
  if (DOM.editUserProvince) DOM.editUserProvince.value = "";
}

function closeUserEditModal() {
  DOM.userEditModal?.classList.add("hidden");
  document.body.classList.remove("modal-open");
  resetUserEditModal();
}

function openUserEditModal() {
  DOM.userEditModal?.classList.remove("hidden");
  document.body.classList.add("modal-open");
}

function fillUserForm(user) {
  populateRoleSelects();
  populateProvinceSelects();
  DOM.editUserName.value = user.name || "";
  DOM.editUserUsername.value = user.username || "";
  DOM.editUserRole.value = user.role || "";
  DOM.editUserEmail.value = user.email || "";
  DOM.editUserPhone.value = formatPhone(user.phone || "");
  DOM.editUserProvince.value = user.province || "";
  DOM.editUserRegion.value = user.region || "";
  DOM.editUserMunicipio.value = user.municipio || "";
  DOM.editUserDistrito.value = user.distrito || "";
  DOM.editUserZone.value = user.zone || "";
  DOM.editUserId.value = user.id || "";
  openUserEditModal();
}

function resetVoterForm() {
  DOM.voterForm?.reset();
  if (!DOM.editingVoterId) return;
  DOM.editingVoterId.value = "";
  DOM.voterProvince.value = "";
  DOM.voterFormTitle.textContent = "Registrar votante / simpatizante";
  DOM.voterFormDescription.textContent = "Complete los datos requeridos de forma organizada y precisa.";
  DOM.saveVoterBtn.textContent = "Guardar registro";
  DOM.cancelEditVoterBtn.classList.add("hidden");
}

function fillVoterForm(voter) {
  DOM.voterName.value = voter.name || "";
  DOM.voterCedula.value = formatCedula(voter.cedula || "");
  DOM.voterPhone.value = formatPhone(voter.phone || "");
  DOM.voterRegion.value = voter.region || "";
  DOM.voterProvince.value = voter.province || "";
  DOM.voterMunicipio.value = voter.municipio || "";
  DOM.voterDistrito.value = voter.distrito || "";
  DOM.voterZone.value = voter.zone || "";
  DOM.voterSector.value = voter.sector || "";
  DOM.voterMesa.value = voter.mesa || "";
  DOM.voterRecinto.value = voter.recinto || "";
  DOM.voterObservation.value = voter.observacion || "";
  DOM.editingVoterId.value = voter.id || "";
  DOM.voterFormTitle.textContent = "Editar registro";
  DOM.voterFormDescription.textContent = "Solo el Administrador puede modificar un registro existente.";
  DOM.saveVoterBtn.textContent = "Guardar cambios";
  DOM.cancelEditVoterBtn.classList.remove("hidden");
}

function updateVotersRegistrarInfo(userId, updatedUserData) {
  const voters = getVoters();
  const updatedVoters = voters.map(voter => voter.registeredById !== userId ? voter : {
    ...voter,
    registeredBy: updatedUserData.username,
    registeredByName: updatedUserData.name,
    registeredByRole: updatedUserData.role,
    registeredByRegion: updatedUserData.region,
    registeredByProvince: updatedUserData.province,
    registeredByMunicipio: updatedUserData.municipio,
    registeredByDistrito: updatedUserData.distrito,
    registeredByZone: updatedUserData.zone
  });
  setVoters(updatedVoters);
}

function getVisibleVoters() {
  const session = getSession();
  if (!session) return [];

  const voters = getVoters();

  if (hasGlobalAccess(session.role)) return voters;

  return voters.filter(v =>
    v.registeredById === session.id ||
    (session.role === "Coordinador Regional" && v.region === session.region) ||
    (session.role === "Coordinador Provincial" && v.province === session.province) ||
    (session.role === "Coordinadores Municipales" && v.municipio === session.municipio) ||
    (session.role === "Coordinadores Distritales" && v.distrito === session.distrito) ||
    (session.role === "Coordinadores de Zona" && v.zone === session.zone)
  );
}

function getVisibleUsers() {
  const session = getSession();
  if (!session) return [];
  const users = getUsers();
  if (isAdmin()) return users;
  if (hasGlobalAccess(session.role)) return users.filter(user => user.status === "Aprobado");
  if (session.role === "Coordinador Regional") return users.filter(u => u.region === session.region && u.status === "Aprobado");
  if (session.role === "Coordinador Provincial") return users.filter(u => u.province === session.province && u.status === "Aprobado");
  if (session.role === "Coordinadores Municipales") return users.filter(u => u.municipio === session.municipio && u.status === "Aprobado");
  if (session.role === "Coordinadores Distritales") return users.filter(u => u.distrito === session.distrito && u.status === "Aprobado");
  if (session.role === "Coordinadores de Zona") return users.filter(u => u.zone === session.zone && u.status === "Aprobado");
  return [];
}

function fillFilterOptions() {
  const visibleVoters = getVisibleVoters();
  const allUsers = getVisibleUsers();
  const session = getCurrentSession();

  populateSelect(DOM.filterProvince, uniqueSortedValues(visibleVoters.map(voter => voter.province)), "Todas");
  populateSelect(DOM.filterMunicipio, uniqueSortedValues(visibleVoters.map(voter => voter.municipio)), "Todos");
  populateSelect(DOM.filterSector, uniqueSortedValues(visibleVoters.map(voter => voter.sector)), "Todos");
  populateSelect(DOM.filterMesa, uniqueSortedValues(visibleVoters.map(voter => voter.mesa)), "Todas");
  populateSelect(DOM.filterRole, uniqueSortedValues(visibleVoters.map(voter => voter.registeredByRole)), "Todos");

  let registrarUsers = [];
  if (session) registrarUsers = isAdmin() ? getUsers().filter(user => user.status === "Aprobado") : allUsers;
  populateSelect(DOM.filterRegistrar, uniqueSortedValues(registrarUsers.map(user => user.username)), "Todos");
}

function getFilteredVoters() {
  const voters = getVisibleVoters();
  const q = DOM.searchInput.value.trim().toLowerCase();
  const province = DOM.filterProvince.value;
  const municipio = DOM.filterMunicipio.value;
  const sector = DOM.filterSector.value;
  const mesa = DOM.filterMesa.value;
  const role = DOM.filterRole.value;
  const registrar = DOM.filterRegistrar.value;

  return voters.filter(voter => {
    const matchesSearch = !q ||
      String(voter.name || "").toLowerCase().includes(q) ||
      String(voter.cedula || "").toLowerCase().includes(q) ||
      String(voter.phone || "").toLowerCase().includes(q) ||
      String(voter.region || "").toLowerCase().includes(q) ||
      String(voter.province || "").toLowerCase().includes(q) ||
      String(voter.municipio || "").toLowerCase().includes(q) ||
      String(voter.distrito || "").toLowerCase().includes(q) ||
      String(voter.sector || "").toLowerCase().includes(q) ||
      String(voter.mesa || "").toLowerCase().includes(q) ||
      String(voter.recinto || "").toLowerCase().includes(q) ||
      String(voter.observacion || "").toLowerCase().includes(q) ||
      String(voter.registeredBy || "").toLowerCase().includes(q) ||
      String(voter.registeredByName || "").toLowerCase().includes(q) ||
      String(voter.registeredByRole || "").toLowerCase().includes(q) ||
      String(voter.registeredByZone || "").toLowerCase().includes(q);

    return matchesSearch &&
      (!province || voter.province === province) &&
      (!municipio || voter.municipio === municipio) &&
      (!sector || voter.sector === sector) &&
      (!mesa || voter.mesa === mesa) &&
      (!role || voter.registeredByRole === role) &&
      (!registrar || voter.registeredBy === registrar);
  });
}

function renderVotersTable() {
  const filtered = getFilteredVoters();
  const ordered = [...filtered].sort((a, b) => new Date(b.createdAtISO || 0).getTime() - new Date(a.createdAtISO || 0).getTime());
  DOM.votersTableBody.innerHTML = "";
  DOM.voterActionsHead.textContent = isAdmin() ? "Acciones" : "Estado";

  if (!ordered.length) {
    DOM.votersTableBody.innerHTML = `<tr><td colspan="16">No hay registros para mostrar con los filtros seleccionados.</td></tr>`;
    DOM.filteredCountBadge.textContent = "0 resultados";
    return;
  }

  ordered.forEach(voter => {
    const row = document.createElement("tr");
    const actionsHtml = `<div class="actions-wrap">
<button class="action-btn edit" type="button" data-action="edit-voter" data-id="${escapeHtml(voter.id)}">Editar</button>
<button class="action-btn delete" type="button" data-action="delete-voter" data-id="${escapeHtml(voter.id)}">Eliminar</button>
</div>`;

    row.innerHTML = `
      <td>${escapeHtml(voter.name)}</td>
      <td>${escapeHtml(voter.cedula)}</td>
      <td>${escapeHtml(voter.phone)}</td>
      <td>${escapeHtml(voter.region || "")}</td>
      <td>${escapeHtml(voter.province)}</td>
      <td>${escapeHtml(voter.municipio)}</td>
      <td>${escapeHtml(voter.distrito || "")}</td>
      <td>${escapeHtml(voter.zone || "")}</td>
      <td>${escapeHtml(voter.sector)}</td>
      <td>${escapeHtml(voter.mesa)}</td>
      <td>${escapeHtml(voter.recinto)}</td>
      <td>${escapeHtml(voter.observacion || "")}</td>
      <td>${escapeHtml(voter.registeredByName)} (${escapeHtml(voter.registeredBy)})</td>
      <td>${escapeHtml(voter.registeredByRole)}</td>
      <td>${escapeHtml(voter.updatedAt || voter.createdAt)}</td>
      <td class="actions-cell">${actionsHtml}</td>
    `;
    DOM.votersTableBody.appendChild(row);
  });

  DOM.filteredCountBadge.textContent = `${ordered.length} resultado${ordered.length !== 1 ? "s" : ""}`;
}

function renderUsers() {
  const users = getVisibleUsers();
  if (!DOM.usersTableBody) return;
  DOM.usersTableBody.innerHTML = "";

  if (DOM.userPermissionsNote) DOM.userPermissionsNote.textContent = isAdmin() ? "Gestión total de usuarios" : "Visualización según permisos";
  if (!isAdmin()) {
    DOM.usersSection?.classList.add("section-hidden");
    return;
  }
  DOM.usersSection?.classList.remove("section-hidden");

  const orderedUsers = [...users].sort((a, b) => {
    if ((a.status || "Pendiente") !== (b.status || "Pendiente")) return (a.status || "Pendiente").localeCompare(b.status || "Pendiente", "es");
    if (a.role !== b.role) return a.role.localeCompare(b.role, "es");
    return a.name.localeCompare(b.name, "es");
  });

  if (!orderedUsers.length) {
    DOM.usersTableBody.innerHTML = `<tr><td colspan="12">No hay usuarios para mostrar.</td></tr>`;
    return;
  }

  orderedUsers.forEach(user => {
    const row = document.createElement("tr");
    const statusClass = String(user.status || "Pendiente").toLowerCase();

    let actionsHtml = `
      <div class="actions-wrap">
        <button class="action-btn edit" type="button" data-action="edit-user" data-id="${escapeHtml(user.id)}">Editar</button>
        <button class="action-btn delete" type="button" data-action="delete-user" data-id="${escapeHtml(user.id)}">Eliminar</button>
      </div>
    `;

    if ((user.status || "Pendiente") === "Pendiente") {
      actionsHtml = `
        <div class="actions-wrap">
          <button class="action-btn approve" type="button" data-action="approve-user" data-id="${escapeHtml(user.id)}">Aprobar</button>
          <button class="action-btn edit" type="button" data-action="edit-user" data-id="${escapeHtml(user.id)}">Editar</button>
          <button class="action-btn delete" type="button" data-action="delete-user" data-id="${escapeHtml(user.id)}">Eliminar</button>
        </div>
      `;
    }

    row.innerHTML = `
      <td>${escapeHtml(user.name)}</td>
      <td>${escapeHtml(user.username)}</td>
      <td>${escapeHtml(user.email || "")}</td>
      <td>${escapeHtml(user.role)}</td>
      <td>${escapeHtml(user.phone || "")}</td>
      <td>${escapeHtml(user.region || "")}</td>
      <td>${escapeHtml(user.province || "")}</td>
      <td>${escapeHtml(user.municipio || "")}</td>
      <td>${escapeHtml(user.distrito || "")}</td>
      <td>${escapeHtml(user.zone || "")}</td>
      <td><span class="status-pill ${escapeHtml(statusClass)}">${escapeHtml(user.status || "Pendiente")}</span></td>
      <td class="actions-cell">${actionsHtml}</td>
    `;
    DOM.usersTableBody.appendChild(row);
  });
}

function renderSearchResults() {
  const ordered = [...getFilteredVoters()].sort((a, b) => new Date(b.createdAtISO || 0).getTime() - new Date(a.createdAtISO || 0).getTime()).slice(0, 12);
  DOM.searchResults.innerHTML = "";
  if (!ordered.length) {
    DOM.searchResults.innerHTML = `<div class="result-item"><p>No se encontraron resultados con los criterios seleccionados.</p></div>`;
    return;
  }
  ordered.forEach(voter => {
    const item = document.createElement("div");
    item.className = "result-item";
    item.innerHTML = `
      <h4>${escapeHtml(voter.name)}</h4>
      <p><strong>Cédula:</strong> ${escapeHtml(voter.cedula)}</p>
      <p><strong>Ubicación:</strong> ${escapeHtml(voter.sector)}, ${escapeHtml(voter.municipio)}, ${escapeHtml(voter.province)}</p>
      <p><strong>Mesa:</strong> ${escapeHtml(voter.mesa)} | <strong>Recinto:</strong> ${escapeHtml(voter.recinto)}</p>
      <p><strong>Zona:</strong> ${escapeHtml(voter.zone || "")}</p>
      <p><strong>Observación:</strong> ${escapeHtml(voter.observacion || "Sin observación")}</p>
      <p><strong>Registrado por:</strong> ${escapeHtml(voter.registeredByName)} (${escapeHtml(voter.registeredBy)})</p>
      <p><strong>Rol:</strong> ${escapeHtml(voter.registeredByRole)}</p>
      <p><strong>Última fecha:</strong> ${escapeHtml(voter.updatedAt || voter.createdAt)}</p>
    `;
    DOM.searchResults.appendChild(item);
  });
}

function updateStats() {
  const voters = getVisibleVoters();
  const users = getVisibleUsers();
  DOM.totalVoters.textContent = voters.length;
  DOM.totalUsers.textContent = users.length;
  const todayKey = getTodayDateKey();
  const todayCount = voters.filter(voter => getDateKey(voter.createdAtISO || voter.createdAt || voter.id) === todayKey).length;
  DOM.todayVoters.textContent = todayCount;
  const provinces = new Set(voters.map(voter => voter.province).filter(Boolean).map(value => value.trim()));
  DOM.activeProvinces.textContent = provinces.size;
}

function getProvinceCounts() {
  const counts = {};
  getVisibleVoters().forEach(voter => {
    const province = normalizeText(voter.province);
    if (!province) return;
    counts[province] = (counts[province] || 0) + 1;
  });
  return Object.entries(counts).map(([province, count]) => ({ province, count })).sort((a, b) => b.count - a.count || a.province.localeCompare(b.province, "es"));
}

function renderProvinceRanking() {
  const provinceCounts = getProvinceCounts();
  DOM.provinceRanking.innerHTML = "";
  if (!provinceCounts.length) {
    DOM.provinceRanking.innerHTML = `<div class="result-item"><p>Aún no hay provincias registradas para mostrar.</p></div>`;
    DOM.chartSummaryBadge.textContent = "0 provincias activas";
    return;
  }
  DOM.chartSummaryBadge.textContent = `${provinceCounts.length} provincia${provinceCounts.length !== 1 ? "s" : ""} activas`;
  provinceCounts.slice(0, 8).forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "ranking-item";
    div.innerHTML = `
      <div class="ranking-item-left">
        <div class="ranking-number">${index + 1}</div>
        <div>
          <h4>${escapeHtml(item.province)}</h4>
          <p>Registros visibles en esta provincia</p>
        </div>
      </div>
      <div class="ranking-count">${item.count}</div>
    `;
    DOM.provinceRanking.appendChild(div);
  });
}

function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

function drawProvinceChart() {
  const canvas = DOM.provinceChart;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const data = getProvinceCounts().slice(0, 10);
  const parentWidth = canvas.parentElement.clientWidth;
  const width = Math.max(parentWidth - 10, 300);
  const height = 320;
  const ratio = window.devicePixelRatio || 1;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, width, height);

  if (!data.length) {
    ctx.fillStyle = "#61758f";
    ctx.font = "16px Segoe UI";
    ctx.textAlign = "center";
    ctx.fillText("Aún no hay datos para mostrar en el gráfico.", width / 2, height / 2);
    return;
  }

  const padding = { top: 20, right: 20, bottom: 70, left: 50 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(...data.map(item => item.count), 1);
  const stepX = chartWidth / data.length;
  const barWidth = Math.min(42, stepX * 0.56);

  ctx.strokeStyle = "#e6edf6";
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padding.top + (chartHeight / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();
    const value = Math.round(maxValue - (maxValue / 4) * i);
    ctx.fillStyle = "#7f91a8";
    ctx.font = "12px Segoe UI";
    ctx.textAlign = "right";
    ctx.fillText(String(value), padding.left - 8, y + 4);
  }

  data.forEach((item, index) => {
    const x = padding.left + stepX * index + (stepX - barWidth) / 2;
    const barHeight = (item.count / maxValue) * chartHeight;
    const y = padding.top + chartHeight - barHeight;
    const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
    gradient.addColorStop(0, "#0a4a8a");
    gradient.addColorStop(1, "#ef2d26");
    ctx.fillStyle = gradient;
    roundRect(ctx, x, y, barWidth, barHeight, 12, true, false);
    ctx.fillStyle = "#102b4c";
    ctx.font = "700 12px Segoe UI";
    ctx.textAlign = "center";
    ctx.fillText(String(item.count), x + barWidth / 2, y - 8);
    const label = item.province.length > 12 ? `${item.province.slice(0, 12)}…` : item.province;
    ctx.save();
    ctx.translate(x + barWidth / 2, padding.top + chartHeight + 16);
    ctx.rotate(-Math.PI / 6);
    ctx.fillStyle = "#5f728b";
    ctx.font = "12px Segoe UI";
    ctx.textAlign = "right";
    ctx.fillText(label, 0, 0);
    ctx.restore();
  });
}

function renderAnalytics() {
  renderProvinceRanking();
  drawProvinceChart();
}

function renderAll() {
  renderVotersTable();
  renderSearchResults();
  renderUsers();
  updateStats();
  renderAnalytics();
}

function loadDashboard() {
  const session = getCurrentSession();
  if (!session) return;
  DOM.authSection.classList.add("hidden");
  DOM.dashboardSection.classList.remove("hidden");
  DOM.currentUserInfo.textContent = `${session.name} | ${session.role} | ${session.province || ""} | ${session.zone || ""}`;
  if (isAdmin()) DOM.usersSection.classList.remove("section-hidden");
  else DOM.usersSection.classList.add("section-hidden");
  updateAdminAccess();
  fillFilterOptions();
  renderAll();
}

function clearFilters() {
  DOM.searchInput.value = "";
  DOM.filterProvince.value = "";
  DOM.filterMunicipio.value = "";
  DOM.filterSector.value = "";
  DOM.filterMesa.value = "";
  DOM.filterRole.value = "";
  DOM.filterRegistrar.value = "";
  renderVotersTable();
  renderSearchResults();
  renderAnalytics();
}

function exportToExcel() {
  const session = getCurrentSession();
  if (!session) {
    alert("Debes iniciar sesión.");
    return;
  }

  const voters = hasGlobalAccess(session.role) ? getFilteredVoters() : getFilteredVoters().filter(voter => voter.registeredById === session.id);
  if (!voters.length) {
    alert("No hay datos para exportar.");
    return;
  }

  const ordered = [...voters].sort((a, b) => {
    if (a.registeredByRole !== b.registeredByRole) return a.registeredByRole.localeCompare(b.registeredByRole, "es");
    if (a.registeredByName !== b.registeredByName) return a.registeredByName.localeCompare(b.registeredByName, "es");
    if (a.province !== b.province) return a.province.localeCompare(b.province, "es");
    return a.name.localeCompare(b.name, "es");
  });

  let html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="UTF-8">
      <style>
        table { border-collapse: collapse; width: 100%; font-family: Arial, sans-serif; }
        th, td { border: 1px solid #cfd8e3; padding: 8px; font-size: 12px; }
        th { background: #edf4ff; color: #123055; }
        .group { background: #dceaff; font-weight: bold; font-size: 13px; }
        .subgroup { background: #f3f8ff; font-weight: bold; }
        .title { font-size: 18px; font-weight: bold; padding: 14px 8px; }
      </style>
    </head>
    <body>
      <table>
        <tr><td class="title" colspan="15">Reporte interno de registros</td></tr>
        <tr>
          <th>Nombre</th><th>Cédula</th><th>Teléfono</th><th>Región</th><th>Provincia</th><th>Municipio</th><th>Distrito</th><th>Zona</th><th>Sector</th><th>Mesa</th><th>Recinto</th><th>Observación</th><th>Registrado por</th><th>Rol</th><th>Fecha</th>
        </tr>
  `;
  let currentRole = "";
  let currentRegistrar = "";

  ordered.forEach(voter => {
    if (hasGlobalAccess(session.role)) {
      if (voter.registeredByRole !== currentRole) {
        currentRole = voter.registeredByRole;
        currentRegistrar = "";
        html += `<tr><td class="group" colspan="15">ROL: ${escapeHtml(voter.registeredByRole)}</td></tr>`;
      }
      if (voter.registeredByName !== currentRegistrar) {
        currentRegistrar = voter.registeredByName;
        html += `<tr><td class="subgroup" colspan="15">REGISTRADOR: ${escapeHtml(voter.registeredByName)} (${escapeHtml(voter.registeredBy)}) | ZONA: ${escapeHtml(voter.registeredByZone)} | PROVINCIA ASIGNADA: ${escapeHtml(voter.registeredByProvince)}</td></tr>`;
      }
    }
    html += `
      <tr>
        <td>${escapeHtml(voter.name)}</td><td>${escapeHtml(voter.cedula)}</td><td>${escapeHtml(voter.phone)}</td><td>${escapeHtml(voter.region || "")}</td><td>${escapeHtml(voter.province)}</td><td>${escapeHtml(voter.municipio)}</td><td>${escapeHtml(voter.distrito || "")}</td><td>${escapeHtml(voter.zone || "")}</td><td>${escapeHtml(voter.sector)}</td><td>${escapeHtml(voter.mesa)}</td><td>${escapeHtml(voter.recinto)}</td><td>${escapeHtml(voter.observacion || "")}</td><td>${escapeHtml(voter.registeredByName)} (${escapeHtml(voter.registeredBy)})</td><td>${escapeHtml(voter.registeredByRole)}</td><td>${escapeHtml(voter.updatedAt || voter.createdAt)}</td>
      </tr>
    `;
  });

  html += `</table></body></html>`;
  const blob = new Blob([html], { type: "application/vnd.ms-excel" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = isAdmin() ? "reporte_general_registros.xls" : `mis_registros_${session.username}.xls`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

DOM.showLogin?.addEventListener("click", () => switchTab("login"));
DOM.showRegister?.addEventListener("click", () => switchTab("register"));
DOM.manageUsersBtn?.addEventListener("click", goToUsersModule);
DOM.cancelEditUserBtn?.addEventListener("click", resetUserForm);
DOM.cancelEditVoterBtn?.addEventListener("click", resetVoterForm);
DOM.closeUserEditModalBtn?.addEventListener("click", closeUserEditModal);
DOM.cancelUserEditBtn?.addEventListener("click", closeUserEditModal);
DOM.userEditModal?.addEventListener("click", e => {
  if (e.target === DOM.userEditModal) closeUserEditModal();
});
DOM.registerPhone?.addEventListener("input", e => e.target.value = formatPhone(e.target.value));
DOM.voterPhone?.addEventListener("input", e => e.target.value = formatPhone(e.target.value));
DOM.editUserPhone?.addEventListener("input", e => e.target.value = formatPhone(e.target.value));
DOM.voterCedula?.addEventListener("input", e => e.target.value = formatCedula(e.target.value));

DOM.registerForm?.addEventListener("submit", function (e) {
  e.preventDefault();
  const users = getUsers();
  const session = getCurrentSession();

  const name = normalizeText(DOM.registerName.value);
  const username = normalizeText(DOM.registerUsername.value);
  const role = normalizeText(DOM.registerRole.value);
  const email = normalizeText(DOM.registerEmail.value).toLowerCase();
  const phone = formatPhone(DOM.registerPhone.value);
  const province = normalizeText(DOM.registerProvince.value);
  const region = normalizeText(DOM.registerRegion.value);
  const municipio = normalizeText(DOM.registerMunicipio.value);
  const distrito = normalizeText(DOM.registerDistrito.value);
  const zone = normalizeText(DOM.registerZone.value);
  const password = normalizeText(DOM.registerPassword.value);
  const passwordConfirm = normalizeText(DOM.registerPasswordConfirm.value);
  const editingId = normalizeText(DOM.editingUserId.value);

  if (!name || !username || !role || !email || !phone || !province || !region || !municipio || !distrito || !zone || !password || !passwordConfirm) {
    showMessage(DOM.authMessage, "Complete todos los campos del usuario.", "error");
    return;
  }
  if (!isValidEmail(email)) {
    showMessage(DOM.authMessage, "Ingrese un correo personal válido.", "error");
    return;
  }
  if (!isValidPhone(phone)) {
    showMessage(DOM.authMessage, "Ingrese un teléfono válido de 10 dígitos.", "error");
    return;
  }
  if (password.length < 4) {
    showMessage(DOM.authMessage, "La contraseña debe tener al menos 4 caracteres.", "error");
    return;
  }
  if (password !== passwordConfirm) {
    showMessage(DOM.authMessage, "Las contraseñas no coinciden.", "error");
    return;
  }

  if (!editingId) {
    const duplicatedUsername = users.some(user => user.username.toLowerCase() === username.toLowerCase());
    const duplicatedEmail = users.some(user => String(user.email || "").toLowerCase() === email);
    if (duplicatedUsername) {
      showMessage(DOM.authMessage, "Ese nombre de usuario ya existe.", "error");
      return;
    }
    if (duplicatedEmail) {
      showMessage(DOM.authMessage, "Ese correo ya está registrado.", "error");
      return;
    }

    const approvedAdmins = users.filter(user => user.role === "Administrador" && user.status === "Aprobado").length;
    const bootstrapAdmin = approvedAdmins === 0 && role === "Administrador";
    const createdByAdmin = !!session && isAdmin();
    const status = bootstrapAdmin || createdByAdmin ? "Aprobado" : "Pendiente";

    users.push({
      id: generateId(),
      name,
      username,
      role,
      email,
      phone,
      region,
      province,
      municipio,
      distrito,
      zone,
      password,
      status
    });

    setUsers(users);
    resetUserForm();
    updateInitialHint();
    updateAdminAccess();

    showMessage(DOM.authMessage, status === "Pendiente" ? "Usuario registrado en estado pendiente de aprobación." : "Usuario registrado correctamente.", "success");
    fillFilterOptions();
    renderUsers();
    updateStats();
    return;
  }

  if (!session || !isAdmin()) {
    showMessage(DOM.authMessage, "Solo el Administrador puede editar usuarios.", "error");
    return;
  }

  const duplicatedUsername = users.some(user => user.username.toLowerCase() === username.toLowerCase() && user.id !== editingId);
  const duplicatedEmail = users.some(user => String(user.email || "").toLowerCase() === email && user.id !== editingId);
  if (duplicatedUsername) {
    showMessage(DOM.authMessage, "Ese nombre de usuario ya existe.", "error");
    return;
  }
  if (duplicatedEmail) {
    showMessage(DOM.authMessage, "Ese correo ya está registrado.", "error");
    return;
  }

  const updatedUsers = users.map(user => user.id !== editingId ? user : {
    ...user, name, username, role, email, phone, region, province, municipio, distrito, zone, password
  });
  setUsers(updatedUsers);

  const current = getSession();
  if (current && current.id === editingId) {
    const refreshed = updatedUsers.find(user => user.id === editingId);
    if (refreshed) setSession(refreshed);
  }

  updateVotersRegistrarInfo(editingId, { name, username, role, region, province, municipio, distrito, zone });
  resetUserForm();
  showMessage(DOM.authMessage, "Usuario actualizado correctamente.", "success");
  fillFilterOptions();
  renderAll();
  updateAdminAccess();
  if (getSession()) loadDashboard();
});


DOM.userEditForm?.addEventListener("submit", function (e) {
  e.preventDefault();
  const session = getCurrentSession();
  if (!session || !isAdmin()) {
    showMessage(DOM.userEditMessage, "Solo el Administrador puede editar usuarios.", "error");
    return;
  }

  const users = getUsers();
  const editingId = normalizeText(DOM.editUserId.value);
  const name = normalizeText(DOM.editUserName.value);
  const username = normalizeText(DOM.editUserUsername.value);
  const role = normalizeText(DOM.editUserRole.value);
  const email = normalizeText(DOM.editUserEmail.value).toLowerCase();
  const phone = formatPhone(DOM.editUserPhone.value);
  const province = normalizeText(DOM.editUserProvince.value);
  const region = normalizeText(DOM.editUserRegion.value);
  const municipio = normalizeText(DOM.editUserMunicipio.value);
  const distrito = normalizeText(DOM.editUserDistrito.value);
  const zone = normalizeText(DOM.editUserZone.value);

  if (!editingId || !name || !username || !role || !email || !phone || !province || !region || !municipio || !distrito || !zone) {
    showMessage(DOM.userEditMessage, "Complete todos los campos del usuario.", "error");
    return;
  }
  if (!isValidEmail(email)) {
    showMessage(DOM.userEditMessage, "Ingrese un correo personal válido.", "error");
    return;
  }
  if (!isValidPhone(phone)) {
    showMessage(DOM.userEditMessage, "Ingrese un teléfono válido de 10 dígitos.", "error");
    return;
  }

  const duplicatedUsername = users.some(user => user.username.toLowerCase() === username.toLowerCase() && user.id !== editingId);
  const duplicatedEmail = users.some(user => String(user.email || "").toLowerCase() === email && user.id !== editingId);

  if (duplicatedUsername) {
    showMessage(DOM.userEditMessage, "Ese nombre de usuario ya existe.", "error");
    return;
  }
  if (duplicatedEmail) {
    showMessage(DOM.userEditMessage, "Ese correo ya está registrado.", "error");
    return;
  }

  const updatedUsers = users.map(user => user.id !== editingId ? user : {
    ...user,
    name,
    username,
    role,
    email,
    phone,
    region,
    province,
    municipio,
    distrito,
    zone
  });
  setUsers(updatedUsers);

  const current = getSession();
  if (current && current.id === editingId) {
    const refreshed = updatedUsers.find(user => user.id === editingId);
    if (refreshed) setSession(refreshed);
  }

  updateVotersRegistrarInfo(editingId, { name, username, role, region, province, municipio, distrito, zone });
  showMessage(DOM.authMessage, "Usuario actualizado correctamente.", "success");
  closeUserEditModal();
  fillFilterOptions();
  renderAll();
  updateAdminAccess();
  if (getSession()) loadDashboard();
});

DOM.loginForm?.addEventListener("submit", function (e) {
  e.preventDefault();
  const username = normalizeText(document.getElementById("loginUser").value);
  const password = normalizeText(document.getElementById("loginPassword").value);
  const users = getUsers();
  const user = users.find(item => item.username === username && item.password === password);
  if (!user) {
    showMessage(DOM.authMessage, "Credenciales incorrectas.", "error");
    return;
  }
  if ((user.status || "Pendiente") !== "Aprobado") {
    showMessage(DOM.authMessage, "Tu usuario aún está pendiente de aprobación.", "error");
    return;
  }
  setSession(user);
  updateInitialHint();
  updateAdminAccess();
  loadDashboard();
});

DOM.logoutBtn?.addEventListener("click", () => {
  clearSession();
  resetVoterForm();
  updateInitialHint();
  updateAdminAccess();
  DOM.dashboardSection.classList.add("hidden");
  DOM.authSection.classList.remove("hidden");
  switchTab("login");
});

DOM.voterForm?.addEventListener("submit", function (e) {
  e.preventDefault();
  const session = getCurrentSession();
  if (!session) {
    showMessage(DOM.voterMessage, "Debes iniciar sesión.", "error");
    return;
  }

  const name = normalizeText(DOM.voterName.value);
  const cedula = formatCedula(DOM.voterCedula.value);
  const phone = formatPhone(DOM.voterPhone.value);
  const region = normalizeText(DOM.voterRegion.value);
  const province = normalizeText(DOM.voterProvince.value);
  const municipio = normalizeText(DOM.voterMunicipio.value);
  const distrito = normalizeText(DOM.voterDistrito.value);
  const zone = normalizeText(DOM.voterZone.value);
  const sector = normalizeText(DOM.voterSector.value);
  const mesa = normalizeText(DOM.voterMesa.value);
  const recinto = normalizeText(DOM.voterRecinto.value);
  const observacion = normalizeText(DOM.voterObservation.value);
  const editingId = normalizeText(DOM.editingVoterId.value);

  if (!name || !cedula || !phone || !region || !province || !municipio || !distrito || !zone || !sector || !mesa || !recinto) {
    showMessage(DOM.voterMessage, "Complete todos los campos requeridos.", "error");
    return;
  }
  if (!isValidCedula(cedula)) {
    showMessage(DOM.voterMessage, "Ingrese una cédula válida de 11 dígitos.", "error");
    return;
  }
  if (!isValidPhone(phone)) {
    showMessage(DOM.voterMessage, "Ingrese un teléfono válido de 10 dígitos.", "error");
    return;
  }

  const voters = getVoters();
  const normalizedCedulaValue = normalizeCedula(cedula);

  if (!editingId) {
    if (voters.some(voter => normalizeCedula(voter.cedula) === normalizedCedulaValue)) {
      showMessage(DOM.voterMessage, "Ya existe un registro con esa cédula.", "error");
      return;
    }

    const createdAtISO = nowISO();
    voters.push({
      id: generateId(),
      name,
      cedula,
      phone,
      region,
      province,
      municipio,
      distrito,
      zone,
      sector,
      mesa,
      recinto,
      observacion,
      registeredById: session.id,
      registeredBy: session.username,
      registeredByName: session.name,
      registeredByRole: session.role,
      registeredByRegion: session.region || "",
      registeredByProvince: session.province || "",
      registeredByMunicipio: session.municipio || "",
      registeredByDistrito: session.distrito || "",
      registeredByZone: session.zone || "",
      createdAtISO,
      createdAt: formatDateDisplay(createdAtISO),
      updatedAtISO: createdAtISO,
      updatedAt: formatDateDisplay(createdAtISO)
    });
    setVoters(voters);
    resetVoterForm();
    showMessage(DOM.voterMessage, "Registro guardado correctamente.", "success");
    fillFilterOptions();
    renderAll();
    return;
  }



  const duplicatedCedula = voters.some(voter => normalizeCedula(voter.cedula) === normalizedCedulaValue && voter.id !== editingId);
  if (duplicatedCedula) {
    showMessage(DOM.voterMessage, "Ya existe otro registro con esa cédula.", "error");
    return;
  }

  const updatedAtISO = nowISO();
  const updatedVoters = voters.map(voter => voter.id !== editingId ? voter : {
    ...voter,
    name,
    cedula,
    phone,
    region,
    province,
    municipio,
    distrito,
    zone,
    sector,
    mesa,
    recinto,
    observacion,
    updatedAtISO,
    updatedAt: formatDateDisplay(updatedAtISO)
  });
  setVoters(updatedVoters);
  resetVoterForm();
  showMessage(DOM.voterMessage, "Registro actualizado correctamente.", "success");
  fillFilterOptions();
  renderAll();
});

DOM.usersTableBody?.addEventListener("click", function (e) {
  const target = e.target.closest("button");
  if (!target) return;
  const action = target.dataset.action;
  const id = target.dataset.id;
  if (!action || !id) return;
  if (!isAdmin()) {
    alert("Solo el Administrador puede gestionar usuarios.");
    return;
  }

  const users = getUsers();
  const user = users.find(item => item.id === id);
  if (!user) {
    alert("No se encontró el usuario.");
    return;
  }

  if (action === "approve-user") {
    const updatedUsers = users.map(item => item.id !== id ? item : { ...item, status: "Aprobado" });
    setUsers(updatedUsers);
    showMessage(DOM.authMessage, "Usuario aprobado correctamente.", "success");
    renderUsers();
    updateStats();
    return;
  }

  if (action === "edit-user") {
    fillUserForm(user);
    return;
  }

  if (action === "delete-user") {
    if ((getCurrentSession() || {}).id === id) {
      alert("No puedes eliminar el usuario con el que estás autenticado.");
      return;
    }
    const voters = getVoters();
    const linkedVoters = voters.filter(voter => voter.registeredById === id).length;
    const confirmed = confirm(linkedVoters > 0 ? `Este usuario tiene ${linkedVoters} registro(s) asociados. Se eliminará el usuario, pero los registros permanecerán como historial. ¿Deseas continuar?` : "¿Deseas eliminar este usuario?");
    if (!confirmed) return;
    const updatedUsers = users.filter(item => item.id !== id);
    setUsers(updatedUsers);
    if (DOM.editingUserId.value === id) resetUserForm();
    showMessage(DOM.authMessage, "Usuario eliminado correctamente.", "success");
    fillFilterOptions();
    renderAll();
    updateAdminAccess();
  }
});

DOM.votersTableBody?.addEventListener("click", function (e) {
  const target = e.target.closest("button");
  if (!target) return;
  const action = target.dataset.action;
  const id = target.dataset.id;
  if (!action || !id) return;
  

  const voters = getVoters();
  const voter = voters.find(item => item.id === id);
  if (!voter) {
    alert("No se encontró el registro.");
    return;
  }

  if (action === "edit-voter") {
    fillVoterForm(voter);
    DOM.voterForm?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (action === "delete-voter") {
    const confirmed = confirm("¿Deseas eliminar este registro?");
    if (!confirmed) return;
    const updatedVoters = voters.filter(item => item.id !== id);
    setVoters(updatedVoters);
    if (DOM.editingVoterId.value === id) resetVoterForm();
    showMessage(DOM.voterMessage, "Registro eliminado correctamente.", "success");
    fillFilterOptions();
    renderAll();
  }
});

[
  DOM.searchInput,
  DOM.filterProvince,
  DOM.filterMunicipio,
  DOM.filterSector,
  DOM.filterMesa,
  DOM.filterRole,
  DOM.filterRegistrar
].forEach(element => {
  element?.addEventListener("input", () => {
    renderVotersTable();
    renderSearchResults();
    renderAnalytics();
  });
  element?.addEventListener("change", () => {
    renderVotersTable();
    renderSearchResults();
    renderAnalytics();
  });
});

DOM.clearFiltersBtn?.addEventListener("click", clearFilters);
DOM.exportBtn?.addEventListener("click", exportToExcel);

window.addEventListener("resize", () => {
  if (DOM.dashboardSection && !DOM.dashboardSection.classList.contains("hidden")) drawProvinceChart();
});

populateProvinceSelects();
populateRoleSelects();
normalizeUsers();
resetUserForm();
resetVoterForm();
updateInitialHint();
updateAdminAccess();

if (getSession()) loadDashboard();
else {
  DOM.authSection.classList.remove("hidden");
  DOM.dashboardSection.classList.add("hidden");
  switchTab("login");
}


document.addEventListener("keydown", e => {
  if (e.key === "Escape" && DOM.userEditModal && !DOM.userEditModal.classList.contains("hidden")) closeUserEditModal();
});
