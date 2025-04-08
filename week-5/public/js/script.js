let items = [];

const getItems = (callback) => {
  $.get("/api/items", (response) => {
    if (response.statusCode == 200) {
      items = response.data;
      callback();
    }
  });
};

function generateCards() {
  let cardSection = $("#card-section");
  cardSection.empty();

  items.forEach((item) => {
    let cardHtml = `
      <div class="col s12 m4">
        <div class="card medium">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="${item.image}" alt="${item.name}" style="object-fit: cover; height: 200px;">
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">${item.name}
              <i class="material-icons right">more_vert</i>
            </span>
            <p>${item.description}</p>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">${item.name}
              <i class="material-icons right">close</i>
            </span>
            <p>${item.details}</p>
          </div>
        </div>
      </div>
    `;
    cardSection.append(cardHtml);
  });
}

$(document).ready(function () {
  $(".modal").modal();
  $(".materialboxed").materialbox();

  getItems(generateCards);

  $("#add-item-form").submit(function (event) {
    event.preventDefault();

    let newItem = {
      name: $("#name").val(),
      description: $("#description").val(),
      details: "Newly added item details.",
      image: $("#image").val(),
    };

    // Send data to backend
    $.post("/api/add-item", newItem, (response) => {
      if (response.statusCode === 200 || response.message.includes("success")) {
        getItems(generateCards); // Reload from DB after new item is saved
        $("#add-item-form")[0].reset();
        M.updateTextFields();
        $(".modal").modal("close");
      } else {
        alert("Error adding item.");
      }
    });
  });
});
