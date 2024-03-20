const add_button = document.getElementById("to_do_add")
const to_do_list = document.getElementById("to_do_list")
const to_do_list_local = []

add_button.addEventListener("click", function() {
    const to_do_input = document.getElementById("to_do_input")
    
    if (to_do_input.value.length > 0 & !to_do_list_local.includes(to_do_input.value)) {
        const to_do_div = document.createElement("div")
        to_do_div.className = "to_do"

        const to_do = document.createElement("p")
        to_do.textContent = to_do_input.value

        const remove_button = document.createElement("button")
        remove_button.textContent = "X"

        remove_button.addEventListener("click", function() {
            to_do_div.remove()
            to_do_list_local.pop(to_do_input.value)
        })

        to_do_div.append(to_do)
        to_do_div.append(remove_button)

        to_do_list.append(to_do_div)
        to_do_list_local.push(to_do_input.value)
        to_do_input.value = ""
    }
})