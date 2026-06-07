const image = (id, w = 240, h = 240) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

const SUPABASE_REST_URL = "https://ilkfyzcqpbmimrkfybhx.supabase.co/rest/v1";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_2ifsGwogi_ZOP1LlrJggYg_l5VyBRk6";
const FALLBACK_THUMB = "assets/items-icon.svg";
const thumbFallback = `onerror="this.onerror=null; this.src='${FALLBACK_THUMB}'"`;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const moduleMeta = {
  items: {
    id: "items",
    title: "item",
    subtitle: "Inventory list",
    icon: "package-open",
  },
  "warehouse history": {
    id: "warehouse",
    title: "Warehouse",
    subtitle: "IN / OUT movement log",
    icon: "warehouse",
  },
  warehouse: {
    id: "warehouse",
    title: "Warehouse",
    subtitle: "IN / OUT movement log",
    icon: "warehouse",
  },
  people: {
    id: "people",
    title: "People",
    subtitle: "Staff and operators",
    icon: "users",
  },
  "setup work": {
    id: "setup",
    title: "Setup Work",
    subtitle: "Workflow settings",
    icon: "settings-2",
  },
};

let homeItems = [
  {
    id: "items",
    title: "item",
    subtitle: "Inventory list",
    icon: "package-open",
    iconUrl: "assets/items-icon.svg",
  },
  {
    id: "warehouse",
    title: "Warehouse",
    subtitle: "IN / OUT movement log",
    icon: "warehouse",
    iconUrl: "https://cdn-icons-png.flaticon.com/128/2897/2897818.png",
  },
  {
    id: "people",
    title: "People",
    subtitle: "Staff and operators",
    icon: "users",
    iconUrl: "https://cdn-icons-png.flaticon.com/128/1489/1489404.png",
  },
  {
    id: "setup",
    title: "Setup Work",
    subtitle: "Workflow settings",
    icon: "settings-2",
    iconUrl: "https://cdn-icons-png.flaticon.com/128/2049/2049831.png",
  },
];

