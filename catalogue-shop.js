/* Oringo catalogue: source image approval is required before publication */
(function () {
"use strict";
var NUMBER="447534116006",DATA="catalogue/stock-confirmed-2026-10-24.json";
var cats=["Hot Drinks & Milk Powders","Grains, Cereals & Food Staples","Spices & Seasonings","Traditional Cooking Ingredients","Non-Alcoholic Beverages","Personal Care & Toiletries","Kitchenware & Utensils","Candy"];
var aliases={beverages:cats[0],grains:cats[1],spices:cats[2],oils:cats[3],dried:cats[3],bodycare:cats[5],drinks:cats[4],accessories:cats[6]};
var state={products:[],search:"",category:"All",sort:"name",basket:new Map(),buyer:"Retail"};
var STORE_KEY="oringo-draft-enquiry-v1";
function saveEnquiry(){
 try{sessionStorage.setItem(STORE_KEY,JSON.stringify([...state.basket]));}catch(error){}
}
function restoreEnquiry(){
 try{
  var raw=JSON.parse(sessionStorage.getItem(STORE_KEY)||"[]");
  if(!Array.isArray(raw))return;
  raw.forEach(function(entry){
   if(!Array.isArray(entry)||entry.length!==2)return;
   var sku=String(entry[0]),qty=Number(entry[1]);
   if(state.products.some(function(p){return p.sku===sku})&&Number.isInteger(qty)&&qty>0&&qty<=100)state.basket.set(sku,qty);
  });
 }catch(error){}
}
var categoryIcons={
 "Hot Drinks & Milk Powders":"fa-mug-hot","Grains, Cereals & Food Staples":"fa-wheat-awn",
 "Spices & Seasonings":"fa-pepper-hot","Traditional Cooking Ingredients":"fa-seedling",
 "Non-Alcoholic Beverages":"fa-glass-water","Personal Care & Toiletries":"fa-pump-soap",
 "Kitchenware & Utensils":"fa-utensils","Candy":"fa-candy-cane"
};
var el=function(id){return document.getElementById(id)};
var enc=function(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})};
var clean=function(s){return String(s)
 .replace(/\s+—\s+(package reference|carton reference|paired product photo|product family photo|packaging photo|pack reference)$/i,"")
 .replace(/\s+—\s+Oringo photo(\s+\(size pending\))?$/i,"")
 .replace(/\s+—\s+900g (package )?reference$/i," — 900g")
 .replace(/\s+—\s+.*example\s+\(.*?\)$/i,"")
 .trim()};
