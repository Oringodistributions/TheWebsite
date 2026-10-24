/* Oringo catalogue: source image approval is required before publication */
(function () {
"use strict";
var NUMBER="447534116006",DATA="catalogue/stock-confirmed-2026-10-24.json";
var cats=["Hot Drinks & Milk Powders","Grains, Cereals & Food Staples","Spices & Seasonings","Traditional Cooking Ingredients","Non-Alcoholic Beverages","Personal Care & Toiletries","Kitchenware & Utensils","Candy","Adult Beverages"];
var aliases={beverages:cats[0],grains:cats[1],spices:cats[2],oils:cats[3],dried:cats[3],bodycare:cats[5],drinks:cats[4],accessories:cats[6],alcoholic:cats[8]};
var state={products:[],search:"",category:"All",sort:"name",basket:new Map(),adultEnabled:false,buyer:"Retail"};
var el=function(id){return document.getElementById(id)};
var enc=function(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]})};
var clean=function(s){return String(s)
 .replace(/\s+—\s+(package reference|carton reference|paired product photo|product family photo|packaging photo|pack reference)$/i,"")
 .replace(/\s+—\s+Oringo photo(\s+\(size pending\))?$/i,"")
 .replace(/\s+—\s+900g (package )?reference$/i," — 900g")
 .replace(/\s+—\s+.*example\s+\(.*?\)$/i,"")
 .trim()};
var wa=function(message){return "https://wa.me/"+NUMBER+"?text="+encodeURIComponent(message)};
var allowed=function(p){return p.category!=="Adult Beverages"||state.adultEnabled};
var matches=function(p){return(state.category==="All"||p.category===state.category)&&[p.name,p.sku,p.category].join(" ").toLowerCase().includes(state.search)};
function renderCards(){
 var filtered=state.products.filter(matches),blocked=filtered.some(function(p){return !allowed(p)});
 var list=filtered.filter(allowed);
 list.sort(function(a,b){return state.sort==="category"?(a.category.localeCompare(b.category)||clean(a.name).localeCompare(clean(b.name))):clean(a.name).localeCompare(clean(b.name))});
 el("shop-results").textContent=list.length+" products shown · "+state.products.length+" in stock"+(blocked?" · Confirm age to view adult drinks":"");
 var frag=document.createDocumentFragment();
 list.forEach(function(p){
  var article=document.createElement("article"),name=enc(clean(p.name)),sku=enc(p.sku);
  article.className="oc-product";
  var photo=(p.photo_approved&&p.image_url&&p.photo_status==="APPROVED")?
    '<img loading="lazy" alt="'+name+'" src="'+enc(p.image_url)+'">':
    '<div class="oc-image-pending"><i class="fas fa-camera" aria-hidden="true"></i><span>Product photo being prepared</span></div>';
  var msg="Hello Oringo Distributions. Please quote "+clean(p.name)+" ("+p.sku+") and delivery to my UK or European address.";
  article.innerHTML='<div class="oc-product-image">'+photo+'</div><div class="oc-card-body">'+
    '<small class="oc-category">'+enc(p.category)+'</small><h3>'+name+'</h3>'+
    '<p class="oc-stock"><i class="fas fa-check-circle"></i> In stock</p><p class="oc-price">Price on request</p>'+
    '<div class="oc-product-actions"><button type="button" class="oc-add" data-action="add" data-sku="'+sku+'">Add to enquiry</button>'+
    '<a class="oc-ask" target="_blank" rel="noopener noreferrer" href="'+wa(msg)+'">Ask on WhatsApp</a></div></div>';
  frag.appendChild(article);
 });
 el("shop-products").replaceChildren(frag);
 el("shop-empty").hidden=list.length!==0;
 el("shop-age-hint").hidden=!blocked;
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
 if(!p||!allowed(p))return;
 var n=Math.max(0,Math.min(100,(state.basket.get(sku)||0)+change));
 if(n===0)state.basket.delete(sku);else state.basket.set(sku,n);
 updateBasket();
}
function send(){
 var selected=[...state.basket].map(function(entry){return {p:state.products.find(function(p){return p.sku===entry[0]}),qty:entry[1]}}).filter(function(x){return x.p&&allowed(x.p)});
 if(!selected.length)return;
 var msg="Hello Oringo Distributions. I am enquiring as a "+state.buyer.toLowerCase()+" customer about these in-stock products:\n\n"+
  selected.map(function(x,i){return(i+1)+". "+clean(x.p.name)+" ("+x.p.sku+") — quantity "+x.qty}).join("\n")+
  "\n\nPlease confirm exact pack sizes, total price and delivery cost/time for my location. Thank you.";
 window.open(wa(msg),"_blank","noopener,noreferrer");
}
function init(){
 if(!el("shop-products"))return;
 el("shop-search").addEventListener("input",function(e){state.search=e.target.value.trim().toLowerCase();renderCards()});
 el("shop-sort").addEventListener("change",function(e){state.sort=e.target.value;renderCards()});
 el("shop-buyer").addEventListener("change",function(e){state.buyer=e.target.value});
 el("shop-products").addEventListener("click",function(e){var b=e.target.closest("[data-action='add']");if(b)qty(b.dataset.sku,1)});
 el("shop-basket-items").addEventListener("click",function(e){var b=e.target.closest("[data-action]");if(b)qty(b.dataset.sku,b.dataset.action==="plus"?1:-1)});
 el("shop-basket-send").addEventListener("click",send);
 el("shop-age-hint").addEventListener("click",function(){if(el("showAlcoholic"))el("showAlcoholic").click()});
 if(el("ageYes"))el("ageYes").addEventListener("click",function(){state.adultEnabled=true;renderCards()});
 fetch(DATA).then(function(r){if(!r.ok)throw new Error("Could not load catalogue");return r.json()}).then(function(d){
  state.products=d.products||[];
  var hash=decodeURIComponent(location.hash.slice(1));
  if(aliases[hash])state.category=aliases[hash];
  renderChips();renderCards();
 }).catch(function(){el("shop-results").textContent="Our product list is temporarily unavailable. Please message us on WhatsApp."});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();