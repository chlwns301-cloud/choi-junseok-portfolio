const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealItems.forEach((item, index) => {
  if (item.closest('.hero')) item.style.setProperty('--delay', `${index * 85}ms`);
  observer.observe(item);
});

document.querySelectorAll('a[href="#"]').forEach((link) => {
  link.addEventListener('click', (event) => event.preventDefault());
});

const englishToKorean = {
  'About': '소개', 'Work': '자료', 'Contact': '연락', "Let's talk": '이야기하기',
  'UNDERGRADUATE': '학부', 'RESEARCHER': '연구생', 'SCROLL TO EXPLORE': '아래로 스크롤',
  '01 / ABOUT': '01 / 소개', '02 / TOOLKIT': '02 / 역량', '03 / RESEARCH & STUDY ARCHIVE': '03 / 연구·학습 아카이브', '04 / CONTACT': '04 / 연락',
  'DESIGN & MODELING': '설계 · 모델링', 'SIMULATION': '시뮬레이션', 'COMPUTING': '컴퓨팅',
  'DESIGN & MODELING': '설계 · 모델링', 'ENGINEERING ANALYSIS': '공학 해석', 'MANUFACTURING FUTURE': '제조 AI의 미래',
  'PERSONAL ASSIGNMENT': '개인 과제', 'STUDY NOTE': '스터디 노트', 'RESEARCH LOG': '연구 기록', 'PDF SOON': 'PDF 준비 중',
  'LET\'S MAKE': '함께', 'SOMETHING': '만들고', 'TOGETHER': '싶다면',
  'DESIGNED & BUILT WITH CARE': '정성껏 설계하고 만들었습니다', 'BACK TO TOP': '맨 위로',
  'CHOI': '최', 'JUNSEOK': '준석', 'MANUFACTURE': '제조',
  'CAD': 'CAD', 'FEA': 'FEA', 'AI': 'AI'
};

const koreanToEnglish = {
  '안녕하세요, 저는 한양대학교 학부연구생': 'Hello, I am an undergraduate researcher at Hanyang University',
  '제조 공학과 AI를 연결해': 'Bridging manufacturing engineering and AI',
  '더 나은 문제 해결 방식을 탐구합니다.': 'to explore better ways to solve problems.',
  '제조의 문제를': 'Solving manufacturing', '로': 'with', '풀어냅니다.': 'AI.',
  'CAD 기반 설계와 공학 해석의 기반 위에서, Python과 AI를 활용한 제조 혁신을 탐구합니다. 현장의 문제를 데이터와 기술로 해결하는 Manufacture-AI Engineer를 목표로 합니다.': 'I explore manufacturing innovation built on CAD design and engineering analysis, using Python and AI. My goal is to become a Manufacture-AI Engineer who solves real-world problems with data and technology.',
  '함께 이야기하기': 'Let\'s talk', '연구·학습': 'Research & study', '자료.': 'archive.',
  '개인 과제 자료를 준비하고 있습니다': 'Personal assignment materials are coming soon',
  'AI 스터디 자료를 준비하고 있습니다': 'AI study materials are coming soon',
  '연구 기록과 배움을 정리하고 있습니다': 'Research notes and learnings are coming soon',
  '연구, 제조 AI, 혹은': 'For research, manufacturing AI, or', '협업에 관한 이야기를 나눠요.': 'collaboration, let\'s start a conversation.',
  '소개': 'About', '자료': 'Work', '연락': 'Contact', '이야기하기': "Let's talk",
  '학부': 'UNDERGRADUATE', '연구생': 'RESEARCHER', '아래로 스크롤': 'SCROLL TO EXPLORE',
  '01 / 소개': '01 / ABOUT', '02 / 역량': '02 / TOOLKIT', '03 / 연구·학습 아카이브': '03 / RESEARCH & STUDY ARCHIVE', '04 / 연락': '04 / CONTACT',
  '설계 · 모델링': 'DESIGN & MODELING', '시뮬레이션': 'SIMULATION', '컴퓨팅': 'COMPUTING', '공학 해석': 'ENGINEERING ANALYSIS', '제조 AI의 미래': 'MANUFACTURING FUTURE',
  '개인 과제': 'PERSONAL ASSIGNMENT', '스터디 노트': 'STUDY NOTE', '연구 기록': 'RESEARCH LOG', 'PDF 준비 중': 'PDF SOON',
  '함께': 'LET\'S MAKE', '만들고': 'SOMETHING', '싶다면': 'TOGETHER',
  '정성껏 설계하고 만들었습니다': 'DESIGNED & BUILT WITH CARE', '맨 위로': 'BACK TO TOP',
  '최': 'CHOI', '준석': 'JUNSEOK', '제조': 'MANUFACTURE'
};

const languageToggle = document.querySelector('#languageToggle');
const translatableNodes = [];
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
let node;
while ((node = walker.nextNode())) {
  const text = node.nodeValue.trim();
  if (!text) continue;
  const prefix = node.nodeValue.match(/^\s*/)[0];
  const suffix = node.nodeValue.match(/\s*$/)[0];
  const korean = englishToKorean[text] || text;
  const english = koreanToEnglish[text] || text;
  translatableNodes.push({ node, prefix, suffix, korean, english });
}

let currentLanguage = 'ko';
languageToggle.addEventListener('click', () => {
  currentLanguage = currentLanguage === 'ko' ? 'en' : 'ko';
  translatableNodes.forEach(({ node: textNode, prefix, suffix, korean, english }) => {
    textNode.nodeValue = `${prefix}${currentLanguage === 'ko' ? korean : english}${suffix}`;
  });
  document.documentElement.lang = currentLanguage;
  languageToggle.textContent = currentLanguage === 'ko' ? 'EN' : 'KO';
  languageToggle.setAttribute('aria-label', currentLanguage === 'ko' ? 'Switch to English' : '한국어로 변경');
});
