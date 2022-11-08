let date = new Date();
let dateNow = new Date();
window.onload = start;

let schedule;
let month;
let today;
let selectOne;
let selectTwo;
let pre;
let post;
let goToday;


function start() {
    schedule = document.getElementById("schedule");
    pre = document.getElementById("pre");
    post = document.getElementById("post");
    goToday = document.getElementById("go_today");
    paintMonth();
    paintCalendar();
    paintDays();
    refillSelectMonth();
    refillSelectYear();
    selectOne.addEventListener('change', newDate);
    selectTwo.addEventListener('change', newDate);
    pre.addEventListener('click', preMonth)
    post.addEventListener('click', postMonth)
    //Volver al día de hoy
    goToday.addEventListener('click', () => {
        date =dateNow;
        updateCalendar();
        refillSelectMonth();
        refillSelectYear();
    })

}

//Llena el select de los meses (selectOne)
function refillSelectMonth() {
    selectOne = document.getElementById("select_month");
    for (let i = 0; i < 12; i++) {
        selectOne.innerHTML += "<option value='" + i + "' >" + selectMonth(i) + "</option>";
    }
}

//Llena el Select de los Años (selectTwo)
function refillSelectYear() {
    selectTwo = document.getElementById("select_year");
    for (let i = new Date().getFullYear(); i < 2101; i++) {
        selectTwo.innerHTML += "<option value='" + i + "' >" + i + "</option>"
    }
}

//Te manda al mes anterior
function preMonth() {
    let preMonthy = date.getMonth() - 1;
    if (preMonthy < 0) {
        date.setFullYear(date.getFullYear() - 1);
        date.setMonth(11);
    } else {
        date.setMonth(date.getMonth() -1)
    }
    updateCalendar();
}

//Te manda al mes posterior
function postMonth() {
    let postMonthy = date.getMonth() + 1;
    if (postMonthy > 11) {
        date.setFullYear(date.getFullYear() + 1);
        date.setMonth(0);
    } else {
        date.setMonth(date.getMonth() +1)
    }
    updateCalendar();
}



//Pinta el nombre del mes del año en el encabezado
function paintMonth() {
    let divMonth = document.getElementById("title")
    month = date.getMonth();
    year = date.getFullYear();
    divMonth.innerText = selectMonth(month) + " " + year;
}
//Pinta el calendario
function paintCalendar() {
    today = date.getDate();
    let totalDays = 42;

    for (i = 0; i < totalDays; i++) {

        if (i + 1 === today + (weekDayActualOne() - 1) && isThisMonth(date)) {

            schedule.innerHTML += "<div class='day_calendar' id='today'>TODAY</div>";
            continue;
        } else {
            schedule.innerHTML += "<div class='day_calendar' id='day" + (i + 1) + "'></div>";
        }

        let day = document.getElementById("day" + (i + 1));

        let weekDay = (i + 1) % 7;

        switch (weekDay) {
            case 1: day.innerText = "Lunes";
                break;
            case 2: day.innerText = "Martes";
                break;
            case 3: day.innerText = "Miércoles";
                break;
            case 4: day.innerText = "Jueves";
                break;
            case 5: day.innerText = "Viernes";
                break;
            case 6: day.innerText = "Sábado";
                break;
            case 0: day.innerText = "Domingo";
        }
    }
}

//Crea una nueva fecha con los valores de los selects One y Two
function newDate() {
    date.setFullYear(selectTwo.value);
    date.setMonth(selectOne.value);
    updateCalendar();
}

//actualiza el calendario
function updateCalendar() {

    if (isThisMonth(date)) {
        date = dateNow;
    }
    deleteAll();
    paintCalendar();
    paintMonth();
    paintDays();
}

function deleteAll() {
    schedule.innerHTML = "";
}

//Esta funcion obtiene el dia de la semana que cae el dia 1 de ese mes.
function weekDayActualOne() {
    let prov = new Date(actualYear(), actualMonth(), 1).getDay();

    if (prov === 0) {
        return 7;
    } else {
        return prov;
    }
}

//Esta funcion obtiene los dias que tiene ese mes; Un Date con dia 0 te devuelve el ultimo día del mes anterior!!
function totalDaysMonth(dateParam2) {
    compareDate = new Date(dateParam2.getFullYear(), (dateParam2.getMonth() + 1), 0);
    return compareDate.getDate();


}

function actualMonth() {
    return date.getMonth();
}

function actualYear() {
    return date.getFullYear();
}

function paintDays() {
    let count = 1;
    for (let i = weekDayActualOne(); i < totalDaysMonth(date) + weekDayActualOne(); i++) {
        if ((i - 1) === today && isThisMonth(date)) {
            document.getElementById("today").innerHTML += "<div class='day_number' id='day_number" + count + "' >" + count + "</div>";
            count++;
            continue;
        } else {
            document.getElementById("day" + i).innerHTML += "<div class='day_number' id='day_number" + count + "' >" + count + "</div>";
            count++;
        }
    }
}

//Este método comprueba si el usuario esta pidiendo que se muestre el mes actual para así marcar el día de hoy.
function isThisMonth(dateParam) {

    if (dateParam.getMonth() === dateNow.getMonth() && dateParam.getFullYear() === dateNow.getFullYear()) {
        date = new Date();
        return true;
    } else {
        return false;
    }
}

function selectMonth(month) {
    switch (month) {
        case 0: return "Enero";
        case 1: return "Febrero";
        case 2: return "Marzo";
        case 3: return "Abril";
        case 4: return "Mayo";
        case 5: return "Junio";
        case 6: return "Julio";
        case 7: return "Agosto";
        case 8: return "Septiembre";
        case 9: return "Octubre";
        case 10: return "Noviembre";
        case 11: return "Diciembre";
    }
}