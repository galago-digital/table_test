<template>
  <div class="form-user__container-list">
    <!--
      :for="distance" - не работает пока хотя бы раз не сделали выбор, т.к. начально distance - пустая строка
      label передаст фокус для дочернего input и без атрибута for, он тут не нужен
      -->
    <label>
      <p>{{ label }}</p>
      <input
        class="form-user__input"
        v-model="distance"
        type="text"
        :id="distance"
        readonly
        @click.stop="visible = true"
        placeholder="Дистанция забега"
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
/**
 * Для чего этот компонент? Обычный select решает ту же задачу и без лишнего кода
 */
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