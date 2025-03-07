import { Configuration, OpenAIApi } from "openai";
import { writeFileSync } from "fs";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const result = await openai.createImage({
    prompt: req.body.animal,
    n: 1,
    size: "1024x1024",
  });

  const url = result.data.data[0].url;
  console.log(url);
}

// // save image to disk

// const imageResult = await fetch(url);
// const blob = await imageResult.blob();
// const buffer = Buffer.from(await blob.arrayBuffer());
// writeFileSync(`./img/${Date.now()}.png`, buffer);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// export default async function (req, res) {
//   const completion = await openai.createCompletion({
//     model: "text-davinci-002",
//     prompt: generatePrompt(req.body.animal),
//     temperature: 0.6,
//   });
//   res.status(200).json({ result: completion.data.choices[0].text });
// }

// function generatePrompt(animal) {
//   const capitalizedAnimal =
//     animal[0].toUpperCase() + animal.slice(1).toLowerCase();
//   return `Suggest three names for an animal that is a superhero.

// Animal: Cat
// Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
// Animal: Dog
// Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
// Animal: ${capitalizedAnimal}
// Names:`;
// }
