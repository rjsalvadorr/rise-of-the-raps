<template>
  <div class="theme-container" @keyup.esc="toggleDebugPanel()">
    <div class="theme-content">
      <div :class="getContentClasses($page)">
        <slot>
          <!-- if <Layout> has children, they go here -->
        </slot>
        <Content>
        </Content>
      </div>
    </div>
    <DebugPanel :enabled="debugPanelEnabled" :siteData="$site" :pageData="$page" ></DebugPanel>
  </div>
</template>

<script>
import { DateTime } from "luxon";
import filter from "lodash/filter";
import DebugPanel from "../components/DebugPanel.vue";

export default {
  name: 'Layout',
  data() {
    return {
      debugPanelEnabled: false,
    };
  },
  methods: {
    getContentClasses(pageData) {
      let classes = 'content-wrapper';
      if(pageData.frontmatter.type === "post") {
        classes += ' content-wrapper--post';
      }
      else if(pageData.frontmatter.type === "category") {
        classes += ' content-wrapper--category';
      }
      return classes;
    },
    toggleDebugPanel() {
      this.debugPanelEnabled = !this.debugPanelEnabled;
    },
  },
  components: {
    DebugPanel
  }
}
</script>

<style lang="scss">
  /////  GLOBAL STYLES
  @import "../styles/global.scss";
</style>

<style scoped lang="scss">
  /////  SCOPED NON-GLOBAL STYLES
  @import "../styles/vars.scss";

  .theme-container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: $body-bg-color;
    color: $body-color;
    display: flex;
    flex-direction: column;

    .theme-content {
      overflow: auto;
      flex-grow: 1;
    }
  }
</style>
