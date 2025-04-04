function fetchData() {
  const category = document.getElementById("category").value;
  const id = document.getElementById("id").value;
  const result = document.getElementById("result");
  const error = document.getElementById("error");
  const loading = document.getElementById("loading");

  // Сбрасываем предыдущие данные
  result.innerHTML = "";
  error.textContent = "";
  loading.style.display = "block";

  const url = `https://swapi.py4e.com/api/${category}/${id}/`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      loading.style.display = "none";

      // Преобразуем данные в читаемый формат
      let output = "<h2>Результаты:</h2><ul>";
      for (let key in data) {
        if (typeof data[key] === "string" && !data[key].includes("http")) {
          output += `<li><strong>${key}:</strong> ${data[key]}</li>`;
        }
      }
      output += "</ul>";
      result.innerHTML = output;
    })
    .catch((err) => {
      loading.style.display = "none";
      error.textContent = err === "Failed to fetch" ? "Сервер недоступен" : err;
    })
    .finally(() => {
      loading.style.display = "none";
    });
}
