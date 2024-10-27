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

document.querySelectorAll('.draggable').forEach(element => {
  element.addEventListener('dragstart', event => {
    event.dataTransfer.setData("text/plain", event.target.id);
  });
});

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

  const templateTexts = [
    "時間（星期）姓名",
    "OKR目標（最終目標）：",
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

function generateEveningTemplate() {
  const eveningTextContainer = document.getElementById("evening-text");
  eveningTextContainer.innerHTML = ""; // 清空晚結區域內容

  const templateTexts = [
    "時間（星期）姓名",
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
