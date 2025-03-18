import{a as c,S as u,i as s}from"./assets/vendor-CYg6pwNI.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();const f="49266209-5c1ed6293a40b594db6a6f47f",p="https://pixabay.com/api/";async function d(r){try{return(await c.get(p,{params:{key:f,q:r,image_type:"photo",orientation:"horizontal",safesearch:"true"}})).data.hits}catch(e){throw console.error("Помилка отримання зображень:",e.message),e}}let y=new u(".gallery a",{captionsData:"alt",captionDelay:250,animationSlide:!0});function m(r){return r.map(e=>`
        <li class="gallery-item">
            <a href="${e.largeImageURL}">
                <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy"/>
            </a>
            <div class="info">
                <p><b>Likes:</b> ${e.likes}</p>
                <p><b>Views:</b> ${e.views}</p>
                <p><b>Comments:</b> ${e.comments}</p>
                <p><b>Downloads:</b> ${e.downloads}</p>
            </div>
        </li>
    `).join("")}function g(r){const e=document.querySelector(".gallery");if(!e){console.error("Gallery element not found!");return}if(r.length===0){s.warning({title:"❌",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}e.innerHTML=m(r),y.refresh()}function h(){const r=document.querySelector(".gallery");if(!r){console.error("Gallery element not found!");return}r.innerHTML=""}const b=document.querySelector(".form"),L=document.querySelector(".form-input"),l=document.querySelector(".loader");b.addEventListener("submit",async r=>{r.preventDefault();const e=L.value.trim();if(!e){s.error({title:"Error",message:"Enter a search query",position:"topRight"});return}h(),l.style.display="block";try{const n=await d(e);if(!n||n.length===0){s.warning({title:"No Results",message:"No images found",position:"topRight"});return}g(n)}catch{s.error({title:"Error",message:"Failed to fetch images. Try again.",position:"topRight"})}finally{setTimeout(()=>{l.style.display="none"},500)}});
//# sourceMappingURL=index.js.map
