const articles = [
  { category: "AI 人工智慧", title: "AI 的下一站：走出螢幕，走進現實", desc: "從理解語言到理解物理世界，下一波人工智慧，正在重新定義人與機器的關係。", image: "photo-1677442136019-21780ecad995", minutes: 6, body: ["當 AI 不再只是回答問題，而是必須拿起物件、判斷空間、完成一連串動作，挑戰就從語言延伸到真實世界。", "這篇示範專題的觀察角度是：感知、決策與行動如何連接？機器能不能在不同環境中可靠地完成任務，比單次驚豔的展示更值得關注。", "正式報導將以可核實的研究、產品發布與實際測試為依據，區分展示能力與已部署能力。"] },
  { category: "晶片與算力", title: "不只比晶片：AI 時代的算力競賽，還在比什麼？", desc: "運算效能之外，記憶體、互連、散熱與能源，都是整個系統的一部分。", image: "photo-1518770660439-4636190af475", minutes: 5, body: ["一顆晶片的峰值效能，並不能完整描述整座資料中心的工作表現。資料如何傳輸、記憶體能否跟上，以及系統如何散熱，都會影響結果。", "這個選題將從整體系統出發，解釋算力背後的基礎設施。閱讀比較數據時，也需要核對測試條件、工作負載與能源成本。"] },
  { category: "機器人", title: "人形機器人走進工廠，離走進你家還有多遠？", desc: "工廠與客廳之間，隔著的不只是價格，還有可靠性、安全與真實使用情境。", image: "photo-1485827404703-89b55fcc595e", minutes: 4, body: ["能在受控場景執行任務，和能在每天變動的家中幫忙，是兩種不同的要求。家庭環境中的物品、動線與人際互動，更難預先規劃。", "示範報導將從任務範圍、人工介入程度與長時間運行表現來閱讀機器人展示，避免把精心挑選的片段當成日常能力。"] },
  { category: "太空與科學", title: "重新想像飛行：超音速，能不能更安靜？", desc: "從聲音的傳播到飛機的外形設計，一起理解低音爆研究想解決的問題。", image: "photo-1436491865332-7a61a109cc05", minutes: 3, body: ["超音速飛行帶來的不只速度，也包含地面能聽見的聲學影響。低音爆研究關注如何藉由飛機設計改變衝擊波的分布。", "ToGo Studio 已有 X-59 相關影片。正式文章可整合影片、官方研究來源與圖解，並清楚區分研究目標、測試結果與商用進展。"], video: "https://www.youtube.com/shorts/onTYIbFWFyo" },
  { category: "未來交通", title: "自動駕駛的下一道考題：讀懂真實道路", desc: "比起一次順利的旅程，複雜路況與例外事件，更能看出系統的能力邊界。", image: "photo-1503376780353-7e6692767b70", minutes: 4, body: ["道路不是固定腳本。施工、天氣、臨時指揮與不同用路人的行為，都可能讓原本容易的任務變得複雜。", "這篇概念稿規劃以使用情境為主軸，說明不同系統的適用範圍。正式發布時將核對地區法規、產品版本與測試日期。"] },
  { category: "科技生活", title: "當 AI 成為日常工具，我們該保留哪些判斷？", desc: "讓工具處理重複工作，也讓自己保留查證、選擇與理解的空間。", image: "photo-1499750310107-5fef28a66643", minutes: 4, body: ["從整理筆記到協助寫作，AI 工具可以縮短某些工作步驟，但產出的資訊仍需要適當查證。", "這個生活科技選題關注工作流程：哪些內容適合交給工具、哪些結果需要人工確認，以及如何避免把方便誤認為可靠。"] }
];

const categories = ["全部", "AI 人工智慧", "晶片與算力", "機器人", "太空與科學", "未來交通", "科技生活"];
let selected = "全部";
let query = "";

const categoryEl = document.getElementById("categories");
const cardsEl = document.getElementById("cards");
const emptyEl = document.getElementById("empty");
const resultCountEl = document.getElementById("result-count");
const feedTitleEl = document.getElementById("feed-title");
const dialog = document.getElementById("article");
const articleContent = document.getElementById("article-content");
const searchBox = document.getElementById("search-box");
const searchInput = document.getElementById("search");
const searchToggle = document.getElementById("search-toggle");

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[char]));
}

