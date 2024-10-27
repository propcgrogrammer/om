function allowDrop(event) {
  event.preventDefault();
}

function handleDrop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData("text/plain");
  const targetContainer = event.target.closest(".drop-area").querySelector("div");
  const draggedElement = document.getElementById(data);
  
  if (targetContainer && draggedElement) {
    targetContainer.appendChild(draggedElement);
  }
}

function updateName() {
  const name = document.getElementById("name").value;
  
  // 更新早宣和晚結文字中的「姓名」部分
  const morningTextContainer = document.getElementById("morning-text");
  const eveningTextContainer = document.getElementById("evening-text");

  morningTextContainer.querySelectorAll(".name-field").forEach(element => {
    element.textContent = "姓名：" + name;
  });
  eveningTextContainer.querySelectorAll(".name-field").forEach(element => {
    element.textContent = "姓名：" + name;
  });
}

function addWord() {
  const newWordInput = document.getElementById("new-word");
  const newWordText = newWordInput.value.trim();
  if (newWordText) {
    const newDraggable = document.createElement("div");
    newDraggable.className = "draggable";
    newDraggable.draggable = true;
    newDraggable.textContent = newWordText;
    newDraggable.id = 'word-' + Date.now();
    
    newDraggable.addEventListener('dragstart', event => {
      event.dataTransfer.setData("text/plain", newDraggable.id);
    });

    document.getElementById("draggable-pool").appendChild(newDraggable);
    newWordInput.value = "";
  }
}

function generateMorningTemplate() {
  const morningTextContainer = document.getElementById("morning-text");
  morningTextContainer.innerHTML = ""; // 清空早宣區域內容

  // 從輸入區獲取姓名、日期和 OKR 目標
  const name = document.getElementById("name").value.trim();
  const date = document.getElementById("date").value.trim();
  const okrGoal = document.getElementById("okr").value.trim();

  // 構建早宣範本文字並插入輸入值
  const templateTexts = [
    `時間（星期）：${date ? date : ""}`,
    `姓名：${name ? name : ""}`,
    `OKR目標（最終目標）：${okrGoal ? okrGoal : ""}`,
    "本月目標：",
    "今日行動&結果（呼應OKR及本月目標）："
  ];

  templateTexts.forEach((text, index) => {
    const newDraggable = document.createElement("div");
    newDraggable.className = "draggable";
    newDraggable.draggable = true;
    newDraggable.textContent = text;
    newDraggable.id = "morning-template-" + index;

    newDraggable.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", newDraggable.id);
    });

    morningTextContainer.appendChild(newDraggable);
  });
}


function copyMorningText() {
  const morningTextContainer = document.getElementById("morning-text");
  const textToCopy = Array.from(morningTextContainer.children)
                          .map(element => element.textContent)
                          .join("\n");
  
  navigator.clipboard.writeText(textToCopy).then(() => {
    alert("早宣文字已複製！");
  }).catch(err => {
    alert("複製失敗，請再試一次。");
  });
}

function clearMorningText() {
  document.getElementById("morning-text").innerHTML = ""; // 清空早宣區文字
}

function generateEveningTemplate() {
  const eveningTextContainer = document.getElementById("evening-text");
  eveningTextContainer.innerHTML = ""; // 清空晚結區域內容

  const templateTexts = [
    "時間（星期）",
    "姓名",
    "今日行動&結果（呼應OKR及本月目標）：打勾和打差",
    "我今天對我自己的察覺：",
    "我要嘉許我自己的是：",
    "我要感恩的人事物："
  ];

  templateTexts.forEach((text, index) => {
    const newDraggable = document.createElement("div");
    newDraggable.className = "draggable";
    newDraggable.draggable = true;
    newDraggable.textContent = text;
    newDraggable.id = "evening-template-" + index;

    newDraggable.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", newDraggable.id);
    });

    eveningTextContainer.appendChild(newDraggable);
  });
}

function copyEveningText() {
  const eveningTextContainer = document.getElementById("evening-text");
  const textToCopy = Array.from(eveningTextContainer.children)
                          .map(element => element.textContent)
                          .join("\n");
  
  navigator.clipboard.writeText(textToCopy).then(() => {
    alert("晚結文字已複製！");
  }).catch(err => {
    alert("複製失敗，請再試一次。");
  });
}

function clearEveningText() {
  document.getElementById("evening-text").innerHTML = ""; // 清空晚結區文字
}
