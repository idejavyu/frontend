const API_BASE_URL = 'https://wiki-backend-0ou3.onrender.com';
const elements = {
    logoLink: document.getElementById('logoLink'),
    searchInput: document.getElementById('searchInput'),
    searchBtn: document.getElementById('searchBtn'),
    addArticleBtn: document.getElementById('addArticleBtn'),
    profileDropdownBtn: document.getElementById('profileDropdownBtn'),
    profileAvatarHeader: document.getElementById('profileAvatarHeader'),
    profileDropdownContent: document.getElementById('profileDropdownContent'),
    dropdownAuthPrompt: document.getElementById('dropdownAuthPrompt'),
    dropdownLoginLink: document.getElementById('dropdownLoginLink'),
    dropdownRegisterLink: document.getElementById('dropdownRegisterLink'),
    dropdownProfileInfo: document.getElementById('dropdownProfileInfo'),
    dropdownProfileEmail: document.getElementById('dropdownProfileEmail'),
    dropdownProfileRole: document.getElementById('dropdownProfileRole'),
    goToProfileBtn: document.getElementById('goToProfileBtn'),
    dropdownLogoutBtn: document.getElementById('dropdownLogoutBtn'),

    homeSection: document.getElementById('homeSection'),
    authSection: document.getElementById('authSection'),
    profileSection: document.getElementById('profileSection'),
    adminPanelSection: document.getElementById('adminPanelSection'),
    addArticleSection: document.getElementById('addArticleSection'),
    fullArticleSection: document.getElementById('fullArticleSection'),
    editArticleSection: document.getElementById('editArticleSection'),
    searchResultsSection: document.getElementById('searchResultsSection'),

    loginFormContainer: document.getElementById('loginFormContainer'),
    registerFormContainer: document.getElementById('registerFormContainer'),
    loginForm: document.getElementById('loginForm'),
    registerForm: document.getElementById('registerForm'),
    loginEmail: document.getElementById('loginEmail'),
    loginPassword: document.getElementById('loginPassword'),
    registerEmail: document.getElementById('registerEmail'),
    registerPassword: document.getElementById('registerPassword'),
    showRegister: document.getElementById('showRegister'),
    showLogin: document.getElementById('showLogin'),
    authMessage: document.getElementById('authMessage'),

    profileInfo: document.getElementById('profileInfo'),
    profileDisplay: document.getElementById('profile-display'),
    profileAvatar: document.getElementById('profile-avatar'),
    profileEmail: document.getElementById('profile-email'),
    profileRole: document.getElementById('profile-role'),
    profileCreatedAt: document.getElementById('profile-createdAt'),
    profileGenderDisplay: document.getElementById('profile-gender-display'),
    profileDateOfBirthDisplay: document.getElementById('profile-dateOfBirth-display'),
    profileNameDisplay: document.getElementById('profile-name-display'),
    profileImageUpload: document.getElementById('profile-image-upload'),
    updateEmail: document.getElementById('update-email'),
    updateProfileForm: document.getElementById('update-profile-form'),
    updateName: document.getElementById('update-name'),
    updateGender: document.getElementById('update-gender'),
    updateDateOfBirth: document.getElementById('update-dateOfBirth'),
    updateAvatarUrl: document.getElementById('update-avatar-url'),
    cancelUpdateBtn: document.getElementById('cancel-update-btn'),
    profileMessage: document.getElementById('profileMessage'),
    editProfileBtn: document.getElementById('edit-profile-btn'),

    loadUsersBtn: document.getElementById('loadUsersBtn'),
    adminMessage: document.getElementById('adminMessage'),
    usersList: document.getElementById('usersList'),

    popularArticlesContainer: document.getElementById('popularArticlesContainer'),
    recentArticlesContainer: document.getElementById('recentArticlesContainer'),
    sliderArrows: document.querySelectorAll('.slider-arrow'),

    addArticleForm: document.getElementById('addArticleForm'),
    articleTitle: document.getElementById('articleTitle'),
    articleShortDescription: document.getElementById('articleShortDescription'),
    articleFullContent: document.getElementById('articleFullContent'),
    articleImageUrl: document.getElementById('articleImageUrl'),
    addArticleMessage: document.getElementById('addArticleMessage'),
    articleImageUpload: document.getElementById('article-image-upload'), 
    articleImageUrlHidden: document.getElementById('article-image-url-hidden'), 

    fullArticleTitle: document.getElementById('fullArticleTitle'),
    fullArticleImage: document.getElementById('fullArticleImage'),
    fullArticleAuthor: document.getElementById('fullArticleAuthor'),
    fullArticleViews: document.getElementById('fullArticleViews'),
    fullArticleDate: document.getElementById('fullArticleDate'),
    fullArticleContent: document.getElementById('fullArticleContent'),
    articleActions: document.querySelector('#fullArticleSection .article-actions'),
    editArticleBtn: document.getElementById('editArticleBtn'),
    deleteArticleBtn: document.getElementById('deleteArticleBtn'),
    fullArticleMessage: document.getElementById('fullArticleMessage'),

    editArticleForm: document.getElementById('editArticleForm'),
    editArticleId: document.getElementById('editArticleId'),
    editArticleTitle: document.getElementById('editArticleTitle'),
    editArticleShortDescription: document.getElementById('editArticleShortDescription'),
    editArticleFullContent: document.getElementById('editArticleFullContent'),
    editArticleImageUpload: document.getElementById('edit-article-image-upload'),
    editArticleImageUrl: document.getElementById('editArticleImageUrl'),
    cancelEditBtn: document.getElementById('cancelEditBtn'),
    editArticleMessage: document.getElementById('editArticleMessage'),
    editArticleImageUrlHidden: document.getElementById('edit-article-image-url-hidden'), 
    currentArticleImageDisplay: document.getElementById('current-article-image-display'), 
    editArticleCurrentImagePreview: document.getElementById('edit-article-current-image-preview'),

    searchResultsContainer: document.getElementById('searchResultsContainer'),
    searchMessage: document.getElementById('searchMessage')
};

