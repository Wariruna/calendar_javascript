let date = new Date();
window.onload = start;

let schedule;
let month;
let today;
let selectOne;
let selectTwo;

/**
 * SOLO FALTA PINTAR EL NÚMERO MÁXIMO DE DIAS DEL MES
 */

function start() {
    schedule = document.getElementById("schedule");
    paintMonth();
    paintCalendar();
    paintDays();
    refillSelectMonth();
    refillSelectYear();
    selectOne.addEventListener('change', newDate);
    selectTwo.addEventListener('change', newDate);

}

//Llena el select de los meses (selectOne)
function refillSelectMonth() {
    selectOne = document.getElementById("select_month");
    for (let i = 0; i < 12; i++) {
        selectOne.innerHTML += "<option value='" + i + "' >" + selectMonth(i) + "</option>";
    }
}

//Lena el Select de los Años (selectTwo)
function refillSelectYear() {
    selectTwo = document.getElementById("select_year");
    for (let i = new Date().getFullYear(); i < 2101; i++) {
        selectTwo.innerHTML += "<option value='" + i + "' >" + i + "</option>"
    }
}
//Pinta el nombre del mes del año en el encabezado
function paintMonth() {
    let divMonth = document.getElementById("title")
    month = date.getMonth();
    divMonth.innerText = selectMonth(month);
}
//Pinta el calendario
function paintCalendar() {
    today = date.getDate();
    let totalDays = 42;

    for (i = 0; i < totalDays; i++) {

        if (i + 1 === today + (weekDayActualOne() - 1) && isThisMonth(date)) {
            console.log("wdao:" + weekDayActualOne());
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
    date = new Date(selectTwo.value, selectOne.value, 1);
    console.log("fecha: " + date);
    updateCalendar();
}

//actualiza el calendario
function updateCalendar() {

    if (isThisMonth(date)) {
        date = new Date(selectTwo.value, selectOne.value, new Date().getDate());
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
    console.log("prov: " + prov);
    if (prov === 0) {
        console.log("prov0: " + prov);
        return 7;
    } else {
        return prov;
    }
}

//Esta funcion obtiene los dias que tiene ese mes; Un Date con dia 0 te devuelve el ultimo día del mes anterior!!
function totalDaysMonth(dateParam2){
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
    console.log("today paint days: " + today);
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
    let dateNow = new Date();
    if (dateParam.getMonth() === dateNow.getMonth() && dateParam.getFullYear() === dateNow.getFullYear()) {
        date = new Date();
        return true;
    } else {
        console.log(false);
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