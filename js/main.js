function MainModule(listingsID = "#listings") {
  const me = {};

  // there are 523 listings in json document

  const listingsElement = document.querySelector(listingsID);

  function getListingCode(listing) {
    const amenities_array = JSON.parse(listing.amenities);

    return `<div class="col-4">
  <div class="listing-card">
    <img
      src="${listing.picture_url}"
      class="card-img-top"
      alt="Image of Listing"
    />
    <div class="card-body">
      <h2 class="card-title">${listing.name}</h2>
      <div> <p> <u> <b> Price:</b> </u> ${listing.price}</p></div>
      <p class="card-text">
        <u> <b> Description:</b> </u>
        ${listing.description}
      </p>

      <b> <u> Amenities: </u></b>
      <ul> 
        ${amenities_array.map((a) => `<li> ${a} </li>`).join("")}
      </ul>



      <h3> Host Info </h3>
      <div> <p> <u> <b> Name:</b> </u> ${listing.host_name}</p></div>
       <div> <p> <u> <b> Image:</b> </u>
       <img src="${listing.host_thumbnail_url}" alt="thumbnail image"/>
      </p>
       </div>

      <h3> Reviews </h3>
      <div> <p> <u> <b> Overall Rating:</b> </u> ${listing.review_scores_rating ?? "No rating yet"} ⭐</p></div>
      <div> <p> <u> <b> Total Reviews:</b> </u> ${listing.number_of_reviews ?? 0}</p></div>
      <ul class="review-rating">
        <li> Cleanliness: ${listing.review_scores_cleanliness ?? "N/A"}</li>
        <li> Location: ${listing.review_scores_location ?? "N/A"}</li>
        <li> Communication: ${listing.review_scores_communication ?? "N/A"}</li>
        <li> Value: ${listing.review_scores_value ?? "N/A"}</li>
      </ul>

      <a href="${listing.listing_url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
  <!-- /card -->
  </div>

  `;
  }

  function redraw(listings) {
    listingsElement.innerHTML = "";
    // for (let i = 0; i < listings.length; i++) {
    //   listingsElement.innerHTML += getListingCode(listings[i]);
    // }

    // for (let listing of listings) {
    //   console.log("listing", listing );
    //   listingsElement.innerHTML += getListingCode(listing);
    // }

    listingsElement.innerHTML = listings.map(getListingCode).join("\n");
  }

  async function loadData() {
    // fetch the data from sf listings json
    try {
      const res = await fetch("./airbnb_sf_listings_500.json");
      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }
      // parse it for json data
      const listings = await res.json();

      // draw the card listings
      me.redraw(listings.slice(0, 50));
    } catch (err) {
      console.error("Failed to load listings:", err);
    }
  }

  // everything in inside this factory function is private by default
  // but whatever attqached to 'me' is public
  me.redraw = redraw;
  me.loadData = loadData;

  return me;
}

const main = MainModule();

main.loadData();
