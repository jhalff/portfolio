async function openModal(type, id) {
    const modal = document.getElementsByClassName(`modal ${type}`)
    modal[0].style.display = "block"
    document.addEventListener("click", modalClickListener)
}

function closeModal() {
    console.log(document.querySelector(".modal"))
    document.querySelector(".modal").style.display = "none"
    document.removeEventListener("click", modalClickListener)
}

function modalClickListener(event) {
    if (event.target.classList[0] === "center-content") closeModal()
}