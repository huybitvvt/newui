const image = (id, w = 240, h = 240) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

const SUPABASE_REST_URL = "https://ilkfyzcqpbmimrkfybhx.supabase.co/rest/v1";
const SUPABASE_API_URL = SUPABASE_REST_URL.replace("/rest/v1", "");
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_2ifsGwogi_ZOP1LlrJggYg_l5VyBRk6";
const FALLBACK_THUMB = "assets/items-icon.svg";
const CURRENT_BRAND = "MISSISSAUGA";
const CURRENT_BRANCH = "JT";
const thumbFallback = `onerror="this.onerror=null; this.src='${FALLBACK_THUMB}'"`;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const moduleMeta = {
  items: {
    id: "items",
    title: "Items",
    subtitle: "Inventory list",
    icon: "package-open",
    iconUrl: "assets/items-icon.svg",
  },
  checklist: {
    id: "checklist",
    title: "Checklist",
    subtitle: "Orders waiting for check",
    icon: "clipboard-check",
  },
  "warehouse history": {
    id: "warehouse",
    title: "Warehouse",
    subtitle: "IN / OUT movement log",
    icon: "warehouse",
    iconUrl: "https://cdn-icons-png.flaticon.com/128/2897/2897818.png",
  },
  warehouse: {
    id: "warehouse",
    title: "Warehouse",
    subtitle: "IN / OUT movement log",
    icon: "warehouse",
    iconUrl: "https://cdn-icons-png.flaticon.com/128/2897/2897818.png",
  },
  people: {
    id: "people",
    title: "People",
    subtitle: "Staff and operators",
    icon: "users",
    iconUrl: "https://cdn-icons-png.flaticon.com/128/1489/1489404.png",
  },
  "setup work": {
    id: "setup",
    title: "Setup Work",
    subtitle: "Workflow settings",
    icon: "settings-2",
    iconUrl: "https://cdn-icons-png.flaticon.com/128/2049/2049831.png",
  },
};

