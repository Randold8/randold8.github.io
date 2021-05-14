let page = document.querySelector('.page');
let themeButton = document.querySelector('.theme-button');
let content = document.querySelector('.about-content');
themeButton.onclick = function() {
	page.classList.toggle('dark-theme');
}
