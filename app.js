const image = (id, w = 240, h = 240) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

const homeItems = [
  { id: "items", title: "Items", subtitle: "Inventory list", icon: "package-open" },
  { id: "checklist", title: "Checklist", subtitle: "Daily material checks", icon: "list-checks" },
  { id: "warehouse", title: "Warehouse History", subtitle: "IN / OUT movement log", icon: "warehouse" },
  { id: "ipad", title: "Ipad", subtitle: "Device view", icon: "tablet-smartphone" },
  { id: "people", title: "People", subtitle: "Staff and operators", icon: "users" },
  { id: "setup", title: "Setup Work", subtitle: "Workflow settings", icon: "settings-2" },
  { id: "cashflow", title: "Cash-Flow", subtitle: "Payment tracking", icon: "badge-dollar-sign" },
];

const items = [
  {
    name: "Avocado",
    price: 50,
    unit: "48/CARTON",
    barcode: "01175022650416181001911830",
    img: image("photo-1523049673857-eb18f1d7b578"),
  },
  { name: "Banana", price: 35, unit: "1/CARTON-ADD BARCODE", barcode: "01175022650416181001911831", img: image("photo-1528825871115-3581a5387919") },
  { name: "Beetroot", price: 21, unit: "10/KG-ADD BARCODE", barcode: "01175022650416181001911832", img: image("photo-1593105544559-ecb03bf76f82") },
  { name: "Blackberry", price: 4, unit: "/PACK", barcode: "01175022650416181001911833", img: image("photo-1498557850523-fd3d118b962e") },
  { name: "Cantaloup", price: 4, unit: "/PCS-ADD BARCODE", barcode: "01175022650416181001911834", img: image("photo-1571575173700-afb9492e6a50") },
  { name: "Carrot", price: 19, unit: "/KG-ADD BARCODE", barcode: "01175022650416181001911835", img: image("photo-1447175008436-054170c2e979") },
  { name: "Kiwi", price: 60, unit: "/CARTON", barcode: "01175022650416181001911836", img: image("photo-1585059895524-72359e06133a") },
  { name: "Lime", price: 65, unit: "/CARTON-ADD BARCODE", barcode: "01175022650416181001911837", img: image("photo-1566733971017-d3dfb3d4a862") },
  { name: "Mango", price: 16, unit: "/PCS-ADD BARCODE", barcode: "01175022650416181001911838", img: image("photo-1553279768-865429fa0078") },
  { name: "Mint", price: 23, unit: "/CARTON-ADD BARCODE", barcode: "01175022650416181001911839", img: image("photo-1628556270448-4d4e4148e1b1") },
];

const checklist = [
  { name: "Clorox", unit: "LITER", img: image("photo-1585421514284-efb74c2b69ba") },
  { name: "Caramel Sauce", unit: "GRAM", img: image("photo-1615485290382-441e4d049cb5") },
  { name: "Creme Caramel powder", unit: "GRAM", img: image("photo-1622483767028-3f66f32aef97") },
  { name: "Rubbermaid 2-Piece Pitcher", unit: "PCS", img: image("photo-1610701596007-11502861dcfa") },
  { name: "Silicone Spatula 3-Piece Set", unit: "PACK", img: image("photo-1556911220-bff31c812dba") },
  { name: "Nutella Pipping Bag", unit: "PCS", img: image("photo-1606313564200-e75d5e30476c") },
];

const stockLog = [
  { date: "17/5/2026", user: "Ammar", qty: 3 },
  { date: "27/4/2026", user: "Franco", qty: 1 },
  { date: "26/3/2026", user: "Store", qty: 1 },
];

const warehouseIn = [
  { date: "01/6/2026", count: 14, name: "Sauce Pistachio", user: "Ammar", qty: 14, img: image("photo-1606312619070-d48b4c652a52") },
  { date: "30/5/2026", count: 29, name: "A2 Can 500ml (Mojito)", user: "Ammar", qty: 9, img: image("photo-1544787219-7f47ccb76574") },
  { date: "30/5/2026", count: 29, name: "Lotus Sauce", user: "Ammar", qty: 20, img: image("photo-1581636625402-29b2a704ef13") },
  { date: "24/5/2026", count: 4, name: "Oil", user: "Store", qty: 1, img: image("photo-1474979266404-7eaacbcd87c5") },
  { date: "24/5/2026", count: 4, name: "Milk Chocolate", user: "Franco", qty: 3, img: image("photo-1511381939415-e44015466834") },
];

