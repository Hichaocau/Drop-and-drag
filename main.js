const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const ul = $(".container")
let data = [
  {
    "heading": "List Item 1",
    "description": "Description of the first item in the list."
  },
  {
    "heading": "List Item 2",
    "description": "Description of the first item in the list."
  },
  {
    "heading": "List Item 3",
    "description": "Description of the first item in the list."
  },
  {
    "heading": "List Item 4",
    "description": "Description of the first item in the list."
  }
]
class dragDropMain {
  constructor() {
    this.init()
  }
  init() {
    ul.innerHTML = "";
    data.forEach((item, index) => {
      let liItem = document.createElement("li");
      liItem.setAttribute("class", "item");
      liItem.setAttribute("id", index);
      liItem.draggable = true;
      liItem.innerHTML = `
        <i class="fa-solid fa-ellipsis"></i>
        <div class="item-text">
          <h2 class="item-heading">${item.heading}</h2>
          <div class="item-des">${item.description}</div>
        </div>
      `
      ul.appendChild(liItem);
    })
    this.handleEventsItem()
  }
  handleEventsItem() {
    let allItem = ul.querySelectorAll('.item');
    let currentIndex;
    let dropIndex;
    allItem.forEach((item) => {
      item.addEventListener("dragover", (e) => {
        e.preventDefault();
      })

      item.addEventListener("dragenter", () => {
        item.classList.add("active");
      })

      item.addEventListener("dragleave", () => {
        item.classList.remove("active");
      })

      item.addEventListener("dragstart", () => {
        currentIndex = item.getAttribute("id");
        item.classList.add("active");
      })

      item.addEventListener("drop", (e) => {
        e.preventDefault();
        item.classList.remove("active");
        dropIndex = item.getAttribute("id");

        data.splice(dropIndex, 0, data.splice(currentIndex, 1)[0]); //index, index delete, data

        this.init()
      })

      item.addEventListener("dragend", () => {
        item.classList.remove("active");
        item.style.display = "flex";
      })
    })
  }
}
const dragDropObj = new dragDropMain()