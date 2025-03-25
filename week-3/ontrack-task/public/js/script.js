$(document).ready(function () {
  $(".modal").modal();
  $(".materialboxed").materialbox();

  // Sample items array (this can come from an API in the future)
  let items = [
    {
      name: "Laptop",
      description: "A high-end laptop for trading.",
      details: "Brand: Dell XPS 13, Core i7, 16GB RAM, 512GB SSD.",
      image: "images/laptop.jpg",
    },
    {
      name: "Bicycle",
      description: "Mountain bike available for exchange.",
      details: "Model: Giant Talon 1, 27.5-inch wheels, 18-speed.",
      image: "images/bicycle.jpg",
    },
    {
      name: "Guitar",
      description: "Acoustic guitar in great condition.",
      details: "Yamaha F310, Steel Strings, Excellent Sound.",
      image: "images/guitar.jpg",
    },
  ];

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

  // Generate initial cards
  generateCards();

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

    // Add to items array and regenerate cards
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