const sliderStates = {};

function initializeSlider(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`Slider container with ID "${containerId}" not found.`);
        return;
    }

    const sliderWrapper = container.closest('.articles-slider');
    if (!sliderWrapper) {
        console.warn(`Slider wrapper for container ID "${containerId}" not found.`);
        return;
    }

    const prevArrow = sliderWrapper.querySelector('.slider-arrow.left');
    const nextArrow = sliderWrapper.querySelector('.slider-arrow.right');

    sliderStates[containerId] = {
        currentIndex: 0,
        articlesPerPage: 1,
        container: container,
        prevArrow: prevArrow,
        nextArrow: nextArrow
    };

    if (prevArrow) {
        prevArrow.onclick = () => moveSlider(containerId, -1);
    }
    if (nextArrow) {
        nextArrow.onclick = () => moveSlider(containerId, 1);
    }

    window.addEventListener('resize', () => updateSliderView(containerId));

    updateSliderView(containerId);
}

function moveSlider(containerId, direction) {
    const state = sliderStates[containerId];
    if (!state) return;

    const totalArticles = state.container.children.length;
    let newIndex = state.currentIndex + direction;

    if (newIndex < 0) {
        newIndex = 0;
    } else if (newIndex > totalArticles - 1) { 
        newIndex = totalArticles - 1;
    }

    if (newIndex !== state.currentIndex) {
        state.currentIndex = newIndex;
        updateSliderView(containerId);
    }
}

function updateSliderView(containerId) {
    const state = sliderStates[containerId];
    if (!state) return;

    const totalArticles = state.container.children.length;
    const articlesGridElement = state.container;
    const sliderContainerElement = articlesGridElement.parentElement;

    if (totalArticles <= 1) {
        state.prevArrow.disabled = true;
        state.nextArrow.disabled = true;
        articlesGridElement.style.transform = `translateX(0px)`;
        return;
    }

    let slideStepWidth = 0;
    const cssGap = 10;

    if (totalArticles > 0 && articlesGridElement.children.length > 0) {
        const firstCard = articlesGridElement.children[0];
        const cardWidth = firstCard.offsetWidth;
        slideStepWidth = cardWidth + cssGap;
    } else {
        console.warn("No article cards found in the grid for slide width calculation. Slider might not function correctly.");
        return;
    }

    const rawTransformOffset = state.currentIndex * slideStepWidth;

    const totalGridWidth = articlesGridElement.scrollWidth;
    const visibleSliderWidth = sliderContainerElement.clientWidth;

    const maxPossibleOffset = Math.max(0, totalGridWidth - visibleSliderWidth);

    const finalTransformOffset = Math.min(rawTransformOffset, maxPossibleOffset);

    articlesGridElement.style.transform = `translateX(-${finalTransformOffset}px)`;

    state.prevArrow.disabled = state.currentIndex === 0;

    state.nextArrow.disabled = (state.currentIndex >= (totalArticles - 1)) || (finalTransformOffset >= maxPossibleOffset);

}


