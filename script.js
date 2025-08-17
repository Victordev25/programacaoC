const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

const MENU_ITEMS = [
  {
    id: 'neo-edamame',
    name: 'Edamame Neon',
    desc: 'Vagem de soja com sal cibernético e óleo de gergelim ionizado.',
    price: 28.9,
    category: 'entradas',
    img: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b0?q=80&w=1200&auto=format&fit=crop',
    tags: ['vegan'],
  },
  {
    id: 'holo-taco',
    name: 'Taco Holográfico',
    desc: 'Tortilha azul, peixe em tempura, maionese de yuzu e pó cintilante comestível.',
    price: 42.5,
    category: 'entradas',
    img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop',
    tags: ['spicy'],
  },
  {
    id: 'fusion-ramen',
    name: 'Ramen de Fusão Quântica',
    desc: 'Caldo dashi, spaghetti de algas, porco chashu e nitro-cebolinha.',
    price: 62.9,
    category: 'pratos',
    img: 'https://images.unsplash.com/photo-1604908554007-06258b35682c?q=80&w=1200&auto=format&fit=crop',
    tags: ['spicy'],
  },
  {
    id: 'plasma-risotto',
    name: 'Risotto de Plasma',
    desc: 'Arborio com caldo de cogumelos, queijo vegano trufado e pó de beterraba.',
    price: 58.0,
    category: 'pratos',
    img: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?q=80&w=1200&auto=format&fit=crop',
    tags: ['vegan'],
  },
  {
    id: 'ion-burger',
    name: 'Ion Burger',
    desc: 'Blend bovino, cheddar reativo, cebola caramelizada e molho elétrico.',
    price: 54.9,
    category: 'pratos',
    img: 'https://images.unsplash.com/photo-1550317138-10000687a72b?q=80&w=1200&auto=format&fit=crop',
    tags: [],
  },
  {
    id: 'cosmo-sushi',
    name: 'Cosmo Sushi',
    desc: 'Combo de nigiris com esfera de ponzu e poeira cítrica.',
    price: 74.0,
    category: 'pratos',
    img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1200&auto=format&fit=crop',
    tags: ['vegan'],
  },
  {
    id: 'nebulous-gin',
    name: 'Gin Nebuloso',
    desc: 'Gin, água tônica artesanal, gelo seco e tintura de lavanda.',
    price: 34.0,
    category: 'drinks',
    img: 'https://images.unsplash.com/photo-1566417713940-fe7c737a9ef1?q=80&w=1200&auto=format&fit=crop',
    tags: [],
  },
  {
    id: 'quantum-cola',
    name: 'Cola Quântica',
    desc: 'Releitura artesanal com especiarias e borbulhas persistentes.',
    price: 18.0,
    category: 'drinks',
    img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1200&auto=format&fit=crop',
    tags: ['vegan'],
  },
  {
    id: 'stellar-tiramisu',
    name: 'Tiramisù Estelar',
    desc: 'Camadas aveludadas com névoa de café e mascarpone leve.',
    price: 32.0,
    category: 'sobremesas',
    img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1200&auto=format&fit=crop',
    tags: [],
  },
  {
    id: 'plasma-cheesecake',
    name: 'Cheesecake de Plasma',
    desc: 'Base crocante, creme suave e coulis neon de frutas vermelhas.',
    price: 31.5,
    category: 'sobremesas',
    img: 'https://images.unsplash.com/photo-1599785209796-df02c2c5b9e1?q=80&w=1200&auto=format&fit=crop',
    tags: ['vegan'],
  },
  {
    id: 'molecular-sphere',
    name: 'Esfera Molecular',
    desc: 'Explosão de sabores cítricos encapsulados em alginato.',
    price: 26.0,
    category: 'entradas',
    img: 'https://images.unsplash.com/photo-1555949963-aa79dcee981d?q=80&w=1200&auto=format&fit=crop',
    tags: [],
  },
  {
    id: 'nova-kombucha',
    name: 'Kombucha Nova',
    desc: 'Fermentado de hibisco e framboesa, refrescância cósmica.',
    price: 19.5,
    category: 'drinks',
    img: 'https://images.unsplash.com/photo-1559718062-361155fad299?q=80&w=1200&auto=format&fit=crop',
    tags: ['vegan'],
  }
];

