function openModal(type, id) {
    const modal = document.querySelector(`.modal-${type}`)
    modal.style.display = "block"
    document.addEventListener("click", modalClickListener)
}

function closeModal() {
    document.querySelector(".modal").style.display = "none"
    document.removeEventListener("click", modalClickListener)
}

function modalClickListener(event) {
    if (event.target.classList[0] === "center-content") closeModal()
}