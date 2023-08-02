function deleteItem(type, id) {
    const prompt = window.confirm("Are you sure you want to delete this item?")
    if (prompt) window.location.href = `/cms/${type}/delete?token=${token}&id=${id}`
    else return
}