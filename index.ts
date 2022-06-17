const Fula = require("@functionland/fula");

const { createClient } = require('@functionland/fula')
const wrtc = require('wrtc')

const boxPeerId = "QmPyYuJ8qKr9URS6tHvafhXNdkq8owmN5n5KixC57V8cjn"

const readQuery = `
        query {
        read(input:{
            collection:"download",
            filter:{}
        }){
            id
            title
            url
            dirs
        }
        } 
      `

const main = async () => {
  const fulaClient = await createClient({ wrtc });
  const conn = fulaClient.connect(boxPeerId)

  conn.on("status", async (res) => {
    if (res === Fula.Status.Online) {
      const downloads = fulaClient.graphqlSubscribe(readQuery);
      for await (const downloadObject of downloads){
        console.log({downloadObject: downloadObject.data.read})
      }
    }
  })
}

main()