const STATE = {
  filter: 'tudo',
  search: '',
  favorites: new Set(JSON.parse(localStorage.getItem('neo.favs') || '[]')),
};

function saveFavs() {
  localStorage.setItem('neo.favs', JSON.stringify(Array.from(STATE.favorites)));
}

function formatPrice(n) {
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function createTag(label) {
  const span = document.createElement('span');
  span.className = 'tag';
  span.textContent = label;
  return span;
}

function cardTemplate(item) {
  const isFav = STATE.favorites.has(item.id);
  const el = document.createElement('article');
  el.className = 'card reveal';
  el.setAttribute('data-id', item.id);
  el.innerHTML = `
    <div class="card__media">
      <img src="${item.img}" alt="${item.name}" loading="lazy"/>
      <span class="card__badge">${item.category}</span>
    </div>
    <div class="card__body">
      <div class="card__title">
        <h3>${item.name}</h3>
        <button class="card__like" aria-label="Favoritar">${isFav ? '❤' : '♡'}</button>
      </div>
      <p class="card__desc">${item.desc}</p>
      <div class="card__meta">
        <span class="price">${formatPrice(item.price)}</span>
        <div class="tags"></div>
      </div>
      <button class="btn btn--neon open-modal">Detalhes</button>
    </div>
  `;
  const tagsWrap = $('.tags', el);
  item.tags.forEach(t => tagsWrap.appendChild(createTag(t)));
  return el;
}

function renderMenu() {
  const grid = $('#menuGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const matchesFilter = (i) => STATE.filter === 'tudo' || i.category === STATE.filter || i.tags.includes(STATE.filter);
  const matchesSearch = (i) => i.name.toLowerCase().includes(STATE.search) || i.desc.toLowerCase().includes(STATE.search);

  const items = MENU_ITEMS.filter(i => matchesFilter(i) && matchesSearch(i));
  if (items.length === 0) {
    grid.innerHTML = '<p class="section__subtitle">Nenhum item encontrado. Experimente outra busca ou categoria.</p>';
    return;
  }
  const frag = document.createDocumentFragment();
  items.forEach(item => frag.appendChild(cardTemplate(item)));
  grid.appendChild(frag);
}

function setActiveFilter(btn) {
  $$('.filter').forEach(b => b.classList.remove('is-active'));
  btn.classList.add('is-active');
}

function setupFilters() {
  $$('.filter').forEach(btn => {
    btn.addEventListener('click', () => {
      STATE.filter = btn.dataset.filter;
      setActiveFilter(btn);
      renderMenu();
    });
  });
}

function debounce(fn, ms = 200) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

function setupSearch() {
  const input = $('#menuSearch');
  if (!input) return;
  input.addEventListener('input', debounce(() => {
    STATE.search = input.value.trim().toLowerCase();
    renderMenu();
  }, 250));
}

function setupCardInteractions() {
  const grid = $('#menuGrid');
  if (!grid) return;
  grid.addEventListener('click', (e) => {
    const likeBtn = e.target.closest('.card__like');
    const openBtn = e.target.closest('.open-modal');
    const card = e.target.closest('.card');
    if (!card) return;
    const id = card.getAttribute('data-id');

    if (likeBtn) {
      if (STATE.favorites.has(id)) STATE.favorites.delete(id); else STATE.favorites.add(id);
      saveFavs();
      renderMenu();
      return;
    }

    if (openBtn) {
      openModal(id);
      return;
    }
  });

  grid.addEventListener('mousemove', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const pctX = (e.clientX - rect.left) / rect.width - 0.5;
    const pctY = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `rotateY(${pctX * 5}deg) rotateX(${pctY * -5}deg) translateY(-4px)`;
  });
  grid.addEventListener('mouseleave', () => {
    $$('.card').forEach(c => c.style.transform = '');
  });
}

function openModal(id) {
  const item = MENU_ITEMS.find(i => i.id === id);
  if (!item) return;
  const modal = $('#itemModal');
  $('#modalImg').src = item.img;
  $('#modalImg').alt = item.name;
  $('#modalTitle').textContent = item.name;
  $('#modalDesc').textContent = item.desc;
  $('#modalPrice').textContent = formatPrice(item.price);
  const tags = $('#modalTags');
  tags.innerHTML = '';
  item.tags.forEach(t => tags.appendChild(createTag(t)));
  $('#modalAction').onclick = () => {
    alert('Pedido registrado! Nossa equipe vai confirmar com você.');
  };
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  const modal = $('#itemModal');
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
}

function setupModal() {
  const modal = $('#itemModal');
  modal.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-close')) closeModal();
  });
  $('.modal__close').addEventListener('click', closeModal);
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
}

