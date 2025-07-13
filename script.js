// 메뉴 설명 모음
const menuDescriptions = {
  '떡볶이': '매콤달콤 소스와 쌀떡과 오뎅으로 이루어진 떡볶이.',
  '오뎅': '따끈한 국물과 함께하는 오뎅.',
  '물떡': '간장과 먹으면 묘하게 중독되는 물떡.',
  '김말이튀김': '떡볶이와 같이 먹어야하는 튀김.',
  '만두튀김': '바삭한 김말이당면 만두튀김.',
  '오징어튀김': '오징어를 튀긴 튀김. 쫄깃하다.',
  '고추튀김': '오이고추안에 김말이당면을 넣어 튀긴 튀김',
  '고구마 튀김': '달콤한 고구마를 바삭하게 튀긴 것',
  '쥐포튀김': '쥐포를 튀긴 튀김. 쫠깃하다',
  '새우튀김': '새우를 튀긴 것. 새우가 통통하다.',
  '슬러쉬': '여름철 작성자도 몰래 가져가는 시원한 슬러쉬(파파야, 오렌지 맛).',
  '콜팝': '팝콘치킨 + 슬러쉬의 조합.',
  '회오리 감자': '시즈닝 팍팍 쳐줘서 작성자가 즐겨먹는 회오리감자.',
  '핫도그': '바삭하면서 소세지가 맛있는 핫도그.',
  '핫바': '놀이공원에서 먹어본 그 핫바.',
};

const modal = document.getElementById('modal');
const modalDetail = document.getElementById('modalDetail');
const menuReviewList = document.getElementById('menuReviewList');
const storeReviewList = document.getElementById('storeReviewList');
const closeModal = document.getElementById('closeModal');

// 모달 열기
document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', () => {
    const name = item.dataset.name;
    const description = menuDescriptions[name] || `${name}의 설명을 준비 중입니다.`;

    modalDetail.innerHTML = `
      <h2>${name}</h2>
      <img src="${item.querySelector('img').src}" style="width:100%; max-height:500px; object-fit:cover;" />
      <p style="margin: 1rem 0;">${description}</p>
    `;
    modal.style.display = 'block';
  });
});

// 모달 닫기
closeModal.onclick = () => {
  modal.style.display = 'none';
  menuReviewList.innerHTML = '';
};

// 별점 UI 셋업 함수
function setupStarRating(containerSelector, inputSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const stars = container.querySelectorAll('.star');
  const input = container.querySelector(inputSelector);

  let currentRating = 0;

  function fillStars(rating) {
    stars.forEach(star => {
      star.classList.toggle('filled', Number(star.dataset.value) <= rating);
    });
  }

  stars.forEach(star => {
    star.addEventListener('click', () => {
      currentRating = Number(star.dataset.value);
      input.value = currentRating;
      fillStars(currentRating);
    });

    star.addEventListener('mouseenter', () => {
      fillStars(Number(star.dataset.value));
    });

    star.addEventListener('mouseleave', () => {
      fillStars(currentRating);
    });
  });
}

// 저장 함수들
function saveMenuReviews() {
  const reviews = Array.from(menuReviewList.children).map(li => {
    return {
      id: li.dataset.id,
      text: li.dataset.text,
      pw: li.dataset.pw,
      rating: li.dataset.rating
    };
  });
  localStorage.setItem('menuReviews', JSON.stringify(reviews));
}

function saveStoreReviews() {
  const reviews = Array.from(storeReviewList.children).map(li => {
    return {
      id: li.dataset.id,
      text: li.dataset.text,
      pw: li.dataset.pw,
      rating: li.dataset.rating
    };
  });
  localStorage.setItem('storeReviews', JSON.stringify(reviews));
}

