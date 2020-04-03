const recipes = document.querySelector('.recipes');

document.addEventListener('DOMContentLoaded', function() {
  // nav menu
  const menus = document.querySelectorAll('.side-menu');
  M.Sidenav.init(menus, { edge: 'right' });
  // add recipe form
  const forms = document.querySelectorAll('.side-form');
  M.Sidenav.init(forms, { edge: 'left' });
});

// Render recipes data
const renderRecipe = (data, id) => {
  const htmlTemplate = `
        <div class="card-panel recipe white row" data-id="${id}">
          <img src="/img/dish.png" alt="recipe thumb" />
          <div class="recipe-details">
            <div class="recipe-title">${data.title}</div>
            <div class="recipe-ingredients">${data.ingredients}</div>
            <div class="recipe-shop">
            <p>Ingredients from <span>${data.shop}</span></p>
            </div>
          </div>
          <div class="recipe-delete">
            <i class="material-icons" data-id="${id}">delete_outline</i>
          </div>
        </div>
  `;
  recipes.innerHTML += htmlTemplate;
};

// Remove recipe from DOM
const removeRecipe = id => {
  const recipe = document.querySelector(`.recipe[data-id=${id}]`);

  recipe.remove();
};
