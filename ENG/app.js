const NOTEBOOK_URL = "https://notebook.google.com/notebook/304ac30f-6c9b-41d8-9deb-2c42569678f5";

const focusDimensionsByGrade = {
  "四年級": [
    "語音聽辨",
    "辭彙聽辨",
    "教室生活辭句理解",
    "聽力：文化節慶理解",
    "閱讀：文化節慶理解",
    "字詞辨識",
    "句子理解"
  ],
  "五年級": [
    "語音聽辨",
    "辭彙聽辨",
    "教室生活辭句理解與回應",
    "聽力：文化節慶理解",
    "閱讀：文化節慶理解",
    "字詞辨識",
    "句子理解",
    "短文與對話理解"
  ],
  "六年級": [
    "語音聽辨",
    "辭彙聽辨",
    "教室生活辭句理解與回應",
    "聽力：文化節慶理解",
    "閱讀：文化節慶理解",
    "字詞辨識",
    "句子理解",
    "短文與對話理解"
  ],
  "四至六年級": [
    "語音聽辨",
    "辭彙聽辨",
    "教室生活辭句理解／理解與回應",
    "聽力：文化節慶理解",
    "閱讀：文化節慶理解",
    "字詞辨識",
    "句子理解",
    "短文與對話理解（五、六年級）"
  ]
};

const sourceRule = `請以本 NotebookLM 中已提供的「115 年英語文評量架構」、歷年國小英語科題本、答案、英聽音檔與試題疑義資料為依據；分析範圍依本次指定的年度與年級，資料不足時明確標示。`;

