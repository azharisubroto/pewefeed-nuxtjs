import Vue from "vue"
import VueMoment from "vue-moment"
import moment from "moment-timezone"
require("moment/locale/id")

Vue.use(VueMoment, {
	moment,
})
