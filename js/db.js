// Offline data
db.enablePersistence().catch(err => {
  if (err.code === 'failed-precondition') {
    // Probably multiple tabs open at once
    console.log('persistence failed');
  } else if (err.code == 'unimplemented') {
    // Lack of browser support
    console.log('persistence is not available');
  }
});

// Real time listener
db.collection('recipes').onSnapshot(snapshot => {
  //   console.log(snapshot.docChanges());

  snapshot.docChanges().forEach(change => {
    // console.log(change, change.doc.data(),change.doc.id);

    if (change.type === 'added') {
      // Add document data to UI

      renderRecipe(change.doc.data(), change.doc.id);
    }

    if (change.type === 'removed') {
      // Remove document data from UI
    }
  });
});
// alert('Error 💥')

// Add new recipe
const form = document.querySelector('.add-recipe-form');
form.addEventListener('submit', evt => {
  evt.preventDefault();

  const recipe = {
    title: form.title.value,
    ingredients: form.ingredients.value,
    shop: form.shop.value
  };

  db.collection('recipes')
    .add(recipe)
    .catch(err => console.log(err));

  form.title.value = '';
  form.ingredients.value = '';
  form.shop.value = '';
});
