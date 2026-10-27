const NOTEBOOK_URL = "https://notebook.google.com/notebook/8658e99a-3087-4575-8e67-6054bf764723";

const focusDimensions = [
  "數與計算",
  "量與實測",
  "空間與形狀",
  "關係與代數",
  "資料與不確定性",
  "問題解決",
  "數學表徵",
  "數學推理",
  "數學溝通",
  "數學連結與應用"
];

const sourceRule = `請以本 NotebookLM 中已提供的「115 年數學評量架構」、歷年國小數學科題本、答案與解析資料為依據；若使用教師指定的通用能力名稱，請對照來源中可確認的官方名稱，無法確認時明確標示。不得把未出現在資料中的內容當成官方規定。`;

const taskDefinitions = [
  {
    id: "lights",
    icon: "◉",
    title: "紅黃綠重點分析",
    category: "教學決策",
    description: "依歷年證據判斷各能力的補強優先順序，不產生完整複習計畫。",
    build: ({ grade, years, evidence, unknown }) => `${sourceRule} 分析 ${grade} 的 ${years} 數學命題與學習重點。

【任務定位】
本任務只做「能力優先順序診斷」，請依筆記本中的數學評量向度整理紅黃綠三燈分析：
1. 紅燈：高優先補強——依評量架構或歷年題本，建議優先關注的能力。
2. 黃燈：持續關注——建議持續練習與觀察的能力。
3. 綠燈：維持延伸——建議維持練習與適度延伸的能力。

【輸出格式】
A. 先用 3 句話說明整體判斷。
B. 用表格列出：燈號、官方評量向度、對應數學內容、${evidence ? "年度／題號證據、" : "資料依據、"}判斷理由、優先處理事項。
C. 表格後列出最優先的 3 項補強能力，每項只說明一個最重要的判斷理由。

【資料使用原則】
請依評量架構、題目內容與可取得的作答或統計資料，說明各能力的教學優先順序。若沒有學生作答或答對率資料，請標示「學生表現待確認」，勿將題目出現頻率當成失分率或熟練程度。

${evidence ? "【證據要求】每個重要判斷請列出對應的年度、題號或資料名稱；若無法確認，請標示「證據不足」。" : "【證據要求】請指出判斷主要依據的資料範圍。"}
${unknown ? "【限制】資料不足時請明確說明，不要自行補寫或猜測未出現的題目、比例或官方規定。" : "【限制】請優先根據筆記本資料回答。"}

請使用繁體中文，清楚說明各項能力的優先順序與判斷依據。`,
  },
  {
    id: "trend",
    icon: "↗",
    title: "命題趨勢整理",
    category: "歷年分析",
    description: "只整理歷年命題向度、題型與變化，不直接安排教學。",
    build: ({ grade, years, evidence, unknown }) => `${sourceRule} 分析 ${grade} ${years} 的數學命題趨勢。

【任務定位】
請整理所選年級與資料範圍內，歷年題目呈現的命題特色與變化。

請從以下角度整理：
1. 官方評量向度的出現情形、題數分布與年度變化。
2. 數學內容：數與計算、量與實測、空間與形狀、關係與代數、資料與不確定性，以及筆記本中出現的其他領域。
3. 題型與情境：直接計算、圖表判讀、生活應用、題組、跨步驟問題與開放或非例行問題。
4. 學生需要進行的數學操作：辨識、理解、計算、表徵、推理、溝通、統整與應用。
5. 哪些是穩定出現的核心能力，哪些只是個別年度現象。
6. 常見錯誤與迷思，例如單位混淆、位值概念、運算順序、圖形性質或忽略題意條件。

請以「穩定核心、反覆出現但形式變化、偶爾出現」三層整理，並說明各項判斷所依據的題本與資料範圍。不要預測確切題目，也不要把單一年度題目說成長期趨勢。

【輸出格式】
A. 一段整體趨勢結論。
B. 命題趨勢分析表：向度／內容、${evidence ? "出現年度與題號、" : "資料範圍、"}變化情形、證據與可確認程度。
C. ${grade.includes("至") ? "各年級與各年度的" : "所選年級各年度的"}差異。
D. 資料不足、無法外推或不應解讀成官方規定的地方。

【資料使用原則】
請以所選資料範圍內可核對的題本為依據，清楚區分觀察到的現象與證據不足的推論。

${evidence ? "每一項趨勢請列出年度、題號或來源資料作為證據。" : "請說明資料分析的年度範圍。"}
${unknown ? "資料不足時請標示，不要猜測。" : "請以筆記本資料為主要依據。"}

請使用繁體中文，保持分析報告的客觀性。`,
  },
  {
    id: "similar",
    icon: "✣",
    title: "五題數學能力小考",
    category: "課堂快測",
    description: "一次聚焦一項主要能力，適合零碎時間、課前課後或固定 10～15 分鐘快速檢核。",
    build: ({ grade, years, evidence, unknown }) => `${sourceRule} 請根據 ${grade} ${years} 題本與評量架構，設計一份「五題數學能力小考」。

【使用情境】
- 題數固定為 5 題，適合零碎時間、課前、課後或固定 10～15 分鐘的短測驗。
- 五題皆以指定的主要能力向度為核心，其他能力僅作為理解題意的輔助。
- 以本次指定的能力向度設計練習。

【命題規則】
- 保留歷年題目所測的核心數學能力與相近難度，但必須更換數字、圖形、情境、數據與選項文字。
- 不得直接改寫或複製歷年原題。
- 干擾選項要對應學生可能的計算錯誤、概念迷思或讀題錯誤，而不是明顯錯誤。
- 題目要適合 ${grade}，數字、文字與步驟不可超出年級負荷。
- 評量向度、認知層次與難度只能放在下半部教師版。

【第一部分：學生版小考｜上半部】
請先只輸出小考標題、簡短作答說明、5 題題目與四個選項；必要時用文字清楚描述圖形或表格，讓老師可以直接複製或列印給學生。
嚴禁在這一部分出現：正確答案、評量向度、認知層次、難度、命題意圖、錯誤選項分析或任何提示。
請以「學生版小考開始」與「學生版小考結束」清楚標示範圍。

【第二部分：教師版答案與解析｜下半部】
學生版完整結束後，再用明顯分隔線開始教師版。請集中輸出：
1. 答案表。
2. 本次小考的主要能力向度與認知層次。
3. 每題的計算或推理過程、難度與命題意圖。
4. 每個錯誤選項代表的可能迷思或錯誤步驟。
5. 教師講解重點、補救建議與下一次短測驗方向。
請不要把答案或解析插回上半部，也不要在教師版重複完整題目。

新題請標示為練習題，不得稱為正式歷年試題；引用命題依據時請集中放在教師版。
${evidence ? "若參考某一類歷年題型，請在教師版附上年度與題號，不要大量重現原題文字。" : "請簡要說明本次小考參考的題型。"}
${unknown ? "若資料無法支持某項難度或能力判斷，請標示資料不足。" : "請優先依筆記本資料設計。"}

請使用繁體中文。`,
  },
  {
    id: "mock",
    icon: "▦",
    title: "產生 25 題模擬考",
    category: "模擬測驗",
    description: "一次產出完整模擬考：學生版在上，教師版答案、解析與紅黃綠補強建議在下。",
    build: ({ grade, years, evidence, unknown }) => `${sourceRule} 請根據 ${grade} 的評量架構與 ${years} 歷年數學題本，設計一份 25 題數學模擬測驗。本次練習設定為 25 題、四選一、40 分鐘；正式規格須以資料中可核對的年級與年度為準，若無法確認請標示。

【規格】
- 四選一單選題；建議作答時間以 40 分鐘為基準，若來源明示所選年級或年度不同，請註明差異；無法確認時，將 40 分鐘標為練習建議而非官方規定。
- 題目內容與題數比例請參考 ${grade} 的官方評量架構，不可自行宣稱官方比例。
- 適度包含計算、圖表判讀、幾何與測量、生活情境、題組與需要多步驟推理的問題。
- 難度分布可分為基礎、一般、挑戰，但難度標記只能放在下半部教師版。
- 不得複製歷年正式題目，請產生新的數字、圖形、文本與情境。

【第一部分：學生版模擬考｜上半部】
請先只輸出模擬考標題、作答說明、必要的圖表或文字資料、25 題題目與四個選項，讓老師可以直接複製或列印給學生。
嚴禁在這一部分出現：答案、答案表、評量向度、命題藍圖、難度、解析、命題意圖、紅黃綠燈號或補救建議。
請以「學生版模擬考開始」與「學生版模擬考結束」清楚標示範圍。

【第二部分：教師版答案與解析｜下半部】
學生版完整結束後，再用明顯分隔線開始教師版。請集中輸出：
A. 答案表。
B. 每題官方評量向度、數學內容、認知層次與難度。
C. 每題解析：正解理由、計算或推理過程、命題意圖、錯誤選項迷思。
D. 評量架構對應的命題藍圖與題數分布。
E. 依各題可能出現的錯誤，提供後續教學與補強建議；待學生作答後，再由教師依實際結果調整。
請不要把答案或解析插回上半部，也不要在教師版重複完整題目。

${evidence ? "請在教師版說明命題藍圖與評量架構的對應依據。" : "請在教師版簡要說明命題藍圖。"}
${unknown ? "資料不足時請標示，不要虛構正式試題、官方比例或官方作答時間。" : "請優先依筆記本中的官方架構。"}

請使用繁體中文，並嚴格維持學生版在上、教師版在下的順序。`,
  },
  {
    id: "plan",
    icon: "↻",
    title: "安排複習與衝刺",
    category: "教學規劃",
    description: "把評量證據與能力優先順序轉成三階段、可執行的教學時程。",
    build: ({ grade, years, evidence, unknown }) => `${sourceRule} 請根據 ${grade} 的評量架構與 ${years} 歷年數學題本，設計一份國小數學學力檢測準備計畫。

【任務定位】
請根據評量架構與選定的歷年題本，規劃可執行的教學時程。先簡要列出本計畫採用的能力重點及其依據，再安排各階段的教學。教學時間與週次屬建議，請依實際課表、進度與考試日期調整。

【三段時程】
1. 平常融入教學：每週 10～15 分鐘，配合課程培養數學概念、表徵、推理與問題解決能力。
2. 下學期三月至五月中積極複習：約 8～10 週，依資料顯示的優先能力安排循序補強。
3. 考前兩週衝刺：熟悉正式測驗的題型、作答節奏、檢查策略與常見迷思，不大量引入新內容。

【輸出內容】
A. 計畫依據：最多 6 項能力重點、對應證據與優先順序。
B. 三個時段的週次表：週次、教學目標、對應能力向度、短練習形式、檢核方式。
C. 依能力重點安排補強、持續練習與維持延伸的課堂活動；如有教師提供的學生作答資料，再依實際需要調整。
D. 每兩週一次的檢核方式，以及考前兩週的逐週安排。
E. 避免讓正常數學課程變成大量刷題的提醒。

【資料使用原則】
請區分題庫所能支持的教學建議與需要教師依班級情況調整的安排。

${evidence ? "請將計畫中的重要安排連結到評量架構或歷年題型證據。" : "請簡要說明計畫依據。"}
${unknown ? "若資料不足，請標示需要學校或教師自行決定的部分。" : "請以筆記本資料與評量架構為主要依據。"}

請使用繁體中文，做成教師可以直接執行的表格。`,
  }
];

