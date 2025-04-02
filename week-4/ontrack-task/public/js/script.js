const getItems = (callback) => {
  $.get("/api/items", (response) => {
    if (response.statusCode == 200) {
      items = response.data;
      callback(); // generateCards() after loading data
    }
  });
};

// Function to generate cards dynamically
function generateCards() {
  let cardSection = $("#card-section");
  cardSection.empty(); // Clear previous cards

  items.forEach((item) => {
    let cardHtml = `
            <div class="col s12 m4">
                <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator" src="${item.image}" alt="${item.name}">
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

// Load data and then generate cards
$(document).ready(function () {
  $(".modal").modal();
  $(".materialboxed").materialbox();

  getItems(generateCards); //Ensures cards are generated after API call

  // Handle new item submission
  $("#add-item-form").submit(function (event) {
    event.preventDefault();
    let name = $("#name").val();
    let description = $("#description").val();
    let image = $("#image").val();
    let newItem = {
      name: name,
      description: description,
      details: "Newly added item details.",
      image: image,
    };

    // Add new item and regenerate cards
    items.push(newItem);
    generateCards();

    // Clear form fields
    $("#name").val("");
    $("#description").val("");
    $("#image").val("");
    M.updateTextFields(); // Update Materialize labels
    $(".modal").modal("close"); // Close modal
  });
});
