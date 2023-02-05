<template>
  <div>
    <h1>Chat with OpenAI</h1>
    <form @submit.prevent="submitForm">
      <input type="text" v-model="inputValue" />
      <button type="submit">Submit</button>
    </form>
    <hr />
    <p v-if="response">{{ response }}</p>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

export default {
  setup() {
    const inputValue = ref("");
    const response = ref("");

    async function submitForm() {
      const resp = await axios.post(
        "https://api.openai.com/v1/engines/davinci/jobs",
        {
          prompt: inputValue.value,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer <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>`,
          },
        }
      );
      response.value = resp.data.choices[0].text;
    }

    return {
      inputValue,
      response,
      submitForm,
    };
  },
};
</script>
