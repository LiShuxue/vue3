<script setup>
import {
  getCurrentInstance,
  reactive,
  ref,
  isRef,
  toRefs,
  computed,
  watch,
} from 'vue';

/**
 *  如果需要获取实例对象this
 */
const { proxy } = getCurrentInstance();
console.log('实例对象this：', proxy);

/**
 *  定义和接受props，v-modal双向绑定
 */
const props = defineProps({
  msg: {
    type: String,
    required: true,
  },
  modelValue: {
    required: true,
  },
});
// console.log('参数props: ', msg); // 报错，必须用props调用。因为模块作用域。
console.log('参数props: ', props.msg); // 正确

/**
 *  定义和触发事件，以及更新v-modal的事件
 */
const emit = defineEmits(['my-event', 'update:modelValue']);
const triggerEvent = (event) => {
  console.log('子组件中信息：child triggerd');
  emit('my-event', event);
};

/**
 *  用reactive定义组件内部状态的特点
 */
const base = reactive(1); // 控制台会提示，值类型不能用reactive
console.log('值类型reactive会有warning：', base);
let obj = reactive({ count: 0 });
const { count } = obj; // 解构，错误
console.log('解构后的值没有了响应性：', count);
const add = () => {
  obj.count++; // 直接使用，正确
};
const changeData = () => {
  obj = reactive({ count: 2 }); // 重新赋值，错误
  console.log('此时再触发reactive改变没反应');
};

/**
 *  用ref定义组件内部状态的特点
 */
const num = ref(0);
console.log('ref定义基本数据类型：', num.value); // 0，使用num.value正确。
let person = ref({ name: 'zhangsan', age: 24 });
console.log('ref定义对象类型：', person.value);

const { name } = person; // 解构，错误，没有person，需使用person.value
let { age } = person.value; // 解构，错误，没有响应式了
console.log('ref中解构的值name,age：', name, age);
console.log('解构出的age是响应式的吗：', isRef(age));

const add2 = () => {
  num.value++;
  person.value.age++;
  age++;
};
const changeData2 = () => {
  person.value = { name: 'zhangsan2', age: 25 }; // 重新赋值，没有问题
};

/**
 * 结合reactive和toRefs，可用来解构，模板中不用加value，但是js还需要写value
 */
const bigObj = toRefs(
  reactive({
    x: 1,
    y: 2,
  })
);
let { x, y } = bigObj;
const add3 = () => {
  x.value++;
  y.value++;
};

/**
 * computed: 接受一个函数，返回一个响应式ref对象，自动收集依赖
 * watch: watch一个响应式的变量，变化时执行回调。返回值是停止watch的函数
 */
const sum = computed(() => {
  return num.value + person.value.age;
});
// watch ref
watch(num, (newValue, oldValue) => {
  console.log('watch num 已触发', `${oldValue} --> ${newValue}`);
});
// watch reactive
watch(
  obj, // 可以直接watch obj，
  (newValue, oldValue) => {
    console.log('watch obj 已触发', `${oldValue} --> ${newValue}`);
  }
);
watch(
  () => obj.count, // 不能直接watch obj.count。 必须使用getter
  (newValue, oldValue) => {
    console.log('watch obj.count 已触发', `${oldValue} --> ${newValue}`);
  }
);
</script>

<template>
  <div>
    <div>全局数据：{{ global }}</div>
    <div>组件props：{{ msg }}</div>
    <div>组件props：{{ props.msg }}</div>
    <div>双向绑定v-modal: {{ modelValue }}</div>
    <input
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
    />
    <br />
    <br />
    <button @click="triggerEvent">父子通信</button>
    <br />
    <br />
    <div>reactive的值obj.count：{{ obj.count }}</div>
    <div>解构后的count丢失了响应性：{{ count }}</div>
    <button @click="add">触发reactive的值改变</button><br />
    <button @click="changeData">
      reactive的值整体替换后丢失响应（触发reactive改变没反应）
    </button>

    <br />
    <br />
    <div>ref的值num：{{ num }}</div>
    <div>ref的值person.name：{{ person.name }}</div>
    <div>ref的值person.age：{{ person.age }}</div>
    <div>ref中解构出来的age不是响应的：{{ age }}</div>
    <button @click="add2">触发ref的值改变</button><br />
    <button @click="changeData2">ref的值.value替换后保持响应</button>

    <br />
    <br />
    <div>解构后的值x, y：{{ x }}-{{ y }}</div>
    <button @click="add3">触发解构后的值改变</button><br />

    <br />
    <br />
    <div>计算属性computed ：{{ sum }}</div>
    <button @click="stop">停止watch</button>
  </div>
</template>

<style scoped></style>
