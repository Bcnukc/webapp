document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("btn").addEventListener("click", sendReq);
});
sendReq = async () => {
  let payload = [];
  const requestUrl = "/read";

  for (let i = 0; i < 5; i++) {
    payload.push({ id: i, message: `Payload Message: ${i}\n` });
  }
  const response = await fetch(requestUrl, {
    method: "POST",
    body: document.getElementById("input").value,
    headers: {
      "Content-Type": "application/json",
    },
  });
  document.getElementById("msg").textContent = response.statusText;
  document.getElementById("body").innerHTML = await response.text();
};
