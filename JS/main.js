class Bookmark{
    name="";
    url="";
    constructor(name, url){
        this.name=name;
        this.url=url;
    }
}

var bookmarks=[];

function getBookmarks() {
    bookmarks=localStorage.getItem('bookmarks');
    if(bookmarks===null)
        bookmarks=[];
    else{
        bookmarks=JSON.parse(bookmarks);
    }
    
}




document.addEventListener('DOMContentLoaded',displayBookmarks())

function displayBookmarks() {
    let display=document.querySelector("#bookmarks1");
    getBookmarks();



    let output="";

    bookmarks.forEach((bookmark)=>{
        output+=`
            <ul class="list-group mt-3 c2">
                <li class="list-group-item lgi"><h3>${bookmark.name}</h3></li>
                <li class="d-inline-block">
                <button class="btn btn-sm btn-success mr-3"><a href="${bookmark.url}"  style="color:white; text-decoration:none;">VISIT</a></button>
                <button class="btn btn-sm btn-danger " style="color:white; text-decoration:none;" id="delete" >DELETE</button> 
                </li>
            </ul>
        `
    })
    display.innerHTML=output;

    
    
}

function showAllert(str) {

    let show=document.querySelector('#show')
    console.log(show)
    show.innerHTML=`${str}`;
    show.style="visibility:visible;"
    setTimeout(()=>{
        show.style="visibility:hidden; height:0px;";
    },1000)
    
}

function addtoBookmark(website, url) {
    if(website=="" || url==""){
        showAllert("Enter the fields!")
        return;
    }
        

    if(url.indexOf("https://")!=0){
        showAllert("Enter a valid website!")
        return;
    }
        



    bookmarks.push(new Bookmark(website,url));
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
}
document.getElementById('button1').addEventListener('click',(e)=>{

    let website=document.querySelector('#websiteName').value;
    let url=document.getElementById('websiteUrl').value;
    addtoBookmark(website,url);
    displayBookmarks();
})

document.querySelector('#bookmarks1').addEventListener('click',(e)=>{
    if(e.target.textContent==="DELETE"){
        let site_name=e.target.parentElement.parentElement.children[0].textContent;
        bookmarks.forEach((item,index)=>{
            if(site_name===item.name){
                bookmarks.splice(index,1);
            
                localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
            }
        })
        
    }
        
    displayBookmarks();



    
        
})