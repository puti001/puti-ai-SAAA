const taskDefinitions = [
  {
    id: "lights",
    icon: "◉",
    title: "紅黃綠重點分析",
    category: "教學決策",
    description: "依歷年證據判斷各能力的補強優先順序，不產生完整複習計畫。",
    build: ({ grade, years, evidence, unknown }) => `你是一位熟悉國小國語文評量與補救教學的教師。請只根據本 NotebookLM 中已提供的「115 年評量架構」與歷年國語科題本、答案及試題疑義資料，分析 ${grade} 的 ${years} 命題與學習重點。\n\n【任務定位】\n本任務只做「能力優先順序診斷」，請依十個評量向度整理成紅黃綠三燈分析：\n1. 紅燈：高優先補強——依評量架構或歷年題本，建議優先關注的能力。\n2. 黃燈：持續關注——建議持續練習與觀察的能力。\n3. 綠燈：維持延伸——建議維持練習與適度延伸的能力。\n\n【輸出格式】\nA. 先用 3 句話說明整體判斷。\nB. 用表格列出：燈號、評量向度、${evidence ? "年度／題號證據、" : "資料依據、"}判斷理由、優先處理事項。\nC. 表格後列出最優先的 3 項補強能力，每項只說明一個最重要的判斷理由。\n\n【資料使用原則】\n請依評量架構、題目內容與可取得的作答或統計資料，說明各能力的教學優先順序。若沒有學生作答或答對率資料，請標示「學生表現待確認」，勿將題目出現頻率當成失分率或熟練程度。\n\n${evidence ? "【證據要求】每個重要判斷請列出對應的年度、題號或資料名稱；若無法確認，請標示「證據不足」。" : "【證據要求】請指出判斷主要依據的資料範圍。"}\n${unknown ? "【限制】資料不足時請明確說明，不要自行補寫或猜測未出現的題目。" : "【限制】請優先根據筆記本資料回答。"}\n\n請使用繁體中文，清楚說明各項能力的優先順序與判斷依據。`
  },
  {
    id: "trend",
    icon: "↗",
    title: "命題趨勢整理",
    category: "歷年分析",
    description: "只整理歷年命題向度、題型與變化，不直接安排教學。",
    build: ({ grade, years, evidence, unknown }) => `請只根據本 NotebookLM 中的評量架構與歷年國語科題本，分析 ${grade} ${years} 的命題趨勢。\n\n【任務定位】\n請整理所選年級與資料範圍內，歷年題目呈現的命題特色與變化。\n\n請從以下角度整理：\n1. 十個評量向度的出現情形與變化。\n2. 文章類型：記敘文、說明文、應用文本、圖表或其他。\n3. 題型：字詞、句子、段落、篇章、題組與推論。\n4. 學生需要進行的認知操作：辨識、理解、推論、統整、應用。\n5. 哪些是穩定出現的核心能力，哪些只是個別年度現象。\n\n請以「穩定核心、反覆出現但形式變化、偶爾出現」三層整理，並說明各項判斷所依據的題本與資料範圍。不要預測確切題目，也不要把單一年度題目說成長期趨勢。\n\n【輸出格式】\nA. 一段整體趨勢結論。\nB. 趨勢分析表：向度／題型、${evidence ? "出現年度與題號、" : "資料範圍、"}變化情形、證據與可確認程度。\nC. ${grade.includes("至") ? "各年級與各年度的" : "所選年級各年度的"}差異。\nD. 資料不足、無法外推或不應解讀成官方規定的地方。\n\n【資料使用原則】\n請以所選資料範圍內可核對的題本為依據，清楚區分觀察到的現象與證據不足的推論。\n\n${evidence ? "每一項趨勢請列出年度、題號或來源資料作為證據。" : "請說明資料分析的年度範圍。"}\n${unknown ? "資料不足時請標示，不要猜測。" : "請以筆記本資料為主要依據。"}\n\n請使用繁體中文，保持分析報告的客觀性。`
  },
  {
    id: "similar",
    icon: "✣",
    title: "五題國語能力小考",
    category: "課堂快測",
    description: "一次聚焦一項主要能力，適合零碎時間、課前課後或固定 10～15 分鐘快速檢核。",
    build: ({ grade, years, evidence, unknown }) => `請根據本 NotebookLM 中的 ${grade} ${years} 題本與 115 年評量架構，設計一份「五題國語能力小考」。\n\n【使用情境】\n- 題數固定為 5 題，適合零碎時間、課前、課後或固定 10～15 分鐘的短測驗。\n- 五題皆以指定的主要能力向度為核心，其他能力僅作為理解題意的輔助。\n- 以本次指定的能力向度設計練習。\n\n【命題規則】\n- 保留歷年題目所測的核心能力與相近難度，但必須更換文章、情境、人物、數據與選項文字。\n- 不得直接改寫或複製歷年原題。\n- 干擾選項要對應學生可能的迷思，而不是明顯錯誤。\n- 題目要適合 ${grade}，文字自然，避免超出年級閱讀負荷。\n- 評量向度、認知層次與難度只能放在下半部教師版。\n\n【第一部分：學生版小考｜上半部】\n請先只輸出小考標題、簡短作答說明、5 題題目與四個選項，讓老師可以直接複製或列印給學生。\n嚴禁在這一部分出現：正確答案、評量向度、認知層次、難度、命題意圖、錯誤選項分析或任何提示。\n請以「學生版小考開始」與「學生版小考結束」清楚標示範圍。\n\n【第二部分：教師版答案與解析｜下半部】\n學生版完整結束後，再用明顯分隔線開始教師版。請集中輸出：\n1. 答案表\n2. 本次小考的主要能力向度與認知層次：辨識、理解、推論、統整或應用\n3. 每題難度與命題意圖\n4. 每個錯誤選項代表的可能迷思\n5. 教師講解重點、補救建議與下一次短測驗方向\n請不要把答案或解析插回上半部，也不要在教師版重複完整題目。\n\n新題請標示為練習題，不得稱為正式歷年試題；引用命題依據時請集中放在教師版。\n${evidence ? "若參考某一類歷年題型，請在教師版附上年度與題號，不要大量重現原題文字。" : "請簡要說明本次小考參考的題型。"}\n${unknown ? "若資料無法支持某項難度或能力判斷，請標示資料不足。" : "請優先依筆記本資料設計。"}\n\n請使用繁體中文。`
  },
  {
    id: "mock",
    icon: "▦",
    title: "產生 30 題模擬考",
    category: "模擬測驗",
    description: "一次產出完整模擬考：學生版在上，教師版答案、解析與紅黃綠補強建議在下。",
    build: ({ grade, years, evidence, unknown }) => `請根據本 NotebookLM 中的 ${grade} 評量架構與 ${years} 歷年題本，設計一份 30 題國語科模擬測驗。\n\n【規格】\n- 四選一單選題。\n- 建議作答時間 40 分鐘。\n- 題目涵蓋語文知識與閱讀理解，比例請參考 ${grade} 的 115 年評量架構；來源未明示的比例請標為教師建議，不得稱為官方規定。\n- 閱讀題需包含不同文章類型與適量題組。\n- 難度分布：基礎、一般、挑戰，但難度標記只能放在下半部教師版。\n- 不得複製歷年正式題目，請產生新的文本與情境。\n\n【第一部分：學生版模擬考｜上半部】\n請先只輸出模擬考標題、作答說明、閱讀文章、30 題題目與四個選項，讓老師可以直接複製或列印給學生。\n嚴禁在這一部分出現：答案、答案表、評量向度、命題藍圖、難度、解析、命題意圖、紅黃綠燈號或補救建議。\n請以「學生版模擬考開始」與「學生版模擬考結束」清楚標示範圍。\n\n【第二部分：教師版答案與解析｜下半部】\n學生版完整結束後，再用明顯分隔線開始教師版。請集中輸出：\nA. 答案表。\nB. 每題評量向度、認知層次與難度。\nC. 每題解析：正解理由、命題意圖、錯誤選項迷思。\nD. 十個向度的命題藍圖與題數分布。\nE. 依各題可能出現的錯誤，提供後續教學與補強建議；待學生作答後，再由教師依實際結果調整。\n請不要把答案或解析插回上半部，也不要在教師版重複完整題目。\n\n${evidence ? "請在教師版說明命題藍圖與評量架構的對應依據。" : "請在教師版簡要說明命題藍圖。"}\n${unknown ? "資料不足時請標示，不要虛構正式試題或官方比例。" : "請優先依筆記本中的官方架構。"}\n\n請使用繁體中文，並嚴格維持學生版在上、教師版在下的順序。`
  },
  {
    id: "plan",
    icon: "↻",
    title: "安排複習與衝刺",
    category: "教學規劃",
    description: "把評量證據與能力優先順序轉成三階段、可執行的教學時程。",
    build: ({ grade, years, evidence, unknown }) => `請根據本 NotebookLM 中的 ${grade} 115 年評量架構與 ${years} 歷年題本，設計一份國語科學力檢測準備計畫。\n\n【任務定位】\n請根據評量架構與選定的歷年題本，規劃可執行的教學時程。先簡要列出本計畫採用的能力重點及其依據，再安排各階段的教學。教學時間與週次屬建議，請依實際課表、進度與考試日期調整。\n\n【三段時程】\n1. 平常融入教學：每週 10～15 分鐘，配合課文培養十個評量向度。\n2. 下學期三月至五月中積極複習：約 8～10 週，依資料顯示的優先能力安排循序補強。\n3. 考前兩週衝刺：以 30 題、40 分鐘作為練習設定，熟悉作答節奏；正式規格以來源所載之年級及年度為準、題組閱讀與答案卡流程，不大量引入新內容。\n\n【輸出內容】\nA. 計畫依據：最多 6 項能力重點、對應證據與優先順序。\nB. 三個時段的週次表：週次、教學目標、對應能力向度、短練習形式、檢核方式。\nC. 依能力重點安排補強、持續練習與維持延伸的課堂活動；如有教師提供的學生作答資料，再依實際需要調整。\nD. 每兩週一次的檢核方式，以及考前兩週的逐週安排。\nE. 避免讓正常課程變成大量刷題的提醒。\n\n【資料使用原則】\n請區分題庫所能支持的教學建議與需要教師依班級情況調整的安排。\n\n${evidence ? "請將計畫中的重要安排連結到評量架構或歷年題型證據。" : "請簡要說明計畫依據。"}\n${unknown ? "若資料不足，請標示需要學校或教師自行決定的部分。" : "請以筆記本資料與評量架構為主要依據。"}\n\n請使用繁體中文，做成教師可以直接執行的表格。`
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
    return "【本次聚焦能力向度】請先在網站選擇一項能力向度，再設計五題小考。不可自行改選其他向度，也不要混合十個向度。";
  }
    return `【本次聚焦能力向度】本次指定只練習「${selected}」。以此向度作為出題依據。請讓五題都以這一項作為主要評量向度；其他能力只能作為理解題意的輔助，不得轉移本次小考的訓練重點。`;
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
  const focusInstruction = buildFocusInstruction();
  const prompt = activeTask.build(getSettings()).replaceAll("沖刺", "衝刺");
  const gradeDetails = activeTask.id === "plan" && els.grade.value.includes("至") ? "【跨年級規劃】請依所選年級分別安排各階段教學，指出各年級的共同重點與差異；若資料不足，標示需要教師調整的部分。" : "";
  const sourceDetails = els.evidence.checked ? "【來源標示】引用歷年試題時，列出年度及題號；引用評量架構時，列出資料名稱與可核對位置。資料未提供或無法確認時標示證據不足；測驗的來源標示放在教師版。" : "";
  const yearDetails = els.years.value === "全部歷年資料" ? "" : "【年度範圍】以筆記本最新可用題本年度為終點，依指定的近三年或近五年範圍查找；列明實際可用與缺漏年度，測驗請將這項說明放在教師版。";
  els.output.textContent = [focusInstruction, prompt, gradeDetails, sourceDetails, yearDetails].filter(Boolean).join("\n\n");
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

[els.grade, els.years, els.focusDimension, els.evidence, els.unknown].forEach((control) => control.addEventListener("change", renderPrompt));
els.copy.addEventListener("click", copyPrompt);
renderTasks();
renderPrompt();