window.addEventListener('resize', () => {
    for (const containerId in sliderStates) {
        const state = sliderStates[containerId];
        if (window.innerWidth <= 900) {
            state.articlesPerPage = 1;
        } else {
            state.articlesPerPage = 2;
        }
        if (state.currentIndex > state.container.children.length - state.articlesPerPage) {
            state.currentIndex = Math.max(0, state.container.children.length - state.articlesPerPage);
        }
        updateSliderView(containerId);
    }
});

function showSection(sectionToShow) {
    const allSections = document.querySelectorAll('.content-section');
    allSections.forEach(section => {
        section.style.display = 'none';
        section.classList.remove('active'); 
    });
    sectionToShow.style.display = 'block';
    sectionToShow.classList.add('active'); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showMessage(element, message, type = 'error') {
    element.textContent = message;
    element.className = 'message ' + type; 
    element.style.display = 'block';
    setTimeout(() => {
        element.style.display = 'none';
        element.textContent = '';
        element.className = 'message';
    }, 5000);
}

function getAuthToken() {
    return localStorage.getItem('token');
}

function getUserData() {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
}

function updateAuthUI() {
    const token = getAuthToken();
    const user = getUserData();

    if (token && user) {
        console.log(user)
        elements.addArticleBtn.style.display = 'block'; 
        elements.dropdownAuthPrompt.style.display = 'none';
        elements.dropdownProfileInfo.style.display = 'block';
        elements.profileAvatarHeader.src = user.avatar; 
        elements.dropdownProfileEmail.textContent = user.email;
        elements.dropdownProfileRole.textContent = user.role;
        elements.dropdownLogoutBtn.style.display = 'block';

        if (user.role === 'admin') {
        } else {
        }
    } else {
        elements.addArticleBtn.style.display = 'none';
        elements.dropdownAuthPrompt.style.display = 'block';
        elements.dropdownProfileInfo.style.display = 'none';
        elements.profileAvatarHeader.src = './images/default-avatar.png';
        elements.dropdownLogoutBtn.style.display = 'none';
    }
}

elements.logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(elements.homeSection);
    loadPopularAndRecentArticles();
});

elements.dropdownLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(elements.authSection);
    elements.loginFormContainer.style.display = 'block';
    elements.registerFormContainer.style.display = 'none';
    elements.authMessage.style.display = 'none';
});

elements.dropdownRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(elements.authSection);
    elements.loginFormContainer.style.display = 'none';
    elements.registerFormContainer.style.display = 'block';
    elements.authMessage.style.display = 'none';
});

elements.goToProfileBtn.addEventListener('click', () => {
    showSection(elements.profileSection);
    loadProfileData();
});

elements.addArticleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showSection(elements.addArticleSection);
    elements.addArticleMessage.style.display = 'none';
});

elements.showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    elements.loginFormContainer.style.display = 'none';
    elements.registerFormContainer.style.display = 'block';
    elements.authMessage.style.display = 'none';
});

elements.showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    elements.loginFormContainer.style.display = 'block';
    elements.registerFormContainer.style.display = 'none';
    elements.authMessage.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
    showSection(elements.homeSection);
    loadPopularAndRecentArticles();
});

function createArticleCard(article) {
    const card = document.createElement('a');
    card.href = `#article-${article._id}`;
    card.classList.add('article-card');
    card.dataset.articleId = article._id;

    const shortDescription = article.shortDescription.length > 100
        ? article.shortDescription.substring(0, 97) + '...'
        : article.shortDescription;

    const baseUrlForImages = API_BASE_URL.replace('/api', '');

    let imageUrlToDisplay;
    if (article.imageUrl && article.imageUrl.startsWith('/uploads/')) {
        imageUrlToDisplay = `${baseUrlForImages}${article.imageUrl}`;
    } else if (article.imageUrl && article.imageUrl.startsWith('/images/')) {
        imageUrlToDisplay = `${baseUrlForImages}${article.imageUrl}`;
    }
    else if (article.imageUrl) {
        imageUrlToDisplay = article.imageUrl;
    }
    else {
        imageUrlToDisplay = `${baseUrlForImages}/images/default-article.png`;
    }

    card.innerHTML = `
        <img src="${imageUrlToDisplay}" alt="${article.title}">
        <div class="article-card-content">
            <h3>${article.title}</h3>
            <p>${shortDescription}</p>
            <span class="read-more">Читати далі &rarr;</span>
        </div>
    `;

    return card;
}

