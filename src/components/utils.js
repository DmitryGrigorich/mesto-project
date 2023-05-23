const loading = (isLoading, elementForm, loadingValue, defaultValue) => {
  const button = elementForm.querySelector('.popup__save-button');
  if(isLoading) {
    button.textContent = loadingValue;
  } 
    button.textContent = defaultValue;
}

export { loading }