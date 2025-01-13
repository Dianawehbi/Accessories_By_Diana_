function getcategories() {
    // This function displays the available categories
    // On clicking a category, the product grid will refresh with specific category products
    document.getElementById("categories").innerHTML = "";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "json/categories.json", true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const categories = JSON.parse(xhr.responseText);
                categories.forEach(category => {
                    const categoryHTML = `
                        <div class="category">
                            <button onclick="getProducts('${category.name}')">
                                <img src="images/assets/categories/${category.image}" alt="${category.altText}" class="category-image">
                                <p class="category-title">${category.name}</p>
                            </button>
                        </div>
                    `;
                    document.getElementById("categories").innerHTML += categoryHTML;
                });
            } else {
                console.error("Failed to fetch categories. HTTP Status:", xhr.status);
            }
        }
    };
    xhr.send();
}
function getProducts(categ) {
    // Clear the product grid
    document.getElementById("productGrid").innerHTML = "";
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "json/products.json", true);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                const products = JSON.parse(xhr.responseText);

                products.forEach(product => {
                    if (product.category.includes(categ)) {
                        const productCard = `
                        <div class="product-card">
                            <img src="images/product/${product.image}" alt="${product.name}">
                            <h3>${product.name}</h3>
                            <p>${product.price}</p>
                            <p>${product.description}</p>
                            <button>Add to Cart</button>
                        </div>
                        `;
                        document.getElementById("productGrid").innerHTML += productCard;
                    }
                });

                // Initialize horizontal scrolling
            } else {
                console.error("Failed to fetch products. HTTP Status:", xhr.status);
            }
        }
    };
    xhr.send();
}


// Initialize categories
getcategories();

// Initialize products
getProducts("Men");