async function uploadImage(file) {
    if (!file) return null;

    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch(`${API_BASE_URL}/api/upload-image`, {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            return data.imageUrl;
        } else {
            console.error('Помилка завантаження зображення:', data.message || 'Невідома помилка');
            throw new Error(data.message || 'Не вдалося завантажити зображення');
        }
    } catch (error) {
        console.error('Помилка мережі при завантаженні зображення:', error);
        throw error;
    }
}

async function loadPopularAndRecentArticles() {
    console.log('Завантаження популярних та останніх статей...');

    elements.popularArticlesContainer.innerHTML = '<p>Завантаження популярних статей...</p>';
    elements.recentArticlesContainer.innerHTML = '<p>Завантаження останніх статей...</p>';

    try {
        const [popularResponse, recentResponse] = await Promise.all([
            fetch(`${API_BASE_URL}/api/articles/popular`),
            fetch(`${API_BASE_URL}/api/articles/recent`)
        ]);

        const [popularData, recentData] = await Promise.all([
            popularResponse.json(),
            recentResponse.json()
        ]);

        elements.popularArticlesContainer.innerHTML = '';
        if (popularResponse.ok && popularData.length > 0) {
            popularData.forEach(article => {
                const card = createArticleCard(article);
                elements.popularArticlesContainer.appendChild(card);
            });
        } else {
            elements.popularArticlesContainer.innerHTML = '<p>Наразі немає популярних статей.</p>';
        }

        if (!sliderStates['popularArticlesContainer']) {
             initializeSlider('popularArticlesContainer');
        } else {
             updateSliderView('popularArticlesContainer');
        }

        elements.recentArticlesContainer.innerHTML = ''; 
        if (recentResponse.ok && recentData.length > 0) {
            recentData.forEach(article => {
                const card = createArticleCard(article);
                elements.recentArticlesContainer.appendChild(card);
            });
        } else {
            elements.recentArticlesContainer.innerHTML = '<p>Наразі немає останніх статей.</p>';
        }
        if (!sliderStates['recentArticlesContainer']) {
            initializeSlider('recentArticlesContainer');
        } else {
            updateSliderView('recentArticlesContainer');
        }

    } catch (error) {
        console.error('Помилка завантаження статей:', error);
        elements.popularArticlesContainer.innerHTML = '<p class="message error">Не вдалося завантажити популярні статті. Спробуйте пізніше.</p>';
        elements.recentArticlesContainer.innerHTML = '<p class="message error">Не вдалося завантажити останні статті. Спробуйте пізніше.</p>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadPopularAndRecentArticles();
});

