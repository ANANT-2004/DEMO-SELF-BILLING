const login = async () => {
  const getUrl = "https://unicorn-backend-new.vercel.app/login";

  const getData = {
    email: document.getElementById("l_email").value,
    password: document.getElementById("l_pass").value,
  };

  const jsonData = JSON.stringify(getData);

  const headers = {
    "Content-Type": "application/json",
  };

  //   const response = await fetch(getUrl, {
  //     method: "POST",
  //     headers: headers,
  //     body: jsonData,
  //   }).then((res) => {
  //     console.log(res);
  //   });
  axios
    .post(getUrl, getData)
    .then((res) => {
      localStorage.setItem("loginId", res?.data?.data?.user?.id);
      window.location = 'index.html'
    })
    .catch((err) => {
      console.log(err);
    });
};

const signup = async () => {
  const getUrl = "https://unicorn-backend-new.vercel.app/signup";

  const getData = {
    email: document.getElementById("s_email").value,
    password: document.getElementById("s_pass").value,
  };

  const jsonData = JSON.stringify(getData);

  const headers = {
    "Content-Type": "application/json",
  };

  axios
    .post(getUrl, getData)
    .then((res) => {
      window.location = 'login.html'
    })
    .catch((err) => {
      console.log(err);
    });
};
