import { resaltaSiEstasEn } from "../lib/js/resaltaSiEstasEn.js"

export class NavTabFixed extends HTMLElement {

 connectedCallback() {
  this.classList.add("md-tab", "fixed")

  this.innerHTML = /* HTML */`
   <a ${resaltaSiEstasEn(["/index.html", "", "/"])} href="index.html">
    <span class="material-symbols-outlined">home</span>
    Inicio
   </a>

   <a ${resaltaSiEstasEn(["/navtab.html"])} href="navtab.html">
    <span class="material-symbols-outlined">swipe_left</span>
    Pestañas scrollable
   </a>`

 }

}

customElements.define("nav-tab-fixed", NavTabFixed)