const setBtn = document.querySelector(".setBtn");
const loader = document.querySelector(".loader");
let alertbox = document.querySelector(".alert");
const exitbtn = document.querySelector(".closebtn");

////////function Myalert to not block the page

const showMyAlert = function (msg) {
  let alertmsg = document.querySelector(".errormsg");
  alertmsg.innerHTML = msg;
  alertbox.classList.remove("display");
  setTimeout(function () {
    alertbox.classList.add("display");
  }, 1000);
};

// async function sendData(path, data) {
//   const res = await fetch(path, {
//     method: "post",
//     headers: new Headers({
//       "Content-Type": "application/json",
//     }),
//     body: JSON.stringify(data),
//   });
//   const data1 = await res.json();
// }
// exit button
exitbtn.addEventListener("click", function () {
  alertbox.classList.add("display");
});

setBtn.addEventListener("click", () => {
  const firstName = document.querySelector(".firstName").value;
  const lastName = document.querySelector(".lastName").value;
  const filiere = document.querySelector("#filiere").value;
  const niveauStr = document.querySelector("#niveau").value;
  let niveau;
  const matches = niveauStr.match(/(\d+)/);

  if (matches) {
    niveau = parseInt(matches[0]);
  }
  const matiere = document.querySelector(".matiere").value;
  const salle = document.querySelector(".salle").value;
  let date = document.querySelector(".date").value;
  date = Date.parse("06-30-2022");
  date = new Date(date);
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let jour = weekday[date.getDay()];
  const debut = document.querySelector(".debut").value;
  const fin = document.querySelector(".fin").value;

  if (
    !firstName ||
    !lastName ||
    !niveauStr ||
    !filiere ||
    !matiere ||
    !salle ||
    !jour ||
    !debut ||
    !fin
  ) {
    showMyAlert("Please fill all fields");
  } else {
    let data = [
      firstName,
      lastName,
      filiere,
      niveau,
      matiere,
      salle,
      jour,
      debut,
      fin,
    ];
    fetch("/admin/setPlanning", {
      method: "post",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({
        data: data,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
    loader.classList.remove("display");
    setTimeout(() => {
      loader.classList.add("display");
      document.querySelector(".matiere").value = "";
      document.querySelector(".salle").value = "";
      document.querySelector(".date").value = "";
      document.querySelector(".debut").value = "";
      document.querySelector(".fin").value = "";
      document.querySelector(".prof").value = "";
    }, 1000);
    // const d= await fetch("/admin/setPlanning", {
    //   method: "post",
    //   headers: new Headers({ "Content-Type": "application/json" }),
    //   body: JSON.stringify({
    //     data: data,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   });

    // const res= await fetch("/admin/setPlanning", {
    //   method: "post",
    //   headers: new Headers({ "Content-Type": "application/json" }),
    //   body: JSON.stringify({
    //     data: data,
    //   }),
    // });
    // const d = res.json();
    // fetch("/admin/setPlanning", {
    //   method: "post",
    //   headers: new Headers({ "Content-Type": "application/json" }),
    //   body: JSON.stringify({
    //     data: d.data,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //   });
  }
});