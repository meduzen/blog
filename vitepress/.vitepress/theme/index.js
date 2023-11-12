import './custom.css'
import DefaultTheme from 'vitepress/theme'
import Datetime from './components/Datetime.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('datetime', Datetime)
  }
}