function setupBooking() {
  const form = $('#bookingForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#bookName').value.trim();
    const date = $('#bookDate').value;
    const time = $('#bookTime').value;
    const guests = $('#bookGuests').value;
    const msg = $('#bookingMsg');
    if (!name || !date || !time) {
      msg.style.color = 'var(--danger)';
      msg.textContent = 'Por favor, preencha todos os campos.';
      return;
    }
    msg.style.color = 'var(--success)';
    msg.textContent = `Reserva solicitada para ${guests} pessoa(s) em ${new Date(date).toLocaleDateString('pt-BR')} às ${time}, ${name}. Entraremos em contato!`;
    form.reset();
  });
  $('#reserveTop').addEventListener('click', () => {
    window.location.hash = '#booking';
  });
}

function createIcon(svg, left, top, size = 38, dur = 6) {
  const wrap = document.createElement('div');
  wrap.className = 'icon';
  wrap.style.left = left;
  wrap.style.top = top;
  wrap.style.setProperty('--dur', `${dur}s`);
  wrap.innerHTML = svg;
  wrap.firstElementChild.setAttribute('width', size);
  wrap.firstElementChild.setAttribute('height', size);
  return wrap;
}

const SVGS = {
  star: '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#00F0FF" d="M12 2l2.9 6.3 6.8.5-5.1 4.4 1.6 6.6L12 16.7 5.8 19.8l1.6-6.6L2.4 8.8l6.8-.5L12 2z"/></svg>',
  rocket: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#7B61FF" d="M12 2c4 0 6 2 6 6 0 3-2 7-6 11-4-4-6-8-6-11 0-4 2-6 6-6zm0 3a2 2 0 100 4 2 2 0 000-4z"/><path fill="#FF2BD3" d="M5 15c-1 0-3 2-3 3 0 1 2 2 3 2s3-1 3-2-2-3-3-3z"/></svg>',
  leaf: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#2DFF86" d="M3 12c6-8 18-9 18-9s-1 12-9 18C6 15 3 12 3 12z"/></svg>',
  flame: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#FFC700" d="M12 2s4 4 3 8-5 5-3 9c-5-2-8-6-5-11 2-4 5-6 5-6z"/></svg>',
  chef: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="7" r="4" fill="#FFF" opacity=".85"/><rect x="9" y="11" width="6" height="9" rx="2" fill="#00F0FF"/></svg>',
  bubble: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="4" fill="#00F0FF" opacity=".35"/><circle cx="14" cy="10" r="3" fill="#7B61FF" opacity=".35"/><circle cx="18" cy="5" r="2" fill="#FF2BD3" opacity=".35"/></svg>'
};

function setupFloatingIcons() {
  const layer = $('.floating-icons');
  if (!layer) return;
  const icons = [
    createIcon(SVGS.star, '8%', '24%', 40, 7),
    createIcon(SVGS.rocket, '22%', '6%', 46, 8),
    createIcon(SVGS.leaf, '38%', '36%', 34, 6),
    createIcon(SVGS.flame, '58%', '12%', 34, 7),
    createIcon(SVGS.chef, '74%', '30%', 48, 9),
    createIcon(SVGS.bubble, '86%', '14%', 52, 8),
    createIcon(SVGS.star, '12%', '60%', 28, 7),
    createIcon(SVGS.leaf, '66%', '62%', 26, 6)
  ];
  icons.forEach(i => layer.appendChild(i));
}

function observeReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animation = 'reveal .6s ease both';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(el => obs.observe(el));
}

const style = document.createElement('style');
style.innerHTML = `@keyframes reveal { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }`;
document.head.appendChild(style);

function initYear() { $('#year').textContent = new Date().getFullYear(); }

function boot() {
  setupFloatingIcons();
  setupFilters();
  setupSearch();
  setupCardInteractions();
  setupModal();
  setupBooking();
  renderMenu();
  observeReveal();
  initYear();
}

document.addEventListener('DOMContentLoaded', boot);