const warehouseOut = [
  { date: "01/6/2026", count: 28, name: "Nutella Pipping Bag", user: "Ammar", qty: -4, img: image("photo-1606313564200-e75d5e30476c") },
  { date: "01/6/2026", count: 28, name: "Sauce Ferrero", user: "Ammar", qty: -2, img: image("photo-1578985545062-69928b1d9587") },
  { date: "01/6/2026", count: 28, name: "Sauce Pistachio", user: "Ammar", qty: -1, img: image("photo-1606312619070-d48b4c652a52") },
  { date: "01/6/2026", count: 28, name: "Sauce Oreo", user: "Ammar", qty: -2, img: image("photo-1606313564200-e75d5e30476c") },
  { date: "01/6/2026", count: 28, name: "Red Bull", user: "Ammar", qty: -6, img: image("photo-1622543925917-763c34d1a86e") },
];

let selectedIndex = 0;
let searchQuery = "";

const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => [...document.querySelectorAll(selector)];

function renderHome() {
  qs("#homeMenu").innerHTML = homeItems
    .map(
      (item) => `
        <button class="menu-card" type="button" data-view="${item.id}">
          <span class="menu-visual"><i data-lucide="${item.icon}"></i></span>
          <span>
            <span class="menu-title">${item.title}</span>
            <span class="menu-subtitle">${item.subtitle}</span>
          </span>
          <i data-lucide="chevron-right"></i>
        </button>
      `,
    )
    .join("");
}

function rowActions() {
  return `
    <div class="row-actions">
      <span class="qty">0</span>
      <button class="action-mini plus" type="button" aria-label="Cộng"><span aria-hidden="true">+</span></button>
      <button class="action-mini minus" type="button" aria-label="Trừ"><span aria-hidden="true">−</span></button>
      <button class="action-mini confirm" type="button" aria-label="Xác nhận"><span aria-hidden="true">✓</span></button>
    </div>
  `;
}

function renderProducts() {
  const visibleItems = items
    .map((item, index) => ({ ...item, index }))
    .filter((item) => {
      const target = `${item.name} ${item.unit} ${item.price}`.toLowerCase();
      return target.includes(searchQuery);
    });

  qs("#itemsList").innerHTML = visibleItems.length
    ? visibleItems
    .map(
      (item) => `
        <div class="product-row ${item.index === selectedIndex ? "selected" : ""}" role="button" tabindex="0" data-index="${item.index}">
          <img class="thumb" src="${item.img}" alt="${item.name}" loading="lazy" />
          <span class="product-main">
            <span class="product-name">${item.name}-$${item.price}</span>
            <span class="product-unit">${item.unit}</span>
          </span>
          ${rowActions("cart")}
        </div>
      `,
    )
    .join("")
    : `<div class="empty-state"><i data-lucide="search-x"></i><span>No items found</span></div>`;
}

function renderChecklist() {
  const visibleChecklist = checklist.filter((item) => {
    const target = `${item.name} ${item.unit}`.toLowerCase();
    return target.includes(searchQuery);
  });

  qs("#checklistList").innerHTML = visibleChecklist.length
    ? visibleChecklist
    .map(
      (item) => `
        <div class="product-row">
          <img class="thumb" src="${item.img}" alt="${item.name}" loading="lazy" />
          <span class="product-main">
            <span class="product-name">${item.name}-$</span>
            <span class="product-unit">${item.unit}</span>
          </span>
          ${rowActions("check")}
        </div>
      `,
    )
    .join("")
    : `<div class="empty-state"><i data-lucide="search-x"></i><span>No checklist items found</span></div>`;
}

