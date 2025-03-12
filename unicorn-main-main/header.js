async function query(filename) {
  //   const data = fs.readFileSync(filename);
  const response = await fetch(
    "https://api-inference.huggingface.co/models/microsoft/resnet-18",
    {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: filename,
    }
  );
  const result = await response.json();
  return result;
}

async function getOutput(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2",
    {
      headers: {
        Authorization: "Bearer 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",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
  
}

async function handleUpload() {
  let photo = document.getElementById("fileUpload").files[0];
  console.log(photo);
  

  let formData = new FormData();
  formData.append("photo", photo);

  //   const data = fs.readFileSync(photo);

  //   await axios.post('https://api-inference.huggingface.co/models/facebook/detr-resnet-101-dc5', {
  //     photo
  //   }).then(res => {
  //     console.log(res.data)
  //   }).catch(err => {
  //     console.log(err)
  //   })

  query(photo).then((response) => {
    const prodNames = [];
    console.log(response);
    const names = response?.map((item) => {
      return item.label;
    });
    console.log(names);
    axios
      .get("https://5d76bf96515d1a0014085cf9.mockapi.io/product")
      .then((res) => {
        res?.data?.map(async (item) => {
          console.log(res.data)
          for(let i = 0; i < names.length; i++){
            for(let j = 0; j < names[i].split(" ").length; j++){
              if(item?.name?.toLowerCase().includes(names[i].split(" ")[j]?.toLowerCase()) || item?.description?.toLowerCase().includes(names[i].split(" ")[j]?.toLowerCase())){
                // alert('Found One')
                // console.log(item)
                // console.log(names[i])
                window.location = "contentDetails.html?" + item.id
                break
              }
            }
          }
          // getOutput({
          //   inputs: {
          //     question: "What is the product",
          //     context: item.description,
          //   },
          // }).then((response) => {
          //   prodNames.push(response);
          //   console.log(prodNames);
          // });
        });
      });
  });
}

function takeToVr() {
  window.location = "https://653267ab5e3448009aa77d40--bejewelled-quokka-8ef411.netlify.app/"
}