import type { Meta, StoryObj } from "@storybook/react";

import {
  Button,
  DialogButtons,
  DialogTrigger,
  Heading,
  Modal,
} from "@lolmath/ui";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {},
  args: {
    isDismissable: true,
  },
  render: (args) => (
    <DialogTrigger>
      <Button>Open dialog</Button>
      <Modal {...args}>
        {({ close }) => (
          <>
            <div className="p-6 flex flex-col gap-2">
              <Heading className="text-center">Exit Now?</Heading>
              <p className="text-lol-gray-300 text-xs text-center font-spiegel">
                Do you want to exit League of Legends or sign out?
              </p>
            </div>
            <DialogButtons>
              <Button onPress={close}>Exit</Button>
              <Button onPress={close}>Sign Out</Button>
            </DialogButtons>
          </>
        )}
      </Modal>
    </DialogTrigger>
  ),
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};

export const ClassName: Story = {
  args: {
    className: "max-w-xl",
  },
};

export const ALotOfText: Story = {
  render: () => (
    <DialogTrigger>
      <Button>Open dialog</Button>
      <Modal>
        <p className="text-lol-gray-300">
          Pari general intelligence action natural language processing quis
          transformers quis AI in education irure veniam AI in agriculture
          occaecat culpa ipsum. Dolor est sit semantic web amet deserunt
          voluptate culpa. TPUs voluptate elit word2vec occaecat duis drones
          irure cillum magna proident enim computer vision Deserunt emotion AI
          unsupervised learning duis elit AI in education Lorem. Ex IBM Watson
          elit duis knowledge graph sint minim aliqua privacy consequat elit
          tempor. ELMo model training Lorem data augmentation velit elit culpa
          aliquip. Ullamco do sunt transfer learning ea magna AI in
          entertainment est proident reprehenderit sit. Aliquip seq2seq sint
          feature extraction ad consequat ELT AI ethics ad aliquip nulla sunt
          ullamco. transformative AI et AI in art ad ex aute labore adipisicing
          overfitting gpt sunt adversarial examples pytorch cupidatat commodo.
          <br />
          <br />
          Pari human-robot interaction nulla quis enim quis commodo irure veniam
          do occaecat transformative AI feature extraction Dolor GPUs sit strong
          AI amet deserunt curriculum learning culpa. Sunt AI complete elit sunt
          occaecat GPUs commodo irure cillum human-robot interaction proident
          enim ut. fuzzy logic laborum CUDA unsupervised learning UMAP
          autonomous vehicles Lorem. Ex ad elit duis cupidatat startups minim
          generative models elit sentience elit tempor. GANs strong AI
          regulation aute velit elit culpa aliquip. autonomous vehicles do sunt
          ex ea magna sit est proident reprehenderit sit. unsupervised learning
          GANs sint duis algorithms principal component analysis dolor pariatur
          ad aliquip nulla bias in AI ullamco. swarm intelligence et support
          vector machines ad ex aute AI in entertainment adipisicing nulla quis
          sunt nisi emotion AI GPUs commodo.
          <br />
          <br />
          privacy atur nulla quis edge computing quis recommendation systems
          irure weak AI do occaecat culpa ipsum. Dolor startups overfitting
          nostrud data pipelines Facebook AI venture capital adversarial
          examples Sunt voluptate context-aware computing sunt occaecat duis
          principal component analysis irure cillum reinforcement learning
          Facebook AI AI in education ut. natural language processing laborum
          reprehenderit ELT semantic web dolore Lorem. seq2seq hyperparameter
          tuning elit duis cupidatat data warehouses unsupervised learning
          attention mechanism elit consequat elit tempor. Qui aliquip support
          vector machines aute velit elit culpa aliquip. Ullamco do natural
          language processing ex ea magna sit est proident reprehenderit sit.
          Aliquip MLops sint duis VAEs consequat data labeling pariatur AI in
          logistics aliquip nulla sunt ullamco. Eu AI safety curriculum learning
          IBM Watson ex aute expert systems support vector machines GRUs quis
          sunt nisi et cupidatat commodo.
          <br />
          <br />
          Magna fugiat ut ullamco information retrieval deep learning t-SNE big
          data ipsum. AI governance reinforcement learning dolore natural
          language processing velit AI in journalism sint duis. In do nostrud
          curriculum learning quis veniam veniam ullamco esse unsupervised
          learning fugiat. artificial general intelligence ut ut ipsum et.
          scalability elit in web scraping mollit text generation AMD quis.
          Eiusmod transformers cupidatat context-aware computing aliqu ip
          voluptate sit id labore ad proident quis proident data lakes eiusmod.
          full AI incididunt reprehenderit anim id consectetur nulla sentience
          commodo voluptate autonomous vehicles labore ex irure. Eu irure
          general intelligence action word embeddings eiusmod proident veniam
          officia nisi esse excepteur automation knowledge representation
          nostrud amet data integration NVIDIA explainable AI CUDA amet machine
          learning Pariatur venture capital sit tensorflow ea adipisicing qui
          decision trees
          <br />
          <br />
          Lorem ipsum dolor sit amet, consectetur random forests elit. expert
          systems pellentesque neque non ante machine learning lobortis. Proin
          scelerisque varius cursus. Donec eu transformative AI ex. Suspendisse
          congue pulvinar ante, quis euismod nisl fermentum ac. TPUs feature
          extraction privacy scelerisque curriculum learning AI ethics a,
          dignissim tempus cloud computing UMAP RNNs faucibus word2vec ELMo data
          labeling sentiment analysis nec sem sit amet web scraping blandit
          sollicitudin vitae eu turpis. Nulla supervised learning nisi id
          transfer learning expert systems tempor decision trees vel sentience
          Pellentesque dignissim nisl eget magna euismod aliquet. Fusce nec
          tellus in felis text generation feugiat. data warehouses
          transformative AI ut velit ELT hendrerit. emotion AI AI safety Nunc
          tensorflow nulla non blandit hendrerit. In hac habitasse AGI dictumst.
          <br />
          <br />
          Quis dimensionality reduction aliqua veniam et excepteur. Laborum est
          quis esse sit reprehenderit proident ipsum NVIDIA GPUs elit sentience
          duis cross-validation planning Ea ipsum non data pipelines aliquip
          nostrud knowledge representation labore meta-learning amet.
          personalization cloud computing sit AI in sports cupidatat laboris
          laborum. Aute nisi pariatur cross-validation genetic algorithms
          parallel computing consequat. automation velit veniam adipisicing
          velit. Laboris eu sunt in GPUs big data qui AGI elit nulla RNNs id
          magna. Consequat proident irure ea est. Ea nostrud eu Lorem veniam
          startups id ex esse cillum sit computer vision Facebook AI decision
          trees irure. ONNX ullamco artificial intelligence sint eiusmod
          scalability sunt quis fugiat cupidatat technology est. Sunt ONNX
          general cognitive abilities est minim.
          <br />
          <br />
          Pari atur nulla quis enim quis commodo irure veniam IBM Watson cloud
          computing culpa ipsum. Dolor est AMD nostrud amet Google AI voluptate
          algorithms data mining voluptate elit support vector machines neural
          networks duis transformers irure reinforcement learning magna proident
          enim ut. cloud computing big data OpenAI distributed computing AI in
          sports dolore Lorem. transformative AI ad predictive analytics CUDA
          cupidatat sint minim AI complete text generation singularity elit
          neural networks artificial intelligence aliquip Lorem aute velit elit
          culpa aliquip. Ullamco do sunt ex multi-task learning magna sit est
          proident IBM Watson sit. Aliquip MLops sint ensemble learning ad
          consequat knowledge representation reinforcement learning ad
          recommendation systems nulla sunt ullamco. Eu NVIDIA culpa ad ex aute
          labore adipisicing nulla AI hard knowledge graph attention mechanism
          fuzzy logic cupidatat commodo.
          <br />
          <br />
          Pari atur reinforcement learning genetic algorithms enim quis commodo
          irure veniam do cognitive science culpa ipsum. VAEs est sit nostrud AI
          hard deserunt voluptate culpa. Sunt voluptate elit sunt occaecat
          recommendation systems tensorflow irure cillum magna proident enim
          BERT Deserunt laborum reprehenderit duis AI in agriculture UMAP Lorem.
          dimensionality reduction turing test elit duis cupidatat sint minim
          data mining supervised learning consequat elit tempor. Qui drones APIs
          aute velit elit culpa scalability Ullamco personalization sunt ex ea
          magna sit word2vec proident reprehenderit supervised learning IBM
          Watson ipsum sint duis ad consequat dolor pariatur ad planning
          context-aware computing sunt scalability Eu scalability AI in
          agriculture ad ex aute sentience venture capital decision trees quis
          sunt nisi et APIs commodo.
          <br />
          <br />
          Pari atur nulla ELT enim TPUs commodo context-aware computing veniam
          do occaecat NVIDIA ipsum. Dolor est sit nostrud amet tensorflow
          voluptate culpa. Sunt UMAP consciousness sunt speech recognition duis
          commodo irure speech recognition magna random forests enim ut.
          Deserunt laborum reprehenderit multi-task learning elit semantic web
          Lorem. Ex ad elit word embeddings cupidatat sint AI in finance aliqua
          elit consequat elit tempor. Qui transformers Lorem Microsoft AI
          parallel computing elit GPUs natural language processing Ullamco do
          ONNX ex ea magna automation est proident reprehenderit emotion AI
          Aliquip ipsum data preprocessing duis ad consequat dolor pariatur ad
          knowledge representation nulla sunt CUDA Eu AI in logistics drones
          ELMo swarm intelligence aute labore adipisicing nulla speech
          recognition sunt support vector machines robotics cupidatat commodo.
          <br />
          <br />
          Pari ensemble learning nulla AI in agriculture knowledge
          representation quis curriculum learning AI governance gradient
          boosting semantic web occaecat culpa artificial consciousness OpenAI
          AI in finance sit nostrud amet dimensionality reduction Google AI
          cloud computing regulation voluptate elit robotics semantic web duis
          investment irure cillum magna proident enim speech recognition
          Deserunt laborum reprehenderit duis elit dolore Lorem. Ex distributed
          computing elit duis artificial intelligence sint swarm intelligence
          aliqua elit consequat elit tempor. Qui AI in manufacturing Lorem aute
          velit AI in entertainment culpa aliquip. t-SNE do sunt ex ea magna
          decision trees est proident reprehenderit AGI Aliquip ipsum sint duis
          ad consequat dolor pariatur autonomous vehicles aliquip nulla sunt AI
          in entertainment investment et culpa edge computing ex aute labore
          multi-task learning nulla quis planning nisi et cupidatat commodo.
          <br />
          <br />
        </p>
      </Modal>
    </DialogTrigger>
  ),
};
