const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#navbar__logo');

// Display Mobile Menu
const mobileMenu = () => {
  menu.classList.toggle('is-active')
  menuLinks.classList.toggle('active')
}

menu.addEventListener('click', mobileMenu);

// YouTube API for video cards
const api_url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyAdDnWx6tZT9Pfq7GqiDLR_5oTLv0xC3w4&channelId=UCp2YSmdYn8afwFrJvZjiIQA&part=snippet,id&order=date&maxResults=20'
async function getVideo(){
  const response = await fetch(api_url);
  const data = await response.json();
  let videoId;
  let video = 'video';
  let title;
  let j=0;
  while(j<4){
    for(let i=0;i<20;i++){
      videoId = data.items[i].id['videoId'];
      title = data.items[i].snippet['title'];
      if(videoId!=null){  
        document.getElementById(video+j.toString()).src = "https://www.youtube.com/embed/" + videoId;
        document.getElementById('title'+j.toString()).innerHTML = title;
        document.getElementById('link'+j.toString()).href = "https://youtu.be/"+videoId;
        j+=1;
      } 
    }
  }

}

getVideo();

// Till here YouTube video card


//Show active menu when scrolling
const highlightMenu = () => {
  const elem = document.querySelector('.highlight');
  const homeMenu = document.querySelector('#home-page');
  const aboutMenu = document.querySelector('#about-page');
  const videosMenu = document.querySelector('#videos-page');

  let scrollPosition = window.scrollY;

  //adds 'highlight' class to menu items
  if(window.innerWidth > 960 && scrollPosition < 600){
    homeMenu.classList.add('highlight')
    aboutMenu.classList.remove('highlight')
    return
  } else if(window.innerWidth > 960 && scrollPosition < 1400) {
    aboutMenu.classList.add('highlight')
    homeMenu.classList.remove('highlight')
    videosMenu.classList.remove('highlight')
    return
  } else if (window.innerWidth > 960 && scrollPosition < 2345){
    videosMenu.classList.add('highlight')
    aboutMenu.classList.remove('highlight')
    return
  }

  if((elem && window.innerWidth < 960 && scrollPosition < 600) || elem){
    elem.classList.remove('highlight')
  }
};

window.addEventListener('scroll', highlightMenu)
window.addEventListener('click', highlightMenu)

//Close navbar when clicked
const hideMobileMenu = () => {
  const menuBars = document.querySelector('.is-active')
  if(window.innerWidth <= 768 && menuBars) {
    menu.classList.toggle('is-active')
    menuLinks.classList.remove('active')
  }
}

menuLinks.addEventListener('click', hideMobileMenu)
navLogo.addEventListener('click', hideMobileMenu)