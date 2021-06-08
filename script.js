const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const my7WondersOfTheWorld = [
  'Great Wall of China, China',
  'Great Pyramid of Giza, Egypt',
  'Colosseum, Italy',
  'Taj Mahal, India',
  'Machu Picchu, Peru',
  'Petra, Jordan',
  'Chichen Itza, Mexico'
];

// Store list items
const listItems = [];

// Keep track of the index of each list item
let dragStartIndex;

createList();

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// const numbers = [1, 3, 110, 40, 302];
// console.log(numbers.sort()); // 1, 110, 3, 302, 4
// console.log(
//   numbers.sort(function (a, b) {
//     return a - b;
//   })
// );


// Insert list items into DOM
// Responsible for generating the li's
function createList() {
  [...my7WondersOfTheWorld]
  .map(a => ({
      value: a,
      sort: Math.random()
    }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((wonder, index) => {
      // console.log(wonder);

      const listItem = document.createElement('li');

      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable="true">
        <p class="wonder-name">${wonder}</p>
        <i class="fas fa-grip-lines"></i>
      </div>
      `;

      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  // console.log('Event: ', 'dragstart');
  dragStartIndex = +this.closest('li').getAttribute('data-index');
  // console.log(dragStartIndex);
}

function dragEnter() {
  // console.log('Event: ', 'dragenter');
  this.classList.add('over');
}

function dragLeave() {
  // console.log('Event: ', 'dragleave');
  this.classList.remove('over');
}

function dragOver(e) {
  // console.log('Event: ', 'dragover');
  e.preventDefault();
}

function dragDrop() {
  // console.log('Event: ', 'dragdrop');
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}


// Swap list items that are draged and dropped
function swapItems(fromIndex, toIndex) {
  // console.log(123);
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');
  // console.log(itemOne, itemTwo);

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}


// Check the order of list items
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const wonderName = listItem.querySelector('.draggable').innerText.trim();
    // console.log(wonderName);

    if (wonderName !== my7WondersOfTheWorld[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}


// Event Listeners
function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

check.addEventListener('click', checkOrder);