const els = {
  taskList: document.querySelector("#taskList"),
  grade: document.querySelector("#grade"),
  years: document.querySelector("#years"),
  focusDimensionField: document.querySelector("#focusDimensionField"),
  focusDimension: document.querySelector("#focusDimension"),
  evidence: document.querySelector("#evidence"),
  unknown: document.querySelector("#unknown"),
  title: document.querySelector("#promptTitle"),
  category: document.querySelector("#categoryBadge"),
  description: document.querySelector("#promptDescription"),
  output: document.querySelector("#promptOutput"),
  copy: document.querySelector("#copyButton"),
  toast: document.querySelector("#copyToast")
};

let activeTask = taskDefinitions[0];

function renderTasks() {
  els.taskList.innerHTML = taskDefinitions.map((task) => `
    <button class="task-button ${task.id === activeTask.id ? "active" : ""}" data-task="${task.id}" type="button" aria-pressed="${task.id === activeTask.id}">
      <span class="task-icon">${task.icon}</span><span>${task.title}</span>
    </button>
  `).join("");
  els.taskList.querySelectorAll(".task-button").forEach((button) => {
    button.addEventListener("click", () => {
      activeTask = taskDefinitions.find((task) => task.id === button.dataset.task) || taskDefinitions[0];
      renderTasks();
      renderPrompt();
    });
  });
  els.focusDimensionField.hidden = activeTask.id !== "similar";
}

