/**
 * 🙏 Aarti Form - Form Handling, preventDefault & Validation
 *
 * Mandir ki aarti booking form bana rahe hain! Bhakton ka naam, aarti type,
 * aur date validate karke submit karna hai. Form submit hone pe page reload
 * nahi hona chahiye (preventDefault), pehle sab fields validate karo,
 * phir success ya error callback call karo. Jaise mandir mein pujari
 * entry check karta hai ki sab theek hai, waise hi form ko validate karo.
 *
 * Functions:
 *
 *   1. validateName(name)
 *      - Name must be a string, 2-50 characters long
 *      - Only letters (a-z, A-Z) and spaces allowed
 *      - Returns { valid: true, error: null } if valid
 *      - Returns { valid: false, error: "error message" } if invalid
 *      - Error messages (Hinglish):
 *        - Not string: "Naam string hona chahiye"
 *        - Too short: "Naam mein kam se kam 2 characters hone chahiye"
 *        - Too long: "Naam 50 characters se zyada nahi ho sakta"
 *        - Invalid chars: "Naam mein sirf letters aur spaces allowed hain"
 *
 *   2. validateDate(dateString)
 *      - Must be a valid date string in YYYY-MM-DD format
 *      - Must be today or a future date (past dates not allowed)
 *      - Returns { valid: true, error: null } if valid
 *      - Returns { valid: false, error: "error message" } if invalid
 *      - Error messages:
 *        - Not string: "Date string honi chahiye"
 *        - Invalid format: "Date YYYY-MM-DD format mein honi chahiye"
 *        - Past date: "Date aaj ya future ki honi chahiye"
 *
 *   3. validateAartiType(type)
 *      - Must be one of: "morning", "evening", "special"
 *      - Returns { valid: true, error: null } if valid
 *      - Returns { valid: false, error: "error message" } if invalid
 *      - Error messages:
 *        - Not string: "Aarti type string hona chahiye"
 *        - Invalid type: "Aarti type morning, evening, ya special mein se hona chahiye"
 *
 *   4. setupAartiForm(formElement, onSuccess, onError)
 *      - Adds "submit" event listener on formElement with preventDefault()
 *      - On submit: reads form fields:
 *        - name: from input/element with name="name" (formElement.elements.name.value)
 *        - date: from input with name="date"
 *        - aartiType: from select/input with name="aartiType"
 *      - Validates all three fields using above functions
 *      - If ALL valid: calls onSuccess({ name, date, aartiType })
 *      - If ANY invalid: calls onError(errorsArray) where errorsArray contains
 *        error strings from each failed validation
 *      - Returns cleanup function that removes the submit listener
 *      - Agar formElement null/undefined, return null
 *      - Agar onSuccess or onError not functions, return null
 *
 *   5. createBookingSummary(booking)
 *      - Takes { name, date, aartiType } object
 *      - Creates a div.booking-summary containing:
 *        - h3 with text "Booking Confirmation"
 *        - p.booking-name with text "Bhakt: {name}"
 *        - p.booking-date with text "Date: {date}"
 *        - p.booking-type with text "Aarti: {aartiType}"
 *      - Returns the div element
 *      - Agar booking null/undefined or missing fields, return null
 *
 * Hint: event.preventDefault() form ka default submit behavior rokta hai.
 *   formElement.elements se form ke inputs access karo by name attribute.
 *
 * @example
 *   validateName("Rahul Sharma");
 *   // => { valid: true, error: null }
 *
 *   validateName("R");
 *   // => { valid: false, error: "Naam mein kam se kam 2 characters hone chahiye" }
 *
 *   validateDate("2025-12-25");
 *   // => { valid: true, error: null } (if date is in future)
 *
 *   validateAartiType("morning");
 *   // => { valid: true, error: null }
 *
 *   const summary = createBookingSummary({
 *     name: "Rahul", date: "2025-12-25", aartiType: "morning"
 *   });
 *   // => <div class="booking-summary">...</div>
 */
export function validateName(name) {

  if (typeof (name) !== "string") return { "valid": false, "error": "Naam string hona chahiye" }
  if (name.length < 2) return { valid: false, error: "Naam mein kam se kam 2 characters hone chahiye" }
  if (name.length > 50) return { valid: false, error: "Naam 50 characters se zyada nahi ho sakta" }
  if (!/^[A-Za-z\s]+$/.test(name)) return { valid: false, error: "Naam mein sirf letters aur spaces allowed hain" }
  return { valid: true, error: null }
}

export function validateDate(dateString) {
  if (typeof dateString !== 'string') {
    return { valid: false, error: "Date string honi chahiye" };
  }

  const formatRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!formatRegex.test(dateString)) {
    return { valid: false, error: "Date YYYY-MM-DD format mein honi chahiye" };
  }

  const [year, month, day] = dateString.split('-').map(Number);
  const inputDate = new Date(year, month - 1, day);

  if (
    inputDate.getFullYear() !== year ||
    inputDate.getMonth() !== month - 1 ||
    inputDate.getDate() !== day
  ) {
    return { valid: false, error: "Date YYYY-MM-DD format mein honi chahiye" }; // Reject fake dates
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (inputDate < today) {
    return { valid: false, error: "Date aaj ya future ki honi chahiye" };
  }

  return { valid: true, error: null };
}

export function validateAartiType(type) {
  if (typeof type !== 'string') return { valid: false, error: "Aarti type string hona chahiye" }
  if (!["morning", "evening", "special"].includes(type)) return { valid: false, error: "Aarti type morning, evening, ya special mein se hona chahiye" }
  return { valid: true, error: null };
}


export function setupAartiForm(formElement, onSuccess, onError) {
  if (!formElement || typeof onError !== 'function' || typeof onSuccess !== 'function') return null

  const handleSubmit = (e) => {
    const nameValue = formElement.elements.name.value;
    const dateValue = formElement.elements.date.value;
    const typeValue = formElement.elements.aartiType.value

    const nameCheck = validateName(nameValue);
    const dateCheck = validateDate(dateValue);
    const typeCheck = validateAartiType(typeValue);

    const errorsArray = [];

    if (!nameCheck.valid) errorsArray.push(nameCheck.error);
    if (!dateCheck.valid) errorsArray.push(dateCheck.error);
    if (!typeCheck.valid) errorsArray.push(typeCheck.error);
    if (errorsArray.length > 0) {
      onError(errorsArray);
    } else {
      onSuccess({
        name: nameValue,
        date: dateValue,
        aartiType: typeValue
      })
    }
  }
  formElement.addEventListener('submit', handleSubmit)
  return function cleanup() {
    formElement.removeEventListener('submit', handleSubmit);
  };

}

export function createBookingSummary(booking) {
  if(!booking || !booking.name || !booking.date || !booking.aartiType) return null
  const divBook = document.createElement('div')
  divBook.classList.add('booking-summary')
  const h3Book = document.createElement('h3')
  h3Book.textContent = "Booking Confirmation"
  const pName = document.createElement('p')
  const pDate = document.createElement('p')
  const pType = document.createElement('p')
  pName.classList.add('booking-name')
  pName.textContent = `Bhakt: ${booking.name}`
  pDate.classList.add('booking-date')
  pDate.textContent = `Date: ${booking.date}`
  pType.classList.add('booking-type')
  pType.textContent = `Aarti: ${booking.aartiType}`
  divBook.appendChild(h3Book)
  divBook.appendChild(pName)
  divBook.appendChild(pDate)
  divBook.appendChild(pType)
  return divBook
}
