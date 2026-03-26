/**
 * 🍬 Kolkata Sweet Shop - createElement & appendChild
 *
 * Kolkata ke famous sweet shop ka digital menu board banana hai.
 * Rasgulla, sandesh, mishti doi - sab kuch DOM elements se render
 * karenge. createElement se items banao, appendChild se menu board
 * pe lagao. Jaise sweet shop mein ek ek mithai counter pe sajati hai,
 * waise hi tum ek ek element DOM mein add karoge.
 *
 * Functions:
 *
 *   1. createSweetItem(name, price, category)
 *      - Creates a div element with class "sweet-item"
 *      - Inside div: h3 (name), p with class "price" (text: "₹{price}"),
 *        span with class "category" (text: category)
 *      - Returns the div element
 *      - Validation: name must be string, price must be number, category must be string
 *      - Agar koi bhi param missing ya invalid type, return null
 *
 *   2. buildMenuBoard(sweets)
 *      - Takes array of {name, price, category} objects
 *      - Creates a div with id "menu-board"
 *      - Loop through sweets, call createSweetItem for each
 *      - Append each sweet item to menu-board
 *      - Returns the menu-board div
 *      - Empty array returns div with no children (bas empty menu-board)
 *      - Agar sweets not array, return null
 *
 *   3. addSpecialBadge(sweetElement, badgeText)
 *      - Takes a sweet-item element and badge text string
 *      - Creates a span with class "special-badge" and textContent = badgeText
 *      - Appends the span to sweetElement
 *      - Returns the modified sweetElement
 *      - Agar sweetElement null/undefined, return null
 *      - Agar badgeText not string or empty, return null
 *
 * Hint: document.createElement() se naya element banao,
 *   element.classList.add() se class lagao, element.appendChild() se
 *   child add karo, element.textContent se text dalo.
 *
 * @param {string} name - Sweet ka naam (e.g., "Rasgulla")
 * @param {number} price - Sweet ki price in rupees (e.g., 30)
 * @param {string} category - Sweet ki category (e.g., "Bengali")
 * @returns {HTMLDivElement|null} - Sweet item element ya null agar invalid
 *
 * @example
 *   const item = createSweetItem("Rasgulla", 30, "Bengali");
 *   // => <div class="sweet-item">
 *   //      <h3>Rasgulla</h3>
 *   //      <p class="price">₹30</p>
 *   //      <span class="category">Bengali</span>
 *   //    </div>
 *
 *   const board = buildMenuBoard([
 *     { name: "Rasgulla", price: 30, category: "Bengali" },
 *     { name: "Sandesh", price: 40, category: "Bengali" }
 *   ]);
 *   // => <div id="menu-board">...2 sweet items...</div>
 *
 *   addSpecialBadge(item, "Bestseller");
 *   // => item now has <span class="special-badge">Bestseller</span>
 */
export function createSweetItem(name, price, category) {
      if(typeof(name) !== "string" || typeof(price) !== "number" || typeof(category) !== "string") return null
      let element = document.createElement("div")
      element.classList.add("sweet-item")
      const h3 = document.createElement("h3")
      h3.textContent= name
      element.appendChild(h3)
      const p = document.createElement("p")
      p.classList.add("price")
      p.textContent =`₹${price}`
      element.appendChild(p)
      const span = document.createElement("span")
      span.classList.add("category")
      span.textContent = category
      element.appendChild(span)
      return element
}

export function buildMenuBoard(sweets) {
    if (!Array.isArray(sweets)) return null
    let menu_board = document.createElement("div")
    menu_board.id = "menu-board"
    if (sweets.length === 0) return menu_board
    sweets.forEach((item)=>{
         const name = item["name"]
         const price = item["price"]
         const category = item["category"]
         let menu_item = createSweetItem(name,price,category)
         menu_board.appendChild(menu_item)
    })
    return menu_board
}

export function addSpecialBadge(sweetElement, badgeText) {
  if (typeof(badgeText) !== "string" || badgeText.length === 0) return null
  if( sweetElement === null || sweetElement === undefined) return null
  let element = document.createElement("span")
  element.classList.add("special-badge")
  element.textContent = `${badgeText}`
  sweetElement.appendChild(element)
  return sweetElement
}
