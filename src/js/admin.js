openModal("project", "new")

function openModal(type, id) {
    const modal = document.querySelector(`.modal-${type}`)
    modal.style.display = "block"

    document.addEventListener("click", (e) => {
        if (e.target.classList[0] === "center-content") closeModal()
    })
}

function closeModal() {
    document.querySelector(".modal").style.display = "none"
}