let homeItems = [
  {
    id: "items",
    title: "Items",
    subtitle: "Inventory list",
    icon: "package-open",
    iconUrl: "assets/items-icon.svg",
  },
  {
    id: "checklist",
    title: "Checklist",
    subtitle: "Orders waiting for check",
    icon: "clipboard-check",
    iconUrl: "",
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
let activeModal = null;
let inventoryByItemKey = {};
let checklistRows = [];
let workChecklistRows = [];
let fruitPhotoRows = [];
let peopleRows = [];
let peopleRoleFilter = "All";

const qs = (selector) => document.querySelector(selector);
const qsa = (selector) => [...document.querySelectorAll(selector)];

function supabaseAuthToken() {
  return localStorage.getItem("mississauga_access_token") || SUPABASE_PUBLISHABLE_KEY;
}

function supabaseHeaders(extra = {}) {
  return {
    apikey: SUPABASE_PUBLISHABLE_KEY,
    Authorization: `Bearer ${supabaseAuthToken()}`,
    "x-tenant-brand": CURRENT_BRAND,
    "x-tenant-branch": CURRENT_BRANCH,
    ...extra,
  };
}

async function supabaseFetch(path) {
  const response = await fetch(`${SUPABASE_REST_URL}/${path}`, {
    headers: supabaseHeaders({
      Accept: "application/json",
    }),
  });

  if (!response.ok) {
    throw new Error(`Supabase ${path} failed: ${response.status}`);
  }

  return response.json();
}

async function supabaseFetchWithFallback(primaryPath, fallbackPath) {
  try {
    return await supabaseFetch(primaryPath);
  } catch (error) {
    console.info(error.message);
    return supabaseFetch(fallbackPath);
  }
}

function withoutTenantColumns(payload) {
  const nextPayload = { ...payload };
  delete nextPayload.brand;
  delete nextPayload.branch;
  return nextPayload;
}

function withoutUnsupportedColumns(payload, message) {
  const nextPayload = /brand|branch/i.test(message) ? withoutTenantColumns(payload) : { ...payload };
  if (/operator_name/i.test(message)) {
    delete nextPayload.operator_name;
  }
  if (/log_type/i.test(message)) {
    delete nextPayload.log_type;
  }
  if (/order_check_id/i.test(message)) {
    delete nextPayload.order_check_id;
  }
  if (/order_quantity/i.test(message)) {
    delete nextPayload.order_quantity;
  }
  if (/note/i.test(message) && "quantity_change" in nextPayload) {
    delete nextPayload.note;
  }
  return nextPayload;
}

async function supabaseInsert(table, payload) {
  const response = await fetch(`${SUPABASE_REST_URL}/${table}`, {
    method: "POST",
    headers: supabaseHeaders({
      "Content-Type": "application/json",
      Prefer: "return=representation",
    }),
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
    const retryPayload = withoutUnsupportedColumns(payload, message);
    if (JSON.stringify(retryPayload) !== JSON.stringify(payload)) {
      return supabaseInsert(table, retryPayload);
    }
    throw new Error(`Supabase insert ${table} failed: ${message}`);
  }

  return response.json();
}

async function supabaseUpdate(table, filter, payload) {
  const response = await fetch(`${SUPABASE_REST_URL}/${table}?${filter}`, {
    method: "PATCH",
    headers: supabaseHeaders({
      "Content-Type": "application/json",
      Prefer: "return=representation",
    }),
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
    throw new Error(`Supabase update ${table} failed: ${message}`);
  }

  return response.json();
}

function normalizeMenuRow(row) {
  const key = String(row.menu || "").trim().toLowerCase();
  const meta = moduleMeta[key];
  if (!meta) {
    return null;
  }
  const iconValue = String(row.icon || "");
  const isImageIcon = /^(https?:\/\/|assets\/|\.\/|\/).+\.(svg|png|jpe?g|webp)(\?.*)?$/i.test(iconValue);

  return {
    ...meta,
    iconUrl: meta.id === "checklist" ? "" : isImageIcon ? iconValue : meta.iconUrl || "",
  };
}

function rowBrand(row) {
  return row?.brand || row?.items?.brand || row?.people?.brand || CURRENT_BRAND;
}

function rowBranch(row) {
  return row?.branch || row?.items?.branch || row?.people?.branch || CURRENT_BRANCH;
}

function isCurrentTenant(row) {
  return rowBrand(row) === CURRENT_BRAND && rowBranch(row) === CURRENT_BRANCH;
}

function tenantPayload(source = {}) {
  return {
    brand: source.brand || CURRENT_BRAND,
    branch: source.branch || CURRENT_BRANCH,
  };
}

function normalizeItemRow(row) {
  const category = row.item_categories || {};
  return {
    id: row.id || "",
    name: row.name || "Unnamed item",
    category: category.name || "Fruits - JT",
    price: Number(row.price || 0),
    unit: row.unit || "",
    barcode: row.barcode_1 || "",
    img: row.image_url || image("photo-1523049673857-eb18f1d7b578"),
    brand: row.brand || CURRENT_BRAND,
    branch: row.branch || CURRENT_BRANCH,
    stock: 0,
  };
}

function itemInventoryKey(item) {
  if (uuidPattern.test(item?.id || "")) {
    return item.id;
  }

  return String(item?.name || "").trim().toLowerCase();
}

function historyInventoryKey(row) {
  if (uuidPattern.test(row?.item_id || "")) {
    return row.item_id;
  }

  return String(row?.items?.name || "").trim().toLowerCase();
}

function buildInventoryMap(historyRows) {
  return historyRows.reduce((totals, row) => {
    const key = historyInventoryKey(row);
    if (!key) {
      return totals;
    }

    let quantity = 0;
    if (row.log_type) {
      quantity = Number(row.quantity_change || 0);
      if (!quantity && row.log_type === "ORDER") {
        quantity = -Math.abs(Number(row.order_quantity || 0));
      }
    } else {
      quantity = Math.abs(Number(row.quantity || 0));
      if (row.movement_type === "OUT") {
        quantity *= -1;
      } else if (row.movement_type === "ORDER") {
        quantity *= -1;
      }
    }

    if (!quantity) {
      return totals;
    }

    totals[key] = (totals[key] || 0) + quantity;
    return totals;
  }, {});
}

function applyInventoryToItems() {
  items = items.map((item) => ({
    ...item,
    stock: inventoryByItemKey[itemInventoryKey(item)] || 0,
  }));
}

function formatDate(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en-GB").format(new Date(value));
}

function formatTime(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function normalizeWarehouseRow(row) {
  const item = row.items || {};
  const person = row.people || {};
  const qty = Number(row.quantity || 0);
  return {
    date: formatDate(row.created_at),
    time: formatTime(row.created_at),
    count: Math.abs(qty),
    name: item.name || row.note || "Warehouse item",
    user: row.operator_name || person.name || "Store",
    qty: row.movement_type === "OUT" ? -Math.abs(qty) : Math.abs(qty),
    img: item.image_url || image("photo-1606312619070-d48b4c652a52"),
    brand: rowBrand(row),
    branch: rowBranch(row),
  };
}

function normalizeChecklistRow(row) {
  const item = row.items || {};
  const category = item.item_categories || {};
  const normalized = {
    id: row.id || "",
    itemId: row.item_id || "",
    name: row.item_name || item.name || "Checklist item",
    category: category.name || "Checklist",
    unit: item.unit || "",
    price: Number(item.price || 0),
    img: row.item_image_url || item.image_url || FALLBACK_THUMB,
    quantity: Number(row.quantity || 0),
    note: row.note || "",
    status: row.status || "pending",
    operator: row.operator_name || "U",
    checkedAt: row.checked_at || "",
    doneBy: row.done_by_name || "",
    doneAt: row.done_at || "",
    brand: rowBrand(row),
    branch: rowBranch(row),
  };

  normalized.stock = inventoryByItemKey[itemInventoryKey({ id: normalized.itemId, name: normalized.name })] || 0;
  return normalized;
}

function normalizeWorkChecklistRow(row) {
  return {
    id: row.id || "",
    work: row.work || "",
    note: row.note || "",
    team: row.team || "(empty)",
    branch: row.branch || CURRENT_BRANCH,
    brand: row.brand || CURRENT_BRAND,
    status: row.status || "pending",
    doneBy: row.done_by_name || "",
    doneAt: row.done_at || "",
  };
}

function checklistInventoryItem(row) {
  return {
    id: row.itemId,
    name: row.name,
    category: row.category,
    unit: row.unit,
    price: row.price,
    img: row.img,
    stock: row.stock,
    brand: row.brand,
    branch: row.branch,
    defaultQuantity: row.quantity || 0,
  };
}

function normalizePersonRow(row) {
  return {
    id: row.id || "",
    name: row.name || "Unnamed",
    role: row.role || "(empty)",
    phone: row.phone || "",
    email: row.email || "",
    active: row.active !== false,
    img: row.image_url || "",
    brand: row.brand || CURRENT_BRAND,
    branch: row.branch || CURRENT_BRANCH,
  };
}

function normalizeFruitPhotoRow(row) {
  return {
    id: row.id || "",
    url: row.photo_url || "",
    note: row.note || "",
    operator: row.operator_name || "U",
    createdAt: row.created_at || "",
    brand: row.brand || CURRENT_BRAND,
    branch: row.branch || CURRENT_BRANCH,
  };
}

async function hydrateFromSupabase() {
  try {
    const menuRows = await supabaseFetch("menu?select=id,menu,catalog,icon,permission&order=catalog.asc");
    const nextMenu = menuRows.map(normalizeMenuRow).filter(Boolean);
    if (nextMenu.length) {
      homeItems = nextMenu.some((item) => item.id === "checklist")
        ? nextMenu
        : [
            nextMenu[0],
            {
              id: "checklist",
              title: "Checklist",
              subtitle: "Orders waiting for check",
              icon: "clipboard-check",
              iconUrl: "",
            },
            ...nextMenu.slice(1),
          ];
      renderHome();
    }
  } catch (error) {
    console.info(error.message);
  }

  try {
    const itemRows = await supabaseFetchWithFallback(
      "items?select=id,name,unit,price,barcode_1,image_url,active,branch,brand,item_categories(name)&active=eq.true&order=name.asc",
      "items?select=id,name,unit,price,barcode_1,image_url,active,item_categories(name)&active=eq.true&order=name.asc",
    );
    if (itemRows.length) {
      items = itemRows.map(normalizeItemRow).filter(isCurrentTenant);
      applyInventoryToItems();
      selectedIndex = 0;
      renderProducts();
      renderDetail();
      refreshIcons();
    }
  } catch (error) {
    console.info(error.message);
  }

  try {
    const historyRows = await supabaseFetchWithFallback(
      "warehouse_history?select=id,item_id,movement_type,quantity,note,operator_name,created_at,branch,brand,items(name,image_url,branch,brand),people(name,branch,brand)&order=created_at.desc&limit=1000",
      "warehouse_history?select=id,item_id,movement_type,quantity,note,created_at,items(name,image_url),people(name)&order=created_at.desc&limit=1000",
    );
    const scopedHistoryRows = historyRows.filter(isCurrentTenant);
    inventoryByItemKey = buildInventoryMap(scopedHistoryRows);
    applyInventoryToItems();

    const normalized = scopedHistoryRows.slice(0, 60).map(normalizeWarehouseRow);
    warehouseIn = normalized.filter((row) => row.qty >= 0);
    warehouseOut = normalized.filter((row) => row.qty < 0);
    renderProducts();
    renderDetail();
    renderHistory("#warehouseIn", warehouseIn, "in");
    renderHistory("#warehouseOut", warehouseOut, "out");
    refreshIcons();
  } catch (error) {
    console.info(error.message);
  }

  try {
    const stockRows = await supabaseFetchWithFallback(
      "stock_log?select=id,item_id,log_type,quantity_change,order_quantity,note,operator_name,created_at,branch,brand,items(name,image_url,branch,brand),people(name,branch,brand)&order=created_at.desc&limit=1000",
      "stock_log?select=id,item_id,log_type,quantity_change,order_quantity,note,created_at,items(name,image_url),people(name)&order=created_at.desc&limit=1000",
    );
    const scopedStockRows = stockRows.filter(isCurrentTenant);
    inventoryByItemKey = buildInventoryMap(scopedStockRows);
    applyInventoryToItems();
    renderProducts();
    renderDetail();
    refreshIcons();
  } catch (error) {
    console.info(error.message);
  }

  try {
    const workChecklistRowsRaw = await supabaseFetchWithFallback(
      "checklist?select=id,work,note,team,branch,brand,status,done_by_name,done_at&order=team.asc,id.asc&limit=1000",
      "checklist?select=id,work,note,team,branch,status,done_by_name,done_at&order=team.asc,id.asc&limit=1000",
    );
    workChecklistRows = workChecklistRowsRaw.map(normalizeWorkChecklistRow).filter(isCurrentTenant);
    renderChecklist();
    refreshIcons();
  } catch (error) {
    console.info(error.message);
  }

  try {
    const checklistRowsRaw = await supabaseFetchWithFallback(
      "check?select=id,item_id,item_name,item_image_url,quantity,note,check_type,status,operator_name,checked_at,done_by_name,done_at,branch,brand,items(name,unit,price,image_url,branch,brand,item_categories(name))&order=created_at.desc&limit=1000",
      "check?select=id,item_id,item_name,item_image_url,quantity,note,check_type,status,operator_name,checked_at,done_by_name,done_at,items(name,unit,price,image_url,item_categories(name))&order=created_at.desc&limit=1000",
    );
    checklistRows = checklistRowsRaw.map(normalizeChecklistRow).filter(isCurrentTenant);
    renderChecklist();
    refreshIcons();
  } catch (error) {
    console.info(error.message);
    try {
      const fallbackSelect =
        "check?select=id,item_id,item_name,item_image_url,quantity,note,check_type,operator_name,checked_at,items(name,unit,price,image_url,item_categories(name))&order=created_at.desc&limit=1000";
      checklistRows = (await supabaseFetch(fallbackSelect)).map(normalizeChecklistRow).filter(isCurrentTenant);
      renderChecklist();
      refreshIcons();
    } catch (fallbackError) {
      console.info(fallbackError.message);
    }
  }

  try {
    const fruitPhotoRowsRaw = await supabaseFetchWithFallback(
      "fruit_order_photos?select=id,photo_url,note,operator_name,created_at,branch,brand&order=created_at.desc&limit=12",
      "fruit_order_photos?select=id,photo_url,note,operator_name,created_at&order=created_at.desc&limit=12",
    );
    fruitPhotoRows = fruitPhotoRowsRaw.map(normalizeFruitPhotoRow).filter(isCurrentTenant);
    renderChecklist();
    refreshIcons();
  } catch (error) {
    console.info(error.message);
  }

  try {
    const peopleRowsRaw = await supabaseFetchWithFallback(
      "people?select=id,name,role,phone,email,active,image_url,branch,brand&active=eq.true&order=role.asc,name.asc",
      "people?select=id,name,role,phone,email,active,image_url&active=eq.true&order=role.asc,name.asc",
    );
    peopleRows = peopleRowsRaw.map(normalizePersonRow).filter(isCurrentTenant);
    renderPeople();
    refreshIcons();
  } catch (error) {
    console.info(error.message);
    try {
      const fallbackSelect = "people?select=id,name,role,phone,email,active&active=eq.true&order=role.asc,name.asc";
      peopleRows = (await supabaseFetch(fallbackSelect)).map(normalizePersonRow);
      renderPeople();
      refreshIcons();
    } catch (fallbackError) {
      console.info(fallbackError.message);
    }
  }
}

function renderHome() {
  qs("#homeMenu").innerHTML = homeItems
    .map(
      (item) => `
        <button class="menu-card" type="button" data-view="${item.id}">
          <span class="menu-visual">
            ${
              item.iconUrl
                ? `<img src="${item.iconUrl}" alt="" loading="lazy" onerror="this.remove()" />`
                : `<i data-lucide="${item.icon}"></i>`
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
  cart: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2.2l2.2 10.4a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 1.9-1.4L22 8H6.1" /><path d="M9 8v8M18 8v8" /><circle cx="9" cy="20" r="1.3" /><circle cx="18" cy="20" r="1.3" /></svg>`,
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

function isFruitItem(item) {
  return `${item.category || ""} ${item.unit || ""}`.toLowerCase().includes("fruit");
}

function checkedItemBasePayload(item) {
  const now = new Date();
  const local = localDateParts(now);
  const payload = {
    ...tenantPayload(item),
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

function orderPayloadForItem(item, values) {
  const payload = {
    ...checkedItemBasePayload(item),
    check_type: "ORDER",
    note: values.note || null,
  };

  if (isFruitItem(item)) {
    payload.quantity = Number(values.quantity || 0);
  }

  return payload;
}

function itemRefPayload(item) {
  const payload = tenantPayload(item);
  if (uuidPattern.test(item?.id || "")) {
    payload.item_id = item.id;
  }

  return payload;
}

function closeModal() {
  activeModal = null;
  qs("#modalRoot")?.replaceChildren();
  document.body.classList.remove("modal-open");
}

function adjustModalQuantity(delta) {
  const input = qs("#modalQuantity");
  if (!input) {
    return;
  }
  const next = Math.max(0, Number(input.value || 0) + delta);
  input.value = String(next);
}

function modalShell({ title, body, saveLabel = "Save" }) {
  qs("#modalRoot").innerHTML = `
    <div class="modal-backdrop" role="presentation">
      <form class="modal-panel" id="actionModal" aria-label="${title}">
        <div class="modal-head">
          <button class="modal-close" type="button" data-modal-close aria-label="Close">×</button>
          <h2>${title}</h2>
          <div class="modal-actions">
            <button class="modal-secondary" type="button" data-modal-close>Cancel</button>
            <button class="modal-primary" type="submit">${saveLabel}</button>
          </div>
        </div>
        <div class="modal-body">${body}</div>
      </form>
    </div>
  `;
  document.body.classList.add("modal-open");
}

function openOrderModal(item, button) {
  if (!item) {
    return;
  }
  activeModal = { type: "order", item, button };
  const quantityField = isFruitItem(item)
    ? `
      <label class="form-field">
        <span>Quantity</span>
        <span class="stepper">
          <input id="modalQuantity" name="quantity" type="number" min="0" step="1" value="0" inputmode="numeric" />
          <button type="button" data-step="-1">${actionIcons.minus}</button>
          <button type="button" data-step="1">${actionIcons.plus}</button>
        </span>
      </label>
    `
    : "";

  modalShell({
    title: `${item.name} - Send to Checklist`,
    saveLabel: "Send to Checklist",
    body: `
      <label class="form-field">
        <span>ItemID</span>
        <select name="item" disabled><option>${item.name}</option></select>
      </label>
      <label class="form-field">
        <span>Type</span>
        <input name="type" type="text" value="ORDER" disabled />
      </label>
      ${quantityField}
      <label class="form-field">
        <span>Note</span>
        <textarea name="note" rows="3"></textarea>
      </label>
    `,
  });
}

function openStockModal(item, button, movementType = "IN") {
  if (!item) {
    return;
  }
  const isIn = movementType === "IN";
  const defaultQuantity = Math.max(0, Number(item.defaultQuantity || 0));
  activeModal = { type: "stock", item, button, movementType };
  modalShell({
    title: `${item.name} - ${isIn ? "Stock In" : "Stock Out"}`,
    saveLabel: isIn ? "Add to Warehouse" : "Remove from Warehouse",
    body: `
      <label class="form-field">
        <span>ItemID</span>
        <select name="item" disabled><option>${item.name}</option></select>
      </label>
      <label class="form-field image-field">
        <span>Image</span>
        <img class="modal-item-image" src="${item.img}" alt="${item.name}" loading="lazy" ${thumbFallback} />
      </label>
      <label class="form-field">
        <span>Quantity</span>
        <span class="stepper">
          <input id="modalQuantity" name="quantity" type="number" min="0" step="1" value="${defaultQuantity}" inputmode="numeric" />
          <button type="button" data-step="-1">${actionIcons.minus}</button>
          <button type="button" data-step="1">${actionIcons.plus}</button>
        </span>
      </label>
      <label class="form-field">
        <span>Type</span>
        <input name="type" type="text" value="${movementType}" disabled />
      </label>
      <label class="form-field">
        <span>Note</span>
        <textarea name="note" rows="3" placeholder="${isIn ? "Warehouse receive" : "Warehouse out"}"></textarea>
      </label>
    `,
  });
}

function markButtonState(button, state) {
  if (!button) {
    return;
  }
  button.classList.remove("is-saving", "is-checked", "is-error");
  if (state) {
    button.classList.add(state);
  }
}

async function submitOrderModal(form) {
  const { item, button } = activeModal;
  const formData = new FormData(form);
  const orderPayload = orderPayloadForItem(item, {
    quantity: formData.get("quantity"),
    note: formData.get("note")?.toString().trim(),
  });
  button.disabled = true;
  markButtonState(button, "is-saving");
  try {
    const [orderRow] = await supabaseInsert("check", orderPayload);
    await supabaseInsert("stock_log", {
      ...itemRefPayload(item),
      log_type: "ORDER",
      order_check_id: orderRow?.id || null,
      order_quantity: Number(orderPayload.quantity || 0),
      quantity_change: -Math.abs(Number(orderPayload.quantity || 0)),
      operator_name: currentOperatorName(),
      note: orderPayload.note || "Order request",
    });
    markButtonState(button, "is-checked");
    closeModal();
    await hydrateFromSupabase();
    navigateToView("checklist");
  } catch (error) {
    console.info(error.message);
    markButtonState(button, "is-error");
  } finally {
    setTimeout(() => {
      button.disabled = false;
    }, 700);
  }
}

async function submitStockModal(form) {
  const { item, button, movementType } = activeModal;
  const formData = new FormData(form);
  const quantity = Math.max(0, Number(formData.get("quantity") || 0));
  const isIn = movementType === "IN";
  const note = formData.get("note")?.toString().trim() || (isIn ? "Warehouse receive" : "Warehouse out");
  button.disabled = true;
  markButtonState(button, "is-saving");

  try {
    const [historyRow] = await supabaseInsert("warehouse_history", {
      ...itemRefPayload(item),
      movement_type: movementType,
      quantity,
      operator_name: currentOperatorName(),
      note,
    });
    await supabaseInsert("stock_log", {
      ...itemRefPayload(item),
      warehouse_history_id: historyRow?.id || null,
      quantity_change: isIn ? quantity : -quantity,
      operator_name: currentOperatorName(),
    });
    markButtonState(button, "is-checked");
    closeModal();
    await hydrateFromSupabase();
  } catch (error) {
    console.info(error.message);
    markButtonState(button, "is-error");
  } finally {
    setTimeout(() => {
      button.disabled = false;
    }, 700);
  }
}

function itemInitial(item) {
  return String(item?.name || "?").trim().charAt(0).toUpperCase() || "?";
}

function letterThumb(item, extraClass = "") {
  return `<span class="thumb thumb-letter ${extraClass}">${itemInitial(item)}</span>`;
}

function rowActions(item) {
  return `
    <div class="row-actions">
      <span class="qty stock-stack">
        <strong>${Number(item?.stock || 0)}</strong>
        <span>in stock</span>
      </span>
      <button class="action-mini plus" type="button" aria-label="Nhập kho" title="Nhập kho">${actionIcons.plus}</button>
      <button class="action-mini minus" type="button" aria-label="Xuất kho" title="Xuất kho">${actionIcons.minus}</button>
      <button class="action-mini confirm cart" type="button" aria-label="Gửi vào Checklist" title="Gửi vào Checklist">${actionIcons.cart}</button>
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
          ${letterThumb(item)}
          <span class="product-main">
            <span class="product-name">${item.name} · $${item.price}</span>
            <span class="product-unit">${item.unit}</span>
          </span>
          ${rowActions(item)}
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
      <h2>Item details</h2>
      <div class="toolbar">
        <button class="primary-button" type="button" data-stock-in-selected><i data-lucide="plus"></i><span>Stock In</span></button>
        <button class="icon-button" type="button" aria-label="Close"><i data-lucide="x"></i></button>
      </div>
    </div>
    <div class="detail-grid">
      <div class="item-hero">
        ${letterThumb(item, "hero-thumb")}
        <div>
          <div class="item-hero-name">${item.name}</div>
          <div class="item-hero-meta">
            <span>$${Number(item.price || 0).toFixed(2)}</span>
            <span>·</span>
            <span>${item.unit.replace("48/", "")}</span>
            <span>·</span>
            <strong>${Number(item.stock || 0)} in stock</strong>
          </div>
        </div>
      </div>
      <div class="quick-card">
        <button class="quick-action" type="button"><i data-lucide="pencil"></i><span>Edit</span></button>
        <button class="quick-action danger" type="button"><i data-lucide="minus"></i><span>Stock Out</span></button>
        <button class="quick-action success" type="button"><i data-lucide="shopping-cart"></i><span>Order</span></button>
        <button class="quick-action warn" type="button"><i data-lucide="calendar-days"></i><span>Expiry</span></button>
        <button class="quick-action" type="button"><i data-lucide="calendar-plus"></i><span>Link</span></button>
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
                ${letterThumb(item)}
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
            <span class="entry-user">${row.user}${row.time ? ` · ${row.time}` : ""}</span>
          </span>
          <span class="change ${changeClass}">${sign}${row.qty}</span>
        </div>
      `;
    })
    .join("");
}

function formatDateTime(value) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

function fruitOrderRows() {
  const allFruitRows = checklistRows.filter((row) => isFruitItem(row));
  const pendingRows = allFruitRows.filter((row) => row.status !== "done");
  return pendingRows.length ? pendingRows : allFruitRows;
}

function fruitSummaryItems() {
  const grouped = fruitOrderRows().reduce((totals, row) => {
    const key = row.itemId || row.name;
    totals[key] = totals[key] || {
      name: row.name,
      unit: row.unit || "",
      quantity: 0,
      price: Number(row.price || 0),
      img: row.img || FALLBACK_THUMB,
      notes: [],
    };
    totals[key].quantity += Number(row.quantity || 0);
    if (row.note) {
      totals[key].notes.push(row.note);
    }
    return totals;
  }, {});

  return Object.values(grouped).sort((a, b) => a.name.localeCompare(b.name));
}

function fruitSummaryText() {
  const rows = fruitSummaryItems();
  const lines = [
    `${CURRENT_BRAND} / ${CURRENT_BRANCH} - Fruit Order Summary`,
    `Generated: ${new Intl.DateTimeFormat("en-GB", { dateStyle: "short", timeStyle: "short" }).format(new Date())}`,
    "",
    ...(rows.length
      ? rows.map((row) => `${row.name}${row.price ? `-$${row.price}` : ""} | ${row.unit || "UNIT"} | Ordered: ${row.quantity}${row.notes.length ? ` | ${row.notes.join("; ")}` : ""}`)
      : ["No fruit orders"]),
  ];

  return lines.join("\n");
}

function loadCanvasImage(src) {
  return new Promise((resolve) => {
    if (!src) {
      resolve(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function drawRoundedImage(context, img, x, y, size) {
  context.save();
  context.beginPath();
  context.roundRect(x, y, size, size, 8);
  context.clip();
  context.drawImage(img, x, y, size, size);
  context.restore();
  context.strokeStyle = "#d9e4ee";
  context.lineWidth = 1;
  context.beginPath();
  context.roundRect(x, y, size, size, 8);
  context.stroke();
}

function wrapCanvasText(context, text, maxWidth) {
  const words = String(text || "").split(/\s+/);
  const lines = [];
  let current = "";

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (context.measureText(next).width <= maxWidth) {
      current = next;
      return;
    }
    if (current) {
      lines.push(current);
    }
    current = word;
  });

  if (current) {
    lines.push(current);
  }

  return lines;
}

async function fruitSummaryImageBlob() {
  const rows = fruitSummaryItems();
  const rowImages = await Promise.all(rows.map((row) => loadCanvasImage(row.img)));
  const capturedImages = await Promise.all(fruitPhotoRows.slice(0, 4).map((row) => loadCanvasImage(row.url)));
  const width = 960;
  const padding = 40;
  const rowHeight = 58;
  const displayRows = rows.length ? rows : [{ name: "No fruit orders", unit: "", quantity: 0, img: "" }];
  const photoHeight = capturedImages.some(Boolean) ? 210 : 0;
  const height = Math.max(260, 148 + displayRows.length * rowHeight + photoHeight);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");

  context.fillStyle = "#f4f8fb";
  context.fillRect(0, 0, width, height);
  context.fillStyle = "#ffffff";
  context.strokeStyle = "#cfdbe7";
  context.lineWidth = 2;
  context.beginPath();
  context.roundRect(18, 18, width - 36, height - 36, 12);
  context.fill();
  context.stroke();

  context.fillStyle = "#0f172a";
  context.font = "700 34px Arial, sans-serif";
  context.fillText("Fruit Order Summary", padding, 74);
  context.fillStyle = "#64748b";
  context.font = "18px Arial, sans-serif";
  context.fillText(`${CURRENT_BRAND} / ${CURRENT_BRANCH} · ${new Intl.DateTimeFormat("en-GB", { dateStyle: "short", timeStyle: "short" }).format(new Date())}`, padding, 108);

  context.fillStyle = "#e8f4fb";
  context.fillRect(padding, 130, width - padding * 2, 40);
  context.fillStyle = "#1677b9";
  context.font = "700 18px Arial, sans-serif";
  context.fillText("Photo", padding + 16, 156);
  context.fillText("Item", padding + 82, 156);
  context.fillText("Unit", width - 360, 156);
  context.fillText("Ordered", width - 140, 156);

  displayRows.forEach((row, index) => {
    const y = 170 + index * rowHeight;
    context.fillStyle = index % 2 ? "#ffffff" : "#fbfdff";
    context.fillRect(padding, y, width - padding * 2, rowHeight);
    context.strokeStyle = "#e2e8f0";
    context.beginPath();
    context.moveTo(padding, y + rowHeight);
    context.lineTo(width - padding, y + rowHeight);
    context.stroke();

    const img = rowImages[index];
    if (img) {
      drawRoundedImage(context, img, padding + 16, y + 7, 44);
    } else {
      context.fillStyle = "#eef4fa";
      context.beginPath();
      context.roundRect(padding + 16, y + 7, 44, 44, 8);
      context.fill();
      context.fillStyle = "#64748b";
      context.font = "700 20px Arial, sans-serif";
      context.fillText("?", padding + 33, y + 36);
    }

    context.fillStyle = "#0f172a";
    context.font = "700 20px Arial, sans-serif";
    const itemLines = wrapCanvasText(context, `${row.name}${row.price ? `-$${row.price}` : ""}`, width - 540);
    context.fillText(itemLines[0] || row.name, padding + 82, y + 35);
    context.fillStyle = "#334155";
    context.font = "18px Arial, sans-serif";
    context.fillText(row.unit || "UNIT", width - 360, y + 35);
    context.fillStyle = "#1677b9";
    context.font = "700 22px Arial, sans-serif";
    context.fillText(String(row.quantity), width - 120, y + 36);
  });

  if (capturedImages.some(Boolean)) {
    const y = 184 + displayRows.length * rowHeight;
    context.fillStyle = "#0f172a";
    context.font = "700 22px Arial, sans-serif";
    context.fillText("Purchased Fruit Photos", padding, y);
    capturedImages.forEach((img, index) => {
      if (!img) {
        return;
      }
      const x = padding + index * 216;
      drawRoundedImage(context, img, x, y + 20, 180);
    });
  }

  return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
}

async function copyFruitSummary(button) {
  if (!button) {
    return;
  }

  const original = button.innerHTML;
  button.disabled = true;
  button.innerHTML = `<i data-lucide="loader-2"></i><span>Copying...</span>`;
  refreshIcons();

  try {
    const blob = await fruitSummaryImageBlob();
    if (blob && navigator.clipboard && window.ClipboardItem) {
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      button.innerHTML = `<i data-lucide="check"></i><span>Copied image</span>`;
    } else {
      await navigator.clipboard.writeText(fruitSummaryText());
      button.innerHTML = `<i data-lucide="check"></i><span>Copied text</span>`;
    }
  } catch (error) {
    console.info(error.message);
    try {
      await navigator.clipboard.writeText(fruitSummaryText());
      button.innerHTML = `<i data-lucide="check"></i><span>Copied text</span>`;
    } catch (fallbackError) {
      console.info(fallbackError.message);
      button.innerHTML = `<i data-lucide="x"></i><span>Copy failed</span>`;
    }
  } finally {
    refreshIcons();
    setTimeout(() => {
      button.disabled = false;
      button.innerHTML = original;
      refreshIcons();
    }, 1400);
  }
}

function openHiddenFileInput({ accept = "image/*", capture = "environment" } = {}) {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    if (capture) {
      input.setAttribute("capture", capture);
    }
    input.style.position = "fixed";
    input.style.left = "-10000px";
    input.addEventListener("change", () => {
      const file = input.files?.[0] || null;
      input.remove();
      resolve(file);
    }, { once: true });
    document.body.appendChild(input);
    input.click();
  });
}

function compressImageFile(file, maxSize = 1280, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(img.width * scale));
        canvas.height = Math.max(1, Math.round(img.height * scale));
        const context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

async function captureFruitPhoto(button) {
  if (!button) {
    return;
  }

  const original = button.innerHTML;
  button.disabled = true;
  button.innerHTML = `<i data-lucide="loader-2"></i><span>Opening camera...</span>`;
  refreshIcons();

  try {
    const file = await openHiddenFileInput();
    if (!file) {
      return;
    }
    button.innerHTML = `<i data-lucide="loader-2"></i><span>Saving photo...</span>`;
    refreshIcons();
    const photoUrl = await compressImageFile(file);
    await supabaseInsert("fruit_order_photos", {
      ...tenantPayload(),
      photo_url: photoUrl,
      operator_name: currentOperatorName(),
      note: "Fruit purchase confirmation",
    });
    await hydrateFromSupabase();
    button.innerHTML = `<i data-lucide="check"></i><span>Photo saved</span>`;
  } catch (error) {
    console.info(error.message);
    button.innerHTML = `<i data-lucide="x"></i><span>Photo failed</span>`;
  } finally {
    refreshIcons();
    setTimeout(() => {
      button.disabled = false;
      button.innerHTML = original;
      refreshIcons();
    }, 1400);
  }
}

function fruitPhotoStripHtml() {
  if (!fruitPhotoRows.length) {
    return "";
  }

  return `
    <div class="fruit-photo-strip" aria-label="Fruit purchase photos">
      ${fruitPhotoRows.slice(0, 4).map((photo) => `
        <figure>
          <img src="${photo.url}" alt="Fruit purchase by ${photo.operator}" loading="lazy" />
          <figcaption>${photo.operator} · ${formatDateTime(photo.createdAt)}</figcaption>
        </figure>
      `).join("")}
    </div>
  `;
}

function fruitSummaryButtonHtml() {
  return `
    <div class="checklist-summary-bar">
      <button class="summary-copy-button camera" type="button" data-capture-fruits-photo>
        <i data-lucide="camera"></i>
        <span>Capture Fruit Photo</span>
      </button>
      <button class="summary-copy-button" type="button" data-copy-fruits-summary>
        <i data-lucide="copy"></i>
        <span>Copy Fruit Orders</span>
      </button>
    </div>
    ${fruitPhotoStripHtml()}
  `;
}

function renderChecklist() {
  const target = qs("#checklistList");
  if (!target) {
    return;
  }

  const visibleRows = checklistRows
    .map((row, index) => ({ ...row, index }))
    .filter((row) => {
      const targetText = `${row.name} ${row.category} ${row.unit} ${row.note} ${row.status} ${row.operator}`.toLowerCase();
      return targetText.includes(searchQuery);
    });

  if (!visibleRows.length) {
    target.innerHTML = `
      <div class="empty-state">
        <i data-lucide="clipboard-check"></i>
        <span>No item orders in Checklist</span>
      </div>
      ${fruitSummaryButtonHtml()}
    `;
    return;
  }

  const grouped = visibleRows.reduce((groups, row) => {
    const key = row.category || "Checklist";
    groups[key] = groups[key] || [];
    groups[key].push(row);
    return groups;
  }, {});

  const itemHtml = Object.entries(grouped)
    .map(
      ([group, rows]) => `
        <div class="checklist-group">
          <div class="group-title">
            <span class="dot"></span>
            <strong>${group}</strong>
            <span class="count">${rows.length}</span>
          </div>
          ${rows
            .map(
              (row) => `
                <div class="product-row checklist-row ${row.status === "done" ? "done" : ""}" data-check-index="${row.index}">
                  ${letterThumb(row)}
                  <span class="product-main">
                    <span class="product-name">${row.name}${row.price ? ` · $${row.price}` : ""}</span>
                    <span class="product-unit">${row.unit || "ORDER"}</span>
                    <span class="check-meta">
                      ${row.status === "done" ? `Done by ${row.doneBy || row.operator || "U"} ${formatDateTime(row.doneAt)}` : `By ${row.operator} ${formatDateTime(row.checkedAt)}`}
                      ${row.quantity ? ` · Qty ${row.quantity}` : ""}
                      ${row.note ? ` · ${row.note}` : ""}
                    </span>
                  </span>
                  <div class="row-actions">
                    <span class="qty stock-stack">
                      <strong>${Number(row.stock || 0)}</strong>
                      <span>in stock</span>
                    </span>
                    <button class="action-mini plus checklist-action" type="button" data-check-action="in" aria-label="Nhập kho">${actionIcons.plus}</button>
                    <button class="action-mini minus checklist-action" type="button" data-check-action="out" aria-label="Xuất kho">${actionIcons.minus}</button>
                    <button class="action-mini check checklist-action ${row.status === "done" ? "is-checked" : ""}" type="button" data-check-action="done" aria-label="Done">${actionIcons.check}</button>
                  </div>
                </div>
              `,
            )
            .join("")}
        </div>
      `,
    )
    .join("");

  target.innerHTML = `${itemHtml}${fruitSummaryButtonHtml()}`;
}

function renderPeople() {
  const filterTarget = qs("#peopleFilter");
  const listTarget = qs("#peopleList");
  if (!filterTarget || !listTarget) {
    return;
  }

  const roleCounts = peopleRows.reduce(
    (counts, row) => {
      counts.All += 1;
      counts[row.role] = (counts[row.role] || 0) + 1;
      return counts;
    },
    { All: 0 },
  );
  const roles = ["All", ...Object.keys(roleCounts).filter((role) => role !== "All").sort()];
  if (!roles.includes(peopleRoleFilter)) {
    peopleRoleFilter = "All";
  }

  filterTarget.innerHTML = roles
    .map(
      (role) => `
        <button class="${role === peopleRoleFilter ? "active" : ""}" type="button" data-people-role="${role}">
          <span>${role}</span>
          <span class="count">${roleCounts[role]}</span>
        </button>
      `,
    )
    .join("");

  const visiblePeople = peopleRows.filter((person) => {
    const roleMatches = peopleRoleFilter === "All" || person.role === peopleRoleFilter;
    const text = `${person.name} ${person.role} ${person.phone} ${person.email}`.toLowerCase();
    return roleMatches && text.includes(searchQuery);
  });

  if (!visiblePeople.length) {
    listTarget.innerHTML = `<div class="empty-state"><i data-lucide="users"></i><span>No people found</span></div>`;
    return;
  }

  listTarget.innerHTML = `
    <div class="people-group-title">${peopleRoleFilter} <span class="count">${visiblePeople.length}</span></div>
    ${visiblePeople
      .map(
        (person) => `
          <div class="person-row">
            <span class="person-avatar">
              ${person.img ? `<img src="${person.img}" alt="${person.name}" loading="lazy" onerror="this.remove()" />` : person.name.slice(0, 1)}
            </span>
            <span class="person-main">
              <span class="entry-title">${person.name}</span>
              <span class="entry-user">${person.role}</span>
              ${person.email || person.phone ? `<span class="person-contact">${person.email || person.phone}</span>` : ""}
            </span>
            <span class="person-actions">
              <i data-lucide="trash-2"></i>
              <i data-lucide="pencil"></i>
              <i data-lucide="mail"></i>
            </span>
          </div>
        `,
      )
      .join("")}
  `;
}

function setView(viewName) {
  document.body.dataset.view = viewName;
  qsa(".view").forEach((view) => view.classList.remove("active"));
  qsa(".rail-button").forEach((button) => button.classList.toggle("active", button.dataset.view === viewName));
  qs(`#${viewName}View`)?.classList.add("active");
  const searchLabels = {
    items: "item",
    checklist: "Checklist",
    warehouse: "Warehouse",
    people: "People",
    setup: "Setup Work",
    home: "Home",
  };
  const label = searchLabels[viewName] || viewName;
  qs("#globalSearch").placeholder = `Search ${label}`;
  searchQuery = "";
  qs("#globalSearch").value = "";
  renderActiveViewList();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function navigateToView(viewName, options = {}) {
  const validViewName = qsa(".view").some((view) => view.id === `${viewName}View`) ? viewName : "home";
  const nextHash = `#${validViewName}`;
  if (window.location.hash !== nextHash) {
    if (options.replace) {
      window.history.replaceState(null, "", nextHash);
    } else {
      window.location.hash = validViewName;
    }
  }
  setView(validViewName);
}

function activeViewName() {
  return document.body.dataset.view || "home";
}

function renderActiveViewList() {
  const viewName = activeViewName();
  if (viewName === "items") {
    renderProducts();
    return;
  }
  if (viewName === "checklist") {
    renderChecklist();
    return;
  }
  if (viewName === "people") {
    renderPeople();
  }
}

async function completeChecklistRow(row, button) {
  if (!row?.id) {
    return;
  }

  const now = new Date();
  const local = localDateParts(now);
  button.disabled = true;
  markButtonState(button, "is-saving");

  try {
    await supabaseUpdate("check", `id=eq.${encodeURIComponent(row.id)}`, {
      status: "done",
      done_by_name: currentOperatorName(),
      done_at: now.toISOString(),
      done_date: local.date,
      done_time: local.time,
    });
    markButtonState(button, "is-checked");
    await hydrateFromSupabase();
  } catch (error) {
    console.info(error.message);
    markButtonState(button, "is-error");
  } finally {
    setTimeout(() => {
      button.disabled = false;
    }, 700);
  }
}

async function completeWorkChecklistRow(row, button) {
  if (!row?.id) {
    return;
  }

  const now = new Date();
  const local = localDateParts(now);
  button.disabled = true;
  markButtonState(button, "is-saving");

  try {
    await supabaseUpdate("checklist", `id=eq.${encodeURIComponent(row.id)}`, {
      status: "done",
      done_by_name: currentOperatorName(),
      done_at: now.toISOString(),
      done_date: local.date,
      done_time: local.time,
      updated_at: now.toISOString(),
    });
    markButtonState(button, "is-checked");
    await hydrateFromSupabase();
  } catch (error) {
    console.info(error.message);
    markButtonState(button, "is-error");
  } finally {
    setTimeout(() => {
      button.disabled = false;
    }, 700);
  }
}

function viewFromHash() {
  const viewName = window.location.hash.replace("#", "");
  return qsa(".view").some((view) => view.id === `${viewName}View`) ? viewName : "home";
}

function bindEvents() {
  document.addEventListener("click", async (event) => {
    if (event.target.closest("[data-modal-close]")) {
      closeModal();
      return;
    }

    const stepButton = event.target.closest("[data-step]");
    if (stepButton) {
      adjustModalQuantity(Number(stepButton.dataset.step || 0));
      return;
    }

    if (event.target.closest("[data-stock-in-selected]")) {
      openStockModal(items[selectedIndex], event.target.closest("[data-stock-in-selected]"), "IN");
      return;
    }

    const copySummaryButton = event.target.closest("[data-copy-fruits-summary]");
    if (copySummaryButton) {
      await copyFruitSummary(copySummaryButton);
      return;
    }

    const captureFruitButton = event.target.closest("[data-capture-fruits-photo]");
    if (captureFruitButton) {
      await captureFruitPhoto(captureFruitButton);
      return;
    }

    const taskButton = event.target.closest("[data-task-action]");
    if (taskButton) {
      const rowEl = taskButton.closest("[data-task-index]");
      const row = workChecklistRows[Number(rowEl?.dataset.taskIndex)];
      if (row && taskButton.dataset.taskAction === "done") {
        await completeWorkChecklistRow(row, taskButton);
      }
      return;
    }

    const checklistButton = event.target.closest("[data-check-action]");
    if (checklistButton) {
      const rowEl = checklistButton.closest("[data-check-index]");
      const row = checklistRows[Number(rowEl?.dataset.checkIndex)];
      if (!row) {
        return;
      }
      const action = checklistButton.dataset.checkAction;
      if (action === "in") {
        openStockModal(checklistInventoryItem(row), checklistButton, "IN");
        return;
      }
      if (action === "out") {
        openStockModal(checklistInventoryItem(row), checklistButton, "OUT");
        return;
      }
      if (action === "done") {
        await completeChecklistRow(row, checklistButton);
      }
      return;
    }

    const actionButton = event.target.closest(".action-mini");
    if (actionButton) {
      const product = actionButton.closest("[data-index]");
      const item = items[Number(product?.dataset.index)];
      if (actionButton.classList.contains("plus")) {
        openStockModal(item, actionButton, "IN");
        return;
      }
      if (actionButton.classList.contains("minus")) {
        openStockModal(item, actionButton, "OUT");
        return;
      }
      if (actionButton.classList.contains("confirm")) {
        openOrderModal(item, actionButton);
      }
      return;
    }

    const viewButton = event.target.closest("[data-view]");
    if (viewButton) {
      navigateToView(viewButton.dataset.view);
      return;
    }

    const peopleRoleButton = event.target.closest("[data-people-role]");
    if (peopleRoleButton) {
      peopleRoleFilter = peopleRoleButton.dataset.peopleRole || "All";
      renderPeople();
      refreshIcons();
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
    renderActiveViewList();
    refreshIcons();
  });

  document.addEventListener("submit", async (event) => {
    if (event.target.id !== "actionModal") {
      return;
    }
    event.preventDefault();
    if (activeModal?.type === "order") {
      await submitOrderModal(event.target);
      return;
    }
    if (activeModal?.type === "stock") {
      await submitStockModal(event.target);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && activeModal) {
      closeModal();
    }
  });

  window.addEventListener("hashchange", () => {
    setView(viewFromHash());
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
renderChecklist();
renderPeople();
bindEvents();
refreshIcons();
if (window.location.hash) {
  navigateToView(viewFromHash(), { replace: true });
  refreshIcons();
}
hydrateFromSupabase();