function photoSrc(id, width) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=75`;
}

function photoImg({ id, alt, widths, sizes, lazy }) {
  const srcset = widths.map((width) => `${photoSrc(id, width)} ${width}w`).join(", ");
  const largest = widths[widths.length - 1];
  return `<img src="${photoSrc(id, largest)}" srcset="${srcset}" sizes="${sizes}" alt="${escapeHtml(alt)}" width="${largest}" height="${Math.round(largest * 0.66)}"${lazy ? ' loading="lazy"' : ""} decoding="async">`;
}

categories.forEach((category) => {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = category;
  button.className = category === selected ? "active" : "";
  button.setAttribute("aria-pressed", String(category === selected));
  button.addEventListener("click", () => {
    selected = category;
    render();
  });
  categoryEl.append(button);
});

function render() {
  [...categoryEl.children].forEach((button) => {
    const active = button.textContent === selected;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  const filtered = articles
    .map((article, id) => ({ ...article, id }))
    .filter((article) => (
      (selected === "全部" || article.category === selected) &&
      (!query || (article.title + article.desc + article.category).toLowerCase().includes(query.toLowerCase()))
    ));

  cardsEl.innerHTML = filtered.map((article) => `<button class="card story-link" type="button" data-id="${article.id}"><div class="image">${photoImg({ id: article.image, alt: `${article.category}情境示意圖片`, widths: [480, 800], sizes: "(max-width: 600px) 90vw, (max-width: 900px) 44vw, 450px", lazy: true })}<span>${escapeHtml(article.category)}</span></div><div class="meta">TOGO INSIGHT / 示範選題</div><h3>${escapeHtml(article.title)}</h3><p>${escapeHtml(article.desc)}</p><div class="card-bottom"><span>ToGo 編輯部 · ${article.minutes} 分鐘閱讀規劃</span><b>↗</b></div></button>`).join("");
  emptyEl.hidden = filtered.length > 0;
  resultCountEl.textContent = `${filtered.length} 篇示範選題`;
  feedTitleEl.textContent = query ? "搜尋結果" : selected === "全部" ? "文章庫" : selected;
}

document.addEventListener("click", (event) => {
  const card = event.target.closest(".story-link");
  if (!card) return;
  const article = articles[Number(card.dataset.id)];
  if (!article) return;
  const video = article.video
    ? `<a class="article-link" href="${escapeHtml(article.video)}" target="_blank" rel="noopener">觀看 ToGo Studio 相關影片 ↗</a>`
    : "";
  articleContent.innerHTML = `<span class="eyebrow">${escapeHtml(article.category)} · TOGO INSIGHT</span><h2 id="article-title">${escapeHtml(article.title)}</h2><p class="notice">網站設計示範稿 · 非即時新聞。下列為選題摘要，正式報導尚未發布。</p>${photoImg({ id: article.image, alt: `${article.category}情境示意`, widths: [640, 1000], sizes: "(max-width: 760px) 92vw, 680px", lazy: false })}<p><strong>${escapeHtml(article.desc)}</strong></p>${article.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}${video}<p class="notice">圖片：Unsplash 情境示意，非新聞事件現場。正式版將補上逐篇來源、作者與發布日期。</p>`;
  dialog.showModal();
});

document.getElementById("close-article").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});

searchToggle.addEventListener("click", () => {
  searchBox.hidden = !searchBox.hidden;
  searchToggle.setAttribute("aria-expanded", String(!searchBox.hidden));
  if (!searchBox.hidden) searchInput.focus();
});
searchInput.addEventListener("input", (event) => {
  query = event.target.value.trim();
  render();
});
document.getElementById("clear-search").addEventListener("click", () => {
  query = "";
  searchInput.value = "";
  render();
  searchInput.focus();
});

render();

const homeSections = { radar: [0, 2], practical: [4, 5], industry: [1, 3] };
for (const [sectionId, articleIds] of Object.entries(homeSections)) {
  const grid = document.querySelector(`#${sectionId} .desk-grid`);
  for (const articleId of articleIds) {
    const article = articles[articleId];
    const button = document.createElement("button");
    button.type = "button";
    button.className = "desk-story story-link";
    button.dataset.id = String(articleId);
    button.innerHTML = `${photoImg({ id: article.image, alt: "", widths: [160, 240], sizes: "105px", lazy: true })}<span><small>${escapeHtml(article.category)}</small><strong>${escapeHtml(article.title)}</strong></span>`;
    grid.append(button);
  }
}
