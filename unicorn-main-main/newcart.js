const cart = document.getElementById("cart");

async function decreaseQuantity(itemId) {
  const quantityElement = document.getElementById(`quantity${itemId}`);
  let currentQuantity = parseInt(quantityElement.textContent);
  
  if(currentQuantity >= 1){
    quantityElement.textContent = currentQuantity - 1;
  }

  await axios
    .post("https://unicorn-backend-new.vercel.app/get-single-item", {
      itemIndex: itemId,
      loginId: localStorage.getItem("loginId"),
    })
    .then(async (res) => {
      if (currentQuantity > 1) {
        console.log(res.data);
        await axios
          .post("https://unicorn-backend-new.vercel.app/update-cart", {
            itemId: res.data[0]._id,
            amount: (currentQuantity - 1).toString(),
          })
          .then(async (res) => {
            console.log(res);
            const getUrl =
              "https://unicorn-backend-new.vercel.app/get-cart-items";

            const getData = {
              loginId: localStorage.getItem("loginId"),
            };

            await axios
              .post(getUrl, getData)
              .then((res) => {
                let price = 0;
                document.getElementById("badge").innerHTML = res.data.length;
                document.getElementById("totalItem").innerHTML =
                  "Total Items: " + res.data.length;
                res.data.forEach((item) => {
                  price += parseInt(item.productPrice) * parseInt(item.amount);
                });
                document.getElementById("cartTotal").innerHTML =
                  "Total price: Rs" + price;
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        await axios
          .post("https://unicorn-backend-new.vercel.app/delete-cart-item", {
            itemId: res.data[0]._id,
          })
          .then(async (res) => {
            console.log(res);
            const getUrl =
              "https://unicorn-backend-new.vercel.app/get-cart-items";

            const getData = {
              loginId: localStorage.getItem("loginId"),
            };
            await axios
              .post(getUrl, getData)
              .then((res) => {
                let price = 0;
                document.getElementById("badge").innerHTML = res.data.length;
                document.getElementById("totalItem").innerHTML =
                  "Total Items: " + res.data.length;
                res.data.forEach((item) => {
                  price += parseInt(item.productPrice) * parseInt(item.amount);
                });
                document.getElementById("cartTotal").innerHTML =
                  "Total price: Rs" + price;
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
}

async function increaseQuantity(itemId) {
  const quantityElement = document.getElementById(`quantity${itemId}`);
  let currentQuantity = parseInt(quantityElement.textContent);
  quantityElement.textContent = currentQuantity + 1;

  await axios
    .post("https://unicorn-backend-new.vercel.app/get-single-item", {
      itemIndex: itemId,
      loginId: localStorage.getItem("loginId"),
    })
    .then(async (res) => {
      console.log(res.data);
      await axios
        .post("https://unicorn-backend-new.vercel.app/update-cart", {
          itemId: res.data[0]._id,
          amount: (currentQuantity + 1).toString(),
        })
        .then(async (res) => {
          console.log(res);
          const getUrl =
            "https://unicorn-backend-new.vercel.app/get-cart-items";

          const getData = {
            loginId: localStorage.getItem("loginId"),
          };

          await axios
            .post(getUrl, getData)
            .then((res) => {
              let price = 0;
              document.getElementById("badge").innerHTML = res.data.length;
              document.getElementById("totalItem").innerHTML =
                "Total Items: " + res.data.length;
              res.data.forEach((item) => {
                price += parseInt(item.productPrice) * parseInt(item.amount);
              });
              document.getElementById("cartTotal").innerHTML =
                "Total price: Rs" + price;
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
}

window.onload = async () => {
  const getUrl = "https://unicorn-backend-new.vercel.app/get-cart-items";

  const getData = {
    loginId: localStorage.getItem("loginId"),
  };

  await axios
    .post(getUrl, getData)
    .then((res) => {
      let price = 0;
      document.getElementById("badge").innerHTML = res.data.length;
      document.getElementById("totalItem").innerHTML =
        "Total Items: " + res.data.length;
      console.log();
      res.data.forEach((item) => {
        price += parseInt(item.productPrice) * parseInt(item.amount);
        const itemElement = document.createElement("div");
        itemElement.className = "item";
        itemElement.innerHTML = `
                  <img src="${item.productImage[0]}" alt="${item.name}">
                  <div class="item-info">
                    <span>Name: ${item.productName}</span>
                    <span>Price: Rs. ${item.productPrice}</span>
                    <div class="quantity">
                        <button onclick="decreaseQuantity(${item.itemIndex})">-</button>
                        <span id="quantity${item.itemIndex}">${item.amount}</span>
                        <button onclick="increaseQuantity(${item.itemIndex})">+</button>
                    </div>
                  </div>
                `;
        cart.appendChild(itemElement);
      });
      document.getElementById("cartTotal").innerHTML =
        "Total price: Rs" + price;
    })
    .catch((err) => {
      console.log(err);
    });
};

async function placeOrder() {
  const getData = {
    loginId: localStorage.getItem("loginId"),
  };

  // await axios
  //   .post("https://unicorn-backend-new.vercel.app/get-cart-items", getData)
  //   .then((final) => {
  //     console.log(final);
  //     final?.data?.map(async (item, index) => {
  //       await axios
  //       .post("https://unicorn-backend-new.vercel.app/delete-cart-item", {
  //         itemId: item._id,
  //       }).then(res => {
  //         console.log(res)
  //       }).catch(err => {
  //         console.log(err)
  //       })
  //     })
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  window.location = "https://6447424db50a4d5abaaceac9--fluffy-zabaione-3a51b8.netlify.app/";
}
