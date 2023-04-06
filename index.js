document.addEventListener('DOMContentLoaded', () => {
    const counter = document.querySelector('#counter');
    const minusBtn = document.querySelector('#minus');
    const plusBtn = document.querySelector('#plus');
    const heartBtn = document.querySelector('#heart');
    const pauseBtn = document.querySelector('#pause');
    const submitBtn = document.querySelector('#submit');
    const commentForm = document.querySelector('#comment-form');
    const commentList = document.querySelector('#list');
    
    let count = 0;
    let intervalId = setInterval(incrementCounter, 1000);
    let paused = false;
    
    function incrementCounter() {
      if (!paused) {
        count++;
        counter.innerText = count;
      }
    }
    
    function decrementCounter() {
      count--;
      counter.innerText = count;
    }
    
    function likeCounter() {
      const likesList = document.querySelector('.likes');
      const currentCount = counter.innerText;
      const existingLike = likesList.querySelector(`[data-count='${currentCount}']`);
      
      if (existingLike) {
        const likeCountSpan = existingLike.querySelector('span');
        const likeCount = parseInt(likeCountSpan.innerText);
        likeCountSpan.innerText = likeCount + 1;
      } else {
        const likeItem = document.createElement('li');
        likeItem.dataset.count = currentCount;
        likeItem.innerHTML = `${currentCount} has been liked <span>1</span> time`;
        likesList.append(likeItem);
      }
    }
    
    function pauseCounter() {
      paused = !paused;
      minusBtn.disabled = paused;
      plusBtn.disabled = paused;
      heartBtn.disabled = paused;
      submitBtn.disabled = paused;
      pauseBtn.innerText = paused ? 'resume' : 'pause';
    }
    
    function restartCounter() {
      count = 0;
      counter.innerText = count;
      const likesList = document.querySelector('.likes');
      likesList.innerHTML = '';
    }
    
    function addComment(event) {
      event.preventDefault();
      const commentInput = document.querySelector('#comment-input');
      const commentText = commentInput.value.trim();
      if (commentText) {
        const commentItem = document.createElement('li');
        commentItem.innerText = commentText;
        commentList.append(commentItem);
        commentInput.value = '';
      }
    }
    
    minusBtn.addEventListener('click', decrementCounter);
    plusBtn.addEventListener('click', incrementCounter);
    heartBtn.addEventListener('click', likeCounter);
    pauseBtn.addEventListener('click', pauseCounter);
    commentForm.addEventListener('submit', addComment);
    
    document.querySelector('#restart').addEventListener('click', restartCounter);
  });
  