const taskDefinitions = [
  {
    id: "lights",
    icon: "◉",
    title: "紅黃綠重點分析",
    category: "教學決策",
    description: "依歷年證據判斷英語聽力與閱讀能力的補強優先順序，不產生完整複習計畫。",
    build: ({ grade, years, evidence, unknown }) => `${sourceRule}

【任務定位】
本任務只做「能力優先順序診斷」。請分析 ${grade} 的 ${years} 英語命題與學習重點，並依歷年證據建立紅黃綠三燈分析；同時區分聽力與閱讀，不要只用單字量代表英語能力。

【任務】
1. 紅燈：高優先補強——依評量架構或歷年題本，建議優先關注的能力。
2. 黃燈：持續關注——建議持續練習與觀察的能力。
3. 綠燈：維持延伸——建議維持練習與適度延伸的能力。

【分析範圍】
- 聽力：語音聽辨、辭彙聽辨、教室生活辭句理解（四年級）或教室生活辭句理解與回應（五、六年級）、文化節慶理解。
- 閱讀：字詞辨識、句子理解、文化節慶理解；五、六年級另分析短文與對話理解。
- 另整理常見生活情境：人物、時間、天氣、食物、休閒活動、地點、交通、節慶與圖表資訊擷取。

【輸出格式】
A. 先用 3 句話說明整體趨勢，分別提到聽力與閱讀。
B. 用表格列出：燈號、聽力／閱讀、評量向度、${evidence ? "年度／題號證據、" : "資料依據、"}判斷理由、優先處理事項。
C. 表格後列出最優先的 3 項補強能力，每項只說明一個最重要的判斷理由。

【資料使用原則】
請依評量架構、題目內容與可取得的作答或統計資料，說明各能力的教學優先順序。若沒有學生作答或答對率資料，請標示「學生表現待確認」，勿將題目出現頻率當成失分率或熟練程度。

${evidence ? "【證據要求】每個重要判斷請列出對應的年度、題號、題本頁面或資料名稱；若無法確認，請標示「證據不足」。" : "【證據要求】請指出判斷主要依據的資料範圍。"}
${unknown ? "【限制】資料不足時請明確說明，不要自行補寫或猜測未出現的題目、比例或官方要求。" : "【限制】請優先根據筆記本資料回答。"}

請使用繁體中文，英文例句與單字保留英文，清楚說明各項能力的優先順序與判斷依據。`,
  },
  {
    id: "trend",
    icon: "↗",
    title: "命題趨勢整理",
    category: "歷年分析",
    description: "只整理英語聽力與閱讀的歷年命題變化，不直接安排教學。",
    build: ({ grade, years, evidence, unknown }) => `${sourceRule}

請分析 ${grade} ${years} 的英語命題趨勢，並把「正式評量向度」和「歷年題目出現的生活情境」分開整理，避免把單一年度題目說成長期趨勢。

【任務定位】
請整理所選年級與資料範圍內，歷年題目呈現的命題特色與變化。

請從以下角度整理：
1. 聽力與閱讀的題數、題序、評量向度與年度變化。
2. 語音、字詞、句子、短文／對話及文化節慶的測量方式。
3. 題型與情境：圖片辨識、對話回應、生活作息、天氣衣物、食物數量、地點交通、節慶、表格或圖表資訊。
4. 學生需要進行的英語操作：辨識、理解、回應、擷取明確訊息、推論與統整。
5. ${grade.includes("至") ? "所選年級間的差異，包含資料中可確認的短文與對話理解。" : "所選年級的題型特色與年度變化。"}
6. 哪些是穩定核心，哪些是反覆出現但形式改變，哪些只是偶爾出現。

請以「穩定核心、反覆出現但形式變化、偶爾出現」三層整理，並說明各項判斷所依據的題本與資料範圍。

【輸出格式】
- 一段整體結論
- 聽力／閱讀命題趨勢分析表
- ${grade.includes("至") ? "各年級與各年度的" : "所選年級各年度的"}變化
- 資料不足、無法外推或不應解讀成官方規定的地方

【資料使用原則】
請以所選資料範圍內可核對的題本為依據，清楚區分觀察到的現象與證據不足的推論。

${evidence ? "每一項趨勢請列出年度、題號、題本頁面或來源資料作為證據。" : "請說明資料分析的年度範圍。"}
${unknown ? "資料不足時請標示，不要猜測。" : "請以筆記本資料為主要依據。"}

請使用繁體中文，英文例句與單字保留英文。`,
  },
  {
    id: "similar",
    icon: "✣",
    title: "五題英語能力小考",
    category: "課堂快測",
    description: "一次聚焦一項英語能力，適合零碎時間、課前課後或固定 10～15 分鐘快速檢核。",
    build: ({ grade, years, evidence, unknown }) => `${sourceRule} 請根據 ${grade} ${years} 題本與英語評量架構，設計一份「五題英語能力小考」。

【使用情境】
- 題數固定為 5 題，適合零碎時間、課前、課後或固定 10～15 分鐘的短測驗。
- 請以指定的一項官方評量向度為核心，不要把聽力、閱讀與所有向度混在同一份小考中。
- 以本次指定的能力向度設計練習。

【命題規則】
- 保留歷年題目所測的核心英語能力與相近難度，但必須更換單字、人物、數字、情境與選項文字。
- 不得直接改寫或複製歷年原題；干擾選項要對應學生可能的語音、字詞、句型或讀圖迷思。
- 題目要適合 ${grade}，英文句子自然，避免超出年級閱讀負荷。
- 若本次向度屬聽力，學生版只放作答說明、題目與選項；教師朗讀稿或播放內容逐題放在教師版。
- 若本次向度屬閱讀，請提供必要的短句、對話、圖片文字描述或表格資料。

【第一部分：學生版小考｜上半部】
請先只輸出小考標題、簡短作答說明、必要的閱讀資料、5 題題目與四個選項，讓老師可以直接複製或列印給學生。
嚴禁在這一部分出現：正確答案、評量向度、認知層次、難度、命題意圖、錯誤選項分析或任何提示。
請以「學生版小考開始」與「學生版小考結束」清楚標示範圍。

【第二部分：教師版答案與解析｜下半部】
學生版完整結束後，再用明顯分隔線開始教師版。請集中輸出：
1. 答案表。
2. 本次小考的官方能力向度、聽力／閱讀類別與認知層次。
3. 每題難度與命題意圖。
4. 每個錯誤選項代表的可能迷思。
5. 教師講解重點、補救建議與下一次短測驗方向。
請不要把答案或解析插回上半部，也不要在教師版重複完整題目。

新題請標示為練習題，不得稱為正式歷年試題；引用命題依據時請集中放在教師版。
${evidence ? "若參考某一類歷年題型，請在教師版附上年度與題號或來源，不要大量重現原題文字。" : "請簡要說明本次小考參考的題型。"}
${unknown ? "若資料無法支持某項難度或能力判斷，請標示資料不足。" : "請優先依筆記本資料設計。"}

請使用繁體中文，英文題目與選項保留英文。`,
  },
  {
    id: "mock",
    icon: "▦",
    title: "產生 35 題模擬考",
    category: "模擬測驗",
    description: "一次產出完整英語模擬考：學生版在上，教師版答案、聽力稿、解析與紅黃綠補強建議在下。",
    build: ({ grade, years, evidence, unknown }) => `${sourceRule} 請根據 ${grade} 的英語評量架構與 ${years} 歷年英語題本，設計一份 35 題英語學力檢測模擬測驗。

【本次練習設定】
- 本次練習為 35 題、四選一，建議作答時間 40 分鐘；正式規格須以資料中可核對的年級與年度為準。
- 本次練習配置聽力 15 題、閱讀 20 題；評量向度比例以來源為依據，未明示者標為教師建議。
- 四年級閱讀包含字詞辨識、句子理解、文化節慶理解；五、六年級閱讀另包含短文與對話理解。
- 四年級聽力的教室生活辭句以「理解」為主；五、六年級以「理解與回應」為主。
- 不得複製歷年正式題目，請產生新的單字、對話、人物、數據、圖表文字與生活情境。

【題型與情境】
- 聽力：語音辨識、字詞辨識、教室生活與日常對話回應、文化節慶理解。學生版只呈現作答需要的題目與四個選項；教師版集中提供每題朗讀稿或播放內容。
- 閱讀：字詞辨識、句子理解、圖文或生活資訊擷取；五、六年級加入短文與對話理解。可使用文字表格、行事曆、購物清單、地圖或圖片描述，不能讓缺少圖片變成無法作答。
- 情境可涵蓋人物、時間、天氣、衣物、食物、休閒活動、地點、交通、身體健康與文化節慶，但須依題庫證據調整，不要為了湊題而平均分配。

【第一部分：學生版模擬考｜上半部】
請先只輸出模擬考標題、作答說明、聽力題目、閱讀資料、35 題題目與四個選項，讓老師可以直接複製或列印給學生。
聽力題區請只標示「聽力測驗」與題目，不要附答案或解析；不要把教師朗讀稿放在學生版。
嚴禁在這一部分出現：答案、答案表、評量向度、命題藍圖、難度、解析、命題意圖、紅黃綠燈號或補救建議。
請以「學生版模擬考開始」與「學生版模擬考結束」清楚標示範圍。

【第二部分：教師版答案與解析｜下半部】
學生版完整結束後，再用明顯分隔線開始教師版。請集中輸出：
A. 35 題答案表，分列聽力與閱讀。
B. 聽力每題朗讀稿或播放內容；若適合搭配圖片，補上清楚的圖片描述。
C. 每題官方評量向度、聽力／閱讀類別、認知層次與難度。
D. 每題解析：正解理由、命題意圖、錯誤選項迷思；閱讀題補充關鍵字或訊息位置。
E. 依 ${grade} 評量架構整理命題藍圖與題數分布，不要自稱官方比例以外的分配是正式規定。
F. 依聽力與閱讀各題可能出現的錯誤，提供後續教學與補強建議；待學生作答後，再由教師依實際結果調整。
請不要把答案或解析插回上半部，也不要在教師版重複完整題目。

${evidence ? "請在教師版說明命題藍圖與評量架構的對應依據，列出年度、題號或資料名稱。" : "請在教師版簡要說明命題藍圖。"}
${unknown ? "資料不足時請標示，不要虛構正式試題、官方比例或官方作答時間。" : "請優先依筆記本中的官方架構。"}

請使用繁體中文，英文題目、選項與朗讀稿保留英文，並嚴格維持學生版在上、教師版在下的順序。`,
  },
  {
    id: "plan",
    icon: "↻",
    title: "安排複習與衝刺",
    category: "教學規劃",
    description: "把英語聽讀的評量證據與能力優先順序轉成三階段教學時程。",
    build: ({ grade, years, evidence, unknown }) => `${sourceRule} 請根據 ${grade} 的英語評量架構與 ${years} 歷年題本，設計一份國小英語學力檢測準備計畫。

【任務定位】
請根據評量架構與選定的歷年題本，規劃可執行的教學時程。先簡要列出本計畫採用的能力重點及其依據，再安排各階段的教學。教學時間與週次屬建議，請依實際課表、進度與考試日期調整。

【三段時程】
1. 平常融入教學：配合課文、單字、句型與生活對話，每週安排短時間聽讀練習，不把正常英語課變成大量刷題。
2. 下學期三月至五月中積極複習：約 8～10 週，依資料顯示的優先能力安排循序補強，穿插題庫證據與新情境練習。
3. 考前兩週衝刺：依實際英語課堂或短練習時間安排教學單元，熟悉題型與作答節奏，不大量引入新內容。

【輸出內容】
A. 計畫依據：最多 6 項能力重點、對應證據與優先順序。
B. 三個時段的週次表：週次、教學目標、聽力／閱讀、對應能力向度、活動形式、檢核方式。
C. 考前兩週可調整的教學單元表，列出每單元的教學重點、短練習形式與教師可朗讀的聽力活動；請註明單元數可依實際課表調整。
D. 依所選年級與來源中可確認的題型，安排讀圖、生活對話、表格或短文等適用練習的順序。
E. 依能力重點安排補強、持續練習與維持延伸的課堂活動；如有教師提供的學生作答資料，再依實際需要調整。

【資料使用原則】
請區分題庫所能支持的教學建議與需要教師依班級情況調整的安排。

${evidence ? "請將建議連結到 115 年評量架構或歷年題型證據，列出年度與題號或資料名稱。" : "請簡要說明建議依據。"}
${unknown ? "若資料不足，請標示需要學校或教師自行決定的部分。" : "請以筆記本資料與評量架構為主要依據。"}

請使用繁體中文，英文例句與活動用語保留英文，做成教師可以直接執行的表格。`,
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

function updateFocusDimensions() {
  const current = els.focusDimension.value;
  const dimensions = focusDimensionsByGrade[els.grade.value] || focusDimensionsByGrade["四年級"];
  els.focusDimension.innerHTML = `<option value="" selected disabled>請選擇一項能力向度</option>${dimensions.map((item) => `<option value="${item}">${item}</option>`).join("")}`;
  if (dimensions.includes(current)) els.focusDimension.value = current;
}

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
    return "【本次聚焦能力向度】請先在網站選擇一項英語官方評量向度，再設計五題小考。不可自行改選其他向度，也不要混合所有向度。";
  }
  return `【本次聚焦能力向度】本次指定只練習「${selected}」。以此向度作為出題依據。請讓五題都以這一項作為主要評量向度；其他能力只能作為理解題意、完成回應或閱讀情境的輔助，不得轉移本次小考的訓練重點。若需要圖表或圖片，請提供可直接貼到講義的文字版、表格版或清楚的圖片描述。`;
}

function renderPrompt() {
  updateFocusDimensions();
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
  const gradeDetails = activeTask.id === "plan" && els.grade.value.includes("至") ? "【跨年級規劃】請依所選年級分別安排各階段教學，指出各年級的共同重點與差異；若資料不足，標示需要教師調整的部分。" : "";
  const sourceDetails = els.evidence.checked ? "【來源標示】引用歷年試題時，列出年度及題號；引用評量架構時，列出資料名稱與可核對位置。資料未提供或無法確認時標示證據不足；測驗的來源標示放在教師版。" : "";
  const yearDetails = els.years.value === "全部歷年資料" ? "" : "【年度範圍】以筆記本最新可用題本年度為終點，依指定的近三年或近五年範圍查找；列明實際可用與缺漏年度，測驗請將這項說明放在教師版。";
  els.output.textContent = [buildFocusInstruction(), prompt, gradeDetails, sourceDetails, yearDetails].filter(Boolean).join("\n\n");
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

