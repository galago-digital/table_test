<template>
  <div id="app">
    <div class="container">
      <Form />
      <Table />
    </div>
  </div>
</template>

<script>
import Table from "./components/Table.vue";
import Form from "./components/Form.vue";

export default {
  name: "App",
  components: {
    Table,
    Form,
  },
};
</script>

<style>
.container {
  max-width: 1140px;
  margin: 0 auto;
}
</style>
