<template>
  <div class="table">
    <table style="width: 100%">
      <tr class="table__header">
        <th>ID</th>
        <th>ФИО участника забега</th>
        <th>
          <div class="table__sort-button">
            <button v-if="aSortCol[0]" @click="sort('date', 0)">&#8593;</button>
            <button v-if="!aSortCol[0]" @click="sortable('date', 0)">
              &#8595;
            </button>
          </div>
          <p>Дата рождения</p>
        </th>
        <th>Email</th>
        <th>Телефон</th>
        <th>
          <div class="table__sort-button">
            <button v-if="aSortCol[1]" @click="sort('distance', 1)">
              &#8593;
            </button>
            <button v-if="!aSortCol[1]" @click="sortable('distance', 1)">
              &#8595;
            </button>
          </div>
          <p>Дистанция</p>
        </th>
        <th>
          <div class="table__sort-button">
            <button v-if="aSortCol[2]" @click="sort('payment', 2)">
              &#8593;
            </button>
            <button v-if="!aSortCol[2]" @click="sortable('payment', 2)">
              &#8595;
            </button>
          </div>
          <p>Сумма взноса</p>
        </th>
      </tr>
      <tr v-for="item in tableData[count]" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ formatDate(item.date) }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.distance }}</td>
        <td>{{ item.payment }}</td>
      </tr>
    </table>
    <div class="pagination" v-if="tableData.length >= 2">
      <div v-for="(c, index) in tableData" :key="index">
        <button @click="changeCount(index)">{{ index + 1 }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Table",
  props: {
    msg: String,
  },
  data: () => ({
    aSortCol: [true, true, true],
    count: 0,
  }),
  created() {
    this.sort("date", 0);
  },
  computed: {
    ...mapGetters(["tableData"]),
  },
  methods: {
    sort(col, enabled) {
      this.$store.dispatch("sortTable", col);
      this.aSortCol[enabled] = !this.aSortCol[enabled];
    },
    sortable(col, enabled) {
      this.$store.dispatch("sortTablePlus", col);
      this.aSortCol[enabled] = !this.aSortCol[enabled];
    },
    changeCount(index) {
      console.log(index);
      this.count = index;
    },
    formatDate(date) {
      date = new Date(date);
      let dd = date.getDate();
      let mm = date.getMonth() + 1;
      if (mm < 10) mm = "0" + mm;

      let yyyy = date.getFullYear();

      return dd + "." + mm + "." + yyyy;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.table {
  margin-top: 30px;
  table {
    border-collapse: collapse;
  }
  th,
  td {
    position: relative;
    border: 1px solid #000;
  }
  &__header {
    text-align: left;
  }
  &__sort-button {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    button {
      font-size: 20px;
      border: none;
      background: transparent;
    }
  }
}
.pagination {
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  div {
    margin-right: 10px;
    margin-left: 2px;
    button {
      background: transparent;
      border: none;
      font-size: 16px;
    }
  }
}
</style>
