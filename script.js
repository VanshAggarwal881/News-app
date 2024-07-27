const apikey = 'your api key here';
const url = 'https://newsapi.org/v2/everything?q=';
const logo = document.getElementById('logo');

window.addEventListener('load', () => {
    // Calling fetch function to fetch news data
    fetchnews('India');
});

logo.addEventListener('click', () => {
    reloadit();
});

function reloadit() {
    window.location.reload();
}

async function fetchnews(query) {
    try {
        const response = await fetch(`${url}${query}&apiKey=${apikey}`);
        
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        binddata(data.articles); // data.articles is the main source of news in the API, so passing data.articles
    } catch (error) {
        console.error('Fetch operation failed:', error);
    }
}

function binddata(articles) {
    const cc = document.getElementById('cards-container');
    const cardt = document.getElementById('template-card');
    cc.innerHTML = ""; // Necessary to clear existing news cards

    articles.forEach(e => {
        if (!e.urlToImage) return; // If the image is not present with the news, no need to show it
        const clone = cardt.content.cloneNode(true); // Deep cloning
        filldata(clone, e);
        cc.appendChild(clone);
    });
}

function filldata(clone, e) {
    const newsimg = clone.querySelector('#news-img');
    const newstitle = clone.querySelector('#news-title');
    const newssource = clone.querySelector('#news-source');
    const newsdesc = clone.querySelector('#news-desc');

    newsimg.src = e.urlToImage;
    newstitle.innerHTML = e.title;
    newsdesc.innerHTML = e.description;

    const date = new Date(e.publishedAt).toLocaleDateString();
    newssource.innerHTML = `${e.source.name} | ${date}`;
    
    clone.firstElementChild.addEventListener('click', () => {
        window.open(e.url, '_blank');
    });
}

let currnav = null;

function navnews(id) {
    fetchnews(id);
    const navitem = document.getElementById(id);
    currnav?.classList.remove('active');
    currnav = navitem;
    currnav.classList.add('active');
}

const searchbtn = document.getElementById('search-btn');
const textip = document.getElementById('textip');

searchbtn.addEventListener('click', () => {
    const query = textip.value;
    if (!query) return;
    fetchnews(query);
    currnav?.classList.remove('active');
    currnav = null;
});
