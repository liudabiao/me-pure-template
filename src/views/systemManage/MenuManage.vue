<template>
  <a-card>
    <div class="card-wrapper">
      <div class="card-part">
        <a-input-search style="margin-bottom: 8px" placeholder="查询菜单" @change="onChange" />
        <a-tree
          :expanded-keys="expandedKeys"
          :auto-expand-parent="autoExpandParent"
          :tree-data="menuData"
          :replaceFields="replaceFields"
          @expand="onExpand"
          @select="onSelect"
        ></a-tree>
      </div>
      <div class="card-part">
        <a-collapse v-model="activeKey">
          <a-collapse-panel key="1" header="菜单编辑">
            <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-form-model-item label="顺位" prop="parentMenuTitle">
                <a-input v-model="form.parentMenuTitle" />
                <a-alert message="用于菜单排序" type="info" />
              </a-form-model-item>
              
              <a-form-model-item label="父菜单" prop="parentMenuTitle">
                <a-input v-model="form.parentMenuTitle" />
                <a-alert message="菜单层级归属（如果为二级页面，父菜单请选择根节点）" type="info" />
              </a-form-model-item>
              <a-form-model-item label="本级标识" prop="parentMenuTitle">
                <a-input v-model="form.parentMenuTitle" />
                <a-alert message="路由标识，唯一" type="info" />
              </a-form-model-item>
              <a-form-model-item label="本级菜单标题" prop="parentMenuTitle">
                <a-input v-model="form.parentMenuTitle" />
                <a-alert message="菜单标题" type="info" />
              </a-form-model-item>
              <a-form-model-item label="组件" prop="parentMenuTitle">
                <a-input v-model="form.parentMenuTitle" />
                <a-alert message="如果本路由需要展示页面，请填写此字段，如果不填写，默认为空菜单，将使用RouteView组件" type="info" />
              </a-form-model-item>
              <a-form-model-item label="路由" prop="parentMenuTitle">
                <a-input v-model="form.parentMenuTitle" />
                <a-alert message="菜单路由地址" type="info" />
              </a-form-model-item>
              <a-form-model-item label="图标" prop="parentMenuTitle">
                <a-input v-model="form.parentMenuTitle" />
                <a-alert message="菜单图标" type="info" />
              </a-form-model-item>
              <a-form-model-item label="是否显示" prop="parentMenuTitle">
                <a-input v-model="form.parentMenuTitle" />
                <a-alert message="是否需要显示到菜单中，如果为二级及以下页面，不需要显示的请取消" type="info" />
              </a-form-model-item>
            </a-form-model>
          </a-collapse-panel>
          <a-collapse-panel key="2" header="操作编辑">
            <p>132</p>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </div>
  </a-card>
</template>

<script>
export default {
  name: 'MenuManage',
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      expandedKeys: [],
      searchValue: '',
      autoExpandParent: true,
      replaceFields: {
        children: 'children',
        title: 'menuTitle',
        key: 'id',
      },
      menuData: [],
      menuDataList: [],
      activeKey: ['1'],
      form: {},
    }
  },
  mounted() {
    const timer = setInterval(() => {
      const menuArr = this.$ls.get('MENU_ARR')
      if (!!menuArr) {
        this.menuData = menuArr
        this.generateList(menuArr)
        clearInterval(timer)
      }
    }, 100)
  },
  methods: {
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    generateList(data) {
      for (let i = 0; i < data.length; i++) {
        const node = data[i]
        const key = node.id
        const title = node.menuTitle
        const parentId = node.parentId
        this.menuDataList.push({ key, title, parentId })
        if (node.children) {
          this.generateList(node.children)
        }
      }
    },
    onChange(e) {
      const value = e.target.value
      const expandedKeys = this.menuDataList
        .map((item) => {
          if (item.title.indexOf(value) > -1) {
            console.log(1, item.title)
            console.log(2, item.title.indexOf(value))
            console.log(3, item.title.substr(0, item.title.indexOf(value)))
            return item.parentId
          }
          return null
        })
        .filter((item, i, self) => item && self.indexOf(item) === i)
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true,
      })
    },
    onSelect(node) {
      console.log(4, node)
    },
  },
}
</script>

<style lang="less" scoped>
.card-wrapper {
  display: flex;
  width: 100%;
  height: 800px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.card-part {
  flex: 1;
  height: 800px;
  margin: auto;
  margin-left: 10px;
  border-radius: 10px;
  border: 1px solid #e9e9e9;
  padding: 10px;
  box-sizing: border-box;
  overflow: auto;
}
</style>