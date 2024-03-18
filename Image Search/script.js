const searchForm = document.getElementById("search-form"); // complete-form
const searchBox = document.getElementById("search-box"); // get complete input field
const searchResult = document.getElementById("serach-result"); // only div part
const showMoreBtn = document.getElementById("show-more-btn"); // only btn part

const accesskey = "4C1ecMCDO_58UqGvuuixJNv8rLnRaCHeQE08ywPJbjE";

let keyword = "";
let page = 1;

async function searchImage() {
  keyword = searchBox.value;
  
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=12`;

  const response = await fetch(url); // fetch the string data.
  const data = await response.json(); // converted into json (object form)
  

  if (page === 1) {
    searchResult.innerHTML = "";
  }

  const results = data.results;
  

  results.map((result) => {
    // it will run for each element of array.
    const image = document.createElement("img");
    image.src = result.urls.small;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";

    // place image inside a tag.
    imageLink.appendChild(image);
    searchResult.appendChild(imageLink);
  });
  showMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent default features when we open page
  page = 1;
  searchImage();
});

showMoreBtn.addEventListener("click", () => {
  page++;
  searchImage();
});
