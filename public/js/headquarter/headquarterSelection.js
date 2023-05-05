const hqtOptions = document.querySelectorAll(".hgt_option");
hqtOptions.forEach((hqt) => {
	hqt.addEventListener("click", (e) => {
		selectInp.value = hqt.textContent;
		hiddenInp.value = hqt.getAttribute("data-hqt-id");
		selectInp.classList.remove("selected");
	});
});
const hiddenInp = document.querySelector(".wrap_hqt_options_partial .hidden_inp");
const selectInp = document.querySelector(".select_inp");
selectInp.addEventListener("click", (e) => {
	e.stopImmediatePropagation();
	selectInp.classList.toggle("selected");
});
window.addEventListener("click", (e) => {
	if (selectInp.classList.contains("selected")) {
		selectInp.classList.remove("selected");
	}
});
