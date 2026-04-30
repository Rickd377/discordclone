const listItems = document.querySelectorAll(".list-item");

function selectListItem(target) {
  listItems.forEach(li => {
    const status = li.getAttribute("data-status");
    if (li === target) {
      li.setAttribute("data-status", "selected");
    } else if (status === "selected") {
      li.removeAttribute("data-status");
    }
  });
}

if (listItems && listItems.length) {
  listItems.forEach(listItem => {
    listItem.addEventListener("click", () => selectListItem(listItem));
  });

  document.addEventListener("keydown", (e) => {
    if (!e.altKey) return;
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();

    const items = Array.from(listItems);
    const currentIndex = items.findIndex(li => li.getAttribute("data-status") === "selected");
    let nextIndex = currentIndex;

    if (e.key === "ArrowDown") {
      if (currentIndex === -1) nextIndex = 0;
      else if (currentIndex < items.length - 1) nextIndex = currentIndex + 1;
    } else if (e.key === "ArrowUp") {
      if (currentIndex === -1) nextIndex = items.length - 1;
      else if (currentIndex > 0) nextIndex = currentIndex - 1;
    }

    if (nextIndex !== currentIndex && items[nextIndex]) {
      selectListItem(items[nextIndex]);
    }
  });
}