function getSettings() {
  return {
    grade: els.grade.value,
    years: els.years.value,
    focusDimension: els.focusDimension.value,
    evidence: els.evidence.checked,
    unknown: els.unknown.checked
  };
}

function buildFocusInstruction() {
  if (activeTask.id !== "similar") return "";
  const selected = els.focusDimension.value;
  if (!selected) {
    return "【本次聚焦能力向度】請先在網站選擇一項數學能力向度，再設計五題小考。不可自行改選其他向度，也不要混合所有向度。";
  }
  return `【本次聚焦能力向度】本次指定只練習「${selected}」。以此向度作為出題依據。請讓五題都以這一項作為主要評量向度；其他能力只能作為理解題意或完成計算的輔助，不得轉移本次小考的訓練重點。若需要圖形或表格，請提供可直接貼到講義的文字版、表格版或簡易示意格式，並確保題目已包含作答所需的完整資訊；若無法完整呈現，請改設計其他可直接作答的題目。`;
}

function renderPrompt() {
  els.title.textContent = activeTask.title;
  els.category.textContent = activeTask.category;
  els.description.textContent = activeTask.description;
  if (["similar", "mock"].includes(activeTask.id) && els.grade.value.includes("至")) {
    els.output.textContent = "出題請先選擇單一年級；跨年級選項適用於資料比較。";
    return;
  }
  if (activeTask.id === "similar" && !els.focusDimension.value) {
    els.output.textContent = "請先選擇一項聚焦能力向度。";
    return;
  }
  const prompt = activeTask.build(getSettings()).replaceAll("沖刺", "衝刺");
  const outputRules = activeTask.id === "mock" ? "【圖表排版提醒】若題目需要圖形、表格或幾何圖示，請提供可直接貼到講義的文字版、表格版或簡易示意格式，並確保題目已包含作答所需的完整資訊；若無法完整呈現，請改設計其他可直接作答的題目。" : "";
  const gradeDetails = activeTask.id === "plan" && els.grade.value.includes("至") ? "【跨年級規劃】請依所選年級分別安排各階段教學，指出各年級的共同重點與差異；若資料不足，標示需要教師調整的部分。" : "";
  const sourceDetails = els.evidence.checked ? "【來源標示】引用歷年試題時，列出年度及題號；引用評量架構時，列出資料名稱與可核對位置。資料未提供或無法確認時標示證據不足；測驗的來源標示放在教師版。" : "";
  const yearDetails = els.years.value === "全部歷年資料" ? "" : "【年度範圍】以筆記本最新可用題本年度為終點，依指定的近三年或近五年範圍查找；列明實際可用與缺漏年度，測驗請將這項說明放在教師版。";
  els.output.textContent = [buildFocusInstruction(), prompt, outputRules, gradeDetails, sourceDetails, yearDetails].filter(Boolean).join("\n\n");
}

function flashToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.clearTimeout(flashToast.timer);
  flashToast.timer = window.setTimeout(() => els.toast.classList.remove("show"), 2200);
}

async function copyPrompt() {
  if (["similar", "mock"].includes(activeTask.id) && els.grade.value.includes("至")) {
    flashToast("出題請選擇單一年級。");
    return;
  }
  if (activeTask.id === "similar" && !els.focusDimension.value) {
    flashToast("請先選擇一項聚焦能力向度。");
    return;
  }
  const text = els.output.textContent;
  try {
    await navigator.clipboard.writeText(text);
    flashToast("已複製提示詞，請貼到 NotebookLM 題庫。");
  } catch {
    const range = document.createRange();
    range.selectNodeContents(els.output);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
    selection.removeAllRanges();
    flashToast("已複製提示詞，請貼到 NotebookLM 題庫。");
  }
}

els.focusDimension.innerHTML = `<option value="" selected disabled>請選擇一項能力向度</option>${focusDimensions.map((item) => `<option value="${item}">${item}</option>`).join("")}`;
[els.grade, els.years, els.focusDimension, els.evidence, els.unknown].forEach((control) => control.addEventListener("change", renderPrompt));
els.copy.addEventListener("click", copyPrompt);
renderTasks();
renderPrompt();

