const firstCol = document.querySelector(".wrap_schedule_col");

const firstCell = createWsCell();
const time = 90;
const margin = scaleTime(90);
const height = scaleTime(300) - margin;

function scaleTime(time) {
	//* 60 minutes = 32px + 1px
	//* 32px: cell height
	//* 1px : gap
	//* n minutes = ((n * 33) / 60)px
	return (time * (32 + 1)) / 60;
}
Object.assign(firstCell.style, {
	"margin-top": `${margin}px`,
	height: `${height}px`,
});

firstCol.appendChild(firstCell);

function createWsCell() {
	const wrap = document.createElement("div");
	wrap.innerHTML = `
            <div class="ws_cell">
                <div>Business Trip</div>
                <div>Do Huy</div>
                <div>01:30 - 05:00</div>
            </div>
        `;
	return wrap.querySelector(".ws_cell");
}