function renderDetail() {
  const item = items[selectedIndex];
  qs("#itemDetail").innerHTML = `
    <div class="detail-top">
      <h2>${item.name}</h2>
      <div class="toolbar">
        <button class="primary-button" type="button"><i data-lucide="plus"></i><span>IN ORDER</span></button>
        <button class="icon-button" type="button" aria-label="Close"><i data-lucide="x"></i></button>
      </div>
    </div>
    <div class="detail-grid">
      <div class="quick-card">
        <button class="quick-action" type="button"><i data-lucide="pencil"></i><span>Edit</span></button>
        <button class="quick-action danger" type="button"><i data-lucide="minus"></i><span>OUT ORDER</span></button>
        <button class="quick-action success" type="button"><i data-lucide="shopping-cart"></i><span>Go ORDER</span></button>
        <button class="quick-action warn" type="button"><i data-lucide="calendar-days"></i><span>Expiration date</span></button>
        <button class="quick-action" type="button"><i data-lucide="calendar-plus"></i><span>Add link</span></button>
      </div>
      <div class="info-card">
        <div class="error-text">Error: UPC-E must contain only digits</div>
        <div class="tab-note">Tab thông tin</div>
        <div class="field-list">
          <div class="field"><span>Name</span><strong>${item.name}</strong></div>
          <div class="field"><span>Category</span><strong><span class="dot"></span> Fruits</strong></div>
          <div class="field"><span>Unit</span><strong>${item.unit.replace("48/", "")}</strong></div>
          <div class="field"><span>Price</span><strong>$${item.price},00</strong></div>
          <div class="field"><span>Barcode_1</span><strong>${item.barcode}</strong></div>
        </div>
      </div>
    </div>
    <div class="stock-card">
      <div class="stock-head">
        <h3>STOCK LOG <span class="count">17</span></h3>
        <i data-lucide="chevron-down"></i>
      </div>
      ${stockLog
        .map(
          (entry) => `
            <div class="stock-group">
              <div class="stock-date">${entry.date} <span class="count">1</span></div>
              <div class="stock-entry">
                <img class="thumb" src="${item.img}" alt="${item.name}" loading="lazy" />
                <span>
                  <span class="entry-title">${item.name}</span>
                  <span class="entry-user">${entry.user}</span>
                </span>
                <span class="change negative">${entry.qty}</span>
              </div>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function renderHistory(target, rows, type) {
  let lastDate = "";
  qs(target).innerHTML = rows
    .map((row) => {
      const dateHead =
        row.date === lastDate
          ? ""
          : `<div class="history-date">${row.date} <span class="count">${row.count}</span></div>`;
      lastDate = row.date;
      const changeClass = type === "in" ? "positive" : "negative";
      const sign = row.qty > 0 ? "+" : "";
      return `
        ${dateHead}
        <div class="history-entry">
          <img class="thumb" src="${row.img}" alt="${row.name}" loading="lazy" />
          <span>
            <span class="entry-title">${row.name}</span>
            <span class="entry-user">${row.user}</span>
          </span>
          <span class="change ${changeClass}">${sign}${row.qty}</span>
        </div>
      `;
    })
    .join("");
}

function setView(viewName) {
  document.body.dataset.view = viewName;
  qsa(".view").forEach((view) => view.classList.remove("active"));
  qsa(".rail-button").forEach((button) => button.classList.toggle("active", button.dataset.view === viewName));
  qs(`#${viewName}View`)?.classList.add("active");
  const label = viewName === "items" ? "ITEMS" : viewName === "checklist" ? "Checklist" : "ITEMS";
  qs("#globalSearch").placeholder = `Search ${label}`;
  searchQuery = "";
  qs("#globalSearch").value = "";
  renderProducts();
  renderChecklist();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function viewFromHash() {
  const viewName = window.location.hash.replace("#", "");
  return qsa(".view").some((view) => view.id === `${viewName}View`) ? viewName : "home";
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    if (event.target.closest(".action-mini")) {
      return;
    }

    const viewButton = event.target.closest("[data-view]");
    if (viewButton) {
      setView(viewButton.dataset.view);
      return;
    }

    const product = event.target.closest("[data-index]");
    if (product) {
      selectedIndex = Number(product.dataset.index);
      renderProducts();
      renderDetail();
      refreshIcons();
      if (window.matchMedia("(max-width: 900px)").matches) {
        qs("#itemDetail").scrollIntoView({ block: "start", behavior: "smooth" });
      }
    }
  });

  document.addEventListener("keydown", (event) => {
    const product = event.target.closest("[data-index]");
    if (!product || !["Enter", " "].includes(event.key)) {
      return;
    }
    event.preventDefault();
    selectedIndex = Number(product.dataset.index);
    renderProducts();
    renderDetail();
    refreshIcons();
    if (window.matchMedia("(max-width: 900px)").matches) {
      qs("#itemDetail").scrollIntoView({ block: "start", behavior: "smooth" });
    }
  });

  qs(".menu-toggle").addEventListener("click", () => {
    qs("#globalSearch").focus();
  });

  qs("#globalSearch").addEventListener("input", (event) => {
    searchQuery = event.target.value.trim().toLowerCase();
    renderProducts();
    renderChecklist();
    refreshIcons();
  });
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

document.body.dataset.view = "home";
renderHome();
renderProducts();
renderChecklist();
renderDetail();
renderHistory("#warehouseIn", warehouseIn, "in");
renderHistory("#warehouseOut", warehouseOut, "out");
bindEvents();
refreshIcons();
if (window.location.hash) {
  setView(viewFromHash());
  refreshIcons();
}