async function loadFullArticle(articleId) {
    console.log(`Завантаження повної статті з ID: ${articleId}`);
    showSection(elements.fullArticleSection); 
    elements.fullArticleMessage.style.display = 'none'; 
    elements.fullArticleContent.innerHTML = 'Завантаження статті...'; 
    elements.articleActions.style.display = 'none';

    const token = getAuthToken();
    const user = getUserData();

    try {
        const response = await fetch(`${API_BASE_URL}/api/articles/${articleId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }) 
            }
        });

        const data = await response.json();

        if (response.ok) {
            const article = data;
            const baseUrlForImages = API_BASE_URL.replace('/api', '');

            let imageUrlToDisplay;
            if (article.imageUrl && article.imageUrl.startsWith('/uploads/')) {
                imageUrlToDisplay = `${baseUrlForImages}${article.imageUrl}`;
            } else if (article.imageUrl && article.imageUrl.startsWith('/images/')) {
                imageUrlToDisplay = `${baseUrlForImages}${article.imageUrl}`;
            } else if (article.imageUrl) {
                imageUrlToDisplay = article.imageUrl;
            } else {
                imageUrlToDisplay = `${baseUrlForImages}/images/default-article.png`;
            }

            elements.fullArticleTitle.textContent = article.title;
            elements.fullArticleImage.src = imageUrlToDisplay;
            elements.fullArticleImage.alt = article.title;
            elements.fullArticleImage.style.display = 'block';

            elements.fullArticleAuthor.textContent = `Автор: ${article.author ? article.author.email : 'Невідомий'}`;
            elements.fullArticleViews.textContent = `Перегляди: ${article.views || 0}`;
            elements.fullArticleDate.textContent = `Опубліковано: ${new Date(article.createdAt).toLocaleDateString('uk-UA')}`;
            elements.fullArticleContent.textContent = article.fullContent;

            elements.editArticleBtn.dataset.articleId = article._id;
            elements.deleteArticleBtn.dataset.articleId = article._id;

            if (user && (user.role === 'admin' || (article.author && user._id === article.author._id))) {
                elements.articleActions.style.display = 'block';
                elements.editArticleBtn.style.display = 'inline-block';
                elements.deleteArticleBtn.style.display = 'inline-block';
            } else {
                elements.articleActions.style.display = 'none';
            }

        } else {
            showMessage(elements.fullArticleMessage, data.message || 'Помилка завантаження статті.', 'error');
            elements.fullArticleContent.innerHTML = '';
        }

    } catch (error) {
        console.error('Помилка отримання повної статті:', error);
        showMessage(elements.fullArticleMessage, 'Помилка мережі при завантаженні статті.', 'error');
        elements.fullArticleContent.innerHTML = '';
    }
}

async function loadArticleForEdit(articleId) {
    console.log(`Завантаження статті для редагування: ${articleId}`);
    showSection(elements.editArticleSection);
    elements.editArticleMessage.style.display = 'none';

    const token = getAuthToken();
    if (!token) {
        showMessage(elements.editArticleMessage, 'Для редагування статті необхідно увійти.', 'error');
        showSection(elements.authSection);
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/articles/${articleId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            elements.editArticleId.value = data._id;
            elements.editArticleTitle.value = data.title;
            elements.editArticleShortDescription.value = data.shortDescription;
            elements.editArticleFullContent.value = data.fullContent;

            elements.editArticleImageUrlHidden.value = data.imageUrl || '';

            const baseUrlForImages = API_BASE_URL.replace('/api', '');

            let imageUrlToDisplayForPreview;
            if (data.imageUrl && data.imageUrl.startsWith('/uploads/')) {
                imageUrlToDisplayForPreview = `${baseUrlForImages}${data.imageUrl}`;
                elements.currentArticleImageDisplay.textContent = data.imageUrl; 
                elements.editArticleCurrentImagePreview.style.display = 'block';
            } else if (data.imageUrl && data.imageUrl.startsWith('/images/')) {
                imageUrlToDisplayForPreview = `${baseUrlForImages}${data.imageUrl}`;
                elements.currentArticleImageDisplay.textContent = 'Використовується зображення за замовчуванням.';
                elements.editArticleCurrentImagePreview.style.display = 'block';
            } else if (data.imageUrl) {
                imageUrlToDisplayForPreview = data.imageUrl;
                elements.currentArticleImageDisplay.textContent = data.imageUrl;
                elements.editArticleCurrentImagePreview.style.display = 'block';
            } else {
                imageUrlToDisplayForPreview = '';
                elements.currentArticleImageDisplay.textContent = 'Немає зображення.';
                elements.editArticleCurrentImagePreview.style.display = 'none';
            }

            elements.editArticleCurrentImagePreview.src = imageUrlToDisplayForPreview;
            elements.editArticleImageUpload.value = '';

        } else if (response.status === 401 || response.status === 403) {
            logoutUser();
            showMessage(elements.editArticleMessage, data.message || 'Сесія завершена, будь ла ласка, увійдіть знову.', 'error');
        } else {
            showMessage(elements.editArticleMessage, data.message || 'Помилка завантаження статті для редагування.', 'error');
            showSection(elements.homeSection);
        }
    } catch (error) {
        console.error('Помилка завантаження статті для редагування:', error);
        showMessage(elements.editArticleMessage, 'Помилка мережі при завантаженні статті для редагування.', 'error');
        showSection(elements.homeSection);
    }
}

async function deleteArticle(articleId) {
    console.log(`Видалення статті: ${articleId}`);
    const token = getAuthToken();
    if (!token) {
        showMessage(elements.fullArticleMessage, 'Для видалення статті необхідно увійти.', 'error');
        showSection(elements.authSection);
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/api/articles/${articleId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (response.ok) {
            showMessage(elements.fullArticleMessage, 'Стаття успішно видалена.', 'success');
            showSection(elements.homeSection);
            loadPopularAndRecentArticles();
        } else if (response.status === 401 || response.status === 403) {
            logoutUser();
            showMessage(elements.fullArticleMessage, data.message || 'Недостатньо прав або сесія завершена.', 'error');
        } else {
            showMessage(elements.fullArticleMessage, data.message || 'Помилка видалення статті.', 'error');
        }
    } catch (error) {
        console.error('Помилка видалення статті:', error);
        showMessage(elements.fullArticleMessage, 'Помилка мережі при видаленні статті.', 'error');
    }
}

function setupSlider(container) {
    const parentSlider = container.closest('.articles-slider');
    if (!parentSlider) return;

    const leftArrow = parentSlider.querySelector('.slider-arrow.left');
    const rightArrow = parentSlider.querySelector('.slider-arrow.right');

    if (leftArrow) {
        leftArrow.onclick = () => {
            container.scrollBy({
                left: -container.offsetWidth,
                behavior: 'smooth'
            });
        };
    }
    if (rightArrow) {
        rightArrow.onclick = () => {
            container.scrollBy({
                left: container.offsetWidth,
                behavior: 'smooth'
            });
        };
    }
}

async function updateProfileData(e) {
    e.preventDefault();

    const token = getAuthToken();
    if (!token) {
        showMessage(elements.profileMessage, 'Необхідно увійти для оновлення профілю.', 'error');
        showSection(elements.authSection);
        return;
    }

    const name = elements.updateName.value;
    const gender = elements.updateGender.value;
    const dateOfBirth = elements.updateDateOfBirth.value;
    const avatar = elements.updateAvatarUrl.value;

    

    try {
        const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, gender, dateOfBirth, avatar })
        });

        const data = await response.json();

        if (response.ok) {
            showMessage(elements.profileMessage, 'Профіль успішно оновлено!', 'success');
            const currentUserData = getUserData();
            localStorage.setItem('user', JSON.stringify({
                ...currentUserData,
                name: data.name,
                gender: data.gender,
                dateOfBirth: data.dateOfBirth,
                avatar: data.avatar
            }));
            updateAuthUI();
            loadProfileData();
            toggleProfileEditMode(false);
        } else if (response.status === 401 || response.status === 403) {
            logoutUser();
            showMessage(elements.profileMessage, data.message || 'Сесія завершена, будь ласка, увійдіть знову.', 'error');
        } else {
            showMessage(elements.profileMessage, data.message || 'Помилка оновлення профілю.', 'error');
        }
    } catch (error) {
        console.error('Помилка оновлення профілю:', error);
        showMessage(elements.profileMessage, 'Помилка мережі при оновленні профілю.', 'error');
    }
}
function toggleProfileEditMode(isEditing) {
    if (isEditing) {
        elements.profileDisplay.classList.add('hidden');
        elements.updateProfileForm.classList.remove('hidden');
    } else {
        elements.profileDisplay.classList.remove('hidden');
        elements.updateProfileForm.classList.add('hidden');
    }
}

async function loadProfileData() {
    console.log('Завантаження даних профілю...');
    const user = getUserData();
    if (user) {
 
        console.log(user)
        elements.profileAvatar.src= user.avatar;
        elements.profileEmail.textContent = user.email;
        elements.profileRole.textContent = user.role;
        elements.profileNameDisplay.textContent = user.name || 'Не вказано';
        elements.profileGenderDisplay.textContent = user.gender || 'Не вказано';
        elements.profileDateOfBirthDisplay.textContent = user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('uk-UA') : 'Не вказано';
        elements.profileCreatedAt.textContent = user.createdAt ? new Date(user.createdAt).toLocaleDateString('uk-UA') : 'Недоступно';

        elements.updateEmail.value = user.email;
        elements.updateName.value = user.name || '';
        elements.updateGender.value = user.gender || 'prefer not to say';
        if (user.dateOfBirth) {
            const dob = new Date(user.dateOfBirth);
            elements.updateDateOfBirth.value = dob.toISOString().split('T')[0];
        } else {
            elements.updateDateOfBirth.value = '';
        }
        elements.updateAvatarUrl.value = user.avatar || ''; 

        const token = getAuthToken();
        if (token) {
            try {
                const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('user', JSON.stringify({
                        ...user,
                        _id: data._id,
                        email: data.email,
                        role: data.role,
                        name: data.name,
                        gender: data.gender,
                        dateOfBirth: data.dateOfBirth,
                        avatar: data.avatar || './images/default-avatar.png',
                        createdAt: data.createdAt
                    }));
                    updateAuthUI();
                    
                    elements.profileAvatar.src = data.avatar || './images/default-avatar.png';
                    elements.profileEmail.textContent = data.email;
                    elements.profileRole.textContent = data.role;
                    elements.profileNameDisplay.textContent = data.name || 'Не вказано';
                    elements.profileGenderDisplay.textContent = data.gender || 'Не вказано';
                    elements.profileDateOfBirthDisplay.textContent = data.dateOfBirth ? new Date(data.dateOfBirth).toLocaleDateString('uk-UA') : 'Не вказано';
                    elements.profileCreatedAt.textContent = data.createdAt ? new Date(data.createdAt).toLocaleDateString('uk-UA') : 'Недоступно';

                    elements.updateName.value = data.name || '';
                    elements.updateGender.value = data.gender || 'prefer not to say';
                    if (data.dateOfBirth) {
                        const dob = new Date(data.dateOfBirth);
                        elements.updateDateOfBirth.value = dob.toISOString().split('T')[0];
                    } else {
                        elements.updateDateOfBirth.value = '';
                    }
                    elements.updateAvatarUrl.value = data.avatar || '';

                } else if (response.status === 401 || response.status === 403) {
                    logoutUser();
                    showMessage(elements.profileMessage, data.message || 'Сесія завершена, будь ласка, увійдіть знову.', 'error');
                } else {
                    showMessage(elements.profileMessage, data.message || 'Помилка завантаження даних профілю.', 'error');
                }
            } catch (error) {
                console.error('Помилка отримання даних профілю:', error);
                showMessage(elements.profileMessage, 'Помилка мережі при завантаженні профілю.', 'error');
            }
        }
    } else {
        showMessage(elements.profileMessage, 'Необхідно увійти для перегляду профілю.', 'error');
        showSection(elements.authSection);
    }
}

async function registerUser(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            showMessage(elements.authMessage, 'Реєстрація успішна! Тепер ви можете увійти.', 'success');
            elements.loginFormContainer.style.display = 'block';
            elements.registerFormContainer.style.display = 'none';
            elements.loginEmail.value = email;
        } else {
            showMessage(elements.authMessage, data.message || 'Помилка реєстрації', 'error');
        }
    } catch (error) {
        console.error('Помилка реєстрації:', error);
        showMessage(elements.authMessage, 'Помилка мережі або сервера.', 'error');
    }
}

async function loginUser(email, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify({
                _id: data.user._id,
                email: data.user.email,
                role: data.user.role,
                name: data.user.name,
                gender: data.user.gender,
                dateOfBirth: data.user.dateOfBirth,
                avatar: data.user.avatar
            }));
            showMessage(elements.authMessage, 'Вхід успішний! Перенаправляємо...', 'success');
            updateAuthUI(); 
            showSection(elements.homeSection); 
            loadPopularAndRecentArticles(); 

        } else {
            showMessage(elements.authMessage, data.message || 'Помилка входу', 'error');
        }
    } catch (error) {
        console.error('Помилка входу:', error);
        showMessage(elements.authMessage, 'Помилка мережі або сервера.', 'error');
    }
}



function logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    updateAuthUI(); 
    showSection(elements.homeSection); 
    showMessage(elements.authMessage, 'Ви успішно вийшли з системи.', 'success');
    loadPopularAndRecentArticles(); 
}

elements.editProfileBtn.addEventListener('click', () => toggleProfileEditMode(true));
elements.cancelUpdateBtn.addEventListener('click', () => {
    loadProfileData(); 
    toggleProfileEditMode(false);
});

elements.registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = elements.registerEmail.value;
    const password = elements.registerPassword.value;
    await registerUser(email, password);
});

elements.loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = elements.loginEmail.value;
    const password = elements.loginPassword.value;
    await loginUser(email, password);
});

elements.dropdownLogoutBtn.addEventListener('click', () => {
    logoutUser();
});

elements.homeSection.addEventListener('click', (e) => {

    const articleCard = e.target.closest('.article-card');
    if (articleCard) {
        e.preventDefault();
        const articleId = articleCard.dataset.articleId;
        if (articleId) {
            loadFullArticle(articleId); 
        }
    }
});

elements.editArticleForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = getAuthToken();
    if (!token) {
        showMessage(elements.editArticleMessage, 'Для редагування статті необхідно увійти.', 'error');
        showSection(elements.authSection);
        return;
    }

    const articleId = elements.editArticleId.value;
    const title = elements.editArticleTitle.value;
    const shortDescription = elements.editArticleShortDescription.value;
    const fullContent = elements.editArticleFullContent.value;

    let imageUrl = elements.editArticleImageUrlHidden.value; 
    const imageFile = elements.editArticleImageUpload.files[0]; 

    if (imageFile) {
        try {

            imageUrl = await uploadImage(imageFile);
            elements.editArticleImageUrlHidden.value = imageUrl; 
        } catch (error) {
            showMessage(elements.editArticleMessage, 'Помилка завантаження нового зображення. Спробуйте ще раз.', 'error');
            return; 
        }
    }
    try {
        const response = await fetch(`${API_BASE_URL}/api/articles/${articleId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, shortDescription, fullContent, imageUrl })
        });

        const data = await response.json();

        if (response.ok) {
            showMessage(elements.editArticleMessage, 'Стаття успішно оновлена!', 'success');
            showSection(elements.fullArticleSection);
            loadFullArticle(articleId); 
        } else if (response.status === 401 || response.status === 403) {
            logoutUser();
            showMessage(elements.editArticleMessage, data.message || 'Недостатньо прав або сесія завершена.', 'error');
        } else {
            showMessage(elements.editArticleMessage, data.message || 'Помилка оновлення статті.', 'error');
        }
    } catch (error) {
        console.error('Помилка оновлення статті:', error);
        showMessage(elements.editArticleMessage, 'Помилка мережі при оновленні статті.', 'error');
    }
});

