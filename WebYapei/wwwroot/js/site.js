(() => {
  // Set the owner's Bolivian number here, digits only, including country code 591.
  const WHATSAPP_NUMBER = "59100000000";
  const products = [
    { name: "JevaLatte Frío", prices: [25, 28], desc: "Café frío · suave y refrescante", tag: "FAVORITO", image: "photo-1461023058943-07fcbe16d735" },
    { name: "JevaLatte Vienés", prices: [29, 32], desc: "Espresso · crema batida", tag: "UN CLÁSICO", image: "photo-1570968915860-54d5c301fa9f" },
    { name: "ChocolateLatte", prices: [25, 28], desc: "Cacao · espresso · leche", tag: "PARA EL ALMA", image: "photo-1578662996442-48f60103fc96" },
    { name: "MotaLatte", prices: [25, 28], desc: "Artesanal · sedoso · especial", tag: "ESPECIAL", image: "photo-1517701604599-bb29b565090c" },
    { name: "MochaLatte", prices: [29, 32], desc: "Chocolate · espresso · espuma", tag: "INTENSO", image: "photo-1578314675249-a6910f80cc4e" },
    { name: "CoffeeLatte", prices: [23, 25], desc: "Espresso · leche cremosa", tag: "DE SIEMPRE", image: "photo-1461023058943-07fcbe16d735" }
  ];
  const cart = [];
  let language = "es";
  const money = n => `Bs ${n}`;
  const grid = document.querySelector("#productGrid");
  const imageUrl = id => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=80`;

  function renderProducts() {
    grid.innerHTML = products.map((p, i) => `<article class="product-card" data-product="${i}"><div class="product-photo"><img src="${imageUrl(p.image)}" alt="${p.name}, latte artesanal" loading="lazy" /><span class="product-tag">${p.tag}</span></div><div class="product-info"><div class="product-top"><div><h3>${p.name}</h3><p>${p.desc}</p></div></div><div class="size-pills"><button class="active" data-size="0">Mediano</button><button data-size="1">Grande</button></div><div class="product-actions"><span class="product-price">${money(p.prices[0])}</span><button class="add-button" aria-label="Añadir ${p.name} al carrito">+</button></div></div></article>`).join("");
    grid.querySelectorAll(".product-card").forEach(card => {
      const p = products[Number(card.dataset.product)];
      let size = 0;
      card.querySelectorAll("[data-size]").forEach(btn => btn.addEventListener("click", () => {
        size = Number(btn.dataset.size);
        card.querySelectorAll("[data-size]").forEach(b => b.classList.toggle("active", b === btn));
        card.querySelector(".product-price").textContent = money(p.prices[size]);
      }));
      card.querySelector(".add-button").addEventListener("click", () => addToCart(p, size));
    });
  }
  function addToCart(product, size) {
    const sizeName = size ? "Grande" : "Mediano";
    const found = cart.find(x => x.name === product.name && x.size === sizeName);
    if (found) found.qty++; else cart.push({ name: product.name, size: sizeName, price: product.prices[size], qty: 1 });
    updateCart();
    document.querySelector("#cartFab").classList.add("cart-added");
    setTimeout(() => document.querySelector("#cartFab").classList.remove("cart-added"), 400);
  }
  function updateCart() {
    const count = cart.reduce((n, x) => n + x.qty, 0);
    document.querySelector("#cartCount").textContent = count;
    document.querySelector("#cartItems").innerHTML = cart.length ? cart.map((x, i) => `<div class="cart-line"><span>${x.name} × ${x.qty}</span><small>${x.size}</small><b>${money(x.price * x.qty)} <button type="button" class="remove-item" data-remove="${i}" aria-label="Quitar">×</button></b></div>`).join("") : "<p>Tu bolsa está esperando algo rico.</p>";
    document.querySelector("#cartItems").querySelectorAll("[data-remove]").forEach(b => b.addEventListener("click", () => { cart.splice(Number(b.dataset.remove), 1); updateCart(); }));
    document.querySelector("#cartTotal").textContent = money(cart.reduce((n, x) => n + x.price * x.qty, 0));
  }
  function openWhatsApp(message) {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }
  const cartDialog = document.querySelector("#cartDialog");
  const reserveDialog = document.querySelector("#reserveDialog");
  const adminDialog = document.querySelector("#adminDialog");
  document.querySelector("#cartFab").addEventListener("click", () => cartDialog.showModal());
  document.querySelector("#reserveOpen").addEventListener("click", () => reserveDialog.showModal());
  document.querySelectorAll("[data-close]").forEach(b => b.addEventListener("click", () => b.closest("dialog").close()));
  [cartDialog, reserveDialog, adminDialog].forEach(d => d.addEventListener("click", e => { if (e.target === d) d.close(); }));
  document.querySelector("#delivery").addEventListener("change", e => {
    const label = document.querySelector("#addressLabel");
    label.classList.toggle("hidden", e.target.value !== "entrega");
    label.querySelector("input").required = e.target.value === "entrega";
  });
  document.querySelector("#checkoutForm").addEventListener("submit", e => {
    e.preventDefault();
    if (!cart.length) { alert("Añade al menos un producto a tu bolsa."); return; }
    const form = new FormData(e.currentTarget);
    const lines = cart.map(x => `• ${x.qty} × ${x.name} (${x.size}) — ${money(x.price * x.qty)}`);
    const delivery = form.get("delivery") === "entrega" ? `Entrega a domicilio: ${form.get("address")}` : "Retiro en tienda";
    const total = cart.reduce((n, x) => n + x.price * x.qty, 0);
    openWhatsApp(`¡Hola Yapei! Quiero hacer este pedido:\n\n${lines.join("\n")}\n\nTotal: ${money(total)}\n\nCliente: ${form.get("name")}\n${delivery}\nContacto: ${form.get("phone")}`);
    cartDialog.close();
  });
  document.querySelector("#reserveForm").addEventListener("submit", e => {
    e.preventDefault(); const f = new FormData(e.currentTarget);
    openWhatsApp(`¡Hola Yapei! Quisiera solicitar una reserva:\n\nNombre: ${f.get("name")}\nFecha: ${f.get("date")}\nHora: ${f.get("time")}\nPersonas: ${f.get("people")}`);
    reserveDialog.close();
  });
  document.querySelector("#contactForm").addEventListener("submit", e => {
    e.preventDefault(); const f = new FormData(e.currentTarget);
    openWhatsApp(`¡Hola Yapei! Soy ${f.get("name")}.\n\n${f.get("message")}`);
  });
  document.querySelector("#whatsappFab").addEventListener("click", e => {
    e.preventDefault(); openWhatsApp("¡Hola Yapei! Quisiera hacer una consulta.");
  });
  document.querySelector("#adminLink").addEventListener("click", () => adminDialog.showModal());
  document.querySelector("#adminForm").addEventListener("submit", e => {
    e.preventDefault(); const password = new FormData(e.currentTarget).get("password");
    if (password !== "yapei2026") { alert("Contraseña incorrecta."); return; }
    const panel = document.querySelector("#adminProducts"); panel.classList.remove("hidden");
    panel.innerHTML = `<h3>Productos y precios</h3><div class="admin-products">${products.map(p => `${p.name}: Mediano ${money(p.prices[0])} · Grande ${money(p.prices[1])}`).join("<br>")}</div><p><small>Edición de precios requiere persistencia segura en servidor.</small></p>`;
  });
  document.querySelector("#mobileMenu").addEventListener("click", () => document.querySelector(".site-header").classList.toggle("mobile-open"));
  const translations = {
    es: { navMenu: "Menú", navVisit: "Visítanos", navContact: "Contacto", heroEyebrow: "CAFÉ HECHO CON CARIÑO", heroTitle: "Un sorbo.", heroText: "Tu pausa favorita, servida fría o calentita. Café artesanal, sabores que abrazan y un poquito de magia en cada vaso.", heroCta: "Descubrir el menú", menuEyebrow: "NUESTRO MENÚ", menuTitle: "Elige tu", menuTitleEm: "antojo.", menuText: "Seis formas de hacer que hoy<br>se sienta un poquito más rico.", visitEyebrow: "UN LUGAR PARA QUEDARSE", visitTitle: "Tu mesa.", visitTitleEm: "Tu momento.", visitText: "Ven por un café, quédate por la buena compañía. Reserva tu espacio y nosotros ponemos lo rico.", reserveCta: "Reservar una mesa", contactEyebrow: "HABLEMOS", contactTitle: "¿Algo en mente?", contactTitleEm: "Estamos aquí.", yourName: "Tu nombre", yourMessage: "Tu mensaje", contactCta: "Escribirnos por WhatsApp" },
    en: { navMenu: "Menu", navVisit: "Visit us", navContact: "Contact", heroEyebrow: "COFFEE MADE WITH CARE", heroTitle: "One sip.", heroText: "Your favorite little pause, served cold or warm. Craft coffee, comforting flavors, and a little magic in every cup.", heroCta: "Explore the menu", menuEyebrow: "OUR MENU", menuTitle: "Pick your", menuTitleEm: "craving.", menuText: "Six ways to make today<br>feel a little more delicious.", visitEyebrow: "A PLACE TO STAY", visitTitle: "Your table.", visitTitleEm: "Your moment.", visitText: "Come for coffee, stay for the company. Reserve your spot and we’ll take care of the good stuff.", reserveCta: "Reserve a table", contactEyebrow: "SAY HELLO", contactTitle: "On your mind?", contactTitleEm: "We’re here.", yourName: "Your name", yourMessage: "Your message", contactCta: "Message us on WhatsApp" }
  };
  document.querySelector("#langToggle").addEventListener("click", e => {
    language = language === "es" ? "en" : "es"; e.currentTarget.textContent = language === "es" ? "EN" : "ES";
    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n]").forEach(el => el.innerHTML = translations[language][el.dataset.i18n]);
  });
  renderProducts(); updateCart();
})();
