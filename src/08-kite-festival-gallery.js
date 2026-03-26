/**
 * 🪁 Kite Festival Gallery - Dynamic Rendering from Data Arrays
 *
 * Uttarayan / Makar Sankranti ke kite festival ki photo gallery render
 * karna hai data se! Array mein kites ka data hai - naam, color, size,
 * maker, image. Har kite ke liye DOM element banao, gallery mein render
 * karo, filter karo, sort karo. Jaise aasmaaan mein hazaron patang udte
 * hain, waise hi screen pe gallery bhar do.
 *
 * Functions:
 *
 *   1. renderKiteCard(kite)
 *      - Takes { name, color, size, maker, image } object
 *      - Creates div.kite-card containing:
 *        - img with src=image, alt=name
 *        - h3.kite-name with textContent=name
 *        - p.kite-maker with textContent="by {maker}"
 *        - p.kite-info with textContent="{size} - {color}"
 *      - Returns the div element
 *      - Agar kite null/undefined or missing required fields
 *        (name, color, size, maker, image), return null
 *
 *   2. renderGallery(container, kites)
 *      - Clears container's innerHTML (removes all existing children)
 *      - Renders each kite using renderKiteCard
 *      - Appends each card to container
 *      - Skips null results from renderKiteCard (invalid kites)
 *      - Returns number of kites successfully rendered
 *      - Agar container null/undefined, return -1
 *      - Agar kites not array, return -1
 *
 *   3. filterKites(container, kites, filterFn)
 *      - Filters kites array using filterFn (callback that takes kite, returns bool)
 *      - Renders ONLY the filtered kites in container (clears first)
 *      - Returns count of visible (rendered) kites
 *      - Agar container null, return -1
 *      - Agar kites not array or filterFn not function, return -1
 *
 *   4. sortAndRender(container, kites, sortField, order)
 *      - Creates a COPY of kites array (don't modify original)
 *      - Sorts copy by sortField (e.g., "name", "size", "color")
 *      - order: "asc" for ascending, "desc" for descending
 *      - Renders sorted kites in container
 *      - Returns the sorted array copy
 *      - Agar container null, return []
 *      - Agar kites not array, return []
 *      - Default order is "asc" if not provided
 *
 *   5. renderEmptyState(container, message)
 *      - Checks if container has any child elements
 *      - If container is EMPTY (no children): creates p.empty-state with
 *        textContent=message and appends to container. Returns true.
 *      - If container already HAS children: does nothing. Returns false.
 *      - Agar container null/undefined, return false
 *
 * Hint: innerHTML = "" se container khali karo. Array.filter() se filter,
 *   Array.sort() se sort karo. Spread [...array] se copy banao.
 *
 * @example
 *   const kite = {
 *     name: "Patang Raja",
 *     color: "Red",
 *     size: "Large",
 *     maker: "Kite Master Ali",
 *     image: "patang.jpg"
 *   };
 *   const card = renderKiteCard(kite);
 *   // => <div class="kite-card">
 *   //      <img src="patang.jpg" alt="Patang Raja">
 *   //      <h3 class="kite-name">Patang Raja</h3>
 *   //      <p class="kite-maker">by Kite Master Ali</p>
 *   //      <p class="kite-info">Large - Red</p>
 *   //    </div>
 *
 *   renderGallery(container, [kite1, kite2, kite3]);
 *   // => 3 (three kite cards rendered in container)
 *
 *   filterKites(container, kites, k => k.color === "Red");
 *   // => 1 (only red kites shown)
 */
export function renderKiteCard(kite) {
  if (!kite || !kite.name || !kite.color || !kite.size || !kite.maker || !kite.image) return null

  const kiteDiv = document.createElement('div')
  kiteDiv.classList.add('kite-card')

  const imageKite = document.createElement('img')
  imageKite.setAttribute('src', kite.image)
  imageKite.setAttribute('alt', kite.name)
  kiteDiv.appendChild(imageKite)
  
  const h3Kite = document.createElement('h3')
  h3Kite.classList.add('kite-name')
  h3Kite.textContent = kite.name
  kiteDiv.appendChild(h3Kite)
  
  const pKite = document.createElement('p')
  pKite.classList.add('kite-maker')
  pKite.textContent = `by ${kite.maker}`
  kiteDiv.appendChild(pKite)
  
  const pKiteInfo = document.createElement('p')
  pKiteInfo.classList.add('kite-info')
  pKiteInfo.textContent = `${kite.size} - ${kite.color}`
  kiteDiv.appendChild(pKiteInfo)
  
  return kiteDiv
}

export function renderGallery(container, kites) {
if (!container || !Array.isArray(kites) || kites.length == 0) return -1

  container.innerHTML = ""
  let count = 0
  kites.forEach(element => {
    if (!element || renderKiteCard(element) === null) {
      
    } else {
      const child = renderKiteCard(element)
      container.appendChild(child)
      count++
    }
  });

  return count}

export function filterKites(container, kites, filterFn) {
   if (!container || !Array.isArray(kites) || typeof filterFn !== 'function') {
    return -1;
  }
  const filterKites = kites.filter(filterFn)
  return renderGallery(container,filterKites)
}

export function sortAndRender(container, kites, sortField, order) {
    if (!container || !Array.isArray(kites) || kites.length == 0) return []

  const copyKites = [...kites]
  
  if (order === 'desc') {
    copyKites.sort()
    copyKites.reverse()
  } else {
    copyKites.sort()
  }
  renderGallery(container, copyKites)
  return copyKites
}


export function renderEmptyState(container, message) {
    if (!container) return false

  if (container.children.length === 0) {
    const pES = document.createElement('p')
    pES.classList.add('empty-state')
    pES.textContent = message
    container.appendChild(pES)
    return true
  } else {
    return false
  }
}
