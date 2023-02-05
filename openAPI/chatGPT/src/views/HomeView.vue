<template>
  <div>
    <h1>Chat with OpenAI</h1>
    <form @submit.prevent="generateText">
      <input type="text" v-model="inputValue" />
      <button type="submit">Submit</button>
    </form>
    <hr />
    <p v-if="response">{{ response }}</p>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";

const API_KEY = "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";
const inputValue = ref("");
const response = ref("");

async function generateText() {
  const resp = await axios.post(
    "https://api.openai.com/v1/engines/text-davinci-003/jobs",
    {
      prompt: inputValue.value,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    }
  );
  response.value = resp.data.choices[0].text;
  console.log(response);
}
</script>

<style lang="scss" scoped></style>
