import my from "./my.js";
import "../stylesheets/main.scss";

import "./reactApp.jsx";

import Vue from "vue";
import VueApp from "./VueApp.vue";
new Vue({
  el: "#vue-root",
  render: (h) => h(VueApp),
});

import add from "./add.ts";
console.log(add(3, 9));

console.log("Hello webpack!");
my();
