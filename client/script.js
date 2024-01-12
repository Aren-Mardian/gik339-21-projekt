const url = "http://localhost:3000/cars";

window.addEventListener("load", fetchData);

function fetchData() {
  fetch(url)
    .then((result) => result.json())
    .then((cars) => {
      if (cars.length > 0) {
        let html = `<ul class="w-3/4 my-3 mx-auto flex flex-wrap gap-2 justify-center">`;
        cars.forEach((user) => {
          html += `
        <li
          class="${
            user.color
          } text-purple-700 p-2 rounded-md border-2 border-purple-700 grid grid-cols-1 gap-3 min-w-150 card-width"> 
          <h4><strong>Märke &amp; modell:</strong> ${user.brandmodel}</h4>
          <h4><strong>Årsmodell:</strong> ${user.yearmodel}</h4>
          <h4><strong>Antal mil:</strong> ${user.mileage}</h4>
          <h4><strong>Reg.nr:</strong> ${user.registrationnumber.toUpperCase()}</h4>
          <h4><strong>För, efternamn:</strong> ${user.firstname} ${
            user.lastname
          }</h4>
          <h4><strong>E-post:</strong> ${user.email}</h4>
          <h4><strong>Telefonnummer:</strong> ${user.phonenumber}</h4>


          <div>
            <button
              class="border hover:bg-white/100 rounded-md bg-white/50 p-2 text-sm mt-5" onclick="setCurrentUser(${
                user.id
              })"> 
              Ändra
            </button>
            <button class="border hover:bg-white/100 rounded-md bg-white/50 p-2 text-sm mt-5" onclick="deleteUser(${
              user.id
            }, '${user.registrationnumber}')">
              Ta bort
            </button>
          </div>
        </li>`;
        });
        html += `</ul>`;

        const listContainer = document.getElementById("listContainer");
        listContainer.innerHTML = "";
        listContainer.insertAdjacentHTML("beforeend", html);
      }
    })
    .catch((error) => {
      // Handle errors in fetching data
      console.error("Error fetching data:", error);
    });
}

function setCurrentUser(id) {
  console.log("current", id);

  fetch(`${url}/${id}`)
    .then((result) => result.json())
    .then((user) => {
      console.log(user);
      userForm.brandmodel.value = user.brandmodel;
      userForm.yearmodel.value = user.yearmodel;
      userForm.mileage.value = user.mileage;
      userForm.registrationnumber.value = user.registrationnumber;
      userForm.color.value = user.color;
      userForm.firstname.value = user.firstname;
      userForm.lastname.value = user.lastname;
      userForm.email.value = user.email;
      userForm.phonenumber.value = user.phonenumber;

      localStorage.setItem("currentId", user.id);
    });
}

function deleteUser(id, registrationNumber) {
  const confirmed = confirm(
    `Are you sure you want to delete the user with registration number ${registrationNumber.toUpperCase()}?`
  );
  if (confirmed) {
    console.log("delete", id);
    fetch(`${url}/${id}`, { method: "DELETE" }).then((result) => fetchData());
  }
}

userForm.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  const serverUserObject = {
    brandmodel: "",
    yearmodel: "",
    mileage: "",
    registrationnumber: "",
    color: "",
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
  };
  serverUserObject.brandmodel = userForm.brandmodel.value;
  serverUserObject.yearmodel = userForm.yearmodel.value;
  serverUserObject.mileage = userForm.mileage.value;
  serverUserObject.registrationnumber = userForm.registrationnumber.value;
  serverUserObject.color = userForm.color.value;
  serverUserObject.firstname = userForm.firstname.value;
  serverUserObject.lastname = userForm.lastname.value;
  serverUserObject.email = userForm.email.value;
  serverUserObject.phonenumber = userForm.phonenumber.value;

  const id = localStorage.getItem("currentId");
  if (id) {
    serverUserObject.id = id;
  }

  const request = new Request(url, {
    method: serverUserObject.id ? "PUT" : "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(serverUserObject),
  });

  fetch(request).then((response) => {
    fetchData();

    localStorage.removeItem("currentId");
    userForm.reset();
  });
}

const exampleModal = document.getElementById("exampleModal");
if (exampleModal) {
  exampleModal.addEventListener("show.bs.modal", (event) => {
    // Update the modal's content.
    const modalTitle = exampleModal.querySelector(".modal-title");
    modalTitle.textContent = "Bil detaljer";

    const brandmodelValue = document.getElementById("brandmodelInput").value;
    const yearmodelValue = document.getElementById("yearmodelInput").value;
    const mileageValue = document.getElementById("mileageInput").value;
    const registrationnumberValue = document.getElementById(
      "registrationnumberInput"
    ).value;
    const firstnameValue = document.getElementById("firstnameInput").value;
    const lastnameValue = document.getElementById("lastnamelInput").value;
    const emailValue = document.getElementById("emailInput").value;
    const phonenumberValue = document.getElementById("phonenumberInput").value;

    const modalgrej = exampleModal.querySelector(".modal-grejen");
    const htmlContent = `
    <p><strong>Märke & modell:</strong> ${brandmodelValue}<br>
    <strong>Årsmodell:</strong> ${yearmodelValue}<br>
    <strong>Antal mil:</strong> ${mileageValue}<br>
    <strong>Reg.nr:</strong> ${registrationnumberValue.toUpperCase()}<br>
    <strong>För och efternamn:</strong> ${firstnameValue} ${lastnameValue}<br>
    <strong>E-postadress:</strong> ${emailValue}<br>
    <strong>Telefonnummer:</strong> ${phonenumberValue}</p>
    `;

    modalgrej.innerHTML = htmlContent;
  });
}