var wa=function(message){return "https://wa.me/"+NUMBER+"?text="+encodeURIComponent(message)};
var matches=function(p){return(state.category==="All"||p.category===state.category)&&[p.name,p.sku,p.category].join(" ").toLowerCase().includes(state.search)};
function renderCards(){
 var list=state.products.filter(matches);
 list.sort(function(a,b){return state.sort==="category"?(a.category.localeCompare(b.category)||clean(a.name).localeCompare(clean(b.name))):clean(a.name).localeCompare(clean(b.name))});
 el("shop-results").textContent=list.length+" products shown · "+state.products.length+" in stock";
 var frag=document.createDocumentFragment();
 list.forEach(function(p){
  var article=document.createElement("article"),name=enc(clean(p.name)),sku=enc(p.sku);
  article.className="oc-product";
  article.dataset.sku=p.sku;
  var reviewPhoto=((p.image_source==="ORINGO_UPLOAD"&&p.photo_status==="OWN_PHOTO_REVIEW") || (p.image_source==="CLIENT_SUPPLIED"&&p.photo_status==="CLIENT_IMAGE_REVIEW")) && p.image_url && /^images\/products\/[a-z0-9-]+\.jpg$/i.test(p.image_url);
  var finalPhoto=(p.photo_approved && p.image_url && p.photo_status==="APPROVED");
  var photo=(reviewPhoto||finalPhoto)?
    '<div class="oc-original-photo"><img loading="lazy" alt="Client supplied photo of '+name+'" src="'+enc(p.image_url)+'">'+
    '<button type="button" class="oc-zoom-trigger" data-zoom="'+sku+'" aria-label="Enlarge photograph of '+name+'"><i class="fas fa-expand" aria-hidden="true"></i></button>'+
    (reviewPhoto?'<span class="oc-photo-review">Product image · Under review</span>':"")+'</div>':
    '<div class="oc-image-pending"><i class="fas '+(categoryIcons[p.category]||"fa-basket-shopping")+'" aria-hidden="true"></i><span>'+enc(p.category)+'</span><small>Photo pending approval</small></div>';
  var msg="Hello Oringo Distributions. Please quote "+clean(p.name)+" ("+p.sku+") and delivery to my UK or European address."+ (p.variant_split_required?" Please confirm the pack/flavour option.":"");
  article.innerHTML='<div class="oc-product-image">'+photo+'</div><div class="oc-card-body">'+
    '<small class="oc-category">'+enc(p.category)+'</small><h3>'+name+'</h3>'+
    '<p class="oc-stock"><i class="fas fa-check-circle"></i> In stock</p><p class="oc-price">Price on request</p>'+(p.variant_split_required?'<p class="oc-variant-warning">Choose pack or flavour with our team</p>':"")+
    '<div class="oc-product-actions"><a class="oc-ask" target="_blank" rel="noopener noreferrer" href="'+wa(msg)+'"><i class="fab fa-whatsapp" aria-hidden="true"></i> Buy Now</a>'+
    '<button type="button" class="oc-add" data-action="add" data-sku="'+sku+'">Add to enquiry basket</button></div></div>';
  frag.appendChild(article);
 });
 el("shop-products").replaceChildren(frag);
 el("shop-empty").hidden=list.length!==0;
 updateBasket();
}
function renderChips(){
 var host=el("shop-category-chips");host.innerHTML="";
 ["All"].concat(cats).forEach(function(c){
  var count=state.products.filter(function(p){return c==="All"||p.category===c}).length;
  if(!count)return;
  var b=document.createElement("button");b.type="button";
  b.className="oc-chip"+(state.category===c?" active":"");
  b.textContent=c+" ("+count+")";b.setAttribute("aria-pressed",state.category===c?"true":"false");
  b.onclick=function(){state.category=c;renderChips();renderCards()};
  host.appendChild(b);
 });
}
function updateBasket(){
 var host=el("shop-basket-items");host.innerHTML="";
 var selected=[...state.basket].map(function(entry){return {p:state.products.find(function(p){return p.sku===entry[0]}),qty:entry[1]}}).filter(function(x){return !!x.p});
 var count=selected.reduce(function(n,x){return n+x.qty},0);
 el("shop-cart-count").textContent=String(count);
 el("shop-mobile-count").textContent=String(count);
 el("shop-mobile-basket").hidden=count===0;
 selected.forEach(function(x){
  var li=document.createElement("li");li.className="oc-basket-line";
  li.innerHTML='<span>'+enc(clean(x.p.name))+'<small>'+enc(x.p.sku)+'</small></span><div class="oc-qty">'+
   '<button type="button" data-action="minus" data-sku="'+enc(x.p.sku)+'" aria-label="Remove one">−</button><strong>'+x.qty+'</strong>'+
   '<button type="button" data-action="plus" data-sku="'+enc(x.p.sku)+'" aria-label="Add one">+</button></div>';
  host.appendChild(li);
 });
 el("shop-cart-empty").hidden=selected.length>0;
 el("shop-basket-send").disabled=!selected.length;
 el("shop-basket-send").textContent="Enquire about "+selected.length+" product"+(selected.length===1?"":"s")+" on WhatsApp";
}
function qty(sku,change){
 var p=state.products.find(function(x){return x.sku===sku});
 if(!p)return;
 var n=Math.max(0,Math.min(100,(state.basket.get(sku)||0)+change));
 if(n===0)state.basket.delete(sku);else state.basket.set(sku,n);
 saveEnquiry();
 updateBasket();
}
function send(){
 var selected=[...state.basket].map(function(entry){return {p:state.products.find(function(p){return p.sku===entry[0]}),qty:entry[1]}}).filter(function(x){return !!x.p});
 if(!selected.length)return;
 var msg="Hello Oringo Distributions. I am enquiring as a "+state.buyer.toLowerCase()+" customer about these in-stock products:\n\n"+
  selected.map(function(x,i){return(i+1)+". "+clean(x.p.name)+" ("+x.p.sku+") — quantity "+x.qty+(x.p.variant_split_required?" (Please confirm the pack/flavour option.)":"")}).join("\n")+
  "\n\nPlease confirm exact pack sizes, total price and delivery cost/time for my location. Thank you.";
 window.open(wa(msg),"_blank","noopener,noreferrer");
}
function init(){
 if(!el("shop-products"))return;
 el("shop-search").addEventListener("input",function(e){state.search=e.target.value.trim().toLowerCase();renderCards()});
 el("shop-quick").addEventListener("click",function(e){var btn=e.target.closest("[data-term]");if(!btn)return;el("shop-search").value=btn.dataset.term;state.search=btn.dataset.term.toLowerCase();state.category="All";renderChips();renderCards();});

 el("shop-sort").addEventListener("change",function(e){state.sort=e.target.value;renderCards()});
 el("shop-buyer").addEventListener("change",function(e){state.buyer=e.target.value});
 el("shop-products").addEventListener("click",function(e){
  var zoom=e.target.closest("[data-zoom]");
  var photo=e.target.closest(".oc-original-photo");
  if(zoom||photo){
   var card=e.target.closest(".oc-product");
   var sku=zoom?zoom.dataset.zoom:card&&card.dataset.sku;
   var p=state.products.find(function(x){return x.sku===sku});
   if(p&&(p.image_source==="ORINGO_UPLOAD"||p.image_source==="CLIENT_SUPPLIED")&&p.image_url&&p.image_url.indexOf("images/products/")===0){
    var dialog=el("shop-photo-dialog");
    el("shop-photo-zoomed").src=p.image_url;
    el("shop-photo-zoomed").alt="Enlarged client product image: "+clean(p.name);
    el("shop-photo-caption").textContent=clean(p.name)+" — supplied photo under review";
    if(typeof dialog.showModal==="function")dialog.showModal();
    else dialog.setAttribute("open","");
   }
   return;
  }
  var b=e.target.closest("[data-action='add']");if(b)qty(b.dataset.sku,1)
 });
 el("shop-basket-items").addEventListener("click",function(e){var b=e.target.closest("[data-action]");if(b)qty(b.dataset.sku,b.dataset.action==="plus"?1:-1)});
 el("shop-basket-send").addEventListener("click",send);
 el("shop-photo-close").addEventListener("click",function(){el("shop-photo-dialog").close()});
 el("shop-photo-dialog").addEventListener("click",function(e){if(e.target===el("shop-photo-dialog"))el("shop-photo-dialog").close()});
 el("shop-mobile-basket").addEventListener("click",function(){
  el("shop-enquiry-panel").scrollIntoView({behavior:"smooth",block:"start"});
  el("shop-enquiry-panel").focus({preventScroll:true});
 });
 fetch(DATA).then(function(r){if(!r.ok)throw new Error("Could not load catalogue");return r.json()}).then(function(d){
  state.products=(d.products||[]).filter(function(p){return p.category!=="Adult Beverages"&&!/\bRobb\b/i.test(p.name)});
  restoreEnquiry();
  var hash=decodeURIComponent(location.hash.slice(1));
  if(aliases[hash])state.category=aliases[hash];
  var requested=new URLSearchParams(window.location.search).get("q");
  if(requested){state.search=requested.trim().toLowerCase().slice(0,90);el("shop-search").value=requested.slice(0,90);}
  renderChips();renderCards();
 }).catch(function(){el("shop-results").textContent="Our product list is temporarily unavailable. Please message us on WhatsApp."});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();