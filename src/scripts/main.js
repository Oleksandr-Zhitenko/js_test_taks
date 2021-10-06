'use strict';

const rootElement = document.getElementById('root');
const btn = document.querySelector('button');

let layer = 0;

window.addEventListener('click', (e) => {
  layer++;
  e.target.style.zIndex = layer;
});

btn.onclick = function() {
  const item = document.createElement('div');
  const minWidth = 50;
  const maxWidth = 100;
  const minHeight = 50;
  const maxHeight = 100;
  const width = Math.random() * maxWidth + minWidth;
  const height = Math.random() * maxHeight + minHeight;
  const color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  const x = Math.random() * (window.innerHeight - height);
  const y = Math.random() * (window.innerWidth - width);

  item.style.width = `${width}px`;
  item.style.height = `${height}px`;
  item.style.backgroundColor = color;
  item.style.position = 'absolute';
  item.style.top = `${x}px`;
  item.style.left = `${y}px`;

  item.addEventListener('mousedown', initResize, false);

  function initResize(e) {
    const range = 8;

    if (item.offsetLeft + item.offsetWidth - e.clientX <= range) {
      window.addEventListener('mousemove', resizeLeft, false);
    }

    if (item.offsetTop + item.offsetHeight - e.clientY <= range) {
      window.addEventListener('mousemove', resizeTop, false);
    }

    if (item.offsetLeft - e.clientX >= -range) {
      window.addEventListener('mousemove', resizeRight, false);
    }

    if (item.offsetTop - e.clientY >= -range) {
      window.addEventListener('mousemove', resizeBottom, false);
    }

    window.addEventListener('mouseup', stopResize, false);
  }

  function resizeLeft(e) {
    item.style.width = (e.clientX - item.offsetLeft) + 'px';
  }

  function resizeTop(e) {
    item.style.height = (e.clientY - item.offsetTop) + 'px';
  }

  function resizeRight(e) {
    item.style.width = item.offsetWidth - (e.clientX - item.offsetLeft) + 'px';
    item.style.left = (e.clientX) + 'px';
  }

  function resizeBottom(e) {
    item.style.height = item.offsetHeight - (e.clientY - item.offsetTop) + 'px';
    item.style.top = (e.clientY) + 'px';
  }

  function stopResize(e) {
    window.removeEventListener('mousemove', resizeLeft, false);
    window.removeEventListener('mousemove', resizeTop, false);
    window.removeEventListener('mousemove', resizeRight, false);
    window.removeEventListener('mousemove', resizeBottom, false);
    window.removeEventListener('mouseup', stopResize, false);
  }
  rootElement.append(item);
};
