export const createTitle = (title) => {
  const element = document.createElement("h2");
  element.textContent = title;
  element.addEventListener("click", () => {
    alert(title);
  });
  return element;
};