let items = [
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

let stockLog = [
  { date: "17/5/2026", user: "Ammar", qty: 3 },
  { date: "27/4/2026", user: "Franco", qty: 1 },
  { date: "26/3/2026", user: "Store", qty: 1 },
];

let warehouseIn = [
  { date: "01/6/2026", count: 14, name: "Sauce Pistachio", user: "Ammar", qty: 14, img: image("photo-1606312619070-d48b4c652a52") },
  { date: "30/5/2026", count: 29, name: "A2 Can 500ml (Mojito)", user: "Ammar", qty: 9, img: image("photo-1544787219-7f47ccb76574") },
  { date: "30/5/2026", count: 29, name: "Lotus Sauce", user: "Ammar", qty: 20, img: image("photo-1581636625402-29b2a704ef13") },
  { date: "24/5/2026", count: 4, name: "Oil", user: "Store", qty: 1, img: image("photo-1474979266404-7eaacbcd87c5") },
  { date: "24/5/2026", count: 4, name: "Milk Chocolate", user: "Franco", qty: 3, img: image("photo-1511381939415-e44015466834") },
];

let warehouseOut = [
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

async function supabaseFetch(path) {
  const response = await fetch(`${SUPABASE_REST_URL}/${path}`, {
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Supabase ${path} failed: ${response.status}`);
  }

  return response.json();
}

async function supabaseInsert(table, payload) {
  const response = await fetch(`${SUPABASE_REST_URL}/${table}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${SUPABASE_PUBLISHABLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let message = `${response.status}`;
    try {
      const error = await response.json();
      message = error.message || message;
    } catch {
      message = await response.text();
    }
    throw new Error(`Supabase insert ${table} failed: ${message}`);
  }

  return response.json();
}

function normalizeMenuRow(row) {
  const key = String(row.menu || "").trim().toLowerCase();
  const meta = moduleMeta[key];
  if (!meta) {
    return null;
  }

  return {
    ...meta,
    iconUrl: meta.id === "items" ? "assets/items-icon.svg" : row.icon || "",
  };
}

function normalizeItemRow(row) {
  return {
    id: row.id || "",
    name: row.name || "Unnamed item",
    price: Number(row.price || 0),
    unit: row.unit || "",
    barcode: row.barcode_1 || "",
    img: row.image_url || image("photo-1523049673857-eb18f1d7b578"),
  };
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en-GB").format(new Date(value));
}

function normalizeWarehouseRow(row) {
  const item = row.items || {};
  const person = row.people || {};
  const qty = Number(row.quantity || 0);
  return {
    date: formatDate(row.created_at),
    count: Math.abs(qty),
    name: item.name || row.note || "Warehouse item",
    user: person.name || "Store",
    qty: row.movement_type === "OUT" ? -Math.abs(qty) : Math.abs(qty),
    img: item.image_url || image("photo-1606312619070-d48b4c652a52"),
  };
}

async function hydrateFromSupabase() {
  try {
    const menuRows = await supabaseFetch("menu?select=id,menu,catalog,icon,permission&order=catalog.asc");
    const nextMenu = menuRows.map(normalizeMenuRow).filter(Boolean);
    if (nextMenu.length) {
      homeItems = nextMenu;
      renderHome();
    }
  } catch (error) {
    console.info(error.message);
  }

  try {
    const itemRows = await supabaseFetch("items?select=id,name,unit,price,barcode_1,image_url,active&active=eq.true&order=name.asc");
    if (itemRows.length) {
      items = itemRows.map(normalizeItemRow);
      selectedIndex = 0;
      renderProducts();
      renderDetail();
      refreshIcons();
    }
  } catch (error) {
    console.info(error.message);
  }

  try {
    const historyRows = await supabaseFetch(
      "warehouse_history?select=id,movement_type,quantity,note,created_at,items(name,image_url),people(name)&order=created_at.desc&limit=60",
    );
    if (historyRows.length) {
      const normalized = historyRows.map(normalizeWarehouseRow);
      warehouseIn = normalized.filter((row) => row.qty >= 0);
      warehouseOut = normalized.filter((row) => row.qty < 0);
      renderHistory("#warehouseIn", warehouseIn, "in");
      renderHistory("#warehouseOut", warehouseOut, "out");
      refreshIcons();
    }
  } catch (error) {
    console.info(error.message);
  }
}

function renderHome() {
  qs("#homeMenu").innerHTML = homeItems
    .map(
      (item) => `
        <button class="menu-card" type="button" data-view="${item.id}">
          <span class="menu-visual">
            <i data-lucide="${item.icon}"></i>
            ${
              item.iconUrl
                ? `<img src="${item.iconUrl}" alt="" loading="lazy" onerror="this.remove()" />`
                : ""
            }
          </span>
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

const actionIcons = {
  plus: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>`,
  minus: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14" /></svg>`,
  check: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 5 5L20 7" /></svg>`,
};

function pad2(value) {
  return String(value).padStart(2, "0");
}

function localDateParts(value) {
  return {
    date: `${value.getFullYear()}-${pad2(value.getMonth() + 1)}-${pad2(value.getDate())}`,
    time: `${pad2(value.getHours())}:${pad2(value.getMinutes())}:${pad2(value.getSeconds())}`,
  };
}

function currentOperatorName() {
  return qs(".avatar")?.textContent?.trim() || "U";
}

function checkPayloadForItem(item) {
  const now = new Date();
  const local = localDateParts(now);
  const payload = {
    item_name: item.name,
    item_image_url: item.img || "",
    operator_name: currentOperatorName(),
    checked_at: now.toISOString(),
    checked_date: local.date,
    checked_time: local.time,
  };

  if (uuidPattern.test(item.id || "")) {
    payload.item_id = item.id;
  }

  return payload;
}

async function submitItemCheck(button, item) {
  if (!item || button.disabled) {
    return;
  }

  button.disabled = true;
  button.classList.remove("is-checked", "is-error");
  button.classList.add("is-saving");

  try {
    await supabaseInsert("check", checkPayloadForItem(item));
    button.classList.remove("is-saving");
    button.classList.add("is-checked");
  } catch (error) {
    console.info(error.message);
    button.classList.remove("is-saving");
    button.classList.add("is-error");
    setTimeout(() => button.classList.remove("is-error"), 1600);
  } finally {
    setTimeout(() => {
      button.disabled = false;
    }, 700);
  }
}

function rowActions() {
  return `
    <div class="row-actions">
      <span class="qty">0</span>
      <button class="action-mini plus" type="button" aria-label="Cộng">${actionIcons.plus}</button>
      <button class="action-mini minus" type="button" aria-label="Trừ">${actionIcons.minus}</button>
      <button class="action-mini confirm" type="button" aria-label="Xác nhận">${actionIcons.check}</button>
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
          <img class="thumb" src="${item.img}" alt="${item.name}" loading="lazy" ${thumbFallback} />
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

function renderDetail() {
  const item = items[selectedIndex];
  qs("#itemDetail").innerHTML = `
    <div class="detail-top">
      <h2>Thông tin chi tiết của item</h2>
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
                <img class="thumb" src="${item.img}" alt="${item.name}" loading="lazy" ${thumbFallback} />
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
          <img class="thumb" src="${row.img}" alt="${row.name}" loading="lazy" ${thumbFallback} />
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
  const searchLabels = {
    items: "item",
    warehouse: "Warehouse",
    people: "People",
    setup: "Setup Work",
    home: "Home",
  };
  const label = searchLabels[viewName] || viewName;
  qs("#globalSearch").placeholder = `Search ${label}`;
  searchQuery = "";
  qs("#globalSearch").value = "";
  renderProducts();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function viewFromHash() {
  const viewName = window.location.hash.replace("#", "");
  return qsa(".view").some((view) => view.id === `${viewName}View`) ? viewName : "home";
}

function bindEvents() {
  document.addEventListener("click", async (event) => {
    const actionButton = event.target.closest(".action-mini");
    if (actionButton) {
      if (actionButton.classList.contains("confirm")) {
        const product = actionButton.closest("[data-index]");
        const item = items[Number(product?.dataset.index)];
        await submitItemCheck(actionButton, item);
      }
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
      if (window.matchMedia("(min-width: 561px) and (max-width: 900px)").matches) {
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
    if (window.matchMedia("(min-width: 561px) and (max-width: 900px)").matches) {
      qs("#itemDetail").scrollIntoView({ block: "start", behavior: "smooth" });
    }
  });

  qs(".menu-toggle").addEventListener("click", () => {
    qs("#globalSearch").focus();
  });

  qs("#globalSearch").addEventListener("input", (event) => {
    searchQuery = event.target.value.trim().toLowerCase();
    renderProducts();
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
renderDetail();
renderHistory("#warehouseIn", warehouseIn, "in");
renderHistory("#warehouseOut", warehouseOut, "out");
bindEvents();
refreshIcons();
if (window.location.hash) {
  setView(viewFromHash());
  refreshIcons();
}
hydrateFromSupabase();