// 메뉴 리뷰 등록
document.getElementById('menuReviewForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const id = document.getElementById('menuReviewId').value;
  const pw = document.getElementById('menuReviewPw').value;
  const text = document.getElementById('menuReviewText').value;
  const rating = document.getElementById('menuRatingInput').value;

  if (!rating) {
    alert('별점을 선택해주세요!');
    return;
  }

  const li = document.createElement('li');
  li.dataset.id = id;
  li.dataset.text = text;
  li.dataset.pw = pw;
  li.dataset.rating = rating;
  li.innerHTML = `<strong>${id}:</strong> ${text}<br><span style="color: gold;">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</span>`;

  const delBtn = document.createElement('button');
  delBtn.textContent = '❌';
  delBtn.className = 'delete-btn';
  delBtn.onclick = () => {
    const inputPw = prompt("비밀번호 입력:");
    if (inputPw === pw || inputPw === '2366') {
      li.remove();
      saveMenuReviews();
    } else alert('비밀번호가 일치하지 않습니다.');
  };

  li.appendChild(delBtn);
  menuReviewList.appendChild(li);
  saveMenuReviews();
  this.reset();

  document.getElementById('menuRatingInput').value = '';
  setupStarRating('#menuReviewForm .star-rating', '#menuRatingInput');
});

// 가게 리뷰 등록
document.getElementById('storeReviewForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const id = document.getElementById('storeReviewId').value;
  const pw = document.getElementById('storeReviewPw').value;
  const text = document.getElementById('storeReviewText').value;
  const rating = document.getElementById('storeRatingInput').value;

  if (!rating) {
    alert('별점을 선택해주세요!');
    return;
  }

  const li = document.createElement('li');
  li.dataset.id = id;
  li.dataset.text = text;
  li.dataset.pw = pw;
  li.dataset.rating = rating;
  li.innerHTML = `<strong>${id}:</strong> ${text}<br><span style="color: gold;">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</span>`;

  const delBtn = document.createElement('button');
  delBtn.textContent = '❌';
  delBtn.className = 'delete-btn';
  delBtn.onclick = () => {
    const inputPw = prompt("비밀번호 입력:");
    if (inputPw === pw || inputPw === '2366') {
      li.remove();
      saveStoreReviews();
    } else alert('비밀번호가 일치하지 않습니다.');
  };

  li.appendChild(delBtn);
  storeReviewList.appendChild(li);
  saveStoreReviews();
  this.reset();

  document.getElementById('storeRatingInput').value = '';
  setupStarRating('#storeReviewForm .star-rating', '#storeRatingInput');
});

// 초기 로딩 시 리뷰 복원 및 별점 UI 셋업
window.addEventListener('DOMContentLoaded', () => {
  // 메뉴 리뷰 복원
  const savedMenu = JSON.parse(localStorage.getItem('menuReviews')) || [];
  savedMenu.forEach(({ id, text, pw, rating }) => {
    const li = document.createElement('li');
    li.dataset.id = id;
    li.dataset.text = text;
    li.dataset.pw = pw;
    li.dataset.rating = rating;
    li.innerHTML = `<strong>${id}:</strong> ${text}<br><span style="color: gold;">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</span>`;

    const delBtn = document.createElement('button');
    delBtn.textContent = '❌';
    delBtn.className = 'delete-btn';
    delBtn.onclick = () => {
      const inputPw = prompt("비밀번호 입력:");
      if (inputPw === pw || inputPw === '2366') {
        li.remove();
        saveMenuReviews();
      } else alert('비밀번호가 일치하지 않습니다.');
    };

    li.appendChild(delBtn);
    menuReviewList.appendChild(li);
  });

  // 가게 리뷰 복원
  const savedStore = JSON.parse(localStorage.getItem('storeReviews')) || [];
  savedStore.forEach(({ id, text, pw, rating }) => {
    const li = document.createElement('li');
    li.dataset.id = id;
    li.dataset.text = text;
    li.dataset.pw = pw;
    li.dataset.rating = rating;
    li.innerHTML = `<strong>${id}:</strong> ${text}<br><span style="color: gold;">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</span>`;

    const delBtn = document.createElement('button');
    delBtn.textContent = '❌';
    delBtn.className = 'delete-btn';
    delBtn.onclick = () => {
      const inputPw = prompt("비밀번호 입력:");
      if (inputPw === pw || inputPw === '2366') {
        li.remove();
        saveStoreReviews();
      } else alert('비밀번호가 일치하지 않습니다.');
    };

    li.appendChild(delBtn);
    storeReviewList.appendChild(li);
  });

  // 별점 UI 셋업
  setupStarRating('#menuReviewForm .star-rating', '#menuRatingInput');
  setupStarRating('#storeReviewForm .star-rating', '#storeRatingInput');
});
