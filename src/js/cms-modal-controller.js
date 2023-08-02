async function openModal(type, id) {
    const modal = document.getElementsByClassName(`modal ${type}`)[0]
    const response = await fetch(`/cms/${type}?token=${token}&id=${id}`)
    const data = await response.json()

    setData(modal, data)
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

function setData(modal, data) {
    const inputs = modal.getElementsByTagName("input")
    const textareas = modal.getElementsByTagName("textarea")

    for (let i = 0; i < inputs.length; i++) {
        const property = inputs[i].name
        if (property in data) { inputs[i].value = data[property] }
    }

    for (let i = 0; i < textareas.length; i++) {
        const property = textareas[i].name
        if (property in data) { textareas[i].value = data[property] }
    }
}