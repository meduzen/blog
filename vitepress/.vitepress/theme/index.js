import './custom.css'
import DefaultTheme from 'vitepress/theme'
import Datetime from './components/Datetime.vue'
import Duration from './components/Duration.vue'
import Tags from './components/Tags.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('datetime', Datetime)
    app.component('duration', Duration)
    app.component('tags', Tags)
  }
}
