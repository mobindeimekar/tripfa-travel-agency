const destinationData = window.destinationData || [];

const tabs = document.querySelectorAll('.tab');
const tripOptions = document.querySelectorAll('.option-pill');
const swapBtn = document.querySelector('.swap-btn');
const fields = document.querySelectorAll('.search-fields .field-input input');
const returnField = document.querySelector('.return-field');
const menuToggle = document.querySelector('.menu-toggle');
const sideDrawer = document.querySelector('.side-drawer');
const sideOverlay = document.querySelector('.side-overlay');
const drawerClose = document.querySelector('.drawer-close');
const cityTabs = document.getElementById('city-tabs');
const destinationGrid = document.getElementById('destination-grid');

if (tabs.length) {
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((item) => item.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}

if (tripOptions.length) {
  tripOptions.forEach((btn) => {
    btn.addEventListener('click', () => {
      tripOptions.forEach((item) => item.classList.remove('active'));
      btn.classList.add('active');

      const isRound = btn.dataset.trip === 'round';
      if (returnField) {
        returnField.style.display = isRound ? 'block' : 'none';
      }
    });
  });
}

if (returnField) {
  const activeTrip = document.querySelector('.option-pill.active');
  const isRound = activeTrip && activeTrip.dataset.trip === 'round';
  returnField.style.display = isRound ? 'block' : 'none';
}

if (swapBtn) {
  swapBtn.addEventListener('click', () => {
    if (fields.length < 2) return;
    const temp = fields[0].value;
    fields[0].value = fields[1].value;
    fields[1].value = temp;
  });
}

const closeDrawer = () => {
  if (!sideDrawer || !sideOverlay) return;
  sideDrawer.classList.remove('open');
  sideOverlay.classList.remove('open');
};

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    if (!sideDrawer || !sideOverlay) return;
    sideDrawer.classList.add('open');
    sideOverlay.classList.add('open');
  });
}

if (drawerClose) {
  drawerClose.addEventListener('click', closeDrawer);
}

if (sideOverlay) {
  sideOverlay.addEventListener('click', closeDrawer);
}

const renderCityTabs = (data) => {
  if (!cityTabs) return;
  cityTabs.innerHTML = data
    .map(
      (city, index) =>
        `<button class="city-tab ${index === 0 ? 'active' : ''}" data-city="${city.id}">${city.title}</button>`
    )
    .join('');
};

const renderDestinationCards = (items) => {
  if (!destinationGrid) return;
  destinationGrid.innerHTML = items
    .map(
      (item) => `
      <article class="destination-card">
        <div class="card-media">
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
          <div class="card-badge">
            <i class="fa-regular fa-star"></i>
            تجربه منتخب
          </div>
        </div>
        <div>
          <h3 class="card-title">${item.title}</h3>
          <p class="card-desc">${item.description}</p>
        </div>
        <div class="card-actions">
          <button class="card-btn">توضیحات بیشتر</button>
        </div>
      </article>
    `
    )
    .join('');
};

const initDestinations = () => {
  if (!cityTabs || !destinationGrid || !destinationData.length) return;
  renderCityTabs(destinationData);
  renderDestinationCards(destinationData[0].items);

  const tabButtons = cityTabs.querySelectorAll('.city-tab');
  tabButtons.forEach((button) => {
    button.addEventListener('click', () => {
      tabButtons.forEach((item) => item.classList.remove('active'));
      button.classList.add('active');

      const city = destinationData.find((entry) => entry.id === button.dataset.city);
      if (city) {
        renderDestinationCards(city.items);
      }
    });
  });
};

initDestinations();

const aboutToggle = document.getElementById('about-toggle');
const aboutMore = document.getElementById('about-more');

if (aboutToggle && aboutMore) {
  aboutToggle.addEventListener('click', () => {
    const isOpen = aboutMore.classList.toggle('show');
    aboutToggle.textContent = isOpen ? 'نمایش کمتر' : 'توضیحات بیشتر';
  });
}

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  if (!button) return;
  button.addEventListener('click', () => {
    item.classList.toggle('open');
  });
});

const dateFields = document.querySelectorAll('.date-field');
dateFields.forEach((field) => {
  const input = field.querySelector('input[type="date"]');
  const icon = field.querySelector('i');
  if (!input || !icon) return;
  icon.addEventListener('click', () => {
    if (typeof input.showPicker === 'function') {
      input.showPicker();
      return;
    }
    input.focus();
  });
});