elements.cancelEditBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const articleId = elements.editArticleId.value; 
    if (articleId) {
        loadFullArticle(articleId); 
    } else {
        showSection(elements.homeSection); 
    }
});

elements.addArticleForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = getAuthToken();
    if (!token) {
        showMessage(elements.addArticleMessage, 'Для додавання статті необхідно увійти.', 'error');
        showSection(elements.authSection);
        return;
    }

    const title = elements.articleTitle.value;
    const shortDescription = elements.articleShortDescription.value;
    const fullContent = elements.articleFullContent.value;

    let imageUrl = ''; 
    const imageFile = elements.articleImageUpload.files[0]; 

    if (imageFile) {
        try {
            imageUrl = await uploadImage(imageFile);
            elements.articleImageUrlHidden.value = imageUrl;
        } catch (error) {
            showMessage(elements.addArticleMessage, 'Помилка завантаження зображення. Стаття не буде додана.', 'error');
            return; 
        }
    } else {
        
    }


    try {
        const response = await fetch(`${API_BASE_URL}/api/articles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, shortDescription, fullContent, imageUrl })
        });

        const data = await response.json();

        if (response.ok) {
            showMessage(elements.addArticleMessage, 'Стаття успішно додана!', 'success');
            elements.addArticleForm.reset();
            elements.articleImageUrlHidden.value = '';
            showSection(elements.homeSection);
            loadPopularAndRecentArticles();
        } else if (response.status === 401 || response.status === 403) {
            logoutUser();
            showMessage(elements.addArticleMessage, data.message || 'Недостатньо прав або сесія завершена.', 'error');
        } else {
            showMessage(elements.addArticleMessage, data.message || 'Помилка додавання статті.', 'error');
        }
    } catch (error) {
        console.error('Помилка додавання статті:', error);
        showMessage(elements.addArticleMessage, 'Помилка мережі при додаванні статті.', 'error');
    }
});

elements.editArticleBtn.addEventListener('click', (e) => {
    const articleId = e.target.dataset.articleId;
    if (articleId) {
        loadArticleForEdit(articleId);
    }
});

elements.deleteArticleBtn.addEventListener('click', (e) => {
    const articleId = e.target.dataset.articleId;
    if (articleId && confirm('Ви впевнені, що хочете видалити цю статтю?')) {
        deleteArticle(articleId);
    }
});
