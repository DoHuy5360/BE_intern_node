const hqtOptions = document.querySelectorAll(".cbx_option");
hqtOptions.forEach((hqt) => {
	hqt.addEventListener("click", (e) => {
		const mainParent = hqt.parentNode.parentNode;
		const hiddenInp = mainParent.querySelector(".wrap_combobox_partial .hidden_inp");
		const selectInp = mainParent.querySelector(".select_inp");
		selectInp.value = hqt.textContent;
		hiddenInp.value = hqt.getAttribute("data-hqt-id");
		selectInp.classList.remove("selected");
	});
});
const selectInp = document.querySelectorAll(".select_inp");

selectInp.forEach((inp) => {
	inp.addEventListener("click", (e) => {
		e.stopImmediatePropagation();
		inp.classList.toggle("selected");
	});
});
window.addEventListener("click", (e) => {
	const selectedInp = document.querySelectorAll(".select_inp.selected");
	if (selectedInp !== undefined) {
		selectedInp.forEach((inp) => {
			inp.classList.remove("selected");
		});
	}
});
