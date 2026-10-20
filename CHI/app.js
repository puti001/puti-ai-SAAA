const taskDefinitions = [
  {
    id: "lights",
    icon: "◉",
    title: "紅黃綠重點分析",
    category: "教學決策",
    description: "找出這個年級最需要優先補強、持續關注與維持延伸的能力，並要求 NotebookLM 提供題號與年度證據。",
    build: ({ grade, years, audience, evidence, unknown }) => `你是一位熟悉國小國語文評量與補救教學的教師。請只根據本 NotebookLM 中已提供的「115 年評量架構」與歷年國語科題本、答案及試題疑義資料，分析 ${grade} 的 ${years} 命題與學習重點。\n\n【任務】\n請依十個評量向度整理成「紅黃綠三燈分析」：\n1. 紅燈：高優先補強——常出現、容易失分，或對後續閱讀能力影響大的能力。\n2. 黃燈：持續關注——曾出現但表現可能不穩定，需要融入課文與題組練習的能力。\n3. 綠燈：維持延伸——已有相對穩定基礎，安排少量維持與變化情境挑戰即可的能力。\n\n【輸出格式】\nA. 先用 3 句話說明整體趨勢。\nB. 用表格列出：燈號、評量向度、判斷理由、建議教學行動。\nC. 分成「平常融入教學」「三月至五月積極複習」「考前兩週沖刺」三個時段，提出具體建議。\nD. 最後列出教師本週可以直接使用的 5 個練習方向。\n\n${evidence ? "【證據要求】每個重要判斷請列出對應的年度、題號或資料名稱；若無法確認，請標示「證據不足」。" : "【證據要求】請指出判斷主要依據的資料範圍。"}\n${unknown ? "【限制】資料不足時請明確說明，不要自行補寫或猜測未出現的題目。" : "【限制】請優先根據筆記本資料回答。"}\n\n輸出對象：${audience}。請使用繁體中文，語氣具體、可直接轉成教學行動。`
  },
  {
    id: "trend",
    icon: "↗",
    title: "命題趨勢整理",
    category: "歷年分析",
    description: "整理評量向度、題型變化與能力層次，附上歷年依據，協助安排教學重點。",
    build: ({ grade, years, audience, evidence, unknown }) => `請只根據本 NotebookLM 中的評量架構與歷年國語科題本，分析 ${grade} ${years} 的命題趨勢。\n\n請從以下角度整理：\n1. 十個評量向度的出現情形與變化。\n2. 文章類型：記敘文、說明文、應用文本、圖表或其他。\n3. 題型：字詞、句子、段落、篇章、題組與推論。\n4. 學生需要進行的認知操作：辨識、理解、推論、統整、應用。\n5. 哪些是穩定出現的核心能力，哪些只是個別年度現象。\n\n請以「穩定核心、反覆出現但形式變化、偶爾出現」三層整理，並轉換成教師可採取的教學行動。不要預測確切題目，也不要把單一年度題目說成長期趨勢。\n\n輸出格式：\n- 一段整體結論\n- 趨勢分析表\n- 各年級或各年度的變化\n- 教師最值得優先準備的 8 個能力\n- 一份 ${grade} 的課堂短練習建議\n\n${evidence ? "每一項趨勢請列出年度、題號或來源資料作為證據。" : "請說明資料分析的年度範圍。"}\n${unknown ? "資料不足時請標示，不要猜測。" : "請以筆記本資料為主要依據。"}\n\n輸出對象：${audience}，請使用繁體中文。`
  },
  {
    id: "similar",
    icon: "✣",
    title: "五題國語能力小考",
    category: "課堂快測",
    description: "一次聚焦一項主要能力，適合零碎時間、課前課後或固定 10～15 分鐘快速檢核。",
    build: ({ grade, years, audience, evidence, unknown }) => `請根據本 NotebookLM 中的 ${grade} ${years} 題本與 115 年評量架構，設計一份「五題國語能力小考」。\n\n【使用情境】\n- 題數固定為 5 題，適合零碎時間、課前、課後或固定 10～15 分鐘的短測驗。\n- 請以一項主要能力向度為核心，必要時搭配一項相關能力，不要把十個向度全部混在同一份小考中。\n- 優先選擇本年級目前需要補強的紅燈或黃燈能力；若筆記本資料不足，請說明你的選擇依據。\n\n【命題規則】\n- 保留歷年題目所測的核心能力與相近難度，但必須更換文章、情境、人物、數據與選項文字。\n- 不得直接改寫或複製歷年原題。\n- 干擾選項要對應學生可能的迷思，而不是明顯錯誤。\n- 題目要適合 ${grade}，文字自然，避免超出年級閱讀負荷。\n- 評量向度、認知層次與難度只能放在下半部教師版。\n\n【第一部分：學生版小考｜上半部】\n請先只輸出小考標題、簡短作答說明、5 題題目與四個選項，讓老師可以直接複製或列印給學生。\n嚴禁在這一部分出現：正確答案、評量向度、認知層次、難度、命題意圖、錯誤選項分析或任何提示。\n請以「學生版小考開始」與「學生版小考結束」清楚標示範圍。\n\n【第二部分：教師版答案與解析｜下半部】\n學生版完整結束後，再用明顯分隔線開始教師版。請集中輸出：\n1. 答案表\n2. 本次小考的主要能力向度與認知層次：辨識、理解、推論、統整或應用\n3. 每題難度與命題意圖\n4. 每個錯誤選項代表的可能迷思\n5. 教師講解重點、補救建議與下一次短測驗方向\n請不要把答案或解析插回上半部，也不要在教師版重複完整題目。\n\n請把「歷年原題分析」與「AI 仿作小考」分開，不要把仿作題稱為正式考古題。\n${evidence ? "若參考某一類歷年題型，請在教師版附上年度與題號，不要大量重現原題文字。" : "請簡要說明本次小考參考的題型。"}\n${unknown ? "若資料無法支持某項難度或能力判斷，請標示資料不足。" : "請優先依筆記本資料設計。"}\n\n輸出對象：${audience}，請使用繁體中文。`
  },
  {
    id: "mock",
    icon: "▦",
    title: "產生 30 題模擬考",
    category: "模擬測驗",
    description: "一次產出完整模擬考：學生版在上，教師版答案、解析與紅黃綠補強建議在下。",
    build: ({ grade, years, audience, evidence, unknown }) => `請根據本 NotebookLM 中的 ${grade} 評量架構與 ${years} 歷年題本，設計一份 30 題國語科模擬測驗。\n\n【規格】\n- 四選一單選題。\n- 建議作答時間 40 分鐘。\n- 題目涵蓋語文知識與閱讀理解，比例請參考 ${grade} 的 115 年評量架構。\n- 閱讀題需包含不同文章類型與適量題組。\n- 難度分布：基礎、一般、挑戰，但難度標記只能放在下半部教師版。\n- 不得複製歷年正式題目，請產生新的文本與情境。\n\n【第一部分：學生版模擬考｜上半部】\n請先只輸出模擬考標題、作答說明、閱讀文章、30 題題目與四個選項，讓老師可以直接複製或列印給學生。\n嚴禁在這一部分出現：答案、答案表、評量向度、命題藍圖、難度、解析、命題意圖、紅黃綠燈號或補救建議。\n請以「學生版模擬考開始」與「學生版模擬考結束」清楚標示範圍。\n\n【第二部分：教師版答案與解析｜下半部】\n學生版完整結束後，再用明顯分隔線開始教師版。請集中輸出：\nA. 答案表。\nB. 每題評量向度、認知層次與難度。\nC. 每題解析：正解理由、命題意圖、錯誤選項迷思。\nD. 十個向度的命題藍圖與題數分布。\nE. 測驗後紅黃綠三燈補救建議。\n請不要把答案或解析插回上半部，也不要在教師版重複完整題目。\n\n${evidence ? "請在教師版說明命題藍圖與評量架構的對應依據。" : "請在教師版簡要說明命題藍圖。"}\n${unknown ? "資料不足時請標示，不要虛構正式試題或官方比例。" : "請優先依筆記本中的官方架構。"}\n\n輸出對象：${audience}，請使用繁體中文，並嚴格維持學生版在上、教師版在下的順序。`
  },
  {
    id: "diagnose",
    icon: "⌁",
    title: "錯題與能力診斷",
    category: "學習補救",
    description: "把學生的答題表現轉成十個向度與紅黃綠燈號，協助老師安排下一步補救。",
    build: ({ grade, years, audience, evidence, unknown }) => `請根據本 NotebookLM 中的 ${grade} 評量架構與題目資料，協助分析下列學生或班級的答題表現。若我在後面貼上學生作答紀錄，請依題號對應題目與評量向度，不要只計算總分。\n\n【分析任務】\n1. 將錯題歸入十個評量向度。\n2. 判斷錯誤是知識不熟、語意理解、推論、統整、讀題或作答流程問題。\n3. 產生紅黃綠燈號：紅燈優先補強、黃燈持續關注、綠燈維持延伸。\n4. 推薦下一次 5～10 題短練習的能力目標。\n5. 提供教師可以在課堂上使用的講解語句與活動。\n\n【輸出格式】\n- 學習表現摘要\n- 十向度診斷表\n- 紅黃綠燈號與證據\n- 優先補救順序\n- 一週補救教學安排\n- 再檢測方式\n\n${evidence ? "請列出對應題號、年度或資料名稱作為判斷依據。" : "請說明判斷依據。"}\n${unknown ? "資料不足或無法判斷時，請標示需要教師補充的資料。" : "請優先根據筆記本資料回答。"}\n\n年級：${grade}\n資料範圍：${years}\n輸出對象：${audience}。請使用繁體中文。`
  },
  {
    id: "plan",
    icon: "↻",
    title: "安排複習與衝刺",
    category: "教學規劃",
    description: "把平常融入、三月後積極複習與考前兩週衝刺排成可執行的教學節奏。",
    build: ({ grade, years, audience, evidence, unknown }) => `請根據本 NotebookLM 中的 ${grade} 115 年評量架構與 ${years} 歷年題本，設計一份國語科學力檢測準備計畫。\n\n【三段時程】\n1. 平常融入教學：每週 10～15 分鐘，配合課文培養十個評量向度。\n2. 下學期三月至五月中積極複習：約 8～10 週，先診斷，再依紅黃綠燈補強。\n3. 考前兩週沖刺：熟悉 30 題、40 分鐘的作答節奏、題組閱讀與答案卡流程，不大量引入新內容。\n\n【輸出內容】\n- 每一階段的目標與每週重點\n- 依年級安排的語文知識與閱讀理解比例\n- 每週可直接使用的短練習形式\n- 每兩週一次的檢核方式\n- 針對紅燈、黃燈、綠燈的不同教學行動\n- 避免讓正常課程變成大量刷題的提醒\n\n${evidence ? "請將建議連結到評量架構或歷年題型證據。" : "請簡要說明建議依據。"}\n${unknown ? "若資料不足，請標示需要學校或教師自行決定的部分。" : "請以筆記本資料與評量架構為主要依據。"}\n\n輸出對象：${audience}，請使用繁體中文，做成教師可以直接執行的表格。`
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
  els.taskList.innerHTML = taskDefinitions.filter((task) => task.id !== "diagnose").map((task) => `
    <button class="task-button ${task.id === activeTask.id ? "active" : ""}" data-task="${task.id}" type="button" role="listitem">
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
    audience: "教師與學生共同使用",
    focusDimension: els.focusDimension.value,
    evidence: els.evidence.checked,
    unknown: els.unknown.checked
  };
}

function buildFocusInstruction() {
  if (activeTask.id !== "similar") return "";
  const selected = els.focusDimension.value;
  if (!selected) {
    return "【本次聚焦能力向度】請先在右側選擇一項能力向度，再設計五題小考。不可自行改選其他向度，也不要混合十個向度。";
  }
  return `【本次聚焦能力向度】本次指定只練習「${selected}」。請讓五題都以這一項作為主要評量向度；其他能力只能作為理解題意的輔助，不得轉移本次小考的訓練重點。`;
}

function renderPrompt() {
  els.title.textContent = activeTask.title;
  els.category.textContent = activeTask.category;
  els.description.textContent = activeTask.description;
  const focusInstruction = buildFocusInstruction();
  const prompt = activeTask.build(getSettings()).replace(/輸出對象：教師與學生共同使用[，。]?/g, "").replaceAll("沖刺", "衝刺");
  els.output.textContent = [focusInstruction, prompt].filter(Boolean).join("\n\n");
}

function flashToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.clearTimeout(flashToast.timer);
  flashToast.timer = window.setTimeout(() => els.toast.classList.remove("show"), 2200);
}

async function copyPrompt() {
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
