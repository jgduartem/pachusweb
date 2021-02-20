// import something here
import VueHtml2Canvas from 'vue-html2canvas';
import regeneratorRuntime from "regenerator-runtime"

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default async ({Vue}) => {
  // something to do
  Vue.use(VueHtml2Canvas)
}
