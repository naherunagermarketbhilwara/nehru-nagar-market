const WA_NUMBER="919714116777";
const grid=document.getElementById("productGrid");
const search=document.getElementById("search");
const count=document.getElementById("productCount");
let category="सभी";
function render(){
 const q=search.value.trim().toLowerCase();
 const items=(window.STORE_PRODUCTS||[]).filter(p=>(category==="सभी"||p.category===category)&&(`${p.name} ${p.category}`.toLowerCase().includes(q)));
 count.textContent=`${items.length} प्रोडक्ट`;
 grid.innerHTML="";
 if(!items.length){grid.innerHTML='<div class="empty">अभी इस कैटेगरी में सामान नहीं है।</div>';return;}
 items.forEach(p=>{
  const card=document.createElement("article");card.className="product";
  const art=document.createElement("div");art.className="product-art";
  if(p.image){const img=document.createElement("img");img.src=p.image;img.alt=p.name;art.appendChild(img)}else{art.textContent=p.emoji||"🛍️"}
  const info=document.createElement("div");info.className="product-info";
  const cat=document.createElement("div");cat.className="category";cat.textContent=p.category;
  const name=document.createElement("h3");name.textContent=p.name;
  const price=document.createElement("p");price.className="price";price.textContent=p.price?`₹ ${p.price}`:"कीमत के लिए WhatsApp करें";
  const btn=document.createElement("button");btn.className="order-btn";btn.textContent="WhatsApp पर ऑर्डर करें";
  btn.addEventListener("click",()=>{const msg=`नमस्ते Nehru Nagar Market! मुझे यह प्रोडक्ट चाहिए:\\n${p.name}\\nकैटेगरी: ${p.category}\\nकीमत: ${p.price?("₹ "+p.price):"कृपया कीमत बताएं"}\\nकृपया उपलब्धता बताएं।`;window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`,"_blank","noopener");});
  info.append(cat,name,price,btn);card.append(art,info);grid.appendChild(card);
 });
}
document.getElementById("filters").addEventListener("click",e=>{const b=e.target.closest("button[data-category]");if(!b)return;category=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));render();});
search.addEventListener("input",render);document.getElementById("year").textContent=new Date().getFullYear();render();
let deferredPrompt;const installBtn=document.getElementById("installBtn");
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;installBtn.hidden=false;});
installBtn.addEventListener("click",async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;installBtn.hidden=true;});
if("serviceWorker" in navigator && location.protocol!=="file:"){window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));}
