document.getElementById("submit").addEventListener("click", function () {
  const textarea = document.getElementById("textarea");
  const text = textarea.value;
  const preloader = document.getElementById("preloader");
  preloader.style.display = "block";
  n.style.display = 'none';
  const data = {
    text: text,
  };

  fetch("https://kruase.serveo.net/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      preloader.style.display = "none";
      n.style.display = 'inline';
      if (response.ok) {
        return response.json();
      } else {
        console.log(data);
        throw new Error("err");
      }
    })
    .then((data) => {
      console.log(data);
      const containerA = document.getElementById("resultDiv");
      openModal();

      function createDiv(item, container) {
        const div = document.createElement("div");
        const topic = document.createElement("p");
        const text = document.createElement("p");
        const topicGroup = document.createElement("p");
        const executor = document.createElement("p");
        topicGroup.textContent = `Группа тем: ${item["topic_group"]}`;
        topic.textContent = `Тема: ${item.topic}`;
        text.textContent = `Ваше обращение: ${item.text}`;
        executor.textContent = `Спасибо за обращение, оно передано в ${item.executor} для дальнейшей работы`
        div.appendChild(executor)
        div.appendChild(topicGroup);
        div.appendChild(topic);
        div.appendChild(text);


        container.appendChild(div);

        text.classList.add("te");
        topic.classList.add("te");
        topicGroup.classList.add("te");
      }
      createDiv(data, containerA);


    })
    .catch((error) => {
      preloader.style.display = "none";
      n.style.display = 'inline';
      console.error(error);
    });
  function openModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "block";
  }
  function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
    location.reload();
  }
  document.getElementById("closeModal").addEventListener("click", function () {
    closeModal();
  });

});
const fileInput = document.getElementById("file-input");
const buttonTextElement = document.getElementById("button-text");
const fileNameElement = document.getElementById("file-name");
const airplaneIcon = document.getElementById("airplane-icon");
const airButton = document.getElementById("airButton");
const n = document.getElementById('n')

fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];
  if (file) {
    buttonTextElement.style.display = "none";
    fileNameElement.textContent = file.name;
    airplaneIcon.style.display = "inline";
    airButton.style.display = 'inline';
  } else {
    buttonTextElement.style.display = "inline";
    fileNameElement.textContent = "";
    airplaneIcon.style.display = "none";
  }
});

airplaneIcon.addEventListener("click", function () {
  const file = fileInput.files[0];
  if (file) {
    const formData = new FormData();
    formData.append("file", file);
    const preloader = document.getElementById("preloader");
    preloader.style.display = "block";
    n.style.display = 'none';
    fetch("https://kruase.serveo.net/file", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        preloader.style.display = "none";
        n.style.display = 'inline';
        if (response.ok) {
          return response.blob();
        } else {
          console.log(response);
          throw new Error("err");
        }
      })
      .then((blobData) => {
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blobData);
        downloadLink.download = file.name;
        downloadLink.click();
        URL.revokeObjectURL(downloadLink.href);
      })
      .catch((error) => {
        preloader.style.display = "none";
        n.style.display = 'inline';
        console.error(error);
      });
  }
});

window.addEventListener('load', () => {
  const url = 'https://kruase.serveo.net/history';
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  fetch(url, options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const a = document.getElementById("Лысьвенский городской округ");
      const les = data.filter(item => item.executor == a.id);
      const b = document.getElementById("Министерство социального развития ПК");
      const soch = data.filter(item => item.executor == b.id);
      const c = document.getElementById("Город Пермь");
      const gperm = data.filter(item => item.executor == c.id);
      const d = document.getElementById("Министерство здравоохранения");
      const zdrav = data.filter(item => item.executor == d.id);
      const e = document.getElementById("АО ПРО ТКО");
      const tko = data.filter(item => item.executor == e.id);
      const f = document.getElementById("Министерство образования");
      const obr = data.filter(item => item.executor == f.id);
      const g = document.getElementById("ИГЖН ПК");
      const igzn = data.filter(item => item.executor == g.id);
      const h = document.getElementById("Бардымский муниципальный округ Пермского края");
      const bard = data.filter(item => item.executor == h.id);
      const i = document.getElementById("Александровский муниципальный округ Пермского края");
      const alex = data.filter(item => item.executor == i.id);
      const j = document.getElementById("Губахинский городской округ");
      const gub = data.filter(item => item.executor == j.id);

      function createDiv(item, container) {
        const div = document.createElement("div");
        const topic = document.createElement("p");
        const text = document.createElement("p");
        const topicGroup = document.createElement("p");
        topicGroup.textContent = `Группа тем: ${item["topic_group"]}`;
        topic.textContent = `Тема: ${item.topic}`;
        text.textContent = `Текст обращения: ${item.text}`;
        div.appendChild(topicGroup);
        div.appendChild(topic);
        div.appendChild(text);

        container.appendChild(div);
        div.classList.add("my-div");
        text.classList.add("te");
        topic.classList.add("te");
        topicGroup.classList.add("te");
      }

      if (les.length > 0) {
        les.forEach(item => {
          createDiv(item, a);
        });
      }
      if (soch.length > 0) {
        soch.forEach(item => {
          createDiv(item, b);
        });
      }
      if (gperm.length > 0) {
        gperm.forEach(item => {
          createDiv(item, c);
        });
      }
      if (zdrav.length > 0) {
        zdrav.forEach(item => {
          createDiv(item, d);
        });
      }
      if (tko.length > 0) {
        tko.forEach(item => {
          createDiv(item, e);
        });
      }
      if (obr.length > 0) {
        obr.forEach(item => {
          createDiv(item, f);
        });
      }
      if (igzn.length > 0) {
        igzn.forEach(item => {
          createDiv(item, g);
        });
      }
      if (gub.length > 0) {
        gub.forEach(item => {
          createDiv(item, j);
        });
      }
      if (alex.length > 0) {
        alex.forEach(item => {
          createDiv(item, i);
        });
      }
      if (bard.length > 0) {
        bard.forEach(item => {
          createDiv(item, h);
        });
      }
    })
    .catch(error => {
      console.error(error);
    });
});