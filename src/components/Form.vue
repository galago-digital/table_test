<template>
  <div>
    <form
      class="form-user"
      action=""
      novalidate="true"
      @submit.prevent="submit"
    >
      <label for="name">
        <!-- исользование <p> внутри <label> не валидно --> 
        <p>ФИО участника забега</p>
        <input
          class="form-user__input"
          @input="errors('name')"
          v-model="name"
          type="text"
          name="name"
          id="name"
          placeholder="ФИО"
        />
        <p v-show="error.name">Поля обязательное для заполнения</p>
      </label>
      <label for="date">
        <p>Дата рождения</p>
        <datepicker
          :language="ru"
          class="form-user__input-date"
          v-model="date"
          name="uniquename"
          format="dd.MM.yyyy"
          placeholder="Дата рождения"
        ></datepicker>
      </label>
      <label for="email">
        <p>Email</p>
        <input
          class="form-user__input"
          @input="errors('email')"
          v-model="email"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
        />
        <p>{{ error.emailText }}</p>
      </label>
      <label for="phone">
        <p>Телефон</p>
        <input
          class="form-user__input"
          maxlength="12"
          v-model="phone"
          type="text"
          name="phone"
          id="phone"
          @input="validEmail"
          placeholder="Номер телефона: +7"
        />
      </label>
      <Select
        id="distance"
        label="Дистанция участника"
        :distanceProp.sync="distance"
        :listDistance="listDistance"
        ref="clear"
      />
      <label for="payment">
        <p>Взнос в рублях</p>
        <input
          class="form-user__input"
          @input="errors('payment')"
          v-model="payment"
          type="text"
          name="payment"
          id="payment"
          placeholder="Сумма взноса"
        />
        <p v-show="error.payment">Поля обязательное для заполнения</p>
      </label>

      <div>
        <input
          class="form-user__submit"
          :disabled="enabledForm"
          type="submit"
          value="Отправить"
        />
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import Datepicker from "vuejs-datepicker";
import { ru } from "vuejs-datepicker/dist/locale";
import Select from "./Select";
export default {
  data: () => ({
    ru: ru,
    name: "",
    date: null,
    distance: {
      value: false,
    },
    email: "",
    phone: null,
    payment: "",
    disable: true,
    error: {
      name: false,
      payment: false,
      emailText: "",
    },
  }),
  components: {
    Select,
    Datepicker,
  },

  computed: {
    ...mapGetters(["listDistance", "tableData", "tableDataId"]),
    enabledForm() {
      //   debugger;
      // не нужное присвоение переменных let validEmail и т.д.
      // можно точно так же использовать this.distance
      let validEmail = this.validEmail();
      let distance = this.distance;
      let date = this.date;
      let phone = this.phone;
      let name = this.name;
      let payment = this.payment;
      let disabled = this.disable;

      if (
        date == false ||
        name == false ||
        distance["value"] == false ||
        validEmail == false ||
        phone.length < 12 ||
        payment == false
      ) {
        return (disabled = true);
      } else {
        return (disabled = false);
      }
      return disabled;
    },
  },
  watch: {
    phone(value) {
      if (this.phone != null) {
        let length = value.length;
        let newValueNumber = value.slice(2, length).replace(/[^0-9]/g, "");
        this.phone = "+7" + newValueNumber;
        // return this.phone;
      }
    },
    payment(value) {
      if (this.payment != null) {
        this.payment = value.replace(/[^0-9]/g, "");
      }
    },
  },
  methods: {
    validEmail() {
      let valid;
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!this.email) {
        valid = false;
      } else if (re.test(this.email)) {
        this.error.emailText = "";
        valid = true;
      } else {
        this.error.emailText = "Введите корректный Email";
        valid = false;
      }
      return valid;
    },
    submit() {
      let idUser = this.tableDataId.users;
      let id = 0;
      for (let i in idUser) {
        if (idUser[i].id > id) {
          id = idUser[i].id;
        }
      }

      let user = {
        id: ++id,
        name: this.name,
        date: "" + new Date(this.date),
        distance: this.distance.value,
        email: this.email,
        phone: this.phone,
        payment: this.payment,
      };
      console.log("user", user);
      this.$store.dispatch("addUser", user);

      this.clearInput();
    },
    clearInput() {
      this.name = "";
      this.date = null;
      this.distance = {};
      this.email = "";
      this.phone = null;
      this.disable = true;
      this.payment = "";
      this.$refs["clear"].clearInput();
    },
    errors(errorValue) {
      if (!this[errorValue]) {
        this.error[errorValue] = true;
      } else {
        this.error[errorValue] = false;
      }
    },
  },
};
</script>

<style lang="scss">
.form-user {
  margin: 0 auto;
  // padding: 20px;
  max-width: 300px;
  &__input {
    width: 100%;
    font-size: 20px;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid #808080;
    box-sizing: border-box;
    &-date {
      input {
        width: 100%;
        font-size: 20px;
        padding: 5px;
        border-radius: 10px;
        border: 1px solid #808080;
        box-sizing: border-box;
      }
    }
  }
  &__submit {
    width: 100%;
    font-size: 20px;
    margin-top: 20px;
    background-color: cornflowerblue;
    color: #fff;
    &:disabled {
      background-color: darkgrey;
      color: gray;
    }
  }
  &__container-list {
    position: relative;
  }
  &__list {
    position: absolute;
    list-style: none;
    padding: 0;
    background: #fff;
    z-index: 10;
    width: 100%;
    border: 1px solid gray;
    li {
      padding: 10px;
      border-bottom: 1px solid #000;
      p {
        margin: 0;
      }
    }
  }
}
</style>