const apikey = 'd64870a60afe42e1a07304e5412976fc'
const url = 'https://newsapi.org/v2/everything?q='
const logo = document.getElementById('logo')


window.addEventListener('load' , ()=>{
    // calling fetch function to fetch news data
    fetchnews('India')
});

logo.addEventListener('click',()=>{
    reloadit();
})
function reloadit(){
    window.location.reload();
}



async function fetchnews(query){
    const response = await fetch(`${url}${query}&apiKey=${apikey}`)
    // console.log(response);
    const data = await response.json()
    // console.log(data);
    
    binddata(data.articles)
    // data.articles is the main source of news in the api so passing data.articles

}

function binddata(articles){
    const cc = document.getElementById('cards-container')
    const cardt = document.getElementById('template-card')
    // console.log(cardt.content);
     cc.innerHTML = "" // neessary as if already some news card exists then the new ones will be added with the existing ones.

     articles.forEach(e => {
        if(!e.urlToImage) return; // if the img is not present with the news no need to show it.
        const clone = cardt.content.cloneNode(true);
        // it means that we want to do deep cloning no just the outer layer or div as we card div in our case.....

        filldata(clone , e)
        cc.appendChild(clone)
     });
}

function filldata(clone , e){
    const newsimg = clone.querySelector('#news-img')
    const newstitle = clone.querySelector('#news-title')
    const newssource = clone.querySelector('#news-source')
    const newsdesc = clone.querySelector('#news-desc')

    newsimg.src = e.urlToImage;
    newstitle.innerHTML = e.title;
    newsdesc.innerHTML = e.description

    // console.log(newstitle.innerHTM , 'and' , newstitle.innerHTM);
    const date = new Date(e.publishedAt).toLocaleDateString()
    // console.log(date);
    newssource.innerHTML = `${e.source.name} | ${date}`
    clone.firstElementChild.addEventListener('click' , ()=>{
        window.open(e.url , '_blank');
        
    })
}
let currnav = null
function navnews(id){
    fetchnews(id);
    const navitem = document.getElementById(id)
    currnav?.classList.remove('active')
    currnav = navitem
    currnav.classList.add('active')
}
const searchbtn = document.getElementById('search-btn')
const textip = document.getElementById('textip')
searchbtn.addEventListener('click' , ()=>{
    const query = textip.value
    if(!query) return;
    fetchnews(query);
    currnav?.classList.remove('active')
    currnav = null
})