<template>
  <div class="form-user__container-list">
    <label :for="distance">
      <p>{{ label }}</p>
      <input
        class="form-user__input"
        v-model="distance"
        type="text"
        :id="distance"
        readonly
        @click.stop="visible = true"
      />
    </label>
    <div v-if="visible">
      <ul class="form-user__list">
        <li v-for="list in listDistance" :key="list.id" @click="selected(list)">
          <p>{{ list.value }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    distance: "",
    visible: false,
  }),
  created() {
    var vm = this;
    document.addEventListener("click", function () {
      vm.toggleDropdown();
    });
  },
  computed: {},
  methods: {
    selected(list) {
      this.distance = list.value;
      this.$emit("update:distanceProp", list);
      return 1;
    },
    toggleDropdown() {
      this.visible = false;
    },
    clearInput() {
      this.distance = "";
    },
  },
  props: {
    distanceProp: {
      type: Object,
    },
    label: {
      type: String,
    },
    listDistance: {
      type: Array,
    },
  },
};
</script>

<style>
</style>