async function openModal(type, id) {
    const modal = document.querySelector(`.modal.${type}`)
    const form = document.querySelector(`.modal.${type} form`)

    const response = await fetch(`/cms/${type}?token=${token}&id=${id}`)
    const data = await response.json()
    setData(modal, data)

    modal.style.display = "block"
    form.action = `/cms/${type}/edit?token=${token}&id=${id}`
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
    const allInputs = []

    for (let i = 0; i < inputs.length; i++) allInputs.push(inputs[i])
    for (let i = 0; i < textareas.length; i++) allInputs.push(textareas[i])

    for (let i = 0; i < allInputs.length; i++) {
        if (data.no_results) {
            allInputs[i].value = ""
            if (allInputs[i].name === "id") allInputs[i].value = 0
        }
        else {
            const property = allInputs[i].name
            if (property in data) { allInputs[i].value = data[property] }
        